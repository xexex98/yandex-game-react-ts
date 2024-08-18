import { NonIndexRouteObject } from 'react-router-dom';

import { PageInitArgs } from '../routes';

export const APPLICATION_JSON = {
  'Content-Type': 'application/json;charset=utf-8',
};
export const API_URL = 'https://ya-praktikum.tech/api/v2';
export const REDIRECT_URI = 'http://localhost:3000';
export const OAUTH_URL =
  'https://oauth.yandex.ru/authorize?response_type=code&client_id=';
export const COOKIE_IS_NOT_VALID = 'Cookie is not valid';

export interface CustomNonIndexRouteObject extends NonIndexRouteObject {
  fetchData: ({ dispatch, state }: PageInitArgs) => Promise<unknown>;
}

export type CustomRouteObject = CustomNonIndexRouteObject;
