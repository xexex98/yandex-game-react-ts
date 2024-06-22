import { lazy, Suspense } from 'react'

const SignUp = lazy(() =>
  import('./lazy').then(({ SignUp }) => ({ default: SignUp }))
)

export function LazySignUp() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignUp />
    </Suspense>
  )
}
