import Navbar from '../../../shared/components/Navbar/Navbar';
import { HeaderBasicNav } from '../../../shared/components/Header/Header';
import Layout from '../../../app/styles/Layout';
import YourProfileContainer from '../../../features/profile/components/YourProfileContainer';

export default function YourProfilePage() {
  return (
    <Layout>
      <HeaderBasicNav />
      <YourProfileContainer />
      <Navbar homeV={false} chatV={true} postV={true} profileV={true} />
    </Layout>
  );
}


