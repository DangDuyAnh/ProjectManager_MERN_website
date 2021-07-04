import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { authenticationService } from '../Services/authenticationService';
import Header from '../Layout/Header';
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import Navbar from "./teachernavbar"
import Navbar2 from "./studentnavbar"

const Project = props => (
  <tr>
    <td>{props.project.term}</td>
    <td><div>{props.project.class_code}</div>
        <div>{props.project.subject_code}</div>
    </td>
    <td>{props.project.name}</td>
    <td>{props.project.topic}</td>
    <td><div>{props.project.student_name}</div> 
        <div>{props.project.student_code}</div>
        </td>
    <td>
      <Link to={"/view/"+props.project._id}>view</Link> | <a href="#" onClick={() => { props.deleteProject(props.project._id) }}>delete</a>
    </td>
  </tr>
)

const StudentProject = props => (
  <tr>
    <td>{props.project.term}</td>
    <td><div>{props.project.class_code}</div>
        <div>{props.project.subject_code}</div>
    </td>
    <td>{props.project.name}</td>
    <td>{props.project.topic}</td>
    <td><div>{props.project.teacher_email}</div> 
        <div>{props.project.teacher_name}</div>
        </td>
    <td>
      <Link to={"/view/"+props.project._id}>view</Link>
    </td>
  </tr>
)

export default class Homepage extends Component {
  constructor(props) {
    super(props);

    this.onChangeTerm = this.onChangeTerm.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.deleteProject = this.deleteProject.bind(this);

    this.state = {
    isTeacher: null,
    projects: [],
    term : '',
    name : '',
    names: [],
    uniqueNames: [],
    terms: [],
    uniqueTerms: []
    };
  }

  componentDidMount() {
    const person = authenticationService.currentUserValue;
    console.log(person)
    if (person.type === 'student') {
    this.setState({isTeacher: 'no'});
    axios.post(process.env.REACT_APP_API_URL + 'project/get_stuproject', person)
    .then(response => {
      if (response.data.length > 0) {
      this.setState({ 
        projects: response.data,
        term: response.data[0].term,
        terms: response.data.map(pj => pj.term), 
        name: response.data[0].name,
        names: response.data.map(pj => pj.name)   
      })
      const uniqueTags = [];
      const uniqueNames = [];
      this.state.terms.map(term => {
          if (uniqueTags.indexOf(term) === -1) {
              uniqueTags.push(term)
              }
      });
      this.state.names.map(name => {
        if (uniqueNames.indexOf(name) === -1) {
            uniqueNames.push(name)
            }
    });

      this.setState({uniqueTerms: uniqueTags});
      this.setState({uniqueNames: uniqueNames});
    }
    })
    .catch((error) => {
      console.log(error);
    })
    }
    else {
      this.setState({isTeacher: 'yes'})
      axios.post(process.env.REACT_APP_API_URL + 'project/get_teaproject', person)
      .then(response => {
        if (response.data.length > 0) {
        this.setState({ 
          projects: response.data,
          term: response.data[0].term,
          terms: response.data.map(pj => pj.term), 
          name: response.data[0].name,
          names: response.data.map(pj => pj.name)   
        })
        const uniqueTags = [];
        const uniqueNames = [];
        this.state.terms.map(term => {
            if (uniqueTags.indexOf(term) === -1) {
                uniqueTags.push(term)
                }
        });
        this.state.names.map(name => {
          if (uniqueNames.indexOf(name) === -1) {
              uniqueNames.push(name)
              }
      });

        this.setState({uniqueTerms: uniqueTags});
        this.setState({uniqueNames: uniqueNames});
      }
      })
      .catch((error) => {
        console.log(error);
      })
    }
  }

  onChangeTerm = e => {
    this.setState({
      term: e.target.value
    })
  }

  onChangeName = e => {
    this.setState({
      name: e.target.value
    })
  }

  deleteProject(id) {
    axios.delete(process.env.REACT_APP_API_URL + 'project/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      projects: this.state.projects.filter(el => el._id !== id)
    })
  }

  projectList() {
    return this.state.showedProjects.map(currentproject => {
      return <Project project={currentproject} deleteProject={this.deleteProject} key={currentproject._id}/>;
    })
  }

  studentProjectList() {
    return this.state.showedProjects.map(currentproject => {
      return <StudentProject project={currentproject} deleteProject={this.deleteProject} key={currentproject._id}/>;
    })
  }

  // changePerson(){
  //   if (this.props.isStudent === 'true') this.setState({person : 'Student'});
  //   else this.setState({person : 'Teacher'});
  // }

  render() {
    const projects = this.state.projects;
    const name = this.state.name;
    const term = this.state.term;
    const filterDropdown = projects.filter(function(result) {
      return ((result.name === name) && (result.term === term));
    });

    const studentTemplate = (
    <div>
      <Header/>
      <br/>
    <Navbar2 />
    <div >
      <div className = 'left' > 
        <label>Kì: </label>
        <select ref="termInput"
            required
            // className="form-control"
            value={this.state.term}
            onChange={this.onChangeTerm}>
            {
              this.state.uniqueTerms.map(function(term) {
                return <option 
                  key={term}
                  value={term}>{term}
                  </option>;
              })
            }
        </select>
      </div>
      <div > 
        <label>Môn: </label>
        <select ref="termInput"
            required
            // className="form-control"
            value={this.state.name}
            onChange={this.onChangeName}>
            {
              this.state.uniqueNames.map(function(name) {
                return <option 
                  key={name}
                  value={name}>{name}
                  </option>;
              })
            }
        </select>
      </div>
      <div>
      </div>

      <h3>Project List</h3>
      <table className = "table">
        <thead className="thead-light">
          <tr>
            <th>Kỳ</th>
            <th>Mã lớp/HP</th>
            <th>Tên học phần</th>
            <th>Tên đề tài</th>
            <th>Giáo viên</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* { this.projectList() } */}
          {filterDropdown.map(currentproject => {
          return <StudentProject project={currentproject} deleteProject={this.deleteProject} key={currentproject._id}/>;
          })}
        </tbody>
      </table>
    </div>
    </div>);

    const teacherTemplate = (<div>
      <Header/>
      <br/>
    <Navbar />
    <div >
      <div className = 'left' > 
        <label>Kì: </label>
        <select ref="termInput"
            required
            // className="form-control"
            value={this.state.term}
            onChange={this.onChangeTerm}>
            {
              this.state.uniqueTerms.map(function(term) {
                return <option 
                  key={term}
                  value={term}>{term}
                  </option>;
              })
            }
        </select>
      </div>
      <div > 
        <label>Môn: </label>
        <select ref="termInput"
            required
            // className="form-control"
            value={this.state.name}
            onChange={this.onChangeName}>
            {
              this.state.uniqueNames.map(function(name) {
                return <option 
                  key={name}
                  value={name}>{name}
                  </option>;
              })
            }
        </select>
      </div>
      <div>
      </div>

      <h3>Project List</h3>
      <table className = "table">
        <thead className="thead-light">
          <tr>
            <th>Kỳ</th>
            <th>Mã lớp/HP</th>
            <th>Tên học phần</th>
            <th>Tên đề tài</th>
            <th>Sinh viên</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* { this.projectList() } */}
          {filterDropdown.map(currentproject => {
          return <Project project={currentproject} deleteProject={this.deleteProject} key={currentproject._id}/>;
          })}
        </tbody>
      </table>
    </div>
    </div>);

    return (
      <div>{(this.state.isTeacher === 'yes') ?teacherTemplate:studentTemplate}</div>
    )
  }
}