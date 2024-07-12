import { render, screen } from '@testing-library/react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import { GamePage } from '..';

describe('Game test', () => {
  const mockStore = configureStore();

  it('Тестируем состояние начала игры', () => {
    const initialState = { gameState: { status: 'new' } };
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <GamePage />
      </Provider>
    );

    expect(screen.getByText('Начать игру')).toBeDefined();
  });

  it('Тестируем начальное состояние счетчика', () => {
    const initialState = { gameState: { status: 'started' } };
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <GamePage />
      </Provider>
    );

    expect(screen.getByText('Game: count click-0')).toBeDefined();
  });

  it('Тестируем клик по рабочей области', () => {
    const initialState = { gameState: { status: 'started' } };
    const store = mockStore(initialState);

    const wrapper = mount(
      <Provider store={store}>
        <GamePage />
      </Provider>
    );

    const canvas = wrapper.find('.canvas_image');

    canvas.simulate('click', { clientX: 200, clientY: 100 }); // Имитируем клик в рабочей области

    expect(wrapper.text().includes('Game: count click-1')).toBeTruthy();
  });
});
