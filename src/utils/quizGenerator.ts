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

  let selectedQuestions: Question[] = [];

  if (difficulty === 'tong_hop') {
    // Composite: combine all 3 levels
    const ratio = matrixRatio || { nhanBiet: 40, thongHieu: 30, vanDung: 30 };
    const totalWeight = ratio.nhanBiet + ratio.thongHieu + ratio.vanDung;

    let countNB = Math.round((ratio.nhanBiet / totalWeight) * questionCount);
    let countTH = Math.round((ratio.thongHieu / totalWeight) * questionCount);
    let countVD = questionCount - countNB - countTH;

    if (countVD < 0) {
      countVD = 0;
      countTH = Math.max(0, questionCount - countNB);
    }

    const poolNB = pool.filter((q) => q.level === 'nhan_biet');
    const poolTH = pool.filter((q) => q.level === 'thong_hieu');
    const poolVD = pool.filter((q) => q.level === 'van_dung');

    const pickedNB = pickFromPool(poolNB, countNB, pool);
    const pickedTH = pickFromPool(poolTH, countTH, pool);
    const pickedVD = pickFromPool(poolVD, countVD, pool);

    selectedQuestions = [...pickedNB, ...pickedTH, ...pickedVD];
  } else {
    // Single specific level
    const levelPool = pool.filter((q) => q.level === difficulty);
    selectedQuestions = pickFromPool(levelPool, questionCount, pool);
  }

  // Shuffle order of questions
  selectedQuestions = shuffleArray(selectedQuestions);

  // If shuffleOptions is enabled
  if (shuffleOptions) {
    selectedQuestions = selectedQuestions.map((q) => shuffleQuestionOptions(q));
  }

  return selectedQuestions;
}

function pickFromPool(levelPool: Question[], targetCount: number, generalPool: Question[]): Question[] {
  if (targetCount <= 0) return [];
  const shuffledLevel = shuffleArray(levelPool);
  
  if (shuffledLevel.length >= targetCount) {
    return shuffledLevel.slice(0, targetCount);
  }

  // If level pool has fewer items, take all of them and fill from general pool
  const result = [...shuffledLevel];
  const remaining = targetCount - result.length;
  const existingIds = new Set(result.map((q) => q.id));

  const availableInGeneral = generalPool.filter((q) => !existingIds.has(q.id));
  const shuffledGeneral = shuffleArray(availableInGeneral);

  for (let i = 0; i < remaining && i < shuffledGeneral.length; i++) {
    result.push(shuffledGeneral[i]);
    existingIds.add(shuffledGeneral[i].id);
  }

  // If still need more (e.g. user requested 30 questions on a single lesson), clone with unique ID
  while (result.length < targetCount && levelPool.length > 0) {
    const template = levelPool[Math.floor(Math.random() * levelPool.length)];
    result.push({
      ...template,
      id: `${template.id}-copy-${result.length}`,
    });
  }

  return result.slice(0, targetCount);
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
