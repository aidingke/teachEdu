
<!-- 
* name: 头部
* author: cgc
* time: 2018-8-2
-->
<template lang="pug">
    .header
        .back(@click="goBack()" v-show="$route.path!='/Home'")
            img(src="static/img/back.png")
        .title  {{title}}
        .more(@click="trigger")
            img(src="static/img/more.png")
        //提示
        .trigger(v-show="triggerShow")
            span(@click="goPerCenter") 个人中心
            span(@click="exit") 退出
</template>
<script>
    export default {
        name: 'Header',
        props: ['title'],
        data () {
            return {
                triggerShow:false       //下拉切换
            }
        },
        methods:{
            goBack(){
                this.$emit("goBack")
            },
            trigger(){                  //显示隐藏切换
                this.triggerShow = !this.triggerShow
            },
            goPerCenter(){            //跳到个人中心
                this.$router.push(
                    {
                        name:'PerCenter'
                    }
                )
            },
            exit(){                     //清除token
                sessionStorage.removeItem('accessToken');
                sessionStorage.removeItem('phpToken');
                sessionStorage.removeItem('userName');
                this.$router.push({
                    path:'/Login'
                })
            }
        }
    }
</script>
<style lang="stylus">
    .header
        width 100%
        height 88px
        background-color #138be7
        position relative
        .back
            position absolute
            width 25px
            top 25px
            left 30px
            img 
                width 100%
                vertical-align middle
        .title
            position absolute
            left 50%
            top 50%
            transform: translate(-50%, -50%)
            font-size 35px
            color #fff
        .more
            position absolute
            width 40px
            top 25px
            right 30px
            img 
                width 100%
                vertical-align middle
        .trigger
            background #fff
            width 240px
            position absolute
            right 0
            top 88px
            z-index 999
            border 1px solid #e3e3e3
            span
                padding 35px 50px
                font-size 30px
                display block
                &:nth-child(1)
                    border-bottom 1px solid #e3e3e3
            &:after 
                content ''
                position absolute
                width 0
                height 0
                top -15px
                right 35px
                border-bottom 20px solid #fff;
                border-left 20px solid transparent;
                border-right 20px solid transparent;
</style>
