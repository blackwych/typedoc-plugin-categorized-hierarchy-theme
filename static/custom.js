/**
 * returns whether ::before is clicked
 * (assume ::before is placed out of the element)
 *
 * @param {HTMLElement} element
 * @param {MouseEvent} e - click event
 */
const isBeforeClicked = (element, e) => {
  if (e.target !== element) return false;

  const { x, y, width, height } = element.getBoundingClientRect();
  const { pageX: px, pageY: py } = e;
  return !((x <= px && px <= x + width) && (y <= py && py <= y + height));
};

/**
 * reurns whether the element has .tsd-custom-kind-module-dir
 * and clicked its own .menu-label (assume it's the first child)
 *
 * @param {HTMLElement} element
 * @param {MouseEvent} e - click event
 */
const isModuleDirLabelClicked = (element, e) => (
  element.classList.contains('tsd-custom-kind-module-dir')
  && e.target === element.firstElementChild
);

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.tsd-navigation.primary li.has-children')
    .forEach((item) => item.addEventListener('click', (e) => {
      if (isBeforeClicked(item, e) || isModuleDirLabelClicked(item, e)) {
        item.classList.toggle('open');
      }
    }));
});
