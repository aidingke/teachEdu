
<!-- 
* name: 警告提示弹框
* author: cgc
* time: 2018-8-9
-->
<template lang="pug">
    .warning-dialog
        el-dialog(:visible="dialogTableVisible" center :show-close="false" top="35vh")
            .content
                img(src="static/img/waring.png")
                .text {{warningText}}
                el-button(plain,@click="closeWarning()",v-if="!isJs") 知道了
                el-button(plain,@click="removeWarning()",v-if="isJs") 知道了
</template>
<script>
    export default {
        name:'WarningDialog',
        props:[
            'warningText',
            'dialogTableVisible'
        ],
        data() {
            return {
                isJs: false
            }
        },
        methods:{
            // 这个方法是组件里面调用时的事件
            closeWarning(){
                this.$emit('closeWarning')                   
            },
            // 这个方法是js文件里面调用是的事件
            removeWarning() {
                this.callback()
                this.$destroy(true);
                this.$el.parentNode.removeChild(this.$el)
            }
        },
    }
</script>
<style lang="stylus">
.warning-dialog
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

