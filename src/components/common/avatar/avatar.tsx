import { AllHtmlElementProps } from 'types/html-elemet-props';
import {
  avatarImgVariants,
  avatarWrapperVariants,
  AvatarWrapperVariantsType,
} from './cva-varinats/cva-variants';
import { concatClasses } from 'helpers/helpers';

interface AvatarProps {
  size?: AvatarWrapperVariantsType['size'];
  background?: AvatarWrapperVariantsType['background'];
  rounded?: AvatarWrapperVariantsType['rounded'];
  src: string;
  alt: string;
  imageHtmlProps?: AllHtmlElementProps<'div', AvatarProps>;
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
      <img {...imageHtmlProps} src={src} alt={alt} className={imgClassName} />
    </div>
  );
};

export { Avatar, type AvatarProps };
