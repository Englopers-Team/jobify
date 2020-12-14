import { useEffect, useState, useContext } from 'react';
import { Alert } from 'react-bootstrap';
import { SocketContext } from '../../context/socket';
import { AuthContext } from '../../context/auth';
import { If, Then } from 'react-if'
import './styles.scss'

export default function Notification() {
  const context = useContext(SocketContext);
  const authContext = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  useEffect(() => {
    if (authContext.token) {
      context.socketNotif.emit('join', authContext.token);
      context.socketNotif.on('notification', (payload) => {
        if (!show) {
          setShow(true)
          setTitle(payload.title)
          setBody(payload.description)
          let notifi;
          setTimeout(() => {
            notifi = document.getElementById('notification')
            notifi.classList.add('downtoup')
          }, 300)
          setTimeout(() => {
            notifi.classList.remove('downtoup')
            setShow(false)
          }, 3300);
        }
      })
      context.socketNotif.emit('checkNotif', { token: authContext.token })
    }

    return () => {
      context.socketNotif.off('notification');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authContext.token]);

  return (
    <If condition={show}>
      <Then>
        <Alert id='notification' className='notif'>
          <Alert.Heading style={{ fontSize: '30px' }}>{title}</Alert.Heading>
          <p >
            {body}
          </p>
        </Alert>
      </Then>
    </If>
  )
}