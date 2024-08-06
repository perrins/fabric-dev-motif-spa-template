import React from 'react';
import { render, act, waitFor } from '@testing-library/react';
import { MsalProvider } from '@azure/msal-react';
import { PublicClientApplication } from '@azure/msal-browser';

jest.mock('@azure/msal-browser', () => ({
  PublicClientApplication: jest.fn().mockImplementation(() => ({
    addEventCallback: jest.fn(),
    removeEventCallback: jest.fn(),
  })),
  EventType: {
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    SSO_SILENT_SUCCESS: 'SSO_SILENT_SUCCESS',
    LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
  },
}));

jest.mock('@azure/msal-react', () => ({
  useIsAuthenticated: jest.fn(),
  useMsal: jest.fn().mockReturnValue({ instance: {} }),  // Aseguramos que la propiedad instance esté presente
  MsalProvider: ({ children }) => children,  // Mock MsalProvider como un componente de paso
}));

jest.mock('@ey/mfe-ui-core', () => ({
  LoginService: jest.fn().mockImplementation(() => ({
    attemptSSOSilent: jest.fn(),
    getUserInformation: jest.fn(),
  })),
}));

const App = require('./App').App;

describe('App', () => {
  const useIsAuthenticatedMock = require('@azure/msal-react').useIsAuthenticated;
  const useMsalMock = require('@azure/msal-react').useMsal;
  const LoginServiceMock = require('@ey/mfe-ui-core').LoginService;
  const { EventType } = require('@azure/msal-browser');

  beforeEach(() => {
    useIsAuthenticatedMock.mockReturnValue(true);
  });

  describe('Rendering and Initialization', () => {
    it('should render without crashing', () => {
      const msalInstance = new PublicClientApplication({
        auth: {
          clientId: 'fake-client-id',
          authority: 'fake-authority',
          redirectUri: 'fake-redirect-uri',
        },
      });

      const { container } = render(
        <MsalProvider instance={msalInstance}>
          <App />
        </MsalProvider>
      );
      expect(container).toBeInTheDocument();
    });

    it('should attempt silent SSO if not authenticated', async () => {
      let ssoAttempted = false;

      useIsAuthenticatedMock.mockReturnValue(false);
      LoginServiceMock.mockImplementation(() => ({
        attemptSSOSilent: jest.fn().mockImplementation(() => {
          ssoAttempted = true;
        }),
        getUserInformation: jest.fn(),
      }));

      render(<App />);

      await waitFor(() => {
        expect(ssoAttempted).toBe(true);
      });
    });
  });

  describe('Event Handling', () => {
    it('should update sessionStorage on LOGIN_SUCCESS or SSO_SILENT_SUCCESS event', async () => {
      const userDetail = { name: 'John Doe' };
      const accessToken = 'fake-access-token';

      LoginServiceMock.mockImplementation(() => ({
        attemptSSOSilent: jest.fn(),
        getUserInformation: jest.fn().mockResolvedValue(userDetail),
      }));

      useMsalMock.mockReturnValue({
        instance: {
          addEventCallback: (callback) => callback({
            eventType: EventType.LOGIN_SUCCESS,
            payload: { accessToken },
          }),
          removeEventCallback: jest.fn(),
        },
      });

      render(<App />);

      await waitFor(() => {
        expect(sessionStorage.getItem('accessToken')).toBe(accessToken);
      });

      await waitFor(() => {
        expect(sessionStorage.getItem('userDetail')).toBe(JSON.stringify(userDetail));
      });
    });

    it('should handle SSO_SILENT_SUCCESS event', async () => {
      const accessToken = 'fake-access-token';
      const userDetail = { name: 'John Doe' };

      LoginServiceMock.mockImplementation(() => ({
        attemptSSOSilent: jest.fn(),
        getUserInformation: jest.fn().mockResolvedValue(userDetail),
      }));

      useMsalMock.mockReturnValue({
        instance: {
          addEventCallback: (callback) => callback({
            eventType: EventType.SSO_SILENT_SUCCESS,
            payload: { accessToken },
          }),
          removeEventCallback: jest.fn(),
        },
      });

        render(<App />);

      await waitFor(() => {
        expect(sessionStorage.getItem('accessToken')).toBe(accessToken);
      });

      await waitFor(() => {
        expect(sessionStorage.getItem('userDetail')).toBe(JSON.stringify(userDetail));
      });
    });

    it('should handle LOGIN_SUCCESS event', async () => {
      const accessToken = 'fake-access-token';
      const userDetail = { name: 'John Doe' };

      LoginServiceMock.mockImplementation(() => ({
        attemptSSOSilent: jest.fn(),
        getUserInformation: jest.fn().mockResolvedValue(userDetail),
      }));

      useMsalMock.mockReturnValue({
        instance: {
          addEventCallback: (callback) => callback({
            eventType: EventType.LOGIN_SUCCESS,
            payload: { accessToken },
          }),
          removeEventCallback: jest.fn(),
        },
      });

      render(<App />);

      await waitFor(() => {
        expect(sessionStorage.getItem('accessToken')).toBe(accessToken);
      });

      await waitFor(() => {
        expect(sessionStorage.getItem('userDetail')).toBe(JSON.stringify(userDetail));
      });
    });

    it('should handle LOGOUT_SUCCESS event', () => {
      sessionStorage.setItem('accessToken', 'fake-access-token');
      sessionStorage.setItem('userDetail', JSON.stringify({ name: 'John Doe' }));

      useMsalMock.mockReturnValue({
        instance: {
          addEventCallback: (callback) => callback({
            eventType: EventType.LOGOUT_SUCCESS,
          }),
          removeEventCallback: jest.fn(),
        },
      });

      render(<App />);

      expect(sessionStorage.getItem('accessToken')).toBeNull();
      expect(sessionStorage.getItem('userDetail')).toBeNull();
    });

    it('should handle error from getUserInformation', async () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { });

      const error = new Error('Failed to fetch user information');

      LoginServiceMock.mockImplementation(() => ({
        attemptSSOSilent: jest.fn(),
        getUserInformation: jest.fn().mockRejectedValue(error),
      }));

      useMsalMock.mockReturnValue({
        instance: {
          addEventCallback: (callback) => callback({
            eventType: EventType.LOGIN_SUCCESS,
            payload: { accessToken: 'fake-access-token' },
          }),
          removeEventCallback: jest.fn(),
        },
      });

      render(<App />);

      await waitFor(() => {
        expect(consoleErrorSpy).toHaveBeenCalledWith(error);
      });
    });

    it('should not add event callback if instance is null', () => {
      useMsalMock.mockReturnValue({
        instance: null,
      });

      render(<App />);
      expect(useMsalMock().instance?.addEventCallback).toBeUndefined();
    });

    it('should not call getUserInformation if token is empty', async () => {
      LoginServiceMock.mockImplementation(() => ({
        attemptSSOSilent: jest.fn(),
        getUserInformation: jest.fn(),
      }));

      useMsalMock.mockReturnValue({
        instance: {
          addEventCallback: (callback) => callback({
            eventType: EventType.LOGIN_SUCCESS,
            payload: { accessToken: '' },
          }),
          removeEventCallback: jest.fn(),
        },
      });

      render(<App />);

      await waitFor(() => {
        expect(LoginServiceMock().getUserInformation).not.toHaveBeenCalled();
      });
    });
  });

  describe('Cleanup', () => {
    it('should remove event callback on unmount', () => {
      const callbackId = 'fake-callback-id';

      useMsalMock.mockReturnValue({
        instance: {
          addEventCallback: jest.fn().mockReturnValue(callbackId),
          removeEventCallback: jest.fn(),
        },
      });

      const { unmount } = render(<App />);

      unmount();

      expect(useMsalMock().instance.removeEventCallback).toHaveBeenCalledWith(callbackId);
    });
  });

  it('should ignore unsupported event types', () => {
    useMsalMock.mockReturnValue({
      instance: {
        addEventCallback: (callback) => callback({
          eventType: 'UNSUPPORTED_EVENT',
          payload: { accessToken: 'fake-access-token' },
        }),
        removeEventCallback: jest.fn(),
      },
    });

    sessionStorage.clear();

    render(<App />);

    expect(sessionStorage.getItem('accessToken')).toBeNull();
    expect(sessionStorage.getItem('userDetail')).toBeNull();
  });
  
});
