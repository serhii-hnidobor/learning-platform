import {
  ComponentBaseProps,
  ErrorProps,
  LoadingProps,
} from 'types/html-elemet-props';
import { Typography, TypographyProps } from 'components/common/common';
import { concatClasses } from 'helpers/helpers';
import { useHoverScaleAnimation } from 'hooks/hooks';
import { animated } from '@react-spring/web';
import { TopicDataType } from 'types/api/data';
import Skeleton from 'react-loading-skeleton';
import {
  topicVariants,
  TopicVariantsType,
} from 'components/common/topic/cva-variants/cva-variants';

interface TopicProps extends ComponentBaseProps<'div'> {
  topicData: TopicDataType;
  loading?: false;
  error?: false;
  state?: NonNullable<TopicVariantsType['state']>;
  typographyProps?: Omit<TypographyProps<HTMLSpanElement>, 'styleName' | 'as'>;
}

interface TopicErrorProps extends ErrorProps<TopicProps> {
  error: true;
}

interface TopicLoadingProps extends LoadingProps<TopicProps> {
  loading: true;
}

type TopicPropsType = TopicLoadingProps | TopicProps | TopicErrorProps;
const Topic = ({
  topicData,
  typographyProps,
  className,
  state = 'base',
  loading,
  error,
  ...restProps
}: TopicPropsType) => {
  const { ref, style } = useHoverScaleAnimation<HTMLDivElement>();
  let wrapperClassName = topicVariants({ state });

  if (className && className.length) {
    wrapperClassName = concatClasses([className, wrapperClassName]);
  }

  if (loading) {
    return (
      <Skeleton
        containerClassName={'w-full h-[64px]'}
        className={'block h-full w-full'}
      />
    );
  }

  if (error) {
    return null;
  }

  return (
    <animated.div
      className={wrapperClassName}
      {...restProps}
      ref={ref}
      style={style}
      tabIndex={0}
    >
      <Typography
        color={state === 'active' ? 'white' : 'blue'}
        {...typographyProps}
        as="span"
        styleName={'body2Bold'}
      >
        {topicData.name}
      </Typography>
    </animated.div>
  );
};

export { Topic };
