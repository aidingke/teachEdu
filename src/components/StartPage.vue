<!-- 
* name: 启动页
* author: cgc
* time: 2018-8-31
-->
<template lang="pug">
    .start-page
        img.Bg(src="static/img/startpage_bg.png")
</template>

<script>
    export default {
        name: 'StartPage',
        methods:{
            
        },
        mounted(){
            setTimeout(()=>{
                this.$router.push({
                    path:'Login'
                })
            },1800)
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.start-page
    img.Bg
        position fixed
        top 0
        left 0
        z-index 6
        width 100%
        height 100%
        opacity 1
        transition opacity .3s ease
        box-sizing border-box
</style>
