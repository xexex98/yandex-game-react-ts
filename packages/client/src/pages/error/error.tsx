import React from 'react'
import { isRouteErrorResponse, useRouteError } from 'react-router-dom'

const ErrorPage = () => {
  const error = useRouteError()
  if (isRouteErrorResponse(error)) {
    return (
      <div id="error-page">
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <b>{error.status}</b>
        </p>
        <p>
          <i>{error.statusText}</i>
        </p>
      </div>
    )
  } else {
    return (
      <div>
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
      </div>
    )
  }
}

export default ErrorPage
