import Navbar from '../../shared/components/Navbar/Navbar';
import { HeaderBasicNav } from '../../shared/components/Header/Header';
import HomeFeedContainer from '../../features/feed/components/HomeFeedContainer';

function HomeFeed() {
  return (
    <>
      <HeaderBasicNav />
      <HomeFeedContainer />
      <Navbar homeV={false} chatV={true} postV={true} profileV={true} />
    </>
  );
}

export default HomeFeed;
