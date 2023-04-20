import { useCallback, useEffect, useRef } from 'react';
import { shimKeyboardEvent } from 'hooks/use-key-press/shim-keyboard-event';
import isOneArrayContainAnother from 'helpers/array/is-one-array-contain-another';

interface PropsInterface {
  callback: VoidFunction;
  onAnyKeyPress?: (keyName: string) => void;
  keyArray: string[];
}

/**

 useKeyPress hook to detect key press support key shortcut
 @param {object} props - The props object
 @param {Array.<string>} props.keyArray - The array of key combination to respond to can be single key or shortcut
 @param {function} props.callback - The action to perform on key press
 @param {function} [props.onAnyKeyPress] - The function to call when any key is pressed
 */

const useKeyPress = ({ keyArray, callback, onAnyKeyPress }: PropsInterface) => {
  const pressedKeysArrayRef = useRef<string[]>([]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      shimKeyboardEvent(event);
      const pressedKeysArray = pressedKeysArrayRef.current;
      const eventKey = event.key;

      if (onAnyKeyPress) {
        onAnyKeyPress(eventKey);
      }

      const isEventKeyTarget = keyArray.includes(eventKey);
      const isEventKeyAlreadySave = pressedKeysArray.includes(eventKey);

      if (isEventKeyTarget) {
        event.stopPropagation();
        event.preventDefault();
      }

      if (isEventKeyTarget && !isEventKeyAlreadySave) {
        pressedKeysArray.push(eventKey);
      }

      if (isOneArrayContainAnother(pressedKeysArray, keyArray, true)) {
        callback();
      }
    },
    [callback, keyArray, onAnyKeyPress],
  );

  const handleKeyUp = useCallback((event: KeyboardEvent) => {
    shimKeyboardEvent(event);
    const pressedKeysArray = pressedKeysArrayRef.current;

    const eventKeyIndex = pressedKeysArray.indexOf(event.key);

    if (~eventKeyIndex) {
      pressedKeysArray.splice(eventKeyIndex, 1);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);
};

export default useKeyPress;
