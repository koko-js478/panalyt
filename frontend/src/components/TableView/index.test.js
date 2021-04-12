import { render, screen, within } from '@testing-library/react';
import TableView from 'components/TableView';

test('should render the header', () => {
  render(<TableView data={[]} locations={[]} />);
  expect(
    screen.getByRole('row', { name: /location salary delta/i }),
  ).toBeInTheDocument();
});

test('should render the empty data', () => {
  render(<TableView data={[]} locations={[]} />);
  expect(screen.getByRole('cell', { name: /total/i })).toBeInTheDocument();
  // test the font weight of the total
  expect(screen.getByRole('cell', { name: /total/i })).toHaveStyle(
    'font-weight: 400',
  );
  expect(screen.getByRole('cell', { name: /\$0/i })).toBeInTheDocument();
  expect(screen.getByRole('cell', { name: /\+0%/i })).toBeInTheDocument();
});

test('should render the single row', () => {
  render(
    <TableView
      data={[{ prevSalary: 100, currSalary: 120, employeeCount: 1 }]}
      locations={['US']}
    />,
  );
  const row = screen.getByRole('row', {
    name: /us \$120 \+20%/i,
  });
  // test the background of the delta with positive value
  expect(
    within(row).getByRole('cell', {
      name: /\+20%/i,
    }),
  ).toHaveStyle('background: rgb(191, 251, 91)');
});
