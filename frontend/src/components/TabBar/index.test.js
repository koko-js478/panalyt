import { render, screen } from '@testing-library/react';
import TabBar from 'components/TabBar';

test('should render buttons for the chart and the table', () => {
  render(<TabBar />);
  expect(screen.getByText('Chart')).toBeInTheDocument();
  expect(screen.getByText('Table')).toBeInTheDocument();
});

test('should select chart', () => {
  render(<TabBar />);
  expect(
    screen.getByRole('tab', { name: /chart/i, selected: true }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole('tab', { name: /table/i, selected: false }),
  ).toBeInTheDocument();
});
