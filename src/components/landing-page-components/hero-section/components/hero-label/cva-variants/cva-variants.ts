import { cva, VariantProps } from 'class-variance-authority';

const heroLabelVariants = cva(
  ['p-4', 'bg-black', 'rounded-[18px]', 'flex', 'items-center', 'gap-x-4'],
  {
    variants: {
      variant: {
        vertical: ['flex-col', 'justify-center', 'items-center', 'gap-4'],
        horizontal: ['flex-row'],
      },
    },
    defaultVariants: {
      variant: 'vertical',
    },
  },
);

type HeroLabelVariantsType = VariantProps<typeof heroLabelVariants>;

export { type HeroLabelVariantsType, heroLabelVariants };
