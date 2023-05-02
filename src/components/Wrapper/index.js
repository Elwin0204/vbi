import Wrapper from "./src/main.vue"
Wrapper.install = function(app) {
  app.component(Wrapper)
}
export default Wrapper;