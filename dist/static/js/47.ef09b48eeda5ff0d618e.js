webpackJsonp([47],{F5Q4:function(e,i,t){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var s=t("Xxa5"),n=t.n(s),a=t("exGp"),r=t.n(a),o={name:"BindDevice",data:function(){return{deviceNum:"",isBind:!1,repeatShow:!1,showConfirm:!1,confirmText:"",userType:"",iosFlag:!0,nullMsg:"",dialogTableVisible:!1,time:3,sendMsgDisabled:!1}},methods:{determine:function(){var e=this;return r()(n.a.mark(function i(){var t,s;return n.a.wrap(function(i){for(;;)switch(i.prev=i.next){case 0:return t={},t="0"===e.userType?{orgId:e.orgId,deviceNum:e.deviceNum,deviceMac:e.uuid,isBind:e.isBind?"1":"0"}:{orgId:e.orgId},i.next=4,e.$axios.getBind(t);case 4:1e3===(s=i.sent).code?e.dialogTableVisible=!0:e.dialog(s.message,function(){e.showConfirm=!1});case 6:case"end":return i.stop()}},i,e)}))()},closeConfirm:function(){this.showConfirm=!1},binding:function(){var e=this;return r()(n.a.mark(function i(){return n.a.wrap(function(i){for(;;)switch(i.prev=i.next){case 0:if(e.deviceNum){i.next=5;break}return e.nullMsg="请输入设备号",i.abrupt("return",!1);case 5:e.showConfirm=!0,e.confirmText="确定绑定设备号为"+e.deviceNum;case 6:case"end":return i.stop()}},i,e)}))()},BindPrivate:function(e){var i=this;return r()(n.a.mark(function t(){var s;return n.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(e){t.next=2;break}return t.abrupt("return",!1);case 2:return s={},s="0"===i.userType?{orgId:i.orgId,deviceMac:i.uuid,isBind:i.isBind?"1":"0"}:{orgId:i.orgId},t.next=6,i.$axios.getBind(s);case 6:1e3===t.sent.code&&i.successMsg("您的设备已设为私人设备，请重新登录",function(){i.$router.push("/Login")});case 8:case"end":return t.stop()}},t,i)}))()}},mounted:function(){this.userType=localStorage.getItem("userType"),"undefined"!=sessionStorage.getItem("uuid")&&""!=sessionStorage.getItem("uuid")&&null!=sessionStorage.getItem("uuid")?this.uuid=sessionStorage.getItem("uuid"):this.uuid="1123","undefined"!=localStorage.getItem("orgId")&&""!=localStorage.getItem("orgId")&&null!=localStorage.getItem("orgId")&&void 0!=localStorage.getItem("orgId")?this.orgId=localStorage.getItem("orgId"):this.orgId="97097851240D4DDA9BCFCF29678B6FFD",this.iosFlag=this.isIos()},watch:{dialogTableVisible:function(e){if(e){var i=this;i.sendMsgDisabled=!0;var t=window.setInterval(function(){i.time--<=1&&(i.time=3,window.clearInterval(t),i.dialogTableVisible=!1,i.$router.push({path:"/Login"}))},1e3)}}}},c={render:function(){var e=this,i=e.$createElement,t=e._self._c||i;return t("div",{staticClass:"bind"},[t("img",{staticClass:"bg-img",attrs:{src:"static/img/binddevice_bg.png"}}),t("div",{staticClass:"bind-content"},[t("h3",{staticClass:"bind-title"},[e._v(" 绑定设备号")]),t("div",{staticClass:"input-box"},[t("el-input",{attrs:{placeholder:"设备号",clearable:"clearable"},model:{value:e.deviceNum,callback:function(i){e.deviceNum=i},expression:"deviceNum"}}),e._m(0)],1),e.repeatShow?t("div",{staticClass:"repeatMsg"},[e._v("跟现有设备重复")]):e._e(),e.nullMsg?t("div",{staticClass:"nullMsg"},[e._v(e._s(e.nullMsg))]):e._e(),t("div",{staticClass:"button-submit"},[t("el-button",{attrs:{type:"primary"},on:{click:e.binding}},[e._v("立即绑定")])],1),t("div",{staticClass:"remind"},[t("div",{staticClass:"tip"},[e._v("该设备尚未绑定，点击上方按钮立即绑定 ")]),t("div",{staticClass:"subtip"},[t("el-checkbox",{on:{change:e.BindPrivate},model:{value:e.isBind,callback:function(i){e.isBind=i},expression:"isBind"}}),t("span",[e._v("该设备为私人设备，无需绑定 ")])],1)])]),t("ConfirmDialog",{attrs:{confirmTitile:"提示",confirmText:e.confirmText,dialogTableVisible:e.showConfirm,confirmTextButton:"绑定",closeTextButton:"取消"},on:{determine:e.determine,closeConfirm:e.closeConfirm}}),t("el-dialog",{staticClass:"success-dialog",attrs:{visible:e.dialogTableVisible,center:"center","show-close":!1},on:{"update:visible":function(i){e.dialogTableVisible=i}}},[t("div",{staticClass:"content"},[t("img",{attrs:{src:"static/img/success.png"}}),t("div",{staticClass:"name"},[e._v("已成功绑定设备号"+e._s(e.deviceNum))]),e.sendMsgDisabled?t("div",{staticClass:"time"},[e._v(e._s(e.time+"s后自动回到登录页面"))]):e._e()])])],1)},staticRenderFns:[function(){var e=this.$createElement,i=this._self._c||e;return i("div",{staticClass:"icon"},[i("img",{attrs:{src:"static/img/pad-icon.png"}})])}]};var l=t("VU/8")(o,c,!1,function(e){t("j7MT")},null,null);i.default=l.exports},j7MT:function(e,i){}});