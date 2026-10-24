import { DifficultyLevel, Question, QuizSettings } from '../types';
import { INITIAL_QUESTIONS } from '../data/questions';
import { LESSONS } from '../data/lessons';

// Fisher-Yates shuffle
export function shuffleArray<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function shuffleQuestionOptions(q: Question): Question {
  const originalOptions = [...q.options];
  const correctAnswerText = originalOptions[q.correctAnswer];
  const shuffledOptions = shuffleArray(originalOptions) as [string, string, string, string];
  const newCorrectAnswer = shuffledOptions.indexOf(correctAnswerText);
  return {
    ...q,
    options: shuffledOptions,
    correctAnswer: newCorrectAnswer >= 0 ? newCorrectAnswer : 0,
  };
}

export function generateQuizQuestions(settings: QuizSettings): Question[] {
  const { selectedLessonIds, questionCount, difficulty, shuffleOptions, matrixRatio } = settings;

  // Filter by selected lessons
  let pool = INITIAL_QUESTIONS.filter((q) => {
    if (!selectedLessonIds || selectedLessonIds.length === 0) return true;
    return selectedLessonIds.includes(q.lessonId);
  });

  // If pool is empty for some reason, fallback to all questions
  if (pool.length === 0) {
    pool = [...INITIAL_QUESTIONS];
  }

  // Maximum unique questions cannot exceed the pool's size
  const targetCount = Math.min(questionCount, pool.length);

  let selectedQuestions: Question[] = [];

  if (difficulty === 'tong_hop') {
    // Composite: combine all 3 levels
    const ratio = matrixRatio || { nhanBiet: 40, thongHieu: 30, vanDung: 30 };
    const totalWeight = ratio.nhanBiet + ratio.thongHieu + ratio.vanDung;

    const poolNB = pool.filter((q) => q.level === 'nhan_biet');
    const poolTH = pool.filter((q) => q.level === 'thong_hieu');
    const poolVD = pool.filter((q) => q.level === 'van_dung');

    let countNB = Math.round((ratio.nhanBiet / totalWeight) * targetCount);
    let countTH = Math.round((ratio.thongHieu / totalWeight) * targetCount);
    let countVD = targetCount - countNB - countTH;

    if (countVD < 0) {
      countVD = 0;
      countTH = Math.max(0, targetCount - countNB);
    }

    const usedIds = new Set<string>();
    const picked: Question[] = [];

    // Pick from NB
    const shuffledNB = shuffleArray(poolNB);
    for (const q of shuffledNB) {
      if (picked.length >= countNB) break;
      if (!usedIds.has(q.id)) {
        picked.push(q);
        usedIds.add(q.id);
      }
    }

    // Pick from TH
    const shuffledTH = shuffleArray(poolTH);
    const targetWithTH = picked.length + countTH;
    for (const q of shuffledTH) {
      if (picked.length >= targetWithTH) break;
      if (!usedIds.has(q.id)) {
        picked.push(q);
        usedIds.add(q.id);
      }
    }

    // Pick from VD
    const shuffledVD = shuffleArray(poolVD);
    const targetWithVD = picked.length + countVD;
    for (const q of shuffledVD) {
      if (picked.length >= targetWithVD) break;
      if (!usedIds.has(q.id)) {
        picked.push(q);
        usedIds.add(q.id);
      }
    }

    // If still need more to reach targetCount, fill with remaining unique questions from pool
    if (picked.length < targetCount) {
      const remaining = shuffleArray(pool.filter((q) => !usedIds.has(q.id)));
      for (const q of remaining) {
        if (picked.length >= targetCount) break;
        picked.push(q);
        usedIds.add(q.id);
      }
    }

    selectedQuestions = picked;
  } else {
    // Single specific level
    const levelPool = pool.filter((q) => q.level === difficulty);
    const shuffledLevel = shuffleArray(levelPool);
    const usedIds = new Set<string>();
    const picked: Question[] = [];

    for (const q of shuffledLevel) {
      if (picked.length >= targetCount) break;
      picked.push(q);
      usedIds.add(q.id);
    }

    // If level pool has fewer items, fill from other levels in the selected pool without duplicates
    if (picked.length < targetCount) {
      const remaining = shuffleArray(pool.filter((q) => !usedIds.has(q.id)));
      for (const q of remaining) {
        if (picked.length >= targetCount) break;
        picked.push(q);
        usedIds.add(q.id);
      }
    }

    selectedQuestions = picked;
  }

  // Shuffle order of questions
  selectedQuestions = shuffleArray(selectedQuestions);

  // If shuffleOptions is enabled
  if (shuffleOptions) {
    selectedQuestions = selectedQuestions.map((q) => shuffleQuestionOptions(q));
  }

  // Guarantee 100% unique ID per question instance in this test session
  return selectedQuestions.map((q, idx) => ({
    ...q,
    id: `${q.id}__#${idx + 1}`,
  }));
}

export function getQuestionsCountByLesson(lessonId: number): {
  total: number;
  nhan_biet: number;
  thong_hieu: number;
  van_dung: number;
} {
  const questions = INITIAL_QUESTIONS.filter((q) => q.lessonId === lessonId);
  return {
    total: questions.length,
    nhan_biet: questions.filter((q) => q.level === 'nhan_biet').length,
    thong_hieu: questions.filter((q) => q.level === 'thong_hieu').length,
    van_dung: questions.filter((q) => q.level === 'van_dung').length,
  };
}

export function getTotalStats(): {
  totalQuestions: number;
  lessonsCount: number;
  nhanBietCount: number;
  thongHieuCount: number;
  vanDungCount: number;
} {
  return {
    totalQuestions: INITIAL_QUESTIONS.length,
    lessonsCount: LESSONS.length,
    nhanBietCount: INITIAL_QUESTIONS.filter((q) => q.level === 'nhan_biet').length,
    thongHieuCount: INITIAL_QUESTIONS.filter((q) => q.level === 'thong_hieu').length,
    vanDungCount: INITIAL_QUESTIONS.filter((q) => q.level === 'van_dung').length,
  };
}
