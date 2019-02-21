<template lang="pug">
    .fixed-footer
        el-button(type="primary" @click="fixedSubmit") {{buttonText}}
</template>
<script>
    export default {
        name: 'FixedButton',
        props: ['buttonText'],
        data () {
            return {
            }
        },
        methods:{
            fixedSubmit(){
                this.$emit('listenToChildEvent');
            }
        }
    }
</script>
<style lang="stylus">
.fixed-footer
    width 100%
    height 120px
    line-height 120px
    margin 0 auto 0 auto
    text-align center
    background #fff
    position fixed
    bottom 0
    left 0
    right 0
    z-index 1
    .el-button
        font-size 28px
        padding 30px 40px
        width 98%
        background-color #138BE7 !important
</style>

