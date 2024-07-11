import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';

import { GamePage } from '..';

// @ts-expect-error Это тест для отладки
global.fetch = jest.fn(() =>
  Promise.resolve({ json: () => Promise.resolve('hey') })
);

describe('Game test', () => {
  const initialState = { gameState: { status: 'new' } };

  function makeStore(overrideState: { gameState?: { status: string } }) {
    return configureStore({
      initialState: { ...initialState, ...overrideState },
    });
  }

  it('test 1', () => {
    const store = makeStore({});

    render(
      <Provider store={store}>
        <GamePage />
      </Provider>
    );
    console.info('123');
    expect(screen.getByText('Test')).toBeDefined();
  });
});
