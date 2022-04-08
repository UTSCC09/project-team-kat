import React from 'react';
import LandingPicture from '../../images/landing.png';
import {PageContainer, Wrapper, Heading, Info, ImageContaner,
  Image, Button, JoinBtn, Credits} from './Landing.styles';

function Landing() {
  return (
    <PageContainer>
      <Wrapper>
        <Heading>
            Welcome to Paymates!
        </Heading>
        <Info>
          {`PayMates offers an easy and affordable way to 
            split costs and communicate between your roomates.`}
        </Info>
        <ImageContaner>
          <Image src={LandingPicture} />
        </ImageContaner>
        <Button>
          <JoinBtn to="/register">Join Paymates today!</JoinBtn>
        </Button>
        <Credits to="/credits">Credits</Credits>
      </Wrapper>
    </PageContainer>
  );
}

export default Landing;
