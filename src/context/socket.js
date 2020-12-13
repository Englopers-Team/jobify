import React from 'react';

import io from 'socket.io-client';

export const SocketContext = React.createContext();

function SocketProvider(props) {
  const link = 'https://jobify-app-v2.herokuapp.com';
  const socketMessg = io(`${link}/messages`);
  const socketNotif = io(`http://localhost:4000/notification`);
  const state = {
    socketMessg,
    socketNotif
  };
  return (
    <SocketContext.Provider value={state}>
      {props.children}
    </SocketContext.Provider>
  );
}

export default SocketProvider;