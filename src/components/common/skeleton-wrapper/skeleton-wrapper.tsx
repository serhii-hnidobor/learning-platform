import { SkeletonTheme } from 'react-loading-skeleton';
import { ReactNode } from 'react';
import 'react-loading-skeleton/dist/skeleton.css';

interface SkeletonWrapperProps {
  children: ReactNode;
  isDarkMode?: boolean;
}

const SkeletonWrapper = ({
  children,
  isDarkMode = false,
}: SkeletonWrapperProps) => {
  return (
    <SkeletonTheme
      baseColor={isDarkMode ? '#4D4D4C' : '#D9D9D9'}
      highlightColor={isDarkMode ? '#D8D8D8' : '#EDEDED'}
    >
      {children}
    </SkeletonTheme>
  );
};

export { type SkeletonWrapperProps, SkeletonWrapper };
