import { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login } from "@auth";
import * as Yup from "yup";

interface FormData {
  username: string;
  password: string;
}

interface ErrorMessages {
  username?: string;
  password?: string;
}

function Index() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
  });

  const [error, setError] = useState<ErrorMessages>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const schema = Yup.object().shape({
    username: Yup.string()
      .min(5, "The username must be at least 5 characters long")
      .required("Username is required"),
    password: Yup.string()
      .min(6, "Password must be at least 5 characters")
      .required("Passwor is required"),
  });

  const handleFormSubmit = async () => {
    try {
      await schema.validate(formData, { abortEarly: false });
      const response = await login("/auth/login", formData);
      localStorage.setItem("userToken", response?.data?.accessToken);
      toast.success("Welcome!");
      navigate("/main");
    } catch (error) {
      let validationError: ErrorMessages = {};
      if (error instanceof Yup.ValidationError) {
        error.inner.forEach((err) => {
          validationError[err.path] = err.message;
        });
      }
      setError(validationError);
    }
  };

  return (
    <div className="d-flex align-items-center justify-center bg-slate-700 w-screen h-screen">
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
            {error && (
              <Form.Text className="text-danger">{error.username}</Form.Text>
            )}
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
            {error && (
              <Form.Text className="text-danger">{error.password}</Form.Text>
            )}
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

export default Index;
