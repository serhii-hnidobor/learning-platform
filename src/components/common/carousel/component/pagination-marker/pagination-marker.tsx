import {
  paginationMarkerVariants,
  PaginationMarkerVariantsType,
} from 'components/common/carousel/component/pagination-marker/cva-variants/cva-variants';

interface PaginationMarkerProps {
  state: NonNullable<PaginationMarkerVariantsType['state']>;
}

const PaginationMarker = ({ state }: PaginationMarkerProps) => {
  const className = paginationMarkerVariants({ state });
  return <div className={className} />;
};

export { PaginationMarker, type PaginationMarkerProps };
