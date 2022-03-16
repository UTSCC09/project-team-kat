import React from 'react';
import {Route, useLocation, Routes} from 'react-router-dom';

import Groups from '../Groups/Groups';
import GroupDetails from '../GroupDetails/GroupDetails';

const Home = () => {
  const locaton = useLocation();
  return (
    <div>
      <Routes>
        <Route path={`${locaton.pathname}`}
          element={<Groups />}/>
        <Route path="/groups/:id/"
          element={<GroupDetails />} />
      </Routes>

    </div>
  );
};

export default Home;
