import { lazy, Suspense } from 'react';

import { Loader } from '../../components/Loader';

const SignUp = lazy(() =>
  import('./lazy').then(({ SignUp }) => ({ default: SignUp }))
);

export function LazySignUp() {
  return (
    <Suspense fallback={<Loader />}>
      <SignUp />
    </Suspense>
  );
}
