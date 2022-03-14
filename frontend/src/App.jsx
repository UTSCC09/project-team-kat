import Navbar from './components/Navbar/Navbar';
import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';

import Landing from './pages/Landing/Landing';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Home from './pages/Home/Home';
import GroupDetails from './pages/GroupDetails/GroupDetails';

function App({ auth: { isAuthenticated } }) {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/groups/:id/"
          element={(isAuthenticated) ? <GroupDetails /> : <Navigate to="/" />} />
        <Route path="/login"
          element={(isAuthenticated) ? <Navigate to="/" /> : <Login />} />
        <Route path="/register"
          element={(isAuthenticated) ? <Navigate to="/" /> : <Register />} />
        <Route path="/"
          element={(isAuthenticated) ? <Home /> : <Landing />} />
      </Routes>
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});


export default connect(mapStateToProps)(App);
