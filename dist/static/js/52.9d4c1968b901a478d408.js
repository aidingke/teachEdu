webpackJsonp([52],{WWA4:function(i,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s={name:"SuccessDialog",data:function(){return{dialogTableVisible:!1,time:3,sendMsgDisabled:!1}},methods:{},watch:{dialogTableVisible:function(i){if(i){var e=this;e.sendMsgDisabled=!0;var t=window.setInterval(function(){e.time--<=1&&(e.time=3,window.clearInterval(t),e.dialogTableVisible=!1)},1e3)}}}},a={render:function(){var i=this,e=i.$createElement,t=i._self._c||e;return t("div",{staticClass:"success-dialog"},[t("el-button",{attrs:{type:"text"},on:{click:function(e){i.dialogTableVisible=!0}}},[i._v("click Me!")]),i._v(" "),t("el-dialog",{attrs:{visible:i.dialogTableVisible,center:""},on:{"update:visible":function(e){i.dialogTableVisible=e}}},[t("div",{staticClass:"content"},[t("img",{attrs:{src:"static/img/success.png"}}),t("div",{staticClass:"name"},[i._v("报名")]),i.sendMsgDisabled?t("div",{staticClass:"time"},[i._v(i._s(i.time+"s回到详情页"))]):i._e(),t("el-button",{attrs:{plain:"plain"},on:{click:function(e){i.dialogTableVisible=!1}}},[i._v("知道了")])],1)])],1)},staticRenderFns:[]};var l=t("VU/8")(s,a,!1,function(i){t("wigB")},null,null);e.default=l.exports},wigB:function(i,e){}});