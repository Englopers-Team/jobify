import React, { useState } from 'react';

import io from 'socket.io-client';

export const SocketContext = React.createContext();

function SocketProvider(props) {
  const [update, setUpdate] = useState('')
  const link = 'https://jobify-app-v2.herokuapp.com';
  const socketMessg = io(`${link}/messages`);
  const socketNotif = io(`${link}/notification`);
  const state = {
    socketMessg,
    socketNotif,
    update,
    setUpdate
  };
  return (
    <SocketContext.Provider value={state}>
      {props.children}
    </SocketContext.Provider>
  );
}

export default SocketProvider;