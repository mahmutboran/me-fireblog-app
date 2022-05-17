import React, {  useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";
import Draggable from "react-draggable";
import { IconButton, TextField } from "@mui/material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { useBlog } from "../context/BlogContextProvider";

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

export default function Comment({ item }) {
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState("");
  const { editBlog } = useBlog();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setComment(e.target.value);
  };
  const handleSave = () => {
    editBlog({
      ...item,
      comments: { ...item.comments, [new Date()]: comment },
    });
    setOpen(false);
  };

  let helperText = `${100 - comment?.length}/100`;

  return (
    <div style={{ padding: 10 }}>
      <IconButton
        aria-label="share"
        onClick={handleClickOpen}
        variant="outlined"
      >
        <ChatBubbleOutlineIcon />
      </IconButton>

      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          Please enter a your comment !!
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              multiline
              rows={4}
              id="comment"
              label="Your Comment"
              type="text"
              fullWidth
              variant="standard"
              //! input max character
              inputProps={{
                maxLength: 100,
              }}
              helperText={helperText}
              onChange={handleChange}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
