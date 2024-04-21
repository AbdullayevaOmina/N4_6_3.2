import { useState } from "react";
import axios from "axios";
import { Button, Card, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function index() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async () => {
    try {
      // Foydalanuvchining inputga ma'lumot kiritmaganini tekshirish
      if (!formData.username || !formData.password) {
        toast.error("Please fill in all fields");
        return;
      }

      const response = await axios.post("/auth/login", formData);

      localStorage.setItem("userToken", response?.data?.accessToken);
      toast.success("Welcome!");
      navigate("/main");
    } catch (error) {
      toast("Username or password is incorrect", { type: "error" });
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
            Sign In
          </Button>
        </Form>
        <Link className="mt-3 text-center" to={"/"}>
          Sign Up
        </Link>
      </Card>
    </div>
  );
}

export default index;
