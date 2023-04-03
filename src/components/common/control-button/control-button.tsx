import {
  controlButtonVariants,
  ControlButtonVariantsType,
} from 'components/common/control-button/cva-variant/cva-variants';
import { Icon } from 'components/common/icon/icon';
import { ComponentBaseProps } from 'types/html-elemet-props';
import { concatClasses } from 'helpers/string/string';
import { IconName } from 'common/enum/icons/icons';

interface ControlButtonProps extends ComponentBaseProps<'button'> {
  state: NonNullable<ControlButtonVariantsType['state']>;
  isLeft: boolean;
}

const ControlButton = ({
  state,
  className,
  isLeft,
  ...restButtonHtmlProps
}: ControlButtonProps) => {
  let buttonClassName = controlButtonVariants({ state });

  if (className && className.length) {
    buttonClassName = concatClasses([className, buttonClassName]);
  }

  let buttonIconColor: 'white' | 'blue';

  if (state === 'nonActiveGrey' || state === 'activeGrey') {
    buttonIconColor = 'white';
  } else {
    buttonIconColor = state === 'active' ? 'white' : 'blue';
  }

  return (
    <button
      {...restButtonHtmlProps}
      disabled={state !== 'active' && state !== 'activeGrey'}
      className={buttonClassName}
      aria-label={`scroll to ${isLeft ? 'left' : 'right'}`}
    >
      <Icon
        name={isLeft ? IconName.CHEVRON_LEFT : IconName.CHEVRON_RIGHT}
        stroke={buttonIconColor}
        fill={'transparent'}
        width={24}
        height={24}
      />
    </button>
  );
};

export { ControlButton };
