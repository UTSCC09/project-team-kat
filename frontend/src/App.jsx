import Navbar from './components/Navbar/Navbar';
import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Landing from './pages/Landing/Landing';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import GroupCanvas from './pages/GroupCanvas/GroupCanvas';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />}/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/canvas" element={<GroupCanvas />} />
      </Routes>
    </div>
  );
}

export default App;
