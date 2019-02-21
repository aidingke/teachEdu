<template lang="pug">
    .not-info 
        .content
            img(:src="defaultImg")
            .not-class  {{notClass}}
            .add-text   {{addText}}
            el-button(v-if="elButton" plain,@click="start") {{elButton}}
</template>
<script>
    export default {
        name: 'NotInfo',
        props:[
            'notClass',
            'addText',
            'elButton',
            'defaultImg'
        ],
        data () {
            return {
                
            }
        },
        methods:{
            start(){
                this.$emit('start');
            },
        }
    }
</script>
<style lang="stylus">
    .not-info
        height 100%
        position fixed
        left 0
        right 0
        background #fff
        .content
            width 400px
            position absolute
            left 50%
            top 30%
            transform: translate(-50%,-50%)
            img
                max-width 100%
            .not-class
                font-size 40px
                text-align center
                color #9b9b9b
                margin 30px 0 0 0
            .add-text
                font-size 20px
                text-align center
                color #a5a5a5
                margin 30px 0 50px 0
            .el-button
                width 100%
                padding 30px 20px
                font-size 30px
</style>
