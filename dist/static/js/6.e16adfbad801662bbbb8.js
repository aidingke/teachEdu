webpackJsonp([6],{eXpb:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=a("Xxa5"),s=a.n(i),c=a("exGp"),n=a.n(c),r=a("ftST"),o={name:"DataDiagnosis",data:function(){return{isCheck:"",dialogTableVisible:!1,input:"",title:"",userType:"0",courseList:[],FaultsList:[],subjectId:"",item:"",isCheckArr:[],disabled:!0,digObj:{courseId:"",teacherId:"",digId:"",id:""}}},methods:{changePage:function(){if(this.hasQx("stu:dig:add")){this.$router.push({name:"EntryTestData",query:{courseId:this.digObj.courseId,phenomenon:this.isCheckArr.join(","),teacherId:this.digObj.teacherId,subjectId:this.subjectId}})}else this.dialog("您无权进行该操作")},goBack:function(){this.$router.push({name:"Home"})},getDitCheck:function(e){var t=this;return n()(s.a.mark(function a(){var i,c,n,o;return s.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:if(i=Object(r.a)(e.subjectName),c=i.icon.slice(0,i.icon.lastIndexOf("."))+"-check.png",""===t.subjectId?document.querySelector(".active_"+e.index).style.background="url("+c+") no-repeat":t.subjectId!==e.id&&(n=Object(r.a)(t.item.subjectName),document.querySelector(".subjectName_"+t.item.index).style.background="url("+n.icon+") no-repeat",document.querySelector(".subjectName_"+e.index).style.background="url("+c+") no-repeat"),t.subjectId=e.id,t.item=e,!t.hasQx("stu:dig:check")){a.next=12;break}return a.next=8,t.$axios.getDitCheck({subjectId:e.id});case 8:1e3===(o=a.sent).code&&o.data?(t.digObj=o.data,"0"===o.data.flag?t.hasQx("comm:fault:list")?t.getFaultsList(e):t.dialog("您无权进行该操作"):"1"===o.data.flag&&(t.hasQx("stu:dig:detail")?t.$router.push({name:"TestData",query:{digId:o.data.digId}}):t.dialog("您无权进行该操作"))):t.dialog(o.message),a.next=13;break;case 12:t.dialog("您无权进行该操作");case 13:case"end":return a.stop()}},a,t)}))()},getSubjectList:function(){var e=this;return n()(s.a.mark(function t(){var a,i;return s.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$axios.getSubjectList({pageNo:1,pageSize:20});case 2:if(!(1e3===(a=t.sent).code&&a.data.length>0)){t.next=11;break}for(i=0;i<a.data.length;i++)a.data[i].index=i;for(e.data=a.data,i=0;i<a.data.length;i+=3)e.courseList.push(a.data.slice(i,i+3));e,e.$nextTick(function(){for(var e=0,t=a.data.length;e<t;e++){var i=Object(r.a)(a.data[e].subjectName);document.querySelector(".subjectName_"+a.data[e].index).style.background="url("+i.icon+") no-repeat"}}),t.next=16;break;case 11:if(1100!==a.code){t.next=15;break}return t.abrupt("return");case 15:e.dialog(a.message);case 16:case"end":return t.stop()}},t,e)}))()},getFaultsList:function(e){var t=this;return n()(s.a.mark(function a(){var i;return s.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return t.title=e.subjectName,t.dialogTableVisible=!0,t.subjectId=e.id,t.item=e,document.querySelector(".subjectName"),a.next=7,t.$axios.getFaultsList({subjectId:e.id,teacherId:t.digObj.teacherId});case 7:if(!(1e3===(i=a.sent).code&&i.data.length>=0)){a.next=12;break}t.FaultsList=i.data,a.next=17;break;case 12:if(1100!==i.code){a.next=16;break}return a.abrupt("return");case 16:t.dialog(i.message);case 17:case"end":return a.stop()}},a,t)}))()}},mounted:function(){this.getSubjectList()}},u={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"DataDiagnosis"},[a("Header",{attrs:{title:"数据诊断"},on:{goBack:e.goBack}}),a("div",{staticClass:"boxTitle"},[a("span",{staticStyle:{color:"#606266"}},[e._v("选择模块")]),e.hasQx("stu:dig:list")?a("span",{staticStyle:{color:"#138be7"},on:{click:function(t){e.$router.push("DiagnosticList")}}},[e._v("诊断列表")]):e._e()]),a("el-dialog",{attrs:{visible:e.dialogTableVisible,width:"545px","show-close":"0"!=e.userType},on:{"update:visible":function(t){e.dialogTableVisible=t}}},[a("div",{staticClass:"window"},[a("h3",[e._v(" "+e._s(e.title))]),a("div",{staticClass:"item"},[e._v("故障现象")]),a("el-checkbox-group",{model:{value:e.isCheckArr,callback:function(t){e.isCheckArr=t},expression:"isCheckArr"}},e._l(e.FaultsList,function(t,i){return a("el-checkbox",{key:t.id,staticClass:"item",attrs:{label:t.id}},[e._v(e._s(t.faultDesc))])})),a("div",{staticClass:"button-item"},[a("div",[a("el-button",{attrs:{type:"primary"},on:{click:e.changePage}},[e._v("确定  ")]),a("el-button",{attrs:{plain:""},on:{click:function(t){e.dialogTableVisible=!1}}},[e._v("取消")])],1)])],1)]),a("div",{staticClass:"container"},[a("div",{staticClass:"el-row"},e._l(e.courseList,function(t,i){return a("div",{key:i,staticClass:"row"},e._l(t,function(t,i){return a("div",{key:i,staticClass:"row-col",on:{click:function(a){e.getDitCheck(t)}}},[a("div",{staticClass:"col"},[a("a",{class:"subjectName subjectName_"+t.index+" active_"+t.index,attrs:{href:"javascript:void(0)"}}),a("span",[e._v(e._s(t.subjectName))])])])}))}))])],1)},staticRenderFns:[]};var d=a("VU/8")(o,u,!1,function(e){a("mpWK")},null,null);t.default=d.exports},ftST:function(e,t,a){"use strict";t.a=function(e){var t={},a="static/img";switch(e){case"电控":t={icon:a+"/elec-control.png"};break;case"制冷":t={icon:a+"/refrigeration.png"};break;case"流体":t={icon:a+"/fluid.png"};break;case"机械":t={icon:a+"/mechanics.png"};break;case"安检":t={icon:a+"/security-check.png"};break;case"二手车检测":t={icon:a+"/used-car-test.png"};break;case"全车检测":t={icon:a+"/full-vehicle.png"};break;case"综合诊断":t={icon:a+"/compre-diag.png"};break;default:t={icon:a+"/default.png"}}return t}},mpWK:function(e,t){}});