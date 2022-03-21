import fs from 'fs-extra';
import path from 'path';
import { DefaultThemeRenderContext, JSX, RendererEvent } from 'typedoc';

const customCSS = ['categorized-hierarchy.css'];
const customJS = ['categorized-hierarchy.js'];
const customImages = ['folder.svg'];

const onHeadEnd = (context: DefaultThemeRenderContext): JSX.Element => (
  <>
    {customCSS.map((file) => (
      <link rel="stylesheet" href={context.relativeURL(`assets/${file}`)} />
    ))}
  </>
);

const onBodyEnd = (context: DefaultThemeRenderContext): JSX.Element => (
  <>
    {customJS.map((file) => (
      <script src={context.relativeURL(`assets/${file}`)} />
    ))}
  </>
);

const onRendererEnd = (event: RendererEvent) => {
  // Copy custom CSS/JS to output asset directory
  const src = path.resolve(__dirname, '../static');
  const dest = path.resolve(event.outputDirectory, 'assets');

  [...customCSS, ...customJS, ...customImages].forEach((file) => {
    fs.copySync(path.resolve(src, file), path.resolve(dest, file));
  });
};

export { onHeadEnd, onBodyEnd, onRendererEnd };
