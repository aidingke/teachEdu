<!-- 
* name: 数字化教学资源组件
* author: gxr
* time: 2018-7-27
-->
<template lang="pug">
    .digitalTeachingResources
        Header(title="数字化教学资源", @goBack="goBack")
        .container
            .row
                .col(v-if="hasQx('comm:video:list')" @click="onLinkHandle(1)")
                    img(src="static/img/video-manage.png") 
                    span 视频
                .col(@click="onLinkHandle(2)")
                    img(src="static/img/integrated-query.png") 
                    span 综合查询
                .col(@click="onLinkHandle(3)")
                    img(src="static/img/maintain-case-library.png") 
                    span 维修案例库
</template>
<script>
    export default {
        name: 'DigitalTeachingResources',
        data () {
            return {
            }
        },
        methods:{
            goBack() { //返回按钮
                this.$router.back(-1);
            },
            onLinkHandle (type) {
                if(type == 1) {
                    this.$router.push({
                        path:'/VideoList'
                    });
                } else if (type == 2) {
                    this.$router.push({
                        path:'/SelectCarModels'
                    });
                } else if (type == 3) {
                    this.$router.push({
                        path:'/MaintainCaseLibrary'
                    });
                }
            },
            
        },
        mounted(){
        }
    }
</script>
<style lang="stylus">
.digitalTeachingResources
    background #efefef
    height 100%
    position fixed
    left 0
    right 0
    .container
        display flex
        flex-direction column
        padding 60px
        position absolute
        left 0
        right 0
        top 50%
        transform translate(0, -50%)
        .row
            display flex
            .col
                flex 1
                border 1px solid #e3e3e3
                border-radius 10px
                text-align center
                margin 0 20px 40px 20px
                background #fff
                cursor pointer
                img 
                    max-width 130px
                    max-height 130px
                    margin-top 80px
                span 
                    display block
                    font-size 30px
                    padding 69px
</style>
