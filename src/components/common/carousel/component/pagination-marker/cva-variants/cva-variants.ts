import { cva, VariantProps } from 'class-variance-authority';

const paginationMarkerVariants = cva(['w-2', 'h-2', 'rounded-full'], {
  variants: {
    state: {
      nonActive: ['bg-black', 'bg-opacity-15'],
      active: ['bg-blue'],
    },
  },
  defaultVariants: {
    state: 'nonActive',
  },
});

type PaginationMarkerVariantsType = VariantProps<
  typeof paginationMarkerVariants
>;

export { type PaginationMarkerVariantsType, paginationMarkerVariants };
