import { cva, VariantProps } from 'class-variance-authority';

const passwordInputVariants = cva(
  [
    'border',
    'border-grey',
    'w-full',
    'h-[48px]',
    'focus:outline-blue',
    'focus:outline-2',
    'focus-outline-offset-0',
    'pr-8',
    'pl-6',
  ],
  {
    variants: {
      state: {
        base: 'border-grey',
        validationError:
          '!border-orange-red !focus:outline-none border-2 !outline-none',
        disabled: 'bg-grey',
      },
      defaultVariants: {
        state: 'base',
      },
    },
  },
);

type passwordInputVariantsType = VariantProps<typeof passwordInputVariants>;

export { type passwordInputVariantsType, passwordInputVariants };
