import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
// import List from '@material-ui/core/List';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import axios from 'axios';
import Header from '../Layout/Header';
import Chat from './Chat.js'
import Conversations from './Conversations.js';
import { authenticationService } from '../Services/authenticationService';
import Navbar from "./teachernavbar"
import Navbar2 from "./studentnavbar"
import socketIOClient from "socket.io-client";
import Assignments from './assignments';
import Assignment from './assignment';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

import { Input, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

const useStyles = makeStyles(theme => ({
  paper: {
      minHeight: 'calc(100vh - 64px)',
      borderRadius: 0,
  },
  sidebar: {
      zIndex: 8,
  },
  subheader: {
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
  },
  globe: {
      backgroundColor: theme.palette.primary.dark,
  },
  subheaderText: {
      color: theme.palette.primary.dark,
  },
  textarea: {
        resize: "both",
        width : "100%"
  },
}));

const ViewProject = (props) => {
  const [currentUser] = useState(authenticationService.currentUserValue);
  const [tab, setTab] = useState(0);
  const classes = useStyles();
  const [room] = useState(props.match.params.id)
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [lastMessage, setLastMessage] = useState(null);
  const [isChat, setIsChat] = useState(true);
  const [name, setName] = useState('');
  const [type, setType] = useState('student');
  const [assignments, setAssignments] = useState([]);
  const [newModal, setNewModal] = useState(false);
  const [editTeaModal, setEditTeaModal] = useState(false);
  const [editStuModal, setEditStuModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  // new assignment
  const [nameA, setNameA] = useState('');
  const [topicA, setTopicA] = useState('');
  // const [submission_dateA, setSubmission_dateA] = useState(new Date());
  const [due_dateA, setDue_dateA] = useState(new Date());
  const [attachmentA, setAttachmentA] = useState('');
  const [scoreA, setScoreA] = useState('');
  const [student_commentA, setStuComA] = useState('');
  const [teacher_commentA, setTeaComA] = useState('');
  const [change, setChange] = useState(false);
  const [nameB, setNameB] = useState('');
  const [topicB, setTopicB] = useState('');
  const [due_dateB, setDue_dateB] = useState(new Date());
  // const [assignment, setAssignment] = useState(null);
  const [assignment, setAssignment] = useState({
    name: '',
  });

  useEffect(() => {
    const temp = {room: room}
    console.log(temp)
    axios.post(process.env.REACT_APP_API_URL + 'message/find_room', temp)
    .then(response => {
        // setMessages(response.data.map(obj => obj.message),)
        setMessages(response.data.map(message => message))
    })
    .catch(function (error) {
    console.log(error);
    });
      
  }, [lastMessage, room]);

  useEffect(() => {
    let socket = socketIOClient(process.env.REACT_APP_API_URL);
    socket.on("messages", (message) => setLastMessage(message));
    socket.on("changeAssignment", () => {
      let today = new Date();
      let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      setChange(time)});

    setType(currentUser.type)
    if (type === 'teacher') {
        axios.get(process.env.REACT_APP_API_URL + 'project/' + room)
        .then(response => {
        setName(response.data.student_name)
    })
    }
    else {
        axios.get(process.env.REACT_APP_API_URL + 'project/' + room)
        .then(response => {
        setName(response.data.teacher_name)
    }) 
    }
  }, [currentUser.type, room, type]);

  useEffect(() => {
    const temp2 = {room: room}
    axios.post(process.env.REACT_APP_API_URL + 'assignment/find_room', temp2)
    .then(response => {
        setAssignments(response.data.map(assignment => assignment))
    })
    }, [change, room]);

  const handleChange = (e, newVal) => {
      setTab(newVal);
  };

  const sendMessage = (event) => {
    event.preventDefault();

    if(newMessage) {
      const temp = {
        email: currentUser.email,
        name: currentUser.name,
        room: room,
        message: newMessage
      }
      console.log(temp)
      axios.post(process.env.REACT_APP_API_URL + 'message/add', temp);
      }
      setNewMessage('')
    }

    const createNewAssignment = (event) => {
        event.preventDefault();
        if (nameB) {
            const temp = {
                name : nameB,
                topic : topicB,
                submission_date : null ,
                due_date : due_dateB,
                attachment : "",
                score : "", 
                student_comment : "",
                teacher_comment : "",
                room : room
              }
              axios.post(process.env.REACT_APP_API_URL + 'assignment/add', temp)
              setNewModal(!newModal)
        }
    }

    const editTeaAssignment = (event) => {
      event.preventDefault();
      if (assignment.name) {
        setAssignment({...assignment, topic:topicA, score: scoreA, due_date: due_dateA.toString()
        , teacher_comment: teacher_commentA})
          const temp = {
              name : assignment.name,
              topic : topicA,
              submission_date : assignment.submission_date,
              due_date : due_dateA,
              attachment : assignment.attachment,
              score : scoreA,
              student_comment : assignment.student_comment,
              teacher_comment :  teacher_commentA,
              room : room
            }
            axios.post(process.env.REACT_APP_API_URL + 'assignment/update/'+assignment._id, temp)
            setEditTeaModal(!editTeaModal)
      }
  }

  const editStuAssignment = (event) => {
    event.preventDefault();
    if (assignment.name) {
      let today = new Date();

      let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      setAssignment({...assignment, attachment: attachmentA, submission_date: date,
        student_comment: student_commentA})
        const temp = {
            name : assignment.name,
            topic : assignment.topic,
            submission_date : date ,
            due_date : assignment.due_date,
            attachment : attachmentA,
            score : assignment.score,
            student_comment :  student_commentA,
            teacher_comment :  assignment.teacher_comment,
            room : room
          }
          axios.post(process.env.REACT_APP_API_URL + 'assignment/update/'+assignment._id, temp)
          setEditStuModal(!editStuModal)
    }
}

const deleteAssignment = (event) => {
  event.preventDefault();
  if (assignment.name) {
        axios.delete(process.env.REACT_APP_API_URL + 'assignment/'+assignment._id)
        setDeleteModal(!deleteModal)
  }
}  

    const toggleNewModal = () => {
        setNewModal(!newModal)
    }

    const toggleEditTeaModal = () => {
      setEditTeaModal(!editTeaModal)
    }

    const openEditTeaModal = () => {
      setEditTeaModal(!editTeaModal)
      setNameA(assignment.name);
      setTopicA(assignment.topic);
      setDue_dateA(assignment.due_date);
      setScoreA(assignment.score);
      setTeaComA(assignment.teacher_comment);
    }

    const openEditStuModal = () => {
      setEditStuModal(!editStuModal)
      setNameA(assignment.name);
      setAttachmentA(assignment.attachment);
      setStuComA(assignment.student_comment);
    }

    const toggleEditStuModal = () => {
      setEditStuModal(!editStuModal)
    }

    const toggleDeleteModal = () => {
      setDeleteModal(!deleteModal)
    }

    return (
      <React.Fragment>
          <Header />
          <br/>
          <div>
        {(type === "teacher")?<Navbar />:<Navbar2 />}
        </div>
          <br/>

        <Modal size="lg" isOpen={newModal} toggle={toggleNewModal}>
        <ModalHeader toggle={toggleNewModal}>Add a new assignment</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="name">Tên bài tập: </Label>
            <Input id="name" value={nameB} onChange={(e) => {
                setNameB(e.target.value);
            }} />
          </FormGroup>
          <FormGroup>
            <Label for="topic">Đề bài: </Label>
            <Input type="textarea" id="topic" value={topicB} onChange={(e) => {
                setTopicB(e.target.value);
            }} />
          </FormGroup>
          <FormGroup>
            <Label for="Due date">Hạn nộp bài: </Label>
            <DatePicker
              selected={due_dateB}
              onChange={(e) => {
                setDue_dateB(e);
                }}
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick = {createNewAssignment}>Add assignment</Button>{' '}
          <Button color="secondary" onClick = {toggleNewModal}>Cancel</Button>
        </ModalFooter>
        </Modal>
        
        {(currentUser.type === "teacher")
        ?<Modal size="lg" isOpen={editTeaModal} toggle={toggleEditTeaModal}>
        <ModalHeader toggle={toggleEditTeaModal}>Edit assignment</ModalHeader>
        <ModalBody>
        <FormGroup>
            <Label for="name">Tên bài tập: </Label>
            <Input id="name" value={nameA} readOnly />
          </FormGroup>
          <FormGroup>
            <Label for="topic">Đề bài mới: </Label>
            <Input type="textarea" id="topic" value={topicA} onChange={(e) => {
                // setAssignment({...assignment, topic: e.target.value})
                setTopicA(e.target.value)
            }} />
          </FormGroup>
          <FormGroup>
            <Label for="Due date">Hạn nộp bài mới: </Label>
            <DatePicker
              // selected={Date.parse(assignment.due_date)}
              selected={new Date(due_dateA)}
              onChange={(e) => {
                // setAssignment({...assignment, due_date: e.toString()})
                setDue_dateA(e);
                }}
            />
          </FormGroup>
          <FormGroup>
            <Label for="score">Điểm: </Label>
            <Input id="score" value={scoreA} onChange={(e) => {
              // setAssignment({...assignment, score: e.target.value})
                setScoreA(e.target.value);
            }} />
          </FormGroup>
          <FormGroup>
            <Label for="">Nhận xét của giảng viên: </Label>
            <Input type="textarea" id="textarea" value={teacher_commentA} onChange={(e) => {
              //  setAssignment({...assignment, teacher_comment: e.target.value})
               setTeaComA(e.target.value);
            }} />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick = {editTeaAssignment}>Edit assignment</Button>{' '}
          <Button color="secondary" onClick = {toggleEditTeaModal}>Cancel</Button>
        </ModalFooter>
        </Modal>

        :<Modal size="lg" isOpen={editStuModal} toggle={toggleEditStuModal}>
        <ModalHeader toggle={toggleEditStuModal}>Edit assignment</ModalHeader>
        <ModalBody>
        <FormGroup>
            <Label for="name">Tên bài tập: </Label>
            <Input id="name" value={nameA} readOnly />
          </FormGroup>
          <FormGroup>
            <Label for="attachment">Link bài tập: </Label>
            <Input type="textarea" id="attachment" value={attachmentA} onChange={(e) => {
                // setAssignment({...assignment, attachment: e.target.value})
                setAttachmentA(e.target.value)
            }} />
          </FormGroup>
          <FormGroup>
            <Label for="student_comment">Ý kiến của sinh viên: </Label>
            <Input type="textarea" id="student_comment" value={student_commentA} onChange={(e) => {
              //  setAssignment({...assignment, student_comment: e.target.value})
              setStuComA(e.target.value);
            }} />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick = {editStuAssignment}>Edit assignment</Button>{' '}
          <Button color="secondary" onClick = {toggleEditStuModal}>Cancel</Button>
        </ModalFooter>
        </Modal>}

        <Modal size="lg" isOpen={deleteModal} toggle={toggleDeleteModal}>
        <ModalHeader toggle={toggleDeleteModal}>Delete assignment ?</ModalHeader>
        <ModalBody>
        <FormGroup>
            <Label for="name">Tên bài tập: </Label>
            <Input id="name" value={assignment.name} readOnly />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick = {deleteAssignment}>Delete assignment</Button>{' '}
          <Button color="secondary" onClick = {toggleEditStuModal}>Cancel</Button>
        </ModalFooter>
        </Modal>

          <Grid container>
              <Grid item md={4} className={classes.sidebar}>
                  <Paper className={classes.paper} square elevation={5}>
                      <Paper square>
                          <Tabs
                              onChange={handleChange}
                              variant="fullWidth"
                              value={tab}
                              indicatorColor="primary"
                              textColor="primary"
                          >
                              <Tab label="Trò chuyện" />
                              <Tab label="Bài tập" />
                          </Tabs>
                      </Paper>
                      {tab === 0 && (
                          <Conversations
                              name = {name} setIsChat = {setIsChat}
                          />
                      )}
                      {tab === 1 && (
                        <div>
                          <Assignments setIsChat = {setIsChat} assignments = {assignments} newModal = {newModal} setNewModal = {setNewModal} setAssignment = {setAssignment}/>
                          </div>
                      )}
                  </Paper>
              </Grid>
              <Grid item md={8}>
                  {(isChat === true)?
                  <Chat name = {name}  messages = {messages} message = {newMessage} setMessage = {setNewMessage} sendMessage = {sendMessage}/>
                  :<Assignment assignment = {assignment} openEditTeaModal = {openEditTeaModal} deleteModal = {deleteModal}
                  setDeleteModal = {setDeleteModal} openEditStuModal = {openEditStuModal}/>}
                  </Grid>
          </Grid>
      </React.Fragment>
  );
};

export default ViewProject;