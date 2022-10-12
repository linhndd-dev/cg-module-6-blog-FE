import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Box, useTheme } from "@mui/system";
export default function ModalComment({
  children,
  open,
  handleClose,
  handleSave,
  saveText,
  len,
}) {
  const theme = useTheme();
  const handleClick = () => {
    handleSave();
    handleClose();
  };
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{position:"relative"}}>
        <h5 style={{position:"absolute", left:"20px", top:"20px"}}>Edit comment</h5>
        <Box textAlign="right" borderBottom="1px solid #ccc">
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      
      <DialogContent>{children}</DialogContent>
      <DialogActions sx={{paddingRight: "20px", paddingBottom:"20px"}}>
        <Button
          disabled={len === 0}
          variant="contained"
          color="primary"
          size="small"
          sx={{
            borderRadius: theme.shape.borderRadius,
            fontSize: "12px",
          }}
          onClick={handleClick}
        >
          {saveText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
