import { cva, VariantProps } from 'class-variance-authority';

const buttonVariants = cva(['block', 'hover:cursor-pointer'], {
  variants: {
    intent: {
      primary: ['bg-yellow-light', 'border-none', 'text-black'],
      primaryInvert: ['bg-black', 'text-yellow-light'],
      secondary: [
        'bg-transparent',
        'border',
        'border-yellow-light',
        'text-yellow-light',
      ],
      regularOutlined: [
        'bg-transparent',
        'border',
        'border-white',
        'text-white',
      ],
      base: [''],
      regularSolid: ['bg-grey-light', 'text-blue', 'border-none'],
      textPrimary: [
        'inline',
        'border-none',
        'outline-none',
        'text-yellow-light',
      ],
      textSecondary: ['inline', 'border-none', 'text-white'],
      inline: [
        'inline-flex',
        '!p-0',
        'justify-center',
        'items-center',
        'border-none',
      ],
    },
    state: {
      disabled: ['!text-grey', '!bg-grey-light', '!cursor-not-allowed'],
      loading: ['relative', '!cursor-not-allowed'],
      base: [''],
    },
    size: {
      small: ['px-4', 'py-1.5', 'rounded'],
      medium: ['py-2.5', 'px-6', 'rounded'],
      big: ['py-4', 'px-9', 'rounded'],
      large: ['py-4', 'px-20', 'rounded-xl'],
    },
  },
  compoundVariants: [
    {
      intent: 'textPrimary',
      state: 'disabled',
      className: '!bg-transparent',
    },
    {
      intent: 'textSecondary',
      state: 'disabled',
      className: '!bg-transparent',
    },
  ],

  defaultVariants: {
    intent: 'primary',
    size: 'medium',
    state: 'base',
  },
});

type ButtonVariantsType = NonNullable<VariantProps<typeof buttonVariants>>;

export { type ButtonVariantsType, buttonVariants };
