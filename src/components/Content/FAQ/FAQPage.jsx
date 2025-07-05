import React from "react";
import "./FAQ.scss";
import { useState } from "react";

const FAQPage = () => {
  const [openItems, setOpenItems] = useState({});
  const [showMore, setShowMore] = useState(false);

  const initialFAQs = [
    {
      id: 1,
      category: "Câu Hỏi Phổ Biến",
      question: "Làm thế nào để tạo tài khoản trên DigitalMarket?",
      answer:
        'Để tạo tài khoản trên DigitalMarket, bạn cần nhấp vào nút "Đăng ký" ở góc trên cùng của trang web. Sau đó, điền đầy đủ thông tin cá nhân như tên, email, số điện thoại và tạo mật khẩu mạnh. Sau khi hoàn thành, bạn sẽ nhận được email xác nhận để kích hoạt tài khoản của mình. Vui lòng kiểm tra cả hộp thư rác nếu không thấy email xác nhận trong hộp thư chính.',
    },
    {
      id: 2,
      category: "Câu Hỏi Phổ Biến",
      question: "Chính sách hoàn trả của DigitalMarket là gì?",
      answer:
        "DigitalMarket có chính sách hoàn trả linh hoạt trong vòng 30 ngày kể từ ngày mua hàng. Nếu sản phẩm không đáp ứng được mong đợi của bạn, bạn có thể yêu cầu hoàn trả với điều kiện sản phẩm chưa được sử dụng quá 50% nội dung. Chúng tôi sẽ xem xét và xử lý yêu cầu hoàn trả trong vòng 3-5 ngày làm việc.",
    },
    {
      id: 3,
      category: "Câu Hỏi Phổ Biến",
      question: "Làm thế nào để liên hệ với người bán?",
      answer:
        'Bạn có thể liên hệ với người bán thông qua hệ thống nhắn tin tích hợp trên DigitalMarket. Chỉ cần vào trang sản phẩm và nhấp vào nút "Nhắn tin cho người bán". Bạn cũng có thể xem thông tin liên hệ của người bán nếu họ đã công khai thông tin này.',
    },
    {
      id: 4,
      category: "Câu Hỏi Phổ Biến",
      question:
        "Tại sao tôi thể sử dụng sản phẩm so cho mục đích thương mại không?",
      answer:
        "Việc sử dụng sản phẩm cho mục đích thương mại phụ thuộc vào giấy phép và điều khoản của từng sản phẩm cụ thể. Một số sản phẩm chỉ dành cho mục đích cá nhân, trong khi một số khác có thể được sử dụng cho mục đích thương mại. Vui lòng kiểm tra kỹ mô tả sản phẩm và liên hệ với người bán để được tư vấn chi tiết.",
    },
    {
      id: 5,
      category: "Câu Hỏi Phổ Biến",
      question: "Các phương thức thanh toán được chấp nhận?",
      answer:
        "DigitalMarket chấp nhận nhiều phương thức thanh toán bao gồm: thẻ tín dụng/ghi nợ Visa, MasterCard, chuyển khoản ngân hàng, ví điện tử như MoMo",
    },
    {
      id: 6,
      category: "Câu Hỏi Phổ Biến",
      question: "Làm thế nào để tải xuống sản phẩm so sau khi mua?",
      answer:
        'Sau khi thanh toán thành công, bạn sẽ nhận được email chứa link tải xuống. Bạn cũng có thể truy cập vào mục "Đơn hàng của tôi" trong tài khoản để tải xuống sản phẩm. Link tải xuống sẽ có hiệu lực trong vòng 1 năm kể từ ngày mua.',
    },
    {
      id: 7,
      category: "Câu Hỏi Phổ Biến",
      question: "Tôi có thể bán những sản phẩm nào trên DigitalMarket?",
      answer:
        "Bạn có thể bán các sản phẩm số như: template website, logo, ảnh stock, video, âm thanh, font chữ, plugin, theme, khóa học online, ebook, và các sản phẩm kỹ thuật số khác. Tất cả sản phẩm phải là bản quyền của bạn hoặc bạn có quyền bán hợp pháp.",
    },
    {
      id: 8,
      category: "Tài Khoản",
      question: "Làm thế nào để đổi mật khẩu tài khoản?",
      answer:
        'Để đổi mật khẩu, bạn đăng nhập vào tài khoản và vào mục "Cài đặt tài khoản". Nhấp vào "Đổi mật khẩu", nhập mật khẩu cũ và mật khẩu mới. Mật khẩu mới phải có ít nhất 8 ký tự và bao gồm cả chữ hoa, chữ thường, số và ký tự đặc biệt.',
    },
    {
      id: 9,
      category: "Tài Khoản",
      question: "Làm thế nào để kích hoạt xác thực hai yếu tố (2FA)?",
      answer:
        'Để kích hoạt 2FA, vào mục "Bảo mật" trong cài đặt tài khoản. Chọn "Kích hoạt xác thực hai yếu tố" và làm theo hướng dẫn. Bạn sẽ cần cài đặt một ứng dụng xác thực như Google Authenticator hoặc Authy trên điện thoại để hoàn tất quá trình.',
    },
    {
      id: 10,
      category: "Tài Khoản",
      question: "Tôi có thể thay đổi địa chỉ email đã đăng ký không?",
      answer:
        'Có, bạn có thể thay đổi địa chỉ email trong mục "Thông tin cá nhân" của tài khoản. Sau khi thay đổi, bạn sẽ nhận được email xác nhận tại địa chỉ email mới. Vui lòng xác nhận email mới trong vòng 24 giờ để hoàn tất quá trình thay đổi.',
    },
  ];

  const additionalFAQs = [
    {
      id: 12,
      category: "Thanh Toán",
      question: "Tôi có thể thanh toán bằng tiền mặt không?",
      answer:
        "DigitalMarket chủ yếu hỗ trợ thanh toán trực tuyến nên không hỗ trợ thanh toán bằng tiền mặt. Quý khách vui lòng sử dụng các phương thức thanh toán trực tuyến như thẻ tín dụng, chuyển khoản ngân hàng hoặc ví điện tử để thực hiện giao dịch.",
    },
    {
      id: 13,
      category: "Thanh Toán",
      question: "Làm thế nào để nhận hóa đơn VAT?",
      answer:
        "Để nhận hóa đơn VAT, bạn cần cung cấp thông tin công ty đầy đủ khi thanh toán. Hóa đơn VAT sẽ được gửi qua email trong vòng 3-5 ngày làm việc sau khi thanh toán thành công.",
    },
    {
      id: 14,
      category: "Kỹ Thuật",
      question: "Tôi gặp lỗi khi tải xuống sản phẩm, phải làm sao?",
      answer:
        "Nếu bạn gặp lỗi khi tải xuống, vui lòng thử lại sau vài phút hoặc sử dụng trình duyệt khác. Nếu vẫn không được, hãy liên hệ với bộ phận hỗ trợ kỹ thuật, cung cấp thông tin chi tiết về lỗi để chúng tôi hỗ trợ bạn tốt nhất.",
    },
    {
      id: 15,
      category: "Kỹ Thuật",
      question: "Website hoạt động chậm, nguyên nhân là gì?",
      answer:
        "Website có thể hoạt động chậm do nhiều nguyên nhân như kết nối internet không ổn định, cache trình duyệt, hoặc lưu lượng truy cập cao. Bạn có thể thử xóa cache trình duyệt, kiểm tra kết nối internet hoặc truy cập vào thời gian khác.",
    },
  ];

  const toggleItem = (id) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  const displayedFAQs = showMore
    ? [...initialFAQs, ...additionalFAQs]
    : initialFAQs;

  const groupedFAQs = displayedFAQs.reduce((acc, faq) => {
    const category = faq.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(faq);
    return acc;
  }, {});

  return (
    <div className="faq-container">
      <div className="faq-hero">
        <div className="faq-hero__content">
          <h1 className="faq-hero__title">Câu Hỏi Thường Gặp</h1>
          <p className="faq-hero__subtitle">
            Tìm câu trả lời nhanh chóng cho những thắc mắc phổ biến về sản phẩm
            và dịch vụ của chúng tôi
          </p>
        </div>
      </div>

      <div className="faq-content">
        <div className="faq-wrapper">
          {Object.entries(groupedFAQs).map(([category, faqs]) => (
            <div key={category} className="faq-section">
              <h2 className="faq-section__title">{category}</h2>
              <div className="faq-list">
                {faqs.map((faq) => (
                  <div key={faq.id} className="faq-item">
                    <div
                      className="faq-item__question"
                      onClick={() => toggleItem(faq.id)}
                    >
                      <span className="faq-item__question-text">
                        {faq.question}
                      </span>
                      <span
                        className={`faq-item__arrow ${
                          openItems[faq.id] ? "faq-item__arrow--open" : ""
                        }`}
                      >
                        <svg
                          width="12"
                          height="8"
                          viewBox="0 0 12 8"
                          fill="none"
                        >
                          <path
                            d="M1 1L6 6L11 1"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </div>
                    {openItems[faq.id] && (
                      <div className="faq-item__answer">
                        <p className="faq-item__answer-text">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="faq-actions">
          <button className="faq-actions__btn" onClick={toggleShowMore}>
            {showMore ? "Thu gọn" : "Xem thêm"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
