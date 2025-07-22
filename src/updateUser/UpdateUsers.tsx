import { useState } from "react";
import {
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Box,
  Typography,
  Container,
  Avatar,
} from "@mui/material";
import { AddUser, UpdateUser } from "../apiIntegration/api";
import { URl } from "../Cards/Cards";
import { Toaster } from "../common/Toaster";

interface updateUserProps {
  user?: any;
  title?: string;
  handleClose?: any;
  userID?: string;
  loadUser?: any;
}
interface errorUpdate {
  firstname?: string;
  lastname?: string;
  age?: string;
  email?: string;
  address?: string;
  password?: string;
  aadharCardNumber?: string;
  role?: string;
}

export const UpdateUsers = ({
  user,
  title,
  handleClose,
  userID,
  loadUser,
}: updateUserProps) => {
  const [aadharCardNumber, setAadharCardNumber] = useState(
    user?.aadharCardNumber ?? ""
  );
  const [firstname, setFirstName] = useState(user?.firstname ?? "");
  const [lastname, setLastName] = useState(user?.lastname ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [age, setAge] = useState(user?.age ?? "");
  const [address, setAddress] = useState(user?.address ?? "");
  const [password, setPassword] = useState(user?.password ?? "");
  const [errors, setErrors] = useState<errorUpdate>({});
  const [role, setRole] = useState(user?.role ?? "");
  const [avatarSrc, setAvatarSrc] = useState<string | undefined>(
    URl(user?.photo) ?? ""
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setAvatarSrc(reader.result as string);
      };

      reader.readAsDataURL(file);
    }
  };

  const updateApi = async (formData: FormData) => {
    try {
      const { response, message, error } = await UpdateUser(userID, formData);
      if (!response) {
        Toaster(error, "error");
      } else {
        Toaster(message, "success");
        setAadharCardNumber("");
        setAge(0);
        setAddress("");
        setFirstName("");
        setLastName("");
        setEmail("");
        setRole("");
        setPassword("");
        setAvatarSrc("");
        handleClose();
        loadUser();
      }
    } catch (err: any) {
      Toaster(err, "error");
    }
  };

  const addApi = async (formData: any) => {
    try {
      const { response, message, error } = await AddUser(formData);

      if (!response) {
        Toaster(error, "error");
      } else {
        Toaster(message, "success");
        setAadharCardNumber("");
        setAge(0);
        setAddress("");
        setFirstName("");
        setLastName("");
        setPassword("");
        setEmail("");
        setAvatarSrc("");
        setRole("");
        handleClose();
        loadUser();
      }
    } catch (err: any) {
      Toaster(err, "error");
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
    formData.append("role", role);

    if (selectedFile) {
      formData.append("photo", selectedFile);
    }
    if (!validate()) return;
    if (user) {
      updateApi(formData);
    } else {
      addApi(formData);
    }
  };

  const validate = () => {
    const newErrors: errorUpdate = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const aadharRegex = /^\d{12}$/;
    if (!firstname) {
      newErrors.firstname = "firstname is required";
    }
    if (!lastname) {
      newErrors.lastname = "lastname is required";
    }
    if (!age) {
      newErrors.age = "age is required";
    }
    if (!email) {
      newErrors.email = "email is required";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Enter valid email Address ";
    }
    if (!address) {
      newErrors.address = "address is required";
    }
    if (!aadharCardNumber) {
      newErrors.aadharCardNumber = "aadharCardNumber is required";
    } else if (!aadharRegex.test(aadharCardNumber)) {
      newErrors.aadharCardNumber =
        "Please enter a valid 12-digit Aadhar Card Number (digits only).";
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
          {title}
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
            {title}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
