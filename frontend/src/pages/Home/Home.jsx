import React from 'react';
import {Route, useLocation, Routes} from 'react-router-dom';

import Groups from '../Groups/Groups';


const Home = () => {
  const locaton = useLocation();
  return (
    <div>
      <Routes>
        <Route path={`${locaton.pathname}`}
          element={<Groups />}/>
      </Routes>

    </div>
  );
};

export default Home;
