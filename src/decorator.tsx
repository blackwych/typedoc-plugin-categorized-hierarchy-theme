import {
  DefaultThemeRenderContext,
  JSX,
  PageEvent,
  Reflection,
} from 'typedoc';

import Breadcrumb from './partials/Breadcrumb';
import Navigation from './partials/Navigation';

type Ctor = typeof DefaultThemeRenderContext;

const decorateContext = (ctor: Ctor): Ctor => (
  class extends ctor {
    constructor(...args: ConstructorParameters<Ctor>) {
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
);

export { decorateContext }; // eslint-disable-line import/prefer-default-export
