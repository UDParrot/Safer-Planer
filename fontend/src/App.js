import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import 'semantic-ui-css/semantic.min.css';

import { AuthProvider } from './context/auth';
import AuthRoute from './util/AuthRoute';
import AuthRoutePro from './util/AuthRoutePro';

import MenuBar from './components/MenuBar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import MyMap from './pages/Map';
import Location from './pages/Location';
import MyProfile from './pages/MyProfile';

function App() {
  return (
    <AuthProvider>
      <Router>
        <MenuBar />
        <Route exact path="/" component={MyMap} />
        <AuthRoutePro exact path="/myProfile" component={MyProfile} />
        <AuthRoute exact path="/login" component={Login} />
        <AuthRoute exact path="/register" component={Register} />
        <Route exact path="/location/:address" component={Location} />
      </Router>
    </AuthProvider>
  );
}

export default App;