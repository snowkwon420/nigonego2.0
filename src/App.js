import { RecoilRoot } from 'recoil';
import Routing from './routes/Routing';
import GlobalStyle from './styles/globalstyle';
import styled from 'styled-components';

function App() {
  return (
    <Wrap>
    <RecoilRoot>
      <GlobalStyle />
      <Routing />
    </RecoilRoot>
    </Wrap>
  );
}

const Wrap = styled.div`
  position: relative;
  max-width: 430px;
  height: 100dvh;
  margin: 0 auto;
  box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);
  overflow: hidden;
`
export default App;
