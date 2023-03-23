import { cva, VariantProps } from 'class-variance-authority';

const typographyVariants = cva([], {
  variants: {
    styleName: {
      h1: ['text-xl5', 'font-serif', 'font-extrabold'],
      h2: ['text-xl4', 'font-serif', 'font-extrabold'],
      h3: ['text-xl3', 'font-serif', 'font-extrabold'],
      h4: ['text-xl2', 'font-serif', 'font-bold'],
      h5: ['text-xl', 'font-serif', 'font-bold'],
      body1ExtraBold: ['text-lg', 'font-serif', 'font-extrabold'],
      body1Bold: ['text-lg', 'font-serif', 'font-bold'],
      body1Regular: ['text-lg', 'font-serif', 'font-regular'],
      body2ExtraBold: ['text-base', 'font-serif', 'font-extrabold'],
      body2Bold: ['text-base', 'font-serif', 'font-bold'],
      body2Medium: ['text-base', 'font-serif', 'font-medium'],
      body2Regular: ['text-base', 'font-serif', 'font-regular'],
      body3Bold: ['text-sm', 'font-serif', 'font-bold'],
      body3Regular: ['text-sm', 'font-serif', 'font-regular'],
    },
    truncate: {
      noTruncate: '',
      truncate: 'truncate',
      lineClamp1: 'line-clamp-1',
      lineClamp2: 'line-clamp-2',
      lineClamp3: 'line-clamp-3',
      lineClamp4: 'line-clamp-4',
    },
    textTransform: {
      uppercase: ['uppercase'],
      lowercase: ['lowercase'],
      'normal-case': ['normal-case'],
      capitalize: ['capitalize'],
    },
    align: {
      left: ['text-left'],
      right: ['text-right'],
      center: ['text-center'],
    },
    color: {
      black: ['text-black'],
      dark: ['text-dark'],
      grey: ['text-grey'],
      'grey-light': ['text-grey-light'],
      white: ['text-white'],
      blue: ['text-blue'],
      'blue-light': ['text-blue-light'],
      yellow: ['text-yellow'],
      'yellow-light': ['text-yellow-light'],
      green: ['text-green'],
      inherit: ['text-inherit'],
      'orange-red': ['text-orange-red'],
    },
  },
  defaultVariants: {
    align: 'left',
    styleName: 'body1Regular',
    textTransform: 'normal-case',
    color: 'inherit',
    truncate: 'noTruncate',
  },
});

type TypographyVariantsType = VariantProps<typeof typographyVariants>;

export { type TypographyVariantsType, typographyVariants };
