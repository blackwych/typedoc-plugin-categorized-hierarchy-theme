typedoc-plugin-categorized-hierarchy-theme
==========================================

TypeDoc plugin to use hierarchical navigation menu with the default theme


This plugin provides:

* hierarchical navigation menu according to module paths and separated by their categories
* pretty breadcrumbs where module paths are separated with slashes


## Installation

Recommended for npm 5+
```
npx install-peerdeps --dev typedoc-plugin-categorized-hierarchy-theme
```
otherwise
```
npm install -D typedoc-plugin-categorized-hierarchy-theme
```


## Usage

TypeDoc will automatically detect and enable this plugin.


To use this theme, configure `theme` option as a command-line option
```
typedoc [any options and arguments] --theme categorized-hierarchy
```
or in your `typedoc.js[on]`
```
{
  // ...
  "theme": "categorized-hierarchy"
}
```
