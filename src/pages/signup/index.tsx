import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register } from "@auth";

import * as Yup from "yup";
import { useMask } from "@react-input/mask";
import { Box, TextField, Button, FormHelperText } from "@mui/material";
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

  const inputRef = useMask({ mask: "+998 (__) ___-__-__", replacement: "_" });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const schema = Yup.object().shape({
    username: Yup.string()
      .min(5, "Username should not be less than 5 characters")
      .required("User name is required"),
    password: Yup.string()
      .min(5, "Password must not be less than 5 characters")
      .required("Password is required"),
    phone: Yup.string()
      .min(19, "Enter the full phone number")
      .required("Phone is required"),
  });

  const handleFormSubmit = async (): Promise<void> => {
    try {
      await schema.validate(formData, { abortEarly: false });
      let phone_number = formData.phone.replace(/\D/g, "");
      let payload = { ...formData, phone: `+${phone_number}` };
      await register("/auth/register", payload);
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
        <Box
          component="form"
          noValidate
          autoComplete="off"
          className="d-grid gap-3  text-white"
        >
          <TextField
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            label="Username*"
            variant="outlined"
            error={error.username ? true : false}
          />
          <FormHelperText className="text-danger">
            {error.username}
          </FormHelperText>
          <TextField
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            inputRef={inputRef}
            label="Phone Number*"
            variant="outlined"
            error={error.phone ? true : false}
          />
          <FormHelperText className="text-danger">{error.phone}</FormHelperText>
          <TextField
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            label="Password*"
            type="password"
            variant="outlined"
            error={error.password ? true : false}
          />
          <FormHelperText className="text-danger">
            {error.password}
          </FormHelperText>
          <Button
            variant="contained"
            className=" text-bg-primary"
            onClick={handleFormSubmit}
          >
            Sign Up
          </Button>
        </Box>
        <Link className="mt-3 text-center" to={"/signin"}>
          Sign In
        </Link>
      </Card>
    </div>
  );
};

export default Index;
