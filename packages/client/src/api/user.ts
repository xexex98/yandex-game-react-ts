import { API_URL, APPLICATION_JSON } from '../consts';
import { AuthUserResponse } from '../store/modules/auth/authSlice';

export const searchUsers = async (
  logins: string
): Promise<Array<AuthUserResponse>> => {
  const response = await fetch(`${API_URL}/user/search`, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify({ login: logins }),
    headers: APPLICATION_JSON,
  });

  return (await response.json()) as Array<AuthUserResponse>;
};
