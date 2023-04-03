import { Typography } from 'components/common/typography/typography';
import Button from 'components/common/button/button';
import { concatClasses } from 'helpers/string/concat-classes/concat-classes';

interface LessonPageDrawerHeaderProps {
  progress: number;
  handleClose: VoidFunction;
}

const LessonPageDrawerHeader = ({
  progress,
  handleClose,
}: LessonPageDrawerHeaderProps) => {
  if (progress < 0) {
    progress = 0;
  } else if (progress > 100) {
    progress = 100;
  }

  return (
    <div
      className={concatClasses([
        'border-b',
        'border-b-black/10',
        'bg-white',
        'md:p-12',
        'p-3',
      ])}
    >
      <div
        className={concatClasses([
          'mb-[30px]',
          'flex',
          'flex-col',
          'gap-4',
          'sm:flex-row',
          'sm:gap-[104px]',
        ])}
      >
        <Typography
          as={'h4'}
          styleName={'h3'}
          className={'text-center sm:text-left'}
        >
          Course content
        </Typography>
        <Button
          ariaLabel={'close button'}
          intent={'regularSolid'}
          onClick={handleClose}
          className={concatClasses([
            'max-w-[50%]',
            'self-center',
            'sm:max-w-full',
          ])}
        >
          Close
        </Button>
      </div>
      <div>
        <div className={'mb-[9px] flex items-center justify-between'}>
          <Typography as={'span'}>Overall progress</Typography>
          <Typography as={'span'} styleName={'body3Bold'}>
            {progress}%
          </Typography>
        </div>
        <div className={'bg-grey-light h-0.5 w-full'}>
          <div className={'bg-blue h-0.5'} style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  );
};

export { LessonPageDrawerHeader, type LessonPageDrawerHeaderProps };
