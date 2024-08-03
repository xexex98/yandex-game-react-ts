import { useEffect } from 'react';

import { PageInitArgs, PageInitContext } from '../routes';
import { useAppDispatch, useAppStore } from '../store';

type PageProps = {
  initPage: (data: PageInitArgs) => Promise<unknown>;
};

const getCookie = (name: string) => {
  const matches = document.cookie.match(
    new RegExp(
      '(?:^|; )' +
        // eslint-disable-next-line
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') +
        '=([^;]*)'
    )
  );

  return matches ? decodeURIComponent(matches[1]) : undefined;
};

const createContext = (): PageInitContext => ({
  clientToken: getCookie('token'),
});

export const usePage = ({ initPage }: PageProps) => {
  const dispatch = useAppDispatch();
  const store = useAppStore();

  useEffect(() => {
    initPage({ dispatch, state: store.getState(), ctx: createContext() });
  }, []);
};
