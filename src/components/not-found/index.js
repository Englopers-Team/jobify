import { Container, Image } from "react-bootstrap";
import { Link } from 'react-router-dom'
export default function NotFound() {
  return (
    <Container className='flexCol' style={{ textAlign: 'center'}}>
      <Image src='https://im4.ezgif.com/tmp/ezgif-4-78dfa568a4b1.gif' />
      <Link to={{ pathname: '/' }}><h1>Go back home</h1></Link>

    </Container>
  )
}