import { cva, VariantProps } from 'class-variance-authority';

const avatarWrapperVariants = cva(['overflow-hidden', 'w-auto'], {
  variants: {
    rounded: {
      full: ['rounded-full'],
      base: ['rounded'],
      none: ['rounded-none'],
    },
    size: {
      large: ['w-[495px] h-[495px] flex items-end justify-center'],
      small: ['w-8', 'h-8'],
    },
    background: {
      black: ['bg-black'],
      dark: ['bg-dark'],
      grey: ['bg-grey'],
      'grey-light': ['bg-grey-light'],
      white: ['bg-white'],
      blue: ['bg-blue'],
      'blue-light': ['bg-blue-light'],
      yellow: ['bg-yellow'],
      'yellow-light': ['bg-yellow-light'],
      green: ['bg-green'],
      inherit: ['bg-inherit'],
    },
  },
  defaultVariants: {
    size: 'large',
    rounded: 'full',
    background: 'blue',
  },
});

const avatarImgVariants = cva([], {
  variants: {
    size: {
      large: '',
      small: '',
    },
  },
  defaultVariants: {
    size: 'large',
  },
});

type AvatarImgVariantType = VariantProps<typeof avatarImgVariants>;
type AvatarWrapperVariantsType = VariantProps<typeof avatarWrapperVariants>;

export {
  type AvatarWrapperVariantsType,
  avatarWrapperVariants,
  type AvatarImgVariantType,
  avatarImgVariants,
};
