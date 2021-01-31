import posthtml from 'posthtml';
import inline from '../alpine-inline-transpile.js';

export default async function run(inputHTML, config) {
  const {html} = await posthtml([inline(config)]).process(inputHTML);
  return html;
}
