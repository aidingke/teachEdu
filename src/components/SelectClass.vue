<!-- 
* name: 选择班级
* author: cgc
* time: 2018-8-2
-->
<template lang="pug">
    .select
        Header(title="班级管理",@goBack="goBack" class="select-header")
        .wrapper(ref="wrapper")
              el-row(v-if="classList.length>0 && show")
                    el-col(:span="12",v-for="(item,index) in classList",:key="index") 
                        .item
                            h3 {{item.className}}
                            .left-right.el-icon-edit-outline(@click="edit(item.classId)" v-if="hasQx('teach:class:detail')")
                            .button-item
                                div
                                    el-button(plain @click="skitStudent(item)") 学生({{item.stuNum}})
                                    |
                                    el-button(plain @click="skitClassTable(item)") 编辑课程
                    |
                    el-col(:span="12")
                        .item(@click="addClass")
                            .add
                                img(src="static/img/add.png")
                            .text 添加新班级
              el-row(v-if="classList.length==0 && !show")
                  el-col(:span="12")
                      .item(@click="addClass")
                          .add
                              img(src="static/img/add.png")
                          .text 添加新班级
                    
        // NotInfo(v-if="classList.length==0 && !show",
        //     notClass="暂无相关班级信息",
        //     addText="请先添加班级及成员",
        //     elButton="添加班级",
        //     defaultImg="static/img/not-class-default.png",@start="dialogTableVisible = true")
            
        el-dialog(:visible.sync="dialogTableVisible" width="60%" @close="resetForm('form')" :title="title")
            .window
                //- h3  班级名称
                el-form(:model="form" :rules="rules" ref="form")
                    el-form-item
                        .title  学习时间
                        .boxDate
                            el-col(:span="11")
                                el-form-item(prop="startTime")
                                    el-date-picker(v-model="form.startTime", id="startTime" type="date", placeholder="选择日期",:picker-options="pickerOptions0" @change="disableStartTimeDate" @click="forbidFocus('startTime')")
                            el-col(:span="2" style="text-align:center") 
                                span.dateSeparate 至
                            el-col(:span="11")
                                el-form-item(prop="endTime")
                                    el-date-picker(v-model="form.endTime",id="endTime" type="date", placeholder="选择日期",:picker-options="pickerOptions1" @change="disableEndTimeDate" @click="forbidFocus('endTime')")
                    |   
                    el-form-item(prop="grade")
                        .grade 系别
                        el-input(v-model="form.grade" placeholder="请输入系别")
                    |   
                    el-form-item(prop="className")
                        .title 专业班级
                        el-input(v-model="form.className" placeholder="请输入班级名称")
                    | 
                    el-form-item(prop="teachId")
                        .title 班主任
                        el-select(v-model="form.teachId" placeholder="请选择老师")
                            el-option(v-for="(item,index) in teacherList"
                            :key="item.id"
                            :label="item.teachName"
                            :value="item.id")
                    | 

                .button-item
                    div
                        el-button(type="primary" @click="validate('form')") 确定
                        |
                        el-button(plain="",@click="resetForm('form')") 取消
</template>
<script>
// import BScroll from "better-scroll";
export default {
  name: "SelectClass",
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      pickerOptions0: {
        disabledDate: this.disableStartTimeDate
      },
      pickerOptions1: {
        disabledDate: this.disableEndTimeDate
      },
      title: "新增班级",
      time: "",
      dialogTableVisible: false,
      calendarStartShow: false, //开始日期 显隐
      calendarEndShow: false, //结束日期 显隐
      form: {
        endTime: "", //结束日期 v-model
        className: "",
        startTime: "", //开始日期 v-model
        grade: "",
        teachId: "",
        classId: "",
        teachName: ""
      },
      rules: {
        endTime: [
          { required: true, message: "请选择结束学习时间", trigger: "change" }
        ],
        className: [
          { required: true, message: "请输入专业班级", trigger: "blur" }
        ],
        startTime: [
          {
            required: true,
            message: "请选择开始学习时间",
            trigger: "change"
          }
        ],
        teachId: [
          {
            type: "string",
            required: true,
            message: "请选择班主任",
            trigger: "change"
          }
        ]
      },
      teacherList: [],
      classList: [],
      subjectId: "",//sessionStorage.getItem("subjectId"),
      pulldown: true,
      show: true
    };
  },
  methods: {
    disableEndTimeDate(time) {
      if (this.form.startTime != "") {
        // 如果有结束日期，结束日期必须大于等于开始日期
        return time.getTime() < new Date(this.form.startTime);
      }
    },
    disableStartTimeDate(time) {
      if (this.form.endTime != "") {
        // 如果有结束日期，开始日期不能大于等于结束日期
        return time.getTime() > new Date(this.form.endTime);
      }
    },
    edit(classId) {
      this.dialogTableVisible = true;
      this.form.classId = classId;
      this.title = "编辑班级";
      this.getClassDetail(this.form.classId);
    },
    addClass(){
      this.dialogTableVisible = true;
      this.title = '新增班级';
    },
    resetForm(formName) {
      // 清空表单
      this.dialogTableVisible = false;
      this.$refs[formName].resetFields();
    },
    validate(formName) {
      // 验证.3
      if(this.hasQx('teach:class:edit')){
        this.$refs[formName].validate(valid => {
          if (valid) {
            // 验证通过后才可以编辑课程
            this.classEdit();
          } else {
            return false;
          }
        });
      }else{
         this.dialog('您无权进行该操作');
      }
    },
    skitStudent(item) {
      // 跳转到学生
      // 每次点击时，先清空缓存，然后在把当前的班级名称存起来
      if(this.hasQx('teach:stu:list')){
        sessionStorage.removeItem("className");
        sessionStorage.setItem("className", item.className);
        this.$router.push({ name: "Student", query: { classId: item.classId } });
      }else{
        this.dialog('您无权进行该操作');
      }
    },
    skitClassTable(item) {
      // 跳转到编辑课程
      this.$router.push({
        name: "ClassTable",
        query: { classId: item.classId, subjectId: sessionStorage.getItem("subjectId") }
      });
    },
    goBack() {
      // 返回
      if (this.subjectId) {
        // 班级课程表进来的
        this.$router.push({
          name: "ClassTableData"
        });
      } else {
        this.$router.push({
          name: "Home"
        });
      }
      sessionStorage.removeItem("subjectId");
    },
    forbidFocus(id) {
      // 取消移动端点击input默认弹出输入法，需传入一个input元素的id
      document.querySelector("#id").focus(function() {
        document.activeElement.blur();
      });
    },
    async classEdit() {
      this.dialogTableVisible = true;
      this.form.startTime = this.dayjs(this.form.startTime).format(
        "YYYY-MM-DD"
      );
      this.form.endTime = this.dayjs(this.form.endTime).format("YYYY-MM-DD");
      const res = await this.$axios.classEdit(this.form);
      if (res.code === 1000) {
        this.successMsg("操作成功");
        this.resetForm("form");
        this.getClassList();
      } else {
        this.dialog(res.message);
      }
    },
    async getClassList() {
      // 获取所有班级列表数据
      const res = await this.$axios.getClassList();
      if (res.code === 1000) {
        this.classList = res.data;
        if(this.classList.length>0){
          this.show = true;
        }else{
          this.show = false;
        }
        // this.$nextTick(() => {
        //   this.scroll = new BScroll(this.$refs.wrapper, { click: true });
        // });
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
    async getTeachList() {
      // 获取所有老师列表数据
      const res = await this.$axios.getTeachList();
      if (res.code === 1000) {
        this.teacherList = res.data;
      } else {
        if (res.code === 1100) {
          // 暂无数据，不弹窗
          return;
        } else {
          this.dialog(res.message);
        }
      }
    },
    async getClassDetail(classId) {
      // 获取所有班级列表详情数据
      const res = await this.$axios.getClassDetail({ classId: classId });
      if (res.code === 1000 && res.data) {
        this.form = res.data;
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
    if (this.$route.query.subjectId) {
      sessionStorage.setItem("subjectId", this.$route.query.subjectId);
      this.subjectId = sessionStorage.getItem("subjectId");
    }
    this.getClassList();
    this.getTeachList();
  }
};
</script>
<style lang="stylus">
.select
  .select-header
	  z-index 100
  .header
    position fixed
    top 0
    left 0
  .wrapper
    width 100%
    position absolute
    top 89px
    left 0
    // height 100vh
    overflow hidden
    background-color #efefef
    .item
      border 1px solid #eeee
      margin 30px 30px
      background #fff
      position relative
      h3
        font-size 35px
        margin 50px 0
        height 40px
        line-height 40px
        text-align center
      .left-right
        position absolute
        right 20px
        top 15px
        font-size 50px
        color #138be7
      .button-item
        margin 50px 0
        div
          margin 0 auto
          width 100%
          text-align center
          .el-button
            padding 35px 0
            width 40%
            font-size 30px
            &:last-child
              margin-left 20px
      .add
        text-align center
        width 80px
        height 80px
        margin 62px auto
        img
          max-width 100%
      .text
        text-align center
        margin 52px 0
        font-size 30px
  /* .default-container
  height 100%
  position fixed
  left 0
  right 0
  background #fff
  .default
      width 400px
      position absolute
      left 50%
      top 30%
      transform: translate(-50%,-50%)
      img
          max-width 100%
      .not-class
          font-size 40px
          text-align center
          color #9b9b9b
          margin 30px 0 0 0
      .add-text
          font-size 20px
          text-align center
          color #a5a5a5
          margin 30px 0 50px 0
      .el-button
          width 100%
          padding 30px 20px
          font-size 30px */
  .window
    padding 0 50px 50px
    h3
      font-size 40px
      color #000
      text-align center
    .boxDate
      display flex
    .date
      width 218px
    // .dateSeparate
    //   margin 0 15px
    //   font-size 30px
    //   line-height 70px
    .el-select
      width 100%
    .el-date-editor--daterange.el-input__inner
      width 100%
      height 60px
      line-height 60px
      padding-left 30px !important
      .el-range-separator
        line-height 60px
        height 60px
    .title
      font-size 30px /* px */
      margin 30px 0
      &:before
        content '*'
        color #f56c6c
        margin-right 0.04rem
    .grade
        font-size 30px /* px */
        margin 30px 0
    .button-item
      margin-top 50px
      div
        margin 0 auto
        text-align center
        .el-button
          padding 35px 90px
          font-size 30px
          &:last-child
            margin-left 20px
  .el-dialog__header
    text-align center
    .el-dialog__title
      font-size 35px
    .el-dialog__headerbtn
      top 24px
  .el-dialog__body
    padding-top 0
    padding-bottom 0px
  .el-date-editor.el-input
    width 100%
  .el-input--prefix .el-input__inner
    padding-left 60px
  .el-date-editor .el-input__prefix
    left 0
</style>
