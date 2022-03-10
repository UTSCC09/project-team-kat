import React from 'react';

import {PageContainer, Content} from './PopUp.styles';

function PopUp(props) {
  return (
    <PageContainer>
      <Content>{props.children}</Content>
    </PageContainer>
  );
}

export default PopUp;
