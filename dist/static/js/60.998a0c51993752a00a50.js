webpackJsonp([60],{"+tUx":function(t,e){},A0b0:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("woOf"),o=a.n(i),s=a("Xxa5"),r=a.n(s),n=a("exGp"),l=a.n(n),c={name:"GroupList",data:function(){return{roles:"",matchStatus:0,matchId:"",delGroupId:"",editStatusTxt:"新 增",qbId:"",renderList:[],form:{startTime:"",endTime:"",matchName:"",theoryFlag:0,matchId:""},editGroupForm:{groupName:"",matchId:""},dialogVisible:{addGroupDialog:!1,editDialog:!1,addTestDialog:!1,deleteGroupDialog:!1},rules:{addGroupRules:!1},pickerOptions:{disabledDate:function(t){return t.getTime()<Date.now()-864e5}}}},methods:{goBack:function(){this.$router.push({path:"./MatchManage"})},onAddGroupPop:function(){this.dialogVisible.addGroupDialog=!0,this.editGroupForm={groupName:"",matchId:""},this.editStatusTxt="新 增"},onEditGroup:function(t){this.dialogVisible.addGroupDialog=!0,this.editGroupForm.groupName=t.groupName,this.editGroupForm.groupId=t.groupId,this.editStatusTxt="编 辑"},onDeleteGroup:function(t){this.dialogVisible.deleteGroupDialog=!0,this.delGroupId=t},onCancelDel:function(){this.dialogVisible.deleteGroupDialog=!1,this.delGroupId=""},onEditMathDetails:function(){this.getMathDetails(),this.dialogVisible.editDialog=!0},onViewResult:function(t){this.$router.push({path:"./AssessmentGame?groupId="+t+"&matchId="+this.matchId+"&theoryFlag="+this.form.theoryFlag})},onViewGroupMembers:function(t){this.$router.push({path:"./GroupMembers?groupId="+t+"&matchStatus="+this.matchStatus+"&matchId="+this.matchId})},onAddTestDialog:function(){if(1!=this.form.theoryFlag)return this.dialog("该比赛没有理论"),!1;this.$router.push({path:"./AddTestPaper?questType=4&matchId="+this.matchId})},onChangeTime:function(){this.form.startTime&&this.form.endTime&&Date.parse(this.form.startTime)>Date.parse(this.form.endTime)&&(this.dialog("结束时间不能小于开始时间"),this.form.startTime="")},onViewsTestDialog:function(){this.$router.push({path:"./TeachPaperDetail?qbId="+this.qbId+"&questType=4"})},getMatchGroupList:function(){var t=this;return l()(r.a.mark(function e(){var a,i;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if((a={}).matchId=t.matchId,i="",1!=t.roles){e.next=10;break}return e.next=6,t.$axios.getMatchGroupList(a);case 6:i=e.sent,t.qbId=i.data.qbId,e.next=13;break;case 10:return e.next=12,t.$axios.getStuMatchGroupList(a);case 12:i=e.sent;case 13:t.renderList=i.data.groupList||[],t.matchStatus=i.data.matchStatus;case 15:case"end":return e.stop()}},e,t)}))()},onDeterMine:function(){var t=this;return l()(r.a.mark(function e(){var a,i,o;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return(a={}).groupId=t.delGroupId,e.next=4,t.$axios.delGroup(a);case 4:1e3===(i=e.sent).code?(o=t,t.renderList=t.renderList.filter(function(t){return t.groupId!=o.delGroupId}),t.dialogVisible.deleteGroupDialog=!1,t.delGroupId=""):t.dialog(i.message);case 6:case"end":return e.stop()}},e,t)}))()},onAddGroup:function(){var t=this;return l()(r.a.mark(function e(){var a,i;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(""==t.editGroupForm.groupName){e.next=9;break}return(a=o()({},t.editGroupForm)).matchId=t.matchId,e.next=5,t.$axios.editMatchGroup(a);case 5:1e3===(i=e.sent).code?(t.dialogVisible.addGroupDialog=!1,t.getMatchGroupList(),delete t.editGroupForm.groupId):t.dialog(i.message),e.next=11;break;case 9:return t.rules.addGroupRules=!0,e.abrupt("return",!1);case 11:case"end":return e.stop()}},e,t)}))()},getMathDetails:function(){var t=this;return l()(r.a.mark(function e(){var a,i;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return(a={}).matchId=t.matchId,e.next=4,t.$axios.getMatchDetail(a);case 4:1e3==(i=e.sent).code&&(t.form.matchName=i.data.matchName,t.form.startTime=i.data.startTime,t.form.endTime=i.data.endTime,t.form.theoryFlag=i.data.theoryFlag,t.form.matchId=i.data.matchId);case 6:case"end":return e.stop()}},e,t)}))()},onSaveMatchManage:function(){var t=this;return l()(r.a.mark(function e(){var a,i;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(""!=t.form.startTime){e.next=3;break}return t.dialog("开始时间不能为空"),e.abrupt("return",!1);case 3:if(""!=t.form.endTime){e.next=6;break}return t.dialog("结束时间不能为空"),e.abrupt("return",!1);case 6:if(""!=t.form.matchName){e.next=9;break}return t.dialog("比赛主题不能为空"),e.abrupt("return",!1);case 9:if(!(Date.parse(t.form.startTime)<Date.now())){e.next=12;break}return t.dialog("比赛开始时间不能小于当前时间"),e.abrupt("return",!1);case 12:return(a=o()({},t.form)).startTime=t.dayjs(a.startTime).format("YYYY-MM-DD HH:mm:ss"),a.endTime=t.dayjs(a.endTime).format("YYYY-MM-DD HH:mm:ss"),e.next=17,t.$axios.editTeachMath(a);case 17:1e3==(i=e.sent).code?t.dialogVisible.editDialog=!1:t.dialog(i.message);case 19:case"end":return e.stop()}},e,t)}))()}},mounted:function(){this.matchId=this.$route.query.matchId,this.hasQx("teach:match:groupList")?(this.roles=1,this.getMathDetails()):this.roles=2,this.getMatchGroupList()}},d={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"groupList"},[a("Header",{attrs:{title:"比赛组"},on:{goBack:t.goBack}}),a("div",{staticClass:"container"},[t.renderList.length>0?a("el-row",{staticClass:"scroll-div"},[t._l(t.renderList,function(e,i){return a("el-col",{key:i,attrs:{span:12}},[a("div",{staticClass:"item groupItem"},[0==t.matchStatus&&t.hasQx("teach:match:editGroup")?a("div",{staticClass:"handle-icon edit-icon el-icon-edit-outline",on:{click:function(a){t.onEditGroup(e)}}}):t._e(),0==t.matchStatus&&t.hasQx("teach:match:delGroup")?a("div",{staticClass:"handle-icon delete-icon el-icon-delete",on:{click:function(a){t.onDeleteGroup(e.groupId)}}}):t._e(),a("h3",[t._v(t._s(e.groupName))]),a("div",{staticClass:"left-top"},[t._v(t._s(i+1)+"组")]),a("div",{staticClass:"button-item"},[a("div",[t.hasQx("teach:match:groupStuList")||t.hasQx("stu:match:groupStuList")?a("el-button",{attrs:{plain:"plain"},on:{click:function(a){t.onViewGroupMembers(e.groupId)}}},[t._v("成员("+t._s(e.stuNum)+")")]):t._e(),2==t.matchStatus&&t.hasQx("teach:match:resultList")?a("el-button",{attrs:{plain:"plain"},on:{click:function(a){t.onViewResult(e.groupId)}}},[t._v("考核结果")]):t._e()],1)])])])}),0==t.matchStatus&&t.hasQx("teach:match:editGroup")?a("el-col",{attrs:{span:12}},[a("div",{staticClass:"item",on:{click:t.onAddGroupPop}},[a("div",{staticClass:"add"},[a("img",{attrs:{src:"static/img/add.png"}})]),a("div",{staticClass:"text"},[t._v("添加组     ")])])]):t._e()],2):t._e(),0===t.renderList.length?a("NotInfo",{attrs:{notClass:"暂无相关比赛组信息",defaultImg:"static/img/not-class-default.png",elButton:0==t.matchStatus&&t.hasQx("teach:match:editGroup")?"添加比赛组":""},on:{start:function(e){t.dialogVisible.addGroupDialog=!0}}}):t._e()],1),0==t.matchStatus&&1==t.roles?a("div",{staticClass:"edit"},[t.hasQx("teach:match:edit")?a("div",{staticClass:"addMatch-cont",on:{click:t.onEditMathDetails}},[t._m(0)]):t._e(),!t.qbId&&t.hasQx("teach:quest:add")?a("div",{staticClass:"addMatch-cont",on:{click:t.onAddTestDialog}},[t._m(1)]):t._e(),t.qbId&&t.hasQx("teach:quest:add")?a("div",{staticClass:"addMatch-cont",on:{click:t.onViewsTestDialog}},[t._m(2)]):t._e()]):t._e(),0==t.matchStatus&&1==t.roles?a("div",{staticClass:"pop"},[a("el-dialog",{staticClass:"dialogBox",attrs:{title:"添加组",visible:t.dialogVisible.addGroupDialog,width:"50%",center:""},on:{"update:visible":function(e){t.$set(t.dialogVisible,"addGroupDialog",e)}}},[a("el-form",{ref:"editGroupForm",attrs:{"label-position":"top",model:t.editGroupForm,"label-width":"80px"}},[a("el-form-item",{attrs:{label:"比赛组名称"}},[a("el-input",{on:{focus:function(e){t.rules.addGroupRules=!1}},model:{value:t.editGroupForm.groupName,callback:function(e){t.$set(t.editGroupForm,"groupName",e)},expression:"editGroupForm.groupName"}}),t.rules.addGroupRules?a("div",{staticClass:"error"},[t._v("比赛组名称不能为空")]):t._e()],1)],1),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{type:"primary"},on:{click:t.onAddGroup}},[t._v(t._s(t.editStatusTxt))]),t._v(" "),a("el-button",{on:{click:function(e){t.dialogVisible.addGroupDialog=!1}}},[t._v("取 消")])],1)],1),t._v(" "),a("el-dialog",{staticClass:"dialogBox",attrs:{title:"编辑比赛",visible:t.dialogVisible.editDialog,width:"50%",center:""},on:{"update:visible":function(e){t.$set(t.dialogVisible,"editDialog",e)}}},[a("el-form",{ref:"form",attrs:{"label-position":"top",model:t.form,"label-width":"80px"}},[a("el-form-item",{attrs:{label:"比赛时间"}},[a("el-col",{attrs:{span:11}},[a("el-date-picker",{attrs:{type:"datetime",format:"yyyy-MM-dd HH:mm:ss",placeholder:"开始时间","picker-options":t.pickerOptions},on:{change:t.onChangeTime},model:{value:t.form.startTime,callback:function(e){t.$set(t.form,"startTime",e)},expression:"form.startTime"}})],1),t._v(" "),a("el-col",{staticClass:"line",attrs:{span:2}},[t._v("至")]),t._v(" "),a("el-col",{attrs:{span:11}},[a("el-date-picker",{attrs:{type:"datetime",format:"yyyy-MM-dd HH:mm:ss",placeholder:"结束时间","picker-options":t.pickerOptions},on:{change:t.onChangeTime},model:{value:t.form.endTime,callback:function(e){t.$set(t.form,"endTime",e)},expression:"form.endTime"}})],1)],1),t._v(" "),a("el-form-item",{attrs:{label:"主题"}},[a("el-input",{model:{value:t.form.matchName,callback:function(e){t.$set(t.form,"matchName",e)},expression:"form.matchName"}})],1),t._v(" "),a("el-form-item",{staticClass:"theory-item",attrs:{label:"理论考试"}},[a("el-checkbox",{attrs:{label:"有","true-label":"1","false-label":"0"},model:{value:t.form.theoryFlag,callback:function(e){t.$set(t.form,"theoryFlag",e)},expression:"form.theoryFlag"}})],1)],1),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{type:"primary"},on:{click:t.onSaveMatchManage}},[t._v("编 辑")]),t._v(" "),a("el-button",{on:{click:function(e){t.dialogVisible.editDialog=!1}}},[t._v("取 消")])],1)],1),a("ConfirmDialog",{attrs:{dialogTableVisible:t.dialogVisible.deleteGroupDialog,confirmTitile:"提示",confirmText:"确定删除该组名？删除后数据将不可恢复",confirmTextButton:"删除",closeTextButton:"取消"},on:{determine:t.onDeterMine,closeConfirm:t.onCancelDel}})],1):t._e()],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"add-btn"},[e("span",{staticClass:"el-icon-plus el-icon-edit-outline"}),e("span",[this._v("编辑信息")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"add-btn"},[e("span",{staticClass:"el-icon-plus avatar-uploader-icon"}),e("span",[this._v("新增试题")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"add-btn"},[e("span",[this._v("查看试题")])])}]};var u=a("VU/8")(c,d,!1,function(t){a("+tUx")},null,null);e.default=u.exports}});