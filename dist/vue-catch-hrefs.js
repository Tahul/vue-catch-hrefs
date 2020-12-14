import Vue from 'vue';

if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
}

if (!Element.prototype.closest) {
    Element.prototype.closest = function (s) {
        var el = this;

        do {
            if (el.matches(s)) { return el; }
            el = el.parentElement || el.parentNode;
        } while (el !== null && el.nodeType === 1);
        return null;
    };
}

/**
 * Global event bus for in-component data manipulations
 *
 * @type { Vue }
 */
var routeEventBus = new Vue();

var vueCatchHrefs = {
  /**
   * Listen for clicks to detect hrefs corresponding to current app and routes them to the real vue-router.
   *
   * @param Vue { Vue }
   * @param router
   * @param pathFormatter
   */
  install: function install(Vue, pathFormatter) {
    if ( pathFormatter === void 0 ) pathFormatter = null;

    if (!Vue.$router) {
      throw new Error(
        "Cannot find the router, please use vue-router to catch redirections."
      )
    }

    var router = Vue.$router;

    window.addEventListener("click", function (event) {
      // Get the keys needed from the MouseEvent
      var metaKey = event.metaKey;
      var altKey = event.altKey;
      var ctrlKey = event.ctrlKey;
      var shiftKey = event.shiftKey;
      var defaultPrevented = event.defaultPrevented;
      var button = event.button;

      // Don't handle when preventDefault called
      if (defaultPrevented) { return }

      // Don't handle with control keys
      if (metaKey || altKey || ctrlKey || shiftKey) { return }

      // Don't handle right clicks
      if (button !== undefined && button !== 0) { return }

      // Find the parent tag element using the `closest` native API
      var from = (event.target || event.srcElement).closest("a");

      // Break if there is no parent element matching
      if (!from) { return }

      // Get the current app path
      var appPath = window.location.protocol + "//" + window.location.host;

      // Cast the href value to URL object
      var url = new URL(from.href);

      // If the element href origin includes the app base path
      if (from.href.includes(appPath)) {
        // Remove the app base path from the path
        var path = url.pathname;

        // Call the pathFormatter provided
        if (pathFormatter) {
          path = pathFormatter(path, router.currentRoute);
        }

        // Check if path is truthy
        // As pathFormatter can be returning null to cancel the event handling
        if (path) {
          // Prevent the default click event as it is a matched click
          event.preventDefault();

          // Emit the routeEventBus `href` event
          routeEventBus.$emit("href", { url: url, path: path, from: from, event: event });

          // Check if the target route path isn't the same as the origin
          if (router.currentRoute.path !== path) {
            // Push the path to the router
            router.push({
              path: path,
            });
          }
        }
      }
    });
  },
};

export default vueCatchHrefs;
export { routeEventBus };
