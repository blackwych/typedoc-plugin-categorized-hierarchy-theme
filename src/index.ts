import { Application } from 'typedoc';

import Theme from './Theme';

const load = (app: Application) => {
  app.renderer.defineTheme(Theme.themeName, Theme);
};

export * from './decorator';
export * from './listeners';
export { load };
