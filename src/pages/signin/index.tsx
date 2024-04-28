import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login } from "@auth";
import * as Yup from "yup";
import { Box, FormHelperText, TextField, Button } from "@mui/material";

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
      <div className="w-96 card h-96 p-12">
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
            Sign In
          </Button>
        </Box>
        <Link className="mt-3 text-center" to={"/"}>
          Sign Up
        </Link>
      </div>
    </div>
  );
}

export default Index;
