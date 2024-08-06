import { render } from '@testing-library/react';
import { Router } from './Routing';
import { RouterProvider } from 'react-router-dom';

jest.mock('react-router-dom', () => {
  const actualModule = jest.requireActual('react-router-dom');
  const createMemoryHistory = require('history').createMemoryHistory;
  return {
    ...actualModule,
    RouterProvider: ({ children }) => <div>{children}</div>,
    createBrowserRouter: () => ({
      basename: '/',
      history: createMemoryHistory(),
      routes: [],
      addRoutes: () => {},
      matcher: {
        match: () => null,
        getRoutes: () => [],
        insertRoutes: () => {},
        isActive: () => false,
        resolve: () => '',
      },
    }),
  };
});

describe('Router component', () => {
    it('renders without crashing with truthy parsedURL[1]', () => {
        Object.defineProperty(window, 'location', {
          value: {
            pathname: '/truthy'
          },
          writable: true
        });
      
        render(<Router />);
      });
      
      it('renders without crashing with falsy parsedURL[1]', () => {
        Object.defineProperty(window, 'location', {
          value: {
            pathname: '/'
          },
          writable: true
        });
      
        render(<Router />);
      });
  });