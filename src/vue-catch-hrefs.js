import Vue from "vue"
import { findParent } from './utils';

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

    window.addEventListener('click', (event) => {
      const { metaKey, altKey, ctrlKey, shiftKey, defaultPrevented } = event

      let from = findParent("a", event.target || event.srcElement)

      // Don't handle when preventDefault called
      if (defaultPrevented) return

      // Don't handle with control keys
      if (metaKey || altKey || ctrlKey || shiftKey) return

      // If the event target is a <a> link continue
      if (from) {
        const appPath = window.location.protocol + "//" + window.location.host

        // If the element href origin includes the app base path
        if (from.href.includes(appPath)) {
          // Remove the app base path from the path
          let path = from.href.replace(
            window.location.protocol + "//" + window.location.host,
            ""
          )

          // Call the pathFormatter provided
          if (pathFormatter) {
            path = pathFormatter(path, router.currentRoute)
          }

          if (path && router.currentRoute.path !== path) {
            // Prevent the default click event as it is a matched click
            event.preventDefault()

            // Emit the routeEventBus `href` event
            routeEventBus.$emit("href", { path, from, event })

            if (path !== 'cancel') {
              // Push the path to the router
              router.push({
                path,
              })
            }
          }
        }
      }
    })
  }
}
