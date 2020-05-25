/*
Nuxt.js module for vue-catch-hrefs
Usage:
    - Install vue-catch-hrefs package
    - Add this into your nuxt.config.js file:
    {
        modules: [
            // Simple usage
            'vue-catch-hrefs/nuxt'
            // Optionally passing pathFormatter in module configuration
            ['vue-catch-hrefs/nuxt', { pathFormatter }]
        ],
    }
*/

const { resolve } = require("path")

module.exports = function nuxtVueWaitModule(moduleOptions) {
  const options = Object.assign({}, this.options.VuePlugin, moduleOptions)

  // Register plugin
  this.addPlugin({
    src: resolve(__dirname, "vue-catch-hrefs.template.js.tpl"),
    fileName: "vue-catch-hrefs.js",
    options: options,
    ssr: false,
  })
}

// Required by Nuxt
module.exports.meta = require("../package.json")
