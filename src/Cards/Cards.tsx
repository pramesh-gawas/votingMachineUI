import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import { Box, Grid, Modal } from "@mui/material";
import { useParams } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { style } from "../common/Modal";
import { UpdateCandidates } from "../updateCandidate/UpdateCandidates";
import { UpdateUsers } from "../updateUser/UpdateUsers";
import { CardSkeleton } from "../skeleton/CardSkeleton";
import type { Key } from "react";
const API_BASE_URL = import.meta.env.VITE_API_URL;

export const URl = (path: string) => {
  if (!path) {
    return "https://placehold.co/140x140/cccccc/000000?text=No+Image";
  }
  const normalizedPath = path.replace(/\\/g, "/");
  return `${API_BASE_URL}/${normalizedPath}`;
};

interface cardProps {
  list?: any;
  renderCandidateCardContent?: any;
  handleUpdate?: any;
  handleClose?: any;
  updateCandidate?: any;
  open?: boolean;
  handleDelete?: any;
  updateUser?: any;
  compStyle?: any;
  loadCandidate?: any;
  loadUser?: any;
  userID?: string;
  loading?: boolean;
}

export const Cards = ({
  list,
  renderCandidateCardContent,
  handleUpdate,
  handleClose,
  updateCandidate,
  open,
  handleDelete,
  updateUser,
  compStyle,
  loadCandidate,
  loadUser,
  userID,
  loading,
}: cardProps) => {
  const { candidateID } = useParams();
  const numberOfCount = 4;
  return (
    <Grid
      container
      sx={{
        display: "flex",
        padding: 1,
        gap: 2,
        justifyContent: "space-evenly",
      }}
    >
      {loading
        ? [...Array(numberOfCount)].map((_, index) => (
            <CardSkeleton key={index}></CardSkeleton>
          ))
        : list?.map(
            (
              c: {
                role: string;
                photo: string;
                firstname: string | undefined;
                _id: any;
              },
              index: Key | null | undefined
            ) => (
              <Card
                sx={{
                  maxWidth: 295,
                  padding: 5,
                  width: "100%",
                  justifyContent: "center",
                  border: "lightgray",
                  borderRadius: "20px",
                }}
                style={{
                  backgroundColor: c.role === "admin" ? "red" : "#1976d2",
                }}
                key={index}
              >
                <CardMedia
                  sx={{
                    height: 240,
                    borderRadius: "20px",
                  }}
                  image={URl(c.photo)}
                  title={c.firstname}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  {renderCandidateCardContent(c)}
                </CardContent>
                <CardActions>
                  {c.role === "admin" ? (
                    ""
                  ) : (
                    <Button
                      size="small"
                      sx={{ color: "black" }}
                      onClick={() => handleDelete(c._id)}
                    >
                      delete
                    </Button>
                  )}
                  <Button
                    size="small"
                    sx={{ color: "black" }}
                    onClick={() => handleUpdate(c)}
                  >
                    update
                  </Button>
                </CardActions>
              </Card>
            )
          )}

      {open && updateCandidate && (
        <Modal
          sx={{ overflow: "scroll" }}
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={compStyle ?? style}>
            <CloseIcon
              fontSize="medium"
              sx={{ float: "right" }}
              onClick={handleClose}
            />
            <UpdateCandidates
              candidateID={candidateID}
              updateCandidate={updateCandidate}
              handleClose={handleClose}
              loadCandidate={loadCandidate}
            ></UpdateCandidates>
          </Box>
        </Modal>
      )}

      {open && updateUser && (
        <Modal
          sx={{ overflow: "scroll" }}
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={compStyle ?? style}>
            <CloseIcon
              fontSize="medium"
              sx={{ float: "right" }}
              onClick={handleClose}
            />
            <UpdateUsers
              user={updateUser}
              handleClose={handleClose}
              title={"Update User"}
              userID={userID}
              loadUser={loadUser}
            ></UpdateUsers>
          </Box>
        </Modal>
      )}
    </Grid>
  );
};
