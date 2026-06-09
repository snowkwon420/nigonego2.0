/* eslint-disable react/jsx-filename-extension */
import Routing from '../router/Routing';
import GlobalStyle from '../styles/globalstyle';
import styled from 'styled-components';

const RootLayout: React.FC = () => {
  return (
    <Wrap>
      <GlobalStyle />
      <Routing />
    </Wrap>
  );
};

const Wrap = styled.div`
  position: relative;
  max-width: 430px;
  height: 100dvh;
  margin: 0 auto;
  box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);
  overflow: hidden;
`;

export default RootLayout;
