import { fireEvent, render, screen } from '@testing-library/react';
import Home from 'pages/Home';

test('should toggel to the table view', () => {
  render(<Home />);
  // Chart view is rendered as default
  expect(screen.getByRole('tabpanel', { name: /chart/i })).toBeInTheDocument();
  // fire click event on table tab
  const tableBar = screen.getByRole('tab', { name: /table/i, selected: false });
  fireEvent(
    tableBar,
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    }),
  );
  // Table view will be rendered after firing event
  expect(screen.getByRole('tabpanel', { name: /table/i })).toBeInTheDocument();
});
