webpackJsonp([74],{It3I:function(t,i){},XNyK:function(t,i,s){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var a={render:function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("div",{staticClass:"TrainList"},[s("Header",{attrs:{title:t.title},on:{goBack:t.goBack}}),t._v(" "),s("div",{staticClass:"passBox"},t._l(t.resData1,function(i,a){return s("div",{key:a,staticClass:"selectBox"},[s("div",{staticClass:"passBox"},[s("h3",{staticClass:"head"},[t._v(t._s(i.name))]),t._v(" "),s("p",{staticClass:"comCol"},[t._v("培训时间："+t._s(i.time))]),t._v(" "),s("p",{staticClass:"cimg"},t._l(i.img,function(t,i){return s("img",{key:i,attrs:{src:t}})})),t._v(" "),s("p",{staticClass:"ctit"},[t._v("\n\t\t\t\t\t\t描述："+t._s(i.cont)+"\n\t\t\t\t\t")]),t._v(" "),s("div",{staticClass:"kaoshiScore"},[s("span",{staticClass:"default"},[t._v("\n\t\t\t\t\t\t\t"+t._s(i.nums)+"\n\t\t\t\t\t\t\t"),s("p",[t._v("报名人数")])])])]),t._v(" "),0===t.status?s("div",{staticClass:"selectBox"},[s("router-link",{staticClass:"el-button--primary",attrs:{to:"/TeachTrainDetails/"+(a+1)}},[t._v("\n\t\t\t\t\t\t查看报名学生（"+t._s(i.total)+"）\n\t\t\t\t\t")])],1):t._e()])}))],1)},staticRenderFns:[]};var n=s("VU/8")({name:"TrainList",data:function(){return{status:0,title:"技术培训列表",resData1:[{name:"2018年第一季度考核",time:"2018-05-06 14:00-16:00",img:["http://img.baidu.com/hi/jx2/j_0028.gif","http://img.baidu.com/hi/jx2/j_0027.gif","http://img.baidu.com/hi/jx2/j_0028.gif"],nums:91,total:90,cont:"汽车是空调的老板，此次开会针对空调冷却系统汽车是空调的老板，\n\t\t\t\t\t\t汽车是空调的老板，此次开会针对空调冷却系统汽车是空调的老板，\n\t\t\t\t\t\t此次开会针对空调冷却系统汽车是空调的老板，此次开会针对空调冷却系统"},{name:"2018年第一季度考核",time:"2018-05-06 14:00-16:00",img:["http://img.baidu.com/hi/jx2/j_0028.gif","http://img.baidu.com/hi/jx2/j_0027.gif","http://img.baidu.com/hi/jx2/j_0028.gif"],nums:91,total:50,cont:"汽车是空调的老板，此次开会针对空调冷却系统汽车是空调的老板，\n\t\t\t\t\t\t汽车是空调的老板，此次开会针对空调冷却系统汽车是空调的老板，\n\t\t\t\t\t\t此次开会针对空调冷却系统汽车是空调的老板，此次开会针对空调冷却系统"},{name:"2018年第一季度考核",time:"2018-05-06 14:00-16:00",img:["http://img.baidu.com/hi/jx2/j_0028.gif","http://img.baidu.com/hi/jx2/j_0027.gif","http://img.baidu.com/hi/jx2/j_0028.gif"],nums:91,total:59,cont:"汽车是空调的老板，此次开会针对空调冷却系统汽车是空调的老板，\n\t\t\t\t\t\t汽车是空调的老板，此次开会针对空调冷却系统汽车是空调的老板，\n\t\t\t\t\t\t此次开会针对空调冷却系统汽车是空调的老板，此次开会针对空调冷却系统"}]}},methods:{goBack:function(){this.$router.back(-1)},updateTabValue:function(t){this.tabValue=t},openAddInfo:function(){this.showAdd=!0}},created:function(){this.status=0,0===this.status?this.title="教师技术培训列表":this.title="学生技术培训列表"}},a,!1,function(t){s("It3I")},null,null);i.default=n.exports}});