// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import $axios from './axios'
import ElementUI from 'element-ui';
import 'lib-flexible'
import Header from './common/Header.vue';                   //头部
import Control from './common/Control.vue';                 //悬浮控制器
import FixedButton from './common/FixedButton.vue';         //底部按钮 
// import WarningDialog from './common/WarningDialog.vue';     //警告提示弹框
import ConfirmDialog from './common/ConfirmDialog.vue';     //询问弹框
import NotInfo from './common/NotInfo.vue';                 //暂无相关信息
import Calendar from 'vue-mobile-calendar'
import md5 from 'js-md5';
import Day from 'dayjs'
import './util/tools.js';
import store from './store'
import App from './App'
import { dialog,successMsg  } from './common/dialog'
import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'
// import VConsole from 'vconsole'
Vue.component('Header', Header);
Vue.component('Control', Control);
Vue.component('FixedButton', FixedButton);
// Vue.component('WarningDialog', WarningDialog);
Vue.component('ConfirmDialog', ConfirmDialog);
Vue.component('NotInfo', NotInfo);
// const vConsole = new VConsole();

Vue.prototype.$axios = $axios;
Vue.prototype.dialog = dialog;//警告或失败提示
Vue.prototype.successMsg = successMsg;//成功提示
Vue.prototype.$md5 = md5;
Vue.prototype.dayjs = Day
Vue.use(ElementUI);
Vue.use(Calendar)
Vue.use(preview)
//axios.defaults.baseURL = process.env.API_ROOT;

Vue.config.productionTip = false

// 判断是否有权限
Vue.prototype.hasQx = (str) => {
    if (!str) {
        return false // 如果没有传权限进来，默认是没有权限的
    } else if (str === 'default') {
        return true  // default默认有权限
    }
    const arr = store.state.qx
    const split = str.split(',')
    let flag = false
    for (let i = 0; i < split.length; i++) {
        if (arr.includes(split[i])) {
            flag = true
            break
        }
    }
    return flag
    
}


// 路由拦截器

router.beforeEach((to, from, next) => {
    //alert(from.path)
    next()
})


// new Vue({
//     el: '#app',
//     router,
//     store,
//     components: { App },
//     template: '<App/>'
//   })
/* eslint-disable no-new */
store.dispatch('getQx').then((code) => {
    new Vue({
        el: '#app',
        router,
        store,
        components: { App },
        template: '<App/>'
      })

    //   if(code === 100) {
        //alert(1)
        // router.push('/login')
    //   }
})

