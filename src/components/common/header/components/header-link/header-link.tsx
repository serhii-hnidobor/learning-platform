import { AppRouteType } from 'common/enum/app/app';
import { useUnderlineAnimation } from 'hooks/use-underline-animation/use-underline-animation';
import { concatClasses } from 'helpers/string/string';
import { Typography } from 'components/common/typography/typography';
import { animated } from '@react-spring/web';
import { typographyVariants } from 'components/common/typography/cva-variants/cva-variants';
import Link from 'next/link';

interface Props {
  name: string;
  isActive: boolean;
  route: AppRouteType;
}

export const HeaderLink = ({ isActive, name, route }: Props) => {
  const { style, ref } = useUnderlineAnimation<HTMLAnchorElement>();

  const typographyClassName = typographyVariants({
    styleName: 'body2Bold',
    color: 'white',
  });

  return (
    <li
      className={concatClasses([
        'relative',
        'h-full',
        'flex',
        'flex-col',
        'justify-center',
        'align-center',
        typographyClassName,
      ])}
    >
      <Link href={route} tabIndex={0} ref={ref} className={'cursor-pointer'}>
        <Typography as={'span'} textTransform={'capitalize'}>
          {name}
        </Typography>
        <animated.span
          className={concatClasses([
            'w-full',
            'absolute',
            'block',
            'bottom-[-1px]',
            'h-[2px]',
            `${isActive ? 'bg-yellow' : 'bg-transparent'}`,
          ])}
          style={isActive ? undefined : style}
        />
      </Link>
    </li>
  );
};
