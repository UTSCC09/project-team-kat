import React from 'react';
import {Route, Routes} from 'react-router-dom';

import Groups from '../Groups/Groups';
import GroupDetails from '../GroupDetails/GroupDetails';

const Home = () => {
  return (
    <div>
      <Routes>
        <Route exact path={'/'}
          element={<Groups />}/>
        <Route path="/groups/:id/"
          element={<GroupDetails />} />
      </Routes>

    </div>
  );
};

export default Home;
