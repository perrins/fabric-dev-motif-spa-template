import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import WelcomeComponent from './WelcomeComponent';

test('renders welcome message', () => {
  render(<WelcomeComponent />);
  const welcomeMessage = screen.getByText(/hello world!.../i);
  expect(welcomeMessage).toBeInTheDocument();
});