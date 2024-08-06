import React from 'react';
import { createRoot } from 'react-dom/client';
import { LoginService } from '@ey/mfe-ui-core';
import { MsalProvider } from '@azure/msal-react';
import { Router } from './helpers/Routing';

const { REACT_APP_CLIENT_ID, REACT_APP_TENANT_ID, REACT_APP_AUTHORITY_URL } = process.env;

console.log(window.location.href);
const msalConfig = {
  clientId: REACT_APP_CLIENT_ID!,
  tenantId: REACT_APP_TENANT_ID!,
  authorityUrl: REACT_APP_AUTHORITY_URL!,
  redirectUrl: window.location.href,
  postLogoutRedirectUri: window.location.href,
  storeAuthStateInCookie: false
};


const renderer = () => {
  const root = createRoot(document.getElementById('app')!);
  const msalInstance = new LoginService().generateMSALInstance(msalConfig);
  msalInstance.initialize().then(() => {
    root.render(
      <MsalProvider instance={msalInstance}>
        <Router data-testid="router-component"/>
      </MsalProvider>
    );
  });
};

export { renderer as default };
