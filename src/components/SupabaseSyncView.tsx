import React, { useState, useEffect } from 'react';
import { 
  Database, 
  CheckCircle2, 
  XCircle, 
  RefreshCw, 
  UploadCloud, 
  DownloadCloud, 
  Copy, 
  Check, 
  ExternalLink, 
  History, 
  AlertCircle,
  Clock,
  Award,
  Sparkles,
  ChevronRight,
  FileSpreadsheet
} from 'lucide-react';
import { 
  isSupabaseConfigured, 
  SUPABASE_PROJECT_URL, 
  SUPABASE_SQL_SCHEMA, 
  testSupabaseConnection, 
  fetchQuestionsFromSupabase, 
  uploadQuestionsToSupabase, 
  fetchQuizResultsFromSupabase,
  fetchAllScoresForExcel
} from '../lib/supabase';
import { exportScoresToExcel } from '../utils/excelExport';
import { Question } from '../types';

interface SupabaseSyncViewProps {
  currentQuestions: Question[];
  onQuestionsUpdated: (questions: Question[]) => void;
}

export const SupabaseSyncView: React.FC<SupabaseSyncViewProps> = ({
  currentQuestions,
  onQuestionsUpdated,
}) => {
  const [testing, setTesting] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<{
    tested: boolean;
    success: boolean;
    message: string;
    hasQuestionsTable: boolean;
    hasUsersTable: boolean;
    hasResultsTable: boolean;
    hasTable: boolean;
    questionCount?: number;
  }>({
    tested: false,
    success: false,
    message: '',
    hasQuestionsTable: false,
    hasUsersTable: false,
    hasResultsTable: false,
    hasTable: false,
  });

  const [copiedSql, setCopiedSql] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState<string | null>(null);
  const [downloadMessage, setDownloadMessage] = useState<string | null>(null);

  // Cloud quiz results
  const [cloudResults, setCloudResults] = useState<any[]>([]);
  const [loadingResults, setLoadingResults] = useState(false);

  // Run initial test on mount
  useEffect(() => {
    handleTestConnection();
  }, []);

  const handleTestConnection = async () => {
    setTesting(true);
    setUploadMessage(null);
    setDownloadMessage(null);
    const res = await testSupabaseConnection();
    setConnectionStatus({
      tested: true,
      success: res.success,
      message: res.message,
      hasQuestionsTable: res.hasQuestionsTable,
      hasUsersTable: res.hasUsersTable,
      hasResultsTable: res.hasResultsTable,
      hasTable: res.hasTable,
      questionCount: res.questionCount,
    });
    setTesting(false);

    if (res.success && res.hasResultsTable) {
      loadCloudResults();
    }
  };

  const loadCloudResults = async () => {
    setLoadingResults(true);
    const { results } = await fetchQuizResultsFromSupabase();
    setCloudResults(results || []);
    setLoadingResults(false);
  };

  const handleCopySql = () => {
    navigator.clipboard.writeText(SUPABASE_SQL_SCHEMA);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2500);
  };

  const handleUploadAll = async () => {
    if (!window.confirm(`Bạn có chắc chắn muốn tải lên ${currentQuestions.length} câu hỏi vào bảng "questions" trên Supabase?`)) {
      return;
    }
    setIsUploading(true);
    setUploadMessage(null);
    const res = await uploadQuestionsToSupabase(currentQuestions);
    setIsUploading(false);

    if (res.success) {
      setUploadMessage(`Đã đồng bộ thành công ${res.count} câu hỏi lên Supabase Cloud!`);
      handleTestConnection();
    } else {
      const isMissingTable = res.error?.includes('schema cache') || res.error?.includes('does not exist');
      setUploadMessage(
        isMissingTable 
          ? `Lỗi: Bảng "questions" chưa được tạo trên Supabase. Bạn chỉ cần copy mã SQL ở khung bên dưới và bấm Run trong SQL Editor là xong!` 
          : `Lỗi: ${res.error}`
      );
    }
  };

  const handleDownloadAll = async () => {
    setIsDownloading(true);
    setDownloadMessage(null);
    const res = await fetchQuestionsFromSupabase();
    setIsDownloading(false);

    if (res.questions && res.questions.length > 0) {
      onQuestionsUpdated(res.questions);
      setDownloadMessage(`Đã tải về thành công ${res.questions.length} câu hỏi từ Supabase Cloud!`);
    } else if (res.error) {
      setDownloadMessage(`Lỗi tải về: ${res.error}`);
    } else {
      setDownloadMessage('Chưa có câu hỏi nào trên cơ sở dữ liệu Supabase.');
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-700 p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-emerald-100 text-xs font-bold border border-white/20">
              <Database className="w-3.5 h-3.5" />
              <span>Cơ sở dữ liệu Supabase PostgreSQL</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white">
              Quản Lý Kết Nối & Đồng Bộ Supabase
            </h1>
            <p className="text-emerald-100 text-sm max-w-2xl leading-relaxed">
              Dự án đã được cấu hình với URL và API Key của Supabase. Bạn có thể lưu trữ câu hỏi, lịch sử làm bài và đồng bộ dữ liệu trực tuyến mọi lúc mọi nơi.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
            <button
              onClick={handleTestConnection}
              disabled={testing}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-white text-slate-800 hover:bg-emerald-50 text-sm font-bold shadow-lg transition-all hover:scale-[1.02] cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 text-emerald-600 ${testing ? 'animate-spin' : ''}`} />
              <span>{testing ? 'Đang kiểm tra...' : 'Kiểm tra kết nối'}</span>
            </button>
            <a
              href="https://supabase.com/dashboard"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-black/25 hover:bg-black/35 text-white text-sm font-semibold border border-white/20 transition-all"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Trang quản trị Supabase</span>
            </a>
          </div>
        </div>
      </div>

      {/* Connection Status Card */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
        <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Database className="w-5 h-5 text-emerald-600" />
          Thông tin cấu hình hiện tại
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <span className="text-xs font-semibold text-slate-400 block uppercase tracking-wider mb-1">
              Project URL
            </span>
            <div className="font-mono text-sm text-slate-800 break-all font-medium">
              {SUPABASE_PROJECT_URL}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <span className="text-xs font-semibold text-slate-400 block uppercase tracking-wider mb-1">
              Trạng thái kết nối máy chủ
            </span>
            <div className="flex items-center gap-2">
              {testing ? (
                <div className="flex items-center gap-2 text-sm text-amber-600 font-semibold">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Đang kiểm tra kết nối...</span>
                </div>
              ) : connectionStatus.success ? (
                <div className="flex items-center gap-2 text-sm text-emerald-600 font-bold">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  <span>Kết nối thành công tới Supabase!</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-sm text-rose-600 font-bold">
                  <XCircle className="w-5 h-5 text-rose-500" />
                  <span>Chưa thể kết nối</span>
                </div>
              )}
            </div>
            {connectionStatus.tested && (
              <p className={`text-xs mt-1.5 ${connectionStatus.success ? 'text-slate-600' : 'text-rose-500 font-medium'}`}>
                {connectionStatus.message}
              </p>
            )}
          </div>
        </div>

        {/* Real-time Table Verification Badges */}
        <div className="p-4 mb-6 rounded-2xl bg-slate-50/80 border border-slate-200">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-3">
            Kiểm tra 3 bảng dữ liệu trên Supabase:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Table: app_users */}
            <div className={`p-3 rounded-xl border flex items-center justify-between ${
              connectionStatus.hasUsersTable
                ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                : 'bg-rose-50 border-rose-200 text-rose-900'
            }`}>
              <div>
                <span className="text-xs font-mono font-bold block">app_users</span>
                <span className="text-[10px] text-slate-500">Tài khoản & tên đăng nhập</span>
              </div>
              {connectionStatus.hasUsersTable ? (
                <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> Đã có
                </span>
              ) : (
                <span className="text-xs font-bold text-rose-600 flex items-center gap-1">
                  <XCircle className="w-4 h-4" /> Chưa tạo
                </span>
              )}
            </div>

            {/* Table: questions */}
            <div className={`p-3 rounded-xl border flex items-center justify-between ${
              connectionStatus.hasQuestionsTable
                ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                : 'bg-amber-50 border-amber-200 text-amber-900'
            }`}>
              <div>
                <span className="text-xs font-mono font-bold block">questions</span>
                <span className="text-[10px] text-slate-500">Ngân hàng câu hỏi SGK</span>
              </div>
              {connectionStatus.hasQuestionsTable ? (
                <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> Đã có
                </span>
              ) : (
                <span className="text-xs font-bold text-amber-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" /> Chưa tạo
                </span>
              )}
            </div>

            {/* Table: quiz_results */}
            <div className={`p-3 rounded-xl border flex items-center justify-between ${
              connectionStatus.hasResultsTable
                ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                : 'bg-amber-50 border-amber-200 text-amber-900'
            }`}>
              <div>
                <span className="text-xs font-mono font-bold block">quiz_results</span>
                <span className="text-[10px] text-slate-500">Lịch sử & điểm thi</span>
              </div>
              {connectionStatus.hasResultsTable ? (
                <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> Đã có
                </span>
              ) : (
                <span className="text-xs font-bold text-amber-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" /> Chưa tạo
                </span>
              )}
            </div>
          </div>

          {(!connectionStatus.hasQuestionsTable || !connectionStatus.hasResultsTable) && (
            <div className="mt-3 p-3 rounded-xl bg-amber-100/70 border border-amber-300 text-amber-900 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong>Lý do bạn chưa thấy câu hỏi và kết quả thi trên Supabase:</strong> Bảng <code>questions</code> và <code>quiz_results</code> chưa được tạo trong CSDL. Bạn hãy cuộn xuống mục <strong>"Mã khởi tạo bảng trong Supabase"</strong> bên dưới, bấm nút <strong>Sao chép mã SQL</strong>, dán vào <strong>SQL Editor</strong> trên Supabase rồi nhấn <strong>RUN</strong> là dữ liệu sẽ lưu được ngay lập tức!
              </div>
            </div>
          )}
        </div>

        {/* Sync Actions */}
        <div className="border-t border-slate-100 pt-6">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4">
            Thao tác đồng bộ dữ liệu đám mây
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl border border-emerald-100 bg-emerald-50/40 space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-500 text-white shadow-xs">
                  <UploadCloud className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">
                    Tải lên Supabase
                  </h4>
                  <p className="text-xs text-slate-500">
                    Đẩy {currentQuestions.length} câu hỏi hiện tại lên đám mây
                  </p>
                </div>
              </div>
              <button
                onClick={handleUploadAll}
                disabled={isUploading}
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <UploadCloud className={`w-4 h-4 ${isUploading ? 'animate-bounce' : ''}`} />
                <span>{isUploading ? 'Đang đồng bộ lên...' : 'Đẩy dữ liệu lên Supabase'}</span>
              </button>
              {uploadMessage && (
                <div className={`p-2.5 rounded-xl text-xs font-medium ${
                  uploadMessage.includes('thành công') 
                    ? 'bg-emerald-100/70 text-emerald-800 border border-emerald-200' 
                    : 'bg-rose-100/70 text-rose-800 border border-rose-200'
                }`}>
                  {uploadMessage}
                </div>
              )}
            </div>

            <div className="p-5 rounded-2xl border border-sky-100 bg-sky-50/40 space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-sky-500 text-white shadow-xs">
                  <DownloadCloud className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">
                    Tải về từ Supabase
                  </h4>
                  <p className="text-xs text-slate-500">
                    Cập nhật danh sách câu hỏi mới nhất từ database
                  </p>
                </div>
              </div>
              <button
                onClick={handleDownloadAll}
                disabled={isDownloading}
                className="w-full py-2.5 px-4 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <DownloadCloud className={`w-4 h-4 ${isDownloading ? 'animate-bounce' : ''}`} />
                <span>{isDownloading ? 'Đang tải về...' : 'Tải câu hỏi từ Supabase'}</span>
              </button>
              {downloadMessage && (
                <div className={`p-2.5 rounded-xl text-xs font-medium ${
                  downloadMessage.includes('thành công') 
                    ? 'bg-sky-100/70 text-sky-800 border border-sky-200' 
                    : 'bg-amber-100/70 text-amber-800 border border-amber-200'
                }`}>
                  {downloadMessage}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* SQL Script Accordion / Helper */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              Mã khởi tạo bảng trong Supabase (SQL Editor)
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Nếu bạn chưa tạo bảng trên Supabase, hãy copy đoạn mã dưới đây và dán vào mục <b>SQL Editor</b> trên Supabase rồi nhấn <b>Run</b>.
            </p>
          </div>
          <button
            onClick={handleCopySql}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs shrink-0 cursor-pointer ${
              copiedSql
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-900 hover:bg-slate-800 text-white'
            }`}
          >
            {copiedSql ? (
              <>
                <Check className="w-4 h-4" />
                <span>Đã sao chép!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Sao chép mã SQL</span>
              </>
            )}
          </button>
        </div>

        <div className="relative">
          <pre className="p-4 rounded-2xl bg-slate-950 text-slate-200 text-xs font-mono overflow-x-auto max-h-60 scrollbar-thin border border-slate-800 leading-relaxed">
            {SUPABASE_SQL_SCHEMA}
          </pre>
        </div>
      </div>

      {/* Cloud Quiz Results History */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-indigo-600" />
            <h2 className="text-lg font-bold text-slate-900">
              Lịch sử làm bài đã lưu trên Supabase Cloud
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={async () => {
                const data = await fetchAllScoresForExcel();
                if (data.length === 0) {
                  alert('Chưa có kết quả bài thi nào để xuất Excel!');
                  return;
                }
                exportScoresToExcel(data);
              }}
              className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Xuất Excel (.xlsx)</span>
            </button>
            <button
              onClick={loadCloudResults}
              disabled={loadingResults}
              className="p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
              title="Tải lại lịch sử"
            >
              <RefreshCw className={`w-4 h-4 ${loadingResults ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {loadingResults ? (
          <div className="py-12 text-center text-slate-400 text-sm">
            <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-indigo-500" />
            Đang tải dữ liệu từ Supabase...
          </div>
        ) : cloudResults.length === 0 ? (
          <div className="py-10 text-center rounded-2xl bg-slate-50 border border-dashed border-slate-200">
            <Award className="w-8 h-8 mx-auto text-slate-300 mb-2" />
            <p className="text-sm font-semibold text-slate-600">
              Chưa có kết quả bài thi nào được ghi nhận trên Supabase
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Khi học sinh hoàn thành bất kỳ bài thi nào, kết quả sẽ tự động lưu lên Supabase Cloud.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {cloudResults.map((item, index) => (
              <div key={item.id || index} className="py-3.5 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-slate-700">
                      {item.date || 'Không có ngày'}
                    </span>
                    {item.username && (
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        @{item.username}
                      </span>
                    )}
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-semibold border border-indigo-100">
                      {item.total_questions || item.totalQuestions} câu hỏi
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                    <span>Đúng: {item.correct_count ?? item.correctCount}/{item.total_questions ?? item.totalQuestions}</span>
                    <span>•</span>
                    <span>Thời gian: {Math.floor((item.time_spent_seconds || 0) / 60)}p {(item.time_spent_seconds || 0) % 60}s</span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className={`text-base font-black ${
                    Number(item.score) >= 8 
                      ? 'text-emerald-600' 
                      : Number(item.score) >= 5 
                      ? 'text-amber-600' 
                      : 'text-rose-600'
                  }`}>
                    {Number(item.score).toFixed(1)} / 10
                  </span>
                  <span className="block text-[10px] text-slate-400">Điểm số</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
