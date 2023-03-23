import { cva, VariantProps } from 'class-variance-authority';

const ProductShortInfoCardVariants = cva(
  [
    'px-10',
    'px-3',
    'sm:px-9',
    'max-width-[320px]',
    'py-[30px]',
    'rounded-[12px]',
    'w-[374px]',
  ],
  {
    variants: {
      variant: {
        active: ['bg-blue'],
        nonActive: ['bg-white shadow-md'],
      },
    },
    defaultVariants: { variant: 'nonActive' },
  },
);

type ProductShortInfoCardVariantsType = VariantProps<
  typeof ProductShortInfoCardVariants
>;

export { type ProductShortInfoCardVariantsType, ProductShortInfoCardVariants };
