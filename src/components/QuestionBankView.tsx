import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  BookOpen, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  HelpCircle,
  Play
} from 'lucide-react';
import { INITIAL_QUESTIONS } from '../data/questions';
import { LESSONS, TOPICS } from '../data/lessons';
import { DifficultyLevel, Question, QuizSettings } from '../types';

interface QuestionBankViewProps {
  onStartSingleLessonQuiz: (lessonId: number) => void;
}

export const QuestionBankView: React.FC<QuestionBankViewProps> = ({
  onStartSingleLessonQuiz,
}) => {
  const [selectedTopicId, setSelectedTopicId] = useState<number | 'all'>('all');
  const [selectedLessonId, setSelectedLessonId] = useState<number | 'all'>('all');
  const [selectedLevel, setSelectedLevel] = useState<DifficultyLevel | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showAnswersMap, setShowAnswersMap] = useState<Record<string, boolean>>({});

  const toggleShowAnswer = (id: string) => {
    setShowAnswersMap((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const showAllAnswers = () => {
    const all: Record<string, boolean> = {};
    INITIAL_QUESTIONS.forEach((q) => {
      all[q.id] = true;
    });
    setShowAnswersMap(all);
  };

  const hideAllAnswers = () => {
    setShowAnswersMap({});
  };

  const filteredQuestions = INITIAL_QUESTIONS.filter((q) => {
    if (selectedTopicId !== 'all' && q.topicId !== selectedTopicId) return false;
    if (selectedLessonId !== 'all' && q.lessonId !== selectedLessonId) return false;
    if (selectedLevel !== 'all' && selectedLevel !== 'tong_hop' && q.level !== selectedLevel) return false;
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      const matchQ = q.question.toLowerCase().includes(term);
      const matchOpts = q.options.some((opt) => opt.toLowerCase().includes(term));
      const matchExpl = q.explanation.toLowerCase().includes(term);
      if (!matchQ && !matchOpts && !matchExpl) return false;
    }
    return true;
  });

  const availableLessons = selectedTopicId === 'all'
    ? LESSONS
    : LESSONS.filter((l) => l.topicId === selectedTopicId);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6 animate-in fade-in">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Ngân Hàng Câu Hỏi Tin Học 6
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Tra cứu toàn bộ {INITIAL_QUESTIONS.length} câu hỏi chuẩn SGK Kết nối tri thức được phân loại theo 3 cấp độ
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={showAllAnswers}
            className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" /> Hiện Tất Cả Đáp Án
          </button>
          <button
            onClick={hideAllAnswers}
            className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 transition-colors"
          >
            <EyeOff className="w-3.5 h-3.5" /> Ẩn Đáp Án
          </button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 space-y-4">
        
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Tìm kiếm từ khóa câu hỏi, nội dung, đáp án (ví dụ: bit, Internet, CPU, Word, Scratch...)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
          />
        </div>

        {/* Select Dropdowns */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          
          {/* Topic */}
          <div>
            <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
              Chủ Đề
            </label>
            <select
              value={selectedTopicId}
              onChange={(e) => {
                const val = e.target.value === 'all' ? 'all' : Number(e.target.value);
                setSelectedTopicId(val);
                setSelectedLessonId('all');
              }}
              className="w-full py-2 px-3 rounded-xl border border-slate-200 text-xs font-semibold bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="all">Tất cả 6 chủ đề</option>
              {TOPICS.map((t) => (
                <option key={t.id} value={t.id}>{t.title}</option>
              ))}
            </select>
          </div>

          {/* Lesson */}
          <div>
            <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
              Bài Học
            </label>
            <select
              value={selectedLessonId}
              onChange={(e) => {
                const val = e.target.value === 'all' ? 'all' : Number(e.target.value);
                setSelectedLessonId(val);
              }}
              className="w-full py-2 px-3 rounded-xl border border-slate-200 text-xs font-semibold bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="all">Tất cả bài học</option>
              {availableLessons.map((l) => (
                <option key={l.id} value={l.id}>{l.title}</option>
              ))}
            </select>
          </div>

          {/* Level */}
          <div>
            <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
              Cấp Độ Nhận Thức
            </label>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value as DifficultyLevel | 'all')}
              className="w-full py-2 px-3 rounded-xl border border-slate-200 text-xs font-semibold bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="all">Tất cả cấp độ</option>
              <option value="nhan_biet">Cấp độ 1: Nhận biết</option>
              <option value="thong_hieu">Cấp độ 2: Thông hiểu</option>
              <option value="van_dung">Cấp độ 3: Vận dụng</option>
            </select>
          </div>

        </div>

        {/* Found count indicator */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
          <span>Tìm thấy <strong className="text-indigo-600">{filteredQuestions.length}</strong> câu hỏi phù hợp</span>
          {selectedLessonId !== 'all' && (
            <button
              onClick={() => onStartSingleLessonQuiz(Number(selectedLessonId))}
              className="text-indigo-600 hover:text-indigo-800 font-bold flex items-center gap-1"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              Làm bài thi bài học này ngay
            </button>
          )}
        </div>

      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {filteredQuestions.map((q, idx) => {
          const isRevealed = !!showAnswersMap[q.id];

          return (
            <div 
              key={q.id}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 sm:p-6 space-y-4 hover:border-slate-300 transition-all"
            >
              {/* Question Header */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-700 font-bold text-xs flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                    q.level === 'nhan_biet'
                      ? 'bg-emerald-100 text-emerald-800'
                      : q.level === 'thong_hieu'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {q.level === 'nhan_biet' ? 'Nhận biết' : q.level === 'thong_hieu' ? 'Thông hiểu' : 'Vận dụng'}
                  </span>
                  <span className="text-xs font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
                    {q.lessonTitle}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => toggleShowAnswer(q.id)}
                  className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 bg-indigo-50 px-2.5 py-1 rounded-lg"
                >
                  {isRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  <span>{isRevealed ? 'Ẩn đáp án' : 'Xem đáp án & giải thích'}</span>
                </button>
              </div>

              {/* Question Text */}
              <h3 className="font-bold text-slate-900 text-sm sm:text-base whitespace-pre-line">
                {q.question}
              </h3>

              {/* Options Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {q.options.map((opt, optIdx) => {
                  const label = ['A', 'B', 'C', 'D'][optIdx];
                  const isCorrect = optIdx === q.correctAnswer;

                  return (
                    <div
                      key={optIdx}
                      className={`p-3 rounded-xl border text-xs sm:text-sm flex items-start gap-2.5 ${
                        isRevealed && isCorrect
                          ? 'border-emerald-400 bg-emerald-50 text-emerald-950 font-bold ring-1 ring-emerald-500'
                          : 'border-slate-200 bg-white text-slate-700'
                      }`}
                    >
                      <span className={`w-5 h-5 rounded-md font-bold flex items-center justify-center shrink-0 text-xs ${
                        isRevealed && isCorrect
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-100 text-slate-700'
                      }`}>
                        {label}
                      </span>
                      <span className="flex-1">{opt}</span>
                      {isRevealed && isCorrect && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Revealed Explanation */}
              {isRevealed && (
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs sm:text-sm space-y-1.5 animate-in fade-in">
                  <div className="font-bold text-slate-800 flex items-center gap-1.5">
                    <span className="text-emerald-600 font-extrabold">
                      Đáp án đúng: {['A', 'B', 'C', 'D'][q.correctAnswer]}
                    </span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    {q.explanation}
                  </p>
                  {q.textbookRef && (
                    <p className="text-[11px] font-semibold text-slate-500 flex items-center gap-1 pt-1">
                      <BookOpen className="w-3.5 h-3.5" />
                      {q.textbookRef}
                    </p>
                  )}
                </div>
              )}

            </div>
          );
        })}
      </div>

    </div>
  );
};
