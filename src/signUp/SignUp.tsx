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
  Avatar,
} from "@mui/material";
import { SignUpApi } from "../apiIntegration/api";
import { useNavigate, Link } from "react-router-dom";
import { Toaster } from "../common/Toaster";

// interface formDataInterface {
//   trim(): string;
//   length: number;
//   email?: string;
//   aadharCardNumber?: string;
//   password?: string;
//   role?: string;
//   firstname?: string;
//   age?: number;
//   address?: string;
// }

interface formDataError {
  email?: string;
  aadharCardNumber?: string;
  password?: string;
  role?: string;
  firstname?: string;
  age?: number;
  address?: string;
  lastname?: string;
}

export const SignUp = () => {
  const [aadharCardNumber, setAadharCardNumber] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstname, setFirstName] = useState<string>("");
  const [lastname, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState<string>("");
  const [errors, setErrors] = useState<formDataError>({});
  const [role, setRole] = useState<string>();
  const [avatarSrc, setAvatarSrc] = useState<string | undefined>();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const Navigate = useNavigate();

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    console.log(file);

    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setAvatarSrc(reader.result as string);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    const formData = new FormData();

    formData.append("firstname", firstname);
    formData.append("lastname", lastname);
    formData.append("age", age);
    formData.append("email", email);
    formData.append("address", address);
    formData.append("aadharCardNumber", aadharCardNumber);
    formData.append("password", password);
    formData.append("role", role ?? "voter");

    if (selectedFile) {
      formData.append("photo", selectedFile);
    }
    console.log(formData);
    if (!validate()) return;

    try {
      const { response, message, error, token } = await SignUpApi(formData);
      if (!response) {
        Toaster(error, "error");
      } else {
        Toaster(message, "success");
        localStorage.setItem("token", token);
        Navigate("/user/login");
      }
    } catch (err) {
      console.error("failed to SignIn ", err);
    }
  };

  const validate = () => {
    const newErrors: formDataError = {};
    const aadharRegex = /^\d{12}$/;
    if (!firstname) {
      newErrors.firstname = "firstname is required";
    }
    if (!lastname) {
      newErrors.lastname = "lastname is required";
    }
    if (!email) {
      newErrors.email = "email is required";
    }
    if (!address) {
      newErrors.address = "address is required";
    }
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
          marginTop: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <Avatar
            alt="profile image"
            src={avatarSrc}
            sx={{
              height: "100px",
              width: "100px",
              marginTop: "1rem",
              display: "flex",
              justifyContent: "center",
            }}
          />
          <label
            htmlFor=""
            style={{
              display: "flex",
              padding: "10px",
            }}
          >
            Select Profile pic
          </label>
          <input
            type="file"
            accept="image/*"
            style={{
              border: 0,
              clip: "rect(0 0 0 0)",
              margin: "-1px",
              overflow: "hidden",
              padding: 10,
              position: "relative",
              whiteSpace: "nowrap",
              width: "100%",
            }}
            onChange={handleAvatarChange}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            id="firstname"
            label="First Name"
            name="firstname"
            autoComplete="firstname"
            autoFocus
            value={firstname}
            onChange={(e) => setFirstName(e.target.value)}
            error={!!errors.firstname}
            helperText={errors.firstname}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            id="lastname"
            label="Last Name"
            name="lastname"
            autoComplete="lastname"
            value={lastname}
            onChange={(e) => setLastName(e.target.value)}
            error={!!errors.lastname}
            helperText={errors.lastname}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            id="age"
            label="Age"
            name="age"
            autoComplete="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            error={!!errors.age}
            helperText={errors.age}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            id="address"
            label="Address"
            name="address"
            autoComplete="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            error={!!errors.address}
            helperText={errors.address}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!errors.email}
            helperText={errors.email}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="AadharCardNumber"
            name="aadharCardNumber"
            autoComplete="aadharCardNumber"
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

          <TextField
            margin="normal"
            required
            fullWidth
            id="role"
            label="Role"
            name="role"
            autoComplete="role"
            value={role}
            placeholder="eg.voter or admin"
            onChange={(e) => setRole(e.target.value)}
            error={!!errors.role}
            helperText={errors.role}
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
            Sign Up
          </Button>
          <Grid container>
            {/* <Grid2 item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid2> */}
            <Grid>
              <Link to="/user/Login">{"already have an account? Sign In"}</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
