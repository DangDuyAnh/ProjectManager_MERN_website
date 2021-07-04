import {React} from "react";
import { BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import history from './Utilities/history';
import PrivateRoute from './Utilities/private-route';
import Home from "./components/home";
import Register from "./components/register";
import Homepage from "./components/homepage";
import CreateProject from "./components/createproject";
import ViewProject from "./components/viewproject";
import Doanthamkhao from "./components/doanthamkhao";
import Doancuatoi from "./components/doancuatoi";
import EditDATK from "./components/editdoan";
import AddDATK from "./components/adddoan";

function App() {

  return (
    <Router history={history}> 
        <div className="container">
        <br/>
      <Route path="/" exact component={Home} />
      <Route path="/register" component = {Register} />
      <PrivateRoute path="/homepage" component= {Homepage} />
      <PrivateRoute path="/view/:id" component={ViewProject} />
      <PrivateRoute path="/doanthamkhao" component = {Doanthamkhao} />
      
      <PrivateRoute path="/createproject" component= {CreateProject} />
      <PrivateRoute path="/doancuatoi" exact component = {Doancuatoi} />
      <PrivateRoute path="/doancuatoi/edit/:id" component={EditDATK} />
      <PrivateRoute path="/doancuatoi/add" component={AddDATK} />
        </div>
     </Router>
    );
  }
  
  export default App;

