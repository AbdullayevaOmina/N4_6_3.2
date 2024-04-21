import { useState } from "react";
import axios from "axios";
import { Button, Card, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function index() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    phone: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Foydalanuvchi ma'lumotlarini tekshiruvchi funksiya
  const userDataVerification = (username, phone, password) => {
    if (!username || !phone || !password) {
      toast.error("Please fill in all fields");
      return false;
    }

    if (username.length < 5) {
      toast.error("Please enter a username of more than 5 characters");
      return false;
    }

    if (password.length < 5) {
      toast.error("Please enter password with more than 5 characters");
      return false;
    }

    return true;
  };

  const handleFormSubmit = async () => {
    try {
      const isUserDataValid = userDataVerification(
        formData.username,
        formData.phone,
        formData.password
      );

      // Agar foydalanuvchi ma'lumotlari to'g'ri bo'lmagan bo'lsa, qaytish
      if (!isUserDataValid) return;

      await axios.post("/auth/register", formData);

      toast("You are registered!", { type: "success" });

      navigate("/signin");
    } catch (error) {
      toast(error.message, { type: "error" });
    }
  };

  return (
    <div className="d-flex align-items-center justify-center bg-slate-500 w-screen h-screen">
      <Card className="w-96 h-96 p-12">
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>User Name:</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              autoFocus
              className="bg-secondary-subtle"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Phone Number:</Form.Label>
            <Form.Control
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="bg-secondary-subtle"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="bg-secondary-subtle"
            />
          </Form.Group>

          <Button
            className="w-full"
            variant="primary"
            onClick={handleFormSubmit}
          >
            Sign Up
          </Button>
        </Form>
        <Link className="mt-3 text-center" to={"/signin"}>
          Sign In
        </Link>
      </Card>
    </div>
  );
}

export default index;
