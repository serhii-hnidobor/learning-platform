import { ComponentBaseProps } from 'types/html-elemet-props';
import { useCallback, useEffect, useRef, useState } from 'hooks/hooks';
import { ControlButton, Typography } from 'components/common/common';
import { PaginationMarker } from './component/pagination-marker/pagination-marker';
import { concatClasses } from 'helpers/helpers';
import { useSwipeable } from 'react-swipeable';
import {
  ProductShortInfoCard,
  ProductShortInfoCardProps,
} from 'components/common/card/product-short-info-card/product-short-info-card';
import {
  ProductReviewCard,
  ProductReviewPropsType,
} from 'components/common/card/product-review-card/product-review-card';
import { isProductReviewCardProps } from 'components/common/card/card-props-type-check';
import { getUserViewCardInfo } from './helpers/get-user-view-card-info';

interface CarouselProps extends Omit<ComponentBaseProps<'div'>, 'title'> {
  child: ProductShortInfoCardProps[] | ProductReviewPropsType[];
  title?: string;
  description?: string;
}

const Carousel = ({
  child,
  title,
  description,
  className,
  ...restWrapperProps
}: CarouselProps) => {
  const gap = 32;
  const cardWidth = 374;

  const [currentIndex, setCurrentIndex] = useState(0);

  const [containerWidth, setContainerWidth] = useState(1600);

  const [activeCardIndexInfo, setActiveCardIndexInfo] = useState<{
    index: number;
    pageIndex: number;
  }>();

  const cardInViewRef = useRef(0);

  const carouselHeaderRef = useRef<HTMLDivElement>(null);

  const swipeHandlers = useSwipeable({
    onSwipedRight: () => {
      movePrev();
    },
    onSwipedLeft: () => {
      moveNext();
    },
  });

  const movePrev = () => {
    if (!cardInViewRef) {
      return;
    }

    const cardInView = cardInViewRef.current;

    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex - cardInView;

      if (nextIndex - cardInView < 0) {
        nextIndex = 0;
      }

      return nextIndex;
    });
  };

  const moveNext = () => {
    if (!cardInViewRef) {
      return;
    }

    const cardInView = cardInViewRef.current;
    const cardArrayLength = child.length;

    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex + cardInView;

      if (nextIndex + cardInView - 1 >= cardArrayLength) {
        nextIndex = child.length - 1;
      }

      return nextIndex;
    });
  };

  let wrapperClassName = 'relative';

  if (className && className.length) {
    wrapperClassName = concatClasses([wrapperClassName, className]);
  }

  const isDisabled = (direction: 'prev' | 'next') => {
    if (!cardInViewRef) {
      return;
    }

    const cardInView = cardInViewRef.current;
    if (direction === 'prev') {
      return currentIndex - cardInView < 0;
    }

    return currentIndex + cardInView > child.length - 1;
  };

  const handleResize = useCallback(() => {
    if (!carouselHeaderRef || !carouselHeaderRef.current) {
      return;
    }

    const viewCardInfo = getUserViewCardInfo({
      containerWidth: carouselHeaderRef.current.offsetWidth,
      gap,
      allCardNum: child.length,
      cardWidth,
    });

    const { containerWidth: newContainerWidth, cardInView: newCardInView } =
      viewCardInfo;

    cardInViewRef.current = newCardInView;

    setContainerWidth(newContainerWidth);
  }, [child]);

  const handleCardClick = (cardIndex: number) => {
    setActiveCardIndexInfo({
      index: cardIndex,
      pageIndex: activePaginationMarker,
    });
  };

  /* init */
  useEffect(() => {
    window.addEventListener('resize', handleResize);

    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  const cardInView = cardInViewRef.current;

  const showedCardProps = child.slice(currentIndex, currentIndex + cardInView);

  let paginationMarkerNum = 0;
  let activePaginationMarker = 0;

  if (cardInView) {
    const markerNum = child.length / cardInView;
    const truncatedMarkerNum = Math.trunc(markerNum);

    paginationMarkerNum =
      markerNum === truncatedMarkerNum ? markerNum : truncatedMarkerNum + 1;

    activePaginationMarker = Math.floor(currentIndex / cardInView);
  }

  return (
    <div {...restWrapperProps} className={wrapperClassName}>
      <header
        ref={carouselHeaderRef}
        className={concatClasses([
          'carousel-control-wrapper',
          'flex',
          'items-center',
          'justify-between',
          'flex-col',
          'md:flex-row',
          'gap-6',
          'mb-[58px]',
        ])}
      >
        <>
          <div>
            {title && (
              <Typography
                as={'h3'}
                styleName={'h3'}
                color={'black'}
                className={concatClasses([
                  'max-w-[434px]',
                  `${description ? 'mb-6' : 'mb-0'}`,
                  'text-center',
                  'md:text-left',
                ])}
              >
                {title}
              </Typography>
            )}
            {description && (
              <Typography
                styleName={'body2Regular'}
                as="p"
                color={'grey'}
                className={'max-w-[434px]'}
              >
                {description}
              </Typography>
            )}
          </div>

          <div className="flex gap-6">
            <ControlButton
              state={isDisabled('prev') ? 'nonActive' : 'active'}
              isLeft={true}
              onClick={movePrev}
            />
            <ControlButton
              state={isDisabled('next') ? 'nonActive' : 'active'}
              isLeft={false}
              onClick={moveNext}
            />
          </div>
        </>
      </header>
      <div
        className={concatClasses([
          'carousel-main',
          'flex',
          'justify-center',
          'gap-8',
          'max-w-full',
          'overflow-visible',
          'mx-auto',
          'px-2',
          'sm:px-9',
          'pb-24',
        ])}
        style={{
          width: `${containerWidth}px`,
        }}
        {...swipeHandlers}
      >
        {showedCardProps.map((cardProps, index) => {
          const activeCardIndex = activeCardIndexInfo?.index;
          const activeCardPageIndex = activeCardIndexInfo?.pageIndex;
          if (isProductReviewCardProps(cardProps)) {
            return (
              <ProductReviewCard
                {...cardProps}
                onClick={() => handleCardClick(index)}
                variant={
                  activeCardIndex === index &&
                  activeCardPageIndex === activePaginationMarker
                    ? 'active'
                    : 'nonActive'
                }
                key={`${index}-${cardProps.id}`}
              />
            );
          }

          return (
            <ProductShortInfoCard
              {...cardProps}
              onClick={() => handleCardClick(index)}
              variant={
                activeCardIndex === index &&
                activeCardPageIndex === activePaginationMarker
                  ? 'active'
                  : 'nonActive'
              }
              key={`${index}-${cardProps.id}`}
            />
          );
        })}
      </div>

      <footer className="relative bottom-16 flex items-center justify-center">
        <div className={'mx-auto flex justify-center gap-3'}>
          {new Array(paginationMarkerNum).fill(0).map((_, index) => {
            return (
              <PaginationMarker
                state={
                  index === activePaginationMarker ? 'active' : 'nonActive'
                }
                key={`${index}-pagination`}
              />
            );
          })}
        </div>
      </footer>
    </div>
  );
};

export { Carousel, type CarouselProps };
