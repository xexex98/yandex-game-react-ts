import { lazy, Suspense } from 'react';

import { Loader } from '../../components/Loader';

const SignIn = lazy(() =>
  import('./lazy').then(({ SignIn }) => ({ default: SignIn }))
);

export function LazySignIn() {
  return (
    <Suspense fallback={<Loader />}>
      <SignIn />
    </Suspense>
  );
}
