import { usePrefersReducedMotion } from '@anatoliygatt/use-prefers-reduced-motion';
import { useSpring } from '@react-spring/web';
import { useRef } from 'hooks/hooks';
import { useGesture } from '@use-gesture/react';

interface HookArgType {
  mass: number;
  tension: number;
  friction: number;
  onHoverYDelta: number;
  onMouseDownYDelta: number;
}

/**
 * useGesture is a custom React hook that creates a gesture-based interaction
 * for a given target element. The user can hover over the target element to
 * trigger a hover animation or click-and-hold to trigger a press-and-hold
 * animation.
 *
 * the various gesture events.
 * the gesture.
 * @template T The type of the HTML element to animate.
 * @param {Object} arg - An object with options for the button animation.
 * @param {number} arg.mass - The mass of the spring. Defaults to 5.1.
 * @param {number} arg.tension - The tension of the spring. Defaults to 350.
 * @param {number} arg.friction - The friction of the spring. Defaults to 40.
 * @param {number} arg.onHoverYDelta - The distance the button moves when hovered over. Defaults to 4.
 * @param {number} arg.onMouseDownYDelta - The distance the button moves when clicked. Defaults to 4.
 *
 * @returns {object} - An object containing the following properties:
 * - style: A React style object that can be passed to the target element
 * to apply the animation.
 * - ref: A ref that can be attached to the target element to enable the
 * gesture interaction.
 * - onMouseDown: A function that handles the mousedown event for the target
 * element.
 * - onMouseUp: A function that handles the mouseup event for the target
 * element.
 * @param arg
 */

const useButtonAnimation = <T extends HTMLElement>(arg?: HookArgType) => {
  let onHoverYDelta = 4,
    onMouseDownYDelta = 4,
    mass = 5.1,
    friction = 40,
    tension = 350;

  if (arg) {
    mass = arg.mass;
    friction = arg.friction;
    tension = arg.tension;
    onHoverYDelta = arg.onHoverYDelta;
    onMouseDownYDelta = arg.onMouseDownYDelta;
  }

  const prefersReducedMotion = usePrefersReducedMotion();

  const [{ y }, api] = useSpring(() => ({
    y: 0,
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
          api.start({ y: -onHoverYDelta });
          return;
        }
        api.start({ y: 0 });
      },
    },
    { target: targetRef, eventOptions: { passive: false } },
  );

  const style = prefersReducedMotion ? undefined : { y };
  const onMouseDown = () => {
    api.start({ y: onMouseDownYDelta });
  };

  const onMouseUp = () => {
    api.start({ y: 0 });
  };

  return { style, ref: targetRef, onMouseUp, onMouseDown };
};

export { useButtonAnimation, type HookArgType as useButtonAnimationArgType };
