import { AppRoutes } from 'common/enum/enum';
import { useRouter } from 'next/router';
import { Section } from 'components/common/section/section';
import { Typography } from 'components/common/typography/typography';
import Button from 'components/common/button/button';
import { concatClasses } from 'helpers/string/concat-classes/concat-classes';

const NotFound = () => {
  const Router = useRouter();
  const redirectToMainPage = async () => {
    await Router.replace(AppRoutes.ROOT);
  };

  return (
    <Section
      sectionClassName={concatClasses([
        '!pt-0',
        '!h-full',
        'flex',
        'flex-col',
        'justify-center',
        'content-center',
      ])}
      contentWrapperClassName={'flex flex-col items-center inline-block'}
    >
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

export default NotFound;
