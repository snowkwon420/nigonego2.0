import { RecoilRoot } from 'recoil';
import Routing from './routes/Routing.jsx';
import GlobalStyle from './styles/globalstyle.js';
import styled from 'styled-components';

const App: React.FC = () => {
  return (
    <Wrap>
      <RecoilRoot>
        <GlobalStyle />
        <Routing />
      </RecoilRoot>
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
export default App;
