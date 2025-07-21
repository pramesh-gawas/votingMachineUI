import { useState } from "react";
import {
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Box,
  Typography,
  Container,
} from "@mui/material";
import { PasswordUpdate } from "../apiIntegration/api";
import { useNavigate } from "react-router-dom";
import { Toaster } from "../common/Toaster";

export const ChangePassword = () => {
  const [currentpassword, setCurrentPassword] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [errors, setErrors] = useState({});
  const Navigate = useNavigate();

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const obj = { currentPassword: currentpassword, newPassword: newpassword };
    if (!validate()) return;
    try {
      const { error, message } = await PasswordUpdate(obj);
      if (error) {
        Toaster(error, "error");
        if (error == "invalid token") {
          localStorage.clear();
          Navigate("/user/login");
          window.location.reload();
        }
      } else if (message) {
        Toaster(message, "success");
        Navigate("/user/profile");
      }
    } catch (err: any) {
      Toaster(err, "error");
    }
  };

  const validate = () => {
    const newErrors = {};
    const passwordRegex = /^.{6,}$/;
    if (!currentpassword) {
      newErrors.currentpassword = "currentpassword is required";
    } else if (!passwordRegex.test(currentpassword.trim())) {
      newErrors.currentpassword = "Please enter a valid 6 character password";
    }
    if (!newpassword) {
      newErrors.newpassword = "Password is required";
    } else if (newpassword.length < 6) {
      newErrors.newpassword = "Password must be at least 6 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  return (
    <Container sx={{ padding: "3rem" }} maxWidth="sm">
      <Typography component="h1" variant="h5">
        Update Password
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="currentpassword"
          label="Current Password"
          name="currentpassword"
          autoComplete="currentpassword"
          autoFocus
          value={currentpassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          error={!!errors.currentpassword}
          helperText={errors.currentpassword}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="newpassword"
          label="New Password"
          type="newpassword"
          id="newpassword"
          autoComplete="newpassword"
          value={newpassword}
          onChange={(e) => setNewPassword(e.target.value)}
          error={!!errors.newpassword}
          helperText={errors.newpassword}
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Update Password
        </Button>
      </Box>
    </Container>
  );
};
