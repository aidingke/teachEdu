<!-- 
* name: 检测数据
* author: cgc
* time: 2018-8-7
-->
<template lang='pug'>
    .test
        Header(title="检测数据",@goBack="goBack")
        .module(v-for="(items,index) in diagnosticDetails.itemList" :key="`items.sysName_${index}`")
            .title  {{items.sysName}}
            hr
            .items-row(v-for="(item,index) in items.data" :key="`item.itemName${index}`")
                .flex-auto {{item.itemName}}
                .flex-1 {{item.itemValue}}
        .module
            .title 诊断结果
            hr
            .items-column 
                .results {{diagnosticDetails.result}}
        .module
            .title 维修方式
            hr
            .card
                .nav
                    .title-left 维修方式
                .items-column(v-if="diagnosticDetails.maintainceList.length>0" v-for="(item,index) in diagnosticDetails.maintainceList" :key="`maintainceList_${index}`") {{item.fixItem}}
                .items-column(v-else="diagnosticDetails.maintainceList.length===0") 无维修方式
                .nav
                    .title-left 配件耗材
                .nav-text
                    .name 名称
                    .number 数量
                    .company 单位
                .nav-text(v-for="(item,index) in diagnosticDetails.partsList" :key="`partsList_${index}`")
                    .name {{item.partName}}
                    .number {{item.partNum}}
                    .company {{item.partUnit}}
        .module
            .title 诊断思路与总结
            hr
            .items-column
                .summary {{diagnosticDetails.summary}}
        .module(v-if="showComment")
            .title(style="display: flex;justify-content: space-between;")
                span 老师评语
                template(v-if="userType==='0'")
                    span(style="color:#148CE8" @click="TeachDigAddComment" v-if="!commentShow") 完成 
            hr
            .items-column
                .comments(v-if="commentShow") {{diagnosticDetails.comment}}
                template(v-if="userType==='1'")
                    .comments(v-if="!commentShow") 暂无老师评语
                template(v-if="userType==='0'")
                    textarea(style="width:100%;height: 150px;border-radius: 5px;box-sizing: border-box;" v-model="params.teachComment" v-if="!commentShow")
                
        .module(v-if="!scoreShow")
            .title(style="display: flex;justify-content: space-between;")
                template(v-if="userType==='0'")
                    span 综合评分
                    span(style="color:#148CE8" @click="TeachDigAddScore" v-if="!scoreShow") 完成 
            hr
            .items-column(style="margin-top:0;padding-bottom:0.4rem")
                template(v-if="userType==='0'")
                    el-input(style="width:100%;border-radius: 5px;box-sizing: border-box;" v-model="params.score" v-if="!scoreShow")
                        template(slot="append") 分
        .grade
            span {{diagnosticDetails.score}}
</template> 
<script>
export default {
  name: "TestData",
  data() {
    return {
      diagnosticDetails: {
        itemList: [], // 检测项目列表
        maintainceList: [], // 维修方式
        partsList: [], // 配件列表
        result: "", // 诊断结果
        score: "", // 分数
        status: "", //状态 1-未批改 2-已批改
        summary: "", // 诊断思路与总结
        comment: "", // 老师评语
        teachDetail: "" // 是否是教师版详情过来的
      },
      params: {
        digId: "", // 诊断id
        stuId: "", // 学生id
        score: "", // 综合评分
        teachComment: "" // 教师版数据诊断详情----教师评语
      },
      commentShow: "",
      scoreShow: false,
      userType: localStorage.getItem("userType"),
      showComment: true
    };
  },
  methods: {
    goBack() {
      // 返回
      this.$router.back(-1);
    },
    async TeachDigAddComment() {
      // 教师版数据诊断详情---新增教师评语
      const res = await this.$axios.TeachDigAddComment(this.params);
      if (this.params.teachComment === "") {
        this.dialog("老师评语不能为空");
        return;
      }
      if (res.code === 1000) {
        this.successMsg("老师评语新增成功");
        this.diagnosticDetails.comment = this.params.teachComment;
        this.commentShow = true;
      } else {
        this.dialog(res.message);
      }
    },
    async TeachDigAddScore() {
      // 教师版数据诊断详情---新增教师评语
      const res = await this.$axios.TeachDigAddScore(this.params);
      if (this.params.score === "") {
        this.dialog("综合评分不能为空");
        return;
      }
      if (res.code === 1000) {
        this.successMsg("综合评分新增成功");
        this.diagnosticDetails.score = this.params.score;
        this.scoreShow = true;
      } else {
        this.dialog(res.message);
      }
    },
    async DitDetail(item) {
      // 诊断列表
      let params = {
        digId: this.params.digId,
        stuId: this.params.stuId
      };
      if (!params.digId) {
        return;
      }
      const res = await this.$axios.DitDetail(params);
      if (res.code === 1000 && res.data) {
        // 检测列表，将sysName提取出来，找到相同的sysName放在同一个数组
        let map = {};
        this.diagnosticDetails = res.data;
        let arr = [];
        let itemList = this.diagnosticDetails.itemList;
        for (let i = 0, len = itemList.length; i < len; i++) {
          let ai = itemList[i];
          if (!map[ai.sysName]) {
            arr.push({
              sysName: ai.sysName,
              data: [ai]
            });
            map[ai.sysName] = ai;
          } else {
            for (let j = 0; j < arr.length; j++) {
              let dj = arr[j];
              if (dj.sysName == ai.sysName) {
                dj.data.push(ai);
                break;
              }
            }
          }
        }
        this.diagnosticDetails.itemList = arr;
        if (this.userType === "0") {
          // 教师
          if (this.hasQx("teach:diagnose:addComment")) {
            // 有新增评语权限
            if (
              this.diagnosticDetails.comment != "" &&
              this.diagnosticDetails.comment != null
            ) {
              // 有评语
              this.commentShow = true; // 显示评语
            } else {
              // 无评语
              this.commentShow = false; // 不显示评语
            }
          } else {
            // 无新增评语权限
            this.showComment = false;
          }
          if (this.hasQx("teach:diagnose:addScore")) {
            // 有新增评分权限
            if (
              this.diagnosticDetails.score != "" &&
              this.diagnosticDetails.score != null
            ) {
              // 有评分
              this.scoreShow = true; // 影藏评分
            } else {
              // 无评分
              this.scoreShow = false; // 显示评分
            }
          } else {
            // 无新增评分权限
            this.scoreShow = true;
          }
        } else if (this.userType === "1") {
          // 学生
          if (
            this.diagnosticDetails.score != "" &&
            this.diagnosticDetails.score != null
          ) {
            // 有评分
            this.scoreShow = true; // 影藏评分
          } else {
            // 无评分
            this.scoreShow = false; // 显示评分
          }
          if (
            this.diagnosticDetails.comment != "" &&
            this.diagnosticDetails.comment != null
          ) {
            // 有评语
            this.commentShow = true; // 显示评语
          } else {
            // 无评语
            this.commentShow = false; // 不显示评语
          }
        }
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
    if (this.$route.query.teachDetail) {
      this.teachDetail = this.$route.query.teachDetail;
    }
    if (this.$route.query.stuId) {
      this.params.stuId = this.$route.query.stuId;
    }
    if (this.$route.query.digId) {
      this.params.digId = this.$route.query.digId;
    }
    this.DitDetail();
  }
};
</script>
<style lang="stylus">
.test
  background #efefef
  height 100%
  .module
    background #fff
    line-height 100px
    margin-bottom 20px
    .title
      height 100px
      line-height 100px
      font-size 30px
      color #606266
      padding 0 60px 0 60px
      display inline-block
    hr
      margin 0
      border none
      height 2px
      background #efefef
    .items-row
      padding 0 60px 0 60px
      display flex
      flex-direction row
      background #fff
      .flex-auto
        font-size 26px
        width 400px
      .flex-1
        flex 1
        color #000
        position relative
        font-size 26px
    .items-column
      padding 0 60px 0 60px
      background #fff
      margin 20px 0
      .results
        margin 20px 0 30px 0
        font-size 28px
      .summary
        font-size 28px
      .comments
        font-size 28px
    .card
      border-radius 5px
      border 1px solid #c0c4cc
      margin 50px
      font-size 30px
      .nav
        background #efefef
        .title-left
          height 100px
          line-height 100px
          font-size 30px
          color #606266
          padding 0 60px 0 60px
          display inline-block
      .nav-text
        padding 0 60px 0 60px
        margin 20px 0
        .name
          width 40%
          display inline-block
        .number
          width 30%
          display inline-block
        .company
          width 30%
          display inline-block
  .grade
    position absolute
    right 100px
    top 150px
    font-size 100px
    font-weight bold
    color #F56C6C
</style>

