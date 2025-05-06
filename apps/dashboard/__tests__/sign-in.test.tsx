import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { SignInPage } from '../src/app/(unauthenticated)/sign-in/[[...sign-in]]/page';

test('Sign In Page', () => {
  render(<SignInPage />);
  expect(
    screen.getByRole('heading', {
      level: 1,
      name: 'Welcome back',
    })
  ).toBeDefined();
});
