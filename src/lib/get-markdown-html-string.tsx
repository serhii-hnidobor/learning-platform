import { renderToStaticMarkup } from 'react-dom/server';
import Markdown from 'components/common/markdown/markdown';

function getMarkdownHtmlString(source: string) {
  return renderToStaticMarkup(<Markdown source={source} />);
}

export default getMarkdownHtmlString;
