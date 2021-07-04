import React, { Component } from 'react';
import axios from 'axios';
import Header from '../Layout/Header';
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import Navbar from "./teachernavbar"
import Navbar2 from "./studentnavbar"
import SearchIcon from '@material-ui/icons/Search';
import { authenticationService } from '../Services/authenticationService';
import ReactTable from "react-table-6";
import "react-table-6/react-table.css";

export default class Doanthamkhao extends Component {
    constructor(props) {
      super(props);
      this.state = {
        type: authenticationService.currentUserValue.type,
        datk: [],
        datkwithID : [],
        columns: [],
        searchInput: "",
        show: []
      };
    }
  
    componentDidMount() {
      let columns = [
        {
            Header: () => <strong>#</strong>,
            accessor: "stt",
            sortable: false,
            show: true,
            displayValue: "#",
            width: 30
          },
        {
          Header: () => <strong>Tên đồ án</strong>,
        //   accessor: "tendoan",
          sortable: false,
          show: true,
          displayValue: "Tên đồ án",
          width: 150,
          Cell: row  => <div className="text-wrap">{row.original.tendoan}</div>
        },
        {
          Header: () => <strong>Tên/Email sinh viên</strong>,
          sortable: false,
          show: true,
          displayValue: "Tên/email sinh viên",
          width: 250,
          Cell     : atr =>
            <div>
                <div className="text-wrap">{atr.original.tensinhvien}</div>
                <div className="text-wrap">{atr.original.emailsinhvien}</div>
            </div>
        },
        {
          Header: () => <strong>Khóa</strong>,
          accessor: "khoa",
          sortable: false,
          show: true,
          displayValue: "Khóa",
          width: 50
        //   Cell: row  => <div className="text-wrap">{row.original.khoa}</div>
        },
        {
            Header: () => <strong>Hệ</strong>,
            accessor: "he",
            sortable: false,
            show: true,
            displayValue: "Hệ",
            width: 80
            // Cell: row  => <div className="text-wrap">{row.original.he}</div>
        },
        {
            Header: () => <strong>Ngành</strong>,
            accessor: "nganh",
            sortable: false,
            show: true,
            displayValue: "Ngành",
            width: 80
            // Cell: row  => <div className="text-wrap">{row.original.nganh}</div>
        },
        {
            Header: () => <strong>Tên/Email giảng viên</strong>,
            sortable: false,
            show: true,
            displayValue: "Tên/email giảng viên",
            width: 250,
            Cell     : atr =>
              <div>
                  <div className="text-wrap">{atr.original.tengiangvien}</div>
                  <div className="text-wrap">{atr.original.emailgiangvien}</div>
              </div>
          },
          {
            Header: () => <strong>Link tài liệu</strong>,
            accessor: "linkdoan",
            sortable: false,
            show: true,
            displayValue: "Link tài liệu",
            // Cell: row  => <div className="text-wrap">{row.original.linkdoan}</div>
            Cell: this.renderEditable
        },
      ];
      this.setState({ columns });
      axios.get(process.env.REACT_APP_API_URL + 'datk/')
      .then(response => {
        this.setState({ datk: response.data })
        let number = 1;
        let numTex = '1';
        const datktemp = [];
        response.data.map(term => {
            numTex = number.toString();
            term = {...term, stt:numTex}
            number = number + 1;
            datktemp.push(term)
        });
        console.log(datktemp)
        this.setState({ datkwithID: datktemp})
        this.setState({ show: datktemp})
      })
      .catch((error) => {
        console.log(error);
      })
    }
  
    handleChange = event => {
      this.setState({ searchInput: event.target.value }, () => {
        this.globalSearch();
      });
    };
  
    globalSearch = () => {
      let { searchInput } = this.state;
      let filteredData = this.state.datkwithID.filter(value => {
        return (
          value.tendoan.toLowerCase().includes(searchInput.toLowerCase()) ||
          value.tensinhvien.toLowerCase().includes(searchInput.toLowerCase()) ||
          value.emailsinhvien.toLowerCase().includes(searchInput.toLowerCase()) ||
          value.tengiangvien.toLowerCase().includes(searchInput.toLowerCase()) ||
          value.emailgiangvien.toLowerCase().includes(searchInput.toLowerCase()) ||
          value.khoa.toLowerCase().includes(searchInput.toLowerCase()) ||
          value.he.toLowerCase().includes(searchInput.toLowerCase()) ||
          value.nganh.toLowerCase().includes(searchInput.toLowerCase()) 
        );
      });
      this.setState({ show: filteredData });
    };
  
    render() {
      let { show, columns, searchInput } = this.state;
      return (
        <div>
        <Header/>
        <br/>
        <div>
        {(this.state.type === "teacher")?<Navbar />:<Navbar2 />}
        </div>
        <br/>
        <h3>Danh sách đồ án tham khảo</h3>
        <div className="first2">  <SearchIcon fontSize = "large" />   </div>
        <div className = "second2"> 
          <input 
            className = "input2"
            value={searchInput || ""}
            onChange={this.handleChange}
          />
        </div>
        <div className = "clear"></div>
          <ReactTable
            data={show}
            columns={columns}
            defaultPageSize={10}
            className="-striped -highlight"
          />
        </div>
      );
    }
  }
  