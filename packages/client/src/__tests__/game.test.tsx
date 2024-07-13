import Adapter from '@cfaester/enzyme-adapter-react-18';
import { render, screen } from '@testing-library/react';
//import { mount } from 'enzyme';
import { configure } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import { GamePage } from '../pages/game';
import { Game } from '../pages/game/HamsterCanvas/Game';

configure({ adapter: new Adapter() });

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

  it('Проверяем отрисовку игры', () => {
    const canvas = document.createElement('canvas');

    canvas.id = 'canvas';
    canvas.width = 400;
    canvas.height = 400;

    const game = new Game(
      canvas,
      () => {},
      () => {}
    );

    game.startGame();

    //expect(true).toBeTruthy();
    expect(game.canvas).not.toBeNull();
  });
});
