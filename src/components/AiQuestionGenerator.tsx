import React, { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  CheckCircle2, 
  HelpCircle, 
  Play, 
  BookOpen, 
  Loader2, 
  AlertCircle,
  Cpu,
  Flame,
  Database
} from 'lucide-react';
import { LESSONS } from '../data/lessons';
import { DifficultyLevel, Question, QuizSettings } from '../types';
import { synthesizeQuestionsForLesson } from '../utils/aiGeneratorEngine';
import { playCompleteFanfare } from '../utils/audio';
import { uploadQuestionsToSupabase, isSupabaseConfigured } from '../lib/supabase';

interface AiQuestionGeneratorProps {
  onStartWithGeneratedQuestions: (questions: Question[]) => void;
  onAddQuestionsToBank: (questions: Question[]) => void;
}

export const AiQuestionGenerator: React.FC<AiQuestionGeneratorProps> = ({
  onStartWithGeneratedQuestions,
  onAddQuestionsToBank,
}) => {
  const [selectedLessonId, setSelectedLessonId] = useState<number>(1);
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('tong_hop');
  const [count, setCount] = useState<number>(5);
  const [customPrompt, setCustomPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [generatedQuestions, setGeneratedQuestions] = useState<Question[]>([]);
  const [sourceTag, setSourceTag] = useState<string>('AI');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [addedSuccess, setAddedSuccess] = useState<boolean>(false);
  const [isSavingToSupabase, setIsSavingToSupabase] = useState<boolean>(false);
  const [supabaseSaveSuccess, setSupabaseSaveSuccess] = useState<boolean>(false);

  const selectedLesson = LESSONS.find((l) => l.id === selectedLessonId) || LESSONS[0];

  const handleGenerate = async () => {
    setIsLoading(true);
    setErrorMsg(null);
    setAddedSuccess(false);

    try {
      // 1. Try calling the backend Gemini AI endpoint
      const response = await fetch('/api/generate-questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lessonId: selectedLesson.id,
          lessonTitle: selectedLesson.title,
          difficulty,
          count,
          customInstruction: customPrompt,
          keyPoints: selectedLesson.keyPoints,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.questions && Array.isArray(data.questions) && data.questions.length > 0) {
          setGeneratedQuestions(data.questions);
          setSourceTag(data.source === 'gemini-3.8-flash' ? 'Gemini 3.8 Flash' : 'Hệ Thống AI Tin Học 6');
          playCompleteFanfare();
          setIsLoading(false);
          return;
        }
      }

      // 2. If server didn't return questions, use client synthesis engine
      const clientGenerated = synthesizeQuestionsForLesson(
        selectedLesson.id,
        selectedLesson.title,
        difficulty,
        count,
        customPrompt,
        selectedLesson.keyPoints
      );

      setGeneratedQuestions(clientGenerated);
      setSourceTag('Hệ Thống AI Tin Học 6');
      playCompleteFanfare();
    } catch (err: unknown) {
      // 3. Fallback safely to client synthesis engine if network was interrupted
      const clientGenerated = synthesizeQuestionsForLesson(
        selectedLesson.id,
        selectedLesson.title,
        difficulty,
        count,
        customPrompt,
        selectedLesson.keyPoints
      );

      setGeneratedQuestions(clientGenerated);
      setSourceTag('Hệ Thống AI Tin Học 6');
      playCompleteFanfare();
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartExam = () => {
    if (generatedQuestions.length > 0) {
      onStartWithGeneratedQuestions(generatedQuestions);
    }
  };

  const handleAddToBank = () => {
    if (generatedQuestions.length > 0) {
      onAddQuestionsToBank(generatedQuestions);
      setAddedSuccess(true);
      setTimeout(() => setAddedSuccess(false), 3000);
    }
  };

  const handleSaveToSupabase = async () => {
    if (generatedQuestions.length === 0) return;
    setIsSavingToSupabase(true);
    const res = await uploadQuestionsToSupabase(generatedQuestions);
    setIsSavingToSupabase(false);
    if (res.success) {
      setSupabaseSaveSuccess(true);
      onAddQuestionsToBank(generatedQuestions);
      setTimeout(() => setSupabaseSaveSuccess(false), 3500);
    } else {
      alert(`Chưa thể lưu lên Supabase: ${res.error}`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8 animate-in fade-in">
      
      {/* Hero */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-amber-100 space-y-3">
        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-yellow-200" />
          Trí Tuệ Nhân Tạo Hỗ Trợ Giáo Dục
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Tạo Câu Hỏi Ôn Tập Mới Bằng AI
        </h2>
        <p className="text-amber-100 text-xs sm:text-sm max-w-xl leading-relaxed">
          Tự động sinh các câu hỏi trắc nghiệm mới toanh, sát với nội dung Sách giáo khoa Tin học 6 Kết nối tri thức theo bất kì bài học và cấp độ nào bạn muốn!
        </p>
      </div>

      {/* Generator Form */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          {/* Lesson */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
              Chọn Bài Học Cần Tạo
            </label>
            <select
              value={selectedLessonId}
              onChange={(e) => setSelectedLessonId(Number(e.target.value))}
              className="w-full py-2.5 px-3 rounded-xl border border-slate-200 text-xs font-semibold bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
            >
              {LESSONS.map((l) => (
                <option key={l.id} value={l.id}>{l.title}</option>
              ))}
            </select>
            <p className="text-[11px] text-slate-500 mt-1">
              {selectedLesson.pages}
            </p>
          </div>

          {/* Difficulty */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
              Cấp Độ Nhận Thức
            </label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value as DifficultyLevel)}
              className="w-full py-2.5 px-3 rounded-xl border border-slate-200 text-xs font-semibold bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
            >
              <option value="nhan_biet">Cấp độ 1: Nhận biết (Dễ)</option>
              <option value="thong_hieu">Cấp độ 2: Thông hiểu (Trung bình)</option>
              <option value="van_dung">Cấp độ 3: Vận dụng (Khó / Tình huống)</option>
              <option value="tong_hop">Tổng hợp cả 3 cấp độ</option>
            </select>
          </div>

          {/* Count */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
              Số Lượng Câu Hỏi AI Tạo
            </label>
            <select
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              className="w-full py-2.5 px-3 rounded-xl border border-slate-200 text-xs font-semibold bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
            >
              <option value={3}>3 câu hỏi nhanh</option>
              <option value={5}>5 câu hỏi tiêu chuẩn</option>
              <option value={10}>10 câu hỏi toàn diện</option>
            </select>
          </div>

        </div>

        {/* Custom prompt request */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
            Yêu Cầu Đặc Biệt Hoặc Tình Huống Mong Muốn (Tùy chọn)
          </label>
          <input
            type="text"
            placeholder="Ví dụ: Tạo câu hỏi tình huống thực tế về đặt mật khẩu mạnh; hoặc bài toán tính toán dung lượng ảnh..."
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
          />
        </div>

        {/* Action Button */}
        <div className="flex justify-end pt-2">
          <button
            type="button"
            disabled={isLoading}
            onClick={handleGenerate}
            className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white font-bold text-sm sm:text-base shadow-md shadow-amber-200 transition-all flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>AI đang sinh câu hỏi...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Bắt Đầu Tạo Câu Hỏi Bằng AI</span>
              </>
            )}
          </button>
        </div>

        {/* Error notification */}
        {errorMsg && (
          <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl flex items-start gap-2.5 text-xs text-rose-800">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Không thể tạo câu hỏi qua AI lúc này:</p>
              <p>{errorMsg}</p>
              <p className="text-[11px] text-slate-500 mt-1">
                (Bạn vẫn có thể ôn tập với đầy đủ kho câu hỏi chuẩn SGK có sẵn trong ứng dụng mà không cần AI)
              </p>
            </div>
          </div>
        )}

      </div>

      {/* Generated Results Preview */}
      {generatedQuestions.length > 0 && (
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold text-slate-900 text-base sm:text-lg">
                  Đã Tạo Thành Công {generatedQuestions.length} Câu Hỏi Mới!
                </h3>
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-100 to-orange-100 text-amber-900 border border-amber-200 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-600" />
                  {sourceTag}
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Xem trước các câu hỏi vừa được AI biên soạn theo SGK Tin học 6 Kết nối tri thức
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handleAddToBank}
                className="px-3.5 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold transition-colors"
              >
                {addedSuccess ? '✓ Đã thêm vào kho!' : 'Thêm vào kho máy'}
              </button>

              {isSupabaseConfigured && (
                <button
                  type="button"
                  onClick={handleSaveToSupabase}
                  disabled={isSavingToSupabase}
                  className="px-3.5 py-2 rounded-xl border border-emerald-300 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                  title="Lưu các câu hỏi này lên Supabase Cloud database"
                >
                  <Database className={`w-3.5 h-3.5 text-emerald-600 ${isSavingToSupabase ? 'animate-spin' : ''}`} />
                  <span>{supabaseSaveSuccess ? '✓ Đã lưu lên Supabase!' : isSavingToSupabase ? 'Đang lưu...' : 'Lưu lên Supabase'}</span>
                </button>
              )}

              <button
                type="button"
                onClick={handleStartExam}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-xs transition-colors flex items-center gap-1.5"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>Làm Ngay Bộ Đề Này</span>
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {generatedQuestions.map((q, idx) => (
              <div key={q.id || idx} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-md bg-amber-100 text-amber-800 font-bold text-xs flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <span className="text-xs font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                    {q.level === 'nhan_biet' ? 'Nhận biết' : q.level === 'thong_hieu' ? 'Thông hiểu' : 'Vận dụng'}
                  </span>
                </div>

                <p className="font-bold text-slate-900 text-sm">
                  {q.question}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {q.options.map((opt, optIdx) => (
                    <div 
                      key={optIdx} 
                      className={`p-2.5 rounded-xl border ${
                        optIdx === q.correctAnswer
                          ? 'border-emerald-300 bg-emerald-50 text-emerald-950 font-bold'
                          : 'border-slate-200 bg-white text-slate-700'
                      }`}
                    >
                      <span className="font-bold mr-1.5">{['A', 'B', 'C', 'D'][optIdx]}.</span>
                      <span>{opt}</span>
                    </div>
                  ))}
                </div>

                <p className="text-xs text-slate-600 italic">
                  <strong>Giải thích:</strong> {q.explanation}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
