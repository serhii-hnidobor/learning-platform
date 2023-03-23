import { cva, VariantProps } from 'class-variance-authority';

const iconVariants = cva([], {
  variants: {
    fill: {
      transparent: ['[&>path]:!fill-transparent'],
      black: ['[&>path]:fill-black'],
      dark: ['[&>path]:fill-dark'],
      grey: ['[&>path]:fill-grey'],
      'grey-light': ['[&>path]:fill-grey-light'],
      white: ['[&>path]:fill-white'],
      blue: ['[&>path]:fill-blue'],
      'blue-light': ['[&>path]:fill-blue-light'],
      yellow: ['[&>path]:fill-yellow'],
      'yellow-light': ['[&>path]:fill-yellow-light'],
      green: ['[&>path]:fill-green'],
    },
    intent: {
      base: '',
      rounded: ['[&>path]:stroke-blue', '[&>path]:fill-transparent'],
      roundedActive: ['[&>path]:stroke-white', '[&>path]:fill-transparent'],
      squared: ['[&>path]:stroke-blue', '[&>path]:fill-transparent'],
      roundedGrey: ['[&>path]:stroke-grey'],
      squaredInverted: ['[&>path]:stroke-blue', '[&>path]:fill-transparent'],
      squaredTranslucent: ['[&>path]:stroke-white'],
      roundedPrimary: ['[&>path]:stroke-black'],
      squaredDark: ['&[path]:stroke-white'],
    },
    stroke: {
      transparent: ['[&>path]:stroke-transparent'],
      black: ['[&>path]:stroke-black'],
      dark: ['[&>path]:stroke-dark'],
      grey: ['[&>path]:stroke-grey'],
      'grey-light': ['[&>path]:stroke-grey-light'],
      white: ['[&>path]:stroke-white'],
      blue: ['[&>path]:stroke-blue'],
      'blue-light': ['[&>path]:stroke-blue-light'],
      yellow: ['[&>path]:stroke-yellow'],
      'yellow-light': ['[&>path]:stroke-yellow-light'],
      green: ['[&>path]:stroke-green'],
    },
    hoverStroke: {
      none: '',
      transparent: ['group-hover:[&>path]:stroke-transparent'],
      black: ['group-hover:[&>path]:stroke-black'],
      dark: ['group-hover:[&>path]:stroke-dark'],
      grey: ['group-hover:[&>path]:stroke-grey'],
      'grey-light': ['group-hover:[&>path]:stroke-grey-light'],
      white: ['group-hover:[&>path]:stroke-white'],
      blue: ['group-hover:[&>path]:stroke-blue'],
      'blue-light': ['group-hover:[&>path]:stroke-blue-light'],
      yellow: ['group-hover:[&>path]:stroke-yellow'],
      'yellow-light': ['group-hover:[&>path]:stroke-yellow-light'],
      green: ['group-hover:[&>path]:stroke-green'],
    },
    hoverFill: {
      none: [''],
      transparent: ['group-hover:[&>path]:fill-transparent'],
      black: ['group-hover:[&>path]:fill-black'],
      dark: ['group-hover:[&>path]:fill-dark'],
      grey: ['group-hover:[&>path]:fill-grey'],
      'grey-light': ['group-hover:[&>path]:fill-grey-light'],
      white: ['group-hover:[&>path]:fill-white'],
      blue: ['group-hover:[&>path]:fill-blue'],
      'blue-light': ['group-hover:[&>path]:fill-blue-light'],
      yellow: ['group-hover:[&>path]:fill-yellow'],
      'yellow-light': ['group-hover:[&>path]:fill-yellow-light'],
      green: ['group-hover:[&>path]:fill-green'],
    },
    strokeWidth: {
      '0': '[&>path]:stroke-0',
      '1': '[&>path]:stroke-1',
      '2': '[&>path]:stroke-2',
    },
    defaultVariants: {
      strokeWidth: '1',
      stroke: 'black',
      fill: 'transparent',
      hoverStroke: 'none',
      hoverFill: 'none',
      intent: 'base',
    },
  },
});

const iconBoxVariants = cva(['inline-table', 'group'], {
  variants: {
    intent: {
      base: 'contents',
      rounded: ['!bg-blue-light', '!p-4', '!rounded-full'],
      squared: ['!rounded-xl', '!p-4', '!bg-blue/10'],
      squaredInverted: ['!rounded-xl', '!p-4', '!bg-white'],
      roundedActive: ['!rounded-full', '!p4', '!bg-blue'],
      roundedGrey: ['!rounded-full', '!p-[6px]', '!bg-grey-light'],
      roundedPrimary: ['!rounded-full', '!p-4', '!bg-yellow-light'],
      squaredTranslucent: ['!p-5', '!rounded-2xl', '!bg-white/10'],
      squaredDark: ['!p-4', 'bg-dark', '!rounded-[12px]'],
    },
  },
  defaultVariants: {
    intent: 'base',
  },
});

type IconBoxVariantType = VariantProps<typeof iconBoxVariants>;
type IconVariantsType = VariantProps<typeof iconVariants>;

export {
  type IconVariantsType,
  iconVariants,
  type IconBoxVariantType,
  iconBoxVariants,
};
