import { useCallback, useEffect, useRef } from 'react';

type PropsType = {
  callback: (event?: MouseEvent | TouchEvent) => void;
  elementClickAllowedClassName?: string;
};

/**
 * A hook that detects a click outside a given element.
 *
 * @template RefType - a reference type of the element to which to attach the hook.
 * @param {Object} props - an object containing the following properties:
 *   @param {Function} callback - a function to be called when a click outside the element is detected.
 *   @param {string} [elementClickAllowedClassName] - a class name that identifies elements that should be allowed to trigger the callback function when clicked.
 * @returns {React.RefObject<RefType>} - a mutable reference to the element to which the hook is attached.
 */
export const useOutsideClick = <RefType extends HTMLElement = HTMLElement>({
  callback,
  elementClickAllowedClassName,
}: PropsType) => {
  const ref = useRef<RefType>(null);

  const detectOutsideClick = useCallback(
    (event: MouseEvent | TouchEvent) => {
      if (!ref.current) {
        return;
      }

      const target = event.target;
      const element = ref.current;

      if (!(target instanceof Node)) {
        return;
      }

      /* if click on allowed element do nothing */

      if (
        elementClickAllowedClassName &&
        element.classList.contains(elementClickAllowedClassName)
      ) {
        return;
      }

      if (!element.contains(target)) {
        event.preventDefault();
        event.stopPropagation();
        callback(event);
      }
    },
    [callback, elementClickAllowedClassName],
  );

  const handleTouch = useCallback(
    (event: TouchEvent) => {
      /**
       *outsideClick must fire only if user tap but not touch scroll th
       *this code prevent fire detect outside click on touch move or swipe
       **/
      if (event.touches.length === 0) {
        detectOutsideClick(event);
      }
    },
    [detectOutsideClick],
  );

  useEffect(() => {
    window.addEventListener('click', detectOutsideClick, { passive: false });
    window.addEventListener('touchstart', handleTouch, {
      passive: false,
    });

    return () => {
      window.removeEventListener('click', detectOutsideClick);
      window.removeEventListener('touchstart', handleTouch);
    };
  }, [detectOutsideClick, handleTouch]);

  return ref;
};
