import Navbar from '../../../shared/components/Navbar/Navbar';
import { HeaderBasicNav } from '../../../shared/components/Header/Header';
import MyProfileContainer from '../../../features/profile/components/MyProfileContainer';

export default function MyProfilePage() {
  return (
    <>
      <HeaderBasicNav />
      <MyProfileContainer />
      <Navbar homeV={true} chatV={true} postV={true} profileV={false} />
    </>
  );
}


