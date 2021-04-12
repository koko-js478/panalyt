import { render, screen, within } from '@testing-library/react';
import FilterBar from 'components/FilterBar';

test('should render the single checked item', () => {
  const { container } = render(
    <FilterBar locations={['US']} selections={[true]} />,
  );
  const formControlLabel = container.querySelector('#US');
  expect(formControlLabel).toBeInTheDocument();
  expect(formControlLabel.firstChild).toHaveClass('Mui-checked');
});
