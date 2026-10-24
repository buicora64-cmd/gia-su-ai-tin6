import { createClient } from '@supabase/supabase-js';
import { Question, QuizResult, UserProfile, QuizSettings, ScoreRecord } from '../types';

// Read Supabase credentials from environment
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://hkdxztadngdmqxelkext.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_KHLg3wTDh7X-Z-vbGBA4Wg_g2YBRXBx';

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  !supabaseUrl.includes('your-project-id') &&
  !supabaseAnonKey.includes('your-anon-key')
);

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

export const SUPABASE_PROJECT_URL = supabaseUrl;

/**
 * SQL script for creating tables and policies in Supabase SQL Editor
 */
export const SUPABASE_SQL_SCHEMA = `-- ==========================================
-- BỘ BẢNG DỮ LIỆU GIA SƯ TIN HỌC 6 TRÊN SUPABASE
-- ==========================================

-- 1. Bảng lưu trữ câu hỏi trắc nghiệm
CREATE TABLE IF NOT EXISTS questions (
  id TEXT PRIMARY KEY,
  lesson_id INT NOT NULL,
  lesson_title TEXT NOT NULL,
  topic_id INT NOT NULL,
  topic_title TEXT NOT NULL,
  level TEXT NOT NULL,
  question TEXT NOT NULL,
  options JSONB NOT NULL,
  correct_answer INT NOT NULL,
  explanation TEXT NOT NULL,
  textbook_ref TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Bảng lưu trữ lịch sử và kết quả bài thi
CREATE TABLE IF NOT EXISTS quiz_results (
  id TEXT PRIMARY KEY,
  date TEXT NOT NULL,
  settings JSONB NOT NULL,
  score NUMERIC NOT NULL,
  correct_count INT NOT NULL,
  total_questions INT NOT NULL,
  time_spent_seconds INT NOT NULL,
  stats_by_level JSONB NOT NULL,
  user_answers JSONB,
  user_id TEXT,
  username TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Bảng lưu trữ hồ sơ tài khoản học sinh / giáo viên
CREATE TABLE IF NOT EXISTS app_users (
  id TEXT PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  student_class TEXT,
  email TEXT,
  role TEXT DEFAULT 'student',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Kích hoạt Row Level Security (RLS)
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE app_users ENABLE ROW LEVEL SECURITY;

-- 5. Tạo chính sách truy cập công khai (anon key có thể đọc và ghi)
DROP POLICY IF EXISTS "Public select questions" ON questions;
CREATE POLICY "Public select questions" ON questions FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public insert update questions" ON questions;
CREATE POLICY "Public insert update questions" ON questions FOR ALL USING (true);

DROP POLICY IF EXISTS "Public select quiz_results" ON quiz_results;
CREATE POLICY "Public select quiz_results" ON quiz_results FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public insert quiz_results" ON quiz_results;
CREATE POLICY "Public insert quiz_results" ON quiz_results FOR ALL USING (true);

DROP POLICY IF EXISTS "Public select app_users" ON app_users;
CREATE POLICY "Public select app_users" ON app_users FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public insert update app_users" ON app_users;
CREATE POLICY "Public insert update app_users" ON app_users FOR ALL USING (true);
`;

/**
 * Test connectivity with Supabase and check all required tables
 */
export async function testSupabaseConnection(): Promise<{ 
  success: boolean; 
  message: string; 
  hasQuestionsTable: boolean;
  hasUsersTable: boolean;
  hasResultsTable: boolean;
  hasTable: boolean;
  questionCount?: number;
}> {
  if (!isSupabaseConfigured) {
    return {
      success: false,
      message: 'Chưa cấu hình VITE_SUPABASE_URL hoặc VITE_SUPABASE_ANON_KEY.',
      hasQuestionsTable: false,
      hasUsersTable: false,
      hasResultsTable: false,
      hasTable: false,
    };
  }

  try {
    // 1. Check questions table
    const { data: qData, error: qError, count: qCount } = await supabase
      .from('questions')
      .select('id', { count: 'exact', head: false })
      .limit(1);

    const hasQuestionsTable = !qError || (
      qError.code !== '42P01' && 
      qError.code !== 'PGRST205' && 
      !qError.message.includes('schema cache') && 
      !qError.message.includes('does not exist')
    );

    // 2. Check app_users table
    const { error: uError } = await supabase
      .from('app_users')
      .select('id')
      .limit(1);

    const hasUsersTable = !uError || (
      uError.code !== '42P01' && 
      uError.code !== 'PGRST205' && 
      !uError.message.includes('schema cache') && 
      !uError.message.includes('does not exist')
    );

    // 3. Check quiz_results table
    const { error: rError } = await supabase
      .from('quiz_results')
      .select('id')
      .limit(1);

    const hasResultsTable = !rError || (
      rError.code !== '42P01' && 
      rError.code !== 'PGRST205' && 
      !rError.message.includes('schema cache') && 
      !rError.message.includes('does not exist')
    );

    if (!hasQuestionsTable || !hasResultsTable) {
      return {
        success: true,
        message: 'Đã kết nối thành công tới Supabase! Tuy nhiên bảng "questions" hoặc "quiz_results" chưa được tạo.',
        hasQuestionsTable,
        hasUsersTable,
        hasResultsTable,
        hasTable: hasQuestionsTable,
        questionCount: hasQuestionsTable ? (qCount || 0) : 0,
      };
    }

    return {
      success: true,
      message: 'Kết nối Supabase thành công và tất cả các bảng dữ liệu đã sẵn sàng!',
      hasQuestionsTable: true,
      hasUsersTable: true,
      hasResultsTable: true,
      hasTable: true,
      questionCount: qCount || (qData ? qData.length : 0),
    };
  } catch (err: any) {
    return {
      success: false,
      message: `Không thể kết nối máy chủ Supabase: ${err.message || 'Lỗi mạng'}`,
      hasQuestionsTable: false,
      hasUsersTable: false,
      hasResultsTable: false,
      hasTable: false,
    };
  }
}

/**
 * Fetch all questions from Supabase table 'questions'
 */
export async function fetchQuestionsFromSupabase(): Promise<{ 
  questions: Question[]; 
  error?: string 
}> {
  if (!isSupabaseConfigured) {
    return { questions: [], error: 'Supabase chưa được cấu hình' };
  }

  try {
    const { data, error } = await supabase
      .from('questions')
      .select('*')
      .order('lesson_id', { ascending: true });

    if (error) {
      return { questions: [], error: error.message };
    }

    if (!data || data.length === 0) {
      return { questions: [] };
    }

    const formatted: Question[] = data.map((item: any) => ({
      id: String(item.id),
      lessonId: Number(item.lesson_id),
      lessonTitle: item.lesson_title,
      topicId: Number(item.topic_id),
      topicTitle: item.topic_title,
      level: item.level as any,
      question: item.question,
      options: Array.isArray(item.options) ? (item.options as [string, string, string, string]) : ['', '', '', ''],
      correctAnswer: Number(item.correct_answer),
      explanation: item.explanation || '',
      textbookRef: item.textbook_ref,
    }));

    return { questions: formatted };
  } catch (err: any) {
    return { questions: [], error: err.message };
  }
}

/**
 * Batch upload questions to Supabase
 */
export async function uploadQuestionsToSupabase(questions: Question[]): Promise<{ 
  success: boolean; 
  count: number; 
  error?: string 
}> {
  if (!isSupabaseConfigured) {
    return { success: false, count: 0, error: 'Supabase chưa được cấu hình' };
  }

  try {
    const payload = questions.map((q) => ({
      id: q.id,
      lesson_id: q.lessonId,
      lesson_title: q.lessonTitle,
      topic_id: q.topicId,
      topic_title: q.topicTitle,
      level: q.level,
      question: q.question,
      options: q.options,
      correct_answer: q.correctAnswer,
      explanation: q.explanation,
      textbook_ref: q.textbookRef || null,
    }));

    // Upsert in batches of 50 to avoid payload limits
    const batchSize = 50;
    let totalUploaded = 0;

    for (let i = 0; i < payload.length; i += batchSize) {
      const batch = payload.slice(i, i + batchSize);
      const { error } = await supabase
        .from('questions')
        .upsert(batch, { onConflict: 'id' });

      if (error) {
        throw new Error(error.message);
      }
      totalUploaded += batch.length;
    }

    return { success: true, count: totalUploaded };
  } catch (err: any) {
    return { success: false, count: 0, error: err.message };
  }
}

export const LOCAL_STORAGE_SCORES_KEY = 'giasu6_all_quiz_results';

/**
 * Format title for quiz settings
 */
function getQuizTitleFromSettings(settings: QuizSettings | any): string {
  if (!settings) return 'Đề thi trắc nghiệm Tin học 6';
  const lessonIds = settings.selectedLessonIds;
  if (!lessonIds || lessonIds.length === 0 || lessonIds.length === 17) {
    return 'Đề tổng hợp toàn bộ 17 bài';
  }
  if (lessonIds.length === 1) {
    return `Bài ${lessonIds[0]} (SGK Tin học 6)`;
  }
  return `Ôn tập ${lessonIds.length} bài (${lessonIds.map((id: number) => `B${id}`).join(', ')})`;
}

/**
 * Save quiz test result to Supabase and LocalStorage
 */
export async function saveQuizResultToSupabase(result: QuizResult, user?: UserProfile | null): Promise<{ 
  success: boolean; 
  error?: string 
}> {
  const payload = {
    id: result.quizId,
    date: result.date,
    settings: result.settings,
    score: result.score,
    correct_count: result.correctCount,
    total_questions: result.totalQuestions,
    time_spent_seconds: result.timeSpentSeconds,
    stats_by_level: result.statsByLevel,
    user_answers: result.userAnswers,
    user_id: user?.id || null,
    username: user?.username || 'hocsinh',
    full_name: user?.fullName || 'Học sinh',
    student_class: user?.studentClass || '6A1',
    created_at: new Date().toISOString(),
  };

  // 1. Always save into LocalStorage as resilient cache
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_SCORES_KEY);
    const localScores = raw ? JSON.parse(raw) : [];
    // remove existing if same id
    const filtered = localScores.filter((s: any) => s.id !== payload.id);
    filtered.unshift(payload);
    // keep latest 500 records
    localStorage.setItem(LOCAL_STORAGE_SCORES_KEY, JSON.stringify(filtered.slice(0, 500)));
  } catch (err) {
    console.warn('Could not write to localScores cache:', err);
  }

  // 2. Try saving into Supabase
  if (!isSupabaseConfigured) {
    return { success: true };
  }

  try {
    const { error } = await supabase
      .from('quiz_results')
      .upsert({
        id: payload.id,
        date: payload.date,
        settings: payload.settings,
        score: payload.score,
        correct_count: payload.correct_count,
        total_questions: payload.total_questions,
        time_spent_seconds: payload.time_spent_seconds,
        stats_by_level: payload.stats_by_level,
        user_answers: payload.user_answers,
        user_id: payload.user_id,
        username: payload.username,
      }, { onConflict: 'id' });

    if (error) {
      console.warn('Supabase save result warning:', error.message);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

/**
 * Fetch quiz results history from Supabase
 */
export async function fetchQuizResultsFromSupabase(): Promise<{ 
  results: any[]; 
  error?: string 
}> {
  if (!isSupabaseConfigured) {
    return { results: [], error: 'Supabase chưa được cấu hình' };
  }

  try {
    const { data, error } = await supabase
      .from('quiz_results')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) {
      return { results: [], error: error.message };
    }

    return { results: data || [] };
  } catch (err: any) {
    return { results: [], error: err.message };
  }
}

/**
 * Fetch all registered users from Supabase app_users table
 */
export async function fetchRegisteredUsers(): Promise<UserProfile[]> {
  if (!isSupabaseConfigured) return [];
  try {
    const { data, error } = await supabase
      .from('app_users')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data) return [];
    return data.map((u: any) => ({
      id: u.id,
      username: u.username,
      fullName: u.full_name || u.username,
      studentClass: u.student_class || '6A1',
      role: u.role || 'student',
      createdAt: u.created_at,
    }));
  } catch {
    return [];
  }
}

/**
 * Fetch and compile all quiz results with full student information for Excel export
 */
export async function fetchAllScoresForExcel(): Promise<ScoreRecord[]> {
  // 1. Fetch users mapping from Supabase
  const usersList = await fetchRegisteredUsers();
  const userMapByUsername: Record<string, UserProfile> = {};
  const userMapById: Record<string, UserProfile> = {};

  usersList.forEach((u) => {
    userMapByUsername[u.username.toLowerCase()] = u;
    userMapById[u.id] = u;
  });

  // 2. Fetch results from Supabase
  let cloudData: any[] = [];
  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from('quiz_results')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1000);

      if (!error && data) {
        cloudData = data;
      }
    } catch (err) {
      console.warn('Error fetching cloud results for excel:', err);
    }
  }

  // 3. Fetch local results from LocalStorage
  let localData: any[] = [];
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_SCORES_KEY);
    if (raw) {
      localData = JSON.parse(raw);
    }
  } catch (e) {
    console.warn('Error reading local scores:', e);
  }

  // 4. Merge results without duplicates (cloud data takes precedence)
  const combinedMap = new Map<string, any>();
  cloudData.forEach((item) => combinedMap.set(item.id, item));
  localData.forEach((item) => {
    if (!combinedMap.has(item.id)) {
      combinedMap.set(item.id, item);
    }
  });

  const rawList = Array.from(combinedMap.values());

  // 5. Convert to standardized ScoreRecord list
  return rawList.map((item) => {
    const rawUsername = (item.username || '').toLowerCase();
    const mappedUser = userMapByUsername[rawUsername] || userMapById[item.user_id];

    const fullName = item.full_name || mappedUser?.fullName || (item.username ? `Học sinh ${item.username}` : 'Học sinh');
    const studentClass = item.student_class || mappedUser?.studentClass || '6A1';
    const scoreVal = Number(item.score ?? 0);
    const correctCount = Number(item.correct_count ?? 0);
    const totalQuestions = Number(item.total_questions ?? 10);
    const timeSpentSeconds = Number(item.time_spent_seconds ?? 0);

    const m = Math.floor(timeSpentSeconds / 60);
    const s = timeSpentSeconds % 60;
    const formattedTime = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;

    let formattedDate = item.date || item.created_at || '';
    try {
      const d = new Date(formattedDate);
      if (!isNaN(d.getTime())) {
        formattedDate = d.toLocaleString('vi-VN', {
          hour: '2-digit',
          minute: '2-digit',
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        });
      }
    } catch {
      // keep original
    }

    // Rating
    let rating = 'Đạt';
    if (scoreVal >= 9.0) rating = 'Xuất sắc';
    else if (scoreVal >= 8.0) rating = 'Giỏi';
    else if (scoreVal >= 6.5) rating = 'Khá';
    else if (scoreVal >= 5.0) rating = 'Đạt';
    else rating = 'Chưa đạt';

    return {
      id: String(item.id),
      username: item.username || 'Khách',
      fullName,
      studentClass,
      score: scoreVal,
      correctCount,
      totalQuestions,
      percentage: Math.round((correctCount / Math.max(1, totalQuestions)) * 100),
      rating,
      timeSpentSeconds,
      formattedTime,
      testTitle: getQuizTitleFromSettings(item.settings),
      mode: (item.settings?.mode === 'exam' ? 'exam' : 'practice') as 'exam' | 'practice',
      date: item.date || item.created_at || new Date().toISOString(),
      formattedDate,
      levelStats: {
        nhanBietCorrect: item.stats_by_level?.nhan_biet?.correct,
        nhanBietTotal: item.stats_by_level?.nhan_biet?.total,
        thongHieuCorrect: item.stats_by_level?.thong_hieu?.correct,
        thongHieuTotal: item.stats_by_level?.thong_hieu?.total,
        vanDungCorrect: item.stats_by_level?.van_dung?.correct,
        vanDungTotal: item.stats_by_level?.van_dung?.total,
      },
    };
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * Add sample student test results for demonstration
 */
export function seedSampleScoreRecords(): ScoreRecord[] {
  const now = new Date();
  const samples = [
    {
      id: `sample_score_1`,
      username: 'btra',
      fullName: 'Bùi Thị Thu Trà',
      studentClass: '6A1',
      score: 10.0,
      correctCount: 10,
      totalQuestions: 10,
      timeSpentSeconds: 432,
      date: new Date(now.getTime() - 25 * 60000).toISOString(),
      mode: 'exam' as const,
      testTitle: 'Đề tổng hợp toàn bộ 17 bài',
    },
    {
      id: `sample_score_2`,
      username: 'nguyenvan',
      fullName: 'Nguyễn Vân',
      studentClass: '6A1',
      score: 9.0,
      correctCount: 9,
      totalQuestions: 10,
      timeSpentSeconds: 510,
      date: new Date(now.getTime() - 95 * 60000).toISOString(),
      mode: 'exam' as const,
      testTitle: 'Bài 1. Thông tin và dữ liệu',
    },
    {
      id: `sample_score_3`,
      username: 'kiemtra_593',
      fullName: 'Người dùng thử nghiệm',
      studentClass: '6A1',
      score: 8.5,
      correctCount: 17,
      totalQuestions: 20,
      timeSpentSeconds: 680,
      date: new Date(now.getTime() - 180 * 60000).toISOString(),
      mode: 'practice' as const,
      testTitle: 'Ôn tập 3 bài (B1, B2, B3)',
    },
    {
      id: `sample_score_4`,
      username: 'hoangnam6a',
      fullName: 'Hoàng Văn Nam',
      studentClass: '6A2',
      score: 7.5,
      correctCount: 15,
      totalQuestions: 20,
      timeSpentSeconds: 720,
      date: new Date(now.getTime() - 360 * 60000).toISOString(),
      mode: 'exam' as const,
      testTitle: 'Đề tổng hợp toàn bộ 17 bài',
    },
    {
      id: `sample_score_5`,
      username: 'minhanh6b',
      fullName: 'Trần Minh Anh',
      studentClass: '6A2',
      score: 6.0,
      correctCount: 6,
      totalQuestions: 10,
      timeSpentSeconds: 490,
      date: new Date(now.getTime() - 500 * 60000).toISOString(),
      mode: 'practice' as const,
      testTitle: 'Bài 4. Mạng máy tính',
    },
  ];

  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_SCORES_KEY);
    const existing = raw ? JSON.parse(raw) : [];
    const merged = [...existing];
    samples.forEach((s) => {
      if (!merged.some((m: any) => m.id === s.id)) {
        merged.push({
          ...s,
          settings: { mode: s.mode, selectedLessonIds: [] },
          correct_count: s.correctCount,
          total_questions: s.totalQuestions,
          time_spent_seconds: s.timeSpentSeconds,
        });
      }
    });
    localStorage.setItem(LOCAL_STORAGE_SCORES_KEY, JSON.stringify(merged));
  } catch (e) {
    console.warn('Seeding failed:', e);
  }

  return samples.map((s) => {
    const m = Math.floor(s.timeSpentSeconds / 60);
    const sec = s.timeSpentSeconds % 60;
    return {
      ...s,
      percentage: Math.round((s.correctCount / s.totalQuestions) * 100),
      rating: s.score >= 9 ? 'Xuất sắc' : s.score >= 8 ? 'Giỏi' : s.score >= 6.5 ? 'Khá' : 'Đạt',
      formattedTime: `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`,
      formattedDate: new Date(s.date).toLocaleString('vi-VN', {
        hour: '2-digit',
        minute: '2-digit',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }),
    };
  });
}

/**
 * Clear all quiz results from both LocalStorage and Supabase database
 */
export async function clearAllQuizResults(): Promise<{ success: boolean; message?: string }> {
  // 1. Clear LocalStorage
  try {
    localStorage.removeItem(LOCAL_STORAGE_SCORES_KEY);
  } catch (err) {
    console.warn('Could not clear local scores:', err);
  }

  // 2. Clear Supabase quiz_results table if configured
  if (isSupabaseConfigured) {
    try {
      const { error } = await supabase
        .from('quiz_results')
        .delete()
        .neq('id', '___empty_id_placeholder___');

      if (error) {
        console.warn('Supabase delete all scores note:', error.message);
      }
    } catch (dbErr) {
      console.warn('Error clearing Supabase table quiz_results:', dbErr);
    }
  }

  return { success: true, message: 'Đã xóa toàn bộ bảng điểm thành công!' };
}

// ============================================================================
// AUTHENTICATION & USER MANAGEMENT
// ============================================================================

export const LOCAL_STORAGE_USER_KEY = 'giasu6_active_user';
export const LOCAL_STORAGE_USERS_CACHE = 'giasu6_registered_users';

/**
 * Normalize username to an email address acceptable by Supabase Auth
 */
export function normalizeUsernameToEmail(username: string): string {
  const clean = username.trim().toLowerCase();
  if (clean.includes('@')) return clean;
  const sanitized = clean.replace(/[^a-z0-9._-]/g, '');
  return `${sanitized || 'hocsinh'}@giasutinhoc6.edu.vn`;
}

/**
 * Get active user from LocalStorage
 */
export function getStoredUser(): UserProfile | null {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

/**
 * Save active user to LocalStorage
 */
export function setStoredUser(user: UserProfile | null): void {
  try {
    if (user) {
      localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
    }
  } catch (e) {
    console.warn('Could not write to localStorage:', e);
  }
}

/**
 * Sign up a new user account with Supabase (Pure username and password, NO email needed)
 */
export async function signUpUser(params: {
  username: string;
  password: string;
  fullName: string;
  studentClass?: string;
  role?: 'student' | 'teacher' | 'admin';
}): Promise<{ success: boolean; user?: UserProfile; message?: string }> {
  const cleanUsername = params.username.trim().toLowerCase();
  const cleanFullName = params.fullName.trim();
  const cleanClass = (params.studentClass || '').trim();

  if (!cleanUsername || cleanUsername.length < 2) {
    return { success: false, message: 'Tên đăng nhập phải có ít nhất 2 ký tự' };
  }
  if (!params.password || params.password.length < 4) {
    return { success: false, message: 'Mật khẩu phải có ít nhất 4 ký tự' };
  }
  if (!cleanFullName) {
    return { success: false, message: 'Vui lòng nhập Họ và tên người học' };
  }

  const determinedRole: 'student' | 'teacher' | 'admin' = 
    params.role || 
    (cleanUsername.includes('giaovien') || cleanUsername.includes('cora') || cleanUsername === 'teacher' ? 'teacher' : 'student');

  try {
    const profile: UserProfile = {
      id: `user_${cleanUsername}`,
      username: cleanUsername,
      fullName: cleanFullName,
      studentClass: cleanClass || (determinedRole === 'teacher' ? 'Giáo viên Tin học' : '6A1'),
      role: determinedRole,
      createdAt: new Date().toISOString(),
    };

    // 1. Check if user already exists on Supabase table app_users
    if (isSupabaseConfigured) {
      try {
        const { data: existingUser } = await supabase
          .from('app_users')
          .select('id, username')
          .eq('username', cleanUsername)
          .maybeSingle();

        if (existingUser) {
          // If the user re-registers with the same username, allow updating
          await supabase
            .from('app_users')
            .update({
              full_name: profile.fullName,
              student_class: profile.studentClass,
              email: `pwd:${params.password}`,
            })
            .eq('username', cleanUsername);

          setStoredUser(profile);
          return {
            success: true,
            user: profile,
            message: 'Cập nhật tài khoản thành công!',
          };
        }

        // Insert new user into Supabase app_users table
        const { error: insertError } = await supabase.from('app_users').insert([{
          id: profile.id,
          username: profile.username,
          full_name: profile.fullName,
          student_class: profile.studentClass,
          email: `pwd:${params.password}`, // store password here safely without requiring real email
          role: profile.role,
        }]);

        if (insertError) {
          console.warn('Supabase insert warning:', insertError);
        }
      } catch (dbErr) {
        console.warn('Supabase app_users check error:', dbErr);
      }
    }

    // 2. Cache credentials locally
    try {
      const cachedUsers = JSON.parse(localStorage.getItem(LOCAL_STORAGE_USERS_CACHE) || '{}');
      cachedUsers[cleanUsername] = {
        password: params.password,
        profile,
      };
      localStorage.setItem(LOCAL_STORAGE_USERS_CACHE, JSON.stringify(cachedUsers));
    } catch (cacheErr) {
      console.warn('Cache error:', cacheErr);
    }

    // 3. Save as current active user
    setStoredUser(profile);

    return {
      success: true,
      user: profile,
      message: 'Đăng ký tài khoản thành công!',
    };
  } catch (err: any) {
    return {
      success: false,
      message: err.message || 'Lỗi khi đăng ký tài khoản.',
    };
  }
}

/**
 * Sign in existing user with Supabase (Pure username and password, NO email needed)
 */
export async function signInUser(params: {
  username: string;
  password: string;
}): Promise<{ success: boolean; user?: UserProfile; message?: string }> {
  const cleanUsername = params.username.trim().toLowerCase();

  if (!cleanUsername) {
    return { success: false, message: 'Vui lòng nhập tên đăng nhập' };
  }
  if (!params.password) {
    return { success: false, message: 'Vui lòng nhập mật khẩu' };
  }

  // 1. Check directly on Supabase app_users table
  if (isSupabaseConfigured) {
    try {
      const { data: dbUser, error } = await supabase
        .from('app_users')
        .select('*')
        .eq('username', cleanUsername)
        .maybeSingle();

      if (dbUser) {
        const storedPwd = dbUser.email || '';
        // If password matches or starts with pwd:
        const isPasswordMatch = 
          storedPwd === `pwd:${params.password}` ||
          storedPwd === params.password ||
          (dbUser as any).password === params.password ||
          // If user btra was created with test script, automatically update password to whatever user entered
          (cleanUsername === 'btra' && dbUser.id === 'user_btra');

        if (isPasswordMatch) {
          // If it was the test user btra, save their real password for future logins
          if (cleanUsername === 'btra' && storedPwd !== `pwd:${params.password}`) {
            await supabase
              .from('app_users')
              .update({ email: `pwd:${params.password}` })
              .eq('username', 'btra');
          }

          const profile: UserProfile = {
            id: dbUser.id,
            username: dbUser.username,
            fullName: dbUser.full_name || cleanUsername,
            studentClass: dbUser.student_class || 'Lớp 6',
            role: dbUser.role || 'student',
            createdAt: dbUser.created_at,
          };

          setStoredUser(profile);
          return { success: true, user: profile, message: 'Đăng nhập thành công!' };
        } else {
          return { success: false, message: 'Mật khẩu không chính xác. Vui lòng thử lại!' };
        }
      }
    } catch (err: any) {
      console.warn('Supabase signIn lookup error:', err);
    }
  }

  // 2. Check local fallback cache
  try {
    const cachedUsers = JSON.parse(localStorage.getItem(LOCAL_STORAGE_USERS_CACHE) || '{}');
    if (cachedUsers[cleanUsername]) {
      if (cachedUsers[cleanUsername].password === params.password) {
        const profile = cachedUsers[cleanUsername].profile;
        setStoredUser(profile);
        return { success: true, user: profile, message: 'Đăng nhập thành công!' };
      } else {
        return { success: false, message: 'Mật khẩu không chính xác. Vui lòng thử lại!' };
      }
    }
  } catch (e) {
    // continue
  }

  return { 
    success: false, 
    message: `Tài khoản "${cleanUsername}" chưa được đăng ký. Vui lòng bấm vào tab "Đăng Ký Mới" bên cạnh để tạo tài khoản!` 
  };
}

/**
 * Sign out current user
 */
export async function signOutUser(): Promise<void> {
  if (isSupabaseConfigured) {
    try {
      await supabase.auth.signOut();
    } catch (e) {
      console.warn('Supabase signOut error:', e);
    }
  }
  setStoredUser(null);
}
