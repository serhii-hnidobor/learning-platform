import { Typography } from '../typography/typography';
import { concatClasses } from 'helpers/string/string';
import { TypeOptions } from 'react-toastify';

type ToastNotificationParams = {
  type?: TypeOptions;
  durationMs?: number;
  title: string;
  message: string;
};
const ToastNotification = ({ title, message }: ToastNotificationParams) => {
  return (
    <div
      className={concatClasses([
        'relative',
        'flex',
        'w-full',
        'cursor-pointer',
        'opacity-90',
      ])}
    >
      <div
        className={concatClasses([
          'inline-block',
          'w-full',
          'px-[15px]',
          'py-2',
        ])}
      >
        <div className={concatClasses(['my-[5px]'])}>
          <Typography
            as="span"
            styleName={'body1Regular'}
            color={'white'}
            className={'line-clamp-1'}
          >
            {title}
          </Typography>
        </div>
        <div className={concatClasses(['my-[5px]'])}>
          <Typography
            as="span"
            styleName={'body1Regular'}
            color={'white'}
            className={'line-clamp-3'}
          >
            {message}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export { ToastNotification, type ToastNotificationParams };
