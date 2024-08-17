export function getMessageError(error: unknown) {
  if (error instanceof Error) {
    return error.message
  }
  return ''
}
