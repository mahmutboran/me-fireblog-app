import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import CommentIcon from "@mui/icons-material/Comment";
import IconButton from "@mui/material/IconButton";

export default function Comments({ item }) {

  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      {Object.values(item.comments).map((value) => (
        <ListItem key={value} disableGutters>
          <IconButton >
            <CommentIcon />
          </IconButton>
          <ListItemText primary={` ${value}`} />
        </ListItem>
      ))}
    </List>
  );
}
