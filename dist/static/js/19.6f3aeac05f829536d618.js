webpackJsonp([19],{"8Hq0":function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var a={name:"PerCenter",data:function(){return{userName:"",userType:""}},methods:{goback:function(){this.$router.push({path:"Home"})},goPersonal:function(){"0"===this.userType||"4"===this.userType?this.$router.push({path:"/PerTeachInfo"}):"1"!==this.userType&&"2"!==this.userType||this.$router.push({path:"/PerStuInfo"})},goResume:function(){"0"!==this.userType&&"4"!==this.userType&&("1"!==this.userType&&"2"!==this.userType||this.$router.push({path:"/StuResume"}))},editPassWord:function(){this.$router.push({path:"PassWord"})},signOut:function(){var t=this;this.$confirm("确定退出登录？","提示",{cancelButtonText:"取消",confirmButtonText:"退出"}).then(function(){sessionStorage.removeItem("accessToken"),t.$router.push({name:"StartPage"})}).catch(function(){})},goHome:function(){this.$router.push({path:"/Home"})}},mounted:function(){this.userName=sessionStorage.getItem("userName"),this.userType=localStorage.getItem("userType")}},i={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"per-center"},[e("div",{staticClass:"center-line"},[e("p",{staticClass:"navigation"},[e("img",{staticClass:"img-fl",attrs:{src:"static/img/gb.png"},on:{click:t.goback}}),e("img",{staticClass:"img-fr",attrs:{src:"static/img/lj.png"},on:{click:t.goHome}})]),e("img",{staticClass:"imgCity",attrs:{src:"static/img/cityCenter.png"}})]),e("div",{staticClass:"name-text"},[e("p",{staticClass:"text"},[t._v(" "+t._s(t.userName))]),t._m(0)]),e("div",{staticClass:"cont"},[e("div",{staticClass:"ul",attrs:{span:24}},[e("div",{staticClass:"cross",attrs:{span:24},on:{click:t.goPersonal}},[t._m(1),e("span",{staticClass:"data-name"},[t._v("个人资料")]),e("b",{staticClass:"into"})]),t.hasQx("comm:person:changePwd")?e("div",{staticClass:"cross",attrs:{span:24},on:{click:t.editPassWord}},[t._m(2),e("span",{staticClass:"data-name"},[t._v("修改密码")]),e("b",{staticClass:"into"})]):t._e(),t.hasQx("stu:resume:detail")?e("div",{staticClass:"cross",attrs:{span:24},on:{click:t.goResume}},[t._m(3),e("span",{staticClass:"data-name"},[t._v("我的简历")]),e("b",{staticClass:"into"})]):t._e()])]),e("FixedButton",{attrs:{buttonText:"退出"},on:{listenToChildEvent:t.signOut}})],1)},staticRenderFns:[function(){var t=this.$createElement,s=this._self._c||t;return s("span",{staticClass:"figure-head"},[s("img",{staticClass:"img-logo",attrs:{src:"static/img/logo.png"}})])},function(){var t=this.$createElement,s=this._self._c||t;return s("span",[s("img",{staticClass:"pan",attrs:{src:"static/img/panb.png"}})])},function(){var t=this.$createElement,s=this._self._c||t;return s("span",[s("img",{staticClass:"pan",attrs:{src:"static/img/passwordblue.png"}})])},function(){var t=this.$createElement,s=this._self._c||t;return s("span",[s("img",{staticClass:"pan",attrs:{src:"static/img/resume-entry.png"}})])}]};var n=e("VU/8")(a,i,!1,function(t){e("L3aa")},null,null);s.default=n.exports},L3aa:function(t,s){}});