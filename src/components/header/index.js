import CompanyHeader from './company';
import UserHeader from './user';
import GuestHeader from './guest';
import './styles.scss';
import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../../context/auth';
import './styles.scss';
import { If, Then, Else } from 'react-if';
export default function Header(props) {
  const context = useContext(AuthContext);

  useEffect(() => {
    if (context.token) {

    }
  }, [context.token])
  return (
    <>
      <If condition={context.token !== ''}>

        <If condition={context.user.account_type === 'p'}>
          <Then>
            <UserHeader />
          </Then>
          <Else>
            <If condition={context.user.account_type === 'c'}>
              <Then>
                <CompanyHeader />
              </Then>
              <Else>
                <If condition={context.user.account_type === 'admin'}>
                  <Then>
                    <CompanyHeader />
                  </Then>
                  <Else>
                    <GuestHeader />
                  </Else>
                </If>
              </Else>
            </If>
          </Else>
        </If>
      </If>
    </>
  );
}
