import fs from 'fs-extra';
import path from 'path';
import {
  DefaultTheme,
  DefaultThemeRenderContext,
  JSX,
  Renderer,
  RendererEvent,
} from 'typedoc';

import RenderContext from './RenderContext';

class Theme extends DefaultTheme {
  /** List of custom CSS files */
  static customCSS: string[] = ['custom.css'];

  /** List of custom JS files */
  static customJS: string[] = ['custom.js'];

  protected context?: RenderContext;

  constructor(renderer: Renderer) {
    super(renderer);

    renderer.hooks.on('head.end', Theme.onHeadEnd);
    renderer.hooks.on('body.end', Theme.onBodyEnd);

    this.listenTo(renderer, Renderer.EVENT_END, Theme.onRenderEnd);
  }

  override getRenderContext(): RenderContext {
    this.context ||= new RenderContext(this, this.application.options);
    return this.context;
  }

  static onHeadEnd(context: DefaultThemeRenderContext): JSX.Element {
    // Insert CSS import to the end of HEAD
    return (
      <>
        {Theme.customCSS.map((file) => (
          <link rel="stylesheet" href={context.relativeURL(`assets/${file}`)} />
        ))}
      </>
    );
  }

  static onBodyEnd(context: DefaultThemeRenderContext): JSX.Element {
    // Insert JS import to the end of BODY
    return (
      <>
        {Theme.customJS.map((file) => (
          <script src={context.relativeURL(`assets/${file}`)} />
        ))}
      </>
    );
  }

  static onRenderEnd(event: RendererEvent) {
    // Copy custom CSS/JS to output asset directory
    const src = path.resolve(__dirname, '../static');
    const dest = path.resolve(event.outputDirectory, 'assets');
    fs.copySync(src, dest);
  }
}

export default Theme;
