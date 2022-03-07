import {
  DefaultThemeRenderContext,
  JSX,
  PageEvent,
  Reflection,
} from 'typedoc';

import Breadcrumb from './partials/Breadcrumb';
import Navigation from './partials/Navigation';

class RenderContext extends DefaultThemeRenderContext {
  override breadcrumb = (model: Reflection) => (
    <Breadcrumb context={this} model={model} />
  );

  override navigation = ({ model }: PageEvent<Reflection>) => (
    <Navigation context={this} model={model} />
  );
}

export default RenderContext;
