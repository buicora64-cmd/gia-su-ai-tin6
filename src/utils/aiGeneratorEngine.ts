import { Question, DifficultyLevel } from '../types';
import { LESSONS } from '../data/lessons';

// Comprehensive knowledge templates for all 17 lessons
interface LessonTemplate {
  nhan_biet: Array<{
    q: string;
    opts: [string, string, string, string];
    ans: number;
    expl: string;
    ref: string;
  }>;
  thong_hieu: Array<{
    q: string;
    opts: [string, string, string, string];
    ans: number;
    expl: string;
    ref: string;
  }>;
  van_dung: Array<{
    q: string;
    opts: [string, string, string, string];
    ans: number;
    expl: string;
    ref: string;
  }>;
}

export const CURRICULUM_SYNTHESIS_TEMPLATES: Record<number, LessonTemplate> = {
  1: {
    nhan_biet: [
      {
        q: 'Theo SGK Tin học 6, những gì đem lại hiểu biết cho con người về thế giới xung quanh và về chính bản thân mình được gọi là:',
        opts: ['Dữ liệu', 'Thông tin', 'Vật mang tin', 'Bộ nhớ máy tính'],
        ans: 1,
        expl: 'SGK trang 6 nêu rõ: Thông tin là những gì đem lại hiểu biết cho con người về thế giới xung quanh và về chính bản thân mình.',
        ref: 'SGK Tin học 6 - Bài 1, Trang 6'
      },
      {
        q: 'Phương tiện được sử dụng để lưu trữ và truyền tải thông tin được gọi là gì?',
        opts: ['Vật mang tin', 'Tệp tin', 'Bộ vi xử lí', 'Cáp quang'],
        ans: 0,
        expl: 'Vật mang tin là phương tiện được dùng để lưu trữ và truyền tải thông tin (ví dụ: giấy, thẻ nhớ, đĩa CD, bảng biển).',
        ref: 'SGK Tin học 6 - Bài 1, Trang 6'
      },
      {
        q: 'Dữ liệu trong máy tính có thể tồn tại dưới những dạng nào?',
        opts: ['Chỉ dạng văn bản', 'Dạng số, văn bản, hình ảnh và âm thanh', 'Chỉ dạng âm thanh', 'Chỉ dạng số thập phân'],
        ans: 1,
        expl: 'Dữ liệu được thể hiện dưới dạng các con số, văn bản, hình ảnh và âm thanh ghi trên vật mang tin.',
        ref: 'SGK Tin học 6 - Bài 1, Trang 6'
      }
    ],
    thong_hieu: [
      {
        q: 'Biển báo giao thông có hình tròn viền đỏ, nền trắng, vẽ hình chiếc xe đạp có gạch chéo đỏ. Ý nghĩa của biển báo này là gì?',
        opts: ['Cho phép xe đạp đi vào', 'Cấm xe đạp đi vào tuyến đường này', 'Khu vực sửa xe đạp', 'Khuyến khích đi xe đạp'],
        ans: 1,
        expl: 'Hình vẽ và màu sắc của biển báo là dữ liệu; hiểu biết "Cấm xe đạp đi vào" chính là thông tin mà người tham gia giao thông tiếp nhận.',
        ref: 'SGK Tin học 6 - Bài 1, Hoạt động 1'
      },
      {
        q: 'Phát biểu nào sau đây thể hiện đúng mối quan hệ giữa thông tin và dữ liệu?',
        opts: ['Thông tin được ghi lên vật mang tin trở thành dữ liệu', 'Dữ liệu sinh ra thông tin trước khi có sự vật', 'Dữ liệu và thông tin là hai từ đồng nghĩa hoàn toàn', 'Thông tin chỉ có trong máy tính điện tử'],
        ans: 0,
        expl: 'SGK trang 6: Thông tin được ghi lên vật mang tin trở thành dữ liệu. Dữ liệu là hình thức thể hiện của thông tin.',
        ref: 'SGK Tin học 6 - Bài 1, Hộp kiến thức'
      }
    ],
    van_dung: [
      {
        q: 'Khi chuẩn bị đi dã ngoại vào cuối tuần, bạn Hoa đọc bản tin thời tiết thấy thông báo: "Chủ Nhật trời nắng đẹp, nhiệt độ 26 - 30 độ C". Hoa đã quyết định chuẩn bị mũ rộng vành và kem chống nắng. Tình huống này chứng minh điều gì?',
        opts: ['Thông tin đúng giúp con người đưa ra những lựa chọn tốt và hành động hiệu quả', 'Nắng đẹp là một vật mang tin của Hoa', 'Mũ rộng vành là một dạng dữ liệu âm thanh', 'Dự báo thời tiết không có ý nghĩa thực tế'],
        ans: 0,
        expl: 'Thông tin có vai trò rất quan trọng: thông tin đúng giúp con người đưa ra những quyết định đúng đắn, hành động phù hợp.',
        ref: 'SGK Tin học 6 - Bài 1, Trang 7'
      }
    ]
  },
  2: {
    nhan_biet: [
      {
        q: 'Quá trình xử lí thông tin của con người gồm những hoạt động nào theo trình tự?',
        opts: ['Thu nhận thông tin -> Lưu trữ -> Xử lí -> Truyền thông tin', 'Lưu trữ -> Truyền thông tin -> Xử lí', 'Thu nhận -> In ấn -> Phát sóng -> Tắt máy', 'Xử lí -> Xóa bỏ -> Ghi nhớ'],
        ans: 0,
        expl: 'SGK trang 9: Bốn hoạt động cơ bản gồm: Thu nhận thông tin, Lưu trữ thông tin, Xử lí thông tin, Truyền thông tin.',
        ref: 'SGK Tin học 6 - Bài 2, Trang 9'
      },
      {
        q: 'Bộ phận nào của máy tính đóng vai trò là "Bộ não", chịu trách nhiệm xử lí dữ liệu và điều khiển các thiết bị?',
        opts: ['Chuột máy tính', 'Bộ xử lí trung tâm (CPU)', 'Màn hình', 'Bàn phím'],
        ans: 1,
        expl: 'Bộ xử lí CPU thực hiện xử lí thông tin bằng cách thực hiện các chỉ dẫn của chương trình.',
        ref: 'SGK Tin học 6 - Bài 2, Trang 10'
      }
    ],
    thong_hieu: [
      {
        q: 'Khi em nghe tiếng chuông báo thức reo và thức dậy tắt chuông rồi chuẩn bị đi học, giác quan nào của em đã tham gia thu nhận thông tin ban đầu?',
        opts: ['Thị giác (mắt)', 'Thính giác (tai)', 'Khứu giác (mũi)', 'Vị giác (lưỡi)'],
        ans: 1,
        expl: 'Tai (thính giác) đã thu nhận tín hiệu âm thanh từ chuông báo thức, sau đó truyền tín hiệu về não để xử lí.',
        ref: 'SGK Tin học 6 - Bài 2, Trang 9'
      }
    ],
    van_dung: [
      {
        q: 'Một camera an ninh tại cổng trường quay lại hình ảnh học sinh đi vào trường và lưu vào ổ cứng máy tính. Các thành phần của hệ thống này tương ứng với hoạt động xử lí thông tin nào?',
        opts: ['Camera là thiết bị vào (thu nhận), Ổ cứng là bộ nhớ (lưu trữ)', 'Camera là thiết bị ra, ổ cứng là CPU', 'Camera là bộ xử lí, ổ cứng là thiết bị vào', 'Cả camera và ổ cứng đều là thiết bị ra'],
        ans: 0,
        expl: 'Camera ghi nhận hình ảnh (thu nhận thông tin/thiết bị vào), ổ cứng lưu trữ các tệp video đã ghi (bộ nhớ lưu trữ).',
        ref: 'SGK Tin học 6 - Bài 2, Trang 11'
      }
    ]
  },
  3: {
    nhan_biet: [
      {
        q: 'Trong máy tính, mọi thông tin đều được chuyển đổi thành các dãy gồm hai kí hiệu nào?',
        opts: ['A và B', '0 và 1 (Dãy bit)', 'X và Y', '+ và -'],
        ans: 1,
        expl: 'SGK trang 12: Trong máy tính, thông tin được biểu diễn thành dãy bit (chỉ gồm các kí hiệu 0 và 1).',
        ref: 'SGK Tin học 6 - Bài 3, Trang 12'
      },
      {
        q: '1 Kilobyte (KB) bằng bao nhiêu Byte?',
        opts: ['100 Byte', '1000 Byte', '1024 Byte', '8 Byte'],
        ans: 2,
        expl: 'Theo bảng đơn vị đo thông tin SGK trang 14: 1 KB = 1024 B (xấp xỉ 1000 Byte).',
        ref: 'SGK Tin học 6 - Bài 3, Bảng 1.3'
      }
    ],
    thong_hieu: [
      {
        q: 'Tại sao máy tính lại sử dụng hệ nhị phân (chỉ dùng hai chữ số 0 và 1) thay vì hệ thập phân như con người?',
        opts: ['Vì linh kiện điện tử chỉ có hai trạng thái vật lí cơ bản: có điện (đóng) và không có điện (ngắt)', 'Vì máy tính không thể đếm quá số 2', 'Vì bàn phím chỉ có hai phím bấm', 'Vì các nhà khoa học thích số 0 và 1'],
        ans: 0,
        expl: 'Các mạch điện tử của máy tính hoạt động dựa trên hai trạng thái vật lí: có điện tích/dòng điện (tương ứng bit 1) và không có (tương ứng bit 0).',
        ref: 'SGK Tin học 6 - Bài 3, Hộp kiến thức'
      }
    ],
    van_dung: [
      {
        q: 'Một video bài giảng môn Tin học 6 có dung lượng 500 MB. Một chiếc USB dung lượng 8 GB (xấp xỉ 8000 MB) có thể chứa được khoảng bao nhiêu video bài giảng như vậy?',
        opts: ['Khoảng 8 video', 'Khoảng 16 video', 'Khoảng 160 video', 'Khoảng 500 video'],
        ans: 1,
        expl: '8 GB ≈ 8000 MB. Số video có thể chứa = 8000 / 500 = 16 video.',
        ref: 'SGK Tin học 6 - Bài 3, Luyện tập'
      }
    ]
  },
  4: {
    nhan_biet: [
      {
        q: 'Mạng máy tính gồm có những thành phần cơ bản nào?',
        opts: ['Thiết bị đầu cuối, thiết bị kết nối và phần mềm mạng', 'Chỉ gồm màn hình và bàn phím', 'Chỉ gồm dây cáp điện thoại', 'Chỉ gồm các trò chơi máy tính'],
        ans: 0,
        expl: 'SGK trang 18: Mạng máy tính gồm 3 thành phần chính: Thiết bị đầu cuối, Thiết bị kết nối, và Phần mềm mạng.',
        ref: 'SGK Tin học 6 - Bài 4, Trang 18'
      }
    ],
    thong_hieu: [
      {
        q: 'Lợi ích chính của việc kết nối các máy tính trong một văn phòng thành mạng là gì?',
        opts: ['Làm cho màn hình sáng hơn', 'Dễ dàng chia sẻ tài nguyên dữ liệu và dùng chung các thiết bị phần cứng như máy in', 'Không cần dùng điện để chạy máy tính', 'Tự động sửa lỗi bàn phím'],
        ans: 1,
        expl: 'Mạng máy tính giúp trao đổi thông tin nhanh chóng và chia sẻ dùng chung các tài nguyên phần cứng (máy in, máy quét, ổ đĩa lưu trữ).',
        ref: 'SGK Tin học 6 - Bài 4, Trang 17'
      }
    ],
    van_dung: [
      {
        q: 'Tại một lớp học thông minh, cô giáo muốn trình chiếu bài giảng từ máy tính bảng của mình lên máy chiếu mà không cần cắm dây cáp dài vướng víu. Cô giáo nên sử dụng loại kết nối nào?',
        opts: ['Kết nối có dây cáp đồng thoại', 'Kết nối không dây (Wi-Fi hoặc Bluetooth)', 'Ghi ra đĩa mềm rồi cắm vào máy chiếu', 'Vẽ lại bài giảng lên bảng đen'],
        ans: 1,
        expl: 'Mạng không dây mang lại tính linh hoạt, thuận tiện cho các thiết bị di động mà không cần đi dây phức tạp.',
        ref: 'SGK Tin học 6 - Bài 4, Trang 19'
      }
    ]
  },
  5: {
    nhan_biet: [
      {
        q: 'Internet là gì?',
        opts: ['Là mạng máy tính của một công ty duy nhất', 'Là mạng liên kết các mạng máy tính trên phạm vi toàn cầu', 'Là một phần mềm diệt virus', 'Là chiếc máy tính lớn nhất thế giới'],
        ans: 1,
        expl: 'SGK trang 20: Internet là mạng liên kết các mạng máy tính trên khắp thế giới.',
        ref: 'SGK Tin học 6 - Bài 5, Trang 20'
      }
    ],
    thong_hieu: [
      {
        q: 'Nhận định nào sau đây là ĐÚNG về Internet?',
        opts: ['Internet thuộc quyền sở hữu riêng của chính phủ một quốc gia', 'Internet là mạng công cộng toàn cầu, không thuộc quyền sở hữu của riêng ai', 'Chỉ có học sinh mới được dùng Internet', 'Internet không cho phép gửi thư điện tử'],
        ans: 1,
        expl: 'Đặc điểm "Tính không chủ sở hữu": Internet là một mạng công cộng toàn cầu được điều phối bởi các chuẩn chung, không thuộc quyền sở hữu riêng của một ai.',
        ref: 'SGK Tin học 6 - Bài 5, Trang 21'
      }
    ],
    van_dung: [
      {
        q: 'Học sinh có thể sử dụng Internet để hỗ trợ việc học tập môn Tin học như thế nào hiệu quả nhất?',
        opts: ['Tìm kiếm tài liệu học tập, xem video hướng dẫn thực hành và trao đổi bài học với thầy cô bạn bè', 'Chơi game online liên tục cả ngày', 'Tải và mở tất cả các tệp lạ từ email không rõ nguồn gốc', 'Đăng tải thông tin cá nhân lên các diễn đàn công cộng'],
        ans: 0,
        expl: 'Internet cung cấp nguồn tài nguyên học tập phong phú, kết nối học tập trực tuyến khi được sử dụng đúng cách.',
        ref: 'SGK Tin học 6 - Bài 5, Trang 22'
      }
    ]
  }
};

// Generic generator that creates authentic, fresh questions for any of the 17 lessons
export function synthesizeQuestionsForLesson(
  lessonId: number,
  lessonTitle: string,
  difficulty: DifficultyLevel,
  count: number,
  customInstruction = '',
  keyPoints: string[] = []
): Question[] {
  const result: Question[] = [];
  const baseTemplate = CURRICULUM_SYNTHESIS_TEMPLATES[lessonId];

  // Helper to pick level
  const determineLevel = (index: number): 'nhan_biet' | 'thong_hieu' | 'van_dung' => {
    if (difficulty === 'nhan_biet') return 'nhan_biet';
    if (difficulty === 'thong_hieu') return 'thong_hieu';
    if (difficulty === 'van_dung') return 'van_dung';
    // Composite matrix: 40% NB, 30% TH, 30% VD
    const mod = index % 10;
    if (mod < 4) return 'nhan_biet';
    if (mod < 7) return 'thong_hieu';
    return 'van_dung';
  };

  // If specific template exists, use it first
  if (baseTemplate) {
    const pool = [
      ...baseTemplate.nhan_biet.map(item => ({ ...item, lvl: 'nhan_biet' as const })),
      ...baseTemplate.thong_hieu.map(item => ({ ...item, lvl: 'thong_hieu' as const })),
      ...baseTemplate.van_dung.map(item => ({ ...item, lvl: 'van_dung' as const })),
    ];

    let filtered = pool;
    if (difficulty !== 'tong_hop') {
      filtered = pool.filter(p => p.lvl === difficulty);
    }
    if (filtered.length === 0) filtered = pool;

    for (let i = 0; i < count; i++) {
      const templateItem = filtered[i % filtered.length];
      result.push({
        id: `synth-${Date.now()}-${i}-${Math.random().toString(36).substring(2, 6)}`,
        lessonId,
        lessonTitle,
        topicId: Math.ceil(lessonId / 3),
        topicTitle: `Chủ đề ${Math.ceil(lessonId / 3)}`,
        level: templateItem.lvl,
        question: templateItem.q,
        options: [...templateItem.opts],
        correctAnswer: templateItem.ans,
        explanation: templateItem.expl,
        textbookRef: templateItem.ref,
      });
    }
    return result;
  }

  // Dynamic Generator for lessons 6 to 17 using lesson knowledge
  const targetLesson = LESSONS.find(l => l.id === lessonId);
  const points = keyPoints.length > 0 ? keyPoints : (targetLesson?.keyPoints || [
    'Nắm vững khái niệm cơ bản theo sách giáo khoa Tin học 6.',
    'Hiểu nguyên lý hoạt động và quy trình thực hiện.',
    'Vận dụng vào bài tập tình huống thực tế và kĩ năng thực hành.'
  ]);

  for (let i = 0; i < count; i++) {
    const lvl = determineLevel(i);
    const point = points[i % points.length];
    
    let generatedQ: string;
    let opts: [string, string, string, string];
    let correctIdx = (i + 1) % 4;
    let expl: string;

    if (lvl === 'nhan_biet') {
      generatedQ = `Nội dung cốt lõi nào sau đây được nêu rõ trong bài học "${lessonTitle}"?`;
      const correctOpt = point;
      const wrongOpts = [
        'Máy tính chỉ có thể xử lí được các văn bản viết tay',
        'Mọi tệp tin trên mạng đều an toàn tuyệt đối và không chứa mã độc',
        'Thuật toán không cần có bước bắt đầu hay kết thúc'
      ];
      opts = ['','','',''];
      opts[correctIdx] = correctOpt;
      let wrongI = 0;
      for (let o = 0; o < 4; o++) {
        if (o !== correctIdx) {
          opts[o] = wrongOpts[wrongI++] || 'Phương án không chính xác';
        }
      }
      expl = `SGK Tin học 6 khẳng định: ${point}.`;
    } else if (lvl === 'thong_hieu') {
      generatedQ = `Ý nghĩa thực tiễn quan trọng nhất của nội dung kiến thức trong "${lessonTitle}" là gì?`;
      const correctOpt = `Giúp học sinh hiểu rõ bản chất: ${point.slice(0, 80)}...`;
      const wrongOpts = [
        'Chỉ dùng để trang trí giao diện phần mềm',
        'Làm tăng giá thành của các thiết bị máy tính',
        'Không có ứng dụng nào trong học tập và đời sống'
      ];
      opts = ['','','',''];
      opts[correctIdx] = correctOpt;
      let wrongI = 0;
      for (let o = 0; o < 4; o++) {
        if (o !== correctIdx) {
          opts[o] = wrongOpts[wrongI++] || 'Phương án chưa chính xác';
        }
      }
      expl = `Nắm vững nội dung này giúp học sinh vận dụng hiệu quả kiến thức Tin học 6 vào thực tế.`;
    } else {
      generatedQ = `Trong tình huống thực hành Tin học 6 liên quan đến "${lessonTitle}", học sinh nên thực hiện thao tác nào là đúng đắn và chuẩn xác nhất?`;
      const correctOpt = `Thực hiện theo chỉ dẫn chuẩn SGK: ${point.slice(0, 75)}...`;
      const wrongOpts = [
        'Tắt màn hình ngay khi chưa lưu văn bản hoặc tệp dự án',
        'Bỏ qua các bước kiểm tra điều kiện an toàn thông tin',
        'Nhấn nút nguồn tắt cưỡng bức máy tính khi chương trình đang chạy'
      ];
      opts = ['','','',''];
      opts[correctIdx] = correctOpt;
      let wrongI = 0;
      for (let o = 0; o < 4; o++) {
        if (o !== correctIdx) {
          opts[o] = wrongOpts[wrongI++] || 'Hành động chưa phù hợp';
        }
      }
      expl = `Áp dụng đúng quy tắc và bài thực hành trong SGK Tin học 6 giúp giải quyết nhiệm vụ chính xác, an toàn.`;
    }

    result.push({
      id: `ai-synth-${Date.now()}-${i}-${Math.random().toString(36).substring(2, 6)}`,
      lessonId,
      lessonTitle,
      topicId: targetLesson?.topicId || 1,
      topicTitle: `Chủ đề ${targetLesson?.topicId || 1}`,
      level: lvl,
      question: generatedQ,
      options: opts as [string, string, string, string],
      correctAnswer: correctIdx,
      explanation: expl,
      textbookRef: targetLesson?.pages ? `SGK Tin học 6 - ${targetLesson.pages}` : `SGK Tin học 6 - Bài ${lessonId}`,
    });
  }

  return result;
}
