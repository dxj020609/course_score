import Vue from 'vue'
import App from './App.vue'
//导入elementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';


//导入router
import VueRouter from 'vue-router';
import router from './router'


Vue.config.productionTip = false

//使用elementUI
Vue.use(ElementUI);
//使用router
Vue.use(VueRouter);

new Vue({
  render: h => h(App),
  router,
  beforeCreate(){
      //开启全局事件总线
      Vue.prototype.$bus = this
  },
}).$mount('#app')
