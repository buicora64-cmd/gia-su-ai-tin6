import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Flag, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  Send, 
  Pause, 
  Play, 
  Sparkles,
  BookOpen,
  RotateCcw
} from 'lucide-react';
import { Question, QuizResult, QuizSettings, UserAnswer } from '../types';
import { playCompleteFanfare, playCorrectSound, playIncorrectSound } from '../utils/audio';

interface QuizRunnerProps {
  questions: Question[];
  settings: QuizSettings;
  onFinishQuiz: (result: QuizResult) => void;
  onExitQuiz: () => void;
}

export const QuizRunner: React.FC<QuizRunnerProps> = ({
  questions,
  settings,
  onFinishQuiz,
  onExitQuiz,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, number | null>>({});
  const [flagged, setFlagged] = useState<Record<string, boolean>>({});
  const [secondsRemaining, setSecondsRemaining] = useState<number>(
    (settings.timeLimitMinutes || 15) * 60
  );
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState<boolean>(false);

  const currentQ = questions[currentIndex];
  const isExam = settings.mode === 'exam';
  const isPractice = settings.mode === 'practice';
  const selectedAnswer = answers[currentQ?.id] ?? null;
  const isAnswered = selectedAnswer !== null;

  // Timer effect
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);

      if (isExam) {
        setSecondsRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            handleAutoSubmit();
            return 0;
          }
          return prev - 1;
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isPaused, isExam]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if modal or input is focused
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) return;

      if (e.key === 'ArrowRight' || e.key === 'Enter') {
        if (currentIndex < questions.length - 1) {
          setCurrentIndex((prev) => prev + 1);
        }
      } else if (e.key === 'ArrowLeft') {
        if (currentIndex > 0) {
          setCurrentIndex((prev) => prev - 1);
        }
      } else if (['1', '2', '3', '4'].includes(e.key)) {
        const optionIdx = parseInt(e.key, 10) - 1;
        handleSelectOption(optionIdx);
      } else if (['a', 'A'].includes(e.key)) {
        handleSelectOption(0);
      } else if (['b', 'B'].includes(e.key)) {
        handleSelectOption(1);
      } else if (['c', 'C'].includes(e.key)) {
        handleSelectOption(2);
      } else if (['d', 'D'].includes(e.key)) {
        handleSelectOption(3);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, questions.length, answers]);

  const handleSelectOption = (optionIndex: number) => {
    // In practice mode, allow changing answer or lock it
    const isCorrect = optionIndex === currentQ.correctAnswer;
    
    // Play sound feedback
    if (isPractice && answers[currentQ.id] === undefined) {
      if (isCorrect) {
        playCorrectSound();
      } else {
        playIncorrectSound();
      }
    }

    setAnswers((prev) => ({
      ...prev,
      [currentQ.id]: optionIndex,
    }));
  };

  const handleResetCurrentAnswer = () => {
    setAnswers((prev) => {
      const copy = { ...prev };
      delete copy[currentQ.id];
      return copy;
    });
  };

  const handleToggleFlag = () => {
    setFlagged((prev) => ({
      ...prev,
      [currentQ.id]: !prev[currentQ.id],
    }));
  };

  const handleAutoSubmit = () => {
    finishQuizSubmission();
  };

  const finishQuizSubmission = () => {
    playCompleteFanfare();
    let correct = 0;
    const statsByLevel = {
      nhan_biet: { total: 0, correct: 0 },
      thong_hieu: { total: 0, correct: 0 },
      van_dung: { total: 0, correct: 0 },
    };

    questions.forEach((q) => {
      const userAns = answers[q.id];
      const isRight = userAns === q.correctAnswer;
      if (isRight) correct++;

      const lvl = q.level;
      if (statsByLevel[lvl]) {
        statsByLevel[lvl].total++;
        if (isRight) statsByLevel[lvl].correct++;
      }
    });

    const score = Math.round((correct / questions.length) * 100) / 10;

    const result: QuizResult = {
      quizId: `quiz-${Date.now()}`,
      date: new Date().toISOString(),
      settings,
      questions,
      userAnswers: answers,
      totalQuestions: questions.length,
      correctCount: correct,
      score,
      timeSpentSeconds: isExam
        ? (settings.timeLimitMinutes || 15) * 60 - secondsRemaining
        : elapsedSeconds,
      statsByLevel,
    };

    onFinishQuiz(result);
  };

  // Format timer MM:SS
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const answeredCount = Object.keys(answers).length;
  const progressPercent = Math.round(((currentIndex + 1) / questions.length) * 100);

  const getLevelBadge = (level: 'nhan_biet' | 'thong_hieu' | 'van_dung') => {
    switch (level) {
      case 'nhan_biet':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
            Cấp độ 1: Nhận biết
          </span>
        );
      case 'thong_hieu':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
            Cấp độ 2: Thông hiểu
          </span>
        );
      case 'van_dung':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200">
            Cấp độ 3: Vận dụng
          </span>
        );
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 sm:py-8 space-y-6">
      
      {/* Top Bar: Back, Title, Timer, Actions */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs flex flex-wrap items-center justify-between gap-4">
        
        <div className="flex items-center gap-3">
          <button
            onClick={onExitQuiz}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
            title="Thoát bài làm"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-slate-900 text-sm sm:text-base">
                Câu {currentIndex + 1} / {questions.length}
              </span>
              <span className="text-xs px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-medium">
                {isPractice ? 'Luyện tập' : 'Kiểm tra'}
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Đã trả lời {answeredCount}/{questions.length} câu
            </p>
          </div>
        </div>

        {/* Timer display */}
        <div className="flex items-center gap-3">
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl font-mono text-sm sm:text-base font-bold border ${
            isExam
              ? secondsRemaining < 120
                ? 'bg-rose-50 text-rose-600 border-rose-200 animate-pulse'
                : 'bg-slate-50 text-slate-800 border-slate-200'
              : 'bg-indigo-50 text-indigo-700 border-indigo-200'
          }`}>
            <Clock className="w-4 h-4" />
            <span>{isExam ? formatTime(secondsRemaining) : formatTime(elapsedSeconds)}</span>
          </div>

          {/* Pause button in practice mode */}
          {isPractice && (
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600"
              title={isPaused ? 'Tiếp tục' : 'Tạm dừng'}
            >
              {isPaused ? <Play className="w-4 h-4 fill-current" /> : <Pause className="w-4 h-4" />}
            </button>
          )}

          {/* Submit Button */}
          <button
            onClick={() => setShowSubmitConfirm(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-xs transition-all"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Nộp Bài</span>
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
        <div 
          className="bg-indigo-600 h-full transition-all duration-300 rounded-full"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Main Content Layout: Question Card (Left/Main) & Palette (Right/Sidebar) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        
        {/* Question Panel */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
            
            {/* Metadata tags */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div className="flex flex-wrap items-center gap-2">
                {getLevelBadge(currentQ.level)}
                <span className="text-xs font-medium text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full">
                  {currentQ.lessonTitle}
                </span>
              </div>

              {/* Flag button */}
              <button
                type="button"
                onClick={handleToggleFlag}
                className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg transition-colors ${
                  flagged[currentQ.id]
                    ? 'bg-amber-100 text-amber-800'
                    : 'text-slate-500 hover:bg-slate-100'
                }`}
              >
                <Flag className={`w-3.5 h-3.5 ${flagged[currentQ.id] ? 'fill-amber-500 text-amber-500' : ''}`} />
                <span>{flagged[currentQ.id] ? 'Đã đánh dấu' : 'Đánh dấu'}</span>
              </button>
            </div>

            {/* Question Text */}
            <div className="space-y-3">
              <h3 className="text-base sm:text-lg lg:text-xl font-bold text-slate-900 leading-relaxed whitespace-pre-line">
                {currentQ.question}
              </h3>
            </div>

            {/* Options List */}
            <div className="space-y-3 pt-2">
              {currentQ.options.map((option, idx) => {
                const label = ['A', 'B', 'C', 'D'][idx];
                const isSelected = selectedAnswer === idx;
                const isCorrectOption = idx === currentQ.correctAnswer;

                let optionStyles = 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-800 bg-white';
                
                if (isPractice && isAnswered) {
                  // In practice mode, show correct/incorrect colors immediately
                  if (isCorrectOption) {
                    optionStyles = 'border-emerald-500 bg-emerald-50/80 text-emerald-950 ring-1 ring-emerald-500 font-semibold';
                  } else if (isSelected) {
                    optionStyles = 'border-rose-500 bg-rose-50 text-rose-950 ring-1 ring-rose-500';
                  } else {
                    optionStyles = 'border-slate-200 opacity-60 bg-slate-50 text-slate-600';
                  }
                } else if (isSelected) {
                  // In exam mode, just show selected
                  optionStyles = 'border-indigo-600 bg-indigo-50/70 text-indigo-950 ring-2 ring-indigo-500/30 font-semibold';
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full p-4 rounded-2xl border-2 text-left transition-all flex items-start gap-3.5 group cursor-pointer ${optionStyles}`}
                  >
                    <span className={`w-7 h-7 rounded-xl font-bold text-xs flex items-center justify-center shrink-0 transition-colors ${
                      isPractice && isAnswered
                        ? isCorrectOption
                          ? 'bg-emerald-600 text-white'
                          : isSelected
                          ? 'bg-rose-600 text-white'
                          : 'bg-slate-100 text-slate-500'
                        : isSelected
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-100 text-slate-700 group-hover:bg-slate-200'
                    }`}>
                      {label}
                    </span>
                    <span className="text-sm sm:text-base flex-1 pt-0.5">
                      {option}
                    </span>
                    
                    {/* Status icon in practice mode */}
                    {isPractice && isAnswered && (
                      <div className="shrink-0 mt-0.5">
                        {isCorrectOption ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                        ) : isSelected ? (
                          <XCircle className="w-5 h-5 text-rose-500" />
                        ) : null}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Detailed Explanation in Practice Mode */}
            {isPractice && isAnswered && (
              <div className={`mt-6 p-4 sm:p-5 rounded-2xl border transition-all ${
                selectedAnswer === currentQ.correctAnswer
                  ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                  : 'bg-amber-50/70 border-amber-200 text-amber-950'
              }`}>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2 font-bold text-sm">
                    {selectedAnswer === currentQ.correctAnswer ? (
                      <span className="text-emerald-700 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" /> Chính xác!
                      </span>
                    ) : (
                      <span className="text-rose-700 flex items-center gap-1.5">
                        <XCircle className="w-4 h-4" /> Chưa chính xác. Đáp án đúng là {['A', 'B', 'C', 'D'][currentQ.correctAnswer]}.
                      </span>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={handleResetCurrentAnswer}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 hover:text-indigo-600 px-2 py-1 rounded-md hover:bg-white/80 transition-colors border border-slate-200/60 cursor-pointer"
                    title="Bỏ chọn để làm lại câu này"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Chọn lại câu này</span>
                  </button>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {currentQ.explanation}
                </p>
                {currentQ.textbookRef && (
                  <p className="text-[11px] font-semibold text-slate-500 mt-2 flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5" />
                    Trích dẫn: {currentQ.textbookRef}
                  </p>
                )}
              </div>
            )}

            {/* Bottom Question Controls */}
            <div className="flex items-center justify-between gap-4 pt-4 border-t border-slate-100">
              <button
                type="button"
                disabled={currentIndex === 0}
                onClick={() => setCurrentIndex((prev) => prev - 1)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold text-xs sm:text-sm hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Câu Trước</span>
              </button>

              <div className="text-xs text-slate-400 hidden sm:block">
                Mẹo: Nhấn phím 1-4 hoặc A-D để chọn đáp án
              </div>

              {currentIndex < questions.length - 1 ? (
                <button
                  type="button"
                  onClick={() => setCurrentIndex((prev) => prev + 1)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs sm:text-sm shadow-xs transition-all"
                >
                  <span>Câu Tiếp</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowSubmitConfirm(true)}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-xs transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Hoàn Thành & Nộp Bài</span>
                </button>
              )}
            </div>

          </div>
        </div>

        {/* Question Palette Sidebar */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-4 sm:p-5 space-y-4">
            <h4 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-2">
              Danh Sách Câu Hỏi
            </h4>

            {/* Palette Grid */}
            <div className="grid grid-cols-5 gap-2 max-h-80 overflow-y-auto pr-1">
              {questions.map((q, idx) => {
                const userAns = answers[q.id];
                const isCur = idx === currentIndex;
                const isAns = userAns !== undefined;
                const isFlg = flagged[q.id];

                let bg = 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100';
                if (isCur) {
                  bg = 'ring-2 ring-indigo-600 bg-indigo-600 text-white font-bold shadow-xs';
                } else if (isPractice && isAns) {
                  const correct = userAns === q.correctAnswer;
                  bg = correct
                    ? 'bg-emerald-100 border-emerald-300 text-emerald-800 font-bold'
                    : 'bg-rose-100 border-rose-300 text-rose-800 font-bold';
                } else if (isAns) {
                  bg = 'bg-indigo-100 border-indigo-300 text-indigo-800 font-semibold';
                }

                return (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-9 rounded-xl border text-xs flex items-center justify-center relative transition-all ${bg}`}
                  >
                    <span>{idx + 1}</span>
                    {isFlg && (
                      <span className="w-2 h-2 rounded-full bg-amber-500 absolute top-1 right-1" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="text-[11px] text-slate-500 space-y-1.5 pt-2 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-md bg-indigo-600" />
                <span>Đang chọn</span>
              </div>
              {isPractice ? (
                <>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-md bg-emerald-100 border border-emerald-300" />
                    <span>Đã làm: Trả lời đúng</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-md bg-rose-100 border border-rose-300" />
                    <span>Đã làm: Trả lời chưa đúng</span>
                  </div>
                </>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-md bg-indigo-100 border border-indigo-300" />
                  <span>Đã chọn đáp án</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-md bg-slate-50 border border-slate-200" />
                <span>Chưa làm</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span>Có đánh dấu xem lại</span>
              </div>
            </div>

            {/* Quick Finish Button */}
            <button
              type="button"
              onClick={() => setShowSubmitConfirm(true)}
              className="w-full py-2.5 rounded-xl border border-indigo-600 text-indigo-700 hover:bg-indigo-50 font-bold text-xs transition-colors"
            >
              Nộp Bài Ngay
            </button>
          </div>
        </div>

      </div>

      {/* Submit Confirmation Modal */}
      {showSubmitConfirm && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 space-y-5 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center mx-auto">
              <Send className="w-6 h-6" />
            </div>

            <div className="text-center space-y-2">
              <h3 className="text-lg font-bold text-slate-900">
                Xác Nhận Nộp Bài?
              </h3>
              <p className="text-sm text-slate-600">
                Bạn đã trả lời <strong className="text-slate-900">{answeredCount}</strong> / {questions.length} câu hỏi.
                {answeredCount < questions.length && (
                  <span className="block text-amber-600 font-semibold mt-1">
                    Còn {questions.length - answeredCount} câu hỏi bạn chưa chọn đáp án!
                  </span>
                )}
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowSubmitConfirm(false)}
                className="flex-1 py-3 rounded-xl border border-slate-200 text-slate-700 font-semibold text-sm hover:bg-slate-50 transition-colors"
              >
                Làm Tiếp
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowSubmitConfirm(false);
                  finishQuizSubmission();
                }}
                className="flex-1 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md transition-colors"
              >
                Nộp Bài Luôn
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
