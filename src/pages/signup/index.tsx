import React, { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import http from "@http";
import * as Yup from "yup";
import { useMask } from "@react-input/mask";

interface FormData {
  username: string;
  phone: string;
  password: string;
}

interface ErrorMessages {
  username?: string;
  phone?: string;
  password?: string;
}

const Index: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    username: "",
    phone: "",
    password: "",
  });

  const [error, setError] = useState<ErrorMessages>({});
  
  const inputRef = useMask({
    mask: "+998 (__) ___-__-__",
    replacement: { _: /\d/ },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const schema = Yup.object().shape({
    username: Yup.string()
      .min(6, "name 6 tadan kop bolsin")
      .required("required"),
    password: Yup.string().min(6, "6 tadan kop bolsin").required("required"),
    phone: Yup.string().min(19, "To'liq kiriting").required("required"),
  });

  const handleFormSubmit = async (): Promise<void> => {
    try {
      await schema.validate(formData, { abortEarly: false });
      let phone_number = formData.phone.replace(/\D/g, "");
      let payload = { ...formData, phone: `+${phone_number}` };
      await http.post("/auth/register", payload);
      toast.success("You are registered!");
      navigate("/signin");
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
            {error.username && (
              <Form.Text className="text-danger">{error.username}</Form.Text>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Phone Number:</Form.Label>
            <Form.Control
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="bg-secondary-subtle"
              ref={inputRef}
            />
            {error.phone && (
              <Form.Text className="text-danger">{error.phone}</Form.Text>
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
            {error.password && (
              <Form.Text className="text-danger">{error.password}</Form.Text>
            )}
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
};

export default Index;
