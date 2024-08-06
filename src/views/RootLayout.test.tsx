import React,{act} from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import RootLayout from './RootLayout';


jest.mock('@components/Loading/Loading', () => () => <div>Loading Mock</div>);
jest.mock('@azure/msal-react', () => ({
  AuthenticatedTemplate: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  UnauthenticatedTemplate: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));


jest.mock('map_header/Header', () => () => <div>Header Mock</div>);
jest.mock('map_footer/Footer', () => () => <div>Footer Mock</div>);

jest.mock('@ey/mfe-ui-core', () => ({
  ErrorBoundary: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

test('renders authenticated layout', async () => {
  // eslint-disable-next-line testing-library/no-unnecessary-act
  await act(async () => {
    render(<RootLayout />);
  });
  const header = screen.getByText(/header mock/i);
  const footer = screen.getByText(/footer mock/i);
  expect(header).toBeInTheDocument();
  expect(footer).toBeInTheDocument();
});

test('renders unauthenticated layout', async () => {
  jest.doMock('@azure/msal-react', () => ({
    AuthenticatedTemplate: ({ children }: { children: React.ReactNode }) => null,
    UnauthenticatedTemplate: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  }));

  // eslint-disable-next-line testing-library/no-unnecessary-act
  await act(async () => {
    render(<RootLayout />);
  });
  const loading = screen.getByText(/loading mock/i);
  expect(loading).toBeInTheDocument();
});
