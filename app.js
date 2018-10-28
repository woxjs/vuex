import Vue from 'vue';
import Vuex from 'vuex';
import { SuperVuex } from 'super-vuex';
Vue.use(Vuex);

export default app => {
  const Store = new SuperVuex();
  app.context.Store = Store;
  app.Client.WebStore = data => {
    for (const i in data) {
      Store.registerModule(data[i]);
    }
  }
  app.Store = Store;
  app.context.Store = Store.init();
  app.on('setup', options => options.store = app.context.Store);
}