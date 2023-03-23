import { concatClasses } from 'helpers/helpers';
import { Burger } from 'components/common/burger/burger';

interface Props {
  isDrawerOpen: boolean;
  setIsDrawerOpen: (newValue: boolean) => void;
}

export const MobileHeaderDrawerHeader = ({
  isDrawerOpen,
  setIsDrawerOpen,
}: Props) => {
  return (
    <div
      className={concatClasses([
        'h-20',
        'bg-dark',
        'w-full',
        'flex',
        'lg:px-28',
        'sm:px-8',
        'px-4',
        'justify-between',
      ])}
    >
      <Burger
        tabIndex={0}
        isOpen={isDrawerOpen}
        className={'flex items-center justify-center py-0'}
        onOpen={() => setIsDrawerOpen(true)}
        onClose={() => setIsDrawerOpen(false)}
      />
    </div>
  );
};
