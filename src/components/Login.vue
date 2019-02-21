<!-- 
* name: 登录
* author: cgc
* time: 2018-8-2
-->
<template lang="pug">
    div.login
        img.bg-img(src="static/img/binddevice_bg.png")
        .login-content
            h3.login-title  登录
            .input-box
                el-input(v-model="user.userName",autofocus="true",type="text",placeholder="账号",maxlength="11",clearable,@focus="nullMsg=false,errShow=false")
                .icon
                    img(src="static/img/username.png")
            .input-box
                el-input(v-model="user.password",type="password",placeholder="密码",clearable,@focus="nullMsg=false,errShow=false")
                .icon
                    img(src="static/img/password.png")
            .err-msg(v-if="errShow!=''") 用户名或密码错误
            .null-msg(v-if="nullMsg") 账号与密码不能为空
            .button-submit
                el-button(type="primary",@click="submitLogin") 立即登录
</template>
<script>
    export default {
        name: 'Login',
        data () {
            return {
                user:{
                    userName:       '',
                    password:       ''
                },
                errShow:            '',
                nullMsg:            false,
                loginObject:        {},          //返回的数据对象
                uuid:               '',          //设备uuid
                orgId:              '',          //机构id
                iosFlag:            true,
                otherMsg:           '',
            }
        },
        methods:{
            async authority(){   //权限
                const res = await this.$axios.getPersonPermiss();
                if (res.code === 1000) {
                    this.$store.dispatch('getQx', res.data)
                }
            },
            loginCallBack(){                //调原生方法 登录成功后 传给app 用户名 密码 token
                try {
                    if(this.iosFlag){       //如果是苹果设备
                        window.location="objc://"+"doFunc"+"/"+"loginCallBack"+"/" + "?username="+this.user.userName+"&password="+this.user.password+"&token="+this.loginObject.data.accessToken
                    }else{                  //安卓设备
                       
                    }
                } catch(e) {
                    console.log(e,'e');
                }
            },
            async submitLogin(){           
                if(this.user.userName && this.user.password){             //如果账户密码不为空才请求数据

                    //跳转到绑定设备
                    let params = {
                        orgId:      this.orgId,
                        userName:   this.user.userName,
                        password:   this.user.password,
                        deviceMac:  this.uuid
                    }
                    params.password = this.$md5(params.password).toUpperCase();
                    const res = await this.$axios.getLogin(params);
                    
                    if (res.code !== 1000) {
                        return this.errShow = res.message // 如果没有登录成功，直接返回错误
                    }
                    // 下面是登录成功后执行的东西
                    this.loginObject = Object.assign({},res);
                    this.loginCallBack();
                    //this.successMsg(this.loginObject.data);
                    sessionStorage.setItem("userName",this.user.userName);                          //登录名 
                    sessionStorage.setItem("password",this.user.password);                          //登录名
                    sessionStorage.setItem("bannerList", JSON.stringify(this.loginObject.data.bannerList));             // 首页banner图，也是学生登录时受限版的标识 
                    localStorage.setItem("accessToken",this.loginObject.data.accessToken);        //存储token
                    localStorage.setItem("userType",this.loginObject.data.userType);                //存储用户类型 0-老师 1-学生 2-校外人员
                    localStorage.setItem("isMac",this.loginObject.data.isMac);                // 是否绑定设备号 0-未绑定 1-绑定
                    
                    this.$store.dispatch('getQx').then(async () => {
                        // this.successMsg(this.loginObject)
                        // 获取到权限后执行下面的操作
                        if(this.loginObject.data.isMac==='1'){                //已绑定
                            this.$router.push({             //pc页面 跳转方法
                                path:'/Home'
                            })                            
                        }else{                                                //未绑定
                            if(this.loginObject.data.userType==='0'){         //老师
                                this.$router.push({                           //跳转到绑定设备页面
                                    path:'/BindDevice'
                                })
                            }else if(this.loginObject.data.userType==='1'){   //学生
 
                            }
                        }
                    })
                }else {                                              //为空则显示提示
                    this.nullMsg = true
                }
            },
        },
        mounted(){
            this.iosFlag = this.isIos();
            if(sessionStorage.getItem('uuid')!='undefined' && sessionStorage.getItem('uuid')!='' && sessionStorage.getItem('uuid')!=null){
                this.uuid = sessionStorage.getItem('uuid');     //设备uuid
            }else{
                if (this.isDevice() == 'pc') {
                    this.uuid = "pc"
                } else {
                    this.uuid = "1123"
                }
            }
            if(localStorage.getItem('orgId')!='undefined' && localStorage.getItem('orgId')!='' && localStorage.getItem('orgId')!=null &&  localStorage.getItem('orgId')!=undefined){
                this.orgId = localStorage.getItem('orgId')
            }else{
                this.orgId = "97097851240D4DDA9BCFCF29678B6FFD"
            }
        },
        created(){
            console.log(this.isDevice());
        }
    }
</script>
<style lang="stylus">
.login   
    .bg-img
        position fixed
        top 0
        left 0
        z-index -9999
        width 100%
        height 100%
        opacity 1
        transition opacity .3s ease
        box-sizing border-box
    .login-content
        background-color #fff
        width 665px
        height 665px
        position absolute
        top 50%
        left 50%
        right 0
        bottom 0
        border-radius 10px
        transform translate(-50%, -50%)
        box-shadow 0px 0px 50px #b9cfdd
        h3.login-title
            text-align center
            font-size 40px
            font-weight 100
            margin 50px 0
        .input-box
            width 560px
            margin 40px auto
            position relative
            input
                width 100%
                height 40px
                font-size 30px
                line-height 40px
                padding 50px 0
                text-indent  85px
            .icon
                width 25px
                position absolute
                top 35px
                left 30px
                img 
                    width 100%
            .el-input 
                .el-input__suffix
                    // top 45px
                    right 45px
                    .el-input__clear
                        font-size 40px
        .err-msg,.null-msg
            color #e46969
            font-size 30px
            width 560px
            margin 10px auto
        .button-submit
            width 560px
            margin 40px auto
            button
                width 100%
                height 100px
                font-size 35px
        .remind
            width 560px
            margin 40px auto
            text-align center
            color #909399
            div
                margin 25px 0
                font-size 30px
</style>

