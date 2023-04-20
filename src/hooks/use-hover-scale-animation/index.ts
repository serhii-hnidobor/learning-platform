import { usePrefersReducedMotion } from '@anatoliygatt/use-prefers-reduced-motion';
import { useSpring } from '@react-spring/web';
import { useRef } from 'react';
import { useGesture } from '@use-gesture/react';

interface HookArgType {
  mass: number;
  tension: number;
  friction: number;
  initialScale: number;
  maxScale: number;
}

/**
 * Hook that animates an element's scale on hover.
 *
 * @template T - the element type.
 * @interface HookArgType - the hook configuration object type.
 * @property {number} mass - the mass of the spring.
 * @property {number} tension - the tension of the spring.
 * @property {number} friction - the friction of the spring.
 * @property {number} initialScale - the initial scale of the element.
 * @property {number} maxScale - the maximum scale of the element on hover.
 * @param {HookArgType} [arg] - the hook configuration object.
 * @returns {{ style: { scale?: number }, ref: React.RefObject<T> }} - an object containing the style and ref of the element.
 */

const useHoverScaleAnimation = <T extends HTMLElement>(arg?: HookArgType) => {
  let maxScale = 1.1,
    mass = 5.1,
    initialScale = 1,
    friction = 40,
    tension = 350;

  if (arg) {
    maxScale = arg.maxScale;
    mass = arg.mass;
    initialScale = arg.initialScale;
    friction = arg.friction;
    tension = arg.tension;
  }

  const prefersReducedMotion = usePrefersReducedMotion();

  const [{ scale }, api] = useSpring(() => ({
    scale: initialScale,
    config: {
      mass: mass,
      tension: tension,
      friction: friction,
    },
  }));

  const targetRef = useRef<T>(null);

  useGesture(
    {
      onHover: ({ hovering }) => {
        if (hovering) {
          api.start({ scale: maxScale });
          return;
        }
        api.start({ scale: initialScale });
      },
    },
    { target: targetRef, eventOptions: { passive: false } },
  );
  const style = prefersReducedMotion ? undefined : { scale };

  return { style, ref: targetRef };
};

export {
  useHoverScaleAnimation as default,
  type HookArgType as useHoverScaleArgType,
};
