import { Link } from 'react-router-dom';
export default function Home() {
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Link to={{ pathname: '/signin' }}>test</Link>
        <Link to={{ pathname: '/company/submitted-jobs' }}>company submitted jobs</Link>
        <Link to={{ pathname: '/company/applications' }}>company applications</Link>
        <Link to={{ pathname: '/company/edit-profile' }}>company edit profile</Link>
        <Link to={{ pathname: '/company/submit-job' }}>Submit job</Link>
        <Link to={{ pathname: '/company/offers' }}>company offers</Link>
      </div>
    </>
  );
}
