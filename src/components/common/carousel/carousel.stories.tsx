import { Carousel } from './carousel';
import { Meta, StoryObj } from '@storybook/react';
import type { ProductShortInfoCardProps } from '../card/product-short-info-card/product-short-info-card';
import { IconName } from 'common/enum/icons/icons';
import { ProductReviewPropsType } from '../../common/card/product-review-card/product-review-card';

const meta = {
  title: 'components/common/carousel',
  component: Carousel,
} satisfies Meta<typeof Carousel>;

export default meta;

type Story = StoryObj<typeof Carousel>;

const productShortInfoChild: ProductShortInfoCardProps[] = [
  {
    variant: 'nonActive',
    infoTitle: 'test1',
    infoText:
      'Classes in development that cover the most recent advancements in web.',
    iconName: IconName.BROWSER,
  },
  {
    variant: 'nonActive',
    infoTitle: 'test2',
    infoText:
      'Classes in development that cover the most recent advancements in web.',
    iconName: IconName.BROWSER,
  },
  {
    variant: 'nonActive',
    infoTitle: 'test3',
    infoText:
      'Classes in development that cover the most recent advancements in web.',
    iconName: IconName.BROWSER,
  },
  {
    variant: 'nonActive',
    infoTitle: 'test4',
    infoText:
      'Classes in development that cover the most recent advancements in web.',
    iconName: IconName.BROWSER,
  },
  {
    variant: 'nonActive',
    infoTitle: 'test5',
    infoText:
      'Classes in development that cover the most recent advancements in web.',
    iconName: IconName.BROWSER,
  },
  {
    variant: 'nonActive',
    infoTitle: 'test6',
    infoText:
      'Classes in development that cover the most recent advancements in web.',
    iconName: IconName.BROWSER,
  },
  {
    variant: 'nonActive',
    infoTitle: 'test7',
    infoText:
      'Classes in development that cover the most recent advancements in web.',
    iconName: IconName.BROWSER,
  },
];

const avatarSrc =
  'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/463.jpg';

const reviewChild: ProductReviewPropsType[] = [
  {
    variant: 'active',
    reviewText: 'Lorem ipsum set alamet dolor',
    reviewAuthorName: 'somebody',
    reviewAuthorAvatarSrc: avatarSrc,
  },
  {
    variant: 'active',
    reviewText: 'Lorem ipsum set alamet dolor',
    reviewAuthorName: 'somebody',
    reviewAuthorAvatarSrc: avatarSrc,
  },
  {
    variant: 'active',
    reviewText: 'Lorem ipsum set alamet dolor',
    reviewAuthorName: 'somebody',
    reviewAuthorAvatarSrc: avatarSrc,
  },
  {
    variant: 'active',
    reviewText: 'Lorem ipsum set alamet dolor',
    reviewAuthorName: 'somebody',
    reviewAuthorAvatarSrc: avatarSrc,
  },
  {
    variant: 'active',
    reviewText: 'Lorem ipsum set alamet dolor',
    reviewAuthorName: 'somebody',
    reviewAuthorAvatarSrc: avatarSrc,
  },
  {
    variant: 'active',
    reviewText: 'Lorem ipsum set alamet dolor',
    reviewAuthorName: 'somebody',
    reviewAuthorAvatarSrc: avatarSrc,
  },
  {
    variant: 'active',
    reviewText: 'Lorem ipsum set alamet dolor',
    reviewAuthorName: 'somebody',
    reviewAuthorAvatarSrc: avatarSrc,
  },
  {
    variant: 'active',
    reviewText: 'Lorem ipsum set alamet dolor',
    reviewAuthorName: 'somebody',
    reviewAuthorAvatarSrc: avatarSrc,
  },
];

const CarouselProductShortInfo: Story = {
  args: {
    title: 'product short info carousel',
    description: 'lorem ipsum set alamet dolor',
    child: productShortInfoChild,
  },
};

const CarouselProductReview: Story = {
  args: {
    title: 'product short info carousel',
    description: 'lorem ipsum set alamet dolor',
    child: reviewChild,
  },
};

export { CarouselProductShortInfo, CarouselProductReview };
