import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  RotateCcw, 
  BookOpen, 
  CheckCircle2, 
  HelpCircle,
  ChevronDown
} from 'lucide-react';
import { LESSONS } from '../data/lessons';
import { SUGGESTED_QUESTIONS } from '../utils/coraKnowledgeBase';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
}

interface CoraAiTutorModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultLessonId?: number;
}

export const CoraAiTutorModal: React.FC<CoraAiTutorModalProps> = ({
  isOpen,
  onClose,
  defaultLessonId,
}) => {
  const [selectedLessonId, setSelectedLessonId] = useState<number | 'all'>(
    defaultLessonId || 'all'
  );
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-msg',
      sender: 'ai',
      text: 'Chào em! Cô là **Cô Ra AI** - Gia sư đồng hành cùng em trong môn Tin học 6 (bộ sách Kết nối tri thức với cuộc sống). Em có thắc mắc gì về bài học, thông tin, dữ liệu, mạng máy tính hay các thuật toán không? Hãy nhắn cho cô nhé!',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
        scrollToBottom();
      }, 100);
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || loading) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setLoading(true);

    try {
      const activeLesson = selectedLessonId !== 'all' 
        ? LESSONS.find((l) => l.id === selectedLessonId) 
        : undefined;

      const historyPayload = messages.slice(-6).map((m) => ({
        role: m.sender === 'user' ? 'user' : 'model',
        text: m.text,
      }));

      const res = await fetch('/api/cora-ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: historyPayload,
          lessonId: selectedLessonId !== 'all' ? selectedLessonId : undefined,
          lessonTitle: activeLesson?.title,
        }),
      });

      const data = await res.json();
      const replyText = data.reply || 'Cô đang cập nhật thêm kiến thức, em thử hỏi lại nhé!';

      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error('Error contacting Cô Ra AI:', err);
      const errorMsg: Message = {
        id: `ai-err-${Date.now()}`,
        sender: 'ai',
        text: 'Cô đang kiểm tra lại kết nối một chút, em hỏi lại câu hỏi nhé!',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: 'welcome-msg',
        sender: 'ai',
        text: 'Chào em! Cô là **Cô Ra AI** - Gia sư đồng hành cùng em trong môn Tin học 6 (bộ sách Kết nối tri thức với cuộc sống). Em có thắc mắc gì về bài học, thông tin, dữ liệu, mạng máy tính hay các thuật toán không? Hãy nhắn cho cô nhé!',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200">
        
        {/* Header - Matching Image 2 with teal/emerald theme */}
        <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-emerald-950 p-4 sm:p-5 text-white flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            {/* Yellow Avatar Box with Robot Icon */}
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-amber-400 flex items-center justify-center shadow-lg shadow-amber-400/20 shrink-0">
              <Bot className="w-6 h-6 sm:w-7 sm:h-7 text-slate-900" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-black text-lg sm:text-xl tracking-tight text-white">
                  Gia Sư Cô Ra AI
                </h3>
                <span className="text-[11px] font-bold bg-emerald-800/90 text-emerald-200 px-2.5 py-0.5 rounded-full border border-emerald-600/50">
                  Tin học 6
                </span>
                <span className="text-[10px] font-bold bg-amber-400 text-slate-950 px-2 py-0.5 rounded-full shadow-xs">
                  24/7
                </span>
              </div>
              <p className="text-xs text-emerald-200/90 mt-0.5 font-medium">
                Sẵn sàng giải đáp & hướng dẫn giải bài tập SGK 24/7
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handleResetChat}
              className="p-2 text-emerald-200 hover:text-white rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
              title="Làm mới cuộc trò chuyện"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
              title="Đóng cửa sổ"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Sub-bar: Current Supporting Lesson Indicator */}
        <div className="bg-emerald-50/90 border-b border-emerald-100/80 px-4 py-2.5 text-xs text-emerald-900 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="truncate">
              <strong>Đang hỗ trợ bài:</strong>{' '}
              {selectedLessonId === 'all'
                ? 'Ôn tập toàn diện 17 bài học SGK Tin học 6 - Kết nối tri thức với cuộc sống'
                : LESSONS.find((l) => l.id === selectedLessonId)?.title}
            </span>
          </div>

          {/* Lesson selector dropdown */}
          <div className="relative shrink-0">
            <select
              value={selectedLessonId}
              onChange={(e) => setSelectedLessonId(e.target.value === 'all' ? 'all' : Number(e.target.value))}
              className="text-xs bg-white text-emerald-950 font-semibold border border-emerald-300 rounded-xl px-2.5 py-1 pr-6 focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer shadow-2xs appearance-none"
            >
              <option value="all">Toàn bộ 17 bài học</option>
              {LESSONS.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.title}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3 h-3 text-emerald-700 absolute right-2 top-2 pointer-events-none" />
          </div>
        </div>

        {/* Messages Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-slate-50/60 min-h-[320px] max-h-[50vh]">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-2.5 ${
                msg.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.sender === 'ai' && (
                <div className="w-8 h-8 rounded-full bg-amber-400 flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                  <Bot className="w-4 h-4 text-slate-900" />
                </div>
              )}

              <div
                className={`max-w-[85%] sm:max-w-[78%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-xs ${
                  msg.sender === 'user'
                    ? 'bg-emerald-600 text-white font-medium rounded-tr-xs'
                    : 'bg-white text-slate-800 border border-slate-200/80 rounded-tl-xs'
                }`}
              >
                <div 
                  className="space-y-1.5 whitespace-pre-wrap selection:bg-emerald-100"
                  dangerouslySetInnerHTML={{
                    __html: msg.text
                      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                      .replace(/\*(.*?)\*/g, '<em>$1</em>')
                      .replace(/\n/g, '<br/>')
                  }}
                />
                <span
                  className={`block text-[10px] mt-1.5 text-right font-sans ${
                    msg.sender === 'user' ? 'text-emerald-200' : 'text-slate-400'
                  }`}
                >
                  {msg.timestamp}
                </span>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-full bg-amber-400 flex items-center justify-center shrink-0 shadow-xs animate-bounce">
                <Bot className="w-4 h-4 text-slate-900" />
              </div>
              <div className="bg-white rounded-2xl rounded-tl-xs px-4 py-3 border border-slate-200 text-xs text-slate-500 flex items-center gap-2 shadow-xs">
                <div className="flex gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse delay-100"></span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse delay-200"></span>
                </div>
                <span>Cô Ra AI đang suy nghĩ câu trả lời...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggestion Chips (Prompt Pills) - Matching Image 2 */}
        <div className="px-4 py-2 border-t border-slate-100 bg-white">
          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center gap-1">
            <HelpCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span>Gợi ý câu hỏi nhanh cho Cô Ra AI:</span>
          </p>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 scrollbar-thin">
            {SUGGESTED_QUESTIONS.map((sq) => (
              <button
                key={sq.id}
                type="button"
                onClick={() => handleSendMessage(sq.text)}
                disabled={loading}
                className="whitespace-nowrap px-3 py-1.5 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300 border border-slate-200/80 rounded-full text-xs font-medium text-slate-700 transition-colors cursor-pointer shrink-0 disabled:opacity-50"
              >
                {sq.text}
              </button>
            ))}
          </div>
        </div>

        {/* Bottom Input Field */}
        <div className="p-3 sm:p-4 bg-white border-t border-slate-200">
          <div className="flex items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={loading}
              placeholder="Nhập câu hỏi về Tin học 6 gửi Cô Ra AI..."
              className="flex-1 px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm placeholder:text-slate-400 bg-slate-50 focus:bg-white transition-all shadow-inner"
            />

            <button
              type="button"
              onClick={() => handleSendMessage()}
              disabled={!inputMessage.trim() || loading}
              className="w-12 h-12 rounded-2xl bg-emerald-500 hover:bg-emerald-600 active:scale-95 disabled:opacity-40 disabled:hover:bg-emerald-500 text-white flex items-center justify-center shadow-md transition-all cursor-pointer shrink-0"
              title="Gửi câu hỏi"
            >
              <Send className="w-5 h-5 ml-0.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
