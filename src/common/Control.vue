<!-- 
* name: 控制器
* author: cgc
* time: 2018-8-2
-->
<template lang="pug">
    .add-control
        a.add(href="javascript:void(0)",@click="handleDialog('add')")
            span.push +
            span.font {{addText}}
</template>
<script>
    export default {
        name: 'Control',
        props: ['addText'],
        data () {
            return {

            }
        },
        methods:{
            handleDialog(params){
                this.$emit('handleControl', {add:'add'});
            }
        }
    }
</script>
<style lang="stylus">
    .add-control
        .add
            border-radius 50%
            color #fff
            background #148ce8
            border 10px solid #afd4ef
            width 150px
            height 150px
            position fixed
            bottom 100px
            right 100px
            text-align center
            z-index 2
            span.push
                font-size 80px
                font-weight 100
                display block
                height 55px
                line-height 55px
                margin-top 10px
            span.font 
                font-size 26px
                display block
                height 50px
                line-height 50px
                margin-top 10px
</style>

