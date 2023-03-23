import { Typography } from 'components/common/typography/typography';
import { ComponentBaseProps } from 'types/html-elemet-props';

interface ProductStatisticElementProps extends ComponentBaseProps<'div'> {
  title: string;
  description: string;
}

const ProductStatisticElement = ({
  title,
  description,
  ...restWrapperProps
}: ProductStatisticElementProps) => {
  return (
    <div {...restWrapperProps}>
      <Typography as={'h5'} styleName={'h4'}>
        {title}
      </Typography>
      <Typography as={'p'} styleName={'body2Regular'} color={'grey'}>
        {description}
      </Typography>
    </div>
  );
};

export { ProductStatisticElement };
