import { useCallback, useRef, useState } from 'react';

export const useGameData = () => {
  const refToggler = useRef<HTMLButtonElement | null>(null);
  const refIsFullscreen = useRef<boolean>(false);

  const [countClick, setCountClick] = useState<number>(0);

  const onClickFullScreen = useCallback(() => {
    if (!refIsFullscreen.current) {
      document.documentElement.requestFullscreen().then(() => {
        if (refToggler.current) {
          refToggler.current.textContent = 'Выйти из fullscreen режима';
          refIsFullscreen.current = true;
        }
      });
    } else {
      document.exitFullscreen().then(() => {
        if (refToggler.current) {
          refToggler.current.textContent = 'Перейти в fullscreen режим';
          refIsFullscreen.current = false;
        }
      });
    }
  }, []);

  const onClickCircle = useCallback(() => {
    setCountClick((prev) => prev + 1);
  }, []);

  return {
    onClickFullScreen,
    refToggler,
    onClickCircle,
    countClick,
  };
};
