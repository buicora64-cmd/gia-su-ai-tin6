/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { QuizConfigurator } from './components/QuizConfigurator';
import { QuizRunner } from './components/QuizRunner';
import { QuizResultModal } from './components/QuizResultModal';
import { QuestionBankView } from './components/QuestionBankView';
import { LessonNotes } from './components/LessonNotes';
import { FlashcardsView } from './components/FlashcardsView';
import { AiQuestionGenerator } from './components/AiQuestionGenerator';
import { PrintExamModal } from './components/PrintExamModal';
import { SupabaseSyncView } from './components/SupabaseSyncView';
import { ScoreManagementView } from './components/ScoreManagementView';
import { AuthModal } from './components/AuthModal';
import { CoraAiTutorModal } from './components/CoraAiTutorModal';
import { Bot, Sparkles, MessageSquare } from 'lucide-react';
import { Question, QuizResult, QuizSettings, UserProfile } from './types';
import { generateQuizQuestions } from './utils/quizGenerator';
import { INITIAL_QUESTIONS } from './data/questions';
import { saveQuizResultToSupabase, fetchQuestionsFromSupabase, getStoredUser, signOutUser } from './lib/supabase';

export default function App() {
  const [activeTab, setActiveTab] = useState<'quiz' | 'bank' | 'notes' | 'ai' | 'flashcard' | 'supabase' | 'scores' | 'cora-ai'>('quiz');
  const [appState, setAppState] = useState<'config' | 'running' | 'result'>('config');
  const [isCoraAiModalOpen, setIsCoraAiModalOpen] = useState<boolean>(false);
  
  // User Authentication state
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => getStoredUser());
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(() => !getStoredUser());

  // Custom question bank state in case user generated AI questions or synced with Supabase
  const [questionBank, setQuestionBank] = useState<Question[]>(INITIAL_QUESTIONS);

  // Active quiz session data
  const [activeSettings, setActiveSettings] = useState<QuizSettings | null>(null);
  const [activeQuestions, setActiveQuestions] = useState<Question[]>([]);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);

  // Print modal state
  const [isPrintModalOpen, setIsPrintModalOpen] = useState<boolean>(false);
  const [printQuestions, setPrintQuestions] = useState<Question[]>([]);
  const [printSettings, setPrintSettings] = useState<QuizSettings | null>(null);

  // Start a new quiz from configuration
  const handleStartQuiz = (settings: QuizSettings) => {
    const questions = generateQuizQuestions(settings);
    setActiveSettings(settings);
    setActiveQuestions(questions);
    setAppState('running');
  };

  // Start quiz for a single specific lesson directly
  const handleStartSingleLessonQuiz = (lessonId: number) => {
    const settings: QuizSettings = {
      selectedLessonIds: [lessonId],
      questionCount: 10,
      difficulty: 'tong_hop',
      mode: 'practice',
      timeLimitMinutes: 15,
      shuffleOptions: true,
      matrixRatio: { nhanBiet: 40, thongHieu: 30, vanDung: 30 },
    };
    handleStartQuiz(settings);
  };

  // Start quiz with AI generated questions
  const handleStartWithGeneratedQuestions = (questions: Question[]) => {
    const settings: QuizSettings = {
      selectedLessonIds: [questions[0]?.lessonId || 1],
      questionCount: questions.length,
      difficulty: 'tong_hop',
      mode: 'practice',
      timeLimitMinutes: 15,
      shuffleOptions: false,
    };
    setActiveSettings(settings);
    setActiveQuestions(questions);
    setAppState('running');
  };

  // Add questions to local state bank
  const handleAddQuestionsToBank = (newQuestions: Question[]) => {
    setQuestionBank((prev) => [...newQuestions, ...prev]);
  };

  // Finish quiz and show results
  const handleFinishQuiz = (result: QuizResult) => {
    setQuizResult(result);
    setAppState('result');

    // Automatically persist result to Supabase Cloud in background with user information
    saveQuizResultToSupabase(result, currentUser).catch((err) => {
      console.warn('Failed to auto-save result to Supabase:', err);
    });
  };

  // User auth handlers
  const handleLoginSuccess = (user: UserProfile) => {
    setCurrentUser(user);
    setIsAuthModalOpen(false);
  };

  const handleLogout = async () => {
    await signOutUser();
    setCurrentUser(null);
    setIsAuthModalOpen(true);
  };

  const handleOpenLogin = () => {
    setIsAuthModalOpen(true);
  };

  // Update question bank from Supabase sync
  const handleUpdateQuestionsFromSupabase = (syncedQuestions: Question[]) => {
    setQuestionBank(syncedQuestions);
  };

  // Exit quiz back to configuration
  const handleExitQuiz = () => {
    setAppState('config');
  };

  // Retry same test
  const handleRetryAll = () => {
    if (activeSettings) {
      setAppState('running');
    }
  };

  // Retry only wrong questions
  const handleRetryWrongOnly = (wrongQuestions: Question[]) => {
    if (activeSettings && wrongQuestions.length > 0) {
      setActiveQuestions(wrongQuestions);
      setAppState('running');
    }
  };

  // Return to new quiz creator
  const handleNewQuiz = () => {
    setAppState('config');
    setActiveTab('quiz');
  };

  // Open print modal from configurator
  const handleOpenPrintModal = (settings: QuizSettings) => {
    const questions = generateQuizQuestions(settings);
    setPrintQuestions(questions);
    setPrintSettings(settings);
    setIsPrintModalOpen(true);
  };

  // Open print modal from results or navbar
  const handleOpenPrintDirect = () => {
    const questions = activeQuestions.length > 0
      ? activeQuestions
      : generateQuizQuestions({
          selectedLessonIds: [],
          questionCount: 10,
          difficulty: 'tong_hop',
          mode: 'practice',
          shuffleOptions: true,
        });

    const settings = activeSettings || {
      selectedLessonIds: [],
      questionCount: questions.length,
      difficulty: 'tong_hop',
      mode: 'practice',
      shuffleOptions: true,
    };

    setPrintQuestions(questions);
    setPrintSettings(settings);
    setIsPrintModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row text-slate-800">
      {/* Vertical Navigation Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          if (tab === 'cora-ai') {
            setIsCoraAiModalOpen(true);
          }
          setActiveTab(tab);
          setAppState('config');
        }}
        onOpenPrint={handleOpenPrintDirect}
        onOpenCoraAi={() => setIsCoraAiModalOpen(true)}
        totalQuestionsCount={questionBank.length}
        currentUser={currentUser}
        onLogout={handleLogout}
        onOpenLogin={handleOpenLogin}
      />

      {/* Main Content Area (Offset by sidebar width on desktop) */}
      <div className="flex-1 flex flex-col min-w-0 md:pl-64 lg:pl-72 transition-all">
        <main className="flex-1 pb-16">
          {/* If in Running Quiz state */}
          {appState === 'running' && activeQuestions.length > 0 && activeSettings && (
            <QuizRunner
              questions={activeQuestions}
              settings={activeSettings}
              onFinishQuiz={handleFinishQuiz}
              onExitQuiz={handleExitQuiz}
            />
          )}

          {/* If in Result state */}
          {appState === 'result' && quizResult && (
            <QuizResultModal
              result={quizResult}
              onRetryAll={handleRetryAll}
              onRetryWrongOnly={handleRetryWrongOnly}
              onNewQuiz={handleNewQuiz}
              onPrint={handleOpenPrintDirect}
            />
          )}

          {/* If in Config / Browse state */}
          {appState === 'config' && (
            <>
              {activeTab === 'quiz' && (
                <QuizConfigurator
                  onStartQuiz={handleStartQuiz}
                  onOpenPrintModal={handleOpenPrintModal}
                />
              )}

              {activeTab === 'bank' && (
                <QuestionBankView
                  onStartSingleLessonQuiz={handleStartSingleLessonQuiz}
                />
              )}

              {activeTab === 'notes' && (
                <LessonNotes
                  onStartLessonQuiz={handleStartSingleLessonQuiz}
                />
              )}

              {activeTab === 'flashcard' && (
                <FlashcardsView />
              )}

              {activeTab === 'ai' && (
                <AiQuestionGenerator
                  onStartWithGeneratedQuestions={handleStartWithGeneratedQuestions}
                  onAddQuestionsToBank={handleAddQuestionsToBank}
                />
              )}

              {activeTab === 'scores' && (
                <ScoreManagementView
                  currentUser={currentUser}
                />
              )}

              {activeTab === 'supabase' && (
                <SupabaseSyncView
                  currentQuestions={questionBank}
                  onQuestionsUpdated={handleUpdateQuestionsFromSupabase}
                />
              )}

              {activeTab === 'cora-ai' && (
                <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
                  {/* Hero Banner for Gia Sư Cô Ra AI */}
                  <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-emerald-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-emerald-800 relative overflow-hidden">
                    <div className="absolute top-0 right-0 -mr-12 -mt-12 w-48 h-48 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />
                    <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6">
                      <div className="w-20 h-20 rounded-3xl bg-amber-400 flex items-center justify-center shadow-xl shadow-amber-400/20 shrink-0">
                        <Bot className="w-12 h-12 text-slate-950" />
                      </div>
                      <div className="text-center sm:text-left space-y-2 flex-1">
                        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                            Gia Sư Cô Ra AI
                          </h2>
                          <span className="text-xs font-bold bg-emerald-800 text-emerald-200 px-3 py-1 rounded-full border border-emerald-600/50">
                            Tin học 6
                          </span>
                          <span className="text-xs font-black bg-amber-400 text-slate-950 px-2.5 py-1 rounded-full shadow-xs">
                            24/7
                          </span>
                        </div>
                        <p className="text-sm text-emerald-200 max-w-xl">
                          Sẵn sàng giải đáp thắc mắc, hướng dẫn giải bài tập và ôn tập toàn diện 17 bài học SGK Tin học 6 (Kết nối tri thức với cuộc sống).
                        </p>
                        <div className="pt-2">
                          <button
                            type="button"
                            onClick={() => setIsCoraAiModalOpen(true)}
                            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 active:scale-95 text-emerald-950 font-black text-sm shadow-lg shadow-amber-500/25 flex items-center gap-2 mx-auto sm:mx-0 transition-all cursor-pointer border border-amber-300"
                          >
                            <MessageSquare className="w-4 h-4" />
                            <span>Mở Cửa Sổ Trò Chuyện Ngay</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quick Feature Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
                      <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-lg">
                        📖
                      </div>
                      <h3 className="font-bold text-slate-800 text-sm">Hỏi Bài Tập SGK</h3>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        Hỏi bất kỳ bài tập nào trong 17 bài học Tin học 6, nhận gợi ý và hướng dẫn suy luận từng bước.
                      </p>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
                      <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-lg">
                        💡
                      </div>
                      <h3 className="font-bold text-slate-800 text-sm">Giải Thích Khái Niệm</h3>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        Hiểu rõ dãy bit, dung lượng Byte/KB/MB, mạng có dây & không dây, an toàn số và cấu trúc thuật toán.
                      </p>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
                      <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-lg">
                        🐱
                      </div>
                      <h3 className="font-bold text-slate-800 text-sm">Học Lập Trình Scratch</h3>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        Hướng dẫn lắp ráp các khối lệnh điều khiển, chuyển động, sự kiện và tạo trò chơi học tập.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </main>

        {/* Footer */}
        <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500 no-print">
          <div className="max-w-7xl mx-auto px-4 space-y-1">
            <p className="font-bold text-slate-800 text-sm">
              GIA SƯ TIN HỌC 6
            </p>
            <p className="font-semibold text-indigo-600">
              Tác giả: GV: CÔ RA AI
            </p>
            <p className="text-[11px] text-slate-400">
              Hỗ trợ 3 cấp độ: Nhận biết • Thông hiểu • Vận dụng & Tổng hợp 3 cấp độ
            </p>
          </div>
        </footer>
      </div>

      {/* Floating 24/7 Button for Gia Sư Cô Ra AI (Matching Image 1) */}
      <div className="fixed bottom-5 right-5 z-40 no-print">
        <button
          type="button"
          onClick={() => setIsCoraAiModalOpen(true)}
          className="flex items-center gap-2.5 py-2.5 px-4 rounded-full bg-gradient-to-r from-amber-400 via-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-emerald-950 font-black shadow-xl shadow-amber-500/30 border-2 border-amber-300 transition-all hover:scale-105 active:scale-95 cursor-pointer group"
          title="Mở Gia Sư Cô Ra AI (Hỗ trợ giải đáp 24/7)"
        >
          <div className="w-7 h-7 rounded-full bg-emerald-950/15 flex items-center justify-center text-emerald-950 group-hover:rotate-12 transition-transform">
            <Bot className="w-4 h-4 text-emerald-950 stroke-[2.5]" />
          </div>
          <span className="text-sm font-extrabold tracking-tight">Gia Sư Cô Ra AI</span>
          <span className="bg-amber-100/95 text-emerald-950 text-xs px-2.5 py-0.5 rounded-full font-black shadow-2xs border border-amber-200">
            24/7
          </span>
        </button>
      </div>

      {/* Gia Sư Cô Ra AI Interactive Chat Modal (Matching Image 2) */}
      <CoraAiTutorModal
        isOpen={isCoraAiModalOpen}
        onClose={() => setIsCoraAiModalOpen(false)}
      />

      {/* Print / Export Modal */}
      {isPrintModalOpen && printSettings && (
        <PrintExamModal
          questions={printQuestions}
          settings={printSettings}
          currentUser={currentUser}
          onClose={() => setIsPrintModalOpen(false)}
        />
      )}

      {/* Login & Register Authentication Modal (Shown before accessing web or on demand) */}
      {isAuthModalOpen && (
        <AuthModal
          onLoginSuccess={handleLoginSuccess}
          onContinueAsGuest={() => setIsAuthModalOpen(false)}
        />
      )}
    </div>
  );
}
