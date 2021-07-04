import React ,{useState} from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
import { authenticationService } from '../Services/authenticationService';

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

const Assignments = ({setIsChat, assignments, newModal,setNewModal, setAssignment}) => {
    const classes = useStyles();
    const [type] = useState(authenticationService.currentUserValue.type)
  return (
    <List className={classes.list}>
      <div>
      {(type === "student")?<div></div>:
      <ListItem
        classes={{ root: classes.subheader }}
        onClick={() => {
          setNewModal(!newModal);
        }}
      >
        <ListItemAvatar>
          <Avatar className={classes.globe}>
            < AddCircleIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText className={classes.subheaderText} primary="Add assignment" />
      </ListItem>
      }</div>
      <Divider />
      {assignments && (
        <React.Fragment>
          {assignments.map((c) => (
            <ListItem
              className={classes.listItem}
              key={c._id}
              button
              onClick={() => {
                setIsChat(false);
                setAssignment(c);
              }}
            >
              <ListItemText
                primary={c.name}
              />
            </ListItem>
          ))}
        </React.Fragment>
      )}
    </List>
  );
};

export default Assignments;
