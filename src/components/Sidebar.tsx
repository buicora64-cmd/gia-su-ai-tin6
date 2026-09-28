import React, { useState } from 'react';
import { 
  BookOpen, 
  Layers, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Printer, 
  Flame, 
  HelpCircle, 
  Menu, 
  X,
  Compass,
  Award
} from 'lucide-react';
import { isSoundEnabled, setSoundEnabled } from '../utils/audio';

interface SidebarProps {
  activeTab: 'quiz' | 'bank' | 'notes' | 'ai' | 'flashcard';
  setActiveTab: (tab: 'quiz' | 'bank' | 'notes' | 'ai' | 'flashcard') => void;
  onOpenPrint?: () => void;
  totalQuestionsCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  onOpenPrint,
  totalQuestionsCount
}) => {
  const [soundOn, setSoundOn] = useState(isSoundEnabled());
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    setSoundEnabled(next);
  };

  const handleSelectTab = (tab: 'quiz' | 'bank' | 'notes' | 'ai' | 'flashcard') => {
    setActiveTab(tab);
    setMobileOpen(false);
  };

  const navItems = [
    {
      id: 'quiz' as const,
      label: 'Tạo Đề Ôn Tập',
      desc: 'Tùy chỉnh bài & cấp độ',
      icon: Flame,
      color: 'text-rose-400',
      activeStyle: 'bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-600 text-white font-bold shadow-lg shadow-indigo-950/60 border border-indigo-400/40 ring-1 ring-white/20',
      inactiveIconBg: 'bg-rose-500/10 text-rose-400',
      activeIconBg: 'bg-white/20 text-white',
      badge: 'Đề thi',
      badgeStyle: 'bg-rose-500/20 text-rose-300 border border-rose-500/30',
    },
    {
      id: 'bank' as const,
      label: 'Ngân Hàng Câu Hỏi',
      desc: 'Kho câu hỏi SGK',
      icon: HelpCircle,
      color: 'text-sky-400',
      activeStyle: 'bg-gradient-to-r from-sky-600 via-blue-600 to-sky-600 text-white font-bold shadow-lg shadow-sky-950/60 border border-sky-400/40 ring-1 ring-white/20',
      inactiveIconBg: 'bg-sky-500/10 text-sky-400',
      activeIconBg: 'bg-white/20 text-white',
      badge: `${totalQuestionsCount} câu`,
      badgeStyle: 'bg-sky-500/20 text-sky-200 border border-sky-400/30',
    },
    {
      id: 'notes' as const,
      label: 'Tóm Tắt 17 Bài',
      desc: 'Hộp kiến thức SGK',
      icon: BookOpen,
      color: 'text-amber-400',
      activeStyle: 'bg-gradient-to-r from-amber-600 via-amber-500 to-orange-600 text-white font-bold shadow-lg shadow-amber-950/60 border border-amber-400/40 ring-1 ring-white/20',
      inactiveIconBg: 'bg-amber-500/10 text-amber-400',
      activeIconBg: 'bg-white/20 text-white',
      badge: '17 bài',
      badgeStyle: 'bg-amber-500/20 text-amber-200 border border-amber-400/30',
    },
    {
      id: 'flashcard' as const,
      label: 'Thẻ Ghi Nhớ',
      desc: 'Lật thẻ ôn nhanh',
      icon: Layers,
      color: 'text-purple-400',
      activeStyle: 'bg-gradient-to-r from-purple-600 via-violet-600 to-purple-600 text-white font-bold shadow-lg shadow-purple-950/60 border border-purple-400/40 ring-1 ring-white/20',
      inactiveIconBg: 'bg-purple-500/10 text-purple-400',
      activeIconBg: 'bg-white/20 text-white',
      badge: null,
      badgeStyle: '',
    },
    {
      id: 'ai' as const,
      label: 'Tạo Thêm Với AI',
      desc: 'Sinh câu hỏi Gemini',
      icon: Sparkles,
      color: 'text-yellow-400',
      activeStyle: 'bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 text-white font-bold shadow-lg shadow-orange-950/60 border border-amber-300/50 ring-1 ring-white/20',
      inactiveIconBg: 'bg-yellow-500/10 text-yellow-300',
      activeIconBg: 'bg-white/20 text-white',
      badge: 'Gemini AI',
      badgeStyle: 'bg-gradient-to-r from-yellow-400/30 to-orange-400/30 text-yellow-200 border border-yellow-400/40',
    },
  ];

  return (
    <>
      {/* Mobile Top Header (with stylish dark gradient matching sidebar) */}
      <header className="md:hidden sticky top-0 z-40 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border-b border-indigo-900/60 text-white px-4 py-3 flex items-center justify-between shadow-md no-print">
        <div 
          onClick={() => handleSelectTab('quiz')}
          className="flex items-center gap-2.5 cursor-pointer"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-400 via-indigo-500 to-amber-400 p-0.5 shadow-sm">
            <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
              <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-indigo-300 text-sm font-mono">
                GS6
              </span>
            </div>
          </div>
          <div>
            <span className="font-extrabold text-white text-sm tracking-tight uppercase block leading-tight">
              GIA SƯ TIN HỌC 6
            </span>
            <span className="text-[11px] font-semibold text-amber-300 block">
              Tác giả: GV: CÔ RA AI
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {onOpenPrint && (
            <button
              onClick={onOpenPrint}
              title="In đề thi"
              className="p-2 text-slate-300 hover:text-white bg-white/10 hover:bg-white/20 rounded-lg transition-colors border border-white/10"
            >
              <Printer className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={toggleSound}
            title={soundOn ? 'Tắt âm thanh' : 'Bật âm thanh'}
            className="p-2 text-slate-300 hover:text-white bg-white/10 hover:bg-white/20 rounded-lg transition-colors border border-white/10"
          >
            {soundOn ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-lg bg-indigo-600/80 text-white hover:bg-indigo-600 transition-colors border border-indigo-400/30"
            aria-label="Mở menu chọn dọc"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Backdrop for mobile drawer */}
      {mobileOpen && (
        <div 
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-slate-950/70 backdrop-blur-xs md:hidden animate-in fade-in"
        />
      )}

      {/* Vertical Navigation Sidebar with Outstanding Visual Theme */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 lg:w-72 bg-gradient-to-b from-[#0f172a] via-[#1e1b4b] to-[#0f172a] text-slate-100 border-r border-indigo-900/50 shadow-2xl flex flex-col transition-transform duration-300 ease-in-out no-print ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Ambient Top Glow Effect */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-indigo-500/15 via-sky-500/10 to-transparent pointer-events-none" />

        {/* Brand Header */}
        <div className="p-5 border-b border-white/10 relative z-10">
          <div 
            onClick={() => handleSelectTab('quiz')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-400 via-indigo-500 to-amber-400 p-0.5 shadow-lg shadow-indigo-500/30 group-hover:scale-105 transition-transform shrink-0">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-indigo-200 to-amber-300 text-lg font-mono">
                  GS6
                </span>
              </div>
            </div>
            <div className="min-w-0">
              <span className="font-extrabold text-white text-base lg:text-lg tracking-tight group-hover:text-sky-300 transition-colors uppercase block truncate drop-shadow-xs">
                GIA SƯ TIN HỌC 6
              </span>
              <p className="text-xs font-bold text-amber-300 tracking-wide truncate mt-0.5">
                Tác giả: GV: CÔ RA AI
              </p>
              <div className="mt-1.5 flex items-center gap-1.5">
                <span className="text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-2 py-0.5 rounded-full inline-block">
                  Kết Nối Tri Thức
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Section Label: THANH CHỌN CHỨC NĂNG DỌC */}
        <div className="px-5 pt-5 pb-2.5 flex items-center justify-between">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-indigo-300/80 flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-indigo-400" />
            Thanh Chọn Chức Năng
          </span>
          <span className="text-[10px] text-slate-400 font-mono">Menu Dọc</span>
        </div>

        {/* Main Vertical Menu Items */}
        <nav className="flex-1 px-3 space-y-1.5 overflow-y-auto relative z-10 scrollbar-none">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleSelectTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs sm:text-sm transition-all group text-left cursor-pointer ${
                  isActive
                    ? item.activeStyle
                    : 'text-slate-300 hover:text-white hover:bg-white/10 border border-transparent hover:border-white/10 font-medium'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`p-2 rounded-xl transition-all ${
                    isActive ? item.activeIconBg : item.inactiveIconBg
                  } group-hover:scale-105`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="block truncate font-bold">{item.label}</span>
                    <span className={`text-[10px] block truncate ${
                      isActive ? 'text-white/80' : 'text-slate-400'
                    }`}>
                      {item.desc}
                    </span>
                  </div>
                </div>

                {item.badge !== null && (
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold shrink-0 ml-1.5 ${
                    isActive ? 'bg-white/20 text-white border border-white/30' : item.badgeStyle
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom Utility Tools Section */}
        <div className="p-4 m-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-2.5 relative z-10 shadow-inner">
          <div className="flex items-center justify-between px-1">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-300 block">
              Tiện Ích & Công Cụ
            </span>
            <span className="text-[10px] text-amber-300 font-semibold">
              Hỗ trợ học tập
            </span>
          </div>

          {/* In đề giấy / PDF button */}
          {onOpenPrint && (
            <button
              onClick={() => {
                onOpenPrint();
                setMobileOpen(false);
              }}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl bg-gradient-to-r from-sky-500/20 via-indigo-500/20 to-sky-500/20 hover:from-sky-500/30 hover:to-indigo-500/30 border border-sky-400/30 text-sky-200 hover:text-white text-xs sm:text-sm font-bold transition-all shadow-xs group cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <Printer className="w-4 h-4 text-sky-300 group-hover:text-white transition-colors" />
                <span>In Đề Giấy / PDF</span>
              </div>
              <span className="text-[10px] bg-sky-400/20 text-sky-200 border border-sky-400/30 px-1.5 py-0.5 rounded font-mono font-bold">
                A4
              </span>
            </button>
          )}

          {/* Sound toggle button */}
          <button
            onClick={toggleSound}
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white hover:bg-white/10 border border-white/5 transition-all cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              {soundOn ? (
                <Volume2 className="w-4 h-4 text-emerald-400" />
              ) : (
                <VolumeX className="w-4 h-4 text-slate-400" />
              )}
              <span>Âm thanh phản hồi</span>
            </div>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
              soundOn 
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/30' 
                : 'bg-white/10 text-slate-400 border border-white/10'
            }`}>
              {soundOn ? 'Bật' : 'Tắt'}
            </span>
          </button>

          {/* Curriculum note */}
          <div className="pt-2 border-t border-white/10 px-1 text-[11px] text-slate-400 flex items-center justify-between">
            <span className="font-semibold text-slate-300">SGK Tin học 6</span>
            <span className="text-indigo-300 font-mono">17 bài học</span>
          </div>
        </div>
      </aside>
    </>
  );
};
