import { AppRouteType } from 'common/enum/app/app';
import { useUnderlineAnimation } from 'hooks/use-underline-animation/use-underline-animation';
import { concatClasses } from 'helpers/helpers';
import { Typography } from 'components/common/typography/typography';
import { animated } from '@react-spring/web';
import { typographyVariants } from 'components/common/typography/cva-variants/cva-variants';
import { useNavigate } from 'hooks/hooks';

interface Props {
  name: string;
  isActive: boolean;
  route: AppRouteType;
}

export const HeaderLink = ({ isActive, name, route }: Props) => {
  const { style, ref } = useUnderlineAnimation<HTMLLIElement>();

  const navigate = useNavigate();

  const typographyClassName = typographyVariants({
    styleName: 'body2Bold',
    color: 'white',
  });

  const handleClick = () => {
    if (!isActive) {
      navigate(route);
    }
  };

  return (
    <li
      className={concatClasses([
        'relative',
        'h-full',
        'flex',
        'flex-col',
        'justify-center',
        'align-center',
        'cursor-pointer',
        typographyClassName,
      ])}
      tabIndex={0}
      ref={ref}
      onClick={handleClick}
    >
      <Typography as={'a'} textTransform={'capitalize'}>
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
    </li>
  );
};
