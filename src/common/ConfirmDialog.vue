<template lang="pug">
    .confirm-dialog
        el-dialog(:visible.sync="dialogTableVisible" center :title="confirmTitile" :show-close="false" top="35vh" )
            .content
                .text {{confirmText}}
                .button-items
                    el-button(type="primary",@click="determine()") {{confirmTextButton}}
                    el-button(plain,@click="closeConfirm()") {{closeTextButton}}
        </el-dialog>
</template>
<script>
export default {
        name:'ConfirmDialog',
        props:[
            'confirmText',
            'dialogTableVisible',
            'confirmTitile',
            'confirmTextButton',
            'closeTextButton',
        ],
        data() {
            return {
            }
        },
        methods:{
            closeConfirm(){
                this.$emit('closeConfirm');
            },
            determine(){
                this.$emit('determine');
            }
        },
}
</script>
<style lang="stylus">
.confirm-dialog
    .content
        .text
            font-size 30px
            margin 20px 0 0 55px
        .button-items
            text-align center
            margin-top 100px
            .el-button
                width 40%
                padding 30px 0
                font-size 30px
</style>