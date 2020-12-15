import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../context/auth';
import { If, Then, Else } from 'react-if'

import Guest from '../guest/dashboard'
import User from '../user/dashboard'
import Company from '../company/dashboard'

export default function Home() {
  const context = useContext(AuthContext);


  return (
    <>
      <If condition={context.token}>
        <Then>
          <If condition={context.user.account_type === 'p'}>
            <User />
          </If>

          <If condition={context.user.account_type === 'c'}>
            <Company/>
          </If>
        </Then>
        <Else>
          <Guest />
        </Else>
      </If>
    </>
  );
}
