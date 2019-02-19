module.exports = compiler => {
  compiler.helper.customRender('vuex', './app/vue/storage', /\.js$/);
}