import { cva, VariantProps } from 'class-variance-authority';

const burgerVariants = cva([], {
  variants: {
    fill: {
      transparent: ['!fill-transparent'],
      black: ['fill-black'],
      dark: ['fill-dark'],
      grey: ['fill-grey'],
      'grey-light': ['fill-grey-light'],
      white: ['fill-white'],
      blue: ['fill-blue'],
      'blue-light': ['fill-blue-light'],
      yellow: ['fill-yellow'],
      'yellow-light': ['fill-yellow-light'],
      green: ['fill-green'],
      'white-light': ['fill-white'],
    },
    defaultVariants: {
      fill: 'white-light',
    },
  },
});

type BurgerVariantsType = VariantProps<typeof burgerVariants>;

export { type BurgerVariantsType, burgerVariants };
