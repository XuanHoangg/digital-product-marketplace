const getShortName = (fullName) => {
  if (!fullName || fullName.trim() === "" || fullName === "Chưa có tên") {
    return "Unk";
  }

  const words = fullName.trim().split(" ");
  if (words.length === 1) {
    return words[0].substring(0, 2).toUpperCase();
  }

  const last = words[words.length - 1];
  const secondLast = words[words.length - 2];

  return (secondLast[0] + last[0]).toUpperCase();
};

// hàm chuyển ảnh thành base64
const convertFileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};
export { getShortName, convertFileToBase64 };
