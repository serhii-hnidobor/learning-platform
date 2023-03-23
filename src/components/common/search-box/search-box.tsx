import { FormEvent } from 'react';
import { useKeyPress, useState } from 'hooks/hooks';
import {
  SearchInput,
  type SearchInputProps as InputProps,
} from 'components/common/common';
import Fuse from 'fuse.js';
import { AutoCompleteItem } from './components/autocomplete-item';
import { ComponentBaseProps } from 'types/html-elemet-props';

interface CourseSearchData {
  name: string;
  id: string;
}

interface SearchBoxProps extends ComponentBaseProps<'div'> {
  inputProps: Omit<InputProps, 'onChange' | 'onEnter' | 'onBlur'>;
  handleSearch: (searchString: string) => void;
  handleAutocompleteSelect: (id: string) => void;
  items: CourseSearchData[];
}

const SearchBox = ({
  inputProps,
  items,
  handleSearch,
  handleAutocompleteSelect,
}: SearchBoxProps) => {
  const [searchString, setSearchString] = useState<string>();
  const [isNeedAutocomplete, setIsNeedAutocomplete] = useState(true);
  const [activeAutocompleteItemIndex, setActiveAutocompleteItemIndex] =
    useState<number>();

  let autoCompleteResult: Fuse.FuseResult<CourseSearchData>[] = [];

  const handleAutocompleteArrowNavigation = (isUp = false) => {
    if (!autoCompleteResult.length) {
      return;
    }

    setActiveAutocompleteItemIndex((prevValue) => {
      const autocompleteResultLastIndex = autoCompleteResult.length - 1;

      if (!prevValue && prevValue !== 0) {
        return isUp ? 0 : autocompleteResultLastIndex;
      }

      let nextValue = isUp ? prevValue + 1 : prevValue - 1;

      if (nextValue < 0) {
        nextValue = 0;
      } else if (nextValue > autocompleteResultLastIndex) {
        nextValue = autocompleteResultLastIndex;
      }

      return nextValue;
    });
  };

  useKeyPress({
    keyArray: ['Escape'],
    callback: () => setIsNeedAutocomplete(false),
  });
  useKeyPress({
    keyArray: ['Enter'],
    callback: () => {
      const isAutocompleteItemActive =
        activeAutocompleteItemIndex !== undefined &&
        activeAutocompleteItemIndex >= 0;

      if (!isAutocompleteItemActive) {
        return;
      }

      const { id: activeAutocompleteId } =
        autoCompleteResult[activeAutocompleteItemIndex].item;

      handleAutocompleteSelect(activeAutocompleteId);
      setIsNeedAutocomplete(false);
      setActiveAutocompleteItemIndex(undefined);
    },
  });
  useKeyPress({
    keyArray: ['ArrowDown'],
    callback: () => handleAutocompleteArrowNavigation(true),
  });
  useKeyPress({
    keyArray: ['ArrowUp'],
    callback: () => handleAutocompleteArrowNavigation(false),
  });
  const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
    const searchValue = e.currentTarget.value;
    if (!searchValue.length) {
      setSearchString(undefined);
      return;
    }
    setSearchString(searchValue);
  };
  const fuse = new Fuse(items, { keys: ['name'] });

  if (searchString) {
    autoCompleteResult = fuse.search(searchString);
  }

  return (
    <div className={'relative z-30 h-full w-full'}>
      <SearchInput
        {...inputProps}
        isAutocompleteSelected={activeAutocompleteItemIndex !== undefined}
        isAutocompleteDisplay={isNeedAutocomplete}
        onChange={handleInputChange}
        onFocus={() => setIsNeedAutocomplete(true)}
        onBlur={() => {
          setActiveAutocompleteItemIndex(undefined);
          setIsNeedAutocomplete(false);
        }}
        onEnter={(searchStr: string) => {
          setIsNeedAutocomplete(false);
          handleSearch(searchStr);
        }}
      />
      {isNeedAutocomplete && !!autoCompleteResult.length && (
        <div
          className={'autocomplete absolute top-[69px] w-full bg-white py-4'}
        >
          {autoCompleteResult.map((fuseResult, index) => (
            <AutoCompleteItem
              name={fuseResult.item.name}
              id={fuseResult.item.id}
              className={'autocomplete'}
              onMouseEnter={() => setActiveAutocompleteItemIndex(undefined)}
              active={index === activeAutocompleteItemIndex}
              onClick={handleAutocompleteSelect}
              key={`autocompleteItem-${index}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export { SearchBox, type SearchBoxProps };
