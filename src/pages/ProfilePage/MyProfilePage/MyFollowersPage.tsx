import Navbar from '../../../shared/components/Navbar/Navbar';
import UserFollow from '../../../shared/components/User/UserFollow';
import { HeaderBasicNav } from '../../../shared/components/Header/Header';

export default function MyFollowersPage() {
  return (
    <>
      <HeaderBasicNav>팔로워</HeaderBasicNav>
      <UserFollow />
      <Navbar homeV={true} chatV={true} postV={true} profileV={false} />
    </>
  );
}
