import { JSX, Reflection } from 'typedoc';

import RenderContext from '../RenderContext';
import PrimaryNavigation from './PrimaryNavigation';

type NavigationProps = {
  context: RenderContext,
  /** model of a target page */
  model: Reflection,
};

/**
 * Replacement of the DefaultTheme's navigation menu
 *
 * We don't need secondary navigation because they are included in primary navigation.
 */
const Navigation = ({ context, model }: NavigationProps): JSX.Element => (
  <PrimaryNavigation {...{ context, model }} />
);

export default Navigation;
