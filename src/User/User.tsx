import { Cards } from "../Cards/Cards";
import { BasicModal } from "../common/Modal";
import { DeleteUser, UserList } from "../apiIntegration/api";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SendIcon from "@mui/icons-material/Send";
import { Box, Button, Grid, Typography } from "@mui/material";
import { UpdateUsers } from "../updateUser/UpdateUsers";
import { Toaster } from "../common/Toaster";
import { NodataFound } from "../common/NodataFound";

export const signUpStyle = {
  margin: "auto",
  width: 300,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 1,
};

export const User = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [addOpen, setAddOpen] = useState(false);
  const handleAddOpen = () => setAddOpen(true);
  const handleAddClose = () => setAddOpen(false);
  const [openDelete, setopenDelete] = useState(false);
  const handleOpenDeleteModal = () => setopenDelete(true);
  const handleCloseDeleteModal = () => setopenDelete(false);
  const [updateUser, setUpdateUser] = useState([]);
  const navigate = useNavigate();
  const { userID } = useParams();

  const userCount = user?.length || 0;

  const renderCandidateCardContent = useCallback(
    (candidateItem: any) => (
      <>
        <Typography gutterBottom variant="h5" component="div">
          {candidateItem.firstname}
        </Typography>
        <Typography gutterBottom variant="body2" color="text.secondary">
          aadharCardNumber : {candidateItem.aadharCardNumber}
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

  const handleConfirmDelete = () => {
    handleOpenDeleteModal();
  };
  const handleDeleteUser = async () => {
    try {
      navigate(`/admin/user/${userID}`);
      const { response, message, error } = await DeleteUser(userID);
      if (!response) {
        Toaster(error, "error");
      } else {
        Toaster(message, "success");
        loadUser();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateUser = (c: any) => {
    handleOpen();
    setUpdateUser(c);
    navigate(`/admin/user/${c._id}`);
  };

  const loadUser = async () => {
    setLoading(true);
    try {
      const { error, userdata } = await UserList();
      if (!userdata) {
        Toaster(error, "error");
        if (error === "invalid token") {
          localStorage.clear();
          navigate("/user/login");
          window.location.reload();
        }
      }
      setUser(userdata);
      setLoading(false);
      // Toaster(message, "success");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <>
      <Grid container spacing={2}>
        <h2>User Control </h2>
        <h2>Toatal User Count ({userCount})</h2>
      </Grid>

      <BasicModal
        text={"add user"}
        icon={<SendIcon></SendIcon>}
        signUpStyle={signUpStyle}
        addOpen={addOpen}
        handleOpen={handleAddOpen}
        handleClose={handleAddClose}
      >
        <UpdateUsers
          title={"Add User"}
          handleClose={handleAddClose}
          userID={undefined}
          loadUser={loadUser}
          user={undefined}
        ></UpdateUsers>
      </BasicModal>
      {userCount === 0 && loading === false && <NodataFound />}

      <Cards
        list={user}
        renderCandidateCardContent={renderCandidateCardContent}
        handleClose={handleClose}
        open={open}
        handleDelete={handleConfirmDelete}
        handleUpdate={handleUpdateUser}
        updateCandidate={undefined}
        updateUser={updateUser}
        compStyle={signUpStyle}
        loadCandidate={undefined}
        userID={userID}
        loadUser={loadUser}
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
              <p>Are you sure you want to delete the user? </p>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "end",
                  gap: "12px",
                }}
              >
                <Button onClick={handleDeleteUser} variant="contained">
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
    </>
  );
};
