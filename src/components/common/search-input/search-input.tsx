import { IconName } from 'common/enum/icons/icons';
import { ChangeEvent, useRef } from 'react';
import Button from '../button/button';
import { concatClasses } from 'helpers/string/string';
import { useKeyPress, useOutsideClick, useState } from 'hooks/hooks';
import { ComponentBaseProps } from 'types/html-elemet-props';
import { Icon } from 'components/common/icon/icon';

interface SearchInputProps extends ComponentBaseProps<'input'> {
  placeholder: string;
  iconName: IconName;
  onBlur: VoidFunction;
  isAutocompleteSelected?: boolean;
  isAutocompleteDisplay?: boolean;
  onEnter: (inputString: string) => void;
}

const SearchInput = ({
  iconName,
  placeholder,
  onChange,
  onEnter,
  onBlur,
  isAutocompleteSelected = false,
  isAutocompleteDisplay = false,
  ...restInputProps
}: SearchInputProps) => {
  const [query, setQuery] = useState<string>('');

  // avoid effect when onBlurEvent fire when user click on autocomplete box
  const boxRef = useOutsideClick<HTMLDivElement>({
    callback: () => onBlur(),
    elementClickAllowedClassName: 'autocomplete',
  });

  useKeyPress({
    keyArray: ['Enter'],
    callback: () => {
      // if autocomplete select enter press must redirect to selected course page
      if (isAutocompleteSelected) {
        return;
      }

      if (inputRef && inputRef.current) {
        inputRef.current.blur();
      }
      onEnter(query);
    },
    onAnyKeyPress: (keyName) => {
      if (!inputRef || !inputRef.current) {
        return;
      }

      if (
        (typeof document !== 'undefined' &&
          document.activeElement === inputRef.current) ||
        keyName === 'Escape' ||
        keyName === 'Shift' ||
        keyName === 'ArrowUp' ||
        keyName === 'ArrowDown'
      ) {
        return;
      }

      onBlur();
    },
  });

  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setQuery(value);
    if (onChange) {
      onChange(e);
    }
  };
  return (
    <>
      <div
        className={concatClasses([
          'relative',
          'rounded',
          'search-input-container',
          'w-full',
        ])}
        ref={isAutocompleteDisplay ? boxRef : null}
      >
        <input
          {...restInputProps}
          ref={inputRef}
          onChange={handleChange}
          value={query}
          placeholder={placeholder}
          className={concatClasses([
            'py-5',
            'w-full',
            'border-0',
            'rounded',
            'focus:outline-blue',
            'focus:outline-2',
            'focus-outline-offset-0',
            `${iconName ? 'pl-6 pr-[88px]' : 'px-6'}`,
          ])}
        />
        {!!query.length && (
          <Button
            ariaLabel={'clear input value button'}
            intent={'inline'}
            isAnimated={false}
            className={
              'translate-y-negative-1/2 absolute right-[49px] top-[50%]'
            }
            onClick={() => {
              setQuery('');
            }}
          >
            <Icon
              name={IconName.CLOSE}
              intent={'base'}
              width={24}
              height={24}
              stroke={'grey'}
              fill={'grey'}
            />
          </Button>
        )}
        {iconName && (
          <Button
            ariaLabel={'search button'}
            onClick={() => onEnter(query)}
            isAnimated={false}
            intent={'inline'}
            className={concatClasses([
              'absolute',
              'right-[18px]',
              'top-[50%]',
              'translate-y-negative-1/2',
            ])}
          >
            <Icon
              name={iconName}
              intent={'base'}
              width={24}
              height={24}
              stroke={'blue'}
            />
          </Button>
        )}
      </div>
    </>
  );
};

export { SearchInput, type SearchInputProps };
