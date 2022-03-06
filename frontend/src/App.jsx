import Navbar from './components/Navbar/Navbar';
import React from 'react';
import {Route, Routes, Navigate} from 'react-router-dom';
import {connect} from 'react-redux';

import Landing from './pages/Landing/Landing';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';

function App({auth: {isAuthenticated}}) {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/"
          element={(isAuthenticated) ? <Navigate to="/home" /> : <Landing />}/>
        <Route path="/login"
          element={(isAuthenticated) ? <Navigate to="/home" /> : <Login />}/>
        <Route path="/register"
          element={(isAuthenticated) ? <Navigate to="/home" /> : <Register />}/>
      </Routes>
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});


export default connect(mapStateToProps)(App);
