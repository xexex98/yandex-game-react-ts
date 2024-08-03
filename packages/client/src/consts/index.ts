import { NonIndexRouteObject } from 'react-router-dom';

import { PageInitArgs } from '../routes';

export const APPLICATION_JSON = {
  'Content-Type': 'application/json;charset=utf-8',
};
export const API_URL = 'https://ya-praktikum.tech/api/v2';

export interface CustomNonIndexRouteObject extends NonIndexRouteObject {
  fetchData: ({ dispatch, state }: PageInitArgs) => Promise<unknown>;
}

export type CustomRouteObject = CustomNonIndexRouteObject;
