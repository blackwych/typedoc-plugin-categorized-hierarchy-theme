import { Application } from 'typedoc';

import Theme from './Theme';

const load = (app: Application) => {
  app.renderer.defineTheme('categorized-hierarchy', Theme);
};

export { load }; // eslint-disable-line import/prefer-default-export
