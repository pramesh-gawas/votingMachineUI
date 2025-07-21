import { useState } from "react";
import { Button, TextField, Box, Typography, Container } from "@mui/material";
import { ForgotPasswordApi } from "../apiIntegration/api";
import { Toaster } from "../common/Toaster";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    const formData = new FormData();

    formData.append("email", email);

    if (!validate()) return;
    try {
      const { error, message } = await ForgotPasswordApi(formData);
      if (error) {
        Toaster(error, "error");
      }
      if (message) {
        Toaster(message, "success");
        setEmail("");
      }
    } catch (err: any) {
      Toaster(err, "error");
    }
  };

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      newErrors.email = "email is required";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Enter valid email Address ";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  return (
    <Container sx={{ padding: "3rem" }} maxWidth="sm">
      <Typography component="h1" variant="h5">
        Forgot Password
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          name="email"
          placeholder="Enter your registered email"
          type="email"
          id="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!errors.email}
          helperText={errors.email}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Send
        </Button>
      </Box>
    </Container>
  );
};
