import {
  circleProgressBoxVariant,
  type CircleProgressBoxVariantType,
  progressRignVariants,
  ProgressRignVariantType,
} from 'components/common/circle-progress-bar/cva-variants/cva-variants';
import { concatClasses } from 'helpers/string/string';
import { ComponentBaseProps } from 'types/html-elemet-props';

type CircleProgressBarSizeType = NonNullable<
  CircleProgressBoxVariantType['size']
>;

function getPathParamFromSize(size: CircleProgressBarSizeType, stoke: number) {
  const defaultValue = {
    cx: 40,
    cy: 40,
    r: 40 - stoke * 2 + 6,
  };

  switch (size) {
    case 'small': {
      return defaultValue;
    }
    default: {
      const exhaustiveCheck: never = size;
      throw new Error(exhaustiveCheck);
    }
  }
}

function getProgressRignStyle(progress: number, radius: number) {
  const circleLength = radius * 2 * Math.PI;
  const offset = circleLength - (progress / 100) * circleLength;
  return {
    strokeDasharray: `${circleLength} ${circleLength}`,
    strokeDashoffset: `${offset}`,
  };
}

interface CircleProgressBarProps
  extends Omit<ComponentBaseProps<'div'>, 'size'> {
  size?: NonNullable<CircleProgressBoxVariantType['size']>;
  progress?: number;
  progressLineColor?: NonNullable<CircleProgressBoxVariantType['color']>;
  circleBackgroundColor?: NonNullable<CircleProgressBoxVariantType['color']>;
  progressLineWidth?: NonNullable<ProgressRignVariantType['strokeWidth']>;
}

const CircleProgressBar = ({
  size = 'small',
  progressLineColor,
  circleBackgroundColor,
  className,
  progressLineWidth = '4',
  progress = 0,
  ...restBoxProps
}: CircleProgressBarProps) => {
  if (progress > 100) {
    progress = 100;
  } else if (progress < 0) {
    progress = 0;
  }

  const circleProps = getPathParamFromSize(size, Number(progressLineWidth));
  const progressRignStyle = getProgressRignStyle(progress, circleProps.r);

  let wrapperClassName = circleProgressBoxVariant({
    size,
    color: circleBackgroundColor,
  });
  const svgElementClassName = progressRignVariants({
    size,
    color: progressLineColor,
    strokeWidth: progressLineWidth,
  });

  if (className && className.length) {
    wrapperClassName = concatClasses([wrapperClassName, className]);
  }

  return (
    <div {...restBoxProps} className={wrapperClassName}>
      <svg className={svgElementClassName}>
        <circle
          fill="transparent"
          {...circleProps}
          style={{ ...progressRignStyle }}
        />
      </svg>
    </div>
  );
};

export { CircleProgressBar, type CircleProgressBarProps };
