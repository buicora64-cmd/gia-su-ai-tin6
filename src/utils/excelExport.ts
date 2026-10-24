import * as XLSX from 'xlsx';
import { ScoreRecord } from '../types';

/**
 * Format rating based on score (scale of 10)
 */
export function getScoreRating(score: number): {
  label: string;
  badgeColor: string;
} {
  if (score >= 9.0) {
    return { label: 'Xuất sắc', badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300' };
  } else if (score >= 8.0) {
    return { label: 'Giỏi', badgeColor: 'bg-blue-100 text-blue-800 border-blue-300' };
  } else if (score >= 6.5) {
    return { label: 'Khá', badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300' };
  } else if (score >= 5.0) {
    return { label: 'Đạt', badgeColor: 'bg-amber-100 text-amber-800 border-amber-300' };
  } else {
    return { label: 'Chưa đạt', badgeColor: 'bg-rose-100 text-rose-800 border-rose-300' };
  }
}

/**
 * Format seconds to MM:SS
 */
export function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

/**
 * Export scores to professional Excel (.xlsx) file
 */
export function exportScoresToExcel(
  records: ScoreRecord[],
  fileName = `Bang_Diem_Tin_Hoc_6_${new Date().toISOString().slice(0, 10)}.xlsx`
): void {
  const formattedData = records.map((r, idx) => ({
    'STT': idx + 1,
    'Họ và tên học sinh': r.fullName || 'Học sinh',
    'Lớp': r.studentClass || '6A1',
    'Tên đăng nhập': r.username || 'Khách',
    'Điểm số (Thang 10)': Number(r.score.toFixed(1)),
    'Số câu đúng': r.correctCount,
    'Tổng số câu': r.totalQuestions,
    'Tỷ lệ đúng (%)': `${Math.round((r.correctCount / Math.max(1, r.totalQuestions)) * 100)}%`,
    'Xếp loại': r.rating,
    'Thời gian làm bài': r.formattedTime,
    'Bài kiểm tra / Chế độ': r.testTitle,
    'Hình thức': r.mode === 'exam' ? 'Kiểm tra tính giờ' : 'Luyện tập ôn tập',
    'Ngày giờ nộp bài': r.formattedDate,
  }));

  // Create worksheet
  const ws = XLSX.utils.json_to_sheet(formattedData);

  // Set friendly column widths
  ws['!cols'] = [
    { wch: 6 },  // STT
    { wch: 24 }, // Họ và tên
    { wch: 10 }, // Lớp
    { wch: 16 }, // Tên đăng nhập
    { wch: 18 }, // Điểm số
    { wch: 14 }, // Số câu đúng
    { wch: 14 }, // Tổng số câu
    { wch: 16 }, // Tỷ lệ đúng
    { wch: 14 }, // Xếp loại
    { wch: 18 }, // Thời gian làm bài
    { wch: 28 }, // Bài kiểm tra
    { wch: 20 }, // Hình thức
    { wch: 22 }, // Ngày giờ nộp bài
  ];

  // Create workbook
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sổ Điểm Tin Học 6');

  // Trigger browser download
  XLSX.writeFile(wb, fileName);
}

/**
 * Export scores to CSV format with UTF-8 BOM for perfect Excel compatibility
 */
export function exportScoresToCSV(
  records: ScoreRecord[],
  fileName = `Bang_Diem_Tin_Hoc_6_${new Date().toISOString().slice(0, 10)}.csv`
): void {
  const headers = [
    'STT',
    'Họ và tên học sinh',
    'Lớp',
    'Tên đăng nhập',
    'Điểm số (Thang 10)',
    'Số câu đúng',
    'Tổng số câu',
    'Tỷ lệ đúng (%)',
    'Xếp loại',
    'Thời gian làm bài',
    'Bài kiểm tra / Chế độ',
    'Hình thức',
    'Ngày giờ nộp bài'
  ];

  const escapeCsv = (val: any) => {
    const s = String(val ?? '').replace(/"/g, '""');
    return `"${s}"`;
  };

  const rows = records.map((r, idx) => [
    idx + 1,
    escapeCsv(r.fullName || 'Học sinh'),
    escapeCsv(r.studentClass || '6A1'),
    escapeCsv(r.username || 'Khách'),
    escapeCsv(r.score.toFixed(1)),
    r.correctCount,
    r.totalQuestions,
    escapeCsv(`${Math.round((r.correctCount / Math.max(1, r.totalQuestions)) * 100)}%`),
    escapeCsv(r.rating),
    escapeCsv(r.formattedTime),
    escapeCsv(r.testTitle),
    escapeCsv(r.mode === 'exam' ? 'Kiểm tra tính giờ' : 'Luyện tập ôn tập'),
    escapeCsv(r.formattedDate)
  ]);

  const csvContent = '\uFEFF' + [
    headers.map(escapeCsv).join(','),
    ...rows.map(row => row.join(','))
  ].join('\r\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
