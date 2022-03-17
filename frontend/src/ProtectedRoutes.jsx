import React from 'react';
import {connect} from 'react-redux';
import {Outlet, Navigate} from 'react-router-dom';

function ProtectedRoutes({auth: {isAuthenticated}}) {
  return isAuthenticated ? <Outlet/> : <Navigate to="/login"/>;
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(ProtectedRoutes);
