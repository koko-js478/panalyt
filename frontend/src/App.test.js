import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Home component', () => {
  render(<App />);
  const homeComponent = document.querySelector('#home');
  expect(homeComponent).toBeInTheDocument();
});
