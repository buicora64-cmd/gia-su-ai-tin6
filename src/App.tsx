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
import { Question, QuizResult, QuizSettings } from './types';
import { generateQuizQuestions } from './utils/quizGenerator';
import { INITIAL_QUESTIONS } from './data/questions';

export default function App() {
  const [activeTab, setActiveTab] = useState<'quiz' | 'bank' | 'notes' | 'ai' | 'flashcard'>('quiz');
  const [appState, setAppState] = useState<'config' | 'running' | 'result'>('config');
  
  // Custom question bank state in case user generated AI questions
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
          setActiveTab(tab);
          setAppState('config');
        }}
        onOpenPrint={handleOpenPrintDirect}
        totalQuestionsCount={questionBank.length}
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

      {/* Print / Export Modal */}
      {isPrintModalOpen && printSettings && (
        <PrintExamModal
          questions={printQuestions}
          settings={printSettings}
          onClose={() => setIsPrintModalOpen(false)}
        />
      )}
    </div>
  );
}
