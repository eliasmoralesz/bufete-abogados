import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import './i18n';

test('renders the site header without crashing', () => {
  render(
    <HelmetProvider>
      <App />
    </HelmetProvider>
  );
  expect(screen.getByRole('banner')).toBeInTheDocument();
});
