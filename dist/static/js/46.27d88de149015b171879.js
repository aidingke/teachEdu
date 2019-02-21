webpackJsonp([46],{mUGs:function(t,s){},zTs5:function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var a=e("Xxa5"),i=e.n(a),n=e("exGp"),r=e.n(n),c=e("0Mti"),o={name:"StuResume",components:{SuccessTip:e("0b0c").default},data:function(){return{studentInfo:"",img_api:c.a.img_api,provinceName:"",cityName:"",areaName:"",areaList:{province:[],city:[],area:[]},successTip:{tip:"投递成功静候佳音",moretip:"您可以继续完善相关信息或继续投递简历",hint:"我的简历",showDialogTableVisible:!1,width:"6.6rem"}}},filters:{genderFilter:function(t){return"m"==t?"男":"女"},majorFilter:function(t){if(t)return t+"专业"},graduationFilter:function(t){if(t)return t+"毕业"},salaryFlag:function(t){if("1"==t)return"面议"},salaryRequire:function(t){if(t){var s=t.split(","),e=s[0],a=s[1];return e&&a?e+"-"+a:""+e+a}},jobFilter:function(t){return"1"==t?"一周内到岗":"2"==t?"一个月到岗":"3"==t?"随时到岗":"4"==t?"另议":void 0}},methods:{goBack:function(){this.$router.push({path:"PerCenter"})},getResume:function(){var t=this;return r()(i.a.mark(function s(){var e,a;return i.a.wrap(function(s){for(;;)switch(s.prev=s.next){case 0:return s.next=2,t.$axios.getResume();case 2:if(1e3!==(e=s.sent).code){s.next=14;break}if(t.studentInfo=e.data,!(a=JSON.parse(localStorage.getItem("pcaName")))){s.next=13;break}return t.provinceName=a.provinceName,t.cityName=a.cityName,t.areaName=a.areaName,s.abrupt("return");case 13:t.turnAreaName();case 14:case"end":return s.stop()}},s,t)}))()},getJob:function(){var t=this;return r()(i.a.mark(function s(){var e;return i.a.wrap(function(s){for(;;)switch(s.prev=s.next){case 0:if(t.hasQx("stu:resume:getJob")){s.next=3;break}return t.dialog("您无权进行该操作"),s.abrupt("return",!1);case 3:return s.next=5,t.$axios.getJob();case 5:1e3===(e=s.sent).code?t.successTip.showDialogTableVisible=!0:t.dialog(e.message);case 7:case"end":return s.stop()}},s,t)}))()},createResume:function(){if(!this.hasQx("stu:resume:addOrEdit"))return this.dialog("您无权进行该操作"),!1;this.$router.push({path:"/ResumeEditor"})},turnAreaName:function(){var t=this;return r()(i.a.mark(function s(){var e,a,n,r;return i.a.wrap(function(s){for(;;)switch(s.prev=s.next){case 0:return s.next=2,t.$axios.getAreaList();case 2:if(2e4===(e=s.sent).code&&(t.areaList.province=e.data.province),t.studentInfo.stdProvince&&(a=t.getRegionName(t.studentInfo.stdProvince,t.areaList.province))&&(t.provinceName=a),!t.studentInfo.stdProvince){s.next=10;break}return s.next=8,t.getAreaListCity(t.studentInfo.stdProvince);case 8:(n=t.getRegionName(t.studentInfo.stdCity,t.areaList.city))&&(t.cityName=n);case 10:if(!t.studentInfo.stdCity){s.next=15;break}return s.next=13,t.getAreaListArea(t.studentInfo.stdCity);case 13:(r=t.getRegionName(t.studentInfo.stdArea,t.areaList.area))&&(t.areaName=r);case 15:case"end":return s.stop()}},s,t)}))()},getAreaListCity:function(t){var s=this;return r()(i.a.mark(function e(){var a,n;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a={id:t},e.next=3,s.$axios.getAreaList(a);case 3:2e4===(n=e.sent).code&&(s.areaList.city=n.data.city);case 5:case"end":return e.stop()}},e,s)}))()},getAreaListArea:function(t){var s=this;return r()(i.a.mark(function e(){var a,n;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a={id:t},e.next=3,s.$axios.getAreaList(a);case 3:2e4===(n=e.sent).code&&(s.areaList.area=n.data.area);case 5:case"end":return e.stop()}},e,s)}))()},getRegionName:function(t,s){var e=s.find(function(s){return s.id==t});if(e)return e.regionName},closeSuccessTip:function(){this.successTip.showDialogTableVisible=!1}},created:function(){this.userType=localStorage.getItem("userType")},mounted:function(){this.getResume()}},u={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"per-student-resume"},[e("Header",{attrs:{title:"我的简历"},on:{goBack:t.goBack}}),e("SuccessTip",{attrs:{dialogTableVisible:t.successTip.showDialogTableVisible,tip:t.successTip.tip,hint:t.successTip.hint,width:t.successTip.width},on:{successDone:t.closeSuccessTip}},[e("div",{attrs:{slot:"stuResume-tip"},slot:"stuResume-tip"},[t._v(t._s(t.successTip.moretip))])]),e("div",{staticClass:"container"},[t.studentInfo?e("div",{staticClass:"myresume"},[e("div",{staticClass:"student-info"},[e("div",{staticClass:"name"},[t._v(t._s(t.studentInfo.stdName))]),e("ul",{staticClass:"concat"},[e("li",[e("img",{staticClass:"icon-tel",attrs:{src:"static/img/resume-tel.png"}}),e("span",[t._v(t._s(t.studentInfo.stdMobile))])]),e("li",[e("img",{staticClass:"icon-local",attrs:{src:"static/img/resume-local.png"}}),e("span",[t._v(t._s(t.provinceName))]),e("span",[t._v(t._s(t.cityName))]),e("span",[t._v(t._s(t.areaName))]),e("span",[t._v(t._s(t.studentInfo.stdAddr))])])]),e("div",{staticClass:"otherinfo"},[e("span",{staticClass:"item"},[t._v(t._s(t._f("genderFilter")(t.studentInfo.stdGender)))]),e("span",{staticClass:"item"},[t._v(t._s(t.studentInfo.stdEducationLv))]),e("span",{staticClass:"item"},[t._v(t._s(t.studentInfo.stdBirthday)+" ")]),e("span",{staticClass:"item"},[t._v(t._s(t._f("majorFilter")(t.studentInfo.stdMajor))+"  ")]),e("span",{staticClass:"item"},[t._v(t._s(t._f("graduationFilter")(t.studentInfo.stdGraduationTime)))]),t.studentInfo.stdQq?e("span",{staticClass:"item"},[e("img",{staticClass:"icon-qq",attrs:{src:"static/img/resume-qq.png"}}),e("span",[t._v(t._s(t.studentInfo.stdQq))])]):t._e(),t.studentInfo.stdWxId?e("span",{staticClass:"item"},[e("img",{staticClass:"icon-wechat",attrs:{src:"static/img/resume-wechat.png"}}),e("span",[t._v(t._s(t.studentInfo.stdWxId)+"  ")])]):t._e(),t.studentInfo.stdPolitics?e("span",{staticClass:"item"},[t._v(t._s(t.studentInfo.stdPolitics)+" ")]):t._e()]),t.studentInfo.stdHeadImg?e("img",{staticClass:"resume-avatar",attrs:{src:t.img_api+t.studentInfo.stdHeadImg}}):t._e()]),e("div",{staticClass:"item-container"},[e("nav",[e("span",{staticClass:"title"},[t._v("求职意向 ")])]),e("ul",{staticClass:"findwork"},[e("li",{staticClass:"item"},[e("img",{staticClass:"icon-area",attrs:{src:"static/img/resume-area.png"}}),e("span",[t._v(t._s(t.studentInfo.stdIntentCity))])]),e("li",{staticClass:"item"},[e("img",{staticClass:"icon-job",attrs:{src:"static/img/resume-job.png"}}),e("span",[t._v(t._s(t.studentInfo.stdJob)+" ")])]),e("li",{staticClass:"item"},[e("img",{staticClass:"icon-salary",attrs:{src:"static/img/resume-money.png"}}),"1"==t.studentInfo.stdSalaryFlag?e("span",[t._v(t._s(t._f("salaryFlag")(t.studentInfo.stdSalaryFlag)))]):e("span",[t._v(t._s(t._f("salaryRequire")(t.studentInfo.stdSalaryRequire)))])]),e("li",{staticClass:"item"},[e("img",{staticClass:"icon-arriveTime",attrs:{src:"static/img/resume-arriveTime.png"}}),e("span",[t._v(t._s(t._f("jobFilter")(t.studentInfo.stdArriveTime))+"  ")])])])]),e("div",{staticClass:"item-container"},[e("nav",[e("span",{staticClass:"title"},[t._v("教育经历 ")])]),0==t.studentInfo.eduExpList.length?e("div",{staticClass:"no-text"},[t._v("暂未填写    ")]):t._e(),e("ul",{staticClass:"education"},t._l(t.studentInfo.eduExpList,function(s,a){return e("li",{staticClass:"item"},[e("span",{staticClass:"ordernum"},[t._v("学历"+t._s(s.orderNum))]),e("span",[t._v(t._s(s.startTime))]),t._v("至"),e("span",[t._v(t._s(s.endTime))]),(s.startTime||s.endTime)&&s.gradeDesc?e("span",{staticClass:"divide"}):t._e(),e("span",[t._v(t._s(s.gradeDesc))]),s.gradeDesc?e("span",{staticClass:"divide"}):t._e(),e("span",[t._v(t._s(s.major))]),s.major&&s.school?e("span",{staticClass:"divide"}):t._e(),e("span",[t._v(t._s(s.school)+"        ")])])}))]),e("div",{staticClass:"item-container"},[e("nav",[e("span",{staticClass:"title"},[t._v("经验")])]),0==t.studentInfo.jobExpList.length?e("div",{staticClass:"no-text"},[t._v("暂未填写     ")]):t._e(),e("ul",{staticClass:"experience"},t._l(t.studentInfo.jobExpList,function(s,a){return e("li",{key:a,staticClass:"item"},[e("div",{staticClass:"ordernum"},[t._v("经验"+t._s(s.orderNum))]),e("div",{staticClass:"exp"},[e("div",{staticClass:"exp-address"},[e("span",[t._v(t._s(s.startTime))]),t._v("至"),e("span",[t._v(t._s(s.endTime))]),(s.startTime||s.endTime)&&s.companyName?e("span",{staticClass:"divide"}):t._e(),e("span",[t._v(t._s(s.companyName))])]),e("div",{staticClass:"exp-describe"},[t._v(t._s(s.jobDesc)+"                               ")])])])}))]),e("div",{staticClass:"resume-fixed-footer"},[e("el-button",{attrs:{type:"primary"},on:{click:t.createResume}},[t._v("编辑")]),e("el-button",{on:{click:t.getJob}},[t._v("投递简历  ")])],1)]):e("NotInfo",{attrs:{notClass:"暂无相关简历",defaultImg:"static/img/not-class-default.png",elButton:"创建简历"},on:{start:t.createResume}})],1)],1)},staticRenderFns:[]};var d=e("VU/8")(o,u,!1,function(t){e("mUGs")},null,null);s.default=d.exports}});