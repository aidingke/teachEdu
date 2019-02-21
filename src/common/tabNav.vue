<!-- 
* name: tab切换菜单
* author: lsc
* time: 2018-9-10
-->
<template lang="pug">
   .navBox
        .nav
            .nav-item(:class="tabValue === index+1?'active':''", @click="tabChange(index+1)", v-for="(item,index) in tabNavArr", :key="index")
                | {{item}}

</template>

<script>
export default {
  name: "tabNav",
  props: {
    tabNavArr: Array,
    tabVal: Number
  },
  data() {
    return {
      tabValue: 1 //切换tab标签
    };
  },
  methods: {
    tabChange(type) {
      //切换考核状态，子传父组件
      this.tabValue = type;
      this.$emit("tabChange", type);
    }
  },
  mounted(){
      this.tabValue = this.tabVal;
  }
};
</script>


<style scoped lang="stylus">
.navBox 
  background #fff
.nav 
  display flex
  width 100%
  height 110px
  line-height 110px
  width 75%
  margin 0 auto
  .active 
    color #138be7
    font-weight 900
    border-bottom 3px solid #138be7; /*no*/
.nav-item 
  flex 1
  font-size 30px
  text-align center
  text-decoration none
  position relative
  color #333
</style>