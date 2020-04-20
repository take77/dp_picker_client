import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Axios from 'axios';

import Home from './pages/Home'
import Result from './pages/Result'
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import PickedHistory from './pages/PickedHistory';
import Party from './pages/Party';
import About from './pages/About';

import GuestRoute from './components/GuestRoute'
import PrivateRoute from './components/PrivateRoute';

import NavBar from './components/NavBar'
import Container from '@material-ui/core/Container';


export const AuthContext = React.createContext()

const App = () => {
  const [authInfo, setAuthInfo] = useState({
    loggedInStatus: "NOT_LOGGED_IN",
    isLoggedIn: false,
    player: {}
  });

  useEffect(() => {
    Axios.get('http://localhost:4567/logged_in', { withCredentials: true }).then((result) => {
      if (result.data.logged_in) {
        setAuthInfo({
          loggedInStatus: "LOGGED_IN",
          isLoggedIn: result.data.logged_in,
          player: result.data.player
        });
      } else {
        setAuthInfo({
          loggedInStatus: "NOT_LOGGED_IN",
          isLoggedIn: result.data.logged_in,
          player: {}
        });
      }
    })
  }, [])


  return (
    <div className="App">
      <AuthContext.Provider value={[authInfo, setAuthInfo]}>
        <Router>
          <NavBar />
          <Container maxWidth="sm">
            <Switch>
              <Route exact path="/" component={ Home } />
              <Route path={"/result"} component={Result} />
              <GuestRoute path={"/sign_in"} component={SignIn} />
              <Route path={"/sign_up"} component={SignUp} />
              <Route path={"/about"} component={About} />
              <PrivateRoute path={"/history"} component={PickedHistory} />
              <PrivateRoute path={"/Party"} component={Party} />
            </Switch>
          </Container>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
