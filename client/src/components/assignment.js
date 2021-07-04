import React, {useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import './assignment.css';
import {Button} from 'reactstrap';
import { authenticationService } from '../Services/authenticationService';
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
    }
  }));

const Assignment = (props) => {
    const classes = useStyles();
    const [type] = useState(authenticationService.currentUserValue.type)
    return (
        <div>{(type === "student")?
        <div>
        <Grid container className={classes.root}>
        <Grid item xs={12} className={classes.headerRow}>
          <Paper className={classes.paper} square elevation={2}>
            <Typography color="inherit" variant="h6">
              {props.assignment.name}
            </Typography>
          </Paper>
        </Grid>
        </Grid>
        <br></br>
        <br></br>
        <h3 className = 'label2'>Đề bài:</h3>
        <p> {props.assignment.topic}</p>
        <div className = 'newleft'> 
        <table className = 'table2'>
        <tbody>
          <tr className = 'tr'>
            <th className = 'th'> Hạn nộp bài</th>
            {/* <td className = 'td'> <DatePicker selected= {Date.parse(props.assignment.due_date)}/></td> */}
            <td className = 'td'> {props.assignment.due_date.substring(0, 10)}</td>
          </tr>
          <tr className = 'tr'>
          <th className = 'th'>Ngày nộp bài</th>
          <td className = 'td'>{props.assignment.submission_date}</td>
          </tr>
          <tr className = 'tr'>
          <th className = 'th'>Link file</th>
          <td className = 'td'>{props.assignment.attachment}</td>
          </tr>
          <tr className = 'tr'>
          <th className = 'th'>Điểm</th>
          <td className = 'td'>{props.assignment.score}</td>
          </tr>
          </tbody>
        </table>
        </div>
        <br></br>
        <h3 className = 'lable3'>Nhận xét của giảng viên:</h3>
        <p> {props.assignment.teacher_comment}</p>
        <br></br>
        <h3 className = 'lable3'>Ý kiến của sinh viên:</h3>
        <p> {props.assignment.student_comment}</p>
        <br></br>
        <div className = "newleft3"> 
        <Button color="success" size="sm" className="mr-2" 
          onClick = {() => {props.openEditStuModal()}}>Edit</Button>
        </div> 
        </div>       
            : 
            <div>
            <Grid container className={classes.root}>
            <Grid item xs={12} className={classes.headerRow}>
              <Paper className={classes.paper} square elevation={2}>
                <Typography color="inherit" variant="h6">
                  {props.assignment.name}
                </Typography>
              </Paper>
            </Grid>
            </Grid>
            <br></br>
            <br></br>
            <h3 className = 'label2'>Đề bài:</h3>
            <p> {props.assignment.topic}</p>
            <div className = 'newleft'> 
            <table className = 'table2'>
            <tbody>
              <tr className = 'tr'>
                <th className = 'th'>Hạn nộp bài</th>
                <td className = 'td'>{props.assignment.due_date.substring(0, 10)}</td>
              </tr>
              <tr className = 'tr'>
              <th className = 'th'>Ngày nộp bài</th>
              <td className = 'td'>{props.assignment.submission_date}</td>
              </tr>
              <tr className = 'tr'>
              <th className = 'th'>Link file</th>
              <td className = 'td'>{props.assignment.attachment}</td>
              </tr>
              <tr className = 'tr'>
              <th className = 'th'>Điểm</th>
              <td className = 'td'>{props.assignment.score}</td>
              </tr>
              </tbody>
            </table>
            </div>
            <br></br>
            <h3 className = 'lable3'>Nhận xét của giảng viên:</h3>
            <p> {props.assignment.teacher_comment}</p>
            <br></br>
            <h3 className = 'lable3'>Ý kiến của sinh viên:</h3>
            <p> {props.assignment.student_comment}</p>
            <br></br>
            <div className = "newleft2"> 
            <Button color="success" size="sm" className="mr-2" 
              onClick = {() => {props.openEditTeaModal()}}>Edit</Button>
            </div> 
            <div > 
            <Button color="danger" size="sm" 
              onClick = {() => {props.setDeleteModal(!(props.deleteModal))}}>Delete</Button>
            </div>
            </div>} 
            </div>
    );

}

export default Assignment;