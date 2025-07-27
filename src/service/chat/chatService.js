// // src/services/chatService.js
// import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";

// let connection;

// export const startConnection = async (userId, onReceiveMessage) => {
//   connection = new HubConnectionBuilder()
//     .withUrl(`${process.env.REACT_APP_API_BASE}/chatHub?userId=${userId}`)
//     .configureLogging(LogLevel.Information)
//     .withAutomaticReconnect()
//     .build();

//   connection.on("ReceiveMessage", (message) => {
//     onReceiveMessage(message); // callback cập nhật tin nhắn
//   });

//   try {
//     await connection.start();
//     console.log("SignalR connected.");
//   } catch (err) {
//     console.error("SignalR connection error: ", err);
//   }
// };

// export const sendMessage = async (receiverId, content) => {
//   if (connection && connection.state === "Connected") {
//     await connection.invoke("SendMessage", {
//       receiverId,
//       content,
//       timestamp: new Date().toISOString(),
//     });
//   }
// };

// export const stopConnection = async () => {
//   if (connection) {
//     await connection.stop();
//   }
// };
// src/services/chatService.js
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";

let connection;

const API_BASE = import.meta.env.VITE_API_BASE;

export const startConnection = async (userId, onReceiveMessage) => {
  if (!API_BASE) {
    console.error("❌ Không tìm thấy VITE_API_BASE trong .env");
    return;
  }

  connection = new HubConnectionBuilder()
    .withUrl(`${API_BASE}/chatHub?userId=${userId}`)
    .configureLogging(LogLevel.Information)
    .withAutomaticReconnect()
    .build();

  connection.on("ReceiveMessage", (message) => {
    onReceiveMessage(message);
  });

  try {
    await connection.start();
    console.log("✅ SignalR connected.");
  } catch (err) {
    console.error("❌ SignalR connection error: ", err);
  }
};

export const sendMessage = async (receiverId, content) => {
  if (connection && connection.state === "Connected") {
    try {
      await connection.invoke("SendMessage", receiverId, content);
    } catch (err) {
      console.error("❌ SendMessage error: ", err);
    }
  }
};
export const stopConnection = async () => {
  if (connection) {
    await connection.stop();
  }
};
