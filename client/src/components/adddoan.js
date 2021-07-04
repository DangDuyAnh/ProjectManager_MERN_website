import React, { Component } from 'react';
import axios from 'axios';

import Header from '../Layout/Header';
import Navbar from "./teachernavbar";
import { authenticationService } from '../Services/authenticationService';

export default class CreateProject extends Component {
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
        this.onChange_tendoan = this.onChange_tendoan.bind(this);
        this.onChange_linkdoan = this.onChange_linkdoan.bind(this);
        this.onChange_tensinhvien = this.onChange_tensinhvien.bind(this);
        this.onChange_emailsinhvien = this.onChange_emailsinhvien.bind(this);
        this.onChange_he = this.onChange_he.bind(this);
        this.onChange_khoa = this.onChange_khoa.bind(this);
        this.onChange_nganh = this.onChange_nganh.bind(this);
        this.state = {
            type : authenticationService.currentUserValue.type,
            tendoan : '',
            linkdoan : '',
            tensinhvien : '',
            emailsinhvien : '',
            tengiangvien : authenticationService.currentUserValue.name,
            emailgiangvien : authenticationService.currentUserValue.email,
            khoa : '',
            he : '',
            nganh : ''
          }
        }
    
onClick = e => {
        e.preventDefault();
    
        const doan = {
            tendoan : this.state.tendoan,
            linkdoan : this.state.linkdoan,
            tensinhvien : this.state.tensinhvien,
            emailsinhvien: this.state.emailsinhvien,
            tengiangvien : this.state.tengiangvien,
            emailgiangvien : this.state.emailgiangvien,
            khoa : this.state.khoa,
            he : this.state.he,
            nganh : this.state.nganh,
        }
    
        console.log(doan);
    
        axios.post(process.env.REACT_APP_API_URL + 'datk/add', doan)
          .then(res => {console.log(res.data);
                        window.location = '/doancuatoi'});
        }

onChange_tendoan(e) {
  this.setState({
    tendoan: e.target.value
  })
}

onChange_linkdoan(e) {
  this.setState({
    linkdoan: e.target.value
  })
}

onChange_tensinhvien(e) {
  this.setState({
    tensinhvien: e.target.value
  })
}

onChange_emailsinhvien(e) {
  this.setState({
    emailsinhvien: e.target.value
  })
}

onChange_khoa(e) {
  this.setState({
    khoa: e.target.value
  })
}

onChange_he(e) {
  this.setState({
    he: e.target.value
  })
}

onChange_nganh(e) {
  this.setState({
    nganh : e.target.value
  })
}

render() {
    return (
    <div>{(this.state.type === 'student')?<h3>Student can not access this page</h3>:
    <div>
      <Header/>
      <br/>
      <Navbar />
      <br/>
      <h3>Upload new project</h3>
        <div className="form-group"> 
          <label>Tên đồ án: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.tendoan}
              onChange={this.onChange_tendoan}
              />
        </div>

        <div className = "wrap">
        <div className="first">
          <label>Tên giảng viên: </label>
          <input 
              required
              readOnly
              type="text" 
              className="form-control"
              value={this.state.tengiangvien}
              />
        </div>
        <div className = "second"> 
          <label>Email giảng viên: </label>
          <input
              required
              readOnly
              type="text" 
              className="form-control"
              value={this.state.emailgiangvien}
              />
        </div>
        <div className = "clear"></div>
        </div>

        <div className = "wrap">
        <div className="first">
          <label>Tên sinh viên: </label>
          <input 
              required
              type="text" 
              className="form-control"
              value={this.state.tensinhvien}
              onChange={this.onChange_tensinhvien}
              />
        </div>
        <div className = "second"> 
          <label>Email sinh viên: </label>
          <input
              required
              type="text" 
              className="form-control"
              value={this.state.emailsinhvien}
              onChange={this.onChange_emailsinhvien}
              />
        </div>
        <div className = "clear"></div>
        </div>

        <div className = "wrap">
        <div className="first">
          <label>Khóa: </label>
          <input 
              required
              type="text" 
              className="form-control"
              value={this.state.khoa}
              onChange={this.onChange_khoa}
              />
        </div>
        <div className = "second"> 
          <label>Hệ: </label>
          <input
              required
              type="text" 
              className="form-control"
              value={this.state.he}
              onChange={this.onChange_he}
              />
        </div>
        <div className = "clear"></div>
        </div>

        <div className="form-group">
          <label>Ngành: </label>
          <input 
              required
              type="text" 
              className="form-control"
              value={this.state.nganh}
              onChange={this.onChange_nganh}
              />
        </div>

        <div className="form-group">
          <label>Link tài liệu: </label>
          <input 
              required
              type="text" 
              className="form-control"
              value={this.state.linkdoan}
              onChange={this.onChange_linkdoan}
              />
        </div>

        <div className="test">
        <button type="submit" onClick = {this.onClick}>Upload project</button>
        </div>
    </div>
    }</div>
    )
  }
}
