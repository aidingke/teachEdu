webpackJsonp([61],{"19S+":function(t,e){},acBv:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=s("gRE1"),a=s.n(i),n=s("Xxa5"),l=s.n(n),o=s("exGp"),c=s.n(o),d=s("0Mti"),r={name:"StuEditor",data:function(){return{orderNum:0,userType:"",fileImgUrl:"",postImgUrl:"/edu/teach/uploadImg",studentInfo:{},accessToken:"",validate:{mobile:{isOK:!0,text:"请填写手机号"},birthday:{isOK:!0,text:"请填写出生年月"},qq:{isOK:!0,text:"填写QQ号有误"}},img_api:d.a.img_api}},watch:{},methods:{goBack:function(){this.$router.push({path:"PerCenter"})},getPersonInfo:function(){var t=this;return c()(l.a.mark(function e(){var s,i;return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return s={type:1},e.next=3,t.$axios.personInfo(s);case 3:1e3===(i=e.sent).code&&(t.studentInfo=i.data,t.studentInfo.eduExpList=[],t.fileImgUrl=t.img_api+t.studentInfo.pic);case 5:case"end":return e.stop()}},e,t)}))()},addEducation:function(){this.orderNum++,this.studentInfo.eduExpList.push({orderNum:this.orderNum+"",startTime:"",endTime:"",gradeDesc:"",major:"",school:""})},deleEducation:function(t){this.educationalExperience.splice(t,1)},handleAvatarSuccess:function(t,e){1e3==t.code&&(console.log(t,"res"),this.fileImgUrl=URL.createObjectURL(e.raw),this.studentInfo.pic=t.data.imgName)},beforeAvatarUpload:function(t){var e="image/jpeg"===t.type||"image/png"===t.type||"image/jpg"===t.type||"image/gif"===t.type,s=t.size/1024/1024<2;return e||this.dialog("请上传正确的图片格式!"),s||this.dialog("上传头像图片大小不能超过 2MB!"),e&&s},check:function(){var t=this.studentInfo;t.mobile?/^1\d{10}$/.test(t.mobile)?this.validate.mobile.isOK=!0:(this.validate.mobile.isOK=!1,this.validate.mobile.text="填写手机号码有误"):(this.validate.mobile.isOK=!1,this.validate.mobile.text="请填写手机号码"),t.birthday?this.validate.birthday.isOK=!0:this.validate.birthday.isOK=!1,t.qq?/^[1-9][0-9]{4,10}$/.test(t.qq)?this.validate.qq.isOK=!0:this.validate.qq.isOK=!1:this.validate.qq.isOK=!0},save:function(){var t=this;return c()(l.a.mark(function e(){var s,i;return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t.check(),!a()(t.validate).every(function(t){return t.isOK})){e.next=15;break}return(s={}).mobile=t.studentInfo.mobile,s.pic=t.studentInfo.pic,s.wx=t.studentInfo.wx,s.qq=t.studentInfo.qq,s.nation=t.studentInfo.nation,s.politics=t.studentInfo.politics,s.addr=t.studentInfo.addr,s.eduExpList=t.studentInfo.eduExpList.length>0?t.studentInfo.eduExpList:null,e.next=13,t.$axios.personMod(s);case 13:1e3==(i=e.sent).code?(t.successMsg("操作成功"),t.$router.push({path:"/PerCenter"})):t.dialog(i.message);case 15:case"end":return e.stop()}},e,t)}))()}},created:function(){this.userType=localStorage.getItem("userType")},mounted:function(){this.getPersonInfo(),this.accessToken=localStorage.getItem("accessToken")}},u={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"student-editor"},[s("Header",{attrs:{title:"个人资料"},on:{goBack:t.goBack}}),s("div",{staticClass:"container"},[t._m(0),s("ul",[s("li",[t._m(1),s("div",{staticClass:"content"},[s("el-input",{attrs:{disabled:!0},model:{value:t.studentInfo.stdNum,callback:function(e){t.$set(t.studentInfo,"stdNum",e)},expression:"studentInfo.stdNum"}})],1)]),s("li",[t._m(2),s("div",{staticClass:"content"},[s("el-input",{attrs:{disabled:!0},model:{value:t.studentInfo.grade,callback:function(e){t.$set(t.studentInfo,"grade",e)},expression:"studentInfo.grade"}})],1)]),s("li",[t._m(3),s("div",{staticClass:"content"},[s("el-input",{attrs:{disabled:!0},model:{value:t.studentInfo.className,callback:function(e){t.$set(t.studentInfo,"className",e)},expression:"studentInfo.className"}})],1)]),s("li",[t._m(4),s("div",{staticClass:"content"},[s("el-input",{attrs:{disabled:!0},model:{value:t.studentInfo.learnTime,callback:function(e){t.$set(t.studentInfo,"learnTime",e)},expression:"studentInfo.learnTime"}})],1)]),s("li",[t._m(5),s("div",{staticClass:"content"},[s("el-input",{attrs:{placeholder:"班主任",disabled:!0},model:{value:t.studentInfo.teacher,callback:function(e){t.$set(t.studentInfo,"teacher",e)},expression:"studentInfo.teacher"}})],1)])]),t._m(6),s("ul",[s("li",[t._m(7),s("div",{staticClass:"content"},[s("el-input",{attrs:{disabled:!0},model:{value:t.studentInfo.userName,callback:function(e){t.$set(t.studentInfo,"userName",e)},expression:"studentInfo.userName"}})],1)]),s("li",[t._m(8),s("div",{staticClass:"content"},[s("el-input",{attrs:{placeholder:"手机号码",maxlength:"11"},on:{input:t.check},model:{value:t.studentInfo.mobile,callback:function(e){t.$set(t.studentInfo,"mobile",e)},expression:"studentInfo.mobile"}}),t.validate.mobile.isOK?t._e():s("span",{staticClass:"validate"},[t._v(t._s(t.validate.mobile.text))])],1)]),s("li",[t._m(9),s("div",{staticClass:"content"},[s("el-date-picker",{attrs:{placeholder:"选择日期",type:"date",format:"yyyy-MM-dd"},on:{change:t.check},model:{value:t.studentInfo.birthday,callback:function(e){t.$set(t.studentInfo,"birthday",e)},expression:"studentInfo.birthday"}})],1)]),s("li",[t._m(10),s("div",{staticClass:"content"},[s("el-radio",{attrs:{label:"m",disabled:""},model:{value:t.studentInfo.gender,callback:function(e){t.$set(t.studentInfo,"gender",e)},expression:"studentInfo.gender"}},[t._v("男")]),t._v(" "),s("el-radio",{attrs:{label:"f",disabled:""},model:{value:t.studentInfo.gender,callback:function(e){t.$set(t.studentInfo,"gender",e)},expression:"studentInfo.gender"}},[t._v("女")])],1)]),s("li",[t._m(11),s("div",{staticClass:"content"},[s("el-input",{attrs:{disabled:!0},model:{value:t.studentInfo.idCard,callback:function(e){t.$set(t.studentInfo,"idCard",e)},expression:"studentInfo.idCard"}})],1)]),s("li",[s("div",{staticClass:"attribute"},[t._v("照片")]),s("div",{staticClass:"content",style:{width:"110px",height:"110px"}},[s("el-upload",{staticClass:"avatar-uploader",attrs:{name:"imgFile",headers:{accessToken:this.accessToken},action:t.postImgUrl,"show-file-list":!1,"on-success":t.handleAvatarSuccess,data:{imgType:3},"before-upload":t.beforeAvatarUpload}},[t.studentInfo.pic?s("img",{staticClass:"avatar",attrs:{src:t.fileImgUrl}}):s("i",{staticClass:"el-icon-plus avatar-uploader-icon"})]),s("input",{directives:[{name:"model",rawName:"v-model",value:t.studentInfo.pic,expression:"studentInfo.pic"}],attrs:{type:"hidden",value:""},domProps:{value:t.studentInfo.pic},on:{input:function(e){e.target.composing||t.$set(t.studentInfo,"pic",e.target.value)}}}),t.fileImgUrl?t._e():s("span",{staticClass:"addTip"},[t._v("请上传一张清晰的个人照片 "),s("br"),t._v("大小不超过2M")])],1)]),s("li",[s("div",{staticClass:"attribute"},[t._v("微信号")]),s("div",{staticClass:"content"},[s("el-input",{model:{value:t.studentInfo.wx,callback:function(e){t.$set(t.studentInfo,"wx",e)},expression:"studentInfo.wx"}})],1)]),s("li",[s("div",{staticClass:"attribute"},[t._v("QQ")]),s("div",{staticClass:"content"},[s("el-input",{on:{input:t.check},model:{value:t.studentInfo.qq,callback:function(e){t.$set(t.studentInfo,"qq",e)},expression:"studentInfo.qq"}}),t.validate.qq.isOK?t._e():s("span",{staticClass:"validate"},[t._v(t._s(t.validate.qq.text))])],1)]),s("li",[s("div",{staticClass:"attribute"},[t._v("民族")]),s("div",{staticClass:"content"},[s("el-input",{model:{value:t.studentInfo.nation,callback:function(e){t.$set(t.studentInfo,"nation",e)},expression:"studentInfo.nation"}})],1)]),s("li",[s("div",{staticClass:"attribute"},[t._v("政治面貌")]),s("div",{staticClass:"content"},[s("el-input",{model:{value:t.studentInfo.politics,callback:function(e){t.$set(t.studentInfo,"politics",e)},expression:"studentInfo.politics"}})],1)]),s("li",[s("div",{staticClass:"attribute"},[t._v("联系地址")]),s("div",{staticClass:"content"},[s("el-input",{model:{value:t.studentInfo.addr,callback:function(e){t.$set(t.studentInfo,"addr",e)},expression:"studentInfo.addr"}})],1)])]),s("nav",[s("span",{staticClass:"left"},[t._v("教育经历")]),s("span",{staticClass:"right",on:{click:t.addEducation}},[t._v("+")])]),t.studentInfo.eduExpList?s("ul",t._l(t.studentInfo.eduExpList,function(e,i){return s("li",{key:i},[s("div",{staticClass:"attribute"},[t._v("学历"+t._s(i+1))]),s("div",{staticClass:"content"},[s("div",{staticClass:"education"},[s("div",{staticStyle:{"margin-bottom":"20px"}},[s("div",{staticClass:"date"},[s("el-date-picker",{attrs:{type:"date",placeholder:"开始日期"},model:{value:e.startTime,callback:function(s){t.$set(e,"startTime",s)},expression:"item.startTime"}})],1),s("span",[t._v(" — ")]),s("div",{staticClass:"date"},[s("el-date-picker",{attrs:{type:"date",placeholder:"结束日期"},model:{value:e.endTime,callback:function(s){t.$set(e,"endTime",s)},expression:"item.endTime"}})],1)]),s("div",{staticStyle:{"margin-bottom":"20px"}},[s("el-input",{attrs:{placeholder:"学历"},model:{value:e.gradeDesc,callback:function(s){t.$set(e,"gradeDesc",s)},expression:"item.gradeDesc"}}),s("span",[t._v(" — ")]),s("el-input",{attrs:{placeholder:"专业名称"},model:{value:e.major,callback:function(s){t.$set(e,"major",s)},expression:"item.major"}})],1),s("div",{staticClass:"school"},[s("el-input",{attrs:{placeholder:"毕业院校"},model:{value:e.school,callback:function(s){t.$set(e,"school",s)},expression:"item.school"}}),s("div",{staticClass:"dele",on:{click:function(e){t.deleEducation(i)}}},[s("img",{attrs:{src:"static/img/dele-item.png"}})])],1)])])])})):t._e(),s("FixedButton",{attrs:{buttonText:"保存"},on:{listenToChildEvent:t.save}})],1)],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("nav",[e("span",{staticClass:"left"},[this._v("班级信息")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"attribute"},[this._v("学号"),e("i",[this._v("*")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"attribute"},[this._v("系别"),e("i",[this._v("*")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"attribute"},[this._v("专业班级"),e("i",[this._v("*")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"attribute"},[this._v("入学时间"),e("i",[this._v("*")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"attribute"},[this._v("班主任"),e("i",[this._v("*")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("nav",[e("span",{staticClass:"left"},[this._v("基本信息")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"attribute"},[this._v("姓名"),e("i",[this._v("*")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"attribute"},[this._v("手机号码"),e("i",[this._v("*")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"attribute"},[this._v("出生年月"),e("i",[this._v("*")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"attribute"},[this._v("性别"),e("i",[this._v("*")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"attribute"},[this._v("身份证号码"),e("i",[this._v("*")])])}]};var v=s("VU/8")(r,u,!1,function(t){s("19S+")},null,null);e.default=v.exports}});