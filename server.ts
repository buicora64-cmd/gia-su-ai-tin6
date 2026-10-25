import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { synthesizeQuestionsForLesson } from './src/utils/aiGeneratorEngine';
import { generateCoraFallbackResponse } from './src/utils/coraKnowledgeBase';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  app.use(express.json());

  // API Route: Generate questions with Gemini AI or Smart Synthesis Engine
  app.post('/api/generate-questions', async (req: Request, res: Response) => {
    const {
      lessonId = 1,
      lessonTitle = 'Bài 1. Thông tin và dữ liệu',
      difficulty = 'tong_hop',
      count = 5,
      customInstruction = '',
      keyPoints = [],
    } = req.body;

    const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY || process.env.GOOGLE_API_KEY;

    // If API key is available, attempt real Gemini API call
    if (apiKey) {
      try {
        const ai = new GoogleGenAI({
          apiKey,
          httpOptions: {
            headers: {
              'User-Agent': 'aistudio-build',
            },
          },
        });

        let levelDesc = 'kết hợp cả 3 cấp độ: Nhận biết, Thông hiểu và Vận dụng';
        if (difficulty === 'nhan_biet') levelDesc = 'Cấp độ 1: Nhận biết (khái niệm, định nghĩa, nhận diện cơ bản)';
        else if (difficulty === 'thong_hieu') levelDesc = 'Cấp độ 2: Thông hiểu (giải thích ý nghĩa, phân biệt, so sánh)';
        else if (difficulty === 'van_dung') levelDesc = 'Cấp độ 3: Vận dụng (xử lí tình huống thực tế, giải toán đơn vị dữ liệu, giải thích thuật toán, Scratch)';

        const prompt = `
Bạn là chuyên gia giáo dục biên soạn đề kiểm tra môn Tin học 6 theo bộ sách giáo khoa "Kết nối tri thức với cuộc sống" (NXB Giáo Dục Việt Nam).
Hãy tạo đúng ${count} câu hỏi trắc nghiệm khách quan 4 phương án (A, B, C, D) cho học sinh lớp 6.

Thông tin bài học:
- Bài: ${lessonTitle} (Bài số ${lessonId})
- Cấp độ yêu cầu: ${levelDesc}
- Kiến thức trọng tâm SGK: ${Array.isArray(keyPoints) ? keyPoints.join('; ') : ''}
${customInstruction ? `- Yêu cầu bổ sung của giáo viên: ${customInstruction}` : ''}

YÊU CẦU BẮT BUỘC:
1. Ngôn ngữ tiếng Việt trong sáng, chuẩn xác, phù hợp lứa tuổi học sinh lớp 6.
2. Mỗi câu hỏi có đúng 4 phương án lựa chọn A, B, C, D. Trong đó có đúng 1 phương án chính xác nhất.
3. correctAnswer là chỉ số của phương án đúng (0 cho A, 1 cho B, 2 cho C, 3 cho D).
4. level phải là một trong 3 giá trị: "nhan_biet", "thong_hieu", "van_dung".
5. explanation: Lời giải thích ngắn gọn, rõ ràng, nêu tại sao phương án đó đúng và liên hệ với SGK Tin học 6 Kết nối tri thức.
`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            systemInstruction: 'Bạn là chuyên gia biên soạn đề thi trắc nghiệm môn Tin học 6 theo sách giáo khoa Kết nối tri thức với cuộc sống. Luôn trả về dữ liệu chuẩn JSON theo đúng schema.',
            responseMimeType: 'application/json',
            responseSchema: {
              type: Type.ARRAY,
              description: 'Danh sách các câu hỏi trắc nghiệm',
              items: {
                type: Type.OBJECT,
                properties: {
                  question: {
                    type: Type.STRING,
                    description: 'Nội dung câu hỏi trắc nghiệm',
                  },
                  options: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: 'Bốn phương án A, B, C, D',
                  },
                  correctAnswer: {
                    type: Type.INTEGER,
                    description: 'Chỉ số phương án đúng: 0, 1, 2 hoặc 3',
                  },
                  level: {
                    type: Type.STRING,
                    description: 'Cấp độ nhận thức: nhan_biet, thong_hieu, hoặc van_dung',
                  },
                  explanation: {
                    type: Type.STRING,
                    description: 'Lời giải thích chi tiết cho câu hỏi',
                  },
                  textbookRef: {
                    type: Type.STRING,
                    description: 'Trích dẫn sách giáo khoa Tin học 6 Kết nối tri thức',
                  },
                },
                required: ['question', 'options', 'correctAnswer', 'level', 'explanation'],
              },
            },
          },
        });

        const text = response.text ? response.text.trim() : '';
        const parsed = JSON.parse(text);

        if (Array.isArray(parsed) && parsed.length > 0) {
          const formattedQuestions = parsed.map((item: any, idx: number) => ({
            id: `ai-gemini-${Date.now()}-${idx}`,
            lessonId: Number(lessonId),
            lessonTitle: lessonTitle || `Bài ${lessonId}`,
            topicId: Math.ceil(Number(lessonId) / 3),
            topicTitle: 'Ôn tập Tin học 6',
            level: ['nhan_biet', 'thong_hieu', 'van_dung'].includes(item.level)
              ? item.level
              : (difficulty === 'tong_hop' ? 'thong_hieu' : difficulty),
            question: item.question,
            options: item.options.slice(0, 4) as [string, string, string, string],
            correctAnswer: typeof item.correctAnswer === 'number' ? item.correctAnswer : 0,
            explanation: item.explanation,
            textbookRef: item.textbookRef || `SGK Tin học 6 - Bài ${lessonId}`,
          }));

          return res.json({ 
            questions: formattedQuestions,
            source: 'gemini-3.8-flash'
          });
        }
      } catch (geminiErr) {
        console.warn('Gemini API call failed, switching to Curriculum AI engine:', geminiErr);
      }
    }

    // Seamless Fallback: Generate authentic questions using Curriculum AI Engine
    try {
      const generated = synthesizeQuestionsForLesson(
        Number(lessonId),
        lessonTitle,
        difficulty,
        Number(count) || 5,
        customInstruction,
        keyPoints
      );

      return res.json({ 
        questions: generated,
        source: 'curriculum-ai-engine'
      });
    } catch (synthErr) {
      console.error('Error in synthesis engine:', synthErr);
      return res.status(500).json({ error: 'Không thể tạo câu hỏi lúc này' });
    }
  });

  // API Route: Gia Sư Cô Ra AI Tutor Chat
  app.post('/api/cora-ai-chat', async (req: Request, res: Response) => {
    const { message, history = [], lessonId, lessonTitle } = req.body;

    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({ error: 'Vui lòng nhập nội dung câu hỏi' });
    }

    const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY || process.env.GOOGLE_API_KEY;

    if (apiKey) {
      try {
        const ai = new GoogleGenAI({
          apiKey,
          httpOptions: {
            headers: {
              'User-Agent': 'aistudio-build',
            },
          },
        });

        const systemInstruction = `
Bạn là "Cô Ra AI" - Gia sư ảo thông minh, ân cần, kiên nhẫn và mẫu mực môn Tin học 6 theo sách giáo khoa "Kết nối tri thức với cuộc sống" (NXB Giáo Dục Việt Nam).
Tác giả phần mềm: GV: CÔ RA AI.
Xưng hô chuẩn mực: "Cô" và "em". Luôn giữ thái độ thân thiện, khích lệ tinh thần học tập của học sinh lớp 6.

Trách nhiệm và phong cách giảng dạy:
1. Giải đáp kiến thức, câu hỏi, bài tập trong 17 bài học SGK Tin học 6:
   - Bài 1: Thông tin và dữ liệu
   - Bài 2: Xử lí thông tin (Thiết bị vào, CPU, Bộ nhớ, Thiết bị ra)
   - Bài 3: Thông tin trong máy tính (Dãy bit 0 và 1, đơn vị B, KB, MB, GB, TB)
   - Bài 4: Mạng máy tính (Lợi ích chia sẻ tài nguyên, thiết bị kết nối, mạng không dây)
   - Bài 5: Internet (Đặc điểm, nhà cung cấp ISP, học trực tuyến E-learning)
   - Bài 6: Mạng thông tin toàn cầu WWW (Siêu văn bản, website, trình duyệt web)
   - Bài 7: Tìm kiếm thông tin trên Internet (Từ khóa, dấu ngoặc kép, dấu trừ, dấu cộng)
   - Bài 8: Thư điện tử Email (Ký tự @, tiêu đề, tệp đính kèm kẹp ghim, spam)
   - Bài 9: An toàn thông tin trên Internet (Quy tắc SMART, mật khẩu an toàn)
   - Bài 10: Sơ đồ tư duy (Tony Buzan, chủ đề chính, nhánh chính, nhánh con)
   - Bài 11: Định dạng văn bản (Font chữ, căn lề đoạn văn, Page Setup)
   - Bài 12: Trình bày thông tin ở dạng bảng (Insert Table, Merge Cells, Split Cells)
   - Bài 13: Thực hành Tìm kiếm và thay thế (Ctrl+F, Ctrl+H, Replace All)
   - Bài 14: Thực hành hoàn thiện sổ lưu niệm (Cover Page, Text from File, Wrap Text)
   - Bài 15: Thuật toán (Đầu vào Input, Đầu ra Output, sơ đồ khối elip, bình hành, chữ nhật, hình thoi)
   - Bài 16: Các cấu trúc điều khiển (Tuần tự, Rẽ nhánh thiếu/đủ, Lặp)
   - Bài 17: Chương trình máy tính & Lập trình trực quan Scratch (Sự kiện cờ xanh, chuyển động, hiển thị, cảm biến, điều khiển)
2. Hướng dẫn giải từng bước rõ ràng, dễ hiểu, có ví dụ minh họa gần gũi với lứa tuổi học sinh lớp 6.
3. Trình bày bằng định dạng Markdown đẹp mắt: in đậm tiêu đề, gạch đầu dòng, danh sách các bước.
${lessonId ? `Học sinh đang chọn tìm hiểu về: ${lessonTitle || `Bài ${lessonId}`}. Hãy ưu tiên giải thích theo bài học này.` : ''}
`;

        const formattedContents: any[] = [];
        if (Array.isArray(history)) {
          history.slice(-6).forEach((h: any) => {
            if (h.role === 'user' || h.role === 'model') {
              formattedContents.push({
                role: h.role === 'user' ? 'user' : 'model',
                parts: [{ text: h.text || h.content || '' }],
              });
            }
          });
        }

        formattedContents.push({
          role: 'user',
          parts: [{ text: message.trim() }],
        });

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: formattedContents,
          config: {
            systemInstruction,
            temperature: 0.7,
          },
        });

        const reply = response.text ? response.text.trim() : '';
        if (reply) {
          return res.json({ reply, source: 'gemini-3.8-flash' });
        }
      } catch (geminiChatErr) {
        console.warn('Gemini tutor chat fallback to knowledge base:', geminiChatErr);
      }
    }

    // Intelligent Curriculum Knowledge Base Fallback
    const fallbackReply = generateCoraFallbackResponse(message.trim(), lessonId);
    return res.json({ reply: fallbackReply, source: 'curriculum-knowledge-base' });
  });

  // Serve static files in production or hook up Vite middlewares in development
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
