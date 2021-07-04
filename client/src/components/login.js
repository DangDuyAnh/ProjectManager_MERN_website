import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { authenticationService, useLogin } from '../Services/authenticationService';

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checkboxStudent: true,
      checkboxTeacher:false,
      email: null,
      password: null,
      mssv: null,
      name: null,
      formErrors: {
        email: "",
        password: "",
        valid:""
      }
    };
    
  }

  handleSubmit = e => {
    e.preventDefault();
    const acc = {
      email: this.state.email,
      password: this.state.password
    }

    if ((this.state.formErrors.email === '') && (this.state.formErrors.password === '')){

      if (this.state.checkboxStudent) {
      axios.post(process.env.REACT_APP_API_URL + 'login/find_student', acc)
      .then( res => {
        if (res.data.length === 0) {
          this.setState({ formErrors: { ...this.state.formErrors, valid: "Your email or password is not correct" } });
          this.forceUpdate();
          authenticationService.logout();
          const temp = authenticationService.currentUserValue;
          console.log({temp})
        }
        else {
          this.setState({mssv: res.data[0].mssv, name: res.data[0].hoten}) 
          const student = {
            email: this.state.email,
            type: "student",
            student_code: this.state.mssv,
            name: this.state.name
          }
          window.location = '/homepage';
          const login = useLogin();
          login(student)
          const temp = authenticationService.currentUserValue;
          console.log({temp})
        } 
      });
    }
      else {
        axios.post(process.env.REACT_APP_API_URL + 'login/find_teacher', acc)
      .then( res => {
        if (res.data.length === 0) {
          this.setState({ formErrors: { ...this.state.formErrors, valid: "Your email or password is not correct" } });
          this.forceUpdate();
          authenticationService.logout();
          const temp = authenticationService.currentUserValue;
          console.log({temp})
        }
        else {
          this.setState({name: res.data[0].hoten}) 
          const teacher = {
            email: this.state.email,
            type: "teacher",
            name: this.state.name
          }
          window.location = '/homepage';
          const login = useLogin();
          login(teacher)
          const temp = authenticationService.currentUserValue;
          console.log({temp})
        } 
      });

      }
    }
  };
  
  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "email":
        formErrors.email = emailRegex.test(value)
          ? ""
          : "invalid email address";
        break;
      case "password":
        formErrors.password =
          value.length < 6 ? "minimum 6 characaters required" : "";
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };

  render() {
    const { formErrors } = this.state;

    return (
      <div className="wrapper">
        <div className="form-wrapper">
          <h1>Project Manager</h1>
          <form onSubmit={this.handleSubmit}>
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
                name="email"
                onChange={this.handleChange}
              />
              {formErrors.email.length > 0 && (
                <span className="errorMessage">{formErrors.email}</span>
              )}
            </div>
            <div className="password">
              <label htmlFor="password">Password</label>
              <input
                required
                placeholder="Password"
                type="password"
                name="password"
                onChange={this.handleChange}
              />
              {formErrors.password.length > 0 && (
                <span className="errorMessage">{formErrors.password}</span>
              )}
            </div>
            <div className="createAccount">
              <button type="submit">Sign in</button>
                <Link to={"/register/"} style={{ textDecoration: 'none' }}> 
                <small> Create new account </small>
                </Link>
                {formErrors.valid.length > 0 && (
                <span className="errorMessage">{formErrors.valid}</span>
              )}
            </div>

          </form>
        </div>
      </div>
    );
  }
}