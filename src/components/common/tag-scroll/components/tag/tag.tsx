import {
  tagVariants,
  type TagVariantsType,
} from 'components/common/tag-scroll/components/tag/cva-varints/cva-variants';
import { Typography } from 'components/common/typography/typography';
import { ComponentBaseProps, LoadingProps } from 'types/html-elemet-props';
import { useHoverScaleAnimation } from 'hooks/hooks';
import { concatClasses } from 'helpers/helpers';
import Skeleton from 'react-loading-skeleton';
import { animated } from '@react-spring/web';

interface TagProps extends ComponentBaseProps<'div'> {
  state: TagVariantsType['state'];
  onClick: VoidFunction;
  title: string;
  loading?: undefined;
}

interface TagLoadingProps extends LoadingProps<TagProps> {
  loading?: true;
}

type TagPropsType = TagProps | TagLoadingProps;

const Tag = ({
  title,
  state,
  className,
  onClick,
  loading,
  ...restWrapperProps
}: TagPropsType) => {
  const { style: animationStyle, ref: animationRef } =
    useHoverScaleAnimation<HTMLDivElement>();

  let tagClasName = tagVariants({
    state: loading ? 'loading' : state,
  });

  if (className && className.length) {
    tagClasName = concatClasses([tagClasName, className]);
  }

  return (
    <animated.div
      {...restWrapperProps}
      onClick={onClick}
      className={tagClasName}
      ref={animationRef}
      style={animationStyle}
    >
      <Typography
        styleName={'body3Regular'}
        color={'white'}
        textTransform={'uppercase'}
        align={'center'}
      >
        {loading ? <Skeleton className={'w-full'} /> : title}
      </Typography>
    </animated.div>
  );
};

export { Tag, type TagPropsType };
