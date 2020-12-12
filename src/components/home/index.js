import {Link} from 'react-router-dom'
export default function Home() {
  return (
    <>
      test
      <Link to={{ pathname: '/signin' }}>test</Link>
    </>
  )
}