webpackJsonp([73],{FN6z:function(e,t){},sloh:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s={name:"SuccessDialog",data:function(){return{dialogTableVisible:!1,time:3,sendMsgDisabled:!1}},methods:{},watch:{dialogTableVisible:function(e){if(e){var t=this;t.sendMsgDisabled=!0;var i=window.setInterval(function(){t.time--<=1&&(t.time=3,t.sendMsgDisabled=!1,window.clearInterval(i))},1e3)}}}},a={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"success-dialog"},[i("el-button",{attrs:{type:"text"},on:{click:function(t){e.dialogTableVisible=!0}}},[e._v("click Me!")]),e._v(" "),i("el-dialog",{attrs:{visible:e.dialogTableVisible,center:"","show-close":!1},on:{"update:visible":function(t){e.dialogTableVisible=t}}},[i("div",{staticClass:"content"},[i("img",{attrs:{src:"static/img/success.png"}}),i("div",{staticClass:"name"},[e._v("新增单选题成功")]),e.sendMsgDisabled?i("div",{staticClass:"time"},[e._v(e._s(e.time+"s回到详情页"))]):e._e(),i("div",{staticClass:"button-items"},[i("el-button",{attrs:{type:"primary"}},[e._v("再加一个")]),i("el-button",{attrs:{plain:"plain"},on:{click:function(t){e.dialogTableVisible=!1}}},[e._v("知道了")])],1)])])],1)},staticRenderFns:[]};var l=i("VU/8")(s,a,!1,function(e){i("FN6z")},null,null);t.default=l.exports}});