/**
 * Find first parent with specified tag name.
 *
 * @param tagName
 * @param el
 * @returns {null|*}
 */
export const findParent = (tagName, el) => {
  // Loop on element
  while (el) {
    // Check if target is specified tag name
    if ((el.nodeName || el.tagName).toLowerCase() === tagName.toLowerCase()) {
      return el
    }

    // Assign el to parent node
    el = el.parentNode
  }

  return null
}