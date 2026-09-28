import React, { useState } from 'react';
import { 
  Printer, 
  X, 
  Download, 
  ExternalLink, 
  FileText, 
  Check, 
  Info,
  Layers,
  HelpCircle
} from 'lucide-react';
import { Question, QuizSettings } from '../types';

interface PrintExamModalProps {
  questions: Question[];
  settings: QuizSettings;
  onClose: () => void;
}

export const PrintExamModal: React.FC<PrintExamModalProps> = ({
  questions,
  settings,
  onClose,
}) => {
  const [includeAnswerKey, setIncludeAnswerKey] = useState<boolean>(true);
  const [includeBubbleSheet, setIncludeBubbleSheet] = useState<boolean>(true);
  const [schoolName, setSchoolName] = useState<string>('TRƯỜNG THCS ....................................................');
  const [examTitle, setExamTitle] = useState<string>('ĐỀ KIỂM TRA ÔN TẬP - GIA SƯ TIN HỌC 6');
  const [timeText, setTimeText] = useState<string>('Tác giả: GV: CÔ RA AI • Thời gian: 15 phút');
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);

  // User simulated selections on the bubble sheet in preview (optional interactive feature)
  const [simulatedAnswers, setSimulatedAnswers] = useState<Record<number, number>>({});

  const toggleSimulatedBubble = (qIdx: number, optIdx: number) => {
    setSimulatedAnswers(prev => ({
      ...prev,
      [qIdx]: prev[qIdx] === optIdx ? -1 : optIdx,
    }));
  };

  // Determine number of columns for the table (2 columns for <= 20 questions, 3 columns for > 20)
  const numColumns = questions.length <= 20 ? 2 : 3;
  const rowsCount = Math.ceil(questions.length / numColumns);

  // Generate HTML string for Print or Word export
  const generateCleanExamHtml = () => {
    // Generate bubble sheet table HTML
    const bubbleTableHtml = `
      <div style="border: 1.5px solid #000; padding: 8px 12px; margin: 12px 0 16px 0; border-radius: 4px; page-break-inside: avoid; break-inside: avoid;">
        <div style="font-weight: bold; text-align: center; font-size: 11pt; text-transform: uppercase; margin-bottom: 8px; letter-spacing: 0.5px;">
          PHIẾU TRẢ LỜI TRẮC NGHIỆM (HỌC SINH TÔ ĐEN VÀO 1 Ô PHƯƠNG ÁN CHỌN)
        </div>
        <table style="width: 100%; border-collapse: collapse; text-align: center; margin: 0 auto;">
          <thead>
            <tr>
              ${Array.from({ length: numColumns }).map((_, cIdx) => `
                <th style="width: 48px; border: 1px solid #000; background-color: #f1f5f9; padding: 4px; font-size: 10pt; font-weight: bold;">Câu</th>
                <th style="width: 32px; border: 1px solid #000; background-color: #f1f5f9; padding: 4px; font-size: 10pt; font-weight: bold;">A</th>
                <th style="width: 32px; border: 1px solid #000; background-color: #f1f5f9; padding: 4px; font-size: 10pt; font-weight: bold;">B</th>
                <th style="width: 32px; border: 1px solid #000; background-color: #f1f5f9; padding: 4px; font-size: 10pt; font-weight: bold;">C</th>
                <th style="width: 32px; border: 1px solid #000; background-color: #f1f5f9; padding: 4px; font-size: 10pt; font-weight: bold;">D</th>
                ${cIdx < numColumns - 1 ? '<th style="width: 16px; border: none; background: #fff;"></th>' : ''}
              `).join('')}
            </tr>
          </thead>
          <tbody>
            ${Array.from({ length: rowsCount }).map((_, r) => `
              <tr>
                ${Array.from({ length: numColumns }).map((_, c) => {
                  const qIdx = c * rowsCount + r;
                  if (qIdx < questions.length) {
                    return `
                      <td style="border: 1px solid #000; text-align: center; font-weight: bold; padding: 3px; font-size: 10pt; background-color: #fafafa;">${qIdx + 1}</td>
                      <td style="border: 1px solid #000; text-align: center; padding: 3px 2px;"><span style="display: inline-block; width: 19px; height: 19px; line-height: 17px; border: 1.5px solid #000; border-radius: 50%; font-weight: bold; font-size: 9pt; text-align: center;">A</span></td>
                      <td style="border: 1px solid #000; text-align: center; padding: 3px 2px;"><span style="display: inline-block; width: 19px; height: 19px; line-height: 17px; border: 1.5px solid #000; border-radius: 50%; font-weight: bold; font-size: 9pt; text-align: center;">B</span></td>
                      <td style="border: 1px solid #000; text-align: center; padding: 3px 2px;"><span style="display: inline-block; width: 19px; height: 19px; line-height: 17px; border: 1.5px solid #000; border-radius: 50%; font-weight: bold; font-size: 9pt; text-align: center;">C</span></td>
                      <td style="border: 1px solid #000; text-align: center; padding: 3px 2px;"><span style="display: inline-block; width: 19px; height: 19px; line-height: 17px; border: 1.5px solid #000; border-radius: 50%; font-weight: bold; font-size: 9pt; text-align: center;">D</span></td>
                      ${c < numColumns - 1 ? '<td style="border: none;"></td>' : ''}
                    `;
                  } else {
                    return `
                      <td style="border: 1px solid #eee; padding: 3px;"></td>
                      <td style="border: 1px solid #eee; padding: 3px;"></td>
                      <td style="border: 1px solid #eee; padding: 3px;"></td>
                      <td style="border: 1px solid #eee; padding: 3px;"></td>
                      <td style="border: 1px solid #eee; padding: 3px;"></td>
                      ${c < numColumns - 1 ? '<td style="border: none;"></td>' : ''}
                    `;
                  }
                }).join('')}
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;

    return `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="utf-8">
  <title>${examTitle}</title>
  <style>
    @page { 
      size: A4 portrait; 
      margin: 15mm 15mm 15mm 15mm; 
    }
    body { 
      font-family: "Times New Roman", Times, serif; 
      font-size: 13pt; 
      line-height: 1.45; 
      color: #000; 
      margin: 0; 
      padding: 10px; 
    }
    .header-table { 
      width: 100%; 
      border-bottom: 2px solid #000; 
      margin-bottom: 12px; 
      padding-bottom: 8px; 
    }
    .school-info { text-align: left; vertical-align: top; width: 50%; }
    .exam-info { text-align: right; vertical-align: top; width: 50%; }
    .title { font-size: 14pt; font-weight: bold; text-transform: uppercase; margin: 0; }
    .code-box { display: inline-block; border: 1px solid #000; padding: 2px 12px; font-weight: bold; margin-top: 4px; }
    .score-table { width: 100%; border-collapse: collapse; margin-top: 8px; margin-bottom: 12px; text-align: center; }
    .score-table th, .score-table td { border: 1px solid #000; padding: 6px; font-size: 11pt; }
    .section-title { font-weight: bold; font-size: 13pt; text-transform: uppercase; text-decoration: underline; margin: 12px 0 8px 0; }
    .question-block { margin-bottom: 12px; page-break-inside: avoid; break-inside: avoid; }
    .q-text { font-weight: bold; margin-bottom: 4px; }
    .options-table { width: 100%; margin-left: 10px; }
    .options-table td { width: 50%; vertical-align: top; padding: 2px 4px; font-size: 12pt; }
    .answer-key { margin-top: 25px; page-break-before: always; border-top: 2px dashed #000; padding-top: 15px; }
    .key-table { width: 100%; border-collapse: collapse; margin-top: 8px; margin-bottom: 12px; }
    .key-table th, .key-table td { border: 1px solid #000; padding: 5px; text-align: center; font-size: 11pt; }
    .expl-item { font-size: 11pt; margin-bottom: 6px; }
  </style>
</head>
<body>
  <!-- Header -->
  <table class="header-table">
    <tr>
      <td class="school-info">
        <p style="font-weight: bold; text-transform: uppercase; margin: 0 0 4px 0;">${schoolName}</p>
        <p style="margin: 2px 0;">Họ và tên học sinh: ..............................................................</p>
        <p style="margin: 2px 0;">Lớp: 6......... &nbsp;&nbsp;&nbsp;&nbsp; Số báo danh: ....................</p>
      </td>
      <td class="exam-info">
        <p class="title">${examTitle}</p>
        <p style="font-style: italic; font-size: 11pt; margin: 2px 0;">${timeText}</p>
        <div class="code-box">Mã đề: TH6-01</div>
      </td>
    </tr>
  </table>

  <!-- Score Board -->
  <table class="score-table">
    <tr>
      <th style="width: 50%;">ĐIỂM SỐ</th>
      <th style="width: 50%;">LỜI PHÊ CỦA THẦY/CÔ GIÁO</th>
    </tr>
    <tr>
      <td style="height: 40px;"></td>
      <td style="height: 40px;"></td>
    </tr>
  </table>

  <!-- Structured Bubble Answer Table -->
  ${includeBubbleSheet ? bubbleTableHtml : ''}

  <!-- Questions -->
  <div class="section-title">PHẦN CÂU HỎI TRẮC NGHIỆM (GỒM ${questions.length} CÂU)</div>
  ${questions.map((q, idx) => `
    <div class="question-block">
      <div class="q-text">Câu ${idx + 1}: ${q.question}</div>
      <table class="options-table">
        <tr>
          <td><strong>A.</strong> ${q.options[0]}</td>
          <td><strong>B.</strong> ${q.options[1]}</td>
        </tr>
        <tr>
          <td><strong>C.</strong> ${q.options[2]}</td>
          <td><strong>D.</strong> ${q.options[3]}</td>
        </tr>
      </table>
    </div>
  `).join('')}

  ${includeAnswerKey ? `
  <!-- Answer Key Section -->
  <div class="answer-key">
    <div style="font-weight: bold; text-align: center; font-size: 13pt; text-transform: uppercase; margin-bottom: 8px;">
      ĐÁP ÁN VÀ LỜI GIẢI THÍCH CHI TIẾT
    </div>
    <table class="key-table">
      <tr>
        ${questions.map((_, idx) => `<th>${idx + 1}</th>`).join('')}
      </tr>
      <tr>
        ${questions.map((q) => `<td><strong>${['A', 'B', 'C', 'D'][q.correctAnswer]}</strong></td>`).join('')}
      </tr>
    </table>

    <div style="margin-top: 10px;">
      ${questions.map((q, idx) => `
        <div class="expl-item">
          <strong>Câu ${idx + 1} (${['A', 'B', 'C', 'D'][q.correctAnswer]}):</strong> ${q.explanation}
          ${q.textbookRef ? `<em style="color: #444;"> (${q.textbookRef})</em>` : ''}
        </div>
      `).join('')}
    </div>
  </div>
  ` : ''}
</body>
</html>`;
  };

  // 1. Direct Print via Dedicated Hidden Iframe
  const handlePrint = () => {
    try {
      const htmlContent = generateCleanExamHtml();
      
      const existingFrame = document.getElementById('exam-print-iframe');
      if (existingFrame) existingFrame.remove();

      const iframe = document.createElement('iframe');
      iframe.id = 'exam-print-iframe';
      iframe.style.position = 'fixed';
      iframe.style.right = '0';
      iframe.style.bottom = '0';
      iframe.style.width = '0';
      iframe.style.height = '0';
      iframe.style.border = '0';
      document.body.appendChild(iframe);

      const frameDoc = iframe.contentWindow?.document;
      if (!frameDoc) {
        window.focus();
        window.print();
        return;
      }

      frameDoc.open();
      frameDoc.write(htmlContent);
      frameDoc.close();

      setTimeout(() => {
        try {
          iframe.contentWindow?.focus();
          iframe.contentWindow?.print();
        } catch {
          window.focus();
          window.print();
        }
      }, 400);
    } catch {
      window.focus();
      window.print();
    }
  };

  // 2. Open standalone print window in new tab
  const handleOpenStandalone = () => {
    const htmlContent = generateCleanExamHtml();
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const win = window.open(url, '_blank');
    if (win) {
      win.focus();
    }
  };

  // 3. Export directly to Microsoft Word (.doc)
  const handleExportWord = () => {
    const htmlContent = generateCleanExamHtml();
    const blob = new Blob(['\ufeff' + htmlContent], {
      type: 'application/msword;charset=utf-8',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `De_Kiem_Tra_Tin_Hoc_6_${new Date().toISOString().slice(0, 10)}.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[94vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200">
        
        {/* Modal Toolbar (no-print) */}
        <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50 flex flex-wrap items-center justify-between gap-3 no-print">
          <div>
            <h3 className="font-bold text-slate-900 text-base sm:text-lg flex items-center gap-2">
              <Printer className="w-5 h-5 text-indigo-600" />
              Xem Trước & In Đề Thi (A4 / PDF)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Đề thi chuẩn {questions.length} câu • Tác giả: GV: CÔ RA AI
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Options checkboxes */}
            <label className="flex items-center gap-1.5 text-xs text-slate-700 cursor-pointer select-none font-medium px-2 py-1 rounded-lg hover:bg-slate-200/60">
              <input
                type="checkbox"
                checked={includeAnswerKey}
                onChange={(e) => setIncludeAnswerKey(e.target.checked)}
                className="rounded text-indigo-600 focus:ring-indigo-500"
              />
              <span>In kèm đáp án</span>
            </label>

            <label className="flex items-center gap-1.5 text-xs text-slate-700 cursor-pointer select-none font-medium px-2 py-1 rounded-lg hover:bg-slate-200/60">
              <input
                type="checkbox"
                checked={includeBubbleSheet}
                onChange={(e) => setIncludeBubbleSheet(e.target.checked)}
                className="rounded text-indigo-600 focus:ring-indigo-500"
              />
              <span>Bảng tô A-B-C-D</span>
            </label>

            {/* Action 1: Print / Save PDF */}
            <button
              type="button"
              onClick={handlePrint}
              className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Kích hoạt hộp thoại in / Lưu PDF của trình duyệt"
            >
              <Printer className="w-4 h-4" />
              <span>In Ngay / Lưu PDF</span>
            </button>

            {/* Action 2: Export Word document (.doc) */}
            <button
              type="button"
              onClick={handleExportWord}
              className="px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Tải về file Microsoft Word để in hoặc chỉnh sửa tùy ý"
            >
              <Download className="w-4 h-4" />
              <span>{downloadSuccess ? '✓ Đã tải Word' : 'Tải File Word (.doc)'}</span>
            </button>

            {/* Action 3: Open in new tab */}
            <button
              type="button"
              onClick={handleOpenStandalone}
              className="p-2 text-slate-600 hover:text-indigo-600 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors cursor-pointer"
              title="Mở đề thi trên tab mới độc lập để in dễ dàng"
            >
              <ExternalLink className="w-4 h-4" />
            </button>

            {/* Close modal */}
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-200 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tip helper banner */}
        <div className="bg-amber-50/90 border-b border-amber-200/80 px-5 py-2 text-xs text-amber-900 flex items-center justify-between no-print">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              <strong>Gợi ý:</strong> Phiếu trả lời trắc nghiệm đã được định dạng dạng bảng với 4 ô <strong>A, B, C, D</strong> riêng biệt cho từng câu. Bạn có thể bấm <strong>"In Ngay / Lưu PDF"</strong> hoặc <strong>"Tải File Word (.doc)"</strong>!
            </span>
          </div>
        </div>

        {/* Printable Paper Area (Simulates A4 sheet) */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 bg-white font-serif text-black leading-relaxed space-y-6">
          
          {/* Header */}
          <div className="border-b-2 border-black pb-4">
            <div className="flex justify-between items-start text-xs sm:text-sm">
              <div className="w-1/2 space-y-1">
                <p className="font-bold uppercase tracking-wider">{schoolName}</p>
                <p>Họ và tên học sinh: ..............................................................</p>
                <p>Lớp: 6......... &nbsp;&nbsp;&nbsp;&nbsp; Số báo danh: ....................</p>
              </div>

              <div className="w-1/2 text-right space-y-1">
                <p className="font-bold uppercase text-sm sm:text-base">{examTitle}</p>
                <p className="italic text-xs">{timeText}</p>
                <div className="inline-block border border-black px-4 py-1 mt-1 text-center font-bold">
                  Mã đề thi: TH6-01
                </div>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-2 border border-black text-center text-xs divide-x divide-black">
              <div className="py-2">
                <span className="font-bold block">ĐIỂM SỐ</span>
              </div>
              <div className="py-2">
                <span className="font-bold block">LỜI PHÊ CỦA THẦY/CÔ GIÁO</span>
              </div>
            </div>
          </div>

          {/* New Structured Table for Bubble Sheet (4 separate cells for A, B, C, D) */}
          {includeBubbleSheet && (
            <div className="border-2 border-black rounded-lg p-3 sm:p-4 bg-slate-50/50 print-break-inside-avoid">
              <p className="font-bold text-center uppercase text-xs sm:text-sm tracking-wide mb-3">
                PHIẾU TRẢ LỜI TRẮC NGHIỆM (HỌC SINH TÔ ĐEN VÀO 1 Ô PHƯƠNG ÁN CHỌN)
              </p>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-center text-xs">
                  <thead>
                    <tr className="bg-slate-200/80 text-slate-800">
                      {Array.from({ length: numColumns }).map((_, cIdx) => (
                        <React.Fragment key={cIdx}>
                          <th className="border border-black py-1.5 px-2 font-bold w-12 sm:w-14">
                            Câu
                          </th>
                          <th className="border border-black py-1.5 px-2 font-bold w-9 sm:w-10">
                            A
                          </th>
                          <th className="border border-black py-1.5 px-2 font-bold w-9 sm:w-10">
                            B
                          </th>
                          <th className="border border-black py-1.5 px-2 font-bold w-9 sm:w-10">
                            C
                          </th>
                          <th className="border border-black py-1.5 px-2 font-bold w-9 sm:w-10">
                            D
                          </th>
                          {cIdx < numColumns - 1 && (
                            <th className="w-3 border-none bg-transparent"></th>
                          )}
                        </React.Fragment>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {Array.from({ length: rowsCount }).map((_, r) => (
                      <tr key={r} className="hover:bg-slate-50/80 transition-colors">
                        {Array.from({ length: numColumns }).map((_, c) => {
                          const qIdx = c * rowsCount + r;
                          if (qIdx < questions.length) {
                            const selectedOpt = simulatedAnswers[qIdx];
                            return (
                              <React.Fragment key={c}>
                                {/* Question Number Cell */}
                                <td className="border border-black py-1.5 font-bold bg-slate-100/70 text-slate-900">
                                  {qIdx + 1}
                                </td>
                                
                                {/* Option A Cell */}
                                <td 
                                  onClick={() => toggleSimulatedBubble(qIdx, 0)}
                                  className="border border-black py-1 px-1 cursor-pointer hover:bg-indigo-50 transition-colors"
                                  title={`Chọn A cho Câu ${qIdx + 1}`}
                                >
                                  <div className={`w-5 h-5 sm:w-6 sm:h-6 mx-auto rounded-full border-2 border-black flex items-center justify-center font-bold text-[10px] sm:text-xs transition-all ${
                                    selectedOpt === 0 ? 'bg-black text-white' : 'bg-white text-black'
                                  }`}>
                                    A
                                  </div>
                                </td>

                                {/* Option B Cell */}
                                <td 
                                  onClick={() => toggleSimulatedBubble(qIdx, 1)}
                                  className="border border-black py-1 px-1 cursor-pointer hover:bg-indigo-50 transition-colors"
                                  title={`Chọn B cho Câu ${qIdx + 1}`}
                                >
                                  <div className={`w-5 h-5 sm:w-6 sm:h-6 mx-auto rounded-full border-2 border-black flex items-center justify-center font-bold text-[10px] sm:text-xs transition-all ${
                                    selectedOpt === 1 ? 'bg-black text-white' : 'bg-white text-black'
                                  }`}>
                                    B
                                  </div>
                                </td>

                                {/* Option C Cell */}
                                <td 
                                  onClick={() => toggleSimulatedBubble(qIdx, 2)}
                                  className="border border-black py-1 px-1 cursor-pointer hover:bg-indigo-50 transition-colors"
                                  title={`Chọn C cho Câu ${qIdx + 1}`}
                                >
                                  <div className={`w-5 h-5 sm:w-6 sm:h-6 mx-auto rounded-full border-2 border-black flex items-center justify-center font-bold text-[10px] sm:text-xs transition-all ${
                                    selectedOpt === 2 ? 'bg-black text-white' : 'bg-white text-black'
                                  }`}>
                                    C
                                  </div>
                                </td>

                                {/* Option D Cell */}
                                <td 
                                  onClick={() => toggleSimulatedBubble(qIdx, 3)}
                                  className="border border-black py-1 px-1 cursor-pointer hover:bg-indigo-50 transition-colors"
                                  title={`Chọn D cho Câu ${qIdx + 1}`}
                                >
                                  <div className={`w-5 h-5 sm:w-6 sm:h-6 mx-auto rounded-full border-2 border-black flex items-center justify-center font-bold text-[10px] sm:text-xs transition-all ${
                                    selectedOpt === 3 ? 'bg-black text-white' : 'bg-white text-black'
                                  }`}>
                                    D
                                  </div>
                                </td>

                                {c < numColumns - 1 && (
                                  <td className="border-none bg-transparent"></td>
                                )}
                              </React.Fragment>
                            );
                          } else {
                            return (
                              <React.Fragment key={c}>
                                <td className="border border-slate-200"></td>
                                <td className="border border-slate-200"></td>
                                <td className="border border-slate-200"></td>
                                <td className="border border-slate-200"></td>
                                <td className="border border-slate-200"></td>
                                {c < numColumns - 1 && (
                                  <td className="border-none bg-transparent"></td>
                                )}
                              </React.Fragment>
                            );
                          }
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Questions Body */}
          <div className="space-y-4">
            <p className="font-bold text-sm uppercase underline">
              PHẦN CÂU HỎI TRẮC NGHIỆM (GỒM {questions.length} CÂU)
            </p>

            {questions.map((q, idx) => (
              <div key={q.id} className="space-y-1.5 text-xs sm:text-sm print-break-inside-avoid">
                <p className="font-bold">
                  Câu {idx + 1}: <span className="font-normal font-sans">{q.question}</span>
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 pl-4 font-sans text-xs">
                  {q.options.map((opt, optIdx) => (
                    <div key={optIdx}>
                      <span className="font-bold">{['A', 'B', 'C', 'D'][optIdx]}.</span> {opt}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Answer Key & Explanations (if included) */}
          {includeAnswerKey && (
            <div className="pt-6 border-t-2 border-black space-y-4 text-xs print-break-inside-avoid">
              <p className="font-bold text-sm uppercase text-center">
                ĐÁP ÁN VÀ LỜI GIẢI THÍCH CHI TIẾT
              </p>

              <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 border border-black p-2 text-center font-mono">
                {questions.map((q, idx) => (
                  <div key={q.id} className="border-b border-slate-200 py-0.5">
                    <span className="text-slate-500">{idx + 1}:</span>{' '}
                    <strong className="text-indigo-900">{['A', 'B', 'C', 'D'][q.correctAnswer]}</strong>
                  </div>
                ))}
              </div>

              <div className="space-y-2 pt-2">
                {questions.map((q, idx) => (
                  <div key={q.id} className="text-[11px] leading-relaxed">
                    <strong>Câu {idx + 1} ({['A', 'B', 'C', 'D'][q.correctAnswer]}):</strong>{' '}
                    <span>{q.explanation}</span>
                    {q.textbookRef && (
                      <span className="text-slate-600 italic"> ({q.textbookRef})</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
