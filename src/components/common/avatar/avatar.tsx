import { AllHtmlElementProps } from 'types/html-elemet-props';
import {
  avatarImgVariants,
  avatarWrapperVariants,
  AvatarWrapperVariantsType,
} from './cva-varinats/cva-variants';
import { concatClasses } from 'helpers/string/string';
import Image from 'next/image';

interface AvatarProps {
  size?: AvatarWrapperVariantsType['size'];
  background?: AvatarWrapperVariantsType['background'];
  rounded?: AvatarWrapperVariantsType['rounded'];
  src: string;
  alt: string;
  imageHtmlProps?: Omit<AllHtmlElementProps<'div', AvatarProps>, 'placeholder'>;
  wrapperHtmlProps?: AllHtmlElementProps<'div', AvatarProps>;
}

const Avatar = ({
  imageHtmlProps,
  wrapperHtmlProps,
  src,
  alt,
  size,
  rounded,
  background,
}: AvatarProps) => {
  const imgPropsClassName = imageHtmlProps?.className;
  const imgWrapperClassName = wrapperHtmlProps?.className;
  let wrapperClassName = avatarWrapperVariants({ rounded, size, background });
  let imgClassName = avatarImgVariants({ size });

  if (imgWrapperClassName && imgWrapperClassName.length) {
    wrapperClassName = concatClasses([imgWrapperClassName, wrapperClassName]);
  }

  if (imgPropsClassName && imgPropsClassName.length) {
    imgClassName = concatClasses([imgPropsClassName, imgClassName]);
  }

  return (
    <div {...wrapperHtmlProps} className={wrapperClassName}>
      <Image
        priority={true}
        {...imageHtmlProps}
        src={src}
        alt={alt}
        className={imgClassName}
        width={size === 'small' ? 24 : 366}
        height={size === 'small' ? 24 : 495}
      />
    </div>
  );
};

export { Avatar, type AvatarProps };
