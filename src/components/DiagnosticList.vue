<!-- 
* name: 班级课程表 | 数据诊断
* author: cgc
* time: 2018-8-2
-->
<template lang="pug">
    .digList
        Header(title="诊断列表",@goBack="goBack")
        .container
            ul(v-if="diagnosticList.length > 0 && show") 
                    li(v-for="(item,index) in diagnosticList",:key="index" @click="changePage(item.id)")
                        .left
                            .name.nameCheck(v-if="item.isCheck==2") {{item.subjectName}}
                            .name(v-if="item.isCheck==1") {{item.subjectName}}
                        .right 
                            span.createTime {{item.createTime}}
            NotInfo(v-if="diagnosticList.length === 0 && !show" notClass="暂无诊断列表信息" defaultImg="static/img/not-data-default.png")
</template>
<script>
export default {
  name: "DiagnosticList",
  data() {
    return {
      digClassId: "", // 有digClassId的是教师版，没有的是学生版
      diagnosticList: [
        // {
        //    subjectName: "电控",
        //    createTime: "2018-08-25 14:30:25",
        //    isCheck: "2",
        // }
      ],
      show: true
    };
  },
  methods: {
    goBack() {
      // 返回
      this.$router.back(-1);
    },
    changePage(digId){
      if(this.hasQx('stu:dig:detail')){
        this.$router.push({name:'TestData',query:{digId:digId}});
      }else{
        this.dialog('您无权进行该操作');
      }
    },
    async getDitList() {
      // 诊断列表
      const res = await this.$axios.getDitList({ pageNum: 1, pageSize: 10 });
      if (res.code === 1000) {
        if(res.data.length>0){
          this.show = true;
        }else{
          this.show = false;
        }
        this.diagnosticList = res.data;
      } else {
        this.show = false;
        if (res.code === 1100) {
          // 暂无数据，不弹窗
          return;
        } else {
          this.dialog(res.message);
        }
      }
    },
    async getTeachDitList() {
      // 诊断列表
      const res = await this.$axios.getTeachDitList({
        digClassId: this.digClassId,
        pageNo: 1,
        pageSize: 10
      });
      if (res.code === 1000) {
        this.diagnosticList = res.data;
      } else {
        if (res.code === 1100) {
          // 暂无数据，不弹窗
          return;
        } else {
          this.dialog(res.message);
        }
      }
    }
  },
  mounted() {
    let digClassId = this.$route.query.digClassId;
    if (this.$route.query.digClassId) {
      // 教师版的调getTeachDitList
      this.digClassId = digClassId;
      this.getTeachDitList();
    } else {
      this.getDitList();
    }
  }
};
</script>
<style lang="stylus">
.digList
    .container
        height 100%
        position fixed
        left 0
        right 0
        background #efefef
        overflow-y auto
        -webkit-overflow-scrolling touch
        ul
            margin 20px 20px 110px
            background #fff
            font-size 30px
            li
                padding 40px 40px
                border-bottom 3px solid #efefef
                overflow hidden
                line-height 60px
                .left
                    float left
                .right
                    float right
                    color #c0c4cc
                    font-size 0.3rem
                .box
                    display flex
                    justify-content space-between
                .type
                    margin-left 30px
                    clear both
                    margin-top 20px
                .name
                    flex 1
                    margin 0 30px
                .nameCheck:after
                    content '已写评语'
                    margin-left 50px
                    color red
                    border 1px solid red
                    border-radius 5px
                    padding 10px
                    font-size 30px
                .number
                    color #909399
        .not-info
            margin 20px 20px 0
</style>
