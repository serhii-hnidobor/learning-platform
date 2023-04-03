import { useEffect, useState } from 'hooks/hooks';

enum Screens {
  'extra-small' = 'extra-small',
  'xs' = 'xs',
  'sm' = 'sm',
  'md' = 'md',
  'lg' = 'lg',
  'xl' = 'xl',
  '2xl' = '2xl',
}

interface WindowDimensionsType {
  screen: Screens;
  width: number;
}

export const useWindowDimensions = (): WindowDimensionsType => {
  const [windowDimensions, setWindowDimensions] = useState({
    width: 0,
    screen: Screens['extra-small'],
  });

  useEffect(() => {
    const getWindowDimensions = (): WindowDimensionsType => {
      const { innerWidth: width } = window;

      if (width < 320) {
        return { screen: Screens['extra-small'], width };
      }

      if (width >= 320 && width < 640) {
        return { screen: Screens['xs'], width };
      }

      if (width >= 640 && width < 768) {
        return { screen: Screens['sm'], width };
      }

      if (width <= 768 && width < 1024) {
        return { screen: Screens['md'], width };
      }

      if (width <= 1024 && width < 1280) {
        return { screen: Screens['lg'], width };
      }

      if (width <= 1280 && width < 1536) {
        return { screen: Screens['xl'], width };
      }

      return { screen: Screens['2xl'], width };
    };
    const handleResize = (): void => {
      setWindowDimensions(getWindowDimensions());
    };

    window.addEventListener('resize', handleResize);
    return (): void => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
};
