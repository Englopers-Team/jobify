import React from 'react';

import io from 'socket.io-client';

export const SocketContext = React.createContext();

function SocketProvider(props) {
  const link = 'https://jobify-app-v2.herokuapp.com/messages';
  const socketMessg = io(link);

  const state = {
    socketMessg
  };
  return (
    <SocketContext.Provider value={state}>
      {props.children}
    </SocketContext.Provider>
  );
}

export default SocketProvider;