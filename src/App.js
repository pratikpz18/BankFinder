import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import Home from './components/Home'
import Main from "./components/Main";
import CreateData from './components/CreateData';
import EditData from './components/EditData';
import './App.css';
import Login from "./components/Login";

function App() {

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" component = {Login} exact />
          <Route path="/home" component = {Home} exact />
          <Route path="/ifsc" component = {Main} exact />
          <Route path="/createdata" component={CreateData} exact/>
          <Route  path="/editdata/:ifsccode" component={EditData} exact/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
