import { cva, VariantProps } from 'class-variance-authority';

const progressRignVariants = cva(
  [
    '[&>circle]:transform -rotate-90',
    '[&>circle]:origin-1/2',
    'relative',
    'left-[-4px]',
    'top-[-4px]',
  ],
  {
    variants: {
      color: {
        black: ['[&>circle]:stroke-black'],
        dark: ['[&>circle]:stroke-dark'],
        grey: ['[&>circle]:stroke-grey'],
        'grey-light': ['[&>circle]:stroke-grey-light'],
        white: ['[&>circle]:stroke-white'],
        blue: ['[&>circle]:stroke-blue'],
        'blue-light': ['[&>circle]:stroke-blue-light'],
        yellow: ['[&>circle]:stroke-yellow'],
        'yellow-light': ['[&>circle]:stroke-yellow-light'],
        green: ['[&>circle]:stroke-green'],
      },
      strokeWidth: {
        '1': '[&>circle]:stroke-1',
        '2': '[&>circle]:stroke-2',
        '3': '[&>circle]:stroke-[3px]',
        '4': '[&>circle]:stroke-[4px]',
      },
      size: {
        small: ['w-20', 'h-20'],
      },
    },
    defaultVariants: {
      strokeWidth: '4',
      size: 'small',
      color: 'blue',
    },
  },
);

const circleProgressBoxVariant = cva(['rounded-full'], {
  variants: {
    borderWidth: {
      '1': ['border'],
      '2': ['border-2'],
      '3': ['border-[3px]'],
      '4': ['border-4'],
    },
    color: {
      black: ['border-black'],
      dark: ['border-dark'],
      grey: ['border-grey'],
      'grey-light': ['border-grey-light'],
      white: ['border-white'],
      blue: ['border-blue'],
      'blue-light': ['border-blue-light'],
      yellow: ['border-yellow'],
      'yellow-light': ['border-yellow-light'],
      green: ['border-green'],
    },
    size: {
      small: ['w-20', 'h-20'],
    },
  },
  defaultVariants: {
    size: 'small',
    color: 'grey',
    borderWidth: '4',
  },
});

type ProgressRignVariantType = VariantProps<typeof progressRignVariants>;
type CircleProgressBoxVariantType = VariantProps<
  typeof circleProgressBoxVariant
>;

export {
  type CircleProgressBoxVariantType,
  circleProgressBoxVariant,
  type ProgressRignVariantType,
  progressRignVariants,
};
