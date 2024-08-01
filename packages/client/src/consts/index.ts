import type {
  AgnosticNonIndexRouteObject,
  LazyRouteFunction,
} from '@remix-run/router';
import { RouteObject } from 'react-router-dom';

import { PageInitArgs } from '../routes';

export const APPLICATION_JSON = {
  'Content-Type': 'application/json;charset=utf-8',
};
export const API_URL = 'https://ya-praktikum.tech/api/v2';

export interface CustomNonIndexRouteObject {
  caseSensitive?: AgnosticNonIndexRouteObject['caseSensitive'];
  path?: AgnosticNonIndexRouteObject['path'];
  id?: AgnosticNonIndexRouteObject['id'];
  loader?: AgnosticNonIndexRouteObject['loader'];
  action?: AgnosticNonIndexRouteObject['action'];
  hasErrorBoundary?: AgnosticNonIndexRouteObject['hasErrorBoundary'];
  shouldRevalidate?: AgnosticNonIndexRouteObject['shouldRevalidate'];
  handle?: AgnosticNonIndexRouteObject['handle'];
  index?: false;
  children?: RouteObject[];
  element?: React.ReactNode | null;
  hydrateFallbackElement?: React.ReactNode | null;
  errorElement?: React.ReactNode | null;
  Component?: React.ComponentType | null;
  HydrateFallback?: React.ComponentType | null;
  ErrorBoundary?: React.ComponentType | null;
  lazy?: LazyRouteFunction<RouteObject>;
  fetchData: ({ dispatch, state }: PageInitArgs) => Promise<unknown>;
}
export type CustomRouteObject = CustomNonIndexRouteObject;
