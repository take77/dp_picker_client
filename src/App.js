import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import Home from './pages/Home'
import Result from './pages/Result'

import NavBar from './components/NavBar'

import Container from '@material-ui/core/Container';

const App = () => {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Container maxWidth="sm">
          <Switch>
              <Route exact path="/" component={ Home } />
              <Route path={"/result"} component={ Result } />
          </Switch>
        </Container>
      </Router>
    </div>
  );
}

export default App;
