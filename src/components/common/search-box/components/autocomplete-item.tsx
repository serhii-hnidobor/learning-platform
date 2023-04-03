import { ComponentBaseProps } from 'types/html-elemet-props';
import { concatClasses } from 'helpers/string/string';
import { Icon } from 'components/common/icon/icon';
import { IconName } from 'common/enum/icons/icons';
import { Typography } from 'components/common/typography/typography';

interface AutoCompleteItemProps
  extends Omit<ComponentBaseProps<'div'>, 'onClick'> {
  onClick: (id: string) => void;
  name: string;
  active?: boolean;
  id: string;
}

const AutoCompleteItem = ({
  name,
  id,
  onClick,
  active,
  className,
  ...restWrapperProps
}: AutoCompleteItemProps) => {
  let wrapperClassName = concatClasses([
    'hover:bg-grey/30',
    active ? 'bg-grey/30' : '',
    'z-30',
    'flex cursor-pointer',
    'gap-4',
    'p-4',
    'transition-all',
  ]);

  if (className && className.length) {
    wrapperClassName = concatClasses([wrapperClassName, className]);
  }

  return (
    <div
      {...restWrapperProps}
      onClick={() => {
        onClick(id);
      }}
      className={wrapperClassName}
    >
      <Icon
        name={IconName.SEARCH}
        stroke={'grey'}
        intent={'base'}
        width={24}
        height={24}
      />
      <Typography as={'span'} styleName={'body2Bold'} color={'black'}>
        {name}
      </Typography>
    </div>
  );
};

export { AutoCompleteItem, type AutoCompleteItemProps };
