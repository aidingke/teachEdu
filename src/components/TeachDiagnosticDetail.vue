<!-- 
* name: 班级课程表 | 数据诊断
* author: lsc
* time: 2018-9-5
-->
<template lang="pug">
    .TeachDiagnosticDetail
        Header(title="详情",@goBack="goBack")
        .container
            ul(v-if="diagnosticList.length > 0 && show") 
                    li(v-for="(item,index) in diagnosticList",:key="index" @click="pageChange(item.digId,item.stuId)")
                        .left
                            .name.nameCheck(v-if="item.stuStatus==2") {{item.stuName}}
                            .name(v-if="item.stuStatus==1") {{item.stuName}}
                            p 学号 {{item.stuNo}}
                        .right(v-if="item.stuScore")
                            span.createTime {{item.stuScore}}
                            span 分
                        .wait(v-else)
                            span 等待评分
        NotInfo(v-if="diagnosticList.length === 0 && !show" notClass="暂无诊断列表详情信息" defaultImg="static/img/not-data-default.png")
</template>
<script>
export default {
  name: "DiagnosticList",
  data() {
    return {
      digClassId: "", // 有digClassId的是教师版，没有的是学生版
      diagnosticList: [
        // {
        //    digId: "",
        //    stuId: "",
        //    stuName: "",
        //    stuNo: "",
        //    stuScore: "80",
        //    stuStatus: ""   // 1是未批改，2已批改
        // }
      ],
      show: true
    };
  },
  methods: {
    pageChange(digId, stuId) {
      if (this.hasQx("stu:dig:detail")) {
          this.$router.push({
            name: "TestData",
            query: {
              stuId: stuId,
              digId: digId,
              teachDetail: true
            }
          });
      } else {
        this.dialog("您无权进行该操作");
      }
    },
    goBack() {
      // 返回
      this.$router.back(-1);
    },
    async getTeachDitList() {
      // 诊断列表
      const res = await this.$axios.getTeachDitList({
        digClassId: this.digClassId,
        pageNo: 1,
        pageSize: 10
      });
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
    }
  },
  mounted() {
    let digClassId = this.$route.query.digClassId;
    if (this.$route.query.digClassId) {
      // 教师版的调getTeachDitList
      this.digClassId = digClassId;
      this.getTeachDitList();
    }
  }
};
</script>
<style lang="stylus">
.TeachDiagnosticDetail
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
                padding 30px 30px
                border-bottom 3px solid #efefef
                overflow hidden
                line-height 60px
                .left
                    float left
                    margin 0 30px
                .right
                    float right
                    font-weight bold
                    line-height 100px
                    color #F56C6C
                    span 
                        font-size 5px
                    .createTime
                        font-size 60px
                .wait 
                    float: right
                    height: 100px
                    line-height: 100px;
                    font-size:24px
                .box
                    display flex
                    justify-content space-between
                .type
                    margin-left 30px
                    clear both
                    margin-top 20px
                .name
                    font-weight bold
                    flex 1
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
