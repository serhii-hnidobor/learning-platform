import { cva, VariantProps } from 'class-variance-authority';

const topicVariants = cva(
  [
    'py-5',
    'px-3',
    'border',
    'cursor-pointer',
    'rounded',
    'border-black/10',
    'text-center',
    'translate-all',
  ],
  {
    variants: {
      state: {
        active: 'bg-blue',
        base: 'bg-white',
      },
      defaultVariants: {
        state: 'base',
      },
    },
  },
);

type TopicVariantsType = VariantProps<typeof topicVariants>;

export { type TopicVariantsType, topicVariants };
