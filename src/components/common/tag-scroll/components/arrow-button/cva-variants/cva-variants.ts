import { cva, VariantProps } from 'class-variance-authority';

const leftButtonBoxVariants = cva(
  [
    'w-full',
    'h-full',
    'lg:px-6',
    'lg:py-4',
    'px-0',
    'py-0',
    'inline-block',
    'select-none',
    'whitespace-nowrap',
    'h-[59px]',
    'lg:min-w-[100px]',
    'miw-w-[59px]',
    'cursor-pointer',
    'z-20',
    'w-9',
    'h-9',
    'flex',
    'justify-center',
    'align-center',
    'relative',
  ],
  {
    variants: {
      state: {
        bloorEdge: [
          'before:z-10',
          'before:bg-gradient-90',
          'before:w-[71px]',
          'before:h-[68px]',
          'before:from-[#2c2b2d_20.97%]',
          'before:to-[rgba(255,255,255,0)_100%]',
          'before:absolute',
          'before:right-[-63px]',
          'before:hidden',
          'before:lg:block',
        ],
        productReviewSectionBlurEdge: [
          'before:from-[#2e2c2f_20.97%]',
          'before:to-[rgba(255,255,255,0)_100%]',
          'before:absolute',
          'before:right-[-21px]',
          'before:hidden',
          'before:lg:block',
          'before:z-10',
          'before:bg-gradient-90',
          'before:w-[71px]',
          'before:h-[59px]',
        ],
        disabled: ['hidden'],
        base: [''],
      },
      defaultVariants: {
        state: 'disabled',
      },
    },
  },
);

const rightButtonBoxVariant = cva(
  [
    'lg:px-6',
    'lg:py-4',
    'px-0',
    'py-0',
    'inline-block',
    'select-none',
    'whitespace-nowrap',
    'h-[68px]',
    'lg:min-w-[100px]',
    'miw-w-[59px]',
    'cursor-pointer',
    'z-20',
    'w-9',
    'h-9',
    'w-full',
    'h-full',
    'flex',
    'justify-center',
    'align-center',
    'relative',
  ],
  {
    variants: {
      state: {
        bloorEdge: [
          'before:z-10',
          'before:bg-gradient-270',
          'before:w-[71px]',
          'before:h-[68px]',
          'before:from-[#242424_20.97%]',
          'before:to-[rgba(255,255,255,0)_80%]',
          'before:absolute',
          'before-top-[7px]',
          'before:left-[-45px]',
          'before:hidden',
          'before:lg:block',
          'xl:before:block',
        ],
        productReviewSectionBlurEdge: [
          'before:from-[#282728_20.97%]',
          'before:to-[rgba(255,255,255,0)_100%]',
          'before:absolute',
          'before:left-[-21px]',
          'before:hidden',
          'before:top-[7px]',
          'before:lg:block',
          'before:z-10',
          'before:bg-gradient-90',
          'before:w-[71px]',
          'before:h-[68px]',
        ],
        disabled: ['hidden'],
        base: [''],
      },
      defaultVariants: {
        state: 'disabled',
      },
    },
  },
);

type LeftButtonBoxVariantsType = VariantProps<typeof leftButtonBoxVariants>;
type RightButtonBoxVariantType = VariantProps<typeof rightButtonBoxVariant>;

export {
  type LeftButtonBoxVariantsType,
  leftButtonBoxVariants,
  type RightButtonBoxVariantType,
  rightButtonBoxVariant,
};
