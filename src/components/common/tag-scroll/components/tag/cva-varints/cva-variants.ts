import { cva, VariantProps } from 'class-variance-authority';

const tagVariants = cva(
  [
    'px-6',
    'py-4',
    'inline-block',
    'select-none',
    'whitespace-nowrap',
    'h-[59px]',
    'min-w-[100px]',
    'cursor-pointer',
    'text-center',
  ],
  {
    variants: {
      state: {
        nonActive: ['border-white', 'border', 'rounded', 'border-opacity-15'],
        active: [
          'border-white',
          'border',
          'rounded',
          'border-opacity-15',
          'bg-blue/70',
        ],
        loading: ['border-white', 'border', 'rounded', 'border-opacity-15'],
      },
    },
    defaultVariants: {
      state: 'nonActive',
    },
  },
);
type TagVariantsType = VariantProps<typeof tagVariants>;

export { type TagVariantsType, tagVariants };
