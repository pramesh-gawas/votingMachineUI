import react from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";

export const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 3,
};
interface basicModalProps {
  text: string;
  icon: any;
  addOpen: boolean;
  handleOpen: any;
  handleClose: any;
  signUpStyle: any;
  children: react.ReactNode;
}

export const BasicModal = ({
  text,
  icon,
  addOpen,
  handleOpen,
  handleClose,
  signUpStyle,
  children,
}: basicModalProps) => {
  return (
    <>
      {text && (
        <Button onClick={handleOpen} variant="contained" endIcon={icon}>
          {text}
        </Button>
      )}

      <Modal
        style={{ overflow: "scroll" }}
        open={addOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={signUpStyle ?? style}>
          <CloseIcon
            fontSize="medium"
            sx={{ float: "right" }}
            onClick={handleClose}
          />
          {children}
        </Box>
      </Modal>
    </>
  );
};
