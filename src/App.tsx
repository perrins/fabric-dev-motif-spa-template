import React, { useEffect, useMemo } from 'react';
import './main.scss';
import { Outlet } from 'react-router-dom';
import { LoginService } from '@ey/mfe-ui-core';
import { useIsAuthenticated, useMsal } from '@azure/msal-react';
import { EventMessage, EventType } from '@azure/msal-browser';

export const App = () => {
  const loginService = useMemo(() => new LoginService(), []);
  const isAuthenticated = useIsAuthenticated();
  const msal = useMsal();
  const instance = msal ? msal.instance : null; 
  console.info(`isAuthenticated - Home Application`, isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      loginService.attemptSSOSilent('loginPopup');
    }
  }, [isAuthenticated,loginService]);

  useEffect(() => {
    let callbackId: string | null = null;
    if (instance) {
      callbackId = instance.addEventCallback((message: EventMessage) => {
      if (message.eventType === EventType.LOGIN_SUCCESS || message.eventType === EventType.SSO_SILENT_SUCCESS) {
        sessionStorage.setItem('accessToken', message.payload!['accessToken']);
        const token = message.payload!['accessToken'];
        if (token !== '') {
          loginService
            .getUserInformation(token)
            .then((userDetail) => {
              sessionStorage.setItem('userDetail', JSON.stringify(userDetail));
            })
            .catch((error) => {
              console.error(error);
            });
        }
      } else if (message.eventType === EventType.LOGOUT_SUCCESS) {
        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('userDetail');
      }
    });
  }

  return () => {
    if (callbackId && instance) {
      instance.removeEventCallback(callbackId);
    }
  };
}, [instance,loginService]);

  return  <Outlet />;
};
