import { Link } from 'react-router-dom';
export default function Home() {
  return (
    <>
      test
      <Link to={{ pathname: '/signin' }}>test</Link>
      <Link to={{ pathname: '/company/submitted-jobs' }}>company submitted jobs</Link>
      <Link to={{ pathname: '/company/applications' }}>company applications</Link>
    </>
  );
}
