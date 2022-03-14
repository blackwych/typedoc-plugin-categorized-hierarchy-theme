import { DefaultTheme, DefaultThemeRenderContext, Renderer } from 'typedoc';

import { decorateContext } from './decorator';
import { onHeadEnd, onBodyEnd, onRendererEnd } from './listeners';

class Theme extends DefaultTheme {
  static themeName = 'categorized-hierarchy';

  protected context?: DefaultThemeRenderContext;

  constructor(renderer: Renderer) {
    super(renderer);

    renderer.hooks.on('head.end', onHeadEnd);
    renderer.hooks.on('body.end', onBodyEnd);
    this.listenTo(renderer, Renderer.EVENT_END, onRendererEnd);
  }

  override getRenderContext(): DefaultThemeRenderContext {
    const RenderContext = decorateContext(DefaultThemeRenderContext);
    this.context ||= new RenderContext(this, this.application.options);
    return this.context;
  }
}

export default Theme;
