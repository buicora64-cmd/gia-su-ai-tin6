import React, { useState, useEffect, useMemo } from 'react';
import { 
  FileSpreadsheet, 
  Download, 
  RefreshCw, 
  Search, 
  Filter, 
  Users, 
  Award, 
  TrendingUp, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Trash2, 
  Eye, 
  Sparkles,
  BookOpen,
  GraduationCap,
  SlidersHorizontal,
  ChevronDown,
  Table as TableIcon
} from 'lucide-react';
import { ScoreRecord, UserProfile } from '../types';
import { 
  fetchAllScoresForExcel, 
  seedSampleScoreRecords, 
  clearAllQuizResults,
  LOCAL_STORAGE_SCORES_KEY 
} from '../lib/supabase';
import { 
  exportScoresToExcel, 
  exportScoresToCSV, 
  getScoreRating 
} from '../utils/excelExport';

interface ScoreManagementViewProps {
  currentUser: UserProfile | null;
}

export const ScoreManagementView: React.FC<ScoreManagementViewProps> = ({
  currentUser,
}) => {
  const [scores, setScores] = useState<ScoreRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedClass, setSelectedClass] = useState<string>('all');
  const [selectedRating, setSelectedRating] = useState<string>('all');
  const [selectedMode, setSelectedMode] = useState<string>('all');
  const [exporting, setExporting] = useState<boolean>(false);
  const [selectedRecord, setSelectedRecord] = useState<ScoreRecord | null>(null);

  // Clear modal and toast states
  const [showClearModal, setShowClearModal] = useState<boolean>(false);
  const [showPostExportModal, setShowPostExportModal] = useState<boolean>(false);
  const [isClearing, setIsClearing] = useState<boolean>(false);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Load scores on mount
  useEffect(() => {
    loadScores();
  }, []);

  const loadScores = async () => {
    setLoading(true);
    try {
      const data = await fetchAllScoresForExcel();
      setScores(data);
    } catch (err) {
      console.warn('Error loading scores:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSeedSamples = () => {
    const samples = seedSampleScoreRecords();
    loadScores();
  };

  const handleDeleteScore = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!window.confirm('Bạn có chắc chắn muốn xóa bản ghi điểm này khỏi danh sách?')) {
      return;
    }
    try {
      const raw = localStorage.getItem(LOCAL_STORAGE_SCORES_KEY);
      if (raw) {
        const list = JSON.parse(raw);
        const filtered = list.filter((item: any) => item.id !== id);
        localStorage.setItem(LOCAL_STORAGE_SCORES_KEY, JSON.stringify(filtered));
      }
      setScores((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      console.warn('Error deleting score record:', err);
    }
  };

  // Distinct classes for filter
  const classOptions = useMemo(() => {
    const classes = new Set<string>();
    scores.forEach((s) => {
      if (s.studentClass) classes.add(s.studentClass);
    });
    return Array.from(classes).sort();
  }, [scores]);

  // Filtered scores
  const filteredScores = useMemo(() => {
    return scores.filter((s) => {
      // Search
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchName = (s.fullName || '').toLowerCase().includes(query);
        const matchUsername = (s.username || '').toLowerCase().includes(query);
        const matchClass = (s.studentClass || '').toLowerCase().includes(query);
        const matchTitle = (s.testTitle || '').toLowerCase().includes(query);
        if (!matchName && !matchUsername && !matchClass && !matchTitle) {
          return false;
        }
      }

      // Class filter
      if (selectedClass !== 'all' && s.studentClass !== selectedClass) {
        return false;
      }

      // Rating filter
      if (selectedRating !== 'all' && s.rating !== selectedRating) {
        return false;
      }

      // Mode filter
      if (selectedMode !== 'all' && s.mode !== selectedMode) {
        return false;
      }

      return true;
    });
  }, [scores, searchQuery, selectedClass, selectedRating, selectedMode]);

  // Statistics
  const stats = useMemo(() => {
    if (scores.length === 0) {
      return { totalTests: 0, avgScore: 0, passRate: 0, uniqueStudents: 0, topScore: 0 };
    }
    const totalTests = scores.length;
    const sumScore = scores.reduce((sum, s) => sum + s.score, 0);
    const avgScore = Math.round((sumScore / totalTests) * 10) / 10;
    const passedCount = scores.filter((s) => s.score >= 5.0).length;
    const passRate = Math.round((passedCount / totalTests) * 100);
    const uniqueStudents = new Set(scores.map((s) => s.username.toLowerCase())).size;
    const topScore = Math.max(...scores.map((s) => s.score));

    return { totalTests, avgScore, passRate, uniqueStudents, topScore };
  }, [scores]);

  const handleExportXlsx = () => {
    if (filteredScores.length === 0) {
      alert('Không có dữ liệu bài thi để xuất file!');
      return;
    }
    setExporting(true);
    try {
      const fileName = `Bang_Diem_Tin_Hoc_6_${selectedClass !== 'all' ? `Lop_${selectedClass}_` : ''}${new Date().toISOString().slice(0, 10)}.xlsx`;
      exportScoresToExcel(filteredScores, fileName);
      
      // Prompt teacher to clear score table after export so students can start new tests
      setTimeout(() => {
        setShowPostExportModal(true);
      }, 700);
    } finally {
      setTimeout(() => setExporting(false), 500);
    }
  };

  const handleExportCsv = () => {
    if (filteredScores.length === 0) {
      alert('Không có dữ liệu bài thi để xuất file!');
      return;
    }
    setExporting(true);
    try {
      const fileName = `Bang_Diem_Tin_Hoc_6_${selectedClass !== 'all' ? `Lop_${selectedClass}_` : ''}${new Date().toISOString().slice(0, 10)}.csv`;
      exportScoresToCSV(filteredScores, fileName);
      
      setTimeout(() => {
        setShowPostExportModal(true);
      }, 700);
    } finally {
      setTimeout(() => setExporting(false), 500);
    }
  };

  const handleExecuteClearAll = async () => {
    setIsClearing(true);
    try {
      await clearAllQuizResults();
      setScores([]);
      setShowClearModal(false);
      setShowPostExportModal(false);
      setSuccessToast('Đã xóa sạch bảng điểm thành công! Học sinh đã có thể bắt đầu làm đợt bài mới.');
      setTimeout(() => setSuccessToast(null), 5000);
    } catch (err) {
      console.warn('Error clearing all scores:', err);
    } finally {
      setIsClearing(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8 space-y-6 animate-in fade-in duration-200">
      
      {/* Top Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-emerald-800 via-teal-800 to-indigo-900 p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-12 -mt-12 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-200">
            <span className="bg-emerald-500/30 px-3 py-1 rounded-full border border-emerald-400/30 flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5" />
              Sổ Điểm & Báo Cáo
            </span>
            <span className="bg-white/15 px-3 py-1 rounded-full border border-white/20">
              Tác giả: GV: CÔ RA AI
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Quản Lý & Xuất Bảng Điểm Excel Học Sinh
          </h1>

          <p className="text-emerald-100/90 text-sm sm:text-base max-w-3xl leading-relaxed">
            Theo dõi toàn bộ kết quả kiểm tra của học sinh từ cơ sở dữ liệu Supabase và bộ nhớ ứng dụng.
            Xuất danh sách điểm chuẩn file <strong>Excel (.xlsx)</strong> hoặc <strong>CSV UTF-8</strong> với đầy đủ họ tên, lớp, điểm số và xếp loại chỉ bằng 1 cú nhấp chuột.
          </p>

          {/* Action Export Buttons on Banner */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleExportXlsx}
              disabled={exporting || scores.length === 0}
              className="px-5 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm shadow-lg shadow-emerald-950/40 flex items-center gap-2 transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              <FileSpreadsheet className="w-5 h-5 text-slate-950" />
              <span>Xuất File Excel (.xlsx)</span>
              <Download className="w-4 h-4 text-slate-800" />
            </button>

            <button
              type="button"
              onClick={handleExportCsv}
              disabled={exporting || scores.length === 0}
              className="px-4 py-3 rounded-2xl bg-white/15 hover:bg-white/25 text-white font-bold text-sm border border-white/20 backdrop-blur-md flex items-center gap-2 transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Tải file CSV (.csv)</span>
            </button>

            <button
              type="button"
              onClick={loadScores}
              className="p-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white border border-white/15 transition-all cursor-pointer"
              title="Làm mới dữ liệu từ máy chủ"
            >
              <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
            </button>

            {scores.length > 0 && (
              <button
                type="button"
                onClick={() => setShowClearModal(true)}
                className="px-4 py-3 rounded-2xl bg-rose-600/90 hover:bg-rose-500 text-white font-bold text-xs sm:text-sm border border-rose-400/30 shadow-lg shadow-rose-950/40 flex items-center gap-2 transition-all cursor-pointer ml-auto"
                title="Xóa trắng bảng điểm để học sinh làm đợt bài mới"
              >
                <Trash2 className="w-4 h-4 text-rose-100" />
                <span>Xóa Bảng Điểm (Làm Bài Mới)</span>
              </button>
            )}

            {scores.length === 0 && (
              <button
                type="button"
                onClick={handleSeedSamples}
                className="px-4 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-md cursor-pointer ml-auto"
              >
                <Sparkles className="w-4 h-4 text-amber-900" />
                <span>Nạp 5 bài thi mẫu để xem thử</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Success Notification Toast */}
      {successToast && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-sm font-semibold flex items-center justify-between shadow-xs animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{successToast}</span>
          </div>
          <button
            type="button"
            onClick={() => setSuccessToast(null)}
            className="text-xs text-emerald-700 hover:text-emerald-900 font-bold px-2 py-1 rounded-md"
          >
            ✕
          </button>
        </div>
      )}

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3.5">
        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Tổng bài thi</span>
            <TableIcon className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-2xl font-black text-slate-900">
            {stats.totalTests}
          </div>
          <p className="text-[11px] text-slate-500">Lượt làm bài đã ghi nhận</p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Số học sinh</span>
            <Users className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="text-2xl font-black text-indigo-600">
            {stats.uniqueStudents}
          </div>
          <p className="text-[11px] text-slate-500">Tài khoản đã tham gia</p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Điểm trung bình</span>
            <TrendingUp className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-black text-emerald-600">
            {stats.avgScore} <span className="text-xs font-bold text-slate-400">/ 10</span>
          </div>
          <p className="text-[11px] text-slate-500">Toàn bộ các bài thi</p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Tỷ lệ Đạt (≥ 5đ)</span>
            <CheckCircle2 className="w-4 h-4 text-teal-500" />
          </div>
          <div className="text-2xl font-black text-teal-600">
            {stats.passRate}%
          </div>
          <p className="text-[11px] text-slate-500">Học sinh đạt yêu cầu</p>
        </div>

        <div className="col-span-2 lg:col-span-1 p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Điểm cao nhất</span>
            <Award className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-black text-amber-600">
            {stats.topScore} <span className="text-xs font-bold text-slate-400">/ 10</span>
          </div>
          <p className="text-[11px] text-slate-500">Điểm số thủ khoa</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-4 sm:p-5 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm theo tên học sinh, tên đăng nhập, tên bài học..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold"
              >
                ✕
              </button>
            )}
          </div>

          {/* Filter dropdowns */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Class filter */}
            <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl">
              <span className="text-xs font-semibold text-slate-500">Lớp:</span>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="bg-transparent text-xs font-bold text-slate-800 focus:outline-none cursor-pointer"
              >
                <option value="all">Tất cả các lớp</option>
                {classOptions.map((cls) => (
                  <option key={cls} value={cls}>
                    Lớp {cls}
                  </option>
                ))}
              </select>
            </div>

            {/* Rating filter */}
            <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl">
              <span className="text-xs font-semibold text-slate-500">Xếp loại:</span>
              <select
                value={selectedRating}
                onChange={(e) => setSelectedRating(e.target.value)}
                className="bg-transparent text-xs font-bold text-slate-800 focus:outline-none cursor-pointer"
              >
                <option value="all">Tất cả xếp loại</option>
                <option value="Xuất sắc">Xuất sắc (9 - 10đ)</option>
                <option value="Giỏi">Giỏi (8 - 8.9đ)</option>
                <option value="Khá">Khá (6.5 - 7.9đ)</option>
                <option value="Đạt">Đạt (5.0 - 6.4đ)</option>
                <option value="Chưa đạt">Chưa đạt (&lt; 5đ)</option>
              </select>
            </div>

            {/* Mode filter */}
            <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl">
              <span className="text-xs font-semibold text-slate-500">Hình thức:</span>
              <select
                value={selectedMode}
                onChange={(e) => setSelectedMode(e.target.value)}
                className="bg-transparent text-xs font-bold text-slate-800 focus:outline-none cursor-pointer"
              >
                <option value="all">Tất cả hình thức</option>
                <option value="exam">Kiểm tra tính giờ</option>
                <option value="practice">Luyện tập ôn tập</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results summary counter */}
        <div className="flex items-center justify-between text-xs text-slate-500 border-t border-slate-100 pt-3">
          <span>
            Hiển thị <strong>{filteredScores.length}</strong> / {scores.length} bản ghi điểm
          </span>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleExportXlsx}
              disabled={filteredScores.length === 0}
              className="text-emerald-700 hover:text-emerald-800 font-bold flex items-center gap-1 cursor-pointer disabled:opacity-40"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
              <span>Xuất {filteredScores.length} dòng ra Excel</span>
            </button>

            {scores.length > 0 && (
              <button
                type="button"
                onClick={() => setShowClearModal(true)}
                className="text-rose-600 hover:text-rose-800 font-bold flex items-center gap-1 cursor-pointer pl-3 border-l border-slate-200"
                title="Xóa trắng bảng điểm để học sinh làm đợt bài mới"
              >
                <Trash2 className="w-3.5 h-3.5 text-rose-500" />
                <span>Xóa bảng điểm</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Data Table */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-50/90 border-b border-slate-200 text-slate-600 uppercase tracking-wider font-extrabold text-[11px]">
                <th className="py-3.5 px-4 w-12 text-center">STT</th>
                <th className="py-3.5 px-4">Học Sinh</th>
                <th className="py-3.5 px-3">Lớp</th>
                <th className="py-3.5 px-4">Bài Kiểm Tra</th>
                <th className="py-3.5 px-3 text-center">Điểm Số</th>
                <th className="py-3.5 px-3 text-center">Số Câu</th>
                <th className="py-3.5 px-3 text-center">Thời Gian</th>
                <th className="py-3.5 px-3 text-center">Xếp Loại</th>
                <th className="py-3.5 px-4">Ngày Giờ Nộp</th>
                <th className="py-3.5 px-3 text-center w-16">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={10} className="py-12 text-center text-slate-500">
                    <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-indigo-600" />
                    <p className="font-semibold text-sm">Đang tải danh sách điểm học sinh...</p>
                  </td>
                </tr>
              ) : filteredScores.length === 0 ? (
                <tr>
                  <td colSpan={10} className="py-12 text-center text-slate-500 space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
                      <FileSpreadsheet className="w-6 h-6" />
                    </div>
                    <div className="space-y-1">
                      <p className="font-bold text-slate-800 text-sm">Chưa có kết quả kiểm tra nào</p>
                      <p className="text-xs text-slate-500 max-w-md mx-auto">
                        Khi học sinh hoàn thành bài kiểm tra và nộp bài, điểm số sẽ tự động xuất hiện tại đây để cô xuất ra file Excel.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleSeedSamples}
                      className="px-4 py-2 rounded-xl bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200 font-bold text-xs inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4 text-indigo-600" />
                      <span>Thêm 5 bài kiểm tra mẫu để thử nghiệm</span>
                    </button>
                  </td>
                </tr>
              ) : (
                filteredScores.map((score, index) => {
                  const ratingBadge = getScoreRating(score.score);
                  return (
                    <tr
                      key={score.id}
                      onClick={() => setSelectedRecord(score)}
                      className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
                    >
                      {/* STT */}
                      <td className="py-3.5 px-4 text-center font-bold text-slate-400">
                        {index + 1}
                      </td>

                      {/* Student info */}
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                          {score.fullName}
                        </div>
                        <div className="font-mono text-[11px] text-slate-400">
                          @{score.username}
                        </div>
                      </td>

                      {/* Class */}
                      <td className="py-3.5 px-3">
                        <span className="px-2.5 py-1 rounded-lg bg-slate-100 font-bold text-slate-700 text-xs">
                          {score.studentClass}
                        </span>
                      </td>

                      {/* Test Title */}
                      <td className="py-3.5 px-4 max-w-xs">
                        <div className="font-medium text-slate-800 truncate" title={score.testTitle}>
                          {score.testTitle}
                        </div>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md inline-block mt-0.5 ${
                          score.mode === 'exam' 
                            ? 'bg-rose-50 text-rose-700 border border-rose-200' 
                            : 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                        }`}>
                          {score.mode === 'exam' ? 'Thi thử tính giờ' : 'Luyện tập'}
                        </span>
                      </td>

                      {/* Score Badge */}
                      <td className="py-3.5 px-3 text-center">
                        <span className={`inline-block font-black text-sm px-2.5 py-1 rounded-xl shadow-xs border ${
                          score.score >= 9.0 
                            ? 'bg-emerald-600 text-white border-emerald-500' 
                            : score.score >= 8.0 
                            ? 'bg-blue-600 text-white border-blue-500' 
                            : score.score >= 6.5 
                            ? 'bg-indigo-600 text-white border-indigo-500' 
                            : score.score >= 5.0 
                            ? 'bg-amber-500 text-white border-amber-400' 
                            : 'bg-rose-600 text-white border-rose-500'
                        }`}>
                          {score.score.toFixed(1)}
                        </span>
                      </td>

                      {/* Correct / Total */}
                      <td className="py-3.5 px-3 text-center font-semibold text-slate-700">
                        <span className="text-emerald-600 font-bold">{score.correctCount}</span>
                        <span className="text-slate-400">/{score.totalQuestions}</span>
                        <div className="text-[10px] text-slate-400 font-normal">
                          {score.percentage}%
                        </div>
                      </td>

                      {/* Time */}
                      <td className="py-3.5 px-3 text-center font-mono text-xs font-semibold text-slate-600">
                        {score.formattedTime}
                      </td>

                      {/* Rating */}
                      <td className="py-3.5 px-3 text-center">
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${ratingBadge.badgeColor}`}>
                          {score.rating}
                        </span>
                      </td>

                      {/* Date */}
                      <td className="py-3.5 px-4 text-xs text-slate-500 whitespace-nowrap">
                        {score.formattedDate}
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-3 text-center">
                        <button
                          type="button"
                          onClick={(e) => handleDeleteScore(score.id, e)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                          title="Xóa kết quả này"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedRecord && (
        <div 
          onClick={() => setSelectedRecord(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-slate-100 space-y-6 animate-in zoom-in-95"
          >
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Chi Tiết Kết Quả Bài Làm
                </span>
                <h3 className="text-lg font-black text-slate-900 mt-0.5">
                  {selectedRecord.fullName}
                </h3>
                <p className="text-xs text-slate-500">
                  Lớp: <strong>{selectedRecord.studentClass}</strong> • Tài khoản: <strong>@{selectedRecord.username}</strong>
                </p>
              </div>

              <span className={`text-2xl font-black px-3.5 py-1.5 rounded-2xl text-white ${
                selectedRecord.score >= 8 ? 'bg-emerald-600' : selectedRecord.score >= 5 ? 'bg-amber-500' : 'bg-rose-600'
              }`}>
                {selectedRecord.score.toFixed(1)} <span className="text-xs font-normal">/ 10</span>
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
                <span className="text-slate-400 block mb-0.5 font-medium">Bài thi:</span>
                <span className="font-bold text-slate-800">{selectedRecord.testTitle}</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
                <span className="text-slate-400 block mb-0.5 font-medium">Hình thức:</span>
                <span className="font-bold text-slate-800">
                  {selectedRecord.mode === 'exam' ? 'Kiểm tra tính giờ' : 'Luyện tập'}
                </span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
                <span className="text-slate-400 block mb-0.5 font-medium">Số câu đúng:</span>
                <span className="font-bold text-slate-800">
                  {selectedRecord.correctCount} / {selectedRecord.totalQuestions} câu ({selectedRecord.percentage}%)
                </span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
                <span className="text-slate-400 block mb-0.5 font-medium">Thời gian hoàn thành:</span>
                <span className="font-bold text-slate-800">{selectedRecord.formattedTime}</span>
              </div>
            </div>

            {/* Level breakdown if available */}
            {selectedRecord.levelStats && (
              <div className="space-y-2 p-3.5 rounded-2xl bg-indigo-50/60 border border-indigo-100">
                <span className="text-xs font-bold text-indigo-900 block">
                  Phân tích theo 3 cấp độ nhận thức:
                </span>
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2 rounded-xl bg-white border border-indigo-200/60">
                    <span className="text-[10px] text-slate-500 block font-semibold">Nhận biết</span>
                    <span className="font-bold text-emerald-700">
                      {selectedRecord.levelStats.nhanBietCorrect ?? 0}/{selectedRecord.levelStats.nhanBietTotal ?? 0}
                    </span>
                  </div>
                  <div className="p-2 rounded-xl bg-white border border-indigo-200/60">
                    <span className="text-[10px] text-slate-500 block font-semibold">Thông hiểu</span>
                    <span className="font-bold text-blue-700">
                      {selectedRecord.levelStats.thongHieuCorrect ?? 0}/{selectedRecord.levelStats.thongHieuTotal ?? 0}
                    </span>
                  </div>
                  <div className="p-2 rounded-xl bg-white border border-indigo-200/60">
                    <span className="text-[10px] text-slate-500 block font-semibold">Vận dụng</span>
                    <span className="font-bold text-amber-700">
                      {selectedRecord.levelStats.vanDungCorrect ?? 0}/{selectedRecord.levelStats.vanDungTotal ?? 0}
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between pt-2">
              <span className="text-[11px] text-slate-400">
                Nộp lúc: {selectedRecord.formattedDate}
              </span>
              <button
                type="button"
                onClick={() => setSelectedRecord(null)}
                className="px-5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors cursor-pointer"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* POST-EXPORT MODAL: Tự động hỏi xóa sau khi xuất file Excel */}
      {showPostExportModal && (
        <div 
          onClick={() => setShowPostExportModal(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-slate-100 space-y-5 animate-in zoom-in-95 text-center"
          >
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-inner">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1.5">
              <h3 className="text-lg font-black text-slate-900">
                Đã Xuất File Excel Thành Công!
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Máy tính đã lưu file bảng điểm. Cô có muốn <strong>xóa trắng bảng điểm hiện tại</strong> để sẵn sàng cho học sinh làm bài kiểm tra mới không?
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200/80 text-amber-900 text-xs text-left flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                Khi xóa, danh sách sẽ trở về 0. Lần làm bài tiếp theo của học sinh sẽ được lưu vào bảng điểm mới tinh.
              </span>
            </div>

            <div className="flex flex-col gap-2 pt-1">
              <button
                type="button"
                onClick={handleExecuteClearAll}
                disabled={isClearing}
                className="w-full py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-rose-950/20 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
              >
                <Trash2 className="w-4 h-4" />
                <span>{isClearing ? 'Đang xóa...' : 'Xóa Bảng Điểm (Để Học Sinh Làm Bài Mới)'}</span>
              </button>

              <button
                type="button"
                onClick={() => setShowPostExportModal(false)}
                className="w-full py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-colors cursor-pointer"
              >
                Giữ Lại Bảng Điểm Này (Không Xóa)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CONFIRM CLEAR MODAL: Khi bấm nút Xóa Bảng Điểm trực tiếp */}
      {showClearModal && (
        <div 
          onClick={() => setShowClearModal(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-slate-100 space-y-5 animate-in zoom-in-95 text-center"
          >
            <div className="w-14 h-14 rounded-2xl bg-rose-100 text-rose-600 mx-auto flex items-center justify-center shadow-inner">
              <Trash2 className="w-7 h-7" />
            </div>

            <div className="space-y-1.5">
              <h3 className="text-lg font-black text-slate-900">
                Xác Nhận Xóa Bảng Điểm?
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Hành động này sẽ xóa toàn bộ <strong>{scores.length} kết quả làm bài</strong> khỏi danh sách và máy chủ để lớp học bắt đầu đợt kiểm tra bài mới.
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 text-xs text-left flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>
                <strong>Nhắc nhở:</strong> Hãy chắc chắn cô đã bấm nút <strong>Xuất File Excel</strong> để lưu bảng điểm về máy tính trước khi bấm xóa.
              </span>
            </div>

            <div className="flex flex-col gap-2 pt-1">
              <button
                type="button"
                onClick={() => {
                  handleExportXlsx();
                  setShowClearModal(false);
                }}
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-950/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <FileSpreadsheet className="w-4 h-4" />
                <span>Xuất File Excel Trước Rồi Mới Xóa</span>
              </button>

              <button
                type="button"
                onClick={handleExecuteClearAll}
                disabled={isClearing}
                className="w-full py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-rose-950/20 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
              >
                <Trash2 className="w-4 h-4" />
                <span>{isClearing ? 'Đang xóa...' : 'Tôi Đã Lưu File, Xóa Bảng Điểm Ngay!'}</span>
              </button>

              <button
                type="button"
                onClick={() => setShowClearModal(false)}
                className="w-full py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-colors cursor-pointer"
              >
                Hủy Bỏ
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
