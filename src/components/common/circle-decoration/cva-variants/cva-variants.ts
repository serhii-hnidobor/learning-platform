import { cva, VariantProps } from 'class-variance-authority';

const circleDecorationVariants = cva(
  ['w-2.5', 'h-2.5', 'bg-blue/50', 'rounded-full', 'absolute'],
  {
    variants: {
      position: {
        topLeft: ['left-[60px]', 'top-[32px]'],
        topRight: ['right-[60px]', 'top-[32px]'],
        bottomLeft: ['left-[60px]', 'bottom-[32px]'],
        bottomRight: ['right-[60px]', 'bottom-[32px]'],
      },
    },
    defaultVariants: {
      position: 'topLeft',
    },
  },
);

type circleDecorationVariantsType = VariantProps<
  typeof circleDecorationVariants
>;

export { type circleDecorationVariantsType, circleDecorationVariants };
