/**
 * Find first parent with specified tag name.
 *
 * @param Tag name
 * @param el
 * @returns {null|*}
 */
export const findParent = (tagname, el) => {
  // Loop on element
  while (el) {
    // Check if target is specified tag name
    if ((el.nodeName || el.tagName).toLowerCase() === tagname.toLowerCase()) {
      return el
    }

    // Assign el to parent node
    el = el.parentNode
  }

  return null
}