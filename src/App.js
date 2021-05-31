import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/teacherdirectory">
            {
              //Change to component
            }
            <p>teacher directory</p>
          </Route>
          <Route path="/studentdirectory">
            {
              //Change to component
            }
            <p>student directory</p>
          </Route>
          <Route path="/calendar">
            {
              //Change to component
            }
            <p>calendar</p>
          </Route>
          <Route path="/class">
            {
              //Change to component
            }
            <p>class page</p>
          </Route>
          <Route path="/dashboard">
            {
              //Change to component
            }
            <p>dashboard</p>
          </Route>
          <Route path="/"></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
