import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
// import LanguageIcon from "@material-ui/icons/Language";
import SmsIcon from '@material-ui/icons/Sms';
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  subheader: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
  },
  globe: {
    backgroundColor: theme.palette.primary.dark,
  },
  subheaderText: {
    color: theme.palette.primary.dark,
  },
  list: {
    maxHeight: "calc(100vh - 112px)",
    overflowY: "auto",
  },
}));

const Conversations = (props) => {
  const classes = useStyles();

  return (
    <List className={classes.list}>
      <ListItem
        classes={{ root: classes.subheader }}
        onClick={() => {
          props.setIsChat(true);
        }}
      >
        <ListItemAvatar>
          <Avatar className={classes.globe}>
            <SmsIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText className={classes.subheaderText} primary={props.name} />
      </ListItem>
      <Divider />
    </List>
  );
};

export default Conversations;
