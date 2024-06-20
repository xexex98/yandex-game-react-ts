import React from 'react'
import { useRouteError } from 'react-router-dom'

const ErrorPage = () => {
  const error = useRouteError()
  console.error(error)

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <b>{error.status}</b>
      </p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  )
  return <div>ErrorPage</div>
}

export default ErrorPage
