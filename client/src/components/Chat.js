import React, { useState,useEffect, useRef } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import SendIcon from "@material-ui/icons/Send";
import Paper from "@material-ui/core/Paper";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import { authenticationService } from '../Services/authenticationService';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import classnames from "classnames";
import './Chat.css';
import ReactEmoji from 'react-emoji';

const useStyles = makeStyles((theme) => ({
    root: {
      height: "100%",
    },
    headerRow: {
      maxHeight: 60,
      zIndex: 5,
    },
    paper: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100%",
      color: theme.palette.primary.dark,
    },
    messageContainer: {
      height: "100%",
      display: "flex",
      alignContent: "flex-end",
    },
    messagesRow: {
      maxHeight: "calc(100vh - 184px)",
      overflowY: "auto",
    },
    newMessageRow: {
      width: "100%",
      padding: theme.spacing(0, 2, 1),
    },
    messageBubble: {
      padding: 10,
      border: "1px solid white",
      backgroundColor: "white",
      borderRadius: "0 10px 10px 10px",
      boxShadow: "-3px 4px 4px 0px rgba(0,0,0,0.08)",
      marginTop: 8,
      maxWidth: "40em",
    },
    messageBubbleRight: {
      borderRadius: "10px 0 10px 10px"
    },
    inputRow: {
      display: "flex",
      alignItems: "flex-end",
    },
    form: {
      width: "100%",
    },
    avatar: {
      margin: theme.spacing(1, 1.5),
    },
    listItem: {
      display: "flex",
      width: "100%",
    },
    listItemRight: {
      flexDirection: "row-reverse",
    },
  }));

const Chat = ( {name, messages, message, setMessage, sendMessage} ) => {
    const [currentUser] = useState(authenticationService.currentUserValue);
    const classes = useStyles();

    let chatBottom = useRef(null);

    const scrollToBottom = () => {
      chatBottom.current.scrollIntoView({ behavior: "auto" });
    };

    useEffect(() => {
    scrollToBottom();
  }, []);

    useEffect(scrollToBottom, [messages]);

    const getInitialsFromName = (name) => {
      const letters = String(name)
        .split(" ")
        .map((i) => i.charAt(0));
      return letters.join("");
    };

    return (
        <Grid container className={classes.root}>
        <Grid item xs={12} className={classes.headerRow}>
          <Paper className={classes.paper} square elevation={2}>
            <Typography color="inherit" variant="h6">
              {name}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Grid container className={classes.messageContainer}>
            <Grid item xs={12} className={classes.messagesRow}>
            {messages && (
              <List>
                {messages.map((m) => (
                  <ListItem
                    key={m._id}
                    className={classnames(classes.listItem, {
                      [`${classes.listItemRight}`]:
                        m.email === currentUser.email,
                    })}
                    alignItems="flex-start"
                  >
                    <ListItemAvatar className={classes.avatar}>
                      <Avatar>
                        {getInitialsFromName(m.name)}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      classes={{
                        root: classnames(classes.messageBubble, {
                          [`${classes.messageBubbleRight}`]:
                            m.email === currentUser.email,
                        }),
                      }}
                      disableTypography
                      primary={<Typography type="body2" style={{ color: '#757575' }}>{m.name}</Typography>}
                      secondary={<React.Fragment> {ReactEmoji.emojify(m.message)}</React.Fragment>}
                    />
                  </ListItem>
                ))}
              </List>
            )}
            <div ref={chatBottom} />
            </Grid>
            <Grid item xs={12} className={classes.inputRow}>
              <Grid
                container
                className={classes.newMessageRow}
                alignItems="flex-end"
              >
                <Grid item xs={11}>
                  <TextField
                    label="Message"
                    variant="outlined"
                    margin="dense"
                    fullWidth
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
                  />
                </Grid>
                <Grid item xs={1}>
                  <IconButton onClick={e => sendMessage(e)}> 
                    <SendIcon />
                  </IconButton>
                </Grid>
              </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
    );
  }
  
  export default Chat;
  