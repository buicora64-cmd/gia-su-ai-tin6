import React, { useState } from 'react';
import { 
  RotateCw, 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  Shuffle, 
  BookOpen, 
  Award,
  Sparkles
} from 'lucide-react';
import { INITIAL_QUESTIONS } from '../data/questions';
import { LESSONS } from '../data/lessons';
import { shuffleArray } from '../utils/quizGenerator';
import { Question } from '../types';

export const FlashcardsView: React.FC = () => {
  const [selectedLessonId, setSelectedLessonId] = useState<number | 'all'>('all');
  const [cards, setCards] = useState<Question[]>(INITIAL_QUESTIONS);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [masteredIds, setMasteredIds] = useState<Set<string>>(new Set());

  const handleLessonFilter = (lessonId: number | 'all') => {
    setSelectedLessonId(lessonId);
    let filtered = INITIAL_QUESTIONS;
    if (lessonId !== 'all') {
      filtered = INITIAL_QUESTIONS.filter((q) => q.lessonId === lessonId);
    }
    setCards(filtered);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const handleShuffle = () => {
    setCards(shuffleArray(cards));
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const currentCard = cards[currentIndex] || cards[0];

  const handleNext = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setIsFlipped(false);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setIsFlipped(false);
    }
  };

  const toggleMastered = (id: string) => {
    setMasteredIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const isMastered = currentCard ? masteredIds.has(currentCard.id) : false;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6 animate-in fade-in">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Thẻ Ghi Nhớ (Flashcards)
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Lật thẻ ôn nhanh các khái niệm trọng tâm của Tin học 6 Kết nối tri thức
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShuffle}
            className="px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 transition-colors"
          >
            <Shuffle className="w-3.5 h-3.5" /> Xáo Trộn
          </button>
        </div>
      </div>

      {/* Filter by lesson */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 flex flex-wrap items-center justify-between gap-3">
        <label className="text-xs font-bold text-slate-700">
          Lọc theo bài học:
        </label>
        <select
          value={selectedLessonId}
          onChange={(e) => handleLessonFilter(e.target.value === 'all' ? 'all' : Number(e.target.value))}
          className="py-1.5 px-3 rounded-xl border border-slate-200 text-xs font-semibold bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
        >
          <option value="all">Toàn bộ 17 bài học ({INITIAL_QUESTIONS.length} thẻ)</option>
          {LESSONS.map((l) => (
            <option key={l.id} value={l.id}>{l.title}</option>
          ))}
        </select>
        <div className="text-xs text-slate-500">
          Đã nhớ: <strong className="text-emerald-600">{masteredIds.size}</strong>/{cards.length}
        </div>
      </div>

      {/* Flashcard Component */}
      {currentCard && (
        <div className="space-y-4">
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="w-full min-h-[320px] sm:min-h-[360px] bg-white rounded-3xl border-2 border-slate-200 shadow-md hover:shadow-lg transition-all p-6 sm:p-10 flex flex-col justify-between cursor-pointer select-none relative group"
          >
            {/* Card Header */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                Thẻ {currentIndex + 1} / {cards.length}
              </span>
              <span className="text-xs text-indigo-600 font-semibold flex items-center gap-1">
                <RotateCw className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-500" />
                Nhấp để lật thẻ
              </span>
            </div>

            {/* Card Body */}
            <div className="py-6 text-center my-auto">
              {!isFlipped ? (
                /* Front Side: Question */
                <div className="space-y-4 animate-in fade-in">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">
                    CÂU HỎI
                  </span>
                  <h3 className="text-lg sm:text-2xl font-bold text-slate-900 leading-snug whitespace-pre-line">
                    {currentCard.question}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {currentCard.lessonTitle}
                  </p>
                </div>
              ) : (
                /* Back Side: Answer & Explanation */
                <div className="space-y-4 animate-in fade-in">
                  <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest block">
                    ĐÁP ÁN ĐÚNG & GIẢI THÍCH
                  </span>
                  <div className="text-xl sm:text-2xl font-extrabold text-emerald-700">
                    {['A', 'B', 'C', 'D'][currentCard.correctAnswer]}. {currentCard.options[currentCard.correctAnswer]}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
                    {currentCard.explanation}
                  </p>
                  {currentCard.textbookRef && (
                    <p className="text-xs font-semibold text-slate-400 flex items-center justify-center gap-1">
                      <BookOpen className="w-3.5 h-3.5" /> {currentCard.textbookRef}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Card Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                currentCard.level === 'nhan_biet'
                  ? 'bg-emerald-100 text-emerald-800'
                  : currentCard.level === 'thong_hieu'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-amber-100 text-amber-800'
              }`}>
                {currentCard.level === 'nhan_biet' ? 'Nhận biết' : currentCard.level === 'thong_hieu' ? 'Thông hiểu' : 'Vận dụng'}
              </span>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMastered(currentCard.id);
                }}
                className={`text-xs font-bold px-3 py-1.5 rounded-xl border transition-colors flex items-center gap-1.5 ${
                  isMastered
                    ? 'bg-emerald-500 text-white border-emerald-500'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{isMastered ? 'Đã thuộc thẻ này' : 'Đánh dấu đã thuộc'}</span>
              </button>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="flex-1 py-3 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed font-bold text-xs sm:text-sm text-slate-700 flex items-center justify-center gap-2 shadow-xs transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Thẻ Trước</span>
            </button>

            <button
              onClick={handleNext}
              disabled={currentIndex === cards.length - 1}
              className="flex-1 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed font-bold text-xs sm:text-sm text-white flex items-center justify-center gap-2 shadow-md transition-colors"
            >
              <span>Thẻ Kế Tiếp</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
