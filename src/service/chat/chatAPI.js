import axios from "../../utils/axiosCustom";
const sellerChatHistory = async ({ BuyerId, StoreId, SellerId }) => {
  return await axios.get("api/Seller/chat", {
    params: { BuyerId, StoreId, SellerId },
  });
};
const buyerChatHistory = async ({ StoreId, UserId }) => {
  return await axios.get("api/Buyer/chat", {
    params: { StoreId, UserId },
  });
};
const buyerSendMessage = async ({ storeId, userId, content }) => {
  return await axios.post("api/Buyer/send-message", {
    storeId,
    userId,
    content,
  });
};
const sellerSendMessage = async ({ buyerId, message, sellerId, storeId }) => {
  return await axios.post("api/Seller/send-message", {
    buyerId,
    message,
    sellerId,
    storeId,
  });
};

export {
  sellerChatHistory,
  buyerChatHistory,
  buyerSendMessage,
  sellerSendMessage,
};
