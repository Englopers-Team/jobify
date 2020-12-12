import React from 'react';

export const AuthContext = React.createContext();

function AuthProvider(props) {

  const state = {
  };

  return (
    <AuthContext.Provider value={state}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;