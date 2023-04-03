import {
  circleDecorationVariants,
  circleDecorationVariantsType,
} from 'components/common/circle-decoration/cva-variants/cva-variants';
import { ComponentBaseProps } from 'types/html-elemet-props';
import { concatClasses } from 'helpers/string/string';

interface CircleDecoration extends ComponentBaseProps<'div'> {
  bumpPosition?: NonNullable<circleDecorationVariantsType['position']>;
  isDark?: boolean;
}

const CircleDecoration = ({
  bumpPosition,
  isDark = false,
  className,
  ...boxProps
}: CircleDecoration) => {
  const border = isDark ? 'border-grey/30' : 'border-white/10';

  let wrapperClassName = '!z-0';

  if (className && className.length) {
    wrapperClassName = concatClasses([wrapperClassName, className]);
  }

  return (
    <div {...boxProps} className={wrapperClassName}>
      <div
        className={concatClasses([
          'flex',
          'h-[414px]',
          'w-[414px]',
          'items-center',
          'justify-center',
          'rounded-full',
          'border',
          'border-solid',
          border,
        ])}
      >
        <div
          className={concatClasses([
            'relative',
            'flex',
            'h-[344px]',
            'w-[344px]',
            'items-center',
            'justify-center',
            'rounded-full',
            'border',
            'border-solid',
            border,
          ])}
        >
          <div
            className={circleDecorationVariants({ position: bumpPosition })}
          />
          <div
            className={concatClasses([
              'flex',
              'h-[265px]',
              'w-[265px]',
              'items-center',
              'justify-center',
              'rounded-full',
              'border',
              'border-solid',
              border,
            ])}
          >
            <div
              className={concatClasses([
                'flex',
                'h-[162px]',
                'w-[162px]',
                'items-center',
                'justify-center',
                'rounded-full',
                'border',
                'border-solid',
                border,
              ])}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export { CircleDecoration };
