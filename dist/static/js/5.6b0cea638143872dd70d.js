webpackJsonp([5],{"+/+T":function(a,t){},"H+se":function(a,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i={name:"Tnav",props:{nameNumber:{type:Number}},data:function(){return{tabValue:1}},methods:{tabChange:function(a){this.tabValue=a,this.$emit("tabValue",a)}},created:function(){}},e={render:function(){var a=this,t=a.$createElement,s=a._self._c||t;return s("div",{staticClass:"navBox"},[1===a.nameNumber?s("div",{staticClass:"nav"},[s("div",{staticClass:"nav-item",class:1==a.tabValue?"active":"",on:{click:function(t){a.tabChange(1)}}},[a._v("待考核"),s("i",{staticClass:"line"})]),a._v(" "),s("div",{staticClass:"nav-item",class:2==a.tabValue?"active":"",on:{click:function(t){a.tabChange(2)}}},[a._v("进行中"),s("i",{staticClass:"line"})]),a._v(" "),s("div",{staticClass:"nav-item",class:3==a.tabValue?"active":"",on:{click:function(t){a.tabChange(3)}}},[a._v("考核完成"),s("i",{staticClass:"line"})])]):a._e(),a._v(" "),2===a.nameNumber?s("div",{staticClass:"nav"},[s("div",{staticClass:"nav-item",class:1==a.tabValue?"active":"",on:{click:function(t){a.tabChange(1)}}},[a._v("未完成"),s("i",{staticClass:"line"})]),a._v(" "),s("div",{staticClass:"nav-item",class:2==a.tabValue?"active":"",on:{click:function(t){a.tabChange(2)}}},[a._v("已完成"),s("i",{staticClass:"line"})])]):a._e(),a._v(" "),3===a.nameNumber?s("div",{staticClass:"nav"},[s("div",{staticClass:"nav-item",class:1==a.tabValue?"active":"",on:{click:function(t){a.tabChange(1)}}},[a._v("待报名"),s("i",{staticClass:"line"})]),a._v(" "),s("div",{staticClass:"nav-item",class:2==a.tabValue?"active":"",on:{click:function(t){a.tabChange(2)}}},[a._v("历史培训"),s("i",{staticClass:"line"})])]):a._e(),a._v(" "),4===a.nameNumber?s("div",{staticClass:"nav"},[s("div",{staticClass:"nav-item",class:1==a.tabValue?"active":"",on:{click:function(t){a.tabChange(1)}}},[a._v("待批卷"),s("i",{staticClass:"line"})]),a._v(" "),s("div",{staticClass:"nav-item",class:2==a.tabValue?"active":"",on:{click:function(t){a.tabChange(2)}}},[a._v("批卷完成"),s("i",{staticClass:"line"})])]):a._e(),a._v(" "),5===a.nameNumber?s("div",{staticClass:"nav"},[s("div",{staticClass:"nav-item",class:1==a.tabValue?"active":"",on:{click:function(t){a.tabChange(1)}}},[a._v("未批改"),s("i",{staticClass:"line"})]),a._v(" "),s("div",{staticClass:"nav-item",class:2==a.tabValue?"active":"",on:{click:function(t){a.tabChange(2)}}},[a._v("已完成"),s("i",{staticClass:"line"})])]):a._e(),a._v(" "),6===a.nameNumber?s("div",{staticClass:"nav"},[s("div",{staticClass:"nav-item",class:1==a.tabValue?"active":"",on:{click:function(t){a.tabChange(1)}}},[a._v("进行中"),s("i",{staticClass:"line"})]),a._v(" "),s("div",{staticClass:"nav-item",class:2==a.tabValue?"active":"",on:{click:function(t){a.tabChange(2)}}},[a._v("历史培训"),s("i",{staticClass:"line"})])]):a._e(),a._v(" "),7===a.nameNumber?s("div",{staticClass:"nav"},[s("div",{staticClass:"nav-item",class:1==a.tabValue?"active":"",on:{click:function(t){a.tabChange(1)}}},[a._v("日常练习"),s("i",{staticClass:"line"})]),a._v(" "),s("div",{staticClass:"nav-item",class:2==a.tabValue?"active":"",on:{click:function(t){a.tabChange(2)}}},[a._v("技能考证"),s("i",{staticClass:"line"})])]):a._e()])},staticRenderFns:[]};var n={name:"Task",components:{appNav:s("VU/8")(i,e,!1,function(a){s("qUmo")},"data-v-2c7707dc",null).exports},data:function(){return{tabValue:1,nameNumber:2,resData1:[{name:"2018年第一季度考核",time:"2018-05-06 14:00-16:00",cont:"汽车是空调的老板，此次开会针对空调冷却系统"},{name:"2018年第一季度考核",time:"2018-05-06 14:00-16:00",cont:"汽车是空调的老板，此次开会针对空调冷却系统"},{name:"2018年第一季度考核",time:"2018-05-06 14:00-16:00",cont:"汽车是空调的老板，此次开会针对空调冷却系统"},{name:"2018年第一季度考核",time:"2018-05-06 14:00-16:00",cont:"汽车是空调的老板，此次开会针对空调冷却系统"},{name:"2018年第一季度考核",time:"2018-05-06 14:00-16:00",cont:"汽车是空调的老板，此次开会针对空调冷却系统"},{name:"2018年第一季度考核",time:"2018-05-06 14:00-16:00",cont:"汽车是空调的老板，此次开会针对空调冷却系统"}],resData2:[{name:"2019年第一季度考核",time:"2018-05-06 14:00-16:00",cont:"汽车是空调的老板，此次开会针对空调冷却系统"},{name:"2019年第一季度考核",time:"2018-05-06 14:00-16:00",cont:"汽车是空调的老板，此次开会针对空调冷却系统"},{name:"2019年第一季度考核",time:"2018-05-06 14:00-16:00",cont:"汽车是空调的老板，此次开会针对空调冷却系统"},{name:"2019年第一季度考核",time:"2018-05-06 14:00-16:00",cont:"汽车是空调的老板，此次开会针对空调冷却系统"},{name:"2019年第一季度考核",time:"2018-05-06 14:00-16:00",cont:"汽车是空调的老板，此次开会针对空调冷却系统"},{name:"2019年第一季度考核",time:"2018-05-06 14:00-16:00",cont:"汽车是空调的老板，此次开会针对空调冷却系统"}]}},methods:{goBack:function(){this.$router.back(-1)},updateTabValue:function(a){this.tabValue=a}},created:function(){}},c={render:function(){var a=this,t=a.$createElement,s=a._self._c||t;return s("div",{staticClass:"Task"},[s("Header",{attrs:{title:"作业"},on:{goBack:a.goBack}}),s("appNav",{attrs:{nameNumber:a.nameNumber},on:{tabValue:function(t){a.updateTabValue(t)}}}),1===a.tabValue?s("div",{staticClass:"passBox"},a._l(a.resData1,function(t,i){return s("div",{key:i,staticClass:"selectBox"},[s("div",{staticClass:"passBox"},[s("h3",{staticClass:"head"},[a._v(a._s(t.name))]),s("p",{staticClass:"comCol"},[a._v(a._s(t.time)+"\t\t\t\t\t")]),s("p",{staticClass:"ctit"},[a._v(a._s(t.cont)+"\t\t\t\t\t")]),a._m(0,!0)])])})):a._e(),2===a.tabValue?s("div",{staticClass:"passBox"},a._l(a.resData2,function(t,i){return s("div",{key:i,staticClass:"selectBox"},[s("div",{staticClass:"passBox"},[s("h3",{staticClass:"head"},[a._v(a._s(t.name))]),a._v(" "),s("p",{staticClass:"comCol"},[a._v(a._s(t.time))]),a._v(" "),s("p",{staticClass:"ctit"},[a._v(a._s(t.cont))])])])})):a._e()],1)},staticRenderFns:[function(){var a=this.$createElement,t=this._self._c||a;return t("div",{staticClass:"kaoshiBtn"},[t("button",{staticClass:"default"},[this._v("写作业")])])}]};var l=s("VU/8")(n,c,!1,function(a){s("+/+T")},null,null);t.default=l.exports},qUmo:function(a,t){}});