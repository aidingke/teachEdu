
<!-- 
* name: 成功提示弹框
* author: cgc
* time: 2018-8-9
-->
<template lang="pug">
    .success-msg
        el-dialog(:visible="dialogTableVisible" center :show-close="false" top="35vh")
            .content
                img(src="static/img/success.png")
                .text {{successText}}
                el-button(plain,@click="closeSuccess()",v-if="!isJs") 知道了
                el-button(plain,@click="removeSuccess()",v-if="isJs") 知道了
</template>
<script>
    export default {
        name:'SuccessMsg',
        props:[
            'successText',
            'dialogTableVisible'
        ],
        data() {
            return {
                isJs: false
            }
        },
        methods:{
            // 这个方法是组件里面调用时的事件
            closeSuccess(){
                this.$emit('closeSuccess')                   
            },
            // 这个方法是js文件里面调用是的事件
            removeSuccess() {
                this.callback()
                this.$destroy(true);
                this.$el.parentNode.removeChild(this.$el)
            }
        },
    }
</script>
<style lang="stylus">
.success-msg
    .content
        text-align center
        img
            width 100px
            height 100px
        .text
            color #000
            font-size 30px
            font-weight bold
            margin 20px 0
        .el-button
            padding 30px 60px
</style>

