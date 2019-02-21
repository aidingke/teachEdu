<!-- 
* name: 班级课程表 | 数据诊断
* author: cgc
* time: 2018-8-2
-->
<template lang="pug">
    .ClassTableData
        Header(title="选择课程",@goBack="goBack")
        el-dialog(:visible.sync="dialogTableVisible",width="70%",:show-close="userType=='0'?false:true") <!--教师版的时候右上角的X去掉-->
            .window
                h3  {{title}}
                .title
                    span 故障现象
                    el-button.add(type="text", @click="addFaults('Faults')" v-if="showAdd") 添加
                // 自己的
                .group-item(v-for="(item,index) in addFaultsList",:key="index")
                    .item-input(v-for="(item_list,item_index) in item.faultDescList",:key="item_index")
                        el-input(placeholder="请输入故障现象", v-model="item_list.faultDesc", maxlength="20") 
                        span {{item_list.faultDesc.length}}/20
                        .dele(@click="delFaults('Faults',index)")
                            img(src="static/img/dele-item.png")
                        .tips(v-show="flag") 故障现象不能为空
                    .title
                        span 指定检测项目
                        el-button.add(type="text", @click="addFaults('TestItem',index)" v-if="showAdd") 添加
                    .item-input(v-for="(itemName,itemName_index) in item.itemName",:key="`TestItem_${itemName_index}`") 
                        el-input(placeholder="请输入检测项目", v-model="itemName.itemName") 
                        .dele(@click="delFaults('TestItem',index,itemName_index)")
                            img(src="static/img/dele-item.png")
                // 后台的
                .group-item(v-for="(list,index) in FaultsList",:key="index")
                    .item {{list.faultDesc}}
                          span.imgItem(v-show="list.type==='1'" @click="delFaults('FaultsList',index)") X
                    .title
                        span 指定检测项目
                        el-button.add(type="text", @click="addFaults('TestItemSelf',index)" v-if="showAdd") 添加
                    .item(v-for="(item,k) in list.itemList",:key="`faults_${k}`" v-if="k<=arr[index]-1")  {{item.itemName}} 
                        span.imgItem( @click="delFaults('TestItemSelf',k)") X
                    .item-input(v-for="(item,i) in list.itemList",:key="`FaultsListSelf_${i}`" v-if="i>arr[index]-1") 
                        el-input(placeholder="请输入内容", v-model="item.itemName") 
                        .dele(@click="delFaults('TestItemSelf',index,i)")
                            img(src="static/img/dele-item.png")
                .button-item
                    div
                        el-button(type="primary",@click="getFaultsAdd") 确定
                        |
                        el-button(plain="",@click="dialogTableVisible = false,addFaultsList = []") 取消
        .container(ref="wrapper")
            .el-row
                //第一行
                .row(v-for="(items,index) in courseList",:key="index")
                    .row-col(v-for="(item,index) in items",:key="index" @click="getFaultsList(item)")
                        .col
                            a(href="javascript:void(0)", :class="`subjectName subjectName_${item.index} active_${item.index}`") 
                            span {{item.subjectName}}
            
</template>
<script>
// import BScroll from 'better-scroll'
import getIcon from "../util/getIcon.js"
export default {
  name: "ClassTableData",
  data() {
    return {
      isCheck: "",
      dialogTableVisible: false,
      input: "",
      title: "",
      userType: "0",
      flag: false, // 用于显示隐藏故障现象
      courseList: [],
      faultDescList: [],
      FaultsList: [], // 后台=返回的渲染的数据
      FaultsListSelf: [], // 点击新增故障时渲染的数据
      arr: [],
      addFaultsList: [
        // { subjectId: this.subjectId, faultDesc: "" ,itemName: []}
      ], // 新增故障现象
      itemName: [], // 指定检测项目
      subjectId: "", // 當前點擊的科目id
      item: "", // 当前点击的元素，方便换图片
      userType: localStorage.getItem('userType'),
      showAdd: true // 是否显示添加按钮，默认为是，可以添加故障现象
    };
  },
  methods: {
    addFaults(item,index) {
      if(item==='Faults'){
        // 添加故障信息
        // faultDescList  故障现象列表        itemName   检测项目 
        this.addFaultsList.push({ faultDescList: [{subjectId: '', faultDesc: ""}] , itemName: [{itemName:''}]});
      }else if(item==='TestItem'){
        // 指定检测项目添加
        this.addFaultsList[index].itemName.push({itemName:''});
      }else if(item==='TestItemSelf'){
        this.FaultsList[index].itemList.push({itemName:''})
      }
    },
    delFaults(item,index,item_index) {
      if(item==='Faults'){
        // 刪除故障添加
        this.addFaultsList.splice(index, 1);
      }else if(item==='TestItem'){
        // 刪除指定检测项目
        this.addFaultsList[index].itemName.splice(item_index, 1);
      }else if(item==='TestItemSelf'){
        this.FaultsList[index].itemList.splice(item_index, 1);
      }else if(item==='FaultsList'){
        // 删除后台返回的新增故障现象
        this.FaultsList.splice(index,1)
      }
    },
    goBack() {
      // 返回
      this.$router.push({
        path: "Home"
      });
    },
    changePage(){
      if(this.hasQx('comm:class:list')){
        this.$router.push({
          name: "SelectClass",
          query: { subjectId: this.subjectId }
        });
      }
    },
    async getSubjectList() {
      //获取课程表数据
      const res = await this.$axios.getSubjectList({ pageNo: 1, pageSize: 20 });
      if (res.code === 1000 && res.data.length > 0) {
        for (var i = 0; i < res.data.length; i++) {
          res.data[i].index = i;
        }
        for (var i = 0; i < res.data.length; i += 3) {
          // 增加一个图片的标识
          this.courseList.push(res.data.slice(i, i + 3));
        }
        let _this = this;
        this.$nextTick(function() {
          for (var i = 0, len = res.data.length; i < len; i++) {
            // 调用getIcon方法获取对应的图片，设置默认显示背景
            let imgIconObj = getIcon(res.data[i].subjectName);
            document.querySelector(
              `.subjectName_${res.data[i].index}`
            ).style.background = `url(${imgIconObj.icon}) no-repeat`;
            // this.scroll = new BScroll(this.$refs.wrapper, { click: true });
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
      this.FaultsList = [];
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
      let imgIconObj = getIcon(item.subjectName);
      // let arr = document.querySelector(`.subjectName`);
      const res = await this.$axios.getFaultsList({ subjectId: item.id });
      if (res.code === 1000 && res.data.length >= 0) {
        this.FaultsList = res.data;
        this.arr = [];
        this.FaultsList.forEach((item,index)=>{
          this.arr.push(item.itemList.length)
        })
      } else {
        if (res.code === 1100) {
          // 暂无数据，不弹窗
          return;
        } else {
          this.dialog(res.message);
        }
      }
    },
    async getFaultsAdd(index) {
      // 科目下新增故障现象
      let obj = {};
      obj.faultDescList = [];
      let itemList = [];
      this.FaultsList.forEach(element => {
        let str = '';
        itemList.push(element.itemList.length)
        element.itemList.forEach(item => {
          if(str===''){
            str += item.itemName;
          }else{
            str += ',' + item.itemName;
          }
        })
        obj.faultDescList.push({
          faultDesc: element.faultDesc,
          itemName: str,
          faultId: element.id || '',
          type: element.type || '1'
        })
      })
      let flagArr = new Set([...this.arr,flagArr])
      let flag = false
      // if (this.addFaultsList.length > 0) {
        this.addFaultsList.forEach(element => {
          let itemName = '';
          element.itemName.forEach(item => {
            if(itemName===''){
              itemName += item.itemName;
            }else{
              itemName += ',' + item.itemName;
            }
          })
          if(element.faultDescList[0].faultDesc===""){
            flag = true
          }
          obj.faultDescList.push({
            faultDesc: element.faultDescList[0].faultDesc,
            itemName: itemName,
            faultId: element.id || "",
            type: element.type || '1'
          })
        });
        // console.log(obj)
        if(flag){
          this.dialog('故障现象不能为空')
          return ;
        }
        obj.subjectId = this.subjectId;
        const res = await this.$axios.getFaultsAdd(obj);
        if (res.code === 1000) {
          this.successMsg("请选择上课班级");
        } else {
          this.dialog(res.message);
        }
      // }
      this.changePage();
    }
  },
  mounted() {
    this.getSubjectList();
  },
  created(){
    if(this.userType==='0'){ // 老师，才有添加按钮，学生，没有
      if(this.hasQx('teach:fault:add')){ // 有新增权限
        this.showAdd = true;
      }else{ // 无权限
        this.showAdd = false;
      }
    }else{
      this.showAdd = false;
    }
  }
}
</script>
<style lang="stylus">
.ClassTableData
    .header 
        position: fixed;
        top: 0;
        left: 0;
        z-index: 1;
    .tips
        position absolute
        top 110px
        left 0
        color red
    .container
        // display flex
        flex-direction column
        padding 60px
        background #efefef
        height 100%
        position fixed
        left 0
        right 0
        top: 0.88rem;
        overflow-x:scroll;
        overflow-y:auto;
        -webkit-overflow-scrolling: touch; //允许独立的滚动区域和触摸回弹
        .el-row
            margin-bottom 200px
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
                    word-break: break-all;
    .window
        h3
            font-size 40px
            color #000
            text-align center
        .group-item
            border: 1px solid #C0C4CC; /*no*/
            border-radius: 5px; /*no*/
            margin-bottom 40px
        .title 
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 35px; /*px*/
            margin: 0 30px;
        .add
            font-size 35px; /*px*/
            color #138be7
            padding-right 30px
        .item
            position relative
            overflow hidden
            font-size 35px; /*px*/
            font-weight bold
            margin 50px 30px
            .imgItem
                position absolute
                right 0
                top 0
        .button-item
            // margin-top 30px
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
                padding 31px 20px; 
                border-top 1px solid #dcdfe6
                border-bottom 1px solid #dcdfe6
                border-right 1px solid #dcdfe6
                img
                    vertical-align middle
    .el-dialog__header
        padding 0
</style>
