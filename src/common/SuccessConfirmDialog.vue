<template lang="pug">
    .success-dialog
        <el-button type="text" @click="dialogTableVisible = true">click Me!</el-button>
        <el-dialog :visible.sync="dialogTableVisible" center :show-close="false">
            .content
                img(src="static/img/success.png")
                .name 新增单选题成功
                .time(v-if="sendMsgDisabled") {{time+'s回到详情页'}}
                .button-items
                    el-button(type="primary") 再加一个
                    el-button(plain,@click="dialogTableVisible=false") 知道了
        </el-dialog>
</template>
<script>
    export default {
        name:'SuccessDialog',
        data() {
            return {
                dialogTableVisible: false,
                time:               3,              //默认时间3S
                sendMsgDisabled:    false
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
                            me.sendMsgDisabled = false;
                            window.clearInterval(interval); //停止
                            // me.$router.push({
                            //     path:'/Login'
                            // })
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
        .button-items
            text-align center
            .el-button
                padding 30px 0
                width 40%
                font-size 30px
</style>

