<template>
  <div class="wrapper" ref="wrapper">
    <ul class="content">
        <li v-for="(item,index) in 100" :key="index">
          {{item}}
        </li>
    </ul>
  </div>
</template>
<script>
    import BScroll from 'better-scroll'
    export default {
        data() {
            return {
                // data: [
                //     {   a:1 },
                //     {   a:2 },
                //     {   a:3 },
                //     {   a:4 },
                //     {   a:5 },
                //     {   a:6 },
                //     {   a:7 },
                // ],
                abScroll:''
            }
        },
        mounted() {
            this.$nextTick(() => {
                let wrapper = this.$refs.wrapper;
                this.abScroll = new BScroll(wrapper,{})
            })
        }
    }
</script>
<style scoped lang="stylus">
    .wrapper
        width 100%
        height 100vh
        overflow hidden
        border 1px solid #efefef;/*no*/
        li
            text-align center
            font-size 30px;/*no*/

    
</style>
