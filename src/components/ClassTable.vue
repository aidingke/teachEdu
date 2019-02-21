<!-- 
* name: 课程表
* author: cgc
* time: 2018-8-2
-->
<template lang="pug">
    .table
        Header(title="课程表",@goBack="goBack")
        SuccessTip(:dialogTableVisible="showDialogTableVisible" @successDone="done" :tip="tip" :hint="hint")
        el-dialog(title="添加课程", :visible.sync="dialogVisible", width="50%",@close="resetForm('formLabelAlign')")
            el-form(:label-position="labelPosition", label-width="80px", :model="formLabelAlign", :rules="rules" ,ref="formLabelAlign")
                el-form-item(label="上课日期" prop="courseDate")
                    el-select(v-model="formLabelAlign.courseDate", placeholder="请选择课节" id="courseDate" style="width:100%" @click="forbidFocus('courseDate')")
                        el-option(v-for="(item,index) in th",v-if="index!==0"
                            :key="item"
                            :label="item"
                            :value="index")
                |   
                el-form-item(label="上课时间")
                    el-col(:span="11")
                      el-form-item(prop="startTime")
                        el-select(v-model="formLabelAlign.startTime", placeholder="请选择课节" @change="setDisabled(courseStartTime)")
                          el-option(v-for="item in courseStartTime"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value"
                              :disabled="item.disabled")
                    el-col(:span="2" class="utils") 至
                    el-col(:span="11")
                      el-form-item(prop="endTime")
                        el-select(v-model="formLabelAlign.endTime", placeholder="请选择课节" @change="setDisabled(courseEndTime)")
                          el-option(v-for="item in courseEndTime"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                                :disabled="item.disabled")
                |   
                el-form-item(label="科目" prop="subjectId")
                    el-select(v-model="formLabelAlign.subjectId" placeholder="科目" :disabled = "subjectDisabled")
                            el-option(v-for="item in courseList"
                            :key="item.id"
                            :label="item.subjectName"
                            :value="item.id")
                
                |  
                el-form-item(label="上课老师" prop="teachId")
                    el-select(v-model="formLabelAlign.teachId" placeholder="上课老师" :disabled = "teacherDiabled")
                            el-option(v-for="item in teacherList"
                            :key="item.id"
                            :label="item.teachName"
                            :value="item.id")
                
                |  
            span.dialog-footer(slot="footer")
                    el-button(type="primary",@click="validate('formLabelAlign')" ) 添加
                    |     
                    el-button(@click="resetForm('formLabelAlign')") 取 消
        .container
            .box
                table
                    thead 
                        tr
                            th(v-for="(item, index) in th" :key="index" :class="`profess-th__${index}`") {{item}}
                    tbody
                        tr(v-for="(items, index) in tr" :key="index" :class="`profess-tr__${index}`")
                            td(v-for="(item, i) in items" :key="item" :class="`profess-td__${i}`" v-if="index===i") {{index+1}}
                            td(v-for="(item, i) in items" :key="item" :class="`profess-td__${i}`" v-if="index!==i") 
                div(v-for="(item, index) in classTableList" :key="index" :class="`profess-cont profess-cont__${index}`")
                    div(style="display: table-cell;vertical-align: middle;width: 100%;height:100%;overflow: hidden;")
                      span(class="profess-name") {{item.subjectName}}
                      span(class="profess-name profess-name1") {{item.className}}
                      span(class="el-icon-close class-name" @click="deleteCourse(item)" v-show="flagImg")

                .button-submit(v-if="myCourses")
                      el-button(type='primary' @click="getTeachList" v-show="!flagImg") 添加课程
                      el-button(plain @click="isFlagImg" v-show="!flagImg") 删除
                      el-button(plain @click="courseDelete" style="width:96%;margin-left: 0;" v-show="flagImg") 完成
        
</template>
<script>
import SuccessTip from "../common/SuccessTip.vue";
export default {
  name: "ClassTable",
  components: {
    SuccessTip
  },
  data() {
    return {
      timer: null,
      data: [],
      screenWidth: document.body.clientWidth,
      subjectDisabled: false, // 科目禁用，默认启用
      teacherDiabled: false, // 讲师禁用，默认启用
      hint: "课程表",
      tip: "课程添加成功",
      th: ["", "周一", "周二", "周三", "周四", "周五", "周六", "周日"],
      tr: [
        new Array(8),
        new Array(8),
        new Array(8),
        new Array(8),
        new Array(8),
        new Array(8),
        new Array(8),
        new Array(8)
      ],
      classTableList: [
        //   {
        //       courseDate: "",   // 该科目第几周上课
        //       courseTime: "",   // 该科目上课 在第几节
        //       subjectId: "",    // 科目id
        //       subjectName: ""   // 科目名称
        //   }
      ],
      dialogVisible: false,
      labelPosition: "top",
      colors: [
        "#F65939",
        "#4FB6E1",
        "#5FB39D",
        "#F4BE5C",
        "#67C23A",
        "#7A9AE5"
      ], // 周一到周日，每天的颜色
      formLabelAlign: {
        classId: this.$route.query.classId,
        subjectId: this.$route.query.subjectId,
        teachId: "",
        courseDate: "",
        courseTime: "",
        startTime: "",
        endTime: "",
        color: ""
      },
      rules: {
        // 验证规则
        teachId: [
          { required: true, message: "请选择上课老师", trigger: "change" }
        ],
        courseDate: [
          { required: true, message: "请选择上课日期", trigger: "change" }
        ],
        startTime: [
          {
            required: true,
            message: "请选择开始上课时间",
            trigger: "change"
          }
        ],
        endTime: [
          {
            required: true,
            message: "请选择结束上课时间",
            trigger: "change"
          }
        ]
      },
      teacherList: [], // 上课老师数据
      courseList: [], // 科目数据,
      courseStartTime: [
        {
          value: 1,
          label: 1
        },
        {
          value: 2,
          label: 2
        },
        {
          value: 3,
          label: 3
        },
        {
          value: 4,
          label: 4
        },
        {
          value: 5,
          label: 5
        },
        {
          value: 6,
          label: 6
        },
        {
          value: 7,
          label: 7
        },
        {
          value: 8,
          label: 8
        }
      ], // 开始上课时间数据
      courseEndTime: [
        {
          value: 1,
          label: 1
        },
        {
          value: 2,
          label: 2
        },
        {
          value: 3,
          label: 3
        },
        {
          value: 4,
          label: 4
        },
        {
          value: 5,
          label: 5
        },
        {
          value: 6,
          label: 6
        },
        {
          value: 7,
          label: 7
        },
        {
          value: 8,
          label: 8
        }
      ], // 结束上课时间数据
      showDialogTableVisible: false,
      warningText: "课程添加成功",
      flagImg: false, // 是否显示左上角的X，默认不显示
      courseId: "", // 要删除的课程的id，多个id用，分割
      myCourses: true // 我的课程过来的，影藏下面添加课程按钮那些，默认不影藏
    };
  },
  methods: {
    resetForm(formName) {
      this.dialogVisible = false;
      this.$refs[formName].resetFields();
      this.deleteDisabled();
    },
    // 监听子组件的事件，完成时，重新获取获取某班级的课程表信息并关闭弹窗
    done() {
      this.showDialogTableVisible = false;
      this.getCourseList();
    },
    goBack() {
      // 返回
      this.$router.go(-1);
    },
    isFlagImg() {
      // 点击删除时做个判断
      if (this.classTableList.length === 0) {
        this.dialog("暂无可删除的课程");
      } else {
        // 有可删除的课程才显示完成按钮
        this.flagImg = true;
      }
    },
    deleteCourse(item) {
      // 前端刪除課程，
      this.classTableList = this.classTableList.filter((v, i) => {
        return v.courseId != item.courseId;
      });
      if (this.courseId === "") {
        this.courseId = item.courseId;
      } else {
        this.courseId += "," + item.courseId;
      }
      // 重新渲染dom结构
      this.renderCourseList();
    },
    deleteDisabled() {
      // 删除disabled属性
      for (let i = 0; i < 8; i++) {
        this.$delete(this.courseEndTime[i], "disabled");
        this.$delete(this.courseStartTime[i], "disabled");
      }
    },
    setDisabled(val1) {
      this.deleteDisabled();
      if (val1 === this.courseStartTime) {
        // 开始上课时间改变
        for (let i = 0; i < this.formLabelAlign.startTime; i++) {
          if (i + 1 === this.formLabelAlign.startTime) {
            return;
          } else {
            this.courseEndTime[i].disabled = true;
          }
        }
      } else if (val1 === this.courseEndTime) {
        // 结束上课时间改变
        for (let i = this.formLabelAlign.endTime; i < 8; i++) {
          this.courseStartTime[i].disabled = true;
        }
      }
    },
    renderCourseList() {
      // 渲染课程表信息
      for (let i = 0; i < this.classTableList.length; i++) {
        let item = this.classTableList[i];
        const ele1 = document.querySelector(`.profess-th__${item.courseDate}`);
        const ele2 = document.querySelector(
          `.profess-tr__${item.courseTime[0] - 1}`
        );
        const position1 = ele1.getBoundingClientRect();
        const position2 = ele2.getBoundingClientRect();
        const range = item.courseTime[1] - item.courseTime[0] + 1;
        let professCont = document.querySelector(`.profess-cont__${i}`);
        professCont.style.left = `${position1.left}px`;
        professCont.style.top = `${ele2.offsetTop}px`;
        professCont.style.width = `${position1.width}px`;
        professCont.style.height = `${range * 82}px`; // 82
        professCont.style.backgroundColor = item.color;
      }
    },
    validate(formName) {
      // 验证
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 验证通过后才添加课程
          this.addCourse();
        } else {
          return false;
        }
      });
    },
    getColor() {
      // 获取每周几的颜色
      let form = this.formLabelAlign;
      let colors = this.colors;
      switch (form.courseDate) {
        case 1:
          form.color = colors[0];
          break;
        case 2:
          form.color = colors[1];
          break;
        case 3:
          form.color = colors[2];
          break;
        case 4:
          form.color = colors[3];
          break;
        case 5:
          form.color = colors[4];
          break;
        case 6:
          form.color = colors[5];
          break;
        case 7:
          form.color = colors[5];
          break;
        default:
          form.color = colors[0];
          break;
      }
    },
    forbidFocus(id) {
      // 取消移动端点击input默认弹出输入法，需传入一个input元素的id
      document.querySelector("#id").focus(function() {
        document.activeElement.blur();
      });
    },
    async getSubjectList() {
      //获取科目列表
      const res = await this.$axios.getSubjectList({ pageNo: 1, pageSize: 0 });
      if (res.code === 1000) {
        this.courseList = res.data;
      } else {
        if (res.code === 1100) {
          // 暂无数据，不弹窗
          return;
        } else {
          this.dialog(res.message);
        }
      }
    },
    async getCourseList() {
      //获取某班级的课程表信息
      let params = {
        classId: this.$route.query.classId, //this.formLabelAlign.classId,
        subjectId: this.$route.query.subjectId
      };
      if (params.classId && params.subjectId) {
        // 如果有课程id和班级id
        const res = await this.$axios.getCourseList(params);
        this.data = res;
      } else if (params.classId) {
        // 有班级id
        const res = await this.$axios.teachClassCouresList(params);
        this.data = res;
      } else {
        const res = await this.$axios.getTeachCourseList();
        this.data = res;
      }
      if (this.data.code === 1000) {
        // 判断类型
        let type = Object.prototype.toString.call(this.data.data).slice(8, -1);
        if (type === "Array") {
          if (this.data.data.length >= 0) {
            this.classTableList = this.data.data;
          }
        } else if (type === "Object") {
          this.classTableList = this.data.data.courseList;
          this.formLabelAlign.teachId = this.data.data.teachId;
        }
        for (var i = 0; i < this.classTableList.length; i++) {
          let item = this.classTableList[i];
          item.courseTime =
            item.courseTime === "" ? [] : item.courseTime.split("-");
          item.courseDate =
            item.courseDate === "" ? 0 : Number(item.courseDate);
        }
        // 拿到dom元素
        this.$nextTick(function() {
          // 渲染dom结构
          this.renderCourseList();
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
    async addCourse(formName) {
      //添加课程表数据
      let _this = this;
      let formLabelAlign = _this.formLabelAlign;
      formLabelAlign.courseTime =
        formLabelAlign.startTime + "-" + formLabelAlign.endTime;
      this.getColor();
      const res = await _this.$axios.addCourse(formLabelAlign);
      if (res.code === 1000) {
        this.showDialogTableVisible = true;
        this.dialogVisible = false;
        this.deleteDisabled();
      } else {
        this.dialog(res.message);
      }
    },
    async getTeachList() {
      // 获取所有老师列表数据
      this.dialogVisible = true;
      this.getSubjectList();
      const res = await this.$axios.getTeachList();
      if (res.code === 1000 && res.data.length > 0) {
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
    async courseDelete() {
      // 删除课程表列表数据
      this.flagImg = false;
      if (this.courseId === "") {
        // 没有点击删除按钮，直接退出函数，不请求后台
        return;
      }
      const res = await this.$axios.courseDelete({ courseIds: this.courseId });
      if (res.code === 1000) {
        this.successMsg("删除课程成功");
        this.getCourseList();
      } else {
        this.dialog(res.message);
      }
    }
  },
  watch: {
   screenWidth (val) {
      if (!this.timer) {
          this.screenWidth = val
          this.timer = true
          let that = this
          setTimeout(function () {
              that.renderCourseList();
              that.timer = false;
          }, 0)
      }
    }
  },
  mounted() {
    let _this = this;
    let queryString = this.$route.query;
    if (queryString.classId && queryString.subjectId) {
      // 有课程id和班级id，说明是从班级课程过来的，禁用科目列表，只能选当前的科目，老师可选
      this.subjectDisabled = true;
      this.myCourses = true;
    } else if (queryString.classId) {
      // 只有课程id,说明是从班级管理过来的，启用科目列表，老师可选
      this.myCourses = true;
    } else {
      // 课程id和班级id都没有，说明是我的课程过来的，启用科目列表，老师不能选
      this.teacherDiabled = true;
      this.myCourses = false;
    }
    _this.getCourseList();
    const that = this
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth
        that.screenWidth = window.screenWidth
      })()
    }
  }
};
</script>
<style lang="stylus">
.table
  .container
    background #deeeff
    height 100%
    position fixed
    left 0
    right 0
    .box
      overflow auto
      height 80%
      position relative
    .profess-cont
      position absolute
      text-align center
      border-radius 20px
      font-size 30px /* px */
      color #fff
      display table
    table
      width 100%
      border-collapse collapse
      margin 0 auto
      text-align center
      td, th
        border 1px solid #cad9ea
        font-size 30px /* px */
        color #3379ae
      th
        height 100px
        line-height 100px
        width 12.8%
        &:nth-child(1)
          width 5%
    .button-submit
      position fixed
      width 100%
      bottom 0
      left 0
      right 0
      text-align center
      // padding: 30px 0;
      height 140px
      line-height 140px
      background #fff
      border-top 1px solid #efefef
      .el-button
        width 48%
        height 80px
        font-size 30px /* px */
    .class-name
      position absolute
      top 0
      left 0
      font-size 30px /* px */
  .el-select
    width 100%
  td
    height 150px
    line-height 150px
  .el-dialog__header
    text-align center
  .el-form-item__label
    font-size 28px !important /* px */
  .utils
    text-align center
    line-height 70px
    font-size 30px /* px */
  .table .el-form-item__label
    font-size 30px !important /* px */
  .el-dialog__footer
    text-align center
  .dialog-footer
    .el-button
      padding 35px 0
      width 40%
      font-size 30px /* px */
      &:last-child
        margin-left 20px
  .el-dialog__title
    font-size 35px /* px */
  .profess-name
    display block
    // word-break: break-all;
    // overflow: hidden;
    // text-overflow: ellipsis;
    // white-space: nowrap;
    font-size 35px /* px */
  .profess-name1
    font-size 30px /* px */
</style>

