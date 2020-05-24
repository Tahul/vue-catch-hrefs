import Vue from 'vue';
import VueCatchHrefs from 'vue-catch-hrefs';

export default ({ app }) => {
  // inject options from module
  const opts = [<%= serialize(options) %>][0];

  Vue.use(VueCatchHrefs, app.$router, opts.pathFormatter);
};
