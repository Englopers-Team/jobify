import React from 'react';

export const SocketContext = React.createContext();

function SocketProvider(props) {
  

  const state = {
  };

  return (
    <SocketContext.Provider value={state}>
      {props.children}
    </SocketContext.Provider>
  );
}

export default SocketProvider;