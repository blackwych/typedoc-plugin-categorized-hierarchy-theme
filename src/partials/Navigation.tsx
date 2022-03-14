import {
  JSX,
  Reflection,
  ReflectionKind,
} from 'typedoc';

import RenderContext from '../RenderContext';
import PrimaryNavigation from './PrimaryNavigation';

type NavigationProps = {
  context: RenderContext,
  model: Reflection,
  original: JSX.Element,
};

/** Replacement of the DefaultTheme's navigation menu */
const Navigation = ({ context, model, original }: NavigationProps): JSX.Element => {
  const modules = model.project.getChildrenByKind(ReflectionKind.SomeModule);
  const projectHasModule = modules.some((m) => m.kindOf(ReflectionKind.Module));

  // original secondary navigation
  const secondaryNavigation = original.children.length === 2 && original.children[1];

  return (
    <>
      <PrimaryNavigation {...{ context, model, projectHasModule }} />
      {!projectHasModule && secondaryNavigation}
    </>
  );
};

export default Navigation;
