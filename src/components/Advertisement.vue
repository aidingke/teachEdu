<!-- 
* name: 广告页
* author: lp
* time: 2018-11-19 
-->
<template lang="pug">
    .adPage
        Header(:title="adTitle"  @goBack="goBack")
        .container
            iframe(:src='adUrl', width='100%' height='100%' scrolling="no")
</template>
<script>
import baseUrl from '@/apiconfig'
export default {
    name: "Home",
    data() {
        return {
            adTitle: this.$route.query.adTitle,  
            adUrl: this.$route.query.adUrl       
        }
    },
    methods: {
        goBack() {
            this.$router.push('/Home')
        }
    }
};
</script>
<style lang="stylus">
.adPage
    width 100%
    height 100%
    .container 
        background #efefef
        width 100%
        height 100%
</style>
