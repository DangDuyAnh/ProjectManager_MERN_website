import React, { Component } from "react";

import axios from 'axios';

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const numberT = RegExp(/^[0-9]/);

export default class Register extends Component {

  constructor(props) {
    super(props);

    this.state = {
      checkboxStudent: true,
      checkboxTeacher:false,
      email_student: null,
      password_student: null,
      hoVaTen_student: null,
      MSSV_student: null,
      vien_student: null,
      lop_student: null,
      sdt_student:null,
      email_teacher: null,
      password_teacher: null,
      hoVaTen_teacher: null,
      vien_teacher: null,
      sdt_teacher: null,
      formErrors: {
        email_student: "",
        password_student: "",
        MSSV_student:"",
        sdt_student:"",
        email_teacher: "",
        password_teacher: "",
        sdt_teacher : ""
      }
    };
  };

  handleSubmitStudent = e => {
    e.preventDefault();
    const student = {
      email: this.state.email_student,
      password: this.state.password_student,
      hoten: this.state.hoVaTen_student,
      mssv: this.state.MSSV_student,
      vien: this.state.vien_student,
      lop: this.state.lop_student,
      sdt: this.state.sdt_student
    }

    console.log(student);

    if ((this.state.formErrors.email_student === '') && (this.state.formErrors.password_student === '') 
    && (this.state.formErrors.MSSV_student === '') && (this.state.formErrors.sdt_student === '')) {
    
    axios.post(process.env.REACT_APP_API_URL + 'login/count_student', student)
      .then(res => {
        console.log(res.data);
        if (res.data === 1) {
          this.setState({ formErrors: { ...this.state.formErrors, email_student: "This email existed" } })
          this.forceUpdate();
        }
        else {
          axios.post(process.env.REACT_APP_API_URL + 'login/add_student', student);
          window.location = '/';
        }
      });
    }
  }

  handleSubmitTeacher = e => {
    e.preventDefault();
    const teacher = {
      email: this.state.email_teacher,
      password: this.state.password_teacher,
      hoten: this.state.hoVaTen_teacher,
      vien: this.state.vien_teacher,
      sdt: this.state.sdt_teacher
    }

    if ((this.state.formErrors.email_teacher === '') && (this.state.formErrors.password_teacher === '') 
     && (this.state.formErrors.sdt_teacher === '')) {
    
    axios.post(process.env.REACT_APP_API_URL + 'login/count_teacher', teacher)
      .then(res => {
        console.log(res.data);
        if (res.data === 1) {
          this.setState({ formErrors: { ...this.state.formErrors, email_teacher: "This email existed" } })
          this.forceUpdate();
        }
        else {
          axios.post(process.env.REACT_APP_API_URL + 'login/add_teacher', teacher);
          window.location = '/';
        }
      });
    }
  }
  
  handleChangeStudent = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "email_student":
        formErrors.email_student = emailRegex.test(value)
          ? ""
          : "invalid email address";
        break;
      case "password_student":
        formErrors.password_student =
          value.length < 6 ? "minimum 6 characaters required" : "";
        break;
      case "MSSV_student":
        formErrors.MSSV_student = ((value.length === 8) && (formErrors.MSSV_student = numberT.test(value)))
        ? "" : "mã số sinh viên không hợp lệ";
        break;
      case "sdt_student":
        formErrors.sdt_student = ((value.length > 8) && (formErrors.sdt_student = numberT.test(value)))
        ? "" : "số điện thoại không hợp lệ";
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };

  handleChangeTeacher = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "email_teacher":
        formErrors.email_teacher = emailRegex.test(value)
          ? ""
          : "invalid email address";
        break;
      case "password_teacher":
        formErrors.password_teacher =
          value.length < 6 ? "minimum 6 characaters required" : "";
        break;
      case "sdt_teacher":
        formErrors.sdt_teacher = ((value.length > 8) && (formErrors.sdt_teacher = numberT.test(value)))
        ? "" : "số điện thoại không hợp lệ";
        break;
      default:
        break;
    }
    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };

  render() {
    const { formErrors } = this.state;

    const studentTemplate = (
      <div className="wrapper">
        <div className="form-wrapper">
          <h1>Create New Account</h1>
          <form onSubmit={this.handleSubmitStudent}>
          <div className="stack-small">
          <div className="c-cb">
          <input
            type="checkbox"
            checked = {this.state.checkboxTeacher}
            onChange={() => {
              const checkboxStudent = this.state.checkboxStudent;
              const checkboxTeacher = this.state.checkboxTeacher;
              console.log('hihi')
              this.setState({
                checkboxStudent : !checkboxStudent,
                checkboxTeacher : !checkboxTeacher
              })
            }}
          />
          <label className="todo-label">
            Giáo viên
          </label>
        </div>
        <div className="c-cb">
          <input
            type="checkbox"
            checked = {this.state.checkboxStudent}
            onChange={() => {
              const checkboxStudent = this.state.checkboxStudent;
              const checkboxTeacher = this.state.checkboxTeacher;
              this.setState({
                checkboxStudent : !checkboxStudent,
                checkboxTeacher : !checkboxTeacher
              })
            }}
          />
          <label className="todo-label">
            Sinh viên
          </label>
        </div>
        </div>
            <div className="email">
              <label htmlFor="email">Email</label>
              <input
                required
                placeholder="Email"
                type="email"
                name="email_student"
                onChange={this.handleChangeStudent}
              />
              {this.state.formErrors.email_student.length > 0 && (
                <span className="errorMessage">{this.state.formErrors.email_student}</span>
              )}
            </div>
            <div className="password">
              <label htmlFor="password">Password</label>
              <input
                required
                placeholder="Password"
                type="password"
                name="password_student"
                onChange={this.handleChangeStudent}
              />
              {formErrors.password_student.length > 0 && (
                <span className="errorMessage">{formErrors.password_student}</span>
              )}
            </div>
            <div>
                <label> Họ và tên </label>
                <input
                  required
                  placeholder="Họ và tên"
                   name="hoVaTen_student"
                   onChange={this.handleChangeStudent}
                   />
            </div>
            <div>
                <label htmlFor="MSSV"> Mã số sinh viên </label>
                <input
                    required
                    placeholder="Mã số sinh viên"
                    onChange = {this.handleChangeStudent}
                    name="MSSV_student"
                />
                  {formErrors.MSSV_student.length > 0 && (
                    <span className="errorMessage">{formErrors.MSSV_student}</span>
                  )}  
            </div>
            <div>
                <label> Viện </label>
                <input
                    required
                    placeholder="Viện"
                    name="vien_student"
                    onChange = {this.handleChangeStudent}
                />
            </div>
            <div>
                <label> Lớp </label>
                <input
                    required
                    placeholder="Lớp"
                    name="lop_student"
                    onChange = {this.handleChangeStudent}
                />
            </div>
            <div>
                <label> Số điện thoại </label>
                <input
                    required
                    placeholder="Số điện thoại"
                    onChange = {this.handleChangeStudent}
                    name="sdt_student"
                    />
                      {formErrors.sdt_student.length > 0 && (
                        <span className="errorMessage">{formErrors.sdt_student}</span>
                      )}
            </div>
            <div className="createAccount">
              <button type="submit">Sign up</button>
            </div>
          </form>
        </div>
      </div>
    );

    const teacherTemplate = (
      <div className="wrapper">
        <div className="form-wrapper">
          <h1>Create New Account</h1>
          <form onSubmit={this.handleSubmitTeacher}>
          <div className="stack-small">
          <div className="c-cb">
          <input
            type="checkbox"
            checked = {this.state.checkboxTeacher}
            onChange={() => {
              const checkboxStudent = this.state.checkboxStudent;
              const checkboxTeacher = this.state.checkboxTeacher;
              this.setState({
                checkboxStudent : !checkboxStudent,
                checkboxTeacher : !checkboxTeacher
              })
            }}
          />
          <label className="todo-label">
            Giáo viên
          </label>
        </div>
        <div className="c-cb">
          <input
            type="checkbox"
            checked = {this.state.checkboxStudent}
            onChange={() => {
              const checkboxStudent = this.state.checkboxStudent;
              const checkboxTeacher = this.state.checkboxTeacher;
              this.setState({
                checkboxStudent : !checkboxStudent,
                checkboxTeacher : !checkboxTeacher
              })
            }}
          />
          <label className="todo-label">
            Sinh viên
          </label>
        </div>
        </div>
            <div className="email">
              <label htmlFor="email">Email</label>
              <input
                required
                placeholder="Email"
                type="email"
                name="email_teacher"
                onChange={this.handleChangeTeacher}
              />
              {this.state.formErrors.email_teacher.length > 0 && (
                <span className="errorMessage">{this.state.formErrors.email_teacher}</span>
              )}
            </div>
            <div className="password">
              <label htmlFor="password">Password</label>
              <input
                required
                placeholder="Password"
                type="password"
                name="password_teacher"
                onChange={this.handleChangeTeacher}
              />
              {formErrors.password_teacher.length > 0 && (
                <span className="errorMessage">{formErrors.password_teacher}</span>
              )}
            </div>
            <div>
                <label> Họ và tên </label>
                <input
                  required
                  placeholder="Họ và tên"
                   name="hoVaTen_teacher"
                   onChange={this.handleChangeTeacher}
                   />
            </div>
            <div>
                <label> Viện </label>
                <input
                    required
                    placeholder="Viện"
                    name="vien_teacher"
                    onChange = {this.handleChangeTeacher}
                />
            </div>
            <div>
                <label> Số điện thoại </label>
                <input
                    required
                    placeholder="Số điện thoại"
                    onChange = {this.handleChangeTeacher}
                    name="sdt_teacher"
                    />
                      {formErrors.sdt_teacher.length > 0 && (
                        <span className="errorMessage">{formErrors.sdt_teacher}</span>
                      )}
            </div>
            <div className="createAccount">
              <button type="submit">Sign up</button>
            </div>
          </form>
        </div>
      </div>
    );

    return (
      <div> {this.state.checkboxStudent ? studentTemplate : teacherTemplate} </div>
    );
  }
}

