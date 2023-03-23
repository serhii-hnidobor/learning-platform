import { TypographyVariantsType } from 'components/common/typography/cva-variants/cva-variants';
import {
  ButtonIntentType,
  ButtonSizeType,
} from 'components/common/button/type/button';

export function getButtonTypographyVariant(
  size?: ButtonSizeType,
  intent?: ButtonIntentType,
): NonNullable<TypographyVariantsType['styleName']> {
  if (intent === 'regularSolid' && size === 'medium') {
    return 'body3Bold';
  }
  if (intent === 'regularOutlined' && size === 'medium') {
    return 'body3Bold';
  }

  if (!size) {
    return 'body2Bold';
  }

  switch (size) {
    case 'small': {
      return 'body2Bold';
    }
    case 'medium': {
      return 'body2Bold';
    }
    case 'big': {
      return 'body1ExtraBold';
    }
    case 'large': {
      return 'body1Bold';
    }
    default: {
      const exhaustiveCheck: never = size;
      throw new Error(exhaustiveCheck);
    }
  }
}
