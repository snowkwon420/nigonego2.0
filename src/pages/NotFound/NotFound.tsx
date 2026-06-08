
import SVG from '../../shared/assets/images/404 page.svg';
import { Image, NotFoundText, NotFoundBtn } from './NotFoundStyle';
import Layout from '../../app/styles/Layout';

export default function NotFound() {
  return (
    <Layout align="center">
      <Image src={SVG} alt="404" />
      <NotFoundText>페이지를 찾을 수 없음</NotFoundText>
      <NotFoundBtn>이전페이지</NotFoundBtn>
    </Layout>
  );
}
