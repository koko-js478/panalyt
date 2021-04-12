import { render } from '@testing-library/react';
import ChartView from 'components/ChartView';

test('should have the fixed height', () => {
  const { container } = render(
    <ChartView
      data={[{ prevSalary: 100, currSalary: 120, employeeCount: 1 }]}
      locations={['US']}
    />,
  );
  expect(container.firstChild).toHaveStyle('height: 600px');
});
