import { Section } from 'components/common/common';
import { concatClasses } from 'helpers/helpers';
import { Logo } from 'components/common/logo/logo';
import { HeaderLink } from '../header/components/header-link/header-link';
import { AppRoutes, IconName } from 'common/enum/enum';
import { Icon } from 'components/common/icon/icon';
import { Typography } from 'components/common/typography/typography';
import { ComponentBaseProps } from 'types/html-elemet-props';

interface FooterProps extends ComponentBaseProps<'footer'> {}

const Footer = ({ className, ...restFooterProps }: FooterProps) => {
  let footerClassName = concatClasses([
    'min-h-[252px]',
    'bg-dark',
    '!pt-[59px]',
    '!pb-8',
  ]);

  if (className && className.length) {
    footerClassName = concatClasses([footerClassName, className]);
  }

  return (
    <Section
      sectionClassName={footerClassName}
      contentWrapperClassName={'relative'}
      isFooter={true}
      {...restFooterProps}
    >
      <div className={'h-max'}>
        <div
          className={concatClasses([
            'flex',
            'flex-col',
            'sm:flex-row',
            'sm:justify-between',
            'sm-gap-0',
            'gap-6',
            'items-center',
            'justify-center',
            'overflow-hidden',
          ])}
        >
          <Logo className={'gap-4'} />
          <ul className={'flex items-center justify-center gap-8'}>
            <HeaderLink name={'Home'} isActive={false} route={AppRoutes.ROOT} />
            <HeaderLink
              name={'Browse'}
              isActive={false}
              route={AppRoutes.BROWSE}
            />
          </ul>
          <div className={'flex items-center justify-center gap-6'}>
            <a href={'https://www.facebook.com/'} target={'_blank'}>
              <Icon
                name={IconName.FACEBOOK}
                boxProps={{
                  className: concatClasses([
                    'group translate-all cursor-pointer',
                  ]),
                }}
                width={24}
                height={24}
                hoverStroke={'yellow-light'}
                strokeWidth={'2'}
                intent={'base'}
                stroke={'grey'}
              />
            </a>
            <a href={'https://www.youtube.com'} target={'_blank'}>
              <Icon
                name={IconName.YOUTUBE}
                boxProps={{
                  className: concatClasses([
                    'group translate-all cursor-pointer',
                  ]),
                }}
                width={24}
                hoverStroke={'yellow-light'}
                height={24}
                strokeWidth={'2'}
                intent={'base'}
                stroke={'grey'}
              />
            </a>
            <a href={'https://www.instagram.com/'} target={'_blank'}>
              <Icon
                name={IconName.INSTAGRAM}
                boxProps={{
                  className: concatClasses([
                    'group translate-all cursor-pointer',
                  ]),
                }}
                width={24}
                height={24}
                hoverStroke={'yellow-light'}
                strokeWidth={'2'}
                intent={'base'}
                stroke={'grey'}
              />
            </a>
          </div>
          <Typography
            as="span"
            styleName={'body2Regular'}
            color={'grey'}
            className={'bottom-0 left-0 block sm:absolute'}
          >
            © learningPlatform, 2023
          </Typography>
        </div>
      </div>
    </Section>
  );
};

export { type FooterProps, Footer };
