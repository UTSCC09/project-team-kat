import Navbar from './components/Navbar/Navbar';
import React from 'react';
import {Route, Routes, Navigate} from 'react-router-dom';
import {connect} from 'react-redux';

import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import ProtectedRoutes from './ProtectedRoutes';
import Groups from './pages/Groups/Groups';
import GroupDetails from './pages/GroupDetails/GroupDetails';
import GroupCanvas from './pages/GroupCanvas/GroupCanvas';
import Landing from './pages/Landing/Landing';
import GroupFinance from './pages/GroupFinance/GroupFinance';
import ProcessPayment from './pages/ProcessPayment/ProcessPaymet';


function App({auth: {isAuthenticated}}) {
  return (
    <div className="App" >
      <Navbar />
      <Routes>
        <Route path="/login"
          element={(isAuthenticated) ? <Navigate to="/" /> : <Login />} />
        <Route exact path="/register"
          element={(isAuthenticated) ? <Navigate to="/" /> : <Register />} />
        <Route exact path="/"
          element={(isAuthenticated) ?
              <Navigate to="/groups" /> : <Landing />} />

        <Route element={<ProtectedRoutes />}>

          <Route exact path={'/groups'}
            element={<Groups />} />
          <Route path="/groups/:id/"
            element={<GroupDetails />} />
          <Route path="/groups/payments/:costId"
            element={<ProcessPayment />} />
          <Route path="/groups/:groupID/canvas"
            element={<GroupCanvas />} />
          <Route path="/groups/:groupID/finances"
            element={<GroupFinance />} />

        </Route>

      </Routes>
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});


export default connect(mapStateToProps)(App);
