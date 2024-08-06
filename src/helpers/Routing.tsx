import React from 'react';
import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router-dom';
import RootLayout from '../views/RootLayout';
import WelcomeComponent from '../components/WelcomeComponent/WelcomeComponent';
import { App } from '../App';

export const MenuItemsContext = React.createContext({});

export function Router() {
  const routes: RouteObject[] = [
    {
      element: <App />,
      children: [
        {
          path: '/',
          element: <RootLayout />,
          children: [
            {
              index: true,
              element: <WelcomeComponent />
            }
          ]
        }
      ]
    }
  ];

  // Dynamically finding the base path to work in Frontdoor URLs
  const parsedURL = window.location.pathname.split('/');
  const basePath = parsedURL[1] ? `/${parsedURL[1]}` : '/';
  const browserRouter = createBrowserRouter(routes, { basename: basePath });

  return (
    <>
      <RouterProvider router={browserRouter} />
    </>
  );
}
