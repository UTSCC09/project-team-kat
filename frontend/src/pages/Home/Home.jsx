import React from 'react';
import {Route, Routes} from 'react-router-dom';

import Groups from '../Groups/Groups';
import GroupDetails from '../GroupDetails/GroupDetails';
import GroupCanvas from './pages/GroupCanvas/GroupCanvas';

const Home = () => {
  return (
    <div>
      <Routes>
        <Route exact path={'/'}
          element={<Groups />}/>
        <Route path="/groups/:id/"
          element={<GroupDetails />} />
        <Route path="/groups/:groupID/canvas"
          element={<GroupCanvas />}/>
      </Routes>

    </div>
  );
};

export default Home;
