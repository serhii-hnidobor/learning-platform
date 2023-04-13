import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { Typography } from 'components/common/typography/typography';
import { Icon } from 'components/common/icon/icon';
import { IconName } from 'common/enum/enum';
import { concatClasses } from 'helpers/string/concat-classes/concat-classes';

interface HeaderMenuProps {
  handleSignOut: () => Promise<void>;
}

const HeaderMenu = ({ handleSignOut }: HeaderMenuProps) => {
  return (
    <div className="text-right">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className={'flex items-center gap-4'} tabIndex={0}>
            <Icon name={IconName.USER} width={20} height={20} intent={'base'} />
            <Typography as={'span'} color={'white'} styleName={'body2Bold'}>
              Profile
            </Typography>
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items
            className={concatClasses([
              'absolute',
              'right-0',
              'z-10',
              'mt-2',
              'w-56',
              'origin-top-right',
              'divide-y',
              'divide-gray-100',
              'rounded-md',
              'bg-white',
              'shadow-lg',
              'ring-1',
              'ring-black/5',
              'focus:outline-none',
            ])}
          >
            <div className="p-1 ">
              <Menu.Item disabled>
                <button
                  className={'w-full !cursor-not-allowed p-2 text-left'}
                  disabled={true}
                  aria-label={'user menu open button'}
                >
                  <Typography
                    as={'span'}
                    styleName={'body3Regular'}
                    color={'grey'}
                  >
                    Profile
                  </Typography>
                </button>
              </Menu.Item>
            </div>
            <div className="p-1 ">
              <Menu.Item>
                <button
                  onClick={handleSignOut}
                  aria-label={'sign out button'}
                  className={
                    'group flex w-full items-center rounded-md p-2 text-sm'
                  }
                >
                  Sign out
                </button>
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export { HeaderMenu };
