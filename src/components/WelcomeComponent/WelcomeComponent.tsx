import React from 'react';
import styled from 'styled-components';
import packagejson from '../../../package.json';

const StyledDiv = styled.div`
  min-height: calc(89.5vh - 100px - 56px);
  text-align: center;
`;

const StyledH1 = styled.h1`
  margin: 150px 0 50px 0;
`;

const VersionDiv = styled.span`
  background: rgb(46, 46, 56);
  padding: 10px 16px;
  border-radius: 20px;

  a {
    color: rgb(255, 255, 255);
    line-height: 0;
    text-decoration: none;
  }
`;

const WelcomeComponent = () => {
  const motifVersion = packagejson.dependencies['@ey-xd/motif-react'];
  return (
    <StyledDiv>
      <StyledH1>Hello World!...</StyledH1>
      {motifVersion && (
        <VersionDiv>
          <a
            href="https://motif.eyfabric.ey.com/react/latest/storybook/?path=/docs/introduction--motif-react"
            target="_blank"
            rel="noreferrer"
          >
            EY Motif - Version: {motifVersion} | Theme: Motif DS Dark
          </a>
        </VersionDiv>
      )}
    </StyledDiv>
  );
};

export default WelcomeComponent;
