webpackJsonp([58],{ZyCh:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s("Xxa5"),i=s.n(a),n=s("exGp"),c=s.n(n),r={name:"questions",data:function(){return{headTitle:"",status:"",filterInput:"",total:0,tabValue:1,pageNo:1,selectType:0,nameNumber:7,questType:0,checkAll:!1,subCheckList:[],bigCheckList:[],SubjectsList:[],allNum:0,targi:0,BigList:[{bankType:"1",name:"中级"},{bankType:"2",name:"高级"}],resData:[]}},methods:{goBack:function(){this.$router.push({path:"/TrainExamIndex"}),sessionStorage.setItem("tabValueQues","")},showAllSubject:function(){0==this.targi?(this.targi++,event.target.innerHTML="收起更多",this.$refs.showtag.style.height="auto"):(event.target.innerHTML="查看更多...",this.$refs.showtag.style.height="70px",this.targi--)},stuListFun:function(t){this.hasQx("stu:qc:praticeList")?this.$router.push({path:"./ExerciseList?qbId="+t+"&questType="+this.questType}):this.dialog("您无权限查看列表操作")},onsearchHandle:function(){this.pageNo=1,this.searchObj()},updateTabValue:function(t){this.tabValue=t,sessionStorage.setItem("tabValueQues",this.tabValue),this.questType=t-1,this.pageNo=1,this.searchObj()},handleCheckedCitiesChange:function(t){var e=t.length;this.checkAll=e===this.cities.length,this.isIndeterminate=e>0&&e<this.cities.length},handleCheckedSubjectsChange:function(t){var e=t.length;this.checkAll=e===this.cities.length,this.isIndeterminate=e>0&&e<this.cities.length},currentChange:function(t){this.pageNo=t,this.searchObj()},addTestPaper:function(){this.$router.push({path:"./AddTestPaper?questType="+this.questType})},filterBy:function(t,e){return 0===e.length?(this.total=this.allNum,this.resData):(t=t.filter(function(t){if(t.teachName.match(e))return t.teachName.match(e)}),this.total=t.length,t)},searchObj:function(){var t=this;return c()(i.a.mark(function e(){var s,a,n,c;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return s="",a="",t.subCheckList.forEach(function(t,e){s+=t+","}),t.bigCheckList.forEach(function(t,e){a+=t+","}),0==t.questType?(s=s.substring(0,s.length-1),a=""):1==t.questType&&(s="",a=a.substring(0,a.length-1)),n={questType:t.questType,subjectId:s,bankType:a,searchName:t.filterInput,pageNo:t.pageNo,pageSize:12},e.next=7,t.$axios.getTestPaperList(n);case 7:1e3===(c=e.sent).code?(t.resData=c.data.dataList,c.data.total>12?t.total=c.data.total-3:t.total=c.data.total,t.resData.length<=0&&(t.pageNo=1)):1100===c.code&&(t.resData="",t.total=0);case 9:case"end":return e.stop()}},e,t)}))()},getList:function(){var t=this;return c()(i.a.mark(function e(){var s,a;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return s={pageNo:1,pageSize:12,questType:t.tabValue-1},e.next=3,t.$axios.getTestPaperList(s);case 3:if(1e3!==(a=e.sent).code){e.next=8;break}return t.resData=a.data.dataList,t.total=a.data.total,e.abrupt("return",!1);case 8:case"end":return e.stop()}},e,t)}))()},getSubjectList:function(){var t=this;return c()(i.a.mark(function e(){var s,a;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return s={pageNo:1,pageSize:100},e.next=3,t.$axios.getSubjectList(s);case 3:1e3===(a=e.sent).code&&(t.SubjectsList=a.data);case 5:case"end":return e.stop()}},e,t)}))()}},mounted:function(){this.tabValue=Number(sessionStorage.getItem("tabValueQues"))||1,this.questType=this.tabValue-1,0==localStorage.getItem("userType")||4==localStorage.getItem("userType")?(this.status=0,this.headTitle="题库"):(this.headTitle="题库",this.status=1),this.hasQx("comm:questBank:list")||(this.dialog("您无权进行该操作"),this.$router.back(-1)),this.getList(),this.getSubjectList()}},l={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"Questions"},[s("Header",{attrs:{title:t.headTitle},on:{goBack:t.goBack}}),t._v(" "),s("div",{staticClass:"tab-cont"},[s("div",{staticClass:"tab",class:1==t.tabValue?"on":"",on:{click:function(e){t.updateTabValue(1)}}},[t._v("日常练习"),s("i",{staticClass:"line"})]),t._v(" "),s("div",{staticClass:"tab",class:2==t.tabValue?"on":"",on:{click:function(e){t.updateTabValue(2)}}},[t._v("技能考证"),s("i",{staticClass:"line"})])]),t._v(" "),s("div",{staticClass:"group-div"},[s("el-input",{staticClass:"input-with-select",attrs:{placeholder:"老师名称或关键字","prefix-icon":"el-icon-search"},model:{value:t.filterInput,callback:function(e){t.filterInput=e},expression:"filterInput"}},[s("el-button",{attrs:{slot:"append"},on:{click:t.onsearchHandle},slot:"append"},[t._v("搜索")])],1)],1),t._v(" "),1===this.tabValue?s("div",{staticClass:"sort-div"},[s("div",{staticClass:"sort-title",staticStyle:{width:"26%"}},[t._v("科目")]),t._v(" "),s("div",{ref:"showtag",staticStyle:{height:"70px",overflow:"hidden"}},[s("el-checkbox-group",{model:{value:t.subCheckList,callback:function(e){t.subCheckList=e},expression:"subCheckList"}},t._l(t.SubjectsList,function(e,a){return s("el-checkbox",{key:a,attrs:{label:e.id},on:{change:t.searchObj}},[t._v(t._s(e.subjectName))])}))],1)]):t._e(),t._v(" "),2===this.tabValue?s("div",{staticClass:"sort-div"},[s("div",{staticClass:"sort-title"},[t._v("题目类别")]),t._v(" "),s("div",{staticStyle:{width:"81%"}},[s("el-checkbox-group",{model:{value:t.bigCheckList,callback:function(e){t.bigCheckList=e},expression:"bigCheckList"}},t._l(t.BigList,function(e,a){return s("el-checkbox",{key:a,attrs:{label:e.bankType},on:{change:t.searchObj}},[t._v(t._s(e.name))])}))],1)]):t._e(),t._v(" "),s("div",{staticClass:"sortBox"},[1===this.tabValue?s("div",{directives:[{name:"show",rawName:"v-show",value:t.SubjectsList.length>6,expression:"SubjectsList.length>6"}],staticClass:"headBox",staticStyle:{"text-align":"center",margin:"0 auto",overflow:"hidden"},on:{click:t.showAllSubject}},[s("div",{staticStyle:{height:"35px","line-height":"35px",color:"#bbb"}},[t._v("查看更多...")])]):t._e(),t._v(" "),t.resData.length<=0||t.total<=0?s("div",{staticClass:"noInfo"},[t._m(0)]):t._e(),t._v(" "),s("div",{staticClass:"bodyBox"},[s("ul",{staticClass:"el-row"},t._l(t.resData,function(e,a){return s("li",{key:a,staticClass:"el-col el-col-6"},[0===t.status?s("router-link",{attrs:{to:"/TeachPaperDetail?qbId="+e.qbId+"&questType="+t.questType}},[s("div",{staticClass:"kejianBox"},[s("img",{attrs:{src:"static/img/testquestions.png"}})])]):t._e(),t._v(" "),1===t.status?s("a",{on:{click:function(s){t.stuListFun(e.qbId)}}},[t._m(1,!0)]):t._e(),t._v(" "),s("h5",[t._v(" "+t._s(e.courWareName))]),t._v(" "),s("p",[s("i",[t._v(t._s(e.courWareTime))])]),t._v(" "),s("p",[s("span",[t._v(t._s(e.teachName))])])],1)}))]),t._v(" "),t.total>0?s("el-pagination",{staticClass:"page-div",attrs:{"page-size":12,"current-page":t.pageNo,background:"",layout:"prev, pager, next",total:t.total},on:{"current-change":t.currentChange,"update:currentPage":function(e){t.pageNo=e}}}):t._e()],1),t._v(" "),t.hasQx("teach:quest:add")?[0===t.status?s("section",{staticClass:"uploadBtn",on:{click:function(e){t.addTestPaper()}}},[t._m(2)]):t._e()]:t._e()],2)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"default"},[e("img",{attrs:{src:"static/img/not-add-default.png"}}),this._v(" "),e("div",{staticClass:"not-class"},[this._v("\n                        暂无数据\n                    ")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"kejianBox"},[e("img",{attrs:{src:"static/img/testquestions.png"}})])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"prel"},[e("div",{staticClass:"upBox"},[e("p",[this._v("+")]),this._v(" "),e("a",{staticClass:"itemBtn",staticStyle:{display:"inline-block"},attrs:{href:"javascript:"}},[this._v("新增试题")])])])}]};var u=s("VU/8")(r,l,!1,function(t){s("s6KL")},null,null);e.default=u.exports},s6KL:function(t,e){}});