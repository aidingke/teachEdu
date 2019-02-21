<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import appFun from '@/util/appFun.js'
export default {
  name: 'App',
  data() {
    return {
        uuid:       '',
        iosFlag:    '',
        orgId:      ''
    }
  },
  methods:{
        getAppUUId(){                   //调原生方法
            try {
                if(this.iosFlag){       //如果是苹果设备
                    window.location="objc://"+"doFunc"+"/"+"getAppUUId";
                }else{                  //安卓设备
                    android.orderlist('getAppUUId');
                }
            } catch(e) {
                console.log(e,'e');
            }
        },
    },
    mounted() {
        this.orgId = this.getUrlParams().orgId;
        localStorage.setItem('orgId',this.orgId);
        this.iosFlag = this.isIos();
        window.getUUId = (uuid) => {                            //原生调JS 获取UUID
            this.uuid = uuid;
            sessionStorage.setItem('uuid',this.uuid);
            // this.$router.push({ 
            //     path:'/'
            // })                  //获取uuid
        }
        this.getAppUUId(); 
        window.studyTokenInvalid = (invalid) => {     //原生调JS Token过期
            this.$router.push({ 
                path:'/Login'
            }) 
        }
    },
}
</script>

<style lang='stylus'>
@import 'element-ui/lib/theme-chalk/index.css';
@import 'common/style/reset.css';
@import 'common/style/base.styl';
#app
    height 100%
</style>
