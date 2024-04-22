import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { toast } from "react-toastify";

function Index({ userID, btnIcon, title, btnColor, btnTitle, apiType }) {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    phone: "",
  });

  useEffect(() => {
    if (userID) {
      axios
        .get(`/users/${userID}`)
        .then((response) => {
          const userData = response.data;
          setFormData({
            username: userData.username,
            phone: userData.phone,
            password: userData.password,
          });
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    } else if (apiType === "post") {
      axios
        .post(`/users`)
        .then((response) => {
          const userData = response.data;
          setFormData({
            username: userData.username,
            phone: userData.phone,
            password: userData.password,
          });
          toast.success("User Created!");
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [userID, apiType]); // useEffect dependencies eklendi

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleInputChange = (e) => {
    e.preventDefault(); // 'e.preventDefault()' olarak düzeltildi
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleEditUser = async () => {
    try {
      await axios.patch(`/users/${userID}`, formData);
      toast.success("User edited");
      handleClose();
    } catch (error) {
      console.error("Error editing user:", error);
      toast.error("Error editing user");
    }
  };

  const formInputInfo = [
    { label: "User Name:", name: "username", placeholder: "Enter username" }, // Placeholder eklendi
    {
      label: "Phone Number:",
      name: "phone",
      placeholder: "Enter phone number",
    }, // Placeholder eklendi
    {
      label: "Old password:",
      name: "password",
      placeholder: "Enter old password",
      type: "password",
    }, // Placeholder ve type eklendi
  ];

  return (
    <>
      <Button variant={btnColor} onClick={handleShow}>
        <i className={btnIcon} />
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {formInputInfo.map((item, index) => (
              <Form.Group key={index} className="mb-3">
                <Form.Text>{item.label}</Form.Text>
                <Form.Control
                  name={item.name}
                  placeholder={item.placeholder}
                  type={item.type || "text"} // type varsayılan olarak 'text' olarak ayarlandı
                  value={formData[item.name]}
                  onChange={handleInputChange}
                  autoFocus={index === 0}
                />
              </Form.Group>
            ))}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEditUser}>
            {btnTitle}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Index;
