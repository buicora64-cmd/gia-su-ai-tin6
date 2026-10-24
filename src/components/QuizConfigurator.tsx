import React, { useState } from 'react';
import { 
  BookOpen, 
  HelpCircle, 
  Sliders, 
  Play, 
  CheckCircle2, 
  Clock, 
  CheckSquare, 
  Square,
  Sparkles,
  Info,
  ChevronDown,
  ChevronUp,
  Award
} from 'lucide-react';
import { LESSONS, TOPICS } from '../data/lessons';
import { DifficultyLevel, QuizMode, QuizSettings } from '../types';
import { INITIAL_QUESTIONS } from '../data/questions';

interface QuizConfiguratorProps {
  onStartQuiz: (settings: QuizSettings) => void;
  onOpenPrintModal: (settings: QuizSettings) => void;
}

export const QuizConfigurator: React.FC<QuizConfiguratorProps> = ({
  onStartQuiz,
  onOpenPrintModal,
}) => {
  // Lesson selection: array of IDs. If empty, all are selected.
  const [selectedLessonIds, setSelectedLessonIds] = useState<number[]>([]);
  const [questionCount, setQuestionCount] = useState<number>(10);
  const [customCountInput, setCustomCountInput] = useState<string>('');
  const [isCustomCount, setIsCustomCount] = useState<boolean>(false);
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('tong_hop');
  const [mode, setMode] = useState<QuizMode>('practice');
  const [timeLimitMinutes, setTimeLimitMinutes] = useState<number>(15);
  const [shuffleOptions, setShuffleOptions] = useState<boolean>(true);
  const [expandedTopics, setExpandedTopics] = useState<Record<number, boolean>>({
    1: true,
    2: true,
  });

  // Calculate available questions matching current selection
  const pool = INITIAL_QUESTIONS.filter((q) => {
    if (selectedLessonIds.length === 0) return true;
    return selectedLessonIds.includes(q.lessonId);
  });

  const availableByLevel = {
    all: pool.length,
    nhan_biet: pool.filter((q) => q.level === 'nhan_biet').length,
    thong_hieu: pool.filter((q) => q.level === 'thong_hieu').length,
    van_dung: pool.filter((q) => q.level === 'van_dung').length,
  };

  const isAllSelected = selectedLessonIds.length === 0 || selectedLessonIds.length === LESSONS.length;

  const handleToggleAllLessons = () => {
    if (isAllSelected) {
      setSelectedLessonIds([1]); // Default select at least 1 lesson
    } else {
      setSelectedLessonIds([]); // Empty means ALL
    }
  };

  const handleToggleTopic = (topicId: number) => {
    const topic = TOPICS.find((t) => t.id === topicId);
    if (!topic) return;

    const topicLessonIds = topic.lessonIds;
    const allTopicSelected = topicLessonIds.every((id) => selectedLessonIds.includes(id));

    if (allTopicSelected) {
      // Remove them
      const next = selectedLessonIds.filter((id) => !topicLessonIds.includes(id));
      setSelectedLessonIds(next.length === 0 ? [1] : next);
    } else {
      // Add all
      const next = Array.from(new Set([...selectedLessonIds, ...topicLessonIds]));
      setSelectedLessonIds(next);
    }
  };

  const handleToggleLesson = (lessonId: number) => {
    if (selectedLessonIds.length === 0) {
      // Currently "all" is selected, clicking one isolates it
      setSelectedLessonIds([lessonId]);
      return;
    }

    if (selectedLessonIds.includes(lessonId)) {
      if (selectedLessonIds.length === 1) {
        // Don't uncheck the last one, revert to all
        setSelectedLessonIds([]);
      } else {
        setSelectedLessonIds(selectedLessonIds.filter((id) => id !== lessonId));
      }
    } else {
      const next = [...selectedLessonIds, lessonId];
      if (next.length === LESSONS.length) {
        setSelectedLessonIds([]); // All
      } else {
        setSelectedLessonIds(next);
      }
    }
  };

  const handleCountPreset = (count: number) => {
    setIsCustomCount(false);
    setQuestionCount(count);
  };

  const handleCustomCountChange = (val: string) => {
    setCustomCountInput(val);
    const num = parseInt(val, 10);
    if (!isNaN(num) && num > 0) {
      setQuestionCount(Math.min(50, Math.max(1, num)));
    }
  };

  const toggleTopicAccordion = (topicId: number) => {
    setExpandedTopics((prev) => ({
      ...prev,
      [topicId]: !prev[topicId],
    }));
  };

  const handleStart = () => {
    const finalCount = isCustomCount
      ? parseInt(customCountInput, 10) || 10
      : questionCount;

    const maxAvailable = pool.length > 0 ? pool.length : INITIAL_QUESTIONS.length;
    const safeCount = Math.min(maxAvailable, Math.max(1, finalCount));

    const settings: QuizSettings = {
      selectedLessonIds: isAllSelected ? [] : selectedLessonIds,
      questionCount: safeCount,
      difficulty,
      mode,
      timeLimitMinutes: mode === 'exam' ? timeLimitMinutes : 0,
      shuffleOptions,
      matrixRatio: { nhanBiet: 40, thongHieu: 30, vanDung: 30 },
    };

    onStartQuiz(settings);
  };

  const handleOpenPrint = () => {
    const finalCount = isCustomCount
      ? parseInt(customCountInput, 10) || 10
      : questionCount;

    const maxAvailable = pool.length > 0 ? pool.length : INITIAL_QUESTIONS.length;
    const safeCount = Math.min(maxAvailable, Math.max(1, finalCount));

    const settings: QuizSettings = {
      selectedLessonIds: isAllSelected ? [] : selectedLessonIds,
      questionCount: safeCount,
      difficulty,
      mode,
      timeLimitMinutes,
      shuffleOptions,
      matrixRatio: { nhanBiet: 40, thongHieu: 30, vanDung: 30 },
    };

    onOpenPrintModal(settings);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 sm:py-10 space-y-8">
      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-indigo-700 via-indigo-600 to-sky-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-indigo-100 relative overflow-hidden">
        <div className="absolute -right-8 -bottom-8 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 border border-white/20">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            Tác giả: GV: CÔ RA AI
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-2 uppercase">
            GIA SƯ TIN HỌC 6
          </h1>
          <p className="text-amber-200 font-semibold text-xs sm:text-sm mb-3">
            Hệ Thống Tạo Câu Hỏi Ôn Tập & Đề Thi Trắc Nghiệm Thông Minh
          </p>
          <p className="text-indigo-100 text-sm sm:text-base leading-relaxed">
            Học sinh chọn bài học, chọn số lượng câu hỏi và lựa chọn 3 cấp độ nhận thức (Nhận biết, Thông hiểu, Vận dụng hoặc Tổng hợp cả 3 cấp độ) để bắt đầu luyện tập!
          </p>
        </div>
      </div>

      {/* Main Configuration Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-8">
        
        {/* ================= SECTION 1: CHỌN BÀI HỌC ================= */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-sm">
                1
              </span>
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Chọn Bài Học
                </h2>
                <p className="text-xs text-slate-500">
                  {isAllSelected
                    ? 'Đang chọn toàn bộ 17 bài học (Toàn bộ SGK Tin học 6)'
                    : `Đang chọn ${selectedLessonIds.length} bài học cụ thể`}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleToggleAllLessons}
              className={`text-xs sm:text-sm font-semibold px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
                isAllSelected
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              {isAllSelected ? 'Đã chọn tất cả 17 bài' : 'Chọn tất cả 17 bài'}
            </button>
          </div>

          {/* Topics and Lessons Accordions */}
          <div className="space-y-3">
            {TOPICS.map((topic) => {
              const isExpanded = !!expandedTopics[topic.id];
              const topicLessons = LESSONS.filter((l) => l.topicId === topic.id);
              const selectedInTopicCount = isAllSelected
                ? topicLessons.length
                : topicLessons.filter((l) => selectedLessonIds.includes(l.id)).length;
              const isTopicFull = selectedInTopicCount === topicLessons.length;

              return (
                <div 
                  key={topic.id}
                  className="border border-slate-200 rounded-2xl overflow-hidden transition-all"
                >
                  {/* Topic Header */}
                  <div className="bg-slate-50/80 px-4 py-3 flex items-center justify-between gap-3 hover:bg-slate-100/80 transition-colors">
                    <div 
                      onClick={() => toggleTopicAccordion(topic.id)}
                      className="flex-1 flex items-center gap-2.5 cursor-pointer select-none"
                    >
                      <button 
                        type="button"
                        className="text-slate-400 hover:text-slate-600 p-0.5"
                      >
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                      <span className="font-semibold text-slate-800 text-sm sm:text-base">
                        {topic.title}
                      </span>
                      <span className="text-xs text-slate-500 hidden sm:inline">
                        ({selectedInTopicCount}/{topicLessons.length} bài)
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleToggleTopic(topic.id)}
                      className="text-xs font-medium text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1"
                    >
                      {isTopicFull ? (
                        <>
                          <CheckSquare className="w-3.5 h-3.5 text-indigo-600" />
                          <span>Bỏ chọn</span>
                        </>
                      ) : (
                        <>
                          <Square className="w-3.5 h-3.5 text-slate-400" />
                          <span>Chọn cả chủ đề</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Lessons Grid in Topic */}
                  {isExpanded && (
                    <div className="p-3 sm:p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 bg-white">
                      {topicLessons.map((lesson) => {
                        const isSelected = isAllSelected || selectedLessonIds.includes(lesson.id);
                        return (
                          <div
                            key={lesson.id}
                            onClick={() => handleToggleLesson(lesson.id)}
                            className={`p-3 rounded-xl border text-left cursor-pointer transition-all select-none flex items-start gap-2.5 ${
                              isSelected
                                ? 'border-indigo-500 bg-indigo-50/50 text-indigo-950 ring-1 ring-indigo-500/20 shadow-xs'
                                : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white hover:bg-slate-50'
                            }`}
                          >
                            <div className="mt-0.5">
                              {isSelected ? (
                                <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                              ) : (
                                <div className="w-4 h-4 rounded-full border border-slate-300 shrink-0" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs sm:text-sm font-semibold truncate">
                                {lesson.title}
                              </p>
                              <p className="text-[11px] text-slate-500 mt-0.5 truncate">
                                {lesson.pages}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ================= SECTION 2: CHỌN SỐ LƯỢNG CÂU HỎI ================= */}
        <div className="space-y-4">
          <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
            <span className="w-8 h-8 rounded-xl bg-sky-100 text-sky-700 font-bold flex items-center justify-center text-sm">
              2
            </span>
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Chọn Số Lượng Câu Hỏi
              </h2>
              <p className="text-xs text-slate-500">
                Chọn mức có sẵn hoặc nhập số câu hỏi mong muốn (từ 1 đến 50 câu)
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-7 gap-2.5">
            {[5, 10, 15, 20, 25, 30].map((count) => {
              const active = !isCustomCount && questionCount === count;
              return (
                <button
                  key={count}
                  type="button"
                  onClick={() => handleCountPreset(count)}
                  className={`py-3 px-2 rounded-2xl border text-center font-bold text-sm transition-all ${
                    active
                      ? 'border-sky-500 bg-sky-500 text-white shadow-md shadow-sky-100 scale-102'
                      : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  {count} câu
                </button>
              );
            })}

            {/* Custom count button & input */}
            <div
              onClick={() => setIsCustomCount(true)}
              className={`p-1.5 rounded-2xl border flex flex-col items-center justify-center cursor-pointer transition-all ${
                isCustomCount
                  ? 'border-sky-500 bg-sky-50 ring-1 ring-sky-500/20'
                  : 'border-slate-200 bg-white hover:bg-slate-50'
              }`}
            >
              {isCustomCount ? (
                <div className="w-full flex items-center justify-center gap-1">
                  <input
                    type="number"
                    min="1"
                    max="50"
                    placeholder="Số câu"
                    value={customCountInput}
                    onChange={(e) => handleCustomCountChange(e.target.value)}
                    autoFocus
                    className="w-12 text-center text-xs font-bold bg-white border border-sky-400 rounded-lg py-1 px-0.5 focus:outline-none focus:ring-1 focus:ring-sky-500"
                  />
                  <span className="text-[10px] text-slate-600 font-bold">câu</span>
                </div>
              ) : (
                <span className="text-xs font-semibold text-slate-600">
                  Tùy chỉnh
                </span>
              )}
            </div>
          </div>

          {/* Info note if pool has fewer questions than requested */}
          {pool.length < (isCustomCount ? (parseInt(customCountInput, 10) || questionCount) : questionCount) && (
            <div className="p-3 rounded-2xl bg-amber-50/80 border border-amber-200 text-amber-900 text-xs flex items-center gap-2">
              <Info className="w-4 h-4 text-amber-600 shrink-0" />
              <span>
                Các bài học đã chọn hiện có <strong>{pool.length} câu hỏi</strong> chuẩn. Hệ thống sẽ tự động tạo đề với tối đa <strong>{pool.length} câu hỏi duy nhất</strong>, không bị trùng lặp câu.
              </span>
            </div>
          )}
        </div>

        {/* ================= SECTION 3: 3 CẤP ĐỘ VÀ TỔNG HỢP 3 CẤP ĐỘ ================= */}
        <div className="space-y-4">
          <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
            <span className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 font-bold flex items-center justify-center text-sm">
              3
            </span>
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Chọn Cấp Độ Nhận Thức
              </h2>
              <p className="text-xs text-slate-500">
                Chọn riêng từng cấp độ (3 cấp độ) hoặc Tổng hợp cả 3 cấp độ theo ma trận đề thi
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            
            {/* Cấp độ 1: Nhận biết */}
            <div
              onClick={() => setDifficulty('nhan_biet')}
              className={`p-4 rounded-2xl border-2 cursor-pointer transition-all text-left relative overflow-hidden select-none ${
                difficulty === 'nhan_biet'
                  ? 'border-emerald-500 bg-emerald-50/70 shadow-md shadow-emerald-50 ring-2 ring-emerald-500/20'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  Cấp độ 1
                </span>
                {difficulty === 'nhan_biet' && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                )}
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-1">
                Nhận Biết
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Kiểm tra định nghĩa, khái niệm, thuật ngữ và thành phần cơ bản trong SGK.
              </p>
              <div className="mt-3 text-[11px] font-semibold text-emerald-700 bg-emerald-100/60 px-2 py-1 rounded-md inline-block">
                Có {availableByLevel.nhan_biet} câu hỏi
              </div>
            </div>

            {/* Cấp độ 2: Thông hiểu */}
            <div
              onClick={() => setDifficulty('thong_hieu')}
              className={`p-4 rounded-2xl border-2 cursor-pointer transition-all text-left relative overflow-hidden select-none ${
                difficulty === 'thong_hieu'
                  ? 'border-blue-500 bg-blue-50/70 shadow-md shadow-blue-50 ring-2 ring-blue-500/20'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                  Cấp độ 2
                </span>
                {difficulty === 'thong_hieu' && (
                  <CheckCircle2 className="w-5 h-5 text-blue-600" />
                )}
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-1">
                Thông Hiểu
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Phân biệt thông tin/vật mang tin, so sánh ưu nhược điểm, giải thích quy tắc.
              </p>
              <div className="mt-3 text-[11px] font-semibold text-blue-700 bg-blue-100/60 px-2 py-1 rounded-md inline-block">
                Có {availableByLevel.thong_hieu} câu hỏi
              </div>
            </div>

            {/* Cấp độ 3: Vận dụng */}
            <div
              onClick={() => setDifficulty('van_dung')}
              className={`p-4 rounded-2xl border-2 cursor-pointer transition-all text-left relative overflow-hidden select-none ${
                difficulty === 'van_dung'
                  ? 'border-amber-500 bg-amber-50/70 shadow-md shadow-amber-50 ring-2 ring-amber-500/20'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                  Cấp độ 3
                </span>
                {difficulty === 'van_dung' && (
                  <CheckCircle2 className="w-5 h-5 text-amber-600" />
                )}
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-1">
                Vận Dụng
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Xử lí tình huống thực tế, bài toán đổi đơn vị byte, thuật toán, Scratch.
              </p>
              <div className="mt-3 text-[11px] font-semibold text-amber-700 bg-amber-100/60 px-2 py-1 rounded-md inline-block">
                Có {availableByLevel.van_dung} câu hỏi
              </div>
            </div>

            {/* Cấp độ 4: Tổng hợp cả 3 cấp độ */}
            <div
              onClick={() => setDifficulty('tong_hop')}
              className={`p-4 rounded-2xl border-2 cursor-pointer transition-all text-left relative overflow-hidden select-none ${
                difficulty === 'tong_hop'
                  ? 'border-purple-600 bg-purple-50 shadow-md shadow-purple-100 ring-2 ring-purple-600/20'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-purple-100 text-purple-800">
                  Khuyên Dùng
                </span>
                {difficulty === 'tong_hop' && (
                  <CheckCircle2 className="w-5 h-5 text-purple-600" />
                )}
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-1 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-purple-600" />
                Tổng Hợp 3 Cấp Độ
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Kết hợp cân đối cả 3 cấp độ (40% Nhận biết, 30% Thông hiểu, 30% Vận dụng).
              </p>
              <div className="mt-3 text-[11px] font-semibold text-purple-700 bg-purple-100 px-2 py-1 rounded-md inline-block">
                Kho {availableByLevel.all} câu hỏi
              </div>
            </div>

          </div>

          {/* Matrix explanation banner if Tong hop is selected */}
          {difficulty === 'tong_hop' && (
            <div className="bg-purple-50/70 border border-purple-200/80 rounded-2xl p-4 flex items-start gap-3">
              <Info className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm text-purple-900">
                <p className="font-semibold">
                  Ma trận phân bố câu hỏi theo chuẩn giáo dục:
                </p>
                <div className="flex flex-wrap items-center gap-3 mt-1.5 font-medium">
                  <span className="inline-flex items-center gap-1 bg-white px-2 py-0.5 rounded-md border border-purple-200 text-emerald-700">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    Nhận biết: 40%
                  </span>
                  <span className="inline-flex items-center gap-1 bg-white px-2 py-0.5 rounded-md border border-purple-200 text-blue-700">
                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                    Thông hiểu: 30%
                  </span>
                  <span className="inline-flex items-center gap-1 bg-white px-2 py-0.5 rounded-md border border-purple-200 text-amber-700">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    Vận dụng: 30%
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ================= SECTION 4: CHẾ ĐỘ LÀM BÀI & THỜI GIAN ================= */}
        <div className="space-y-4">
          <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
            <span className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 font-bold flex items-center justify-center text-sm">
              4
            </span>
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Chế Độ Làm Bài
              </h2>
              <p className="text-xs text-slate-500">
                Luyện tập tự do hoặc thi thử có tính giờ
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div
              onClick={() => setMode('practice')}
              className={`p-4 rounded-2xl border-2 cursor-pointer transition-all text-left flex items-start gap-3 select-none ${
                mode === 'practice'
                  ? 'border-indigo-600 bg-indigo-50/60 shadow-xs ring-1 ring-indigo-500/20'
                  : 'border-slate-200 bg-white hover:bg-slate-50'
              }`}
            >
              <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
                <BookOpen className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                  Chế Độ Luyện Tập
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  Xem ngay đáp án đúng/sai và lời giải thích chi tiết trích từ SGK sau mỗi câu. Không áp lực thời gian.
                </p>
              </div>
            </div>

            <div
              onClick={() => setMode('exam')}
              className={`p-4 rounded-2xl border-2 cursor-pointer transition-all text-left flex items-start gap-3 select-none ${
                mode === 'exam'
                  ? 'border-indigo-600 bg-indigo-50/60 shadow-xs ring-1 ring-indigo-500/20'
                  : 'border-slate-200 bg-white hover:bg-slate-50'
              }`}
            >
              <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                  Chế Độ Kiểm Tra / Thi Thử
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  Đồng hồ đếm ngược, nộp bài tính điểm thang 10 và xem báo cáo tổng kết chi tiết sau khi kết thúc.
                </p>
              </div>
            </div>
          </div>

          {/* Time Limit Setting for Exam mode */}
          {mode === 'exam' && (
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs sm:text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-slate-500" />
                Thời gian làm bài:
              </span>
              <div className="flex items-center gap-2">
                {[10, 15, 20, 45].map((mins) => (
                  <button
                    key={mins}
                    type="button"
                    onClick={() => setTimeLimitMinutes(mins)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      timeLimitMinutes === mins
                        ? 'bg-rose-600 text-white shadow-xs'
                        : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {mins} phút
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <label className="flex items-center gap-2 cursor-pointer select-none text-xs text-slate-600">
            <input
              type="checkbox"
              checked={shuffleOptions}
              onChange={(e) => setShuffleOptions(e.target.checked)}
              className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300"
            />
            <span>Xáo trộn ngẫu nhiên thứ tự phương án A, B, C, D</span>
          </label>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleOpenPrint}
              className="flex-1 sm:flex-initial px-5 py-3.5 rounded-2xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-sm transition-all"
            >
              Xem Trước / In Đề
            </button>

            <button
              type="button"
              onClick={handleStart}
              className="flex-1 sm:flex-initial px-8 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-sky-600 hover:from-indigo-700 hover:to-sky-700 text-white font-bold text-sm sm:text-base shadow-lg shadow-indigo-200 hover:shadow-indigo-300 hover:scale-102 active:scale-98 transition-all flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4 fill-white" />
              Bắt Đầu Làm Bài
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
