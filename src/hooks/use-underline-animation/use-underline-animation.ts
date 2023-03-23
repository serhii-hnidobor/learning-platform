import { useSpring } from '@react-spring/web';
import { useGesture } from '@use-gesture/react';
import { useRef } from 'hooks/hooks';
import { usePrefersReducedMotion } from '@anatoliygatt/use-prefers-reduced-motion';

export interface UseUnderlineAnimationArg {
  initialBackgroundColor?: string;
  finalBackgroundColor?: string;
}

export const useUnderlineAnimation = <ElementType extends HTMLElement>(
  arg?: UseUnderlineAnimationArg,
) => {
  let initialBackgroundColor: string, finalBackgroundColor: string;

  if (arg) {
    initialBackgroundColor = arg.initialBackgroundColor || '#F2C94C';
    finalBackgroundColor = arg.finalBackgroundColor || '#E3AD09';
  } else {
    initialBackgroundColor = '#F2C94C';
    finalBackgroundColor = '#E3AD09';
  }

  const prefersReducedMotion = usePrefersReducedMotion();

  const targetRef = useRef<ElementType>(null);

  const [{ opacity, width, backgroundColor }, textButtonAnimationApi] =
    useSpring(() => ({
      opacity: '0',
      width: '0%',
      backgroundColor: initialBackgroundColor,
      config: { duration: 400, bounce: 0, mass: 0 },
    }));

  useGesture(
    {
      onHover: ({ hovering }) => {
        if (hovering) {
          textButtonAnimationApi.start({
            opacity: '1',
            width: '100%',
            backgroundColor: finalBackgroundColor,
          });
          return;
        }
        textButtonAnimationApi.start({ opacity: '0', width: '0%' });
      },
    },
    { target: targetRef, eventOptions: { passive: false } },
  );

  const style = prefersReducedMotion
    ? undefined
    : { width, opacity, backgroundColor };

  return { ref: targetRef, style };
};
