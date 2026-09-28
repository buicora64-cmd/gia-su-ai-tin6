import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Trophy, 
  RotateCcw, 
  ArrowLeft, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Printer, 
  Filter, 
  BookOpen, 
  Sparkles,
  Award
} from 'lucide-react';
import { Question, QuizResult } from '../types';

interface QuizResultModalProps {
  result: QuizResult;
  onRetryAll: () => void;
  onRetryWrongOnly: (wrongQuestions: Question[]) => void;
  onNewQuiz: () => void;
  onPrint: () => void;
}

export const QuizResultModal: React.FC<QuizResultModalProps> = ({
  result,
  onRetryAll,
  onRetryWrongOnly,
  onNewQuiz,
  onPrint,
}) => {
  const [filterMode, setFilterMode] = useState<'all' | 'wrong' | 'correct'>('all');

  const {
    questions,
    userAnswers,
    totalQuestions,
    correctCount,
    score,
    timeSpentSeconds,
    statsByLevel,
  } = result;

  const wrongCount = totalQuestions - correctCount;
  const wrongQuestions = questions.filter(
    (q) => userAnswers[q.id] !== q.correctAnswer
  );

  // Trigger confetti if high score
  useEffect(() => {
    if (score >= 7.5) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (e) {
        // Ignore
      }
    }
  }, [score]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m} phút ${s} giây`;
  };

  const getRankInfo = () => {
    if (score >= 9.0) {
      return {
        title: 'Xuất Sắc! 🎉',
        desc: 'Em đã nắm vững toàn bộ kiến thức Tin học 6 Kết nối tri thức!',
        color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
        badge: 'Học sinh xuất sắc',
      };
    }
    if (score >= 8.0) {
      return {
        title: 'Giỏi Lắm! 🌟',
        desc: 'Kết quả rất ấn tượng, tiếp tục phát huy ở các bài học tiếp theo nhé!',
        color: 'text-indigo-700 bg-indigo-50 border-indigo-200',
        badge: 'Học lực Giỏi',
      };
    }
    if (score >= 6.5) {
      return {
        title: 'Khá Tốt! 👍',
        desc: 'Em nắm chắc kiến thức cơ bản, hãy rèn luyện thêm các câu vận dụng thực tế nhé.',
        color: 'text-sky-700 bg-sky-50 border-sky-200',
        badge: 'Học lực Khá',
      };
    }
    if (score >= 5.0) {
      return {
        title: 'Đạt Yêu Cầu 📚',
        desc: 'Em cần xem lại các hộp kiến thức ghi nhớ trong SGK để đạt điểm cao hơn.',
        color: 'text-amber-700 bg-amber-50 border-amber-200',
        badge: 'Trung bình',
      };
    }
    return {
      title: 'Cần Cố Gắng Hơn 💪',
      desc: 'Hãy đọc lại phần Tóm tắt 17 bài học trong ứng dụng và bấm làm lại nhé!',
      color: 'text-rose-700 bg-rose-50 border-rose-200',
      badge: 'Cần ôn tập lại',
    };
  };

  const rank = getRankInfo();

  const filteredQuestions = questions.filter((q) => {
    const isCorrect = userAnswers[q.id] === q.correctAnswer;
    if (filterMode === 'wrong') return !isCorrect;
    if (filterMode === 'correct') return isCorrect;
    return true;
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8 animate-in fade-in">
      
      {/* Result Hero Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-md p-6 sm:p-10 space-y-8 text-center relative overflow-hidden">
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-amber-400 to-amber-500 text-white flex items-center justify-center mx-auto shadow-lg shadow-amber-200">
          <Trophy className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <div className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-100 text-slate-700 mb-1">
            {rank.badge}
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900">
            {rank.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-lg mx-auto">
            {rank.desc}
          </p>
        </div>

        {/* Score & Main Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto pt-2">
          
          <div className="p-4 rounded-2xl bg-indigo-50/80 border border-indigo-100">
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider block">
              Điểm Số (Thang 10)
            </span>
            <div className="text-3xl sm:text-4xl font-extrabold text-indigo-950 mt-1">
              {score}
              <span className="text-base font-normal text-indigo-600">/10</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-100">
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider block">
              Số Câu Đúng
            </span>
            <div className="text-3xl sm:text-4xl font-extrabold text-emerald-950 mt-1">
              {correctCount}
              <span className="text-base font-normal text-emerald-600">/{totalQuestions}</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-rose-50/80 border border-rose-100">
            <span className="text-xs font-bold text-rose-600 uppercase tracking-wider block">
              Số Câu Sai
            </span>
            <div className="text-3xl sm:text-4xl font-extrabold text-rose-950 mt-1">
              {wrongCount}
              <span className="text-base font-normal text-rose-600">/{totalQuestions}</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              Thời Gian Làm
            </span>
            <div className="text-lg sm:text-xl font-extrabold text-slate-800 mt-2 flex items-center justify-center gap-1">
              <Clock className="w-4 h-4 text-slate-400" />
              <span>{formatTime(timeSpentSeconds)}</span>
            </div>
          </div>

        </div>

        {/* Stats breakdown by 3 Levels */}
        <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 text-left space-y-3">
          <h4 className="text-xs sm:text-sm font-bold text-slate-800 flex items-center gap-1.5">
            <Award className="w-4 h-4 text-indigo-600" />
            Kết Quả Phân Tích Theo 3 Cấp Độ Nhận Thức:
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Nhận biết */}
            <div className="bg-white p-3.5 rounded-xl border border-slate-200">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-bold text-emerald-700">Cấp độ 1: Nhận biết</span>
                <span className="font-semibold text-slate-600">
                  {statsByLevel.nhan_biet.correct}/{statsByLevel.nhan_biet.total}
                </span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-emerald-500 h-full rounded-full transition-all"
                  style={{
                    width: statsByLevel.nhan_biet.total > 0
                      ? `${Math.round((statsByLevel.nhan_biet.correct / statsByLevel.nhan_biet.total) * 100)}%`
                      : '0%'
                  }}
                />
              </div>
            </div>

            {/* Thông hiểu */}
            <div className="bg-white p-3.5 rounded-xl border border-slate-200">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-bold text-blue-700">Cấp độ 2: Thông hiểu</span>
                <span className="font-semibold text-slate-600">
                  {statsByLevel.thong_hieu.correct}/{statsByLevel.thong_hieu.total}
                </span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-blue-500 h-full rounded-full transition-all"
                  style={{
                    width: statsByLevel.thong_hieu.total > 0
                      ? `${Math.round((statsByLevel.thong_hieu.correct / statsByLevel.thong_hieu.total) * 100)}%`
                      : '0%'
                  }}
                />
              </div>
            </div>

            {/* Vận dụng */}
            <div className="bg-white p-3.5 rounded-xl border border-slate-200">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-bold text-amber-700">Cấp độ 3: Vận dụng</span>
                <span className="font-semibold text-slate-600">
                  {statsByLevel.van_dung.correct}/{statsByLevel.van_dung.total}
                </span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-amber-500 h-full rounded-full transition-all"
                  style={{
                    width: statsByLevel.van_dung.total > 0
                      ? `${Math.round((statsByLevel.van_dung.correct / statsByLevel.van_dung.total) * 100)}%`
                      : '0%'
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          {wrongCount > 0 && (
            <button
              onClick={() => onRetryWrongOnly(wrongQuestions)}
              className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm shadow-xs transition-colors flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Làm Lại {wrongCount} Câu Sai</span>
            </button>
          )}

          <button
            onClick={onRetryAll}
            className="px-5 py-3 rounded-xl border border-indigo-600 text-indigo-700 hover:bg-indigo-50 font-bold text-sm transition-colors flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Làm Lại Đề Này</span>
          </button>

          <button
            onClick={onNewQuiz}
            className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md transition-colors flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Tạo Đề Ôn Tập Mới</span>
          </button>

          <button
            onClick={onPrint}
            className="px-4 py-3 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold text-sm transition-colors flex items-center gap-1.5"
          >
            <Printer className="w-4 h-4" />
            <span>In Kết Quả</span>
          </button>
        </div>

      </div>

      {/* Detailed Review Section */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
        
        {/* Header & Filter Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              Chi Tiết Bài Làm & Lời Giải Thích
            </h3>
            <p className="text-xs text-slate-500">
              Xem lại từng câu, đối chiếu đáp án đúng và trích dẫn theo Sách giáo khoa
            </p>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setFilterMode('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                filterMode === 'all'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Tất cả ({questions.length})
            </button>
            <button
              onClick={() => setFilterMode('wrong')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                filterMode === 'wrong'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Câu sai ({wrongCount})
            </button>
            <button
              onClick={() => setFilterMode('correct')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                filterMode === 'correct'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Câu đúng ({correctCount})
            </button>
          </div>
        </div>

        {/* Questions list */}
        <div className="space-y-6">
          {filteredQuestions.map((q, idx) => {
            const originalIndex = questions.findIndex((orig) => orig.id === q.id);
            const userAns = userAnswers[q.id];
            const isCorrect = userAns === q.correctAnswer;

            return (
              <div 
                key={q.id}
                className={`p-5 sm:p-6 rounded-2xl border-2 transition-all space-y-4 ${
                  isCorrect
                    ? 'border-emerald-200 bg-emerald-50/20'
                    : 'border-rose-200 bg-rose-50/20'
                }`}
              >
                {/* Header */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-slate-900 text-sm">
                      Câu {originalIndex + 1}:
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                      q.level === 'nhan_biet'
                        ? 'bg-emerald-100 text-emerald-800'
                        : q.level === 'thong_hieu'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {q.level === 'nhan_biet' ? 'Nhận biết' : q.level === 'thong_hieu' ? 'Thông hiểu' : 'Vận dụng'}
                    </span>
                    <span className="text-xs text-slate-500">
                      {q.lessonTitle}
                    </span>
                  </div>

                  <div>
                    {isCorrect ? (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Đúng
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-700 bg-rose-100 px-2.5 py-1 rounded-full">
                        <XCircle className="w-3.5 h-3.5" /> Sai
                      </span>
                    )}
                  </div>
                </div>

                {/* Question */}
                <p className="font-bold text-slate-900 text-sm sm:text-base whitespace-pre-line">
                  {q.question}
                </p>

                {/* Options */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {q.options.map((opt, optIdx) => {
                    const label = ['A', 'B', 'C', 'D'][optIdx];
                    const isUserChoice = userAns === optIdx;
                    const isRightChoice = optIdx === q.correctAnswer;

                    let optBg = 'bg-white border-slate-200 text-slate-700';
                    if (isRightChoice) {
                      optBg = 'bg-emerald-100/90 border-emerald-400 text-emerald-950 font-bold ring-1 ring-emerald-500';
                    } else if (isUserChoice && !isRightChoice) {
                      optBg = 'bg-rose-100/90 border-rose-400 text-rose-950 font-bold ring-1 ring-rose-500 line-through';
                    }

                    return (
                      <div
                        key={optIdx}
                        className={`p-3 rounded-xl border text-xs sm:text-sm flex items-start gap-2.5 ${optBg}`}
                      >
                        <span className="w-5 h-5 rounded-md font-extrabold flex items-center justify-center shrink-0 bg-white/80 border text-slate-800 text-xs">
                          {label}
                        </span>
                        <span className="flex-1">{opt}</span>
                        {isRightChoice && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        )}
                        {isUserChoice && !isRightChoice && (
                          <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Explanation */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/90 space-y-1 text-xs sm:text-sm">
                  <span className="font-bold text-slate-800 block">
                    Lời giải thích chi tiết:
                  </span>
                  <p className="text-slate-600 leading-relaxed">
                    {q.explanation}
                  </p>
                  {q.textbookRef && (
                    <p className="text-[11px] font-semibold text-slate-500 pt-1 flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5" />
                      {q.textbookRef}
                    </p>
                  )}
                </div>

              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
};
