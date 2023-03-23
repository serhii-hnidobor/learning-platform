import { cva, VariantProps } from 'class-variance-authority';

const productStatisticCardVariants = cva(
  [
    'grid',
    'grid-cols-[48px_1fr]',
    'rounded',
    'p-9',
    'px-3',
    'sm:px-9',
    'max-width-[320px]',
    'grid-rows-[48px_1fr]',
    'gap-y-1',
    'gap-x-4',
  ],
  {
    variants: {
      state: {
        active: ['bg-white', 'border-0'],
        nonActive: [
          'bg-transparent',
          'border',
          'border-opacity-10',
          'border-black',
          'shadow-md',
        ],
      },
    },
    defaultVariants: { state: 'active' },
  },
);

type ProductStatisticCardVariantsType = VariantProps<
  typeof productStatisticCardVariants
>;

export { type ProductStatisticCardVariantsType, productStatisticCardVariants };
