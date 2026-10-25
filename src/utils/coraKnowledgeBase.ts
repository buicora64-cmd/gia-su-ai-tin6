/**
 * Knowledge Base & Intelligent Response Engine for "Gia Sư Cô Ra AI"
 * Môn: Tin học 6 - Kết nối tri thức với cuộc sống
 */

export interface SuggestedQuestion {
  id: string;
  text: string;
  lessonId?: number;
}

export const SUGGESTED_QUESTIONS: SuggestedQuestion[] = [
  {
    id: 'sq-1',
    text: 'Phân biệt thiết bị vào và thiết bị ra?',
    lessonId: 2,
  },
  {
    id: 'sq-2',
    text: 'Dãy bit là gì và cách tính dung lượng B, KB, MB, GB?',
    lessonId: 3,
  },
  {
    id: 'sq-3',
    text: '5 quy tắc an toàn Internet SMART gồm những gì?',
    lessonId: 9,
  },
  {
    id: 'sq-4',
    text: 'Cách tạo và định dạng bảng biểu trong Word?',
    lessonId: 12,
  },
  {
    id: 'sq-5',
    text: 'Giải thích cấu trúc rẽ nhánh và cấu trúc lặp?',
    lessonId: 16,
  },
  {
    id: 'sq-6',
    text: 'Các nhóm lệnh cơ bản trong Scratch là gì?',
    lessonId: 17,
  },
  {
    id: 'sq-7',
    text: 'Lợi ích của mạng máy tính và Internet là gì?',
    lessonId: 4,
  },
  {
    id: 'sq-8',
    text: 'Sơ đồ tư duy là gì và cách vẽ chuẩn Tony Buzan?',
    lessonId: 10,
  },
];

export function generateCoraFallbackResponse(userInput: string, lessonId?: number): string {
  const query = userInput.toLowerCase();

  // 1. Phân biệt thiết bị vào và ra
  if (query.includes('thiết bị vào') || query.includes('thiết bị ra') || query.includes('bộ phận') || query.includes('chuột') || query.includes('bàn phím') || query.includes('cpu')) {
    return `Chào em! Cô hướng dẫn em phân biệt **Thiết bị vào** và **Thiết bị ra** của máy tính rất dễ nhớ nhé (theo SGK Tin học 6 - Bài 2, trang 9):

1. **Thiết bị vào (Input devices):**
   - **Chức năng:** Dùng để đưa dữ liệu, thông tin từ thế giới bên ngoài vào trong máy tính.
   - **Ví dụ tiêu biểu:** Bàn phím (gõ văn bản), Chuột (điều khiển con trỏ), Máy quét Scanner (quét ảnh), Micro (thu âm thanh), Webcam (thu hình ảnh).

2. **Thiết bị ra (Output devices):**
   - **Chức năng:** Dùng để truyền/xuất dữ liệu, thông tin sau khi máy tính đã xử lý ra cho con người tiếp nhận.
   - **Ví dụ tiêu biểu:** Màn hình (hiển thị hình ảnh/chữ), Máy in (in ra giấy), Loa & Tai nghe (phát âm thanh), Máy chiếu Projector.

3. **Bộ não của máy tính:**
   - **CPU (Bộ xử lý trung tâm):** Đóng vai trò như bộ não, chịu trách nhiệm tính toán và điều khiển toàn bộ hoạt động.

💡 **Mẹo nhớ nhanh của Cô:** "Vào để nhận lệnh và dữ liệu - Ra để hiển thị kết quả cho em xem và nghe!". Chúc em học tốt nhé!`;
  }

  // 2. Dãy bit và đơn vị đo dung lượng
  if (query.includes('bit') || query.includes('byte') || query.includes('dung lượng') || query.includes('kb') || query.includes('mb') || query.includes('gb') || query.includes('tb')) {
    return `Chào em! Cô giải thích cho em về **Thông tin trong máy tính & Dãy Bit** nhé (SGK Tin học 6 - Bài 3, trang 12 - 15):

1. **Dãy Bit là gì?**
   - Máy tính điện tử chỉ hiểu và xử lý các dãy bit gồm hai chữ số **0** và **1** (hệ nhị phân).
   - **Bit (Binary digit):** Là đơn vị nhỏ nhất để đo dung lượng thông tin.

2. **Đơn vị Byte:**
   - **1 Byte (B) = 8 bit.** (1 Byte thường biểu diễn được 1 chữ cái hoặc 1 con số).

3. **Bảng quy đổi các đơn vị đo dung lượng thông tin (mỗi đơn vị sau gấp 1 024 lần đơn vị trước):**
   - **1 Byte (B)** = 8 bit
   - **1 Kilobyte (KB)** = 1 024 Byte (xấp xỉ 1 nghìn Byte)
   - **1 Megabyte (MB)** = 1 024 KB (xấp xỉ 1 triệu Byte)
   - **1 Gigabyte (GB)** = 1 024 MB (xấp xỉ 1 tỉ Byte)
   - **1 Terabyte (TB)** = 1 024 GB (xấp xỉ 1 nghìn tỉ Byte)

💡 **Ví dụ thực tế:** Một chiếc thẻ nhớ điện thoại **16 GB** có thể chứa được khoảng **4 000 bài hát** MP3 hoặc hàng chục nghìn bức ảnh chụp đấy em nhé!`;
  }

  // 3. Quy tắc an toàn Internet SMART
  if (query.includes('an toàn') || query.includes('smart') || query.includes('mật khẩu') || query.includes('bảo mật') || query.includes('nguy cơ') || query.includes('bắt nạt')) {
    return `Chào em! Việc bảo vệ bản thân trên mạng Internet là cực kỳ quan trọng đối với học sinh lớp 6. Em hãy ghi nhớ **Quy tắc SMART** (SGK Tin học 6 - Bài 9, trang 39) nhé:

- 🛡️ **S - Safe (Giữ an toàn):** Giữ bí mật thông tin cá nhân (họ tên đầy đủ, ngày sinh, địa chỉ nhà, trường lớp, số điện thoại) và tuyệt đối không chia sẻ mật khẩu cho người khác.
- 🤝 **M - Meet (Không gặp gỡ):** Không bao giờ đồng ý gặp gỡ một mình với người lạ mới quen trên mạng ngoài đời thực khi chưa có sự cho phép và đi cùng của cha mẹ.
- 🚫 **A - Accepting (Đừng chấp nhận):** Không mở tệp đính kèm lạ, không nhấp vào liên kết đáng ngờ trong email hoặc tin nhắn trúng thưởng vì có thể chứa virus và mã độc.
- 🔍 **R - Reliable (Kiểm tra độ tin cậy):** Thông tin trên mạng có thể đúng hoặc sai. Trước khi tin hay chia sẻ (share), hãy kiểm chứng từ nguồn chính thống (.gov, báo đài, hỏi thầy cô).
- 🗣️ **T - Tell (Hãy nói ra):** Khi gặp bất kỳ điều gì làm em lo lắng, sợ hãi, khó chịu hoặc bị đe dọa, hãy tâm sự ngay với cha mẹ hoặc thầy cô giáo để được bảo vệ.

💡 **Mẹo đặt mật khẩu mạnh:** Từ 8 ký tự trở lên, kết hợp chữ hoa, chữ thường, số và ký tự đặc biệt (VD: *ToiYeuTinHoc#6!*).`;
  }

  // 4. Bảng biểu trong Word
  if (query.includes('bảng') || query.includes('table') || query.includes('gộp ô') || query.includes('tách ô') || query.includes('merge') || query.includes('insert table')) {
    return `Chào em! Cô hướng dẫn em các thao tác với **Bảng biểu trong Word** (SGK Tin học 6 - Bài 12, trang 53 - 57) nhé:

1. **Cách tạo bảng mới:**
   - Vào thẻ **Insert** -> chọn nút **Table** -> kéo rê chuột để chọn số hàng và số cột mong muốn (hoặc chọn *Insert Table* rồi gõ số cột, số hàng).

2. **Chèn thêm hàng hoặc cột:**
   - Nhấp chuột vào một ô trong bảng, vào thẻ **Layout (Table Tools)**:
     + **Insert Above:** Chèn hàng mới phía trên.
     + **Insert Below:** Chèn hàng mới phía dưới.
     + **Insert Left:** Chèn cột mới bên trái.
     + **Insert Right:** Chèn cột mới bên phải.

3. **Gộp ô và Tách ô:**
   - **Gộp ô (Merge Cells):** Bôi đen các ô cần gộp -> chọn lệnh **Merge Cells**.
   - **Tách ô (Split Cells):** Đặt con trỏ vào ô cần chia -> chọn **Split Cells** -> nhập số hàng, số cột cần tách.

4. **Xóa hàng, cột hoặc bảng:**
   - Chọn **Delete** -> chọn *Delete Columns* (xóa cột), *Delete Rows* (xóa hàng) hoặc *Delete Table* (xóa cả bảng).

💡 **Ứng dụng:** Rất tuyệt vời để làm Thời khóa biểu, Sổ điểm tổ, Bảng thống kê chi tiêu học tập!`;
  }

  // 5. Cấu trúc điều khiển và thuật toán
  if (query.includes('cấu trúc') || query.includes('rẽ nhánh') || query.includes('lặp') || query.includes('tuần tự') || query.includes('thuật toán') || query.includes('sơ đồ khối')) {
    return `Chào em! Đây là phần kiến thức rất thú vị trong Chủ đề 6 (SGK Tin học 6 - Bài 15 & 16, trang 63 - 70):

1. **Thuật toán là gì?**
   - Thuật toán là một dãy các chỉ dẫn rõ ràng, có trình tự để giải quyết một vấn đề nhằm đạt được kết quả mong muốn từ dữ liệu đầu vào (Input -> Output).

2. **Ba cấu trúc điều khiển cơ bản:**
   - **Cấu trúc tuần tự:** Các thao tác thực hiện lần lượt từ đầu đến cuối theo đúng thứ tự (VD: Đeo khăn quàng -> Mặc áo đồng phục -> Đi giày).
   - **Cấu trúc rẽ nhánh:**
     + *Dạng thiếu:* Nếu <điều kiện đúng> thì <làm việc A>.
     + *Dạng đủ:* Nếu <điều kiện đúng> thì <làm việc A>, ngược lại <làm việc B>. (VD: Nếu điểm >= 5 thì Đạt, ngược lại Chưa đạt).
   - **Cấu trúc lặp:** Thực hiện lặp đi lặp lại một hoặc nhiều thao tác (VD: Mỗi sáng tập thể dục 15 nhịp nhảy dây; Lặp lại việc điểm danh từng bạn cho đến hết lớp).

3. **Ký hiệu Sơ đồ khối:**
   - ⭕ **Hình elip/ô-van:** Bắt đầu / Kết thúc.
   - ▱ **Hình bình hành:** Nhập (Input) / Xuất dữ liệu (Output).
   - ▭ **Hình chữ nhật:** Thao tác tính toán, xử lý.
   - ◊ **Hình thoi:** Kiểm tra điều kiện (Đúng/Sai).
   - ➡️ **Mũi tên:** Hướng đi tiếp theo của luồng thực hiện.`;
  }

  // 6. Scratch & Chương trình máy tính
  if (query.includes('scratch') || query.includes('chương trình') || query.includes('ngôn ngữ lập trình') || query.includes('cờ xanh') || query.includes('khối lệnh')) {
    return `Chào em! Lập trình trực quan **Scratch** là một môi trường học tập vô cùng sáng tạo (SGK Tin học 6 - Bài 17, trang 71 - 74):

1. **Khái niệm:**
   - Chương trình máy tính là tập hợp các lệnh chỉ dẫn cho máy tính thực hiện thuật toán.
   - **Scratch** là ngôn ngữ lập trình trực quan bằng cách ghép các khối lệnh nhiều màu sắc giống như trò chơi ghép hình lego.

2. **Các nhóm khối lệnh Scratch cơ bản:**
   - 🟡 **Sự kiện (Events - màu vàng):** Khởi động kịch bản, như khối *"Khi bấm vào lá cờ xanh"*.
   - 🔵 **Chuyển động (Motion - màu xanh lam):** Điều khiển nhân vật di chuyển (*"di chuyển 10 bước"*, *"xoay 90 độ"*, *"đi tới điểm x: y:"*).
   - 🟣 **Hiển thị (Looks - màu tím):** Làm nhân vật nói, đổi trang phục (*"nói Xin chào! trong 2 giây"*).
   - 🟠 **Điều khiển (Control - màu cam):** Chứa các cấu trúc rẽ nhánh và lặp (*"lặp lại 10 lần"*, *"liên tục"*, *"nếu ... thì ... không thì"*).
   - 💠 **Cảm biến (Sensing - màu xanh lơ):** Tương tác với người dùng (*"hỏi ... và đợi"*, *"đang chạm vào con trỏ chuột"*).
   - 🟢 **Phép toán (Operators - màu xanh lá):** Các phép tính cộng, trừ, nhân, chia, so sánh lớn hơn (>), nhỏ hơn (<), bằng (=).

💡 **Thử thách nhỏ:** Em thử ghép khối *Lặp lại 4 lần: [Di chuyển 100 bước, Xoay 90 độ]* để chú mèo vẽ một hình vuông hoàn chỉnh nhé!`;
  }

  // 7. Sơ đồ tư duy
  if (query.includes('sơ đồ tư duy') || query.includes('mindmap') || query.includes('tony buzan') || query.includes('nhánh')) {
    return `Chào em! **Sơ đồ tư duy (Mindmap)** là công cụ học tập siêu việt do tác giả **Tony Buzan** sáng tạo (SGK Tin học 6 - Bài 10, trang 42 - 47):

1. **Cấu trúc chuẩn của một sơ đồ tư duy:**
   - 🎯 **Chủ đề chính:** Nằm ở chính giữa trang giấy/màn hình, được vẽ to, kèm hình ảnh minh họa sinh động và màu sắc nổi bật.
   - 🌿 **Nhánh chính (nhánh cấp 1):** Nối từ chủ đề chính, vẽ đường cong nét đậm, mỗi nhánh mang một từ khóa chính và một màu sắc riêng.
   - 🍃 **Nhánh con (cấp 2, cấp 3...):** Tỏa ra từ nhánh chính, vẽ nét mảnh dần, chi tiết hóa các ý nhỏ.

2. **Tại sao sơ đồ tư duy giúp học giỏi và nhớ lâu?**
   - Kết hợp cả 2 bán cầu não: Bán cầu não trái (từ ngữ, logic) + Bán cầu não phải (hình ảnh, màu sắc, không gian).
   - Giúp em nhìn thấy bức tranh tổng thể của bài học chỉ trong một trang giấy duy nhất!

💡 **Phần mềm máy tính khuyên dùng:** MindMaple Lite, XMind, Canva, Coggle.`;
  }

  // 8. Định dạng văn bản Word
  if (query.includes('định dạng') || query.includes('căn lề') || query.includes('phông chữ') || query.includes('font') || query.includes('paragraph') || query.includes('in đậm') || query.includes('page setup')) {
    return `Chào em! Cô hướng dẫn em các kỹ năng cốt lõi về **Định dạng văn bản trong Word** (SGK Tin học 6 - Bài 11, trang 48 - 52):

1. **Định dạng ký tự (nhóm Font - thẻ Home):**
   - **Font:** Chọn phông chữ (như Arial, Times New Roman).
   - **Size:** Cỡ chữ (thường dùng 13 hoặc 14 cho văn bản chuẩn).
   - **Kiểu chữ:** **B (Ctrl+B - In đậm)**, *I (Ctrl+I - In nghiêng)*, <u>U (Ctrl+U - Gạch chân)</u>.
   - **Font Color:** Đổi màu chữ; **Text Highlight Color:** Đánh dấu màu nền chữ.

2. **Định dạng đoạn văn (nhóm Paragraph - thẻ Home):**
   - **Căn lề:**
     + Ctrl + L: Căn lề trái.
     + Ctrl + E: Căn giữa (thường dùng cho Tiêu đề).
     + Ctrl + R: Căn lề phải.
     + Ctrl + J: Căn đều 2 bên (chuẩn mực cho các bài văn, báo cáo).
   - **Khoảng cách dòng (Line Spacing):** Thường chọn 1.15 hoặc 1.5 dòng.

3. **Thiết lập trang in (Page Setup - thẻ Layout):**
   - **Orientation:** Hướng giấy (Portrait: Đứng; Landscape: Ngang).
   - **Size:** Khổ giấy (chuẩn quốc tế là **A4**).
   - **Margins:** Căn lề trang (Top: Trên, Bottom: Dưới, Left: Trái, Right: Phải).`;
  }

  // 9. Tìm kiếm và thay thế
  if (query.includes('tìm kiếm') || query.includes('thay thế') || query.includes('find') || query.includes('replace') || query.includes('ctrl+f') || query.includes('ctrl+h')) {
    return `Chào em! Công cụ **Tìm kiếm và Thay thế (Find and Replace)** trong Word (SGK Tin học 6 - Bài 13, trang 58 - 60) là trợ thủ đắc lực:

1. **Tìm kiếm (Find):**
   - Phím tắt: **Ctrl + F** (hoặc chọn nút Find trong nhóm Editing thẻ Home).
   - Tác dụng: Tìm kiếm cực nhanh một từ hoặc cụm từ trong tài liệu dài hàng chục, hàng trăm trang.

2. **Thay thế (Replace):**
   - Phím tắt: **Ctrl + H** (hoặc chọn nút Replace).
   - **Find what:** Gõ từ cũ cần tìm.
   - **Replace with:** Gõ từ mới cần thay vào.
   - **Replace:** Thay thế lần lượt từng vị trí.
   - **Replace All:** Tự động sửa đồng loạt tất cả các từ trong toàn bộ văn bản chỉ trong 1 giây!

💡 **Lợi ích:** Tiết kiệm thời gian, sửa lỗi chính tả đồng loạt không lo bị sót lỗi.`;
  }

  // 10. Mạng máy tính & Internet
  if (query.includes('mạng') || query.includes('internet') || query.includes('wifi') || query.includes('isp') || query.includes('email') || query.includes('www')) {
    return `Chào em! Kiến thức về **Mạng máy tính và Internet** (Chủ đề 2 & 3, trang 16 - 36):

1. **Mạng máy tính:**
   - Là tập hợp 2 hay nhiều máy tính kết nối để truyền thông tin và chia sẻ tài nguyên (như dùng chung máy in, chia sẻ tệp dữ liệu).
   - Thành phần: Thiết bị đầu cuối (máy tính, điện thoại), Thiết bị kết nối (cáp mạng, Switch, Router Wi-Fi) và Phần mềm mạng.

2. **Internet:**
   - Mạng toàn cầu kết nối hàng triệu mạng máy tính trên khắp thế giới.
   - Không thuộc quyền sở hữu riêng của bất kỳ ai. Người dùng đăng ký qua nhà cung cấp dịch vụ mạng (**ISP** như VNPT, Viettel, FPT).

3. **Mạng thông tin toàn cầu (WWW):**
   - World Wide Web là mạng lưới liên kết các website trên Internet qua siêu liên kết (hyperlinks).
   - Mở website bằng **Trình duyệt web** (Google Chrome, MS Edge, Firefox, Cốc Cốc).

4. **Thư điện tử (Email):**
   - Có cấu trúc: \`<tên_đăng_nhập>@<tên_máy_chủ_dịch_vụ>\` (VD: *buicora64@gmail.com*).
   - Biểu tượng kẹp ghim dùng để đính kèm tệp tài liệu, ảnh, bài tập.`;
  }

  // Default encouraging reply
  return `Chào em! Cô là **Cô Ra AI** - Gia sư Tin học 6 đồng hành cùng em.

Câu hỏi của em: "${userInput}".

Để nắm chắc nội dung này theo sách giáo khoa **Tin học 6 - Kết nối tri thức với cuộc sống**, em có thể tham khảo:
- Môn Tin học 6 gồm 6 chủ đề chính bao quát 17 bài học (Thông tin dữ liệu, Mạng & Internet, An toàn số, Sơ đồ tư duy, Soạn thảo Word, Bảng biểu, Thuật toán và Lập trình Scratch).
- Em có thể bấm chọn một trong các gợi ý câu hỏi nhanh ở trên hoặc gõ câu hỏi cụ thể hơn (ví dụ: *"Giải thích giúp em bài 15 về thuật toán"* hay *"Cách làm bài thực hành Scratch"*) để cô hướng dẫn em thật chi tiết từng bước nhé!

Chúc em học thật vui và đạt điểm 10 môn Tin học 6! 🌟`;
}
