@blackwych/typedoc-plugin-categorized-hierarchy-theme
=====================================================

TypeDoc plugin to use hierarchical navigation menu with the default theme


## Features

* hierarchical navigation menu according to module paths and separated by their categories
* pretty breadcrumbs where module paths are separated with slashes
* Supports [@blackwych/typedoc-plugin-customized-default-theme](https://www.npmjs.com/package/@blackwych/typedoc-plugin-customized-default-theme)


## Installation

```sh
npm install -D @blackwych/typedoc-plugin-categorized-hierarchy-theme
```


## Usage

TypeDoc will automatically detect and enable this plugin.


To use this theme, configure `theme` option as a command-line option
```sh
typedoc [any options and arguments] --theme categorized-hierarchy
```
or in your `typedoc.js[on]`
```JSON
{
  "theme": "categorized-hierarchy"
}
```
