import Login from "./component/Login";
import Signup from "./component/Signup";
import Dashboard from "./component/Dashboard";
import { BrowserRouter as Router,Route,Switch } from 'react-router-dom';
function App() {
  return (
    <>
      <div className="pt-4 pb-4">
        <Router>
            <Switch>
                <Route path="/" exact>
                    <Login/>
                </Route>
                <Route path="/signup" exact>
                    <Signup/>
                </Route>
                <Route path="/dashboard" exact>
                    <Dashboard/>
                </Route>
            </Switch>
        </Router>
      </div>
    </>
  );
}

export default App;
