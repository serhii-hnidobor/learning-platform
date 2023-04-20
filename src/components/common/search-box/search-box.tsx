import { FormEvent, useState } from 'react';
import useKeyPress from 'hooks/use-key-press';
import {
  SearchInput,
  type SearchInputProps as InputProps,
} from '../search-input/search-input';
import { AutoCompleteItem } from './components/autocomplete-item';
import { ComponentBaseProps } from 'types/html-elemet-props';
import useDeepCompareEffect from 'use-deep-compare-effect';

interface CourseSearchData {
  name: string;
  id: string;
}

interface SearchResultType {
  item: CourseSearchData;
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
  const [autoCompleteResult, setAutoCompleteResult] = useState<
    SearchResultType[]
  >([]);

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
      setAutoCompleteResult([]);
      setIsNeedAutocomplete(false);
      return;
    }

    if (!isNeedAutocomplete) {
      setIsNeedAutocomplete(true);
    }

    setSearchString(searchValue);
  };

  useDeepCompareEffect(() => {
    if (!isNeedAutocomplete) {
      return;
    }

    if (!searchString) {
      setIsNeedAutocomplete(false);
      setAutoCompleteResult([]);
      return;
    }

    import('fuse.js').then((module) => {
      const FuseLib = module.default;

      const fuse = new FuseLib(items, { keys: ['name'] });
      setAutoCompleteResult([...fuse.search(searchString)]);
    });
  }, [searchString, items]);

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

export { SearchBox as default, type SearchBoxProps };
