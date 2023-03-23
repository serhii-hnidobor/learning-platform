import { cva, VariantProps } from 'class-variance-authority';

const controlButtonVariants = cva(
  [
    'block',
    'w-9',
    'h-9',
    'rounded-full',
    'flex',
    'justify-center',
    'items-center',
  ],
  {
    variants: {
      state: {
        active: ['bg-blue', 'border-none', 'opacity-100'],
        nonActive: ['bg-transparent', 'border', 'border-blue', 'opacity-100'],
        nonActiveGrey: [
          'bg-transparent',
          'border',
          'border-white',
          'border-opacity-15',
          'opacity-0',
        ],
        activeGrey: [
          'bg-transparent',
          'border',
          'border-white',
          'border-opacity-15',
          'opacity-100',
        ],
      },
    },
    defaultVariants: {
      state: 'nonActive',
    },
  },
);

type ControlButtonVariantsType = NonNullable<
  VariantProps<typeof controlButtonVariants>
>;

export { type ControlButtonVariantsType, controlButtonVariants };
