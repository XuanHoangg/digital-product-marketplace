import React, { useState, useEffect } from "react";
import "./OTPPopup.scss";
const OTPPopup = ({ isOpen, onClose, email, onVerify, onResend }) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      setCanResend(true);
    }
  }, [isOpen, countdown]);

  const handleInputChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-input-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleSubmit = async () => {
    const otpCode = otp.join("");
    if (otpCode.length === 6) {
      setIsLoading(true);
      try {
        await onVerify(email, otpCode);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleResend = async () => {
    setIsLoading(true);
    try {
      await onResend();
      setCountdown(60);
      setCanResend(false);
      setOtp(["", "", "", "", "", ""]);
    } finally {
      setIsLoading(false);
    }
  };

  const isComplete = otp.every((digit) => digit !== "");

  if (!isOpen) return null;

  return (
    <div className="otp-overlay">
      <div className="otp-popup">
        <div className="otp-header">
          <button
            className="otp-close-btn"
            onClick={onClose}
            aria-label="Đóng popup"
          >
            ×
          </button>
          <div className="otp-icon">📧</div>
          <h2 className="otp-title">Xác nhận mã OTP</h2>
          <p className="otp-description">
            Chúng tôi đã gửi mã xác nhận 6 chữ số đến email
          </p>
          <p className="otp-email">{email}</p>
        </div>

        <div className="otp-form">
          <div className="otp-inputs">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-input-${index}`}
                type="text"
                className="otp-input"
                value={digit}
                onChange={(e) => handleInputChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                maxLength="1"
                autoComplete="off"
              />
            ))}
          </div>

          <button
            onClick={handleSubmit}
            className={`otp-submit-btn ${isComplete ? "active" : ""}`}
            disabled={!isComplete || isLoading}
          >
            {isLoading ? <div className="otp-spinner"></div> : "Xác nhận"}
          </button>
        </div>

        <div className="otp-footer">
          <p className="otp-resend-text">
            Không nhận được mã?
            {canResend ? (
              <button
                className="otp-resend-btn"
                onClick={handleResend}
                disabled={isLoading}
              >
                🔄 Gửi lại
              </button>
            ) : (
              <span className="otp-countdown">Gửi lại sau {countdown}s</span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OTPPopup;
