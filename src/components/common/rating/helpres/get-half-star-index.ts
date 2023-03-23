export function getHalfStarIndex(rating: number) {
  if (Number.isInteger(rating)) {
    return null;
  }

  const truncRating = Math.trunc(rating);

  return truncRating < 0 ? 0 : truncRating;
}
