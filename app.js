import Vue from 'vue';
import Vuex from 'vuex';
import { SuperVuex } from 'super-vuex';
Vue.use(Vuex);

export default app => {
  const Store = new SuperVuex();
  app.context.$store = app.$store = Store;
  Store.init();
  app.on('DecorateDidInstalled', () => {
    const items = app.$parser.configs.vuex;
    items.forEach(context => {
      app.$parser.ContextEach(context, (key, vuex) => {
        if (typeof vuex === 'function') vuex = vuex(app);
        Store.registerModule(vuex);
      });
    })
  });
  app.on('setup', options => options.store = Store);
}