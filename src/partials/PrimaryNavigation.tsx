import clsx from 'clsx';
import {
  DeclarationReflection,
  JSX,
  Reflection,
  ReflectionCategory,
  ReflectionKind,
} from 'typedoc';

import RenderContext from '../RenderContext';

type ModelTree = { [name: string]: { node?: DeclarationReflection, children: ModelTree } };

/** Convert an array of modules to tree of module paths */
const toTree = (models: DeclarationReflection[]): ModelTree => {
  const assign = (tree: ModelTree, [first, ...rest]: string[], node: DeclarationReflection) => {
    const newTree = tree;
    newTree[first] ||= { children: {} };

    if (rest.length) {
      assign(newTree[first].children, rest, node);
    } else {
      newTree[first] = { node, children: toTree(node.children || []) };
    }

    return newTree;
  };

  return models.reduce<ModelTree>((tree, model) => (
    assign(tree, model.name.split('/'), model)
  ), {});
};

const isNonempty = (obj: object) => !!Object.keys(obj).length;

/** Whether the model (Reflection) of a target page is in a tree path  */
const isPageInPath = (
  page: Reflection,
  path: string,
  node: DeclarationReflection | undefined,
) => {
  let m: Reflection | undefined;
  for (m = page; m && !m.isProject(); m = m.parent) {
    if (m === node) {
      return true;
    }

    const p = `/${m.name}`;
    if (m.kindOf(ReflectionKind.Module) && (p === path || p.startsWith(`${path}/`))) {
      return true;
    }
  }
  return false;
};

/** Whether the model (Reflection) of a target page is in a category */
const isPageInCategory = (page: Reflection, category: ReflectionCategory) => {
  let m: Reflection | undefined;
  for (m = page; m && !m.isProject(); m = m.parent) {
    if (m instanceof DeclarationReflection && category.children.includes(m)) return true;
  }
  return false;
};

/** Whether a tree leaf node is in the model (Reflection) of a target page */
const isNodeInPage = (node: DeclarationReflection | undefined, page: Reflection) => (
  node?.parent === page && !node.children?.length
);

type TreeViewProps = {
  /** root path of this tree */
  root?: string,
  /** tree data */
  tree: ModelTree,
  context: RenderContext,
  /** model of a target page */
  model: Reflection,
};

/** Tree view of modules */
const TreeView = ({
  root = '/',
  tree,
  context,
  model,
}: TreeViewProps): JSX.Element => (
  <ul>
    {Object.entries(tree).map(([name, { node, children }]) => {
      const path = `${root}${name}`;
      const hasChildren = isNonempty(children);
      const pageInPath = isPageInPath(model, path, node);
      const nodeInPage = isNodeInPage(node, model);
      const E = node ? 'a' : 'div';

      return (
        <li
          class={clsx(
            node ? node.cssClasses : 'tsd-custom-kind-module-dir',
            {
              'has-children': hasChildren,
              current: pageInPath,
              'in-page': nodeInPage,
              open: hasChildren && pageInPath,
            },
          )}
        >
          <E class="menu-label tsd-kind-icon" href={node && context.urlTo(node)}>{name}</E>
          {isNonempty(children) && (
            <TreeView root={`${path}/`} tree={children} {...{ context, model }} />
          )}
        </li>
      );
    })}
  </ul>
);

type PrimaryNavigationProps = {
  context: RenderContext,
  model: Reflection,
  projectHasModule: boolean,
};

/** Tree view of categories and modules */
const PrimaryNavigation = ({
  context,
  model,
  projectHasModule,
}: PrimaryNavigationProps): JSX.Element => (
  <nav class="tsd-navigation primary">
    <ul>
      <li class={clsx('project', { current: model.isProject() })}>
        <a class="menu-label" href={context.urlTo(model.project)}>{projectHasModule ? 'Modules' : 'Exports'}</a>
        {model.project.categories && (
          <ul>
            {model.project.categories.map((category) => (
              <li class={clsx('category', { current: isPageInCategory(model, category) })}>
                <div class="menu-label">{category.title}</div>
                <TreeView tree={toTree(category.children)} {...{ context, model }} />
              </li>
            ))}
          </ul>
        )}
      </li>
    </ul>
  </nav>
);

export default PrimaryNavigation;
