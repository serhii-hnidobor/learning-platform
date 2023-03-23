import { useNavigate } from 'react-router-dom';
import { AppRoutes, IconName } from 'common/enum/enum';
import { Button, Icon, Section, Typography } from 'components/common/common';

const NotFound = () => {
  const navigate = useNavigate();
  const redirectToMainPage = () => {
    navigate(AppRoutes.ROOT, { replace: true });
  };

  return (
    <Section
      sectionClassName={'!pt-0'}
      contentWrapperClassName={'flex max-w-[700px] flex-col items-center'}
    >
      <Icon
        name={IconName.LOOKING}
        intent={'base'}
        width={'100%'}
        boxProps={{ className: 'w-full max-w-[400px]' }}
        height={'100%'}
      />
      <div className={'mb-6 flex flex-col gap-1'}>
        <Typography
          as={'span'}
          styleName={'h1'}
          color={'yellow-light'}
          align={'center'}
        >
          404
        </Typography>
        <Typography
          as={'span'}
          styleName={'h4'}
          color={'blue'}
          align={'center'}
        >
          not found
        </Typography>
      </div>
      <Button
        onClick={redirectToMainPage}
        type="button"
        intent={'primary'}
        ariaLabel={'go to home page button'}
      >
        Go to home page
      </Button>
    </Section>
  );
};

export { NotFound };
