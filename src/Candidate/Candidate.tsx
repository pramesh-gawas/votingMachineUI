import { Cards } from "../Cards/Cards";
import { BasicModal } from "../common/Modal";
import { CandidateList, DeleteCandidate } from "../apiIntegration/api";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SendIcon from "@mui/icons-material/Send";
import { AddCandidate } from "../addCandidate/AddCandidate";
import { Box, Button, Grid, Typography } from "@mui/material";
import { Toaster } from "../common/Toaster";
import { NodataFound } from "../common/NodataFound";

export const Candidate = () => {
  const [loading, setLoading] = useState(false);
  const [candidate, setCandidate] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [openDelete, setopenDelete] = useState(false);
  const handleOpenDeleteModal = () => setopenDelete(true);
  const handleCloseDeleteModal = () => setopenDelete(false);
  const [addOpen, setAddOpen] = useState(false);
  const handleAddOpen = () => setAddOpen(true);
  const handleAddClose = () => setAddOpen(false);
  const [updateCandidate, SetupdateCandidate] = useState();
  const { candidateID } = useParams();
  const navigate = useNavigate();

  const candidateCount = candidate?.length || 0;
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

  const handleDeleteConfirmCandidate = () => {
    handleOpenDeleteModal();
  };

  const handleDelete = async () => {
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
    handleCloseDeleteModal();
  };

  const handleUpdate = (c: any) => {
    handleOpen();
    SetupdateCandidate(c);
    navigate(`/admin/candidate/${c._id}`);
  };

  const loadCandidate = async () => {
    setLoading(true);
    try {
      const { error, candidateList } = await CandidateList();
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
      // Toaster(message, "success");
    } catch (err: any) {
      Toaster(err, "error");
    }
  };

  useEffect(() => {
    loadCandidate();
  }, []);
  return (
    <Box>
      <Grid container spacing={2}>
        <h2>Candidate Control </h2>
        <h2>Toatal Candidate Count ({candidateCount})</h2>
      </Grid>
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
      {candidateCount === 0 && loading === false && <NodataFound />}

      <Cards
        list={candidate}
        renderCandidateCardContent={renderCandidateCardContent}
        handleUpdate={handleUpdate}
        updateUser={undefined}
        handleClose={handleClose}
        open={open}
        handleDelete={handleDeleteConfirmCandidate}
        updateCandidate={updateCandidate}
        compStyle={undefined}
        loadCandidate={loadCandidate}
        userID={undefined}
        loadUser={undefined}
        loading={loading}
      ></Cards>
      {openDelete && (
        <BasicModal
          text={""}
          icon={undefined}
          addOpen={openDelete}
          handleOpen={openDelete}
          handleClose={handleCloseDeleteModal}
          signUpStyle={undefined}
          children={
            <>
              <p>Are you sure you want to delete the candidate? </p>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "end",
                  gap: "12px",
                }}
              >
                <Button onClick={handleDelete} variant="contained">
                  Yes
                </Button>
                <Button onClick={handleCloseDeleteModal} variant="outlined">
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
