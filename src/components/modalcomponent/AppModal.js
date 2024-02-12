"use client";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  bgcolor: "black",
  p: 4,
  minHeight: "40vh",
  maxHeight: "80vh",
  overflow: "auto",
};

export default function AppModal({ children, open, handleClose }) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      style={{ backdropFilter: "blur(5px)" }}
    >
      <Box sx={style}>{children}</Box>
    </Modal>
  );
}
