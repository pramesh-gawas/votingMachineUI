import { Cards } from "../Cards/Cards";
import { BasicModal } from "../common/Modal";
import { CandidateList, DeleteCandidate } from "../apiIntegration/api";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SendIcon from "@mui/icons-material/Send";
import { AddCandidate } from "../addCandidate/AddCandidate";
import { Box, Typography } from "@mui/material";
import { signUpStyle } from "../User/User";
import { Toaster } from "../common/Toaster";

export const Candidate = () => {
  const [loading, setLoading] = useState(true);
  const [candidate, setCandidate] = useState();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [addOpen, setAddOpen] = useState(false);
  const handleAddOpen = () => setAddOpen(true);
  const handleAddClose = () => setAddOpen(false);
  const [updateCandidate, SetupdateCandidate] = useState();
  const navigate = useNavigate();

  const renderCandidateCardContent = useCallback(
    (candidateItem: any) => (
      <>
        <Typography gutterBottom variant="h6" component="div">
          {candidateItem.firstname}
        </Typography>
        <Typography gutterBottom variant="body2" color="text.secondary">
          Party: {candidateItem.party}
        </Typography>
        {candidateItem.age && (
          <Typography variant="body2" color="text.secondary">
            Age: {candidateItem.age}
          </Typography>
        )}
      </>
    ),
    []
  );

  const handleDelete = async (candidateID: any) => {
    try {
      navigate(`/admin/candidate/${candidateID}`);
      const { response, message, error } = await DeleteCandidate(candidateID);
      if (!response) {
        Toaster(error, "error");
      } else {
        Toaster(message, "success");
        loadCandidate();
        handleClose();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = (c: any) => {
    handleOpen();
    SetupdateCandidate(c);
    navigate(`/admin/candidate/${c._id}`);
  };

  const loadCandidate = async () => {
    setLoading(true);
    try {
      const { error, candidateList, message } = await CandidateList();
      if (!candidateList) {
        if (error === "invalid token") {
          Toaster(error, "error");
          localStorage.clear();
          navigate("/user/login");
          window.location.reload();
        }
      }
      setCandidate(candidateList);
      setLoading(false);
      Toaster(message, "success");
    } catch (err: any) {
      Toaster(err, "error");
    }
  };

  useEffect(() => {
    loadCandidate();
  }, []);

  return (
    <Box>
      <h2>Candidate Control</h2>
      <BasicModal
        text={"add candidate"}
        icon={<SendIcon></SendIcon>}
        handleOpen={handleAddOpen}
        handleClose={handleAddClose}
        signUpStyle={undefined}
        addOpen={addOpen}
      >
        <AddCandidate
          loadCandidate={loadCandidate}
          handleClose={handleAddClose}
        ></AddCandidate>
      </BasicModal>

      <Cards
        list={candidate}
        renderCandidateCardContent={renderCandidateCardContent}
        handleUpdate={handleUpdate}
        updateUser={undefined}
        handleClose={handleClose}
        open={open}
        handleDelete={handleDelete}
        updateCandidate={updateCandidate}
        compStyle={undefined}
        loadCandidate={loadCandidate}
        userID={undefined}
        loadUser={undefined}
        loading={loading}
      ></Cards>
    </Box>
  );
};
