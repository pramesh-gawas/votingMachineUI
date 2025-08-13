import { useState } from "react";
import { Button, TextField, Box, Typography } from "@mui/material";

import { UpdateCandidate } from "../apiIntegration/api";
import { Toaster } from "../common/Toaster";
import { BasicModal } from "../common/Modal";

interface updateCandidateProps {
  updateCandidate: any;
  handleClose: any;
  candidateID: any;
  loadCandidate: any;
}

interface errorCandidate {
  name?: string;
  age?: string;
  party?: string;
}

export const UpdateCandidates = ({
  updateCandidate,
  handleClose,
  candidateID,
  loadCandidate,
}: updateCandidateProps) => {
  const [name, setName] = useState(updateCandidate?.name);
  const [age, setAge] = useState(updateCandidate?.age);
  const [party, setParty] = useState(updateCandidate?.party);
  const [errors, setErrors] = useState<errorCandidate>({});
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  const validate = () => {
    const newErrors: errorCandidate = {};
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

  const handleConfirmationModal = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    handleOpen();
  };

  const handleSubmit = async () => {
    const obj = {
      name: name || updateCandidate?.name,
      age: age || updateCandidate?.age,
      party: party || updateCandidate?.party,
      id: updateCandidate?._id,
    };
    if (!validate()) return;
    try {
      const { response, message, error } = await UpdateCandidate(
        candidateID,
        obj
      );
      if (!response) {
        Toaster(error, "error");
      }
      Toaster(message, "success");
      setName("");
      setAge(0);
      setParty("");
      handleClose();
      loadCandidate();
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
      <Box
        component="form"
        onSubmit={handleConfirmationModal}
        noValidate
        sx={{ mt: 1 }}
      >
        <Typography component="h1" variant="h5">
          Update Candidate
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
          value={name ?? updateCandidate?.name}
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
          value={age ?? updateCandidate?.age}
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
          value={party ?? updateCandidate?.party}
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
          Update
        </Button>
      </Box>
      {open && (
        <BasicModal
          text={""}
          icon={undefined}
          addOpen={open}
          handleOpen={handleOpen}
          handleClose={handleClose}
          signUpStyle={undefined}
          children={
            <>
              <p>Are you sure you want to update Candidate? </p>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "end",
                  gap: "12px",
                }}
              >
                <Button onClick={handleSubmit} variant="contained">
                  Yes
                </Button>
                <Button onClick={handleClose} variant="outlined">
                  No
                </Button>
              </Box>
            </>
          }
        ></BasicModal>
      )}
    </Box>
  );
};
