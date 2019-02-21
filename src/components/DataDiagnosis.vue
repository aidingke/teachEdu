<!-- 
* name: 班级课程表 | 数据诊断
* author: cgc
* time: 2018-8-2
-->
<template lang="pug">
    .DataDiagnosis
        Header(title="数据诊断",@goBack="goBack")
        .boxTitle
            span(style="color:#606266") 选择模块
            span(style="color:#138be7" @click="$router.push('DiagnosticList')" v-if="hasQx('stu:dig:list')") 诊断列表
        el-dialog(:visible.sync="dialogTableVisible",width="545px",:show-close="userType=='0'?false:true") <!--教师版的时候右上角的X去掉-->
            .window
                h3  {{title}}
                .item 故障现象
                el-checkbox-group(v-model="isCheckArr")
                    el-checkbox(:label="item.id", :key="item.id" class="item" v-for="(item,index) in FaultsList") {{item.faultDesc}}
                .button-item
                    div
                        el-button(type="primary",@click="changePage") 确定  
                        //-  :disabled="!isCheckArr.length"
                        |
                        el-button(plain="",@click="dialogTableVisible = false") 取消
        .container
            .el-row
                //第一行
                .row(v-for="(items,index) in courseList",:key="index")
                    .row-col(v-for="(item,index) in items",:key="index" @click="getDitCheck(item)")
                        .col
                            a(href="javascript:void(0)", :class="`subjectName subjectName_${item.index} active_${item.index}`") 
                            span {{item.subjectName}}
            
</template>
<script>
import getIcon from "../util/getIcon.js"
export default {
  name: "DataDiagnosis",
  data() {
    return {
      isCheck: "",
      dialogTableVisible: false,
      input: "",
      title: "",
      userType: "0",
      courseList: [],
      FaultsList: [],
      subjectId: "", // 當前點擊的科目id
      item: "", // 当前点击的元素，方便换图片
      isCheckArr: [], // 选中的集合
      disabled: true,
      digObj: {
        courseId: "",
        teacherId: "",
        digId: "",
        id: ''
      }
    };
  },
  methods: {
    changePage() {
      if (this.hasQx('stu:dig:add')) {
        // 勾选了故障现象
        let str = '';
        // this.FaultsList.forEach(element => {
        //   if(str===''){
        //     str += element.id;
        //   }else{
        //     str += ',' + element.id;
        //   }
        // });
        this.$router.push({
          name: "EntryTestData",
          query: {
            courseId: this.digObj.courseId,
            phenomenon: this.isCheckArr.join(","),
            teacherId: this.digObj.teacherId,
            subjectId: this.subjectId,
            // faultId: str
          }
        });
      }else{
         this.dialog('您无权进行该操作');
      }
    },
    goBack() {
      // 返回
      this.$router.push({
        name: "Home"
      });
    },
    async getDitCheck(item) {
      // 诊断科目判断是否有课
      let newImgIconObj = getIcon(item.subjectName); // 新的
      let url =
        newImgIconObj.icon.slice(0, newImgIconObj.icon.lastIndexOf(".")) +
        "-check.png"; // 选中的图片路径
      if (this.subjectId === "") {
        document.querySelector(
          `.active_${item.index}`
        ).style.background = `url(${url}) no-repeat`;
      } else if (this.subjectId !== item.id) {
        let oldImgIconObj = getIcon(this.item.subjectName); // 旧的
        document.querySelector(
          `.subjectName_${this.item.index}`
        ).style.background = `url(${oldImgIconObj.icon}) no-repeat`;
        document.querySelector(
          `.subjectName_${item.index}`
        ).style.background = `url(${url}) no-repeat`;
      }
      this.subjectId = item.id;
      this.item = item;
      if(this.hasQx('stu:dig:check')){
        const res = await this.$axios.getDitCheck({ subjectId: item.id });
        if (res.code === 1000 && res.data) {
          this.digObj = res.data;
          if (res.data.flag === "0") {
            // 学生是否已经提交过诊断数据，0-否，1-是
            // 打开故障现象列表
            if(this.hasQx('comm:fault:list')){
              this.getFaultsList(item);
            }else{
              this.dialog('您无权进行该操作');
            }
          } else if (res.data.flag === "1") {
            // 直接跳到详情
            if(this.hasQx('stu:dig:detail')){
              this.$router.push({
                name: "TestData",
                query: { digId: res.data.digId }
              });
            }else{
              this.dialog('您无权进行该操作');
            }
          }
        } else {
          this.dialog(res.message);
        }
      }else{
        this.dialog('您无权进行该操作');
      }
    },
    async getSubjectList() {
      //获取课程表数据
      const res = await this.$axios.getSubjectList({ pageNo: 1, pageSize: 20 });
      if (res.code === 1000 && res.data.length > 0) {
        for (var i = 0; i < res.data.length; i++) {
          res.data[i].index = i;
        }
        this.data = res.data; // 将原来的数据存起来
        for (var i = 0; i < res.data.length; i += 3) {
          this.courseList.push(res.data.slice(i, i + 3));
        }
        let _this = this;
        this.$nextTick(function() {
          for (var i = 0, len = res.data.length; i < len; i++) {
            let imgIconObj = getIcon(res.data[i].subjectName);
            document.querySelector(
              `.subjectName_${res.data[i].index}`
            ).style.background = `url(${imgIconObj.icon}) no-repeat`;
          }
        });
      } else {
        if (res.code === 1100) {
          // 暂无数据，不弹窗
          return;
        } else {
          this.dialog(res.message);
        }
      }
    },
    async getFaultsList(item) {
      // 获取科目对应的故障现象列表数据
      this.title = item.subjectName;
      this.dialogTableVisible = true;
      // this.FaultsList = [];
      this.subjectId = item.id;
      this.item = item;
      let arr = document.querySelector(`.subjectName`);
      const res = await this.$axios.getFaultsList({ subjectId: item.id,teacherId: this.digObj.teacherId });
      if (res.code === 1000 && res.data.length >= 0) {
        this.FaultsList = res.data;
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
    this.getSubjectList();
  }
};
</script>
<style lang="stylus">
.DataDiagnosis
    .boxTitle
        display flex
        justify-content space-between
        align-items center
        padding 0 30px
        height 1rem
        font-size 30px
        background #fff
    .container
        display flex
        flex-direction column
        padding 60px
        background #efefef
        height 100%
        position fixed
        left 0
        right 0
        overflow auto
        .el-row
            margin-bottom 300px
        .row
            overflow hidden
            .row-col
                width 33.3333%
                float left
                border-radius 10px
                box-sizing border-box
                text-align center
                padding 0 20px 40px 20px
            .col
                border 1px solid #e3e3e3
                background #fff
                &.active
                    border 4px solid #138be7
                a
                    margin-top 80px
                    background-size contain !important
                    width 130px
                    height 130px
                    display inline-block
                span
                    display block
                    font-size 30px
                    padding 69px 0
    .window
        h3
            font-size 40px
            color #000
            text-align center
        .item
            overflow hidden
            font-size 35px
            margin 50px 30px
            display block
        .button-item
            margin-top 30px
            div
                margin 0 auto
                width 600px
                text-align center
                .el-button
                    padding 35px 90px
                    font-size 30px
                    &:last-child
                        margin-left 20px
        .item-input
            position relative
            margin 50px 120px 50px 30px
            input[type='text']
                height 100px
                font-size 30px
            span
                position absolute
                right 20px
                top 0
                font-size 30px
                padding 30px 20px
                color #c0c4cc
            .dele
                position absolute
                right -70px
                top 0
                padding 31px 20px
                border-top 1px solid #dcdfe6
                border-bottom 1px solid #dcdfe6
                border-right 1px solid #dcdfe6
                img
                    vertical-align middle
    .el-checkbox__label
        padding-left 30px
</style>
