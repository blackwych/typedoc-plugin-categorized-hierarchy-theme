import {
  JSX,
  Reflection,
} from 'typedoc';

import RenderContext from '../RenderContext';

type BreadcrumbProps = {
  context: RenderContext,
  model?: Reflection,
};

/** Split module path into dirs and put link at the end */
const Breadcrumb = ({ context, model }: BreadcrumbProps): JSX.Element => {
  if (!model) return <></>;

  const dirs = model.name.split('/');
  const name = dirs.pop();

  return (
    <>
      <Breadcrumb context={context} model={model.parent} />
      {dirs.map((dir) => <li>{dir}</li>)}
      <li>{model.url ? <a href={context.urlTo(model)}>{name}</a> : <span>{name}</span>}</li>
    </>
  );
};

export default Breadcrumb;
