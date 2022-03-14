import {
  DefaultThemeRenderContext,
  JSX,
  PageEvent,
  Reflection,
} from 'typedoc';

import Breadcrumb from './partials/Breadcrumb';
import Navigation from './partials/Navigation';

class RenderContext extends DefaultThemeRenderContext {
  constructor(...args: ConstructorParameters<typeof DefaultThemeRenderContext>) {
    super(...args);

    // We want to overwrite members using `this` and `super`,
    // yet they're not methods but properties.
    // So we have to overwrite them in the constructor.

    this.breadcrumb = (model: Reflection) => <Breadcrumb context={this} model={model} />;

    const originalNavigation = this.navigation;
    this.navigation = (pageEvent: PageEvent<Reflection>) => {
      const original = originalNavigation(pageEvent);
      return <Navigation context={this} model={pageEvent.model} original={original} />;
    };
  }
}

export default RenderContext;
