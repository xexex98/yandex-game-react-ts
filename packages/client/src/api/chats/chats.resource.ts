import { API_URL, APPLICATION_JSON } from '../../consts'
import { getChatsAdapter } from './chats.adapter'

export const getChats = async () => {
  const response = await fetch(`${API_URL}/chats`, {
    method: 'GET',
    credentials: 'include',
    headers: APPLICATION_JSON,
  })

  const data = await response.json()

  return getChatsAdapter(data)
}
export const createChat = async (title: string) => {
  const response = await fetch(`${API_URL}/chats`, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify({ title }),
    headers: APPLICATION_JSON,
  })

  return await response.json()
}

