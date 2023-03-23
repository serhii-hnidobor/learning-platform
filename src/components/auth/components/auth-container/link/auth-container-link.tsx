import { AppRouteType } from 'common/enum/app/app';
import { ComponentBaseProps } from 'types/html-elemet-props';
import { Typography } from 'components/common/typography/typography';
import { Link } from 'react-router-dom';
import { typographyVariants } from 'components/common/typography/cva-variants/cva-variants';
import { concatClasses } from 'helpers/helpers';

interface AuthContainerLinkProps extends ComponentBaseProps<'div'> {
  redirectRoute: AppRouteType;
  title: string;
  prompt: string;
}

const AuthContainerLink = ({
  redirectRoute,
  title,
  prompt,
}: AuthContainerLinkProps) => {
  const linkClassName = concatClasses([
    typographyVariants({
      styleName: 'body2Medium',
      color: 'yellow',
    }),
    'hover:text-white transition-all ml-2',
  ]);

  return (
    <Typography as="span" styleName={'body1Regular'} color={'white'}>
      {prompt}
      <Link to={redirectRoute} className={linkClassName}>
        {title}
      </Link>
    </Typography>
  );
};

export { AuthContainerLink, type AuthContainerLinkProps };
