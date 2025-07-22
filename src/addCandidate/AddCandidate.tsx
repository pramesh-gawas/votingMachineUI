import { useState } from "react";
import { Button, TextField, Box, Typography } from "@mui/material";

import { useNavigate } from "react-router-dom";
import { Addcandidate } from "../apiIntegration/api";
import { Toaster } from "../common/Toaster";

// interface addcandidate {
//   name: string;
//   age: number;
//   praty: string;
// }

interface addcandidateerror {
  name?: string;
  age?: string;
  party?: string;
}

interface addCandidateProps {
  loadCandidate: any;
  handleClose: any;
}

export const AddCandidate = ({
  loadCandidate,
  handleClose,
}: addCandidateProps) => {
  const [name, setName] = useState<string>();
  const [age, setAge] = useState<string>();
  const [party, setParty] = useState<string>("");
  const [errors, setErrors] = useState<addcandidateerror>({});
  const Navigate = useNavigate();

  const validate = () => {
    const newErrors: addcandidateerror = {};
    if (!name) {
      newErrors.name = "name is required";
    }
    if (!age) {
      newErrors.age = "age is required";
    }
    if (!party) {
      newErrors.party = "party is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const obj = {
      name,
      age,
      party,
    };
    if (!validate()) return;

    try {
      const { error, response, message } = await Addcandidate(obj);
      if (!response) {
        if (error == "invalid token") {
          localStorage.clear();
          Navigate("/user/login");
          window.location.reload();
        }
      } else {
        Toaster(message, "success");
        handleClose();
        loadCandidate();
      }
    } catch (err: any) {
      Toaster(err, "error");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <Typography component="h1" variant="h5">
          Add Candidate
        </Typography>
        <TextField
          margin="normal"
          required
          fullWidth
          id="name"
          label="Name"
          name="name"
          autoComplete="name"
          autoFocus
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={!!errors.name}
          helperText={errors.name}
        />

        <TextField
          margin="normal"
          required
          fullWidth
          id="age"
          label="Age"
          name="age"
          type="number"
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
          id="party"
          label="Party"
          name="party"
          autoComplete="party"
          value={party}
          onChange={(e) => setParty(e.target.value)}
          error={!!errors.party}
          helperText={errors.party}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Add
        </Button>
      </Box>
    </Box>
  );
};
