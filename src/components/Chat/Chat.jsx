import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import styles from "./Chat.module.scss";
import {
  startConnection,
  sendMessage,
  stopConnection,
} from "@service/chat/chatService";
import { useEffect } from "react";
import {
  sellerChatHistory,
  buyerChatHistory,
  buyerSendMessage,
  sellerSendMessage,
} from "@service/chat/chatAPI";

const Chat = ({ onClose, receiverId, storeId, isBuyer }) => {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);
  const userId = useSelector((state) => state?.auth?.account?.userId);
  const bottomRef = useRef(null);
  const didInitRef = useRef(false);
  // Kết nối khi mở chat
  useEffect(() => {
    fetchHistory();

    // Real-time SignalR
    startConnection(userId, (message) => {
      setMessages((prev) => [
        ...prev,
        {
          id: message.id, // nếu server gửi
          content: message.content,
          // dùng đúng trường:
          isOwn: message.isOwnMessage,
          time: new Date(message.receiveAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    });

    return () => {
      stopConnection();
    };
  }, [userId, receiverId, storeId, isBuyer]);
  useEffect(() => {
    if (bottomRef.current) {
      setTimeout(() => {
        if (!didInitRef.current) {
          bottomRef.current.scrollIntoView({ behavior: "auto" });
          didInitRef.current = true;
        } else {
          bottomRef.current.scrollIntoView({ behavior: "smooth" });
        }
      }, 0); // delay cực nhỏ sau render
    }
  }, [messages]);

  const fetchHistory = async () => {
    try {
      let history = [];

      // Giả định là buyer đang đăng nhập
      if (isBuyer) {
        const res = await buyerChatHistory({
          StoreId: storeId,
          UserId: userId,
        });
        console.log("Lịch sử chat:", res);
        history = res.data.messages.map((msg) => ({
          id: msg.id, // nếu có
          content: msg.content,
          // dùng đúng tên boolean từ API:
          isOwn: msg.isOwnMessage,
          // parse đúng trường receiveAt:
          time: new Date(msg.receiveAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        }));
      } else {
        const res = await sellerChatHistory({
          BuyerId: receiverId,
          StoreId: storeId,
          SellerId: userId,
        });
        history = res.map((msg) => ({
          ...msg,
          isOwn: msg.senderId === userId,
          time: new Date(msg.timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        }));
      }

      setMessages(history);
    } catch (err) {
      console.error("Lỗi load lịch sử:", err);
    }
  };
  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const timestamp = new Date();
    const formattedTime = timestamp.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const message = {
      senderId: userId,
      receiverId,
      content: inputValue,
      isOwn: true,
      time: formattedTime,
    };

    setMessages((prev) => [...prev, message]);

    // Gửi qua SignalR
    await sendMessage(receiverId, inputValue);

    // Gửi lưu DB qua API
    if (isBuyer) {
      await buyerSendMessage({
        storeId,
        userId,
        content: inputValue,
      });
    } else {
      await sellerSendMessage({
        storeId,
        sellerId: userId,
        buyerId: receiverId,
        message: inputValue,
      });
    }

    setInputValue("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  const handleInputChange = (e) => setInputValue(e.target.value);

  return (
    <div className={styles.chatContainer}>
      {/* Chat Header */}
      <div className={styles.chatHeader}>
        <div className={styles.headerLeft}>
          <div className={styles.avatar}>
            <span className={styles.avatarText}>DS</span>
          </div>
          <span className={styles.userName}>DesignStudio</span>
        </div>
        <button className={styles.closeButton} onClick={onClose}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M12 4L4 12M4 4L12 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {/* Chat Messages */}
      <div className={styles.chatMessages}>
        {messages.map((message, index) => (
          <div
            key={message.id || index}
            className={`${styles.messageGroup} ${
              message.isOwn ? styles.messageGroupOwn : styles.messageGroupOther
            }`}
          >
            {!message.isOwn && (
              <div className={styles.messageAvatar}>
                <span className={styles.avatarText}>{message.avatar}</span>
              </div>
            )}
            <div className={styles.messageContent}>
              <div
                className={`${styles.messageBubble} ${
                  message.isOwn
                    ? styles.messageBubbleOwn
                    : styles.messageBubbleOther
                }`}
              >
                <p className={styles.messageText}>{message.content}</p>
              </div>
              <div
                className={`${styles.messageTime} ${
                  message.isOwn
                    ? styles.messageTimeOwn
                    : styles.messageTimeOther
                }`}
              >
                {message.time}
              </div>
            </div>
          </div>
        ))}
        {/* Scroll target */}
        <div ref={bottomRef} />
      </div>

      {/* Chat Input */}
      <div className={styles.chatInput}>
        <div className={styles.inputContainer}>
          <input
            type="text"
            className={styles.textInput}
            placeholder="Nhập tin nhắn của bạn..."
            value={inputValue}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
          <button
            className={styles.sendButton}
            onClick={handleSendMessage}
            disabled={!inputValue.trim()}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
