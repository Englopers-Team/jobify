import { Container, Image } from "react-bootstrap";
import { Link } from 'react-router-dom'
import deny from './deny.png'

export default function NoAccess() {
  return (
    <Container className='flexCol' style={{ textAlign: 'center' }}>
      <Image src={deny} />
      <h1 style={{marginTop:'50px'}}>You are not allowed to access the website</h1>

    </Container>
  )
}