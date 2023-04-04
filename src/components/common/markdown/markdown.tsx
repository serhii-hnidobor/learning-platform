import ReactMarkdown from 'react-markdown';
import { Typography } from 'components/common/typography/typography';
import { concatClasses } from 'helpers/string/string';
import remarkGfm from 'remark-gfm';
import Skeleton from 'react-loading-skeleton';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { ComponentBaseProps, LoadingProps } from 'types/html-elemet-props';

interface MarkdownProps extends ComponentBaseProps<'div'> {
  source: string;
  loading?: false;
}

interface MarkdownLoadingProps extends LoadingProps<MarkdownProps> {
  loading: true;
}

type MarkdownPropsType = MarkdownLoadingProps | MarkdownProps;

const Markdown = ({
  source,
  loading,
  ...restWrapperProps
}: MarkdownPropsType) => {
  source = source?.replaceAll('&#10;', '\n');

  if (loading) {
    return (
      <div {...restWrapperProps}>
        {new Array(10).fill(null).map((_, index) => {
          return (
            <div
              className={`mb-6 ${index % 2 ? 'w-[95%]' : 'w-[75%]'}`}
              key={`markdown-skeleton-${index}`}
            >
              <Skeleton containerClassName={'block mb-4'} />
              <Skeleton count={2} containerClassName={'block mb-2'} />
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div {...restWrapperProps}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: (node) => {
            return (
              <Typography
                as={'h1'}
                styleName={'h1'}
                color={'black'}
                children={node.children[0]}
                className={'mb-8 mt-12 inline-block'}
              />
            );
          },
          h2: (node) => (
            <Typography
              as={'h2'}
              styleName={'h2'}
              color={'black'}
              children={node.children[0]}
              className={'mb-8 mt-12 inline-block'}
            />
          ),
          h3: (node) => (
            <Typography
              as={'h3'}
              styleName={'h3'}
              color={'black'}
              children={node.children[0]}
              className={'mb-8 mt-12 inline-block'}
            />
          ),
          h4: (node) => (
            <Typography
              as={'h4'}
              styleName={'h4'}
              color={'black'}
              children={node.children[0]}
              className={'mb-8 mt-12 inline-block'}
            />
          ),
          h5: (node) => (
            <Typography
              as={'h5'}
              styleName={'h5'}
              color={'black'}
              children={node.children[0]}
              className={'mb-8 mt-12 inline-block'}
            />
          ),
          span: (node) => (
            <Typography
              as={'span'}
              styleName={'body2Regular'}
              color={'black'}
              children={node.children[0]}
            />
          ),
          link: ({ href, children }) => {
            return (
              <a href={href} target="_blank" className={'text-blue'}>
                {children}
              </a>
            );
          },
          a: ({ href, children }) => {
            return (
              <a href={href} target="_blank" className={'text-blue'}>
                {children}
              </a>
            );
          },
          ol: (node) => {
            return (
              <ol
                className={concatClasses([
                  'list-decimal',
                  'list-inside',
                  'my-4',
                ])}
              >
                {node.children}
              </ol>
            );
          },
          ul: (node) => {
            return (
              <ul
                className={concatClasses(['list-disc', 'list-inside', 'my-4'])}
              >
                {node.children}
              </ul>
            );
          },
          li: (node) => (
            <Typography
              as={'li'}
              styleName={'body2Regular'}
              color={'black'}
              children={node.children[0]}
            />
          ),
          p: (node) => (
            <Typography
              as={'p'}
              styleName={'body2Regular'}
              color={'black'}
              children={node.children[0]}
            />
          ),
          code: ({ node: _, inline, className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <SyntaxHighlighter
                children={String(children).replace(/\n$/, '')}
                language={match[1]}
              />
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {source || ''}
      </ReactMarkdown>
    </div>
  );
};

export { Markdown as default, type MarkdownPropsType };
