import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { putProfileMini } from "../../../../service/user/userAPI";
import { toast } from "react-toastify";
function Profile(props) {
  const userId = useSelector((state) => state.auth.account.userId);

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [binaryData, setBinaryData] = useState(null);
  const [restoredImage, setRestoredImage] = useState(null);

  // Chọn ảnh và tạo preview
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result.split(",")[1];
      setPreviewImage(reader.result);
      setBinaryData(base64String); // Lưu base64 để giả lập lưu DB
    };
    reader.readAsDataURL(file);
  };

  // Giả lập load từ DB (chuyển base64 về ảnh)
  const handleRestoreImage = () => {
    if (binaryData) {
      const dataUrl = "data:image/jpeg;base64," + binaryData;
      setRestoredImage(dataUrl);
    }
  };
  const handleUpdateImage = async () => {
    if (binaryData === null) {
      toast.error("Vui lòng chọn ảnh trước khi lưu.");
      return;
    }

    let fullName = props.fullname;
    let email = props.email;
    let data = await putProfileMini(userId, fullName, binaryData, email);
    if (data?.status === 0) {
      toast.success(data.messageResult);
      setSelectedFile(null);
      setPreviewImage(null);
      setBinaryData(null);
      setRestoredImage(null);
      props.onUpdated();
      props.onHide(); // Close the modal after successful update
    } else {
      toast.error(data.messageResult);
    }
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Cập nhật ảnh đại diện
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Chọn ảnh</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
        </Form.Group>

        {previewImage && (
          <div className="mb-3">
            <p>
              <strong>Ảnh preview:</strong>
            </p>
            <img
              src={previewImage}
              alt="preview"
              width="200"
              style={{ borderRadius: "8px" }}
            />
          </div>
        )}

        <Button
          onClick={handleUpdateImage}
          style={{
            border: "1px solid #0d6efd",
            backgroundColor: "#0d6efd",
            color: "white",
          }}
        >
          Lưu ảnh
        </Button>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={props.onHide}
          style={{
            border: "1px solid #0d6efd",
            backgroundColor: "#0d6efd",
            color: "white",
          }}
        >
          Đóng
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Profile;
