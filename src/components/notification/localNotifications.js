import { Alert } from 'react-bootstrap';

import { If, Then } from 'react-if';
import './styles.scss';

export default function LocalNotification(props) {
  return (
    <>
      <If condition={props.show}>
        <Then>
          <Alert id='notification2' className='notif' style={{ boxShadow: '5px 10px rgb(224, 215, 215)' }}>
            <Alert.Heading style={{ textAlign: 'left', fontSize: '30px' }}>{props.title}</Alert.Heading>
            <p style={{ textAlign: 'left', fontSize: '20px' }}>{props.body}</p>
          </Alert>
        </Then>
      </If>
    </>
  );
}
