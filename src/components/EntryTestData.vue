<!-- 
* name: 录入检测数据
* author: cgc
* time: 2018-8-7
-->
<template lang="pug">
    .entry
        Header(title="录入检测数据",@goBack="goBack")
        .module(v-for="(items,index) in digList" :key="index")
            .title {{items.sysName}}
            hr
            .items-row(v-for="(item,index) in items.data" :key="index" )
                .flex-auto {{item.itemName}}
                .flex-1(v-if="item.type==0")
                    el-radio-group(v-model="item.dataValue")   
                        el-radio(:label="labelItem.optionName" v-for="(labelItem,index) in item.optionValue" :key="index") {{labelItem.optionName}}
                .flex-1(v-else-if="item.type==1")
                    el-checkbox-group(v-model="item.dataValue")
                        el-checkbox(:label="labelItem.optionName", :key="labelItem.optionName" v-for="(labelItem,index) in item.optionValue") {{labelItem.optionName}}

                    //- el-checkbox(v-for="(labelItem,index) in item.optionValue" :key="index" @change="") {{labelItem.optionName}}
                .flex-1(v-else-if="item.type==3")
                    el-input(v-model="item.dataValue" suffix-icon="item.unit" )
                        template(slot="append") {{item.unit}}
        .module
            .title 自主添加检测项目
            .add(@click="add('testItem')") 添加
            hr
            .items-column(v-for="(items,index) in testData",:key="index")
                el-input(v-model="items.testItem",placeholder="检测项目")
                el-input(v-model="items.dataValue",placeholder="数据")
                .dele(@click="deleSD(testData,index)")
                    img(src="static/img/dele-item.png")
        .module
            .title 诊断结果
            hr
            .items-column
                el-input(type="textarea"
                :rows="5"
                placeholder="请输入诊断结果"
                v-model="form.result")
        .module
            .title 维修方式
            hr
            .card
                .nav
                    .title-left 维修项目
                    .add-right(@click="add('maintainceList')") 添加
                .items-column(v-for="(items,index) in form.maintainceList")
                    el-input(v-model="items.fixItem",placeholder="维修项目")
                    .dele(@click="deleSD(form.maintainceList,index)")
                        img(src="static/img/dele-item.png")
                .nav
                    .title-left 配件耗材
                    .add-right(@click="add('partsList')") 添加
                .nav-text
                    .name 名称
                    .number 数量
                    .company 单位
                .partsList(v-for="(items,index) in form.partsList",:key="index")
                    el-input(v-model="items.partName",placeholder="配件耗材") 名称
                    el-input(v-model="items.partNum") 数量
                    el-input(v-model="items.partUnit") 单位
                    .dele(@click="deleSD(form.partsList,index)")
                        img(src="static/img/dele-item.png")
        .module
            .title.asterisk 诊断思路与总结
            hr
            .items-column
                el-input(type="textarea"
                :rows="5"
                placeholder="诊断思路与总结"
                v-model="form.summary")

        .submit(v-if="hasQx('stu:dig:add')")
            el-button(type="primary",v-model="submit" @click="DitAdd") 提交
</template>
<script>
export default {
  name: "EntryTestData",
  data() {
    return {
      form: {
        // 提交的数据
        courseId: "", // 课程ID
        teacherId: "", // 老师ID
        phenomenon: "", // 故障现象ID
        usedTime: "", // 开始答题时间 格式 : yyyy-MM-dd HH:mm:ss
        testItem: [],
        summary: "", // 诊断思路与总结
        maintainceList: [
          // {
          //     orderNum:       "0",
          //     fixItem:        "" // 维修项目
          // },
          // {
          //     orderNum:       "0",
          //     fixItem:        "" // 维修项目
          // },
          // {
          //     orderNum:       "0",
          //     fixItem:        "" // 维修项目
          // }
        ], // 维修方式
        partsList: [
          // {
          //     orderNum:       "0",
          //     partName:       "",  // 配件名称
          //     partNum:        "",  // 配件数量
          //     partUnit:       ""   // 配件单位
          // },
          // {
          //     orderNum:       "0",
          //     partName:       "",  // 配件名称
          //     partNum:        "",  // 配件数量
          //     partUnit:       ""   // 配件单位
          // },
          // {
          //     orderNum:       "0",
          //     partName:       "",  // 配件名称
          //     partNum:        "",  // 配件数量
          //     partUnit:       ""   // 配件单位
          // }
        ], // 配件列表
        result: "" //诊断结果
      },
      submit: "",
      digList: [], // 数据诊断默认显示数据
      testData: [
          // 自主添加检测项目
          // {
          //     orderNum:       "0",   //检测项目
          //     sysName:          '自主添加检测项目' ,   //数据
          //     testItem:       "",  // 检测项目 项目名称
          //     dataValue:      ""   // 检测项目 数据
          // }
        ],
    };
  },
  methods: {
    add(strArr) {
      // 传个字符串数组名称，为数组添加元素
      if (strArr === "testItem") {
        // 自主添加检测项目
        this.testData.push({
          orderNum: "0", //检测项目
          sysName: "自主添加检测项目", //数据
          testItem: "", // 检测项目 项目名称
          dataValue: "" // 检测项目 数据
        });
      } else if (strArr === "maintainceList") {
        // 维修方式
        this.form.maintainceList.push({
          orderNum: "0",
          fixItem: "" // 维修项目
        });
      } else if (strArr === "partsList") {
        this.form.partsList.push({
          orderNum: "0",
          partName: "", // 配件名称
          partNum: "", // 配件数量
          partUnit: "" // 配件单位
        });
      }
    },
    deleSD(arr, index) {
      // 要删除哪个数组中的哪个元素
      arr.splice(index, 1);
    },
    changeCheckox(val) {
      this.val = val;
    },
    goBack() {
      // 返回
      this.$router.back(-1);
    },
    async DitAdd() {
      // 录入数据检测
      let _this = this;
      this.digList.forEach(item => {
        item.data.forEach(v => {
          let value = "";
          if (Array.isArray(v.dataValue)) {
            // 多选checkbox
            value = v.dataValue.length === 0 ? "正常" : v.dataValue.join(",");
          } else {
            // radio单选  // 填空input
            value = v.dataValue;
          }
          if (v.unit) {
            value += v.unit;
          }
          _this.form.testItem.push({
            orderNum: "0", //检测项目
            sysName: v.sysName, //数据
            testItem: v.itemName, // 检测项目 项目名称
            dataValue: value // 检测项目 数据
          });
        });
      });
      this.form.testItem = this.form.testItem.concat(this.testData);  
      this.form.teacherId = this.$route.query.teacherId;
      this.form.courseId = this.$route.query.courseId;
      this.form.phenomenon = this.$route.query.phenomenon;
      this.form.usedTime = String(
        Math.round((new Date().getTime() - this.startTime) / 1000)
      );
      let params = this.form;
      if (this.form.summary === "") {
        this.dialog("诊断思路与总结不能为空");
        return false;
      }
      const res = await this.$axios.DitAdd(params);
      if (res.code === 1000) {
        this.$router.push("DataDiagnosis"); // 添加数据成功后跳转到数据诊断首页
        this.successMsg("操作成功");
      } else {
        this.dialog(res.message);
      }
    },
    async getDitItemList() {
      // 录入数据检测--默认数据渲染
      let subjectId = this.$route.query.subjectId;
      let params = { subjectId: subjectId ,faultId: this.$route.query.phenomenon };
      this.startTime = new Date().getTime();
      if (!subjectId) {
        return;
      }
      if(this.hasQx('stu:dig:itemList')){
        const res = await this.$axios.getDitItemList(params);
        if (res.code === 1000 && res.data) {
          let map = {};
          let itemList = res.data.itemList;
          let optionData = res.data.optionData;
          // 先根据相同的itemId找到对应的每一项的值
          for (var i = 0, len = itemList.length; i < len; i++) {
            itemList[i].optionValue = [];
            if (itemList[i].type == 0 || itemList[i].type == 3) {
              // radio单选  // 填空input
              itemList[i].dataValue = "";
            } else if (itemList[i].type == 1) {
              // 多选checkbox
              itemList[i].dataValue = [];
            }
            for (var j = 0; j < optionData.length; j++) {
              if (itemList[i].itemId === optionData[j].itemId) {
                itemList[i].optionValue.push({
                  optionName: optionData[j].optionName
                });
              }
            }
          }
          // 将sysName提取出来，找到相同的sysName放在同一个数组
          for (let i = 0, len = itemList.length; i < len; i++) {
            let ai = itemList[i];
            if (!map[ai.sysName]) {
              this.digList.push({
                sysName: ai.sysName,
                data: [ai]
              });
              map[ai.sysName] = ai;
            } else {
              for (let j = 0; j < this.digList.length; j++) {
                let dj = this.digList[j];
                if (dj.sysName == ai.sysName) {
                  dj.data.push(ai);
                  break;
                }
              }
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
      }else{
        this.dialog('您无权进行该操作');
      }
    }
  },
  mounted() {
    this.getDitItemList();
  },
  computed: {
    digListCopy() {
      return this.digList;
    }
  }
};
</script>
<style lang="stylus">
.entry
    background #efefef
    height 100%
    .el-input-group__append
        background-color #fff !important
        padding 0 20px !important
    .el-input .el-input__inner
        border-right none !important
        outline none
        &:focus
            outline 0
    .el-checkbox
        margin-right 0.3rem
    .asterisk:before
        content '*'
        color #f56c6c
        margin-right 0.04rem
    .module
        background #fff
        line-height 100px
        margin-bottom 20px
        .dele
            display inline-block
            width 4%
            text-align center
            height 73px
            line-height 73px
            border-top 1px solid #dcdfe6
            border-left 1px solid #dcdfe6
            border-bottom 1px solid #dcdfe6
            border-right 1px solid #dcdfe6
            box-sizing border-box
            img
                max-width 100%
                vertical-align middle
        .title
            height 100px
            line-height 100px
            font-size 0.35rem
            color #999
            font-weight bold
            padding 0 60px 0 60px
            display inline-block
        hr
            margin 0
            border none
            height 2px
            background #efefef
        .add
            float right
            font-size 30px
            margin-right 30px
            color #138BE7
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
                color #eee
                position relative
                .el-input
                    width 400px
        .items-column
            padding 0 60px 0 60px
            background #fff
            margin 20px 0
            .el-input
                display inline-block
                width 48%
                .el-input__inner
                    height 73px
                    line-height 73px
                    &:nth-child(1)
                        border-radius inherit
            .el-textarea
                margin 20px 0 30px 0
                textarea
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
                .add-right
                    float right
                    font-size 30px
                    margin-right 30px
                    color #138BE7
            .items-column
                .el-input
                    width 96%
                    .el-input__inner
                        font-size 30px
                        height 73px
                        line-height 73px
                        &:nth-child(1)
                            border-right none
                .dele
                    width 4%
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
            .partsList
                padding 0 60px 0 60px
                margin 20px 0
                .el-input
                    &:nth-child(1)
                        width 36%
                    &:nth-child(2)
                        width 30%
                    &:nth-child(3)
                        width 30%
                .dele
                    width 4%
    .submit
        text-align center
        padding 20px 0
        background #fff
        .el-button
            width 90%
            font-size 30px
</style>
