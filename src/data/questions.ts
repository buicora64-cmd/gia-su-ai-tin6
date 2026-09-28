import { Question } from '../types';

export const INITIAL_QUESTIONS: Question[] = [
  // ===================== BÀI 1: THÔNG TIN VÀ DỮ LIỆU =====================
  {
    id: 'b1-nb-1',
    lessonId: 1,
    lessonTitle: 'Bài 1. Thông tin và dữ liệu',
    topicId: 1,
    topicTitle: 'Chủ đề 1. Máy tính và cộng đồng',
    level: 'nhan_biet',
    question: 'Thông tin là gì theo định nghĩa trong Sách giáo khoa Tin học 6?',
    options: [
      'Là các con số và văn bản được lưu trong máy tính',
      'Là những gì đem lại hiểu biết cho con người về thế giới xung quanh và về chính bản thân mình',
      'Là toàn bộ các bài viết trên mạng Internet',
      'Là hình ảnh và âm thanh thu nhận được từ tivi'
    ],
    correctAnswer: 1,
    explanation: 'SGK trang 6 khẳng định: "Thông tin là những gì đem lại hiểu biết cho con người về thế giới xung quanh và về chính bản thân mình".',
    textbookRef: 'SGK Tin học 6 - Trang 6, Hộp kiến thức'
  },
  {
    id: 'b1-nb-2',
    lessonId: 1,
    lessonTitle: 'Bài 1. Thông tin và dữ liệu',
    topicId: 1,
    topicTitle: 'Chủ đề 1. Máy tính và cộng đồng',
    level: 'nhan_biet',
    question: 'Thông tin được ghi lên vật mang tin trở thành:',
    options: [
      'Bộ nhớ máy tính',
      'Dữ liệu',
      'Phần mềm',
      'Mạng truyền thông'
    ],
    correctAnswer: 1,
    explanation: 'SGK trang 6 nêu rõ: "Thông tin được ghi lên vật mang tin trở thành dữ liệu. Dữ liệu được thể hiện dưới dạng các con số, văn bản, hình ảnh và âm thanh".',
    textbookRef: 'SGK Tin học 6 - Trang 6, Hộp kiến thức'
  },
  {
    id: 'b1-th-1',
    lessonId: 1,
    lessonTitle: 'Bài 1. Thông tin và dữ liệu',
    topicId: 1,
    topicTitle: 'Chủ đề 1. Máy tính và cộng đồng',
    level: 'thong_hieu',
    question: 'Tấm biển quảng cáo ghi: "Giá vé đi ra Đảo Cò là 40 000 đồng, hành trình mất 35 phút bằng xuồng máy". Vật mang tin ở đây là gì?',
    options: [
      'Số 40 000 đồng và 35 phút',
      'Chiếc xuồng máy',
      'Tấm biển gỗ/bảng thông tin',
      'Thời gian đi ra đảo Cò'
    ],
    correctAnswer: 2,
    explanation: 'Chữ và số trên tấm bảng là dữ liệu; hiểu biết về giá vé và thời gian là thông tin; còn tấm bảng chính là vật mang tin (phương tiện lưu trữ và truyền tải dữ liệu).',
    textbookRef: 'SGK Tin học 6 - Trang 6, Ví dụ Đảo Cò'
  },
  {
    id: 'b1-th-2',
    lessonId: 1,
    lessonTitle: 'Bài 1. Thông tin và dữ liệu',
    topicId: 1,
    topicTitle: 'Chủ đề 1. Máy tính và cộng đồng',
    level: 'thong_hieu',
    question: 'Khi nhìn thấy đèn tín hiệu giao thông chuyển sang màu đỏ, người đi đường dừng lại. Nhận định nào sau đây là đúng?',
    options: [
      'Đèn giao thông chuyển màu đỏ là vật mang tin, hiểu biết "phải dừng lại" là thông tin',
      'Đèn giao thông là thông tin, màu đỏ là dữ liệu',
      'Hành động dừng lại là vật mang tin',
      'Màu đỏ của đèn là bộ xử lí thông tin'
    ],
    correctAnswer: 0,
    explanation: 'SGK trang 5 (Hoạt động 1): Minh thấy đèn giao thông đổi sang màu đỏ (vật mang tin phát tín hiệu màu), Minh biết phải dừng xe lại (thông tin).',
    textbookRef: 'SGK Tin học 6 - Trang 5, Hoạt động 1'
  },
  {
    id: 'b1-vd-1',
    lessonId: 1,
    lessonTitle: 'Bài 1. Thông tin và dữ liệu',
    topicId: 1,
    topicTitle: 'Chủ đề 1. Máy tính và cộng đồng',
    level: 'van_dung',
    question: 'Bản tin dự báo thời tiết thông báo: "Hà Nội ngày mai có mưa rào và dông rải rác, nhiệt độ giảm còn 19 độ C". Bạn Khoa đã mang theo áo mưa và mặc thêm áo khoác khi đi học. Tình huống này thể hiện điều gì?',
    options: [
      'Thông tin không có vai trò gì đối với hành động của con người',
      'Thông tin đúng giúp con người đưa ra những quyết định và lựa chọn phù hợp, hiệu quả',
      'Mưa rào là vật mang tin lưu trữ áo mưa',
      'Nhiệt độ 19 độ C là bộ xử lí của Khoa'
    ],
    correctAnswer: 1,
    explanation: 'SGK trang 6: "Thông tin đúng giúp con người đưa ra những lựa chọn tốt, giúp cho hoạt động của con người đạt hiệu quả".',
    textbookRef: 'SGK Tin học 6 - Trang 6 & 7'
  },

  // ===================== BÀI 2: XỬ LÍ THÔNG TIN =====================
  {
    id: 'b2-nb-1',
    lessonId: 2,
    lessonTitle: 'Bài 2. Xử lí thông tin',
    topicId: 1,
    topicTitle: 'Chủ đề 1. Máy tính và cộng đồng',
    level: 'nhan_biet',
    question: 'Quá trình xử lí thông tin của con người gồm những hoạt động cơ bản nào?',
    options: [
      'Khởi động, tính toán, in ấn, tắt máy',
      'Thu nhận thông tin, Lưu trữ thông tin, Xử lí thông tin, Truyền thông tin',
      'Gõ văn bản, vẽ hình ảnh, nghe nhạc, chơi game',
      'Đọc sách, nghe giảng, làm bài tập, đi ngủ'
    ],
    correctAnswer: 1,
    explanation: 'SGK trang 9: Các hoạt động xử lí thông tin bao gồm: Thu nhận thông tin, Lưu trữ thông tin, Xử lí thông tin, Truyền thông tin.',
    textbookRef: 'SGK Tin học 6 - Trang 9, Hộp kiến thức'
  },
  {
    id: 'b2-nb-2',
    lessonId: 2,
    lessonTitle: 'Bài 2. Xử lí thông tin',
    topicId: 1,
    topicTitle: 'Chủ đề 1. Máy tính và cộng đồng',
    level: 'nhan_biet',
    question: 'Máy tính gồm mấy thành phần chính để thực hiện các hoạt động xử lí thông tin?',
    options: [
      '3 thành phần',
      '4 thành phần (Thiết bị vào, Bộ nhớ, Bộ xử lí CPU, Thiết bị ra)',
      '5 thành phần',
      '6 thành phần'
    ],
    correctAnswer: 1,
    explanation: 'SGK trang 10 & 11: Máy tính có đủ 4 thành phần: Thiết bị vào (thu nhận), Bộ nhớ (lưu trữ), Bộ xử lí CPU (xử lí), Thiết bị ra (truyền/chia sẻ).',
    textbookRef: 'SGK Tin học 6 - Trang 10-11, Hình 1.2'
  },
  {
    id: 'b2-th-1',
    lessonId: 2,
    lessonTitle: 'Bài 2. Xử lí thông tin',
    topicId: 1,
    topicTitle: 'Chủ đề 1. Máy tính và cộng đồng',
    level: 'thong_hieu',
    question: 'Việc "Em chép các bài học trên bảng vào vở ghi" thuộc hoạt động nào trong quá trình xử lí thông tin?',
    options: [
      'Hoạt động Xử lí thông tin',
      'Hoạt động Lưu trữ thông tin',
      'Hoạt động Khởi động hệ điều hành',
      'Hoạt động Lập trình Scratch'
    ],
    correctAnswer: 1,
    explanation: 'SGK trang 9 & 10 (Câu hỏi 2): Chép bài vào vở là việc chuyển thông tin lưu vào trang giấy (vật mang tin) để không bị quên, thuộc hoạt động lưu trữ thông tin.',
    textbookRef: 'SGK Tin học 6 - Trang 9, Câu hỏi 2c'
  },
  {
    id: 'b2-th-2',
    lessonId: 2,
    lessonTitle: 'Bài 2. Xử lí thông tin',
    topicId: 1,
    topicTitle: 'Chủ đề 1. Máy tính và cộng đồng',
    level: 'thong_hieu',
    question: 'Thiết bị nào sau đây vừa là thiết bị lưu trữ thông tin của máy tính?',
    options: [
      'Chuột máy tính và bàn phím',
      'Màn hình và máy in',
      'Đĩa cứng, thẻ nhớ, đĩa quang (CD/DVD)',
      'Loa và tai nghe'
    ],
    correctAnswer: 2,
    explanation: 'SGK trang 10 & 11: Đĩa cứng, thẻ nhớ, đĩa quang là các bộ nhớ lưu trữ thông tin của máy tính.',
    textbookRef: 'SGK Tin học 6 - Trang 10'
  },
  {
    id: 'b2-vd-1',
    lessonId: 2,
    lessonTitle: 'Bài 2. Xử lí thông tin',
    topicId: 1,
    topicTitle: 'Chủ đề 1. Máy tính và cộng đồng',
    level: 'van_dung',
    question: 'Khi thủ môn đứng trước quả phạt đền 11m: Mắt quan sát hướng sút của cầu thủ đối phương -> Não phân tích phán đoán góc sút -> Não điều khiển cơ thể bay người cản phá bóng. Hoạt động "não phân tích và phán đoán" tương ứng với thành phần nào trong máy tính?',
    options: [
      'Bàn phím nhập liệu',
      'Màn hình hiển thị',
      'Bộ xử lí (CPU)',
      'Thẻ nhớ SD'
    ],
    correctAnswer: 2,
    explanation: 'SGK trang 8 & 10: Hoạt động phân tích, suy luận và ra quyết định của bộ não con người tương ứng với chức năng xử lí thông tin của Bộ xử lí (CPU) trong máy tính.',
    textbookRef: 'SGK Tin học 6 - Trang 8 & 10'
  },

  // ===================== BÀI 3: THÔNG TIN TRONG MÁY TÍNH =====================
  {
    id: 'b3-nb-1',
    lessonId: 3,
    lessonTitle: 'Bài 3. Thông tin trong máy tính',
    topicId: 1,
    topicTitle: 'Chủ đề 1. Máy tính và cộng đồng',
    level: 'nhan_biet',
    question: 'Đơn vị đo nhỏ nhất trong lưu trữ thông tin là gì?',
    options: [
      'Byte (B)',
      'Bit (viết tắt của Binary digiT)',
      'Kilobyte (KB)',
      'Hertz (Hz)'
    ],
    correctAnswer: 1,
    explanation: 'SGK trang 14: "Bit là đơn vị đo nhỏ nhất trong lưu trữ thông tin. Mỗi bit chỉ là một kí hiệu 0 hoặc 1".',
    textbookRef: 'SGK Tin học 6 - Trang 14, Hộp kiến thức'
  },
  {
    id: 'b3-nb-2',
    lessonId: 3,
    lessonTitle: 'Bài 3. Thông tin trong máy tính',
    topicId: 1,
    topicTitle: 'Chủ đề 1. Máy tính và cộng đồng',
    level: 'nhan_biet',
    question: 'Một Byte (B) bằng bao nhiêu bit?',
    options: [
      '2 bit',
      '4 bit',
      '8 bit',
      '1024 bit'
    ],
    correctAnswer: 2,
    explanation: 'SGK trang 14: 1 Byte là dãy gồm 8 bit liên tục.',
    textbookRef: 'SGK Tin học 6 - Trang 14, Bảng 1.3'
  },
  {
    id: 'b3-th-1',
    lessonId: 3,
    lessonTitle: 'Bài 3. Thông tin trong máy tính',
    topicId: 1,
    topicTitle: 'Chủ đề 1. Máy tính và cộng đồng',
    level: 'thong_hieu',
    question: 'Sắp xếp các đơn vị đo thông tin sau theo thứ tự từ nhỏ đến lớn:',
    options: [
      'Bit < Byte < Megabyte (MB) < Kilobyte (KB) < Gigabyte (GB)',
      'Bit < Byte < Kilobyte (KB) < Megabyte (MB) < Gigabyte (GB) < Terabyte (TB)',
      'Byte < Bit < Gigabyte (GB) < Megabyte (MB)',
      'Terabyte (TB) < Gigabyte (GB) < Megabyte (MB) < Byte'
    ],
    correctAnswer: 1,
    explanation: 'SGK trang 14, Bảng 1.3: Thứ tự đúng: Byte < KB (1024 B) < MB (1024 KB) < GB (1024 MB) < TB (1024 GB).',
    textbookRef: 'SGK Tin học 6 - Trang 14, Bảng 1.3'
  },
  {
    id: 'b3-th-2',
    lessonId: 3,
    lessonTitle: 'Bài 3. Thông tin trong máy tính',
    topicId: 1,
    topicTitle: 'Chủ đề 1. Máy tính và cộng đồng',
    level: 'thong_hieu',
    question: 'Trong máy tính, hình ảnh đen trắng được biểu diễn thành dãy bit bằng cách nào?',
    options: [
      'Ghi âm âm thanh của bức ảnh',
      'Chia ảnh thành lưới các điểm ảnh (pixel), quy ước điểm đen là 1, điểm trắng là 0',
      'Chụp ảnh bằng máy quét màu',
      'Chuyển chữ cái trong ảnh thành bảng chữ cái tiếng Anh'
    ],
    correctAnswer: 1,
    explanation: 'SGK trang 13, Hình 1.4: Lưới điểm ảnh, mỗi ô là 1 pixel; tô đen quy ước là 1, màu trắng là 0 tạo thành các dãy bit tương ứng.',
    textbookRef: 'SGK Tin học 6 - Trang 13, Hình 1.4'
  },
  {
    id: 'b3-vd-1',
    lessonId: 3,
    lessonTitle: 'Bài 3. Thông tin trong máy tính',
    topicId: 1,
    topicTitle: 'Chủ đề 1. Máy tính và cộng đồng',
    level: 'van_dung',
    question: 'Một bức ảnh kĩ thuật số có dung lượng khoảng 12 MB. Một thẻ nhớ có dung lượng 16 GB (xấp xỉ 16 000 MB) có thể lưu trữ được khoảng bao nhiêu bức ảnh như vậy?',
    options: [
      'Khoảng 130 bức ảnh',
      'Khoảng 1 333 bức ảnh',
      'Khoảng 13 333 bức ảnh',
      'Khoảng 160 bức ảnh'
    ],
    correctAnswer: 1,
    explanation: 'SGK trang 15 (Luyện tập 2): 16 GB ≈ 16 000 MB. Số ảnh có thể chứa = 16 000 / 12 ≈ 1 333 bức ảnh.',
    textbookRef: 'SGK Tin học 6 - Trang 15, Luyện tập 2'
  },

  // ===================== BÀI 4: MẠNG MÁY TÍNH =====================
  {
    id: 'b4-nb-1',
    lessonId: 4,
    lessonTitle: 'Bài 4. Mạng máy tính',
    topicId: 2,
    topicTitle: 'Chủ đề 2. Mạng máy tính và Internet',
    level: 'nhan_biet',
    question: 'Mạng máy tính là gì?',
    options: [
      'Là phần mềm chạy trò chơi nhiều người tham gia',
      'Hai hay nhiều máy tính và các thiết bị được kết nối để truyền thông tin cho nhau',
      'Là màn hình máy tính có kết nối với loa và tai nghe',
      'Là chiếc máy tính có cấu hình cực mạnh'
    ],
    correctAnswer: 1,
    explanation: 'SGK trang 17: "Hai hay nhiều máy tính và các thiết bị được kết nối để truyền thông tin cho nhau tạo thành một mạng máy tính".',
    textbookRef: 'SGK Tin học 6 - Trang 17, Hộp kiến thức'
  },
  {
    id: 'b4-nb-2',
    lessonId: 4,
    lessonTitle: 'Bài 4. Mạng máy tính',
    topicId: 2,
    topicTitle: 'Chủ đề 2. Mạng máy tính và Internet',
    level: 'nhan_biet',
    question: 'Thiết bị nào sau đây KHÔNG phải là thiết bị kết nối mạng máy tính?',
    options: [
      'Bộ chuyển mạch (Switch)',
      'Bộ định tuyến không dây (Wireless Router)',
      'Máy in văn phòng',
      'Đường truyền cáp mạng'
    ],
    correctAnswer: 2,
    explanation: 'SGK trang 18: Máy in là "thiết bị đầu cuối" (giống như máy tính, điện thoại), không phải thiết bị kết nối mạng (như Switch, Router, Hub).',
    textbookRef: 'SGK Tin học 6 - Trang 18, Hình 2.1'
  },
  {
    id: 'b4-th-1',
    lessonId: 4,
    lessonTitle: 'Bài 4. Mạng máy tính',
    topicId: 2,
    topicTitle: 'Chủ đề 2. Mạng máy tính và Internet',
    level: 'thong_hieu',
    question: 'Một phòng làm việc có 10 máy tính nhưng chỉ có 1 chiếc máy in. Làm thế nào để tất cả các máy tính đều in được tài liệu mà không cần cắm rút dây USB qua lại?',
    options: [
      'Mua thêm 9 chiếc máy in nữa cho từng người',
      'Kết nối tất cả 10 máy tính và máy in vào mạng nội bộ để chia sẻ dùng chung máy in',
      'Copy tài liệu vào điện thoại rồi ra tiệm photocopy',
      'Vẽ lại tài liệu bằng tay lên giấy'
    ],
    correctAnswer: 1,
    explanation: 'SGK trang 17: Lợi ích của mạng máy tính là cho phép chia sẻ dữ liệu và dùng chung các thiết bị phần cứng như máy in, máy quét.',
    textbookRef: 'SGK Tin học 6 - Trang 17'
  },
  {
    id: 'b4-vd-1',
    lessonId: 4,
    lessonTitle: 'Bài 4. Mạng máy tính',
    topicId: 2,
    topicTitle: 'Chủ đề 2. Mạng máy tính và Internet',
    level: 'van_dung',
    question: 'Tại sao tại các sân bay, nhà ga, quán cà phê hoặc trên xe khách đường dài, người ta ưu tiên sử dụng mạng không dây (Wi-Fi) thay vì mạng có dây cáp?',
    options: [
      'Vì sóng Wi-Fi có màu sắc đẹp mắt',
      'Vì mạng không dây giúp các thiết bị di động kết nối thuận tiện, linh hoạt di chuyển mà không cần khoan đục tường kéo dây',
      'Vì dây cáp mạng luôn làm hỏng pin máy tính xách tay',
      'Vì mạng có dây không thể gửi ảnh được'
    ],
    correctAnswer: 1,
    explanation: 'SGK trang 19: Kết nối không dây rất thuận tiện cho thiết bị di động (laptop, smartphone), không cần kéo dây, khoan tường, người dùng có thể di chuyển thoải mái.',
    textbookRef: 'SGK Tin học 6 - Trang 19'
  },

  // ===================== BÀI 5: INTERNET =====================
  {
    id: 'b5-nb-1',
    lessonId: 5,
    lessonTitle: 'Bài 5. Internet',
    topicId: 2,
    topicTitle: 'Chủ đề 2. Mạng máy tính và Internet',
    level: 'nhan_biet',
    question: 'Internet là gì?',
    options: [
      'Là mạng kết nối nội bộ của một trường học',
      'Là mạng liên kết các mạng máy tính trên khắp thế giới',
      'Là một phần mềm trò chuyện trực tuyến',
      'Là chiếc máy tính trung tâm đặt tại Hà Nội'
    ],
    correctAnswer: 1,
    explanation: 'SGK trang 20: "Internet là mạng liên kết các mạng máy tính trên khắp thế giới".',
    textbookRef: 'SGK Tin học 6 - Trang 20, Hộp kiến thức'
  },
  {
    id: 'b5-th-1',
    lessonId: 5,
    lessonTitle: 'Bài 5. Internet',
    topicId: 2,
    topicTitle: 'Chủ đề 2. Mạng máy tính và Internet',
    level: 'thong_hieu',
    question: 'Đặc điểm nào sau đây KHÔNG phải là đặc điểm của Internet?',
    options: [
      'Tính toàn cầu và tính tương tác',
      'Thuộc quyền sở hữu riêng của một công ty duy nhất trên thế giới',
      'Tính dễ tiếp cận và tính đa dạng',
      'Tính cập nhật thường xuyên'
    ],
    correctAnswer: 1,
    explanation: 'SGK trang 21: Internet có đặc điểm "Tính không chủ sở hữu" - Internet là một mạng máy tính công cộng toàn cầu, không thuộc sở hữu của bất kì cá nhân hay tổ chức nào điều hành riêng biệt.',
    textbookRef: 'SGK Tin học 6 - Trang 21, Mục 2'
  },
  {
    id: 'b5-vd-1',
    lessonId: 5,
    lessonTitle: 'Bài 5. Internet',
    topicId: 2,
    topicTitle: 'Chủ đề 2. Mạng máy tính và Internet',
    level: 'van_dung',
    question: 'Bạn An ở Hà Nội muốn gửi lời chúc mừng sinh nhật kèm video bài hát cho bạn thân đang sống tại Nhật Bản ngay tức thì. Công cụ nào sau đây là giải pháp nhanh chóng và tiết kiệm nhất?',
    options: [
      'Gửi thư bưu điện chuyển phát nhanh đường hàng không',
      'Sử dụng dịch vụ Internet (như thư điện tử hoặc ứng dụng nhắn tin gọi video qua mạng)',
      'Đi máy bay sang Nhật Bản để nói trực tiếp',
      'Ghi video vào đĩa CD rồi gửi qua bưu điện'
    ],
    correctAnswer: 1,
    explanation: 'SGK trang 22: Lợi ích của Internet là trao đổi thông tin nhanh chóng, kịp thời trên phạm vi toàn cầu với chi phí rất thấp.',
    textbookRef: 'SGK Tin học 6 - Trang 22'
  },

  // ===================== BÀI 6: MẠNG THÔNG TIN TOÀN CẦU (WWW) =====================
  {
    id: 'b6-nb-1',
    lessonId: 6,
    lessonTitle: 'Bài 6. Mạng thông tin toàn cầu',
    topicId: 3,
    topicTitle: 'Chủ đề 3. Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin',
    level: 'nhan_biet',
    question: 'Trang web đầu tiên được mở ra khi người dùng truy cập một website được gọi là:',
    options: [
      'Trang con',
      'Trang liên kết',
      'Trang chủ (Homepage)',
      'Trang siêu liên kết'
    ],
    correctAnswer: 2,
    explanation: 'SGK trang 24: "Trang chủ (homepage) của website là trang được mở ra đầu tiên khi truy cập website đó".',
    textbookRef: 'SGK Tin học 6 - Trang 24'
  },
  {
    id: 'b6-nb-2',
    lessonId: 6,
    lessonTitle: 'Bài 6. Mạng thông tin toàn cầu',
    topicId: 3,
    topicTitle: 'Chủ đề 3. Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin',
    level: 'nhan_biet',
    question: 'Phần mềm nào sau đây là trình duyệt web (Web browser)?',
    options: [
      'Microsoft Word',
      'Google Chrome',
      'Paint',
      'Unikey'
    ],
    correctAnswer: 1,
    explanation: 'SGK trang 24: Một số trình duyệt web phổ biến là Google Chrome, Mozilla Firefox, Safari, Microsoft Edge, Cốc Cốc...',
    textbookRef: 'SGK Tin học 6 - Trang 24'
  },
  {
    id: 'b6-th-1',
    lessonId: 6,
    lessonTitle: 'Bài 6. Mạng thông tin toàn cầu',
    topicId: 3,
    topicTitle: 'Chủ đề 3. Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin',
    level: 'thong_hieu',
    question: 'Trang siêu văn bản (Hypertext) khác văn bản thông thường ở điểm nổi bật nào?',
    options: [
      'Chỉ gồm toàn các con số',
      'Tích hợp nhiều dạng dữ liệu (văn bản, hình ảnh, âm thanh, video) và chứa các liên kết trỏ đến vị trí khác',
      'Không thể đọc được bằng mắt thường',
      'Chỉ in được trên giấy màu'
    ],
    correctAnswer: 1,
    explanation: 'SGK trang 23: Trang siêu văn bản là trang văn bản đặc biệt tích hợp nhiều dạng dữ liệu và các liên kết trỏ đến các trang web hoặc vị trí khác.',
    textbookRef: 'SGK Tin học 6 - Trang 23'
  },
  {
    id: 'b6-vd-1',
    lessonId: 6,
    lessonTitle: 'Bài 6. Mạng thông tin toàn cầu',
    topicId: 3,
    topicTitle: 'Chủ đề 3. Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin',
    level: 'van_dung',
    question: 'Khi di chuyển con trỏ chuột trên trang web, nếu con trỏ đổi hình từ mũi tên thành hình "bàn tay có ngón trỏ chỉ lên" thì vị trí đó là gì?',
    options: [
      'Một liên kết (hyperlink) dẫn đến một tài liệu hoặc trang web khác',
      'Vùng bị lỗi virus của trình duyệt',
      'Khu vực cấm nhấp chuột',
      'Nút tắt nguồn máy tính'
    ],
    correctAnswer: 0,
    explanation: 'SGK trang 24: Khi di chuyển con trỏ chuột vào liên kết, biểu tượng con trỏ chuột thường chuyển thành hình bàn tay.',
    textbookRef: 'SGK Tin học 6 - Trang 24'
  },

  // ===================== BÀI 7: TÌM KIẾM THÔNG TIN TRÊN INTERNET =====================
  {
    id: 'b7-nb-1',
    lessonId: 7,
    lessonTitle: 'Bài 7. Tìm kiếm thông tin trên Internet',
    topicId: 3,
    topicTitle: 'Chủ đề 3. Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin',
    level: 'nhan_biet',
    question: 'Máy tìm kiếm (Search engine) là gì?',
    options: [
      'Là một cỗ máy vật lí đặt ở viện bảo tàng',
      'Là website đặc biệt giúp người sử dụng tìm kiếm thông tin trên Internet thông qua từ khoá',
      'Là phần mềm quét dọn rác ổ cứng',
      'Là trình chiếu PowerPoint'
    ],
    correctAnswer: 1,
    explanation: 'SGK trang 28: Máy tìm kiếm là website đặc biệt hỗ trợ người sử dụng tìm kiếm thông tin nhanh chóng dựa vào từ khoá (Google, Bing, Yahoo...).',
    textbookRef: 'SGK Tin học 6 - Trang 28'
  },
  {
    id: 'b7-th-1',
    lessonId: 7,
    lessonTitle: 'Bài 7. Tìm kiếm thông tin trên Internet',
    topicId: 3,
    topicTitle: 'Chủ đề 3. Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin',
    level: 'thong_hieu',
    question: 'Để thu hẹp phạm vi tìm kiếm và yêu cầu máy tìm kiếm trả về chính xác nguyên cụm từ, ta nên làm gì?',
    options: [
      'Viết in hoa tất cả các chữ cái',
      'Đặt cụm từ tìm kiếm trong dấu ngoặc kép "..."',
      'Gõ thật nhiều dấu chấm than (!) ở cuối',
      'Gõ từ khóa bằng tiếng Anh'
    ],
    correctAnswer: 1,
    explanation: 'SGK trang 29: Đặt từ khoá trong dấu ngoặc kép ("...") giúp thu hẹp phạm vi tìm kiếm, kết quả chỉ chứa chính xác cụm từ đó.',
    textbookRef: 'SGK Tin học 6 - Trang 29, Hình 3.5'
  },
  {
    id: 'b7-vd-1',
    lessonId: 7,
    lessonTitle: 'Bài 7. Tìm kiếm thông tin trên Internet',
    topicId: 3,
    topicTitle: 'Chủ đề 3. Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin',
    level: 'van_dung',
    question: 'Bạn Bình muốn tìm kiếm các hình ảnh đẹp về Vịnh Hạ Long để làm bài thuyết trình, bạn ấy nên thực hiện thao tác nào trên máy tìm kiếm Google?',
    options: [
      'Gõ "Vịnh Hạ Long" và nháy chọn mục "Hình ảnh" (Images) trên thanh công cụ lọc',
      'Gửi email cho bạn An để hỏi ảnh',
      'Chụp ảnh màn hình bàn phím',
      'Mở tệp Word để gõ chữ "Hình ảnh"'
    ],
    correctAnswer: 0,
    explanation: 'SGK trang 30, Hình 3.7: Người dùng nháy vào các thẻ lọc kết quả: "Hình ảnh", "Tin tức", "Video" để nhận đúng dạng thông tin cần tìm.',
    textbookRef: 'SGK Tin học 6 - Trang 30, Hình 3.7'
  },

  // ===================== BÀI 8: THƯ ĐIỆN TỬ (EMAIL) =====================
  {
    id: 'b8-nb-1',
    lessonId: 8,
    lessonTitle: 'Bài 8. Thư điện tử',
    topicId: 3,
    topicTitle: 'Chủ đề 3. Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin',
    level: 'nhan_biet',
    question: 'Địa chỉ thư điện tử (email) có cấu trúc chuẩn như thế nào?',
    options: [
      '<địa chỉ nhà>#<số điện thoại>',
      '<tên đăng nhập>@<địa chỉ máy chủ thư điện tử>',
      '<họ và tên>.<năm sinh>',
      'www.<tên học sinh>.com'
    ],
    correctAnswer: 1,
    explanation: 'SGK trang 33: "Địa chỉ thư điện tử có dạng: <tên đăng nhập>@<địa chỉ máy chủ thư điện tử>". Ví dụ: haiha1704200@gmail.com.',
    textbookRef: 'SGK Tin học 6 - Trang 33, Hình 3.9'
  },
  {
    id: 'b8-nb-2',
    lessonId: 8,
    lessonTitle: 'Bài 8. Thư điện tử',
    topicId: 3,
    topicTitle: 'Chủ đề 3. Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin',
    level: 'nhan_biet',
    question: 'Để đính kèm tệp tin (ảnh, tài liệu văn bản) khi gửi email trong Gmail, ta nhấn vào biểu tượng nào?',
    options: [
      'Biểu tượng kính lúp',
      'Biểu tượng hình kẹp ghim (Paperclip)',
      'Biểu tượng thùng rác',
      'Biểu tượng chiếc kéo'
    ],
    correctAnswer: 1,
    explanation: 'SGK trang 35, Hình 3.13: Biểu tượng chiếc kẹp ghim dùng để đính kèm tệp gửi cùng nội dung thư điện tử.',
    textbookRef: 'SGK Tin học 6 - Trang 35, Hình 3.13'
  },
  {
    id: 'b8-th-1',
    lessonId: 8,
    lessonTitle: 'Bài 8. Thư điện tử',
    topicId: 3,
    topicTitle: 'Chủ đề 3. Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin',
    level: 'thong_hieu',
    question: 'Địa chỉ thư điện tử nào sau đây là SAI cú pháp quy định?',
    options: [
      'khoa123@gmail.com',
      'thuyk39@yahoo.com',
      'minhtuan.gmail.com',
      'nmha@hnmu.edu.vn'
    ],
    correctAnswer: 2,
    explanation: 'SGK trang 33 (Câu hỏi 2): Địa chỉ "minhtuan.gmail.com" bị sai vì thiếu kí tự bắt buộc "@" ngăn cách giữa tên người dùng và máy chủ mail.',
    textbookRef: 'SGK Tin học 6 - Trang 33, Câu hỏi 2'
  },
  {
    id: 'b8-vd-1',
    lessonId: 8,
    lessonTitle: 'Bài 8. Thư điện tử',
    topicId: 3,
    topicTitle: 'Chủ đề 3. Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin',
    level: 'van_dung',
    question: 'Sau khi sử dụng xong hòm thư điện tử trên máy tính ở phòng máy của trường học hoặc quán Internet, thao tác nào quan trọng nhất để bảo mật tài khoản?',
    options: [
      'Tắt màn hình máy tính',
      'Nhấn Đăng xuất (Sign out / Log out) khỏi tài khoản rồi đóng trình duyệt',
      'Xóa lịch sử duyệt web nhưng không đăng xuất',
      'Đổi hình nền máy tính'
    ],
    correctAnswer: 1,
    explanation: 'SGK trang 35: Khi sử dụng máy tính chung, phải luôn nhớ nhấn "Đăng xuất" để tránh người sau mở vào đọc trộm thư hoặc mạo danh tài khoản.',
    textbookRef: 'SGK Tin học 6 - Trang 35, Hình 3.12'
  },

  // ===================== BÀI 9: AN TOÀN THÔNG TIN TRÊN INTERNET =====================
  {
    id: 'b9-nb-1',
    lessonId: 9,
    lessonTitle: 'Bài 9. An toàn thông tin trên Internet',
    topicId: 4,
    topicTitle: 'Chủ đề 4. Đạo đức, pháp luật và văn hoá trong môi trường số',
    level: 'nhan_biet',
    question: 'Quy tắc an toàn nào sau đây KHÔNG thuộc 5 quy tắc an toàn khi sử dụng Internet trong SGK Tin học 6?',
    options: [
      'GIỮ AN TOÀN (Bảo mật thông tin cá nhân)',
      'KHÔNG GẶP GỠ (Người lạ quen qua mạng)',
      'CHẤP NHẬN TẤT CẢ (Mở mọi đường link và tải mọi tệp gửi đến)',
      'HÃY NÓI RA (Chia sẻ với bố mẹ, thầy cô khi gặp rắc rối)'
    ],
    correctAnswer: 2,
    explanation: 'SGK trang 39: Quy tắc đúng là "ĐỪNG CHẤP NHẬN" (không mở tệp lạ, từ chối lời mời lạ), không phải chấp nhận tất cả.',
    textbookRef: 'SGK Tin học 6 - Trang 39, 5 quy tắc an toàn'
  },
  {
    id: 'b9-th-1',
    lessonId: 9,
    lessonTitle: 'Bài 9. An toàn thông tin trên Internet',
    topicId: 4,
    topicTitle: 'Chủ đề 4. Đạo đức, pháp luật và văn hoá trong môi trường số',
    level: 'thong_hieu',
    question: 'Mật khẩu nào sau đây được coi là một mật khẩu MẠNH và AN TOÀN?',
    options: [
      '12345678',
      'nguyenvana',
      'H@nHphuc#2026',
      '0123456789'
    ],
    correctAnswer: 2,
    explanation: 'SGK trang 40: Mật khẩu mạnh cần có từ 8 kí tự trở lên, kết hợp chữ cái viết hoa, chữ thường, chữ số và các kí tự đặc biệt (@, #, $...).',
    textbookRef: 'SGK Tin học 6 - Trang 40'
  },
  {
    id: 'b9-vd-1',
    lessonId: 9,
    lessonTitle: 'Bài 9. An toàn thông tin trên Internet',
    topicId: 4,
    topicTitle: 'Chủ đề 4. Đạo đức, pháp luật và văn hoá trong môi trường số',
    level: 'van_dung',
    question: 'Em nhận được một email từ người lạ với tiêu đề: "Chúc mừng bạn đã trúng thưởng 50 triệu đồng, hãy nhấp vào đường link đính kèm để nhận thưởng". Em nên xử lí thế nào?',
    options: [
      'Nhấp ngay vào link và nhập đầy đủ họ tên, số điện thoại, mật khẩu tài khoản gia đình',
      'Chia sẻ đường link cho tất cả bạn bè trong lớp cùng trúng thưởng',
      'Không nhấp vào link, báo ngay cho bố mẹ/thầy cô và xóa email vì đây là hình thức lừa đảo qua mạng',
      'Chuyển tiếp thư cho ngân hàng'
    ],
    correctAnswer: 2,
    explanation: 'SGK trang 40 & 41: Đây là thư rác lừa đảo (phishing) nhằm đánh cắp thông tin hoặc cài mã độc. Học sinh cần áp dụng quy tắc "ĐỪNG CHẤP NHẬN" và "HÃY NÓI RA".',
    textbookRef: 'SGK Tin học 6 - Trang 40 - 41'
  },

  // ===================== BÀI 10: SƠ ĐỒ TƯ DUY =====================
  {
    id: 'b10-nb-1',
    lessonId: 10,
    lessonTitle: 'Bài 10. Sơ đồ tư duy',
    topicId: 5,
    topicTitle: 'Chủ đề 5. Ứng dụng tin học',
    level: 'nhan_biet',
    question: 'Ai là người sáng tạo ra phương pháp Sơ đồ tư duy (Mindmap)?',
    options: [
      'Bill Gates',
      'Tony Buzan',
      'Steve Jobs',
      'Albert Einstein'
    ],
    correctAnswer: 1,
    explanation: 'SGK trang 42: "Tony Buzan (sinh năm 1942 tại Luân Đôn, Anh) là người sáng tạo ra sơ đồ tư duy".',
    textbookRef: 'SGK Tin học 6 - Trang 42, Hình 5.1'
  },
  {
    id: 'b10-nb-2',
    lessonId: 10,
    lessonTitle: 'Bài 10. Sơ đồ tư duy',
    topicId: 5,
    topicTitle: 'Chủ đề 5. Ứng dụng tin học',
    level: 'nhan_biet',
    question: 'Thành phần nằm ở vị trí trung tâm của sơ đồ tư duy là gì?',
    options: [
      'Chủ đề nhánh con',
      'Chủ đề chính',
      'Hình ảnh phụ',
      'Tên tác giả cuốn sách'
    ],
    correctAnswer: 1,
    explanation: 'SGK trang 44: Khi tạo sơ đồ tư duy, viết chủ đề chính ở giữa tờ giấy hoặc màn hình, sau đó mới vẽ các nhánh tỏa ra xung quanh.',
    textbookRef: 'SGK Tin học 6 - Trang 44'
  },
  {
    id: 'b10-th-1',
    lessonId: 10,
    lessonTitle: 'Bài 10. Sơ đồ tư duy',
    topicId: 5,
    topicTitle: 'Chủ đề 5. Ứng dụng tin học',
    level: 'thong_hieu',
    question: 'Ưu điểm lớn nhất của sơ đồ tư duy so với cách ghi chép văn bản dạng liệt kê truyền thống là gì?',
    options: [
      'Tốn nhiều giấy mực hơn',
      'Giúp người xem nhìn thấy bức tranh tổng thể, dễ dàng ghi nhớ và kích thích khả năng sáng tạo',
      'Bắt buộc phải vẽ bằng bút dạ quang đắt tiền',
      'Không cần dùng đến từ ngữ nào cả'
    ],
    correctAnswer: 1,
    explanation: 'SGK trang 42 & 43: Sơ đồ tư duy tận dụng tối đa khả năng ghi nhận hình ảnh của bộ não, giúp nhìn thấy bức tranh tổng thể và ghi nhớ thông tin nhanh hơn.',
    textbookRef: 'SGK Tin học 6 - Trang 42-43'
  },
  {
    id: 'b10-vd-1',
    lessonId: 10,
    lessonTitle: 'Bài 10. Sơ đồ tư duy',
    topicId: 5,
    topicTitle: 'Chủ đề 5. Ứng dụng tin học',
    level: 'van_dung',
    question: 'Để tóm tắt kiến thức Bài 9 "An toàn thông tin trên Internet", bạn An đặt chủ đề chính ở giữa là "An toàn thông tin trên Internet". Nhánh chính nào sau đây là hợp lí nhất để triển khai?',
    options: [
      'Nhánh "Tác hại, nguy cơ" và nhánh "Quy tắc an toàn"',
      'Nhánh "Cách nấu ăn ngon"',
      'Nhánh "Bảng cửu chương 9"',
      'Nhánh "Địa lí châu Âu"'
    ],
    correctAnswer: 0,
    explanation: 'SGK trang 47, Hình vận dụng Bài 10: Chủ đề chính là An toàn thông tin, 2 nhánh chính là: Tác hại/nguy cơ và Quy tắc giữ an toàn.',
    textbookRef: 'SGK Tin học 6 - Trang 47, Vận dụng'
  },

  // ===================== BÀI 11: ĐỊNH DẠNG VĂN BẢN =====================
  {
    id: 'b11-nb-1',
    lessonId: 11,
    lessonTitle: 'Bài 11. Định dạng văn bản',
    topicId: 5,
    topicTitle: 'Chủ đề 5. Ứng dụng tin học',
    level: 'nhan_biet',
    question: 'Trong phần mềm soạn thảo Word, các nút căn lề đoạn văn bản (trái, giữa, phải, đều 2 bên) nằm trong nhóm lệnh nào?',
    options: [
      'Nhóm lệnh Clipboard',
      'Nhóm lệnh Paragraph (thẻ Home)',
      'Nhóm lệnh Font',
      'Nhóm lệnh Styles'
    ],
    correctAnswer: 1,
    explanation: 'SGK trang 49: Các lệnh định dạng đoạn văn bản (căn lề, thụt lề, khoảng cách dòng) nằm trong nhóm lệnh Paragraph ở thẻ Home.',
    textbookRef: 'SGK Tin học 6 - Trang 49, Hình 5.4'
  },
  {
    id: 'b11-nb-2',
    lessonId: 11,
    lessonTitle: 'Bài 11. Định dạng văn bản',
    topicId: 5,
    topicTitle: 'Chủ đề 5. Ứng dụng tin học',
    level: 'nhan_biet',
    question: 'Để thay đổi hướng trang in (đứng - Portrait hoặc ngang - Landscape), ta vào nhóm lệnh Page Setup và chọn mục nào?',
    options: [
      'Margins',
      'Orientation',
      'Size',
      'Columns'
    ],
    correctAnswer: 1,
    explanation: 'SGK trang 49 & 52: Trong Page Setup, lệnh Orientation dùng để chọn hướng trang đứng (Portrait) hoặc hướng trang ngang (Landscape).',
    textbookRef: 'SGK Tin học 6 - Trang 49, Hình 5.9'
  },
  {
    id: 'b11-th-1',
    lessonId: 11,
    lessonTitle: 'Bài 11. Định dạng văn bản',
    topicId: 5,
    topicTitle: 'Chủ đề 5. Ứng dụng tin học',
    level: 'thong_hieu',
    question: 'Khi trình bày một bài thơ lục bát hoặc tiêu đề một bài văn trong phần mềm Word, kiểu căn lề nào thường được lựa chọn để đẹp mắt nhất?',
    options: [
      'Căn thẳng lề phải',
      'Căn giữa (Center)',
      'Tăng thụt lề cực đại',
      'Căn sát mép giấy dưới'
    ],
    correctAnswer: 1,
    explanation: 'SGK trang 50 (Hình 5.5) & trang 52: Tiêu đề và các đoạn văn bản đặc biệt như thơ lục bát thường được chọn căn giữa (Center) để tạo sự cân đối, trang trọng.',
    textbookRef: 'SGK Tin học 6 - Trang 50 & 52'
  },
  {
    id: 'b11-vd-1',
    lessonId: 11,
    lessonTitle: 'Bài 11. Định dạng văn bản',
    topicId: 5,
    topicTitle: 'Chủ đề 5. Ứng dụng tin học',
    level: 'van_dung',
    question: 'Bạn Mai đang soạn một Đơn xin nghỉ học. Để văn bản đúng quy chuẩn trang in của nhà trường, Mai nên đặt hướng trang và khổ giấy như thế nào?',
    options: [
      'Hướng trang ngang (Landscape), khổ giấy Letter',
      'Hướng trang đứng (Portrait), khổ giấy A4 tiêu chuẩn',
      'Hướng trang ngang, khổ giấy A3',
      'Không cần chỉnh trang in'
    ],
    correctAnswer: 1,
    explanation: 'SGK trang 49 & 52: Các văn bản hành chính như đơn từ, báo cáo luôn sử dụng hướng trang đứng (Portrait) và khổ giấy A4 phổ biến.',
    textbookRef: 'SGK Tin học 6 - Trang 49 & 52, Luyện tập'
  },

  // ===================== BÀI 12: TRÌNH BÀY THÔNG TIN Ở DẠNG BẢNG =====================
  {
    id: 'b12-nb-1',
    lessonId: 12,
    lessonTitle: 'Bài 12. Trình bày thông tin ở dạng bảng',
    topicId: 5,
    topicTitle: 'Chủ đề 5. Ứng dụng tin học',
    level: 'nhan_biet',
    question: 'Để chèn một bảng (Table) vào văn bản trong Microsoft Word, ta sử dụng thẻ lệnh nào?',
    options: [
      'Thẻ Home',
      'Thẻ Insert',
      'Thẻ View',
      'Thẻ Review'
    ],
    correctAnswer: 1,
    explanation: 'SGK trang 54: Để tạo bảng, ta nháy chuột vào thẻ Insert, sau đó chọn lệnh Table.',
    textbookRef: 'SGK Tin học 6 - Trang 54, Hình 5.12'
  },
  {
    id: 'b12-th-1',
    lessonId: 12,
    lessonTitle: 'Bài 12. Trình bày thông tin ở dạng bảng',
    topicId: 5,
    topicTitle: 'Chủ đề 5. Ứng dụng tin học',
    level: 'thong_hieu',
    question: 'Thao tác gộp nhiều ô liền kề trong bảng thành một ô duy nhất được gọi là gì trong tiếng Anh?',
    options: [
      'Split Cells',
      'Merge Cells',
      'Delete Rows',
      'Insert Below'
    ],
    correctAnswer: 1,
    explanation: 'SGK trang 55 & 56: Trong nhóm Merge của thẻ Layout (Table Tools), lệnh Merge Cells dùng để gộp các ô đã chọn.',
    textbookRef: 'SGK Tin học 6 - Trang 55, Hình 5.16'
  },
  {
    id: 'b12-vd-1',
    lessonId: 12,
    lessonTitle: 'Bài 12. Trình bày thông tin ở dạng bảng',
    topicId: 5,
    topicTitle: 'Chủ đề 5. Ứng dụng tin học',
    level: 'van_dung',
    question: 'Để tạo một thời khóa biểu học tập gồm các ngày từ Thứ 2 đến Thứ 7 và 5 tiết học mỗi ngày, cùng 1 hàng tiêu đề và 1 cột ghi số thứ tự tiết, em cần tạo bảng có kích thước bao nhiêu?',
    options: [
      '3 cột, 4 hàng',
      '7 cột, 6 hàng (7 columns, 6 rows)',
      '10 cột, 10 hàng',
      '5 cột, 5 hàng'
    ],
    correctAnswer: 1,
    explanation: 'Cột: 1 cột Tiết + 6 cột Thứ (2->7) = 7 cột. Hàng: 1 hàng tiêu đề + 5 hàng tiết học = 6 hàng. Do đó cần tạo bảng 7 cột, 6 hàng.',
    textbookRef: 'SGK Tin học 6 - Trang 57, Vận dụng'
  },

  // ===================== BÀI 13: TÌM KIẾM VÀ THAY THẾ =====================
  {
    id: 'b13-nb-1',
    lessonId: 13,
    lessonTitle: 'Bài 13. Thực hành: Tìm kiếm và thay thế',
    topicId: 5,
    topicTitle: 'Chủ đề 5. Ứng dụng tin học',
    level: 'nhan_biet',
    question: 'Tổ hợp phím tắt nào dùng để mở nhanh hộp thoại Tìm kiếm (Find) trong văn bản?',
    options: [
      'Ctrl + C',
      'Ctrl + F',
      'Ctrl + V',
      'Ctrl + Z'
    ],
    correctAnswer: 1,
    explanation: 'SGK trang 59: Phím tắt Ctrl + F mở hộp thoại Navigation / Tìm kiếm (Find).',
    textbookRef: 'SGK Tin học 6 - Trang 59'
  },
  {
    id: 'b13-nb-2',
    lessonId: 13,
    lessonTitle: 'Bài 13. Thực hành: Tìm kiếm và thay thế',
    topicId: 5,
    topicTitle: 'Chủ đề 5. Ứng dụng tin học',
    level: 'nhan_biet',
    question: 'Tổ hợp phím tắt nào dùng để mở nhanh công cụ Thay thế (Replace) trong Word?',
    options: [
      'Ctrl + H',
      'Ctrl + P',
      'Ctrl + S',
      'Ctrl + O'
    ],
    correctAnswer: 0,
    explanation: 'SGK trang 60: Phím tắt Ctrl + H mở hộp thoại Find and Replace.',
    textbookRef: 'SGK Tin học 6 - Trang 60, Hình 5.24'
  },
  {
    id: 'b13-th-1',
    lessonId: 13,
    lessonTitle: 'Bài 13. Thực hành: Tìm kiếm và thay thế',
    topicId: 5,
    topicTitle: 'Chủ đề 5. Ứng dụng tin học',
    level: 'thong_hieu',
    question: 'Trong tình huống bạn An muốn đổi công thức làm kem "dưa hấu" thành kem "xoài" trong một văn bản dài 50 trang, việc dùng lệnh "Replace All" đem lại lợi ích gì vượt trội?',
    options: [
      'Máy tính tự động mua thêm quả xoài về nhà',
      'Thay thế chính xác tất cả các từ "dưa hấu" thành "xoài" ngay tức thì mà không lo sót lỗi chính tả',
      'Làm cho văn bản tự động đổi sang màu vàng',
      'Xóa sạch toàn bộ văn bản'
    ],
    correctAnswer: 1,
    explanation: 'SGK trang 58: Công cụ Thay thế giúp tiết kiệm thời gian, công sức và thay thế toàn bộ từ khóa một cách triệt để không bỏ sót.',
    textbookRef: 'SGK Tin học 6 - Trang 58'
  },

  // ===================== BÀI 14: THỰC HÀNH TỔNG HỢP: SỔ LƯU NIỆM =====================
  {
    id: 'b14-nb-1',
    lessonId: 14,
    lessonTitle: 'Bài 14. Hoàn thiện sổ lưu niệm',
    topicId: 5,
    topicTitle: 'Chủ đề 5. Ứng dụng tin học',
    level: 'nhan_biet',
    question: 'Để chèn nhanh một trang bìa (Cover Page) được thiết kế mẫu sẵn vào đầu tài liệu Word, ta chọn lệnh nào?',
    options: [
      'Home -> Styles',
      'Insert -> Cover Page',
      'Page Layout -> Orientation',
      'Review -> Spelling'
    ],
    correctAnswer: 1,
    explanation: 'SGK trang 62, Hình 5.26: Trong thẻ Insert, nhóm Pages, nháy chọn Cover Page để chọn một mẫu trang bìa đẹp mắt.',
    textbookRef: 'SGK Tin học 6 - Trang 62, Hình 5.26'
  },
  {
    id: 'b14-th-1',
    lessonId: 14,
    lessonTitle: 'Bài 14. Hoàn thiện sổ lưu niệm',
    topicId: 5,
    topicTitle: 'Chủ đề 5. Ứng dụng tin học',
    level: 'thong_hieu',
    question: 'Muốn đưa toàn bộ nội dung từ các tệp văn bản bài viết của các bạn vào một tệp sổ lưu niệm chung mà không phải copy-paste thủ công từng tệp, ta dùng tính năng nào?',
    options: [
      'Insert -> Table',
      'Insert -> Object -> Text from File...',
      'File -> Print',
      'View -> Zoom'
    ],
    correctAnswer: 1,
    explanation: 'SGK trang 61, Hình 5.25: Trong nhóm Text của thẻ Insert, chọn Object -> Text from File... để tập hợp nội dung từ các tệp khác vào tệp chung.',
    textbookRef: 'SGK Tin học 6 - Trang 61, Hình 5.25'
  },

  // ===================== BÀI 15: THUẬT TOÁN =====================
  {
    id: 'b15-nb-1',
    lessonId: 15,
    lessonTitle: 'Bài 15. Thuật toán',
    topicId: 6,
    topicTitle: 'Chủ đề 6. Giải quyết vấn đề với sự trợ giúp của máy tính',
    level: 'nhan_biet',
    question: 'Thuật toán là gì?',
    options: [
      'Là chiếc máy tính điện tử hiện đại',
      'Là một dãy các chỉ dẫn rõ ràng, có trình tự sao cho khi thực hiện những chỉ dẫn này người ta giải quyết được vấn đề hoặc nhiệm vụ đã cho',
      'Là kết quả in ra của máy in',
      'Là một trò chơi điện tử trực tuyến'
    ],
    correctAnswer: 1,
    explanation: 'SGK trang 64: "Thuật toán là một dãy các chỉ dẫn rõ ràng, có trình tự sao cho khi thực hiện những chỉ dẫn này người ta giải quyết được vấn đề hoặc nhiệm vụ đã cho".',
    textbookRef: 'SGK Tin học 6 - Trang 64, Hộp kiến thức'
  },
  {
    id: 'b15-nb-2',
    lessonId: 15,
    lessonTitle: 'Bài 15. Thuật toán',
    topicId: 6,
    topicTitle: 'Chủ đề 6. Giải quyết vấn đề với sự trợ giúp của máy tính',
    level: 'nhan_biet',
    question: 'Trong sơ đồ khối (Flowchart) mô tả thuật toán, hình elip (oval) được quy ước thể hiện cho thao tác nào?',
    options: [
      'Bước xử lí tính toán',
      'Bắt đầu hoặc Kết thúc',
      'Nhập đầu vào hoặc xuất đầu ra',
      'Kiểm tra điều kiện rẽ nhánh'
    ],
    correctAnswer: 1,
    explanation: 'SGK trang 65: Hình elip quy ước cho: Bắt đầu hoặc Kết thúc.',
    textbookRef: 'SGK Tin học 6 - Trang 65, Hình 6.2'
  },
  {
    id: 'b15-th-1',
    lessonId: 15,
    lessonTitle: 'Bài 15. Thuật toán',
    topicId: 6,
    topicTitle: 'Chủ đề 6. Giải quyết vấn đề với sự trợ giúp của máy tính',
    level: 'thong_hieu',
    question: 'Trong thuật toán tính điểm trung bình cộng của 3 môn Toán, Ngữ văn, Tiếng Anh, Đầu vào (Input) và Đầu ra (Output) là gì?',
    options: [
      'Đầu vào: Điểm 3 môn; Đầu ra: Điểm trung bình cộng của 3 môn',
      'Đầu vào: Điểm trung bình; Đầu ra: Số lượng học sinh',
      'Đầu vào: Tên trường học; Đầu ra: Năm học',
      'Đầu vào: Điểm số 10; Đầu ra: Thước kẻ và compa'
    ],
    correctAnswer: 0,
    explanation: 'SGK trang 66: Đầu vào là dữ liệu ban đầu cần xử lí (điểm 3 môn), Đầu ra là kết quả nhận được (điểm trung bình cộng).',
    textbookRef: 'SGK Tin học 6 - Trang 66, Luyện tập'
  },
  {
    id: 'b15-th-2',
    lessonId: 15,
    lessonTitle: 'Bài 15. Thuật toán',
    topicId: 6,
    topicTitle: 'Chủ đề 6. Giải quyết vấn đề với sự trợ giúp của máy tính',
    level: 'thong_hieu',
    question: 'Trong sơ đồ khối thuật toán, hình nào được dùng để kiểm tra điều kiện (cho ra 2 nhánh: Đúng hoặc Sai)?',
    options: [
      'Hình chữ nhật',
      'Hình bình hành',
      'Hình thoi',
      'Hình tròn'
    ],
    correctAnswer: 2,
    explanation: 'SGK trang 65: Hình thoi quy ước dùng cho: "Bước kiểm tra điều kiện".',
    textbookRef: 'SGK Tin học 6 - Trang 65, Hình 6.2'
  },
  {
    id: 'b15-vd-1',
    lessonId: 15,
    lessonTitle: 'Bài 15. Thuật toán',
    topicId: 6,
    topicTitle: 'Chủ đề 6. Giải quyết vấn đề với sự trợ giúp của máy tính',
    level: 'van_dung',
    question: 'Cho thuật toán tính trung bình cộng của 2 số a và b. Thứ tự đúng của các bước là:\n(1) Tính Tổng = a + b\n(2) Nhập giá trị 2 số a và b\n(3) Tính Trung bình cộng = Tổng / 2\n(4) Thông báo giá trị Trung bình cộng',
    options: [
      '(1) -> (2) -> (3) -> (4)',
      '(2) -> (1) -> (3) -> (4)',
      '(3) -> (1) -> (2) -> (4)',
      '(4) -> (3) -> (2) -> (1)'
    ],
    correctAnswer: 1,
    explanation: 'SGK trang 66, Hình 6.3 & 6.4: Thứ tự logic: Nhập a, b -> Tính Tổng = a + b -> Tính TBC = Tổng / 2 -> Xuất kết quả.',
    textbookRef: 'SGK Tin học 6 - Trang 66, Hình 6.3'
  },

  // ===================== BÀI 16: CÁC CẤU TRÚC ĐIỀU KHIỂN =====================
  {
    id: 'b16-nb-1',
    lessonId: 16,
    lessonTitle: 'Bài 16. Các cấu trúc điều khiển',
    topicId: 6,
    topicTitle: 'Chủ đề 6. Giải quyết vấn đề với sự trợ giúp của máy tính',
    level: 'nhan_biet',
    question: 'Ba cấu trúc điều khiển cơ bản trong thuật toán và lập trình là:',
    options: [
      'Cấu trúc cộng, trừ, nhân, chia',
      'Cấu trúc tuần tự, cấu trúc rẽ nhánh, cấu trúc lặp',
      'Cấu trúc mở, đóng, lưu',
      'Cấu trúc văn bản, âm thanh, hình ảnh'
    ],
    correctAnswer: 1,
    explanation: 'SGK trang 67 & 69: "Ba cấu trúc tuần tự, rẽ nhánh và lặp là đủ để mô tả mọi thuật toán".',
    textbookRef: 'SGK Tin học 6 - Trang 69, Hộp kiến thức'
  },
  {
    id: 'b16-th-1',
    lessonId: 16,
    lessonTitle: 'Bài 16. Các cấu trúc điều khiển',
    topicId: 6,
    topicTitle: 'Chủ đề 6. Giải quyết vấn đề với sự trợ giúp của máy tính',
    level: 'thong_hieu',
    question: 'Câu nói: "Nếu trời mưa thì em mang theo áo mưa" thể hiện cấu trúc điều khiển nào?',
    options: [
      'Cấu trúc tuần tự',
      'Cấu trúc rẽ nhánh dạng thiếu',
      'Cấu trúc rẽ nhánh dạng đủ',
      'Cấu trúc lặp vô tận'
    ],
    correctAnswer: 1,
    explanation: 'SGK trang 68: "Nếu <Điều kiện> đúng thì thực hiện <Lệnh>" là cấu trúc rẽ nhánh dạng thiếu (không có mệnh đề "ngược lại").',
    textbookRef: 'SGK Tin học 6 - Trang 68, Hình 6.7'
  },
  {
    id: 'b16-th-2',
    lessonId: 16,
    lessonTitle: 'Bài 16. Các cấu trúc điều khiển',
    topicId: 6,
    topicTitle: 'Chủ đề 6. Giải quyết vấn đề với sự trợ giúp của máy tính',
    level: 'thong_hieu',
    question: 'Câu nói: "Nếu điểm thi từ 8.0 trở lên thì được khen thưởng, ngược lại thì phải cố gắng hơn" thể hiện cấu trúc nào?',
    options: [
      'Cấu trúc tuần tự',
      'Cấu trúc rẽ nhánh dạng thiếu',
      'Cấu trúc rẽ nhánh dạng đủ',
      'Cấu trúc lặp'
    ],
    correctAnswer: 2,
    explanation: 'SGK trang 68: "Nếu <Điều kiện> đúng thì thực hiện <Lệnh 1>, ngược lại thực hiện <Lệnh 2>" là cấu trúc rẽ nhánh dạng đủ.',
    textbookRef: 'SGK Tin học 6 - Trang 68, Hình 6.8'
  },
  {
    id: 'b16-vd-1',
    lessonId: 16,
    lessonTitle: 'Bài 16. Các cấu trúc điều khiển',
    topicId: 6,
    topicTitle: 'Chủ đề 6. Giải quyết vấn đề với sự trợ giúp của máy tính',
    level: 'van_dung',
    question: 'Hành động: "Mỗi buổi sáng, bạn An ném bóng rổ vào rổ, nếu chưa trúng đích thì bạn ném lại cho đến khi trúng đích thì dừng lại". Đây là ví dụ của cấu trúc nào?',
    options: [
      'Cấu trúc rẽ nhánh dạng thiếu',
      'Cấu trúc lặp (với điều kiện dừng là ném trúng đích)',
      'Cấu trúc tuần tự không điều kiện',
      'Không phải là thuật toán'
    ],
    correctAnswer: 1,
    explanation: 'SGK trang 70 & 71, Hình 6.11: Hành động ném lặp đi lặp lại cho đến khi thỏa mãn điều kiện "trúng đích" là cấu trúc lặp.',
    textbookRef: 'SGK Tin học 6 - Trang 70 - 71'
  },

  // ===================== BÀI 17: CHƯƠNG TRÌNH MÁY TÍNH =====================
  {
    id: 'b17-nb-1',
    lessonId: 17,
    lessonTitle: 'Bài 17. Chương trình máy tính',
    topicId: 6,
    topicTitle: 'Chủ đề 6. Giải quyết vấn đề với sự trợ giúp của máy tính',
    level: 'nhan_biet',
    question: 'Chương trình máy tính là gì?',
    options: [
      'Là bản in trên giấy của máy tính',
      'Là tập hợp các lệnh viết bằng ngôn ngữ lập trình, chỉ dẫn cho máy tính thực hiện các bước của thuật toán',
      'Là dây cắm nguồn nối máy tính vào ổ điện',
      'Là bài hát được phát ra từ loa'
    ],
    correctAnswer: 1,
    explanation: 'SGK trang 71 & 72: "Chương trình là tập hợp các lệnh viết bằng ngôn ngữ lập trình, chỉ dẫn cho máy tính thực hiện. Nói cách khác, chương trình là một cách mô tả khác của thuật toán để máy tính có thể hiểu và thực hiện được".',
    textbookRef: 'SGK Tin học 6 - Trang 71 - 72, Hộp kiến thức'
  },
  {
    id: 'b17-nb-2',
    lessonId: 17,
    lessonTitle: 'Bài 17. Chương trình máy tính',
    topicId: 6,
    topicTitle: 'Chủ đề 6. Giải quyết vấn đề với sự trợ giúp của máy tính',
    level: 'nhan_biet',
    question: 'Scratch là gì?',
    options: [
      'Một loại virus máy tính nguy hiểm',
      'Một ngôn ngữ lập trình trực quan bằng các khối lệnh kéo thả, thích hợp cho học sinh',
      'Một phần mềm diệt chuột',
      'Một loại bàn phím cơ'
    ],
    correctAnswer: 1,
    explanation: 'SGK trang 72: "Scratch là ngôn ngữ lập trình trực quan em đã được học ở Tiểu học và tiếp tục sử dụng để điều khiển máy tính".',
    textbookRef: 'SGK Tin học 6 - Trang 72'
  },
  {
    id: 'b17-th-1',
    lessonId: 17,
    lessonTitle: 'Bài 17. Chương trình máy tính',
    topicId: 6,
    topicTitle: 'Chủ đề 6. Giải quyết vấn đề với sự trợ giúp của máy tính',
    level: 'thong_hieu',
    question: 'Trong Scratch, để bắt đầu một kịch bản khi người dùng nhấn chuột vào biểu tượng lá cờ màu xanh, ta sử dụng khối lệnh thuộc nhóm nào?',
    options: [
      'Khối lệnh Sự kiện (Events - "khi bấm vào lá cờ xanh")',
      'Khối lệnh Âm thanh',
      'Khối lệnh Bút vẽ',
      'Khối lệnh Biến số'
    ],
    correctAnswer: 0,
    explanation: 'SGK trang 72, Hình 6.13: Khối lệnh màu vàng "khi nhấn vào [Lá cờ xanh]" thuộc nhóm Sự kiện là lệnh khởi đầu cho chương trình chạy.',
    textbookRef: 'SGK Tin học 6 - Trang 72 - 73'
  },
  {
    id: 'b17-vd-1',
    lessonId: 17,
    lessonTitle: 'Bài 17. Chương trình máy tính',
    topicId: 6,
    topicTitle: 'Chủ đề 6. Giải quyết vấn đề với sự trợ giúp của máy tính',
    level: 'van_dung',
    question: 'Quan sát đoạn mã lệnh Scratch: "lặp lại 10 lần { di chuyển 10 bước; chơi trống 1 trong 0.25 nhịp; nếu chạm biên thì bật lại }". Đoạn lệnh này kết hợp những cấu trúc điều khiển nào?',
    options: [
      'Chỉ có cấu trúc tuần tự',
      'Cấu trúc lặp kết hợp cấu trúc tuần tự và rẽ nhánh điều kiện',
      'Không có cấu trúc nào',
      'Chỉ có cấu trúc rẽ nhánh'
    ],
    correctAnswer: 1,
    explanation: 'SGK trang 74, Hình 6.16: Khối "lặp lại 10 lần" là cấu trúc lặp, các lệnh bên trong chạy lần lượt là tuần tự, và khối "nếu chạm biên" là rẽ nhánh kiểm tra điều kiện.',
    textbookRef: 'SGK Tin học 6 - Trang 74, Hình 6.16'
  },

  // ===================== BỔ SUNG CÂU HỎI NHẬN BIẾT & THÔNG HIỂU & VẬN DỤNG THÊM =====================
  {
    id: 'b1-nb-3',
    lessonId: 1,
    lessonTitle: 'Bài 1. Thông tin và dữ liệu',
    topicId: 1,
    topicTitle: 'Chủ đề 1. Máy tính và cộng đồng',
    level: 'nhan_biet',
    question: 'Dữ liệu KHÔNG thể thể hiện dưới dạng nào sau đây?',
    options: [
      'Dạng số và dạng văn bản',
      'Dạng hình ảnh và dạng âm thanh',
      'Dạng ý nghĩ trừu tượng chưa được ghi lại lên bất kì vật nào',
      'Dạng bảng biểu thống kê trên giấy'
    ],
    correctAnswer: 2,
    explanation: 'SGK trang 6: Ý nghĩ chỉ là thông tin trong đầu con người. Chỉ khi được ghi chép, biểu diễn lên vật mang tin (chữ viết, con số, hình vẽ, âm thanh) thì mới trở thành dữ liệu.',
    textbookRef: 'SGK Tin học 6 - Trang 6'
  },
  {
    id: 'b2-nb-3',
    lessonId: 2,
    lessonTitle: 'Bài 2. Xử lí thông tin',
    topicId: 1,
    topicTitle: 'Chủ đề 1. Máy tính và cộng đồng',
    level: 'nhan_biet',
    question: 'Thiết bị nào sau đây của máy tính đóng vai trò là "Thiết bị ra" (Output device)?',
    options: [
      'Chuột máy tính',
      'Màn hình và Loa',
      'Bàn phím',
      'Máy quét (Scanner)'
    ],
    correctAnswer: 1,
    explanation: 'SGK trang 10: Màn hình, máy in, loa là các thiết bị ra dùng để truyền và chia sẻ thông tin đến người sử dụng.',
    textbookRef: 'SGK Tin học 6 - Trang 10'
  },
  {
    id: 'b3-nb-3',
    lessonId: 3,
    lessonTitle: 'Bài 3. Thông tin trong máy tính',
    topicId: 1,
    topicTitle: 'Chủ đề 1. Máy tính và cộng đồng',
    level: 'nhan_biet',
    question: '1 Gigabyte (GB) xấp xỉ bằng bao nhiêu byte?',
    options: [
      '1 nghìn byte',
      '1 triệu byte',
      '1 tỉ byte',
      '1 nghìn tỉ byte'
    ],
    correctAnswer: 2,
    explanation: 'SGK trang 14 & 15: 1 KB ≈ 1 nghìn byte; 1 MB ≈ 1 triệu byte; 1 GB ≈ 1 tỉ byte; 1 TB ≈ 1 nghìn tỉ byte.',
    textbookRef: 'SGK Tin học 6 - Trang 14, Bảng 1.3 & Trang 15'
  },
  {
    id: 'b4-th-2',
    lessonId: 4,
    lessonTitle: 'Bài 4. Mạng máy tính',
    topicId: 2,
    topicTitle: 'Chủ đề 2. Mạng máy tính và Internet',
    level: 'thong_hieu',
    question: 'Thiết bị nào có chức năng chuyển tiếp dữ liệu giữa các máy tính và thiết bị trong cùng một mạng có dây?',
    options: [
      'Bộ chuyển mạch (Switch) hoặc bộ chia (Hub)',
      'Bàn phím không dây',
      'Màn hình cảm ứng',
      'Thẻ nhớ SD'
    ],
    correctAnswer: 0,
    explanation: 'SGK trang 18: Bộ chia (Hub), bộ chuyển mạch (Switch), bộ định tuyến (Router) là các thiết bị kết nối mạng.',
    textbookRef: 'SGK Tin học 6 - Trang 18'
  },
  {
    id: 'b5-vd-2',
    lessonId: 5,
    lessonTitle: 'Bài 5. Internet',
    topicId: 2,
    topicTitle: 'Chủ đề 2. Mạng máy tính và Internet',
    level: 'van_dung',
    question: 'Tác hại nào sau đây có thể xảy ra nếu học sinh ngồi sử dụng Internet và chơi game liên tục nhiều giờ mỗi ngày?',
    options: [
      'Ảnh hưởng xấu đến thị lực, sức khỏe, bỏ bê học tập và nguy cơ nghiện Internet',
      'Làm cho bàn phím bị biến thành màu xanh lá cây',
      'Tốc độ Internet toàn thế giới bị giảm 50%',
      'Máy tính tự động in ra giấy trắng'
    ],
    correctAnswer: 0,
    explanation: 'SGK trang 22 & 38: Cảnh báo "Không nên truy cập Internet liên tục trong nhiều giờ" vì gây hại cho sức khỏe tâm lí, thể chất và học tập.',
    textbookRef: 'SGK Tin học 6 - Trang 22 & 38'
  },
  {
    id: 'b7-th-2',
    lessonId: 7,
    lessonTitle: 'Bài 7. Tìm kiếm thông tin trên Internet',
    topicId: 3,
    topicTitle: 'Chủ đề 3. Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin',
    level: 'thong_hieu',
    question: 'Khi tìm kiếm với từ khoá: vai trò của tầng ozon (không có ngoặc kép) so với "vai trò của tầng ozon" (có dấu ngoặc kép), kết quả nào sẽ cho ít liên kết hơn nhưng chính xác hơn?',
    options: [
      'Kết quả không có dấu ngoặc kép',
      'Kết quả có dấu ngoặc kép ("vai trò của tầng ozon")',
      'Cả hai cho số lượng liên kết hoàn toàn giống hệt nhau',
      'Không có kết quả nào xuất hiện'
    ],
    correctAnswer: 1,
    explanation: 'SGK trang 29, Hình 3.5: Tìm không có ngoặc kép cho khoảng 52.900 kết quả; khi đặt trong ngoặc kép thu hẹp chỉ còn khoảng 1.510 kết quả chuẩn xác.',
    textbookRef: 'SGK Tin học 6 - Trang 29, Hình 3.5'
  },
  {
    id: 'b9-th-2',
    lessonId: 9,
    lessonTitle: 'Bài 9. An toàn thông tin trên Internet',
    topicId: 4,
    topicTitle: 'Chủ đề 4. Đạo đức, pháp luật và văn hoá trong môi trường số',
    level: 'thong_hieu',
    question: 'Tại sao việc đăng ảnh thẻ căn cước, địa chỉ nhà riêng và số điện thoại lên mạng xã hội ở chế độ công khai lại rất nguy hiểm?',
    options: [
      'Vì làm tốn dung lượng máy chủ Facebook',
      'Vì kẻ xấu có thể lợi dụng thông tin cá nhân để lừa đảo, giả mạo danh tính hoặc đe dọa bản thân và gia đình',
      'Vì mạng xã hội sẽ tự động khóa tài khoản sau 10 phút',
      'Vì các bức ảnh sẽ bị đổi sang màu đen trắng'
    ],
    correctAnswer: 1,
    explanation: 'SGK trang 37 & 40: Kẻ xấu có thể đánh cắp và lợi dụng thông tin cá nhân để tống tiền, lừa đảo, quấy rối hoặc bôi nhọ.',
    textbookRef: 'SGK Tin học 6 - Trang 37 & 40'
  },
  {
    id: 'b12-th-2',
    lessonId: 12,
    lessonTitle: 'Bài 12. Trình bày thông tin ở dạng bảng',
    topicId: 5,
    topicTitle: 'Chủ đề 5. Ứng dụng tin học',
    level: 'thong_hieu',
    question: 'Để chèn thêm một hàng mới ngay phía dưới hàng hiện tại trong bảng Word, ta dùng lệnh nào trong nhóm Rows & Columns?',
    options: [
      'Insert Above',
      'Insert Below',
      'Insert Left',
      'Delete Rows'
    ],
    correctAnswer: 1,
    explanation: 'SGK trang 55, Hình 5.16: "Insert Below" dùng để chèn thêm hàng ở phía dưới vị trí con trỏ chuột.',
    textbookRef: 'SGK Tin học 6 - Trang 55, Hình 5.16'
  },
  {
    id: 'b15-nb-3',
    lessonId: 15,
    lessonTitle: 'Bài 15. Thuật toán',
    topicId: 6,
    topicTitle: 'Chủ đề 6. Giải quyết vấn đề với sự trợ giúp của máy tính',
    level: 'nhan_biet',
    question: 'Trong sơ đồ khối, hình nào được dùng để biểu diễn bước Đầu vào (Input) hoặc Đầu ra (Output)?',
    options: [
      'Hình chữ nhật',
      'Hình bình hành',
      'Hình tròn',
      'Hình tam giác'
    ],
    correctAnswer: 1,
    explanation: 'SGK trang 65, Hình 6.2: Hình bình hành quy ước cho "Đầu vào hoặc Đầu ra".',
    textbookRef: 'SGK Tin học 6 - Trang 65'
  },
  {
    id: 'b16-vd-2',
    lessonId: 16,
    lessonTitle: 'Bài 16. Các cấu trúc điều khiển',
    topicId: 6,
    topicTitle: 'Chủ đề 6. Giải quyết vấn đề với sự trợ giúp của máy tính',
    level: 'van_dung',
    question: 'Một robot hút bụi di chuyển tự động: "Cứ đi thẳng 1 mét; Nếu gặp vật cản thì xoay phải 90 độ, ngược lại thì tiếp tục đi thẳng". Trong quy trình hoạt động của robot có những cấu trúc điều khiển nào?',
    options: [
      'Cấu trúc tuần tự, cấu trúc rẽ nhánh đủ và cấu trúc lặp',
      'Chỉ duy nhất cấu trúc rẽ nhánh thiếu',
      'Chỉ có cấu trúc tuần tự',
      'Không áp dụng thuật toán nào'
    ],
    correctAnswer: 0,
    explanation: 'Robot thực hiện lặp đi lặp lại hành động tuần tự và rẽ nhánh đủ (nếu có vật cản thì rẽ, ngược lại đi thẳng). Đây là sự phối hợp của cả 3 cấu trúc.',
    textbookRef: 'SGK Tin học 6 - Trang 67 - 70'
  },
  {
    id: 'b17-vd-2',
    lessonId: 17,
    lessonTitle: 'Bài 17. Chương trình máy tính',
    topicId: 6,
    topicTitle: 'Chủ đề 6. Giải quyết vấn đề với sự trợ giúp của máy tính',
    level: 'van_dung',
    question: 'Trong bài thực hành Scratch tính tiền bán thiệp: gọi tiền bán được là a, tiền vật liệu mua là b. Nếu a >= b thì tiền lãi = a - b, ngược lại thì tiền lỗ = b - a. Khối lệnh Scratch nào thực hiện điều kiện này?',
    options: [
      'Khối "nếu <a >= b> thì { ... } còn không thì { ... }"',
      'Khối "lặp lại 10 lần"',
      'Khối "nói Xin chào trong 2 giây"',
      'Khối "chơi nốt nhạc 60"'
    ],
    correctAnswer: 0,
    explanation: 'SGK trang 73, Hình 6.14: Khối điều khiển rẽ nhánh đầy đủ "nếu <a >= b> thì ... còn không thì ..." biểu diễn chính xác điều kiện tính lãi hay lỗ.',
    textbookRef: 'SGK Tin học 6 - Trang 73, Hình 6.14'
  },
  // Bổ sung thêm các câu hỏi đặc sắc theo các trang SGK
  {
    id: 'b1-vd-2',
    lessonId: 1,
    lessonTitle: 'Bài 1. Thông tin và dữ liệu',
    topicId: 1,
    topicTitle: 'Chủ đề 1. Máy tính và cộng đồng',
    level: 'van_dung',
    question: 'Cho Bảng lượng mưa trung bình tháng (SGK trang 7): Tháng 6, lượng mưa ở Hà Nội là 200,7 mm; ở Đà Nẵng là 40,9 mm; ở Vũng Tàu là 166,8 mm. Phát biểu nào sau đây là THÔNG TIN rút ra được từ bảng số liệu trên?',
    options: [
      'Số 200,7 và số 40,9',
      'Đà Nẵng có lượng mưa ít nhất trong 3 thành phố vào tháng 6',
      'Bảng 1.1 in trên giấy',
      'Dấu phẩy ngăn cách hàng thập phân'
    ],
    correctAnswer: 1,
    explanation: 'SGK trang 7 (Luyện tập): Các con số 200,7; 40,9 là dữ liệu. Nhận xét "Tháng 6, Đà Nẵng ít mưa nhất so với Hà Nội và Vũng Tàu" là thông tin đem lại sự hiểu biết cho con người.',
    textbookRef: 'SGK Tin học 6 - Trang 7, Bảng 1.1'
  },
  {
    id: 'b2-vd-2',
    lessonId: 2,
    lessonTitle: 'Bài 2. Xử lí thông tin',
    topicId: 1,
    topicTitle: 'Chủ đề 1. Máy tính và cộng đồng',
    level: 'van_dung',
    question: 'Khi học sinh làm tính nhẩm phép nhân: 15 x 6 = 90 trong đầu. Bộ não đã thực hiện hoạt động nào trong quá trình xử lí thông tin?',
    options: [
      'Chỉ có hoạt động thu nhận',
      'Chỉ có hoạt động in ấn',
      'Hoạt động xử lí thông tin (liên kết, tính toán và suy luận các con số đã ghi nhớ)',
      'Hoạt động truyền thông tin qua cáp quang'
    ],
    correctAnswer: 2,
    explanation: 'SGK trang 9 (Câu hỏi 2d): Tính nhẩm trong đầu là hoạt động xử lí thông tin của bộ não dựa trên kiến thức bảng cửu chương đã lưu trữ.',
    textbookRef: 'SGK Tin học 6 - Trang 9, Câu 2d'
  },
  {
    id: 'b3-vd-2',
    lessonId: 3,
    lessonTitle: 'Bài 3. Thông tin trong máy tính',
    topicId: 1,
    topicTitle: 'Chủ đề 1. Máy tính và cộng đồng',
    level: 'van_dung',
    question: 'Theo phương pháp chia đôi dãy số từ 0 đến 7 để mã hoá số 4 (SGK trang 12): Lần 1 thuộc nửa phải (1), Lần 2 thuộc nửa trái (0), Lần 3 thuộc nửa trái (0). Vậy số 4 được mã hoá thành dãy bit nào?',
    options: [
      '001',
      '100',
      '010',
      '111'
    ],
    correctAnswer: 1,
    explanation: 'SGK trang 12 (Hoạt động 1): Vị trí thu được là (phải, trái, trái). Theo quy tắc trái thành 0, phải thành 1, số 4 được mã hoá thành dãy bit 100.',
    textbookRef: 'SGK Tin học 6 - Trang 12, Hình 1.3'
  },
  {
    id: 'b4-vd-2',
    lessonId: 4,
    lessonTitle: 'Bài 4. Mạng máy tính',
    topicId: 2,
    topicTitle: 'Chủ đề 2. Mạng máy tính và Internet',
    level: 'van_dung',
    question: 'Nhà bạn An có điện thoại di động của bố, máy tính bảng của mẹ và máy tính xách tay của An cùng kết nối vào một bộ phát Wi-Fi để xem video và học trực tuyến. Các thiết bị này có tạo thành một mạng máy tính không?',
    options: [
      'Không, vì chỉ có máy tính bàn mới tạo thành mạng',
      'Có, các thiết bị này được kết nối không dây với nhau qua bộ phát Wi-Fi để truyền dữ liệu và chia sẻ đường truyền Internet',
      'Chỉ khi nào cắm dây điện thoại vào nhau thì mới tính là mạng',
      'Không, vì điện thoại không phải là máy vi tính'
    ],
    correctAnswer: 1,
    explanation: 'SGK trang 20 (Vận dụng 2): Điện thoại thông minh, máy tính bảng và laptop đều là các thiết bị đầu cuối kết nối qua thiết bị mạng (Router Wi-Fi) tạo thành mạng máy tính.',
    textbookRef: 'SGK Tin học 6 - Trang 20, Vận dụng 2'
  },
  {
    id: 'b6-th-2',
    lessonId: 6,
    lessonTitle: 'Bài 6. Mạng thông tin toàn cầu',
    topicId: 3,
    topicTitle: 'Chủ đề 3. Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin',
    level: 'thong_hieu',
    question: 'Địa chỉ https://vi.wikipedia.org là địa chỉ của:',
    options: [
      'Một bức thư điện tử',
      'Trang chủ của website Bách khoa toàn thư mở tiếng Việt',
      'Một chiếc máy in màu',
      'Một bộ vi xử lí CPU'
    ],
    correctAnswer: 1,
    explanation: 'SGK trang 24: https://vi.wikipedia.org là địa chỉ trang chủ của website Bách khoa toàn thư mở tiếng Việt.',
    textbookRef: 'SGK Tin học 6 - Trang 24, Ví dụ'
  },
  {
    id: 'b7-vd-2',
    lessonId: 7,
    lessonTitle: 'Bài 7. Tìm kiếm thông tin trên Internet',
    topicId: 3,
    topicTitle: 'Chủ đề 3. Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin',
    level: 'van_dung',
    question: 'Để sao chép một đoạn văn bản hay một hình ảnh từ trang web về máy tính để làm bài thuyết trình, thao tác đúng là gì?',
    options: [
      'Chụp ảnh bằng điện thoại rồi vẽ lại',
      'Bôi đen đoạn văn bản, nhấn Ctrl + C (sao chép) rồi mở Word nhấn Ctrl + V (dán); với hình ảnh thì nhấp chuột phải chọn "Lưu hình ảnh thành..."',
      'Nhấn phím Delete trên bàn phím',
      'Tắt nguồn màn hình máy tính'
    ],
    correctAnswer: 1,
    explanation: 'SGK trang 31 & 32: Hướng dẫn sao chép văn bản (Ctrl+C, Ctrl+V) và lưu hình ảnh (nháy chuột phải chọn Lưu hình ảnh thành / Save image as).',
    textbookRef: 'SGK Tin học 6 - Trang 31-32, Hình 3.8'
  },
  {
    id: 'b8-th-2',
    lessonId: 8,
    lessonTitle: 'Bài 8. Thư điện tử',
    topicId: 3,
    topicTitle: 'Chủ đề 3. Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin',
    level: 'thong_hieu',
    question: 'Trò chơi giải ô chữ trang 36 SGK: Từ khoá gồm 8 chữ cái (M-A-T-K-H-A-U) dùng để bảo mật cho tài khoản thư điện tử là gì?',
    options: [
      'Hộp thư',
      'Mật khẩu',
      'Tên miền',
      'Tệp tin'
    ],
    correctAnswer: 1,
    explanation: 'SGK trang 36, Ô chữ hàng 2: "Để bảo mật cho tài khoản thư thì người sử dụng cần đặt MẬT KHẨU".',
    textbookRef: 'SGK Tin học 6 - Trang 36, Trò chơi Giải ô chữ'
  },
  {
    id: 'b10-th-2',
    lessonId: 10,
    lessonTitle: 'Bài 10. Sơ đồ tư duy',
    topicId: 5,
    topicTitle: 'Chủ đề 5. Ứng dụng tin học',
    level: 'thong_hieu',
    question: 'Khi vẽ sơ đồ tư duy, việc sử dụng màu sắc khác nhau cho các nhánh và thêm các biểu tượng/hình ảnh có tác dụng gì?',
    options: [
      'Làm cho sơ đồ trông rối mắt hơn',
      'Kích thích não bộ, giúp phân biệt rõ các nhóm ý và ghi nhớ sâu sắc hơn',
      'Bắt buộc theo quy định của nhà xuất bản',
      'Làm tăng dung lượng pin máy tính'
    ],
    correctAnswer: 1,
    explanation: 'SGK trang 44: "Nên sử dụng màu sắc khi tạo sơ đồ tư duy vì màu sắc có tác dụng kích thích não bộ ghi nhớ tốt hơn".',
    textbookRef: 'SGK Tin học 6 - Trang 44, Ghi nhớ'
  },
  {
    id: 'b11-th-2',
    lessonId: 11,
    lessonTitle: 'Bài 11. Định dạng văn bản',
    topicId: 5,
    topicTitle: 'Chủ đề 5. Ứng dụng tin học',
    level: 'thong_hieu',
    question: 'Trong Word, để giãn khoảng cách giữa các dòng trong một đoạn văn bản (Line Spacing), ta chọn nút lệnh nào trong nhóm Paragraph?',
    options: [
      'Nút Căn giữa',
      'Nút Line and Paragraph Spacing (biểu tượng mũi tên 2 chiều lên xuống kèm các dòng gạch)',
      'Nút Đổi màu chữ',
      'Nút In đậm'
    ],
    correctAnswer: 1,
    explanation: 'SGK trang 49, Hình 5.4: Nút Line Spacing dùng để chỉnh khoảng cách giữa các dòng trong một đoạn hoặc khoảng cách giữa các đoạn.',
    textbookRef: 'SGK Tin học 6 - Trang 49, Hình 5.4'
  },
  {
    id: 'b12-vd-2',
    lessonId: 12,
    lessonTitle: 'Bài 12. Trình bày thông tin ở dạng bảng',
    topicId: 5,
    topicTitle: 'Chủ đề 5. Ứng dụng tin học',
    level: 'van_dung',
    question: 'Khi tạo bảng danh sách lớp 6A, ô chứa thông tin của Giáo viên chủ nhiệm cần kéo dài ngang qua 4 cột của học sinh. Thao tác thực hiện là:',
    options: [
      'Xóa bảng đi vẽ lại bằng bút mực',
      'Chọn 4 ô đó rồi nháy chọn Merge Cells trên thẻ Layout để gộp ô',
      'Bấm nút Delete Rows',
      'Thu nhỏ phông chữ'
    ],
    correctAnswer: 1,
    explanation: 'SGK trang 56, Hình 5.18 & 5.20: Kéo chuột chọn 4 ô của bảng, nháy chọn Merge Cells để gộp thành 1 ô lớn.',
    textbookRef: 'SGK Tin học 6 - Trang 56, Hình 5.18 - 5.20'
  },
  {
    id: 'b13-vd-1',
    lessonId: 13,
    lessonTitle: 'Bài 13. Thực hành: Tìm kiếm và thay thế',
    topicId: 5,
    topicTitle: 'Chủ đề 5. Ứng dụng tin học',
    level: 'van_dung',
    question: 'Trong tệp bài viết sổ lưu niệm, bạn An lỡ gõ sai từ "truòng" (thiếu dấu) xuất hiện ở 35 vị trí khác nhau. Các bước nhanh nhất để sửa tất cả thành "trường" là:',
    options: [
      'Đọc lại từng dòng từ đầu đến cuối và sửa bằng tay từng chữ một',
      'Nhấn Ctrl + H, gõ "truòng" vào ô Find what, gõ "trường" vào ô Replace with, rồi nhấn Replace All',
      'Xóa toàn bộ tệp rồi gõ lại từ đầu',
      'Đổi màu nền của chữ thành màu đỏ'
    ],
    correctAnswer: 1,
    explanation: 'SGK trang 60, Hình 5.24: Dùng công cụ Replace All trong hộp thoại Find and Replace giúp sửa hàng loạt cực nhanh và chính xác.',
    textbookRef: 'SGK Tin học 6 - Trang 60, Hình 5.24'
  },
  {
    id: 'b14-vd-1',
    lessonId: 14,
    lessonTitle: 'Bài 14. Hoàn thiện sổ lưu niệm',
    topicId: 5,
    topicTitle: 'Chủ đề 5. Ứng dụng tin học',
    level: 'van_dung',
    question: 'Để sản phẩm Sổ lưu niệm lớp 6A hoàn thiện đẹp mắt và trang trọng, thứ tự các phần chính từ trước ra sau nên là:',
    options: [
      'Trang bìa -> Lời ngỏ/Mục lục -> Danh sách thành viên và giáo viên -> Các bài viết cảm nghĩ, hình ảnh kỉ niệm',
      'Các bài viết cảm nghĩ -> Trang bìa -> Danh sách giáo viên',
      'Không cần trang bìa, chỉ in các bức ảnh',
      'Mục lục đặt ở trang bìa sổ'
    ],
    correctAnswer: 0,
    explanation: 'SGK trang 61-62: Bố cục hoàn chỉnh của một cuốn sổ lưu niệm gồm: Trang bìa (Cover Page), giới thiệu chung, danh sách và các bài viết cảm nghĩ, ảnh kỉ niệm.',
    textbookRef: 'SGK Tin học 6 - Trang 61-62'
  },
  {
    id: 'b15-vd-2',
    lessonId: 15,
    lessonTitle: 'Bài 15. Thuật toán',
    topicId: 6,
    topicTitle: 'Chủ đề 6. Giải quyết vấn đề với sự trợ giúp của máy tính',
    level: 'van_dung',
    question: 'Quy trình hướng dẫn gấp hình trò chơi Đông-Tây-Nam-Bắc (SGK trang 63) từ một tờ giấy hình vuông gồm 6 bước rõ ràng có phải là một thuật toán không?',
    options: [
      'Không phải vì đây là trò chơi gấp giấy, không chạy trên máy tính',
      'Phải, vì đó là một dãy các chỉ dẫn rõ ràng, có trình tự tuần tự để hoàn thành nhiệm vụ gấp hình từ đầu vào (tờ giấy) đến đầu ra (hình gấp)',
      'Chỉ những gì có số 0 và 1 mới là thuật toán',
      'Chỉ có giáo viên dạy Tin học mới làm được thuật toán'
    ],
    correctAnswer: 1,
    explanation: 'SGK trang 63-64: Hướng dẫn gấp hình trò chơi gồm 6 bước chính là một thuật toán; trong đó tờ giấy vuông là Đầu vào (Input), hình gấp xong là Đầu ra (Output).',
    textbookRef: 'SGK Tin học 6 - Trang 63-64'
  },
  {
    id: 'b16-th-3',
    lessonId: 16,
    lessonTitle: 'Bài 16. Các cấu trúc điều khiển',
    topicId: 6,
    topicTitle: 'Chủ đề 6. Giải quyết vấn đề với sự trợ giúp của máy tính',
    level: 'thong_hieu',
    question: 'Khi cô giáo điểm danh lớp học bằng cách gọi lần lượt từng bạn trong danh sách: "Nếu bạn có mặt thì đánh dấu có mặt, ngược lại thì đánh dấu vắng mặt; sau đó chuyển sang bạn tiếp theo cho đến hết danh sách". Quá trình điểm danh này kết hợp những cấu trúc điều khiển nào?',
    options: [
      'Cấu trúc tuần tự, cấu trúc rẽ nhánh đủ và cấu trúc lặp',
      'Chỉ có cấu trúc tuần tự',
      'Chỉ có cấu trúc rẽ nhánh thiếu',
      'Không dùng cấu trúc nào'
    ],
    correctAnswer: 0,
    explanation: 'SGK trang 70 (Vận dụng 3): Cô giáo lặp lại việc gọi từng tên (cấu trúc lặp), kiểm tra học sinh có mặt hay vắng mặt (rẽ nhánh đủ) và chuyển sang bạn kế tiếp (tuần tự).',
    textbookRef: 'SGK Tin học 6 - Trang 70, Vận dụng 3'
  },
  {
    id: 'b17-th-2',
    lessonId: 17,
    lessonTitle: 'Bài 17. Chương trình máy tính',
    topicId: 6,
    topicTitle: 'Chủ đề 6. Giải quyết vấn đề với sự trợ giúp của máy tính',
    level: 'thong_hieu',
    question: 'Trong chương trình Scratch tính điểm trung bình (DTB): "Nếu DTB > 8.0 thì nói Bạn được thưởng ngôi sao trong 2 giây, còn không thì nói Bạn cố gắng lên nhé trong 2 giây". Nếu bạn An nhập DTB = 8.5 thì nhân vật sẽ nói gì?',
    options: [
      'Bạn cố gắng lên nhé',
      'Bạn được thưởng ngôi sao',
      'Nhân vật không nói gì cả',
      'Chương trình báo lỗi cú pháp'
    ],
    correctAnswer: 1,
    explanation: 'SGK trang 74, Hình 6.15: Vì 8.5 > 8.0 là Đúng, nhánh "thì" được thực thi và nhân vật sẽ nói "Bạn được thưởng ngôi sao".',
    textbookRef: 'SGK Tin học 6 - Trang 74, Hình 6.15'
  }
];
