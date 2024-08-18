import { Request, Response } from 'express'
import { User } from './types'

export function Auth(
  _target: unknown,
  _propertyKey: string | symbol,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value
  descriptor.value = async function (req: Request, res: Response) {
    const requestHeaders = new Headers()
    requestHeaders.set('Cookie', req.headers.cookie ?? '')
    const answer = await fetch('https://ya-praktikum.tech/api/v2/auth/user', {
      headers: requestHeaders,
    })
    if (answer.status === 200) {
      const user = (await answer.json()) as User
      return originalMethod.apply({ ...this, user }, [req, res])
    }
    res.status(403).send('Cookie is not valid')
  }
}
