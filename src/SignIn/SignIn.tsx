import { useState } from "react";
import {
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Box,
  Typography,
  Container,
  Grid,
} from "@mui/material";
import { SignInApi } from "../apiIntegration/api";
import { useNavigate, Link } from "react-router-dom";
import { Toaster } from "../common/Toaster";

interface formDataInterface {
  trim(): string;
  length: number;
  email?: string;
  aadharCardNumber?: number;
  password?: string;
}

interface formDataError {
  email?: string;
  aadharCardNumber?: string;
  password?: string;
  errors?: string;
}

export const SignIn = () => {
  const [aadharCardNumber, setAadharCardNumber] = useState<formDataInterface>();
  const [password, setPassword] = useState<formDataInterface>();
  const [errors, setErrors] = useState<formDataError>({});
  const Navigate = useNavigate();

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const obj = { aadharCardNumber, password };
    if (!validate()) return;
    try {
      const { token, error, userRole, message } = await SignInApi(obj);
      if (!token) {
        Toaster(error, "error");
      } else {
        localStorage.setItem("token", token);
        localStorage.setItem("role", userRole);
        if (userRole === "admin") {
          Navigate("/admin/dashboard");
          Toaster(message, "success");
        } else {
          Navigate("/user/home");
          Toaster(message, "success");
        }
        window.location.reload();
      }
    } catch (err: any) {
      Toaster(err, "error");
    }
  };

  const validate = () => {
    const newErrors: formDataError = {};
    const aadharRegex = /^\d{12}$/;
    if (!aadharCardNumber) {
      newErrors.aadharCardNumber = "aadharCardNumber is required";
    } else if (!aadharRegex.test(aadharCardNumber.trim())) {
      newErrors.aadharCardNumber =
        "Please enter a valid 12 digit Aadhar Card Number (digits only).";
    }
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="AadharCardNumber"
            name="aadharCardNumber"
            autoComplete="aadharCardNumber"
            autoFocus
            value={aadharCardNumber}
            onChange={(e) => setAadharCardNumber(e.target.value)}
            error={!!errors.aadharCardNumber}
            helperText={errors.aadharCardNumber}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!errors.password}
            helperText={errors.password}
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
            Sign In
          </Button>
          <Grid container sx={{ justifyContent: "flex-end" }}>
            <Grid size={7}>
              <Link to="/user/signup">{"Don't have an account? Sign Up"}</Link>
            </Grid>
            <Grid size={5} sx={{ textAlign: "right" }}>
              <Link to="/user/forgotpassword">Forgot Password</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
