import React, { useState, useEffect, ChangeEvent } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { Get, Patch, Post } from "@httpModel";
import { toast } from "react-toastify";

interface FormData {
  username: string;
  password: string;
  phone: string;
}

interface FormInput {
  label: string;
  name: string;
  placeholder: string;
  type?: string;
}

interface Props {
  userID: string;
  btnIcon: string;
  title: string;
  btnColor: string;
  btnTitle: string;
  apiType: string;
}

const Index: React.FC<Props> = ({
  userID,
  btnIcon,
  title,
  btnColor,
  btnTitle,
  apiType,
}: Props) => {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
    phone: "",
  });

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //       if (userID) {
  //         const userData = await Get(`/users/${userID}`);
  //         setFormData({
  //           username: userData.username,
  //           phone: userData.phone,
  //           password: userData.password,
  //         });
  //       }
  //     } catch (error) {
  //       console.error("Error fetching user data:", error);
  //     }
  //   };

  //   fetchUserData();
  // }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleEditUser = async () => {
    try {
      if (apiType === "patch") {
        await Patch("/users", userID, formData);

        toast.success("User edited");
        handleClose();
      } else if (apiType === "post") {
        const response = await Post(`/users`, formData);
        const userData = response.data;
        setFormData({
          username: userData.username,
          phone: userData.phone,
          password: userData.password,
        });
        toast.success("User Created!");
      }
    } catch (error) {
      toast.error(error.message);
      console.error("Error fetching user data:", error);
    }
  };

  const formInputInfo: FormInput[] = [
    { label: "User Name:", name: "username", placeholder: "Enter username" },
    {
      label: "Phone Number:",
      name: "phone",
      placeholder: "Enter phone number",
    },
    {
      label: "Old password:",
      name: "password",
      placeholder: "Enter old password",
      type: "password",
    },
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
};

export default Index;
