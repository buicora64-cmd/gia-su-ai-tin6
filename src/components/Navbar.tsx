import React from 'react';
import { 
  BookOpen, 
  Layers, 
  FileText, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Printer, 
  Flame,
  HelpCircle
} from 'lucide-react';
import { isSoundEnabled, setSoundEnabled } from '../utils/audio';

interface NavbarProps {
  activeTab: 'quiz' | 'bank' | 'notes' | 'ai' | 'flashcard';
  setActiveTab: (tab: 'quiz' | 'bank' | 'notes' | 'ai' | 'flashcard') => void;
  onOpenPrint?: () => void;
  totalQuestionsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenPrint,
  totalQuestionsCount
}) => {
  const [soundOn, setSoundOn] = React.useState(isSoundEnabled());

  const toggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    setSoundEnabled(next);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Brand */}
          <div 
            onClick={() => setActiveTab('quiz')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-tr from-sky-600 via-indigo-600 to-amber-500 p-0.5 shadow-md shadow-indigo-100 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
                <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-600 text-base sm:text-lg font-mono">
                  GS6
                </span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-slate-900 text-base sm:text-xl tracking-tight group-hover:text-indigo-600 transition-colors uppercase">
                  GIA SƯ TIN HỌC 6
                </span>
                <span className="text-[10px] sm:text-[11px] font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                  Kết Nối Tri Thức
                </span>
              </div>
              <p className="text-xs font-semibold text-indigo-700 tracking-wide">
                Tác giả: GV: CÔ RA AI
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            <button
              onClick={() => setActiveTab('quiz')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'quiz'
                  ? 'bg-indigo-50 text-indigo-700 font-semibold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Flame className="w-4 h-4 text-indigo-600" />
              Tạo Đề Ôn Tập
            </button>

            <button
              onClick={() => setActiveTab('bank')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'bank'
                  ? 'bg-indigo-50 text-indigo-700 font-semibold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <HelpCircle className="w-4 h-4 text-sky-600" />
              Ngân Hàng Câu Hỏi
              <span className="bg-sky-100 text-sky-700 text-xs px-1.5 py-0.2 rounded-full font-bold">
                {totalQuestionsCount}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('notes')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'notes'
                  ? 'bg-indigo-50 text-indigo-700 font-semibold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <BookOpen className="w-4 h-4 text-amber-600" />
              Tóm Tắt 17 Bài
            </button>

            <button
              onClick={() => setActiveTab('flashcard')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'flashcard'
                  ? 'bg-indigo-50 text-indigo-700 font-semibold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Layers className="w-4 h-4 text-purple-600" />
              Thẻ Ghi Nhớ
            </button>

            <button
              onClick={() => setActiveTab('ai')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'ai'
                  ? 'bg-gradient-to-r from-amber-50 to-orange-50 text-amber-900 font-semibold shadow-xs border border-amber-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
              Tạo Thêm Với AI
            </button>
          </nav>

          {/* Action buttons right */}
          <div className="flex items-center gap-2">
            {onOpenPrint && (
              <button
                onClick={onOpenPrint}
                title="In đề thi / Xuất file PDF"
                className="flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-medium text-slate-700 hover:text-indigo-700 bg-slate-100 hover:bg-indigo-50 rounded-lg transition-colors border border-slate-200"
              >
                <Printer className="w-4 h-4 text-slate-600" />
                <span className="hidden sm:inline">In Đề Giấy</span>
              </button>
            )}

            <button
              onClick={toggleSound}
              title={soundOn ? 'Tắt âm thanh' : 'Bật âm thanh'}
              className="p-2 text-slate-600 hover:text-indigo-600 bg-slate-100 hover:bg-indigo-50 rounded-lg transition-colors border border-slate-200"
            >
              {soundOn ? <Volume2 className="w-4 h-4 text-emerald-600" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
            </button>
          </div>
        </div>

        {/* Mobile secondary bar */}
        <div className="flex md:hidden items-center justify-around py-2 border-t border-slate-100 overflow-x-auto gap-2">
          <button
            onClick={() => setActiveTab('quiz')}
            className={`text-xs px-2.5 py-1.5 rounded-md font-medium whitespace-nowrap ${
              activeTab === 'quiz' ? 'bg-indigo-600 text-white' : 'text-slate-600'
            }`}
          >
            Tạo Đề
          </button>
          <button
            onClick={() => setActiveTab('bank')}
            className={`text-xs px-2.5 py-1.5 rounded-md font-medium whitespace-nowrap ${
              activeTab === 'bank' ? 'bg-indigo-600 text-white' : 'text-slate-600'
            }`}
          >
            Ngân Hàng ({totalQuestionsCount})
          </button>
          <button
            onClick={() => setActiveTab('notes')}
            className={`text-xs px-2.5 py-1.5 rounded-md font-medium whitespace-nowrap ${
              activeTab === 'notes' ? 'bg-indigo-600 text-white' : 'text-slate-600'
            }`}
          >
            Kiến Thức SGK
          </button>
          <button
            onClick={() => setActiveTab('flashcard')}
            className={`text-xs px-2.5 py-1.5 rounded-md font-medium whitespace-nowrap ${
              activeTab === 'flashcard' ? 'bg-indigo-600 text-white' : 'text-slate-600'
            }`}
          >
            Flashcard
          </button>
          <button
            onClick={() => setActiveTab('ai')}
            className={`text-xs px-2.5 py-1.5 rounded-md font-medium whitespace-nowrap flex items-center gap-1 ${
              activeTab === 'ai' ? 'bg-amber-500 text-white' : 'text-amber-700 bg-amber-50'
            }`}
          >
            <Sparkles className="w-3 h-3" />
            AI
          </button>
        </div>
      </div>
    </header>
  );
};
