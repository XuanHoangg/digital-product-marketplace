const getShortName = (fullName) => {
  if (!fullName || fullName.trim() === "" || fullName === "Chưa có tên") {
    return "Unk";
  }

  const words = fullName.trim().split(" ");
  if (words.length === 1) {
    return words[0].substring(0, 2).toUpperCase(); // TO
  }

  const last = words[words.length - 1]; // Từ cuối
  const secondLast = words[words.length - 2]; // Từ gần cuối

  return (secondLast[0] + last[0]).toUpperCase(); // VD: Trần Diệu → TD
};

export { getShortName };
