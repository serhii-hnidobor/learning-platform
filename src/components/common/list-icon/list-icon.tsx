import { HTMLProps, ReactNode } from 'react';
import { Icon, IconProps } from 'components/common/icon/icon';
import { IconName } from 'common/enum/icons/icons';
import Skeleton from 'react-loading-skeleton';
import { concatClasses } from 'helpers/string/string';

interface ListIconProps extends HTMLProps<HTMLUListElement> {
  children: ReactNode[];
  iconName: IconName;
  liClassName?: string;
  liProps?: Omit<HTMLProps<HTMLLIElement>, 'className'>;
  iconProps?: Omit<IconProps, 'name'>;
  loading?: false;
}

interface ListIconLoadingProps extends Partial<Omit<ListIconProps, 'loading'>> {
  loading: true;
}

type ListIconPropsType = ListIconProps | ListIconLoadingProps;

const ListIcon = ({
  children,
  iconName,
  iconProps,
  loading,
  liProps,
  liClassName,
  ...restListProps
}: ListIconPropsType) => {
  let childClassName = 'flex items-start gap-3';

  if (liClassName && liClassName.length) {
    childClassName = concatClasses([childClassName, liClassName]);
  }

  return (
    <ul {...restListProps}>
      {loading
        ? new Array(4).fill(null).map((_, index) => (
            <li
              {...liProps}
              className={childClassName}
              key={`icon-list-li-${index}`}
            >
              <Skeleton
                containerClassName={'w-[19px] h-[19px] flex'}
                height={'100%'}
                circle={true}
              />
              <div className={'w-[240px]'}>
                <Skeleton />
              </div>
            </li>
          ))
        : children.map((child, index) => {
            return (
              <li
                className={'flex items-start gap-3'}
                key={`icon-list-li-${index}`}
              >
                <Icon
                  name={iconName}
                  className={'min-h-[20px] min-w-[20px]'}
                  {...iconProps}
                />
                {child}
              </li>
            );
          })}
    </ul>
  );
};

export { ListIcon, type ListIconPropsType };
