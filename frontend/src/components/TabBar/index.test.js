import { useState } from 'react';
import { render, screen } from '@testing-library/react';
import TabBar from './index.tsx';

test('should select chart', () => {
  render(<TabBar value={0} />);

  expect(
    screen.getByRole('tab', { name: /chart/i, selected: true }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole('tab', { name: /table/i, selected: false }),
  ).toBeInTheDocument();
});

test('should select table', () => {
  render(<TabBar value={1} />);

  expect(
    screen.getByRole('tab', { name: /chart/i, selected: false }),
  ).toBeVisible();
  expect(
    screen.getByRole('tab', { name: /table/i, selected: true }),
  ).toBeInTheDocument();
});
