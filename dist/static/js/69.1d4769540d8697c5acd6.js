webpackJsonp([69],{"0a4O":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=a("Xxa5"),r=a.n(s),c=a("exGp"),i=a.n(c),n={name:"OilMessage",data:function(){return{selectCarInfo:{car_brand:"",icoName:"ad_ico",car_line:"",car_produceYear:"",car_cc:"",line_id:""},renderList:{}}},methods:{goBack:function(){this.$router.back(-1)},getHelperOil:function(){var e=this;return i()(r.a.mark(function t(){var a,s;return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return(a={}).token=localStorage.getItem("phpToken"),a.car_brand=e.selectCarInfo.car_brand,a.car_line=e.selectCarInfo.car_line,a.car_produceYear=e.selectCarInfo.car_produceYear,a.car_cc=e.selectCarInfo.car_cc,t.next=8,e.$axios.getHelperOil(a);case 8:2e4==(s=t.sent).code?e.renderList=s.data:e.dialog(s.msg);case 10:case"end":return t.stop()}},t,e)}))()}},mounted:function(){sessionStorage.getItem("selectCarInfo")&&(this.selectCarInfo=JSON.parse(sessionStorage.getItem("selectCarInfo")),this.getHelperOil())}},l={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"oilMessage"},[a("Header",{attrs:{title:"机油"},on:{goBack:e.goBack}}),a("div",{staticClass:"conts-div"},[a("ul",{staticClass:"data-list"},[a("li",{staticClass:"item"},[a("span",{staticClass:"title"},[e._v("品牌")]),a("span",{staticClass:"describe"},[e._v(e._s(e.renderList.car_brand))])]),a("li",{staticClass:"item"},[a("span",{staticClass:"title"},[e._v("车型")]),a("span",{staticClass:"describe"},[e._v(e._s(e.renderList.car_line))])]),a("li",{staticClass:"item"},[a("span",{staticClass:"title"},[e._v("制作厂家")]),a("span",{staticClass:"describe"},[e._v(e._s(e.renderList.factory))])]),a("li",{staticClass:"item"},[a("span",{staticClass:"title"},[e._v("润滑油初装量")]),a("span",{staticClass:"describe"},[e._v(e._s(e.renderList.oil_init))])])])])],1)},staticRenderFns:[]};var o=a("VU/8")(n,l,!1,function(e){a("Ou9g")},null,null);t.default=o.exports},Ou9g:function(e,t){}});