import { useState } from "react";
import { Button, TextField, Box, Typography, Container } from "@mui/material";
import { ResetPasswordApi } from "../apiIntegration/api";
import { useNavigate, useParams } from "react-router-dom";
import { Toaster } from "../common/Toaster";

interface form {
  email?: string;
  password?: string;
}

export const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<form>({});
  const Navigate = useNavigate();
  const { userID, token } = useParams();
  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("password", password);
    if (!validate()) return;
    try {
      const { error, message, user } = await ResetPasswordApi(
        userID,
        token,
        formData
      );
      console.log(error, message, user);
      if (error) {
        Toaster(error, "error");
      } else {
        Toaster(`${user} ${message}`, "success");
        Navigate("/user/login");
      }
    } catch (err: any) {
      Toaster(err, "error");
    }
  };

  const validate = () => {
    const newErrors: form = {};
    if (!password) {
      newErrors.email = "password is required";
    } else if (password.length < 6) {
      newErrors.email = "Enter password length minimum 6";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  return (
    <Container sx={{ padding: "3rem" }} maxWidth="sm">
      <Typography component="h1" variant="h5">
        Reset Password
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Enter New Password"
          type="password"
          id="password"
          autoComplete="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!errors.password}
          helperText={errors.password}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Update
        </Button>
      </Box>
    </Container>
  );
};
