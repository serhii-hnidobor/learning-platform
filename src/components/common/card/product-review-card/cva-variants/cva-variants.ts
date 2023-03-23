import { cva, VariantProps } from 'class-variance-authority';

const productReviewCardVariants = cva(
  ['px-6', 'pb-6', 'pt-[33px]', 'rounded-[12px]', 'w-[384px]', 'xs:w[300px]'],
  {
    variants: {
      variant: {
        active: ['bg-white', 'shadow-sm'],
        nonActive: [
          'bg-transparent',
          'border-opacity-10',
          'border-black',
          'border',
        ],
      },
    },
    defaultVariants: { variant: 'nonActive' },
  },
);

type ProductReviewCardVariantsType = VariantProps<
  typeof productReviewCardVariants
>;

export { type ProductReviewCardVariantsType, productReviewCardVariants };
