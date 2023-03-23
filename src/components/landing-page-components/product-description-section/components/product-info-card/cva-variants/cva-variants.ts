import { cva, VariantProps } from 'class-variance-authority';

const productInfoCardVariants = cva(['items-start', 'justify-start'], {
  variants: {
    variant: {
      horizontal: '',
      vertical: ['flex', 'flex-col', 'justify-center', 'items-center'],
    },
  },
  defaultVariants: { variant: 'horizontal' },
});

type ProductInfoCardVariantsType = VariantProps<typeof productInfoCardVariants>;

export { type ProductInfoCardVariantsType, productInfoCardVariants };
