import React, { Component } from 'react';
import axios from 'axios';

import Header from '../Layout/Header';
import Navbar from "./teachernavbar";
import { authenticationService } from '../Services/authenticationService';
import { Modal, ModalHeader, ModalFooter, Button } from 'reactstrap';

export default class CreateProject extends Component {
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeStudentCode = this.onChangeStudentCode.bind(this);
        this.onChangeStudentName = this.onChangeStudentName.bind(this);
        this.onChangeTerm = this.onChangeTerm.bind(this);
        this.onChangeTopic = this.onChangeTopic.bind(this);
        this.onChangeClassCode = this.onChangeClassCode.bind(this);
        this.onChangeSubjectCode = this.onChangeSubjectCode.bind(this);

        this.state = {
            type : authenticationService.currentUserValue.type,
            name: 'Project 1',
            term: '',
            subject_code: '',
            class_code: '',
            topic: '',
            student_name: '',
            student_code: '',
            teacher_email: '',
            teacher_name: '',
            names: ["Project 1", "Project 2", "Project 3", "Đồ án tốt nghiệp"],
            openModal1 : false,
            openModal2 : false
          }
        }

toggleOpenModal1 = e => {
  this.setState({
    openModal1: !(this.state.openModal1)
  })
}

toggleOpenModal2 = e => {
  this.setState({
    openModal2: !(this.state.openModal2)
  })
}
    
onClick = e => {
  e.preventDefault();
  const student = {
    student_name: this.state.student_name,
    student_code: this.state.student_code
  }
  axios.post(process.env.REACT_APP_API_URL + 'login/search_student', student)
  .then( res => {
    if (res.data.length === 0) {
      // alert("Tên hoặc mã số sinh viên không hợp lệ");
      this.setState({openModal1: true})
    }
    else {
      const tea = authenticationService.currentUserValue;
      axios.post(process.env.REACT_APP_API_URL+ 'login/get_teacher', tea)
      .then( res => {
        const pj = {
          name : this.state.name,
          term : this.state.term,
          subject_code: this.state.student_code,
          class_code: this.state.class_code,
          topic: this.state.topic,
          student_name: this.state.student_name,
          student_code: this.state.student_code,
          teacher_email: res.data[0].email,
          teacher_name: res.data[0].hoten
        };
        console.log(pj);
        axios.post(process.env.REACT_APP_API_URL + 'project/add', pj)
        .then(res => window.location = '/homepage')
        .catch((error) => {
          // alert("Hãy điền đủ thông tin");
          this.setState({openModal2: true})
        })
      });
    }
  });
}

onChangeName(e) {
  this.setState({
    name: e.target.value
  })
}

onChangeTerm(e) {
  this.setState({
    term: e.target.value
  })
}

onChangeTopic(e) {
  this.setState({
    topic: e.target.value
  })
}

onChangeStudentName(e) {
  this.setState({
    student_name: e.target.value
  })
}

onChangeStudentCode(e) {
  this.setState({
    student_code: e.target.value
  })
}

onChangeSubjectCode(e) {
  this.setState({
    subject_code: e.target.value
  })
}

onChangeClassCode(e) {
  this.setState({
    class_code : e.target.value
  })
}

render() {
    return (
    <div>
    {(this.state.type === 'student')
    ?<h3>Student can not access this page</h3>
    :<div>
      <Header/>
      <br/>
      <Navbar />
      <br/>

      <Modal size="me" isOpen={this.state.openModal1} toggle={this.toggleOpenModal1}>
        <ModalHeader toggle={this.toggleOpenModal1}>Tên hoặc mã số sinh viên không tồn tại</ModalHeader>
        <ModalFooter>
          <Button color="primary" onClick = {this.toggleOpenModal1}>Ok</Button>{' '}
        </ModalFooter>
        </Modal>

        <Modal size="me" isOpen={this.state.openModal2} toggle={this.toggleOpenModal2}>
        <ModalHeader toggle={this.toggleOpenModal2}>Hãy điền đủ thông tin</ModalHeader>
        <ModalFooter>
          <Button color="primary" onClick = {this.toggleOpenModal2}>Ok</Button>{' '}
        </ModalFooter>
        </Modal>

      <h3>Create New Project Log</h3>
        <div className="form-group"> 
          <label>Môn học: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.name}
              onChange={this.onChangeName}>
              {
                this.state.names.map(function(name) {
                  return <option 
                    key={name}
                    value={name}>{name}
                    </option>;
                })
              }
          </select>
        </div>
        <br></br>
        <div className="form-group"> 
          <label>kì học: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.term}
              onChange={this.onChangeTerm}
              />
        </div>
        <div className="form-group">
          <label>Đề tài: </label>
          <input 
              required
              type="text" 
              className="form-control"
              value={this.state.topic}
              onChange={this.onChangeTopic}
              />
        </div>
        <div className = "wrap">
        <div className="first">
          <label>Sinh viên: </label>
          <input 
              required
              type="text" 
              className="form-control"
              value={this.state.student_name}
              onChange={this.onChangeStudentName}
              />
        </div>
        <div className = "second"> 
          <label>Mã số sinh viên: </label>
          <input
              required
              type="text" 
              className="form-control"
              value={this.state.student_code}
              onChange={this.onChangeStudentCode}
              />
        </div>
        <div className = "clear"></div>
        </div>
        <div className = "wrap">
        <div className="first">
          <label>Mã môn học: </label>
          <input 
              required
              type="text" 
              className="form-control"
              value={this.state.subject_code}
              onChange={this.onChangeSubjectCode}
              />
        </div>
        <div className = "second"> 
          <label>Mã lớp: </label>
          <input
              required
              type="text" 
              className="form-control"
              value={this.state.class_code}
              onChange={this.onChangeClassCode}
              />
        </div>
        <div className = "clear"></div>
        </div>

        <div className="test">
        <button type="submit" onClick = {this.onClick}>Create project</button>
        </div>
    </div>
    }
    </div>
    )
  }
}
