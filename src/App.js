import './App.css';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import Main from "./components/Main";
import CreateData from './components/CreateData';
import EditData from './components/EditData'

function App() {
  return (
    <Router>
      <div className="App">
        <h2>Bank</h2>
        <Switch>
          <Route path="/" component = {Main} exact />
          <Route exact path="/createdata" component={CreateData} exact/>
          <Route exact path="/editdata/:ifsccode" render={(props) => <EditData {...props} />}  exact/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
