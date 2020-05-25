import Vue from "vue"
import "element-closest-polyfill"

/**
 * Global event bus for in-component data manipulations
 *
 * @type { Vue }
 */
export const routeEventBus = new Vue()

export default {
  /**
   * Listen for clicks to detect hrefs corresponding to current app and routes them to the real vue-router.
   *
   * @param Vue { Vue }
   * @param router
   * @param pathFormatter
   */
  install(Vue, router, pathFormatter = null) {
    if (!router) {
      throw new Error(
        "Cannot find the router, please use vue-router to catch redirections."
      )
    }

    window.addEventListener("click", (event) => {
      // Get the keys needed from the MouseEvent
      const {
        metaKey,
        altKey,
        ctrlKey,
        shiftKey,
        defaultPrevented,
        button,
      } = event

      // Don't handle when preventDefault called
      if (defaultPrevented) return

      // Don't handle with control keys
      if (metaKey || altKey || ctrlKey || shiftKey) return

      // Don't handle right clicks
      if (button !== undefined && button !== 0) return

      // Find the parent tag element using the `closest` native API
      let from = (event.target || event.srcElement).closest("a")

      // Break if there is no parent element matching
      if (!from) return

      // Get the current app path
      const appPath = window.location.protocol + "//" + window.location.host

      // Cast the href value to URL object
      const url = new URL(from.href)

      // If the element href origin includes the app base path
      if (from.href.includes(appPath)) {
        // Remove the app base path from the path
        let path = url.pathname

        // Call the pathFormatter provided
        if (pathFormatter) {
          path = pathFormatter(path, router.currentRoute)
        }

        // Check if path is truthy
        // As pathFormatter can be returning null to cancel the event handling
        if (path) {
          // Prevent the default click event as it is a matched click
          event.preventDefault()

          // Emit the routeEventBus `href` event
          routeEventBus.$emit("href", { url, path, from, event })

          // Check if the target route path isn't the same as the origin
          if (router.currentRoute.path !== path) {
            // Push the path to the router
            router.push({
              path,
            })
          }
        }
      }
    })
  },
}
