import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button } from 'reactstrap';

import { authenticationService } from '../Services/authenticationService';
import Header from '../Layout/Header';
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import Navbar from "./teachernavbar"

const DATK = props => (
    <tr>
      <td>{props.datk.tendoan}</td>
      <td><div>{props.datk.tensinhvien}</div>
          <div>{props.datk.emailsinhvien}</div>
      </td>
      <td>{props.datk.khoa}</td>
      <td>{props.datk.he}</td>
      <td>{props.datk.nganh}</td>
      <td><div>{props.datk.tengiangvien}</div> 
          <div>{props.datk.emailgiangvien}</div>
          </td>
      <td>{props.datk.linkdoan}</td>
      <td>
        <Link to={"/doancuatoi/edit/"+props.datk._id}>edit</Link> | <a href="#" onClick={() => { props.deleteDATK(props.datk._id) }}>delete</a>
      </td>
    </tr>
  )

export default class Doancuatoi extends Component {
    constructor(props) {
        super(props);
        this.deleteDATK = this.deleteDATK.bind(this)
        this.state = {
            type : authenticationService.currentUserValue.type,
            datks: []
        };
    }

    componentDidMount() {
        const person = authenticationService.currentUserValue;
        axios.post(process.env.REACT_APP_API_URL + 'datk/get_teaproject', person)
          .then(response => {
            this.setState({ datks: response.data })
          })
          .catch((error) => {
            console.log(error);
          })
      }

      deleteDATK(id) {
        axios.delete(process.env.REACT_APP_API_URL + 'datk/'+id)
          .then(response => { console.log(response.data)});
    
          this.setState({
            datks: this.state.datks.filter(el => el._id !== id)
          })
      }

      projectList() {
        return this.state.datks.map(currdatk => {
          return <DATK datk={currdatk} deleteDATK={this.deleteDATK} key={currdatk._id}/>;
        })
      }

    render() {
        return (
            <div>{(this.state.type === 'student')?<h3>Student can not access this page</h3>:
            <div>
                <Header/>
                <br/>
                <Navbar />
                <Button className="my-3" color="primary" 
                onClick = {e => {window.location = '/doancuatoi/add'}}>T???i l??n ????? ??n m???i</Button>
                <h3>????? ??n c???a t??i</h3>
                <table className="table">
                <thead className="thead-light">
                <tr>
                <th>T??n ????? ??n</th>
                <th>T??n/Email sinh vi??n</th>
                <th>Kh??a</th>
                <th>H???</th>
                <th>Ng??nh</th>
                <th>T??n/Email gi???ng vi??n</th>
                <th>Link t??i li???u</th>
                <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.projectList() }
          </tbody>
        </table>
            </div>
    }</div>
        )
    }
}