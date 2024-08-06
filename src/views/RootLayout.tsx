import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react';
import Loading from '../components/Loading/Loading';
import { ErrorBoundary } from '@ey/mfe-ui-core';

const Header = React.lazy(() => import('map_header/Header'));
const Footer = React.lazy(() => import('map_footer/Footer'));

const RootLayout = () => {
  return (
    <>
      <div className="root-layout">
        <AuthenticatedTemplate>
          <ErrorBoundary fallback={<div>Unable to load header</div>}>
            <Suspense fallback={<div>Loading Header...</div>}>
              <Header />
            </Suspense>
          </ErrorBoundary>

          <Outlet />

          <ErrorBoundary fallback={<div>Unable to load footer</div>}>
            <Suspense fallback={<div>Loading Footer...</div>}>
              <Footer />
            </Suspense>
          </ErrorBoundary>
        </AuthenticatedTemplate>

        <UnauthenticatedTemplate>
          <Loading />
        </UnauthenticatedTemplate>
      </div>
    </>
  );
};
export default RootLayout;
