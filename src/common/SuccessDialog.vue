<template lang="pug">
    .success-dialog
        <el-button type="text" @click="dialogTableVisible = true">click Me!</el-button>
        <el-dialog :visible.sync="dialogTableVisible" center>
            .content
                img(src="static/img/success.png")
                .name 报名
                .time(v-if="sendMsgDisabled") {{time+'s回到详情页'}}
                el-button(plain,@click="dialogTableVisible=false") 知道了
        </el-dialog>
</template>
<script>
    export default {
        name:'SuccessDialog',
        data() {
            return {
                dialogTableVisible:false,
                time: 3, // 发送验证码倒计时
                sendMsgDisabled: false
            }
        },
        methods:{
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
                        }
                    }, 1000);
                }
            }
        }
    }
</script>
<style lang="stylus">
.success-dialog
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

