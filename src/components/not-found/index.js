import { Container, Image } from "react-bootstrap";
import { Link } from 'react-router-dom'
import err from './404.gif'

export default function NotFound() {
  return (
    <Container className='flexCol' style={{ textAlign: 'center'}}>
      <Image src={err} />
      <Link to={{ pathname: '/' }}><h1>Go back home</h1></Link>
    </Container>
  )
}