import { Cards } from "../Cards/Cards";
import { BasicModal } from "../common/Modal";
import { DeleteUser, UserList } from "../apiIntegration/api";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SendIcon from "@mui/icons-material/Send";
import { Typography } from "@mui/material";
import { UpdateUsers } from "../updateUser/UpdateUsers";
import { Toaster } from "../common/Toaster";

export const signUpStyle = {
  margin: "auto",
  width: 300,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 1,
};

export const User = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [addOpen, setAddOpen] = useState(false);
  const handleAddOpen = () => setAddOpen(true);
  const handleAddClose = () => setAddOpen(false);
  const [updateUser, setUpdateUser] = useState([]);
  const navigate = useNavigate();
  const { userID } = useParams();

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

  const handleDeleteUser = async (userID: any) => {
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
      <h2>User Control</h2>
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

      <Cards
        list={user}
        renderCandidateCardContent={renderCandidateCardContent}
        handleClose={handleClose}
        open={open}
        handleDelete={handleDeleteUser}
        handleUpdate={handleUpdateUser}
        updateCandidate={undefined}
        updateUser={updateUser}
        compStyle={signUpStyle}
        loadCandidate={undefined}
        userID={userID}
        loadUser={loadUser}
        loading={loading}
      ></Cards>
    </>
  );
};
