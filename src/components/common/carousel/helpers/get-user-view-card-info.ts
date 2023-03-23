interface CardsInViewInfoInterface {
  cardInView: number;
  containerWidth: number;
}

interface GetUserViewCardNumArgs {
  cardWidth: number;
  gap: number;
  allCardNum: number;
  containerWidth: number;
}

function getUserViewCardInfo({
  containerWidth,
  gap,
  allCardNum,
  cardWidth,
}: GetUserViewCardNumArgs): CardsInViewInfoInterface {
  let contentWidth = 0;
  let index = 0;

  for (; index < allCardNum; index++) {
    const containerWidthDelta = cardWidth + gap;

    if (containerWidthDelta + contentWidth <= containerWidth) {
      contentWidth += containerWidthDelta;
      continue;
    } else if (containerWidthDelta + contentWidth - gap * 2 < contentWidth) {
      contentWidth += containerWidthDelta - gap;
      continue;
    }
    break;
  }

  return {
    cardInView: index > 1 ? index : 1,
    containerWidth:
      index < 1 || containerWidth < cardWidth ? 320 : containerWidth,
  };
}

export {
  getUserViewCardInfo,
  type GetUserViewCardNumArgs,
  type CardsInViewInfoInterface,
};
