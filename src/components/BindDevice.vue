<!-- 
* name: 绑定设备号
* author: cgc
* time: 2018-8-2
-->
<template lang="pug">
    .bind
        img.bg-img(src="static/img/binddevice_bg.png")
        .bind-content
            h3.bind-title  绑定设备号
            .input-box
                el-input(v-model="deviceNum" placeholder="设备号",clearable)
                .icon
                    img(src="static/img/pad-icon.png")
            .repeatMsg(v-if="repeatShow") 跟现有设备重复
            .nullMsg(v-if="nullMsg") {{nullMsg}}
            .button-submit
                el-button(type="primary",@click="binding") 立即绑定
            .remind
                .tip 该设备尚未绑定，点击上方按钮立即绑定 
                .subtip 
                    el-checkbox(v-model="isBind" @change="BindPrivate")
                    span 该设备为私人设备，无需绑定 
        ConfirmDialog(confirmTitile="提示",
            :confirmText="confirmText",
            :dialogTableVisible="showConfirm",
            confirmTextButton="绑定",
            closeTextButton="取消",
            @determine="determine",
            @closeConfirm="closeConfirm")
        el-dialog(:visible.sync="dialogTableVisible",class="success-dialog",center,:show-close="false")
            .content
                img(src="static/img/success.png")
                .name 已成功绑定设备号{{deviceNum}}
                .time(v-if="sendMsgDisabled") {{time+'s后自动回到登录页面'}}
</template>
<script>
    export default {
        name: 'BindDevice',
        data () {
            return {
                deviceNum:          '',          //输入的设备号
                isBind:             false,          // 私人绑定标识 0-非私人 1-私人绑定
                repeatShow:         false,       //重复信息提示显示
                showConfirm:        false,       //确认框显隐
                confirmText:        '',          //确认框提示文字
                userType:           '',          //用户类型
                iosFlag:            true,
                nullMsg:            '',          //非空验证  
                dialogTableVisible: false,
                time:               3,           // 发送验证码倒计时
                sendMsgDisabled:    false    
            }
        },
        methods:{
            async determine(){        //点击弹框的确认按钮后
                var params = {};
                if(this.userType==='0'){                  //教师
                    params = {
                        orgId:      this.orgId,           //机构Id
                        deviceNum:  this.deviceNum,       //设备号
                        deviceMac:  this.uuid,            //设备uuid
                        isBind:     this.isBind ? "1" : "0"           // 私人绑定标识 0-非私人 1-私人绑定
                    }
                }else{                                    //学生
                    params = {
                        orgId:      this.orgId,           //机构Id
                    }
                }
                const res = await this.$axios.getBind(params);
                if(res.code===1000){
                    this.dialogTableVisible = true
                    //跳转到首页
                }else{
                    this.dialog(res.message, () => { 
                        this.showConfirm = false
                    })
                }
                
            },
            //确认框关闭
            closeConfirm(){             
                this.showConfirm = false
            },
            //立即绑定
            async binding(){
                if(!this.deviceNum){
                    this.nullMsg = "请输入设备号"
                    return false
                }else{
                    this.showConfirm = true,
                    this.confirmText = '确定绑定设备号为' + this.deviceNum; 
                }
                
            },

            async BindPrivate(val) {
                if (!val) {
                    return false
                }
                let params = {};
                if (this.userType === '0') {                  //教师
                    params = {
                        orgId:      this.orgId,           //机构Id
                        deviceMac:  this.uuid,            //设备uuid
                        isBind:     this.isBind ? "1" : "0"           // 私人绑定标识 0-非私人 1-私人绑定
                    }
                } else {                                    //学生
                    params = {
                        orgId:      this.orgId,           //机构Id
                    }
                }
                const res = await this.$axios.getBind(params);
                if (res.code === 1000) {
                    this.successMsg("您的设备已设为私人设备，请重新登录", () => {
                        this.$router.push('/Login')
                    })
                } 
            },
        },
        mounted(){
            this.userType = localStorage.getItem('userType');     //获取用户类型
            //this.orgId = localStorage.getItem('orgId');           //获取机构Id
            //this.uuid = localStorage.getItem('uuid');             //获取设备uuid
            if(sessionStorage.getItem('uuid')!='undefined' && sessionStorage.getItem('uuid')!='' && sessionStorage.getItem('uuid')!=null){
                this.uuid = sessionStorage.getItem('uuid');     //设备uuid
            }else{
                this.uuid = "1123"
            }
            
            if(localStorage.getItem('orgId')!='undefined' && localStorage.getItem('orgId')!='' && localStorage.getItem('orgId')!=null &&  localStorage.getItem('orgId')!=undefined){
                this.orgId = localStorage.getItem('orgId')
            }else{
                this.orgId = "97097851240D4DDA9BCFCF29678B6FFD"
            }
            this.iosFlag = this.isIos();
        },
        watch:{
            dialogTableVisible(val){
                if(val){
                    let me = this;
                    me.sendMsgDisabled = true;
                    let interval = window.setInterval(function() {
                        if ((me.time--) <= 1) {
                            me.time = 3;
                            window.clearInterval(interval); //停止
                            me.dialogTableVisible = false
                            me.$router.push({
                                path:'/Login'
                            })
                        }
                    }, 1000);
                }
            }
        }
    }
</script>
<style lang="stylus">
.bind   
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
    .bind-content
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
        h3.bind-title
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
                height 100px
                font-size 30px
                text-indent  65px
            .icon
                width 25px
                position absolute
                top 35px
                left 30px
                img 
                    width 100%
            .el-input 
                .el-input__suffix
                    right 45px
                    .el-input__clear
                        font-size 40px
        .button-submit
            width 560px
            margin 40px auto
            button
                width 100%
                height 100px
                font-size 35px
        .repeatMsg
            color #E46969
            width 560px
            margin 10px auto
            font-size 30px
        .nullMsg
            color #E46969
            width 560px
            margin 10px auto
            font-size 30px
        .remind
            width 560px
            margin 40px auto
            color #909399
            font-size 30px
            .tip
                margin 25px 0        
                text-align center
            .subtip
                margin 25px 0
                .el-checkbox
                    margin-left 10px
                    margin-right 35px
                    width 18px
                    height 18px
    .success-dialog
        .el-dialog
            margin-top 35vh !important
        .content
            text-align center
            img
                width 100px
                height 100px
            .name
                color #000
                font-size 30px
                font-weight bold
                margin 20px 0
            .time
                color #909399
                margin 50px 0
                font-size 28px
            .el-button
                padding 30px 60px
</style>

