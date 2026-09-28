import React, { useState } from 'react';
import { 
  BookOpen, 
  ChevronDown, 
  ChevronUp, 
  Play, 
  CheckCircle2, 
  Laptop, 
  Globe, 
  Search, 
  ShieldAlert, 
  FileText, 
  Cpu,
  Layers,
  Sparkles
} from 'lucide-react';
import { LESSONS, TOPICS } from '../data/lessons';

interface LessonNotesProps {
  onStartLessonQuiz: (lessonId: number) => void;
}

export const LessonNotes: React.FC<LessonNotesProps> = ({
  onStartLessonQuiz,
}) => {
  const [selectedTopicId, setSelectedTopicId] = useState<number | 'all'>('all');
  const [expandedLessonId, setExpandedLessonId] = useState<number | null>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const getTopicIcon = (iconName: string, className = "w-5 h-5") => {
    switch (iconName) {
      case 'Laptop': return <Laptop className={className} />;
      case 'Globe': return <Globe className={className} />;
      case 'Search': return <Search className={className} />;
      case 'ShieldAlert': return <ShieldAlert className={className} />;
      case 'FileText': return <FileText className={className} />;
      case 'Cpu': return <Cpu className={className} />;
      default: return <BookOpen className={className} />;
    }
  };

  const getTopicShortTitle = (id: number) => {
    switch (id) {
      case 1: return 'Máy tính & cộng đồng';
      case 2: return 'Mạng máy tính & Internet';
      case 3: return 'Lưu trữ & Tìm kiếm';
      case 4: return 'Đạo đức & An toàn số';
      case 5: return 'Ứng dụng tin học';
      case 6: return 'Thuật toán & Scratch';
      default: return '';
    }
  };

  const getTopicLessonRange = (id: number) => {
    switch (id) {
      case 1: return 'Bài 1 - 3';
      case 2: return 'Bài 4 - 5';
      case 3: return 'Bài 6 - 8';
      case 4: return 'Bài 9';
      case 5: return 'Bài 10 - 14';
      case 6: return 'Bài 15 - 17';
      default: return '';
    }
  };

  // Filter lessons according to selected topic and optional search
  const filteredLessons = LESSONS.filter((lesson) => {
    if (selectedTopicId !== 'all' && lesson.topicId !== selectedTopicId) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = lesson.title.toLowerCase().includes(q);
      const matchDesc = lesson.shortDesc.toLowerCase().includes(q);
      const matchPoints = lesson.keyPoints.some(pt => pt.toLowerCase().includes(q));
      return matchTitle || matchDesc || matchPoints;
    }
    return true;
  });

  const activeTopicObj = TOPICS.find((t) => t.id === selectedTopicId);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8 animate-in fade-in">
      
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
          <BookOpen className="w-3.5 h-3.5" />
          Sách Giáo Khoa Tin Học 6 - Kết Nối Tri Thức
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Tóm Tắt Trọng Tâm 17 Bài Học
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Bấm chọn vào từng Chủ đề (1 đến 6) hoặc chọn "Tất cả" để xem chi tiết hộp kiến thức cốt lõi chuẩn SGK
        </p>
      </div>

      {/* Grid of all 6 Topics + View All button - Guaranteed visible and responsive */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-indigo-600" />
            Chọn Chủ Đề Cần Xem (Đầy đủ 6 Chủ đề):
          </span>
          <button
            onClick={() => {
              setSelectedTopicId('all');
              setExpandedLessonId(1);
            }}
            className={`text-xs font-bold px-3 py-1.5 rounded-xl border transition-all ${
              selectedTopicId === 'all'
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            Xem Tất Cả 6 Chủ Đề (17 Bài)
          </button>
        </div>

        {/* 6 Topics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {TOPICS.map((t) => {
            const isSelected = selectedTopicId === t.id;
            return (
              <button
                key={t.id}
                onClick={() => {
                  setSelectedTopicId(t.id);
                  const firstInTopic = LESSONS.find((l) => l.topicId === t.id);
                  if (firstInTopic) setExpandedLessonId(firstInTopic.id);
                }}
                className={`p-3 rounded-2xl border-2 text-left transition-all relative flex flex-col justify-between group cursor-pointer ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-50/90 shadow-md ring-2 ring-indigo-500/20'
                    : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className={`p-2 rounded-xl transition-transform group-hover:scale-110 ${
                      isSelected
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-100 text-slate-600'
                    }`}>
                      {getTopicIcon(t.iconName, "w-4 h-4")}
                    </div>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-600">
                      {getTopicLessonRange(t.id)}
                    </span>
                  </div>

                  <span className={`text-xs font-extrabold block ${
                    isSelected ? 'text-indigo-950' : 'text-slate-800'
                  }`}>
                    Chủ đề {t.id}
                  </span>
                  <span className={`text-[11px] font-medium line-clamp-2 mt-0.5 leading-snug ${
                    isSelected ? 'text-indigo-700 font-semibold' : 'text-slate-500'
                  }`}>
                    {getTopicShortTitle(t.id)}
                  </span>
                </div>

                <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px]">
                  <span className={isSelected ? 'text-indigo-600 font-bold' : 'text-slate-400'}>
                    {t.lessonIds.length} bài học
                  </span>
                  {isSelected && (
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Topic Banner & Search */}
      <div className="bg-gradient-to-r from-slate-900 to-indigo-950 rounded-2xl p-4 sm:p-5 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md">
        <div>
          <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider block">
            {selectedTopicId === 'all' ? 'ĐANG XEM TOÀN BỘ' : `ĐANG CHỌN CHỦ ĐỀ ${selectedTopicId}`}
          </span>
          <h3 className="text-base sm:text-lg font-bold text-white mt-0.5">
            {selectedTopicId === 'all'
              ? 'Tất Cả 6 Chủ Đề (17 Bài Học - SGK Tin học 6)'
              : activeTopicObj?.title}
          </h3>
          <p className="text-xs text-slate-300 mt-0.5">
            Hiển thị {filteredLessons.length} bài học phù hợp
          </p>
        </div>

        {/* Quick search */}
        <div className="relative min-w-[220px] sm:min-w-[260px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Tìm tên bài, khái niệm..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-sky-400/40"
          />
        </div>
      </div>

      {/* Lessons Accordion List */}
      <div className="space-y-4">
        {filteredLessons.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 text-center border border-slate-200 text-slate-500 space-y-2">
            <BookOpen className="w-10 h-10 mx-auto text-slate-300" />
            <p className="font-bold text-slate-700">Không tìm thấy bài học nào phù hợp</p>
            <p className="text-xs">Thử nhập từ khóa khác hoặc bấm "Xem Tất Cả 6 Chủ Đề"</p>
          </div>
        ) : (
          filteredLessons.map((lesson) => {
            const isExpanded = expandedLessonId === lesson.id;
            const lessonTopic = TOPICS.find((t) => t.id === lesson.topicId);

            return (
              <div
                key={lesson.id}
                className="bg-white rounded-3xl border border-slate-200/90 shadow-xs hover:border-slate-300 overflow-hidden transition-all"
              >
                {/* Lesson Bar */}
                <div
                  onClick={() => setExpandedLessonId(isExpanded ? null : lesson.id)}
                  className="p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/80 transition-colors select-none"
                >
                  <div className="flex items-center gap-3.5">
                    <span className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-700 font-extrabold flex items-center justify-center text-sm shadow-2xs">
                      {lesson.id}
                    </span>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-base sm:text-lg font-bold text-slate-900">
                          {lesson.title}
                        </h3>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                          Chủ đề {lesson.topicId}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {lesson.pages} • {lesson.shortDesc}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onStartLessonQuiz(lesson.id);
                      }}
                      className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs transition-colors border border-indigo-200/60"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Làm bài ôn tập</span>
                    </button>
                    <button className="text-slate-400 hover:text-slate-600 p-1">
                      {isExpanded ? <ChevronUp className="w-5 h-5 text-indigo-600" /> : <ChevronDown className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Lesson Details (Expanded) */}
                {isExpanded && (
                  <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-slate-100 space-y-4 bg-slate-50/40">
                    <div className="bg-amber-50/90 border border-amber-200 rounded-2xl p-4 sm:p-5 space-y-3">
                      <div className="flex items-center gap-2 text-amber-900 font-bold text-xs sm:text-sm uppercase tracking-wider">
                        <BookOpen className="w-4 h-4 text-amber-600" />
                        <span>Hộp Kiến Thức Cốt Lõi (Ghi nhớ SGK):</span>
                      </div>

                      <ul className="space-y-2.5">
                        {lesson.keyPoints.map((point, pIdx) => (
                          <li key={pIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-800 leading-relaxed">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-center justify-between flex-wrap gap-3 pt-2">
                      <span className="text-xs text-slate-500 italic">
                        Trích từ Sách giáo khoa Tin học 6 - {lesson.pages}
                      </span>
                      <button
                        type="button"
                        onClick={() => onStartLessonQuiz(lesson.id)}
                        className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-xs transition-colors flex items-center justify-center gap-2"
                      >
                        <Play className="w-4 h-4 fill-white" />
                        <span>Tạo Đề Ôn Tập Cho {lesson.title}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

    </div>
  );
};
