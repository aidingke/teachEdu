webpackJsonp([11],{"/XMP":function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=s("Xxa5"),a=s.n(r),n=s("exGp"),c=s.n(n),o={name:"Student",data:function(){return{renderList:[],selectCheckBox:[]}},methods:{goBack:function(){this.$route.query.groupId?this.$router.push({path:"./GroupMembers?groupId="+this.$route.query.groupId+"&matchStatus="+this.$route.query.matchStatus+"&matchId="+this.$route.query.matchId}):this.$router.back(-1)},getMathOtherStuList:function(){var t=this;return c()(a.a.mark(function e(){var s;return a.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$axios.getMathOtherStuList();case 2:1e3==(s=e.sent).code?t.renderList=s.data:t.renderList=[];case 4:case"end":return e.stop()}},e,t)}))()},onAddMembers:function(){this.$router.push({path:"./AddGroupMenbers?groupId="+this.$route.query.groupId+"&matchStatus="+this.$route.query.matchStatus+"&matchId="+this.$route.query.matchId})},onViewPersonInfo:function(t){this.$router.push({path:"./AddGroupMenbers?stuId="+t})},onAddGroupNum:function(){var t=this;return c()(a.a.mark(function e(){var s,r,n;return a.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(0!=t.selectCheckBox.length){e.next=4;break}t.dialog("请添加组员"),e.next=12;break;case 4:return s=t.selectCheckBox,(r={}).groupId=t.$route.query.groupId,r.stuId=s.toString(),e.next=10,t.$axios.addMathSchoolStu(r);case 10:1e3==(n=e.sent).code?t.successMsg("添加成功",function(){t.$router.push({path:"./GroupMembers?groupId="+t.$route.query.groupId+"&matchStatus="+t.$route.query.matchStatus+"&matchId="+t.$route.query.matchId})}):t.dialog(n.message);case 12:case"end":return e.stop()}},e,t)}))()}},mounted:function(){this.getMathOtherStuList()}},u={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"student"},[s("Header",{attrs:{title:"校外学生"},on:{goBack:t.goBack}}),s("div",{staticClass:"container"},[t.renderList.length>0?s("ul",t._l(t.renderList,function(e,r){return s("li",{key:e.stuId},[s("span",{staticClass:"el-checkbox__input"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.selectCheckBox,expression:"selectCheckBox"}],staticClass:"access-checkbox",attrs:{id:"chk_"+e.stuId,type:"checkbox"},domProps:{value:e.stuId,checked:Array.isArray(t.selectCheckBox)?t._i(t.selectCheckBox,e.stuId)>-1:t.selectCheckBox},on:{change:function(s){var r=t.selectCheckBox,a=s.target,n=!!a.checked;if(Array.isArray(r)){var c=e.stuId,o=t._i(r,c);a.checked?o<0&&(t.selectCheckBox=r.concat([c])):o>-1&&(t.selectCheckBox=r.slice(0,o).concat(r.slice(o+1)))}else t.selectCheckBox=n}}}),t._v(" "),s("label",{staticClass:"el-checkbox__inner",attrs:{for:"chk_"+e.stuId}})]),s("span",{staticClass:"name"},[t._v(t._s(e.stuName))]),s("span",{staticClass:"number"},[t._v("电话 "+t._s(e.stuPhone))]),s("span",{staticClass:"iconFont el-icon-arrow-right",on:{click:function(s){t.onViewPersonInfo(e.stuId)}}})])})):t._e(),0==t.renderList.length?s("NotInfo",{attrs:{notClass:"暂无相关校外学生信息",defaultImg:"static/img/not-class-default.png"}}):t._e()],1),s("div",{staticClass:"addMatch-cont",on:{click:t.onAddMembers}},[t._m(0)]),t.renderList.length>0?s("FixedButton",{attrs:{buttonText:"确定"},on:{listenToChildEvent:t.onAddGroupNum}}):t._e()],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"add-btn"},[e("span",{staticClass:"el-icon-plus avatar-uploader-icon"}),e("span",[this._v("新增"),e("br"),this._v("校外学生")])])}]};var i=s("VU/8")(o,u,!1,function(t){s("seeQ")},null,null);e.default=i.exports},seeQ:function(t,e){}});