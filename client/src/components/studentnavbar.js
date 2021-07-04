import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar2 extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
          <Link to="/homepage" className="navbar-brand">Danh sách đồ án</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/doanthamkhao" className="nav-link">Đồ án tham khảo</Link>
          </li>
        </ul>
        </div>
      </nav>
    );
  }
}