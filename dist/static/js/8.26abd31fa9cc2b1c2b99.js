webpackJsonp([8],{fnNj:function(t,e){},pNol:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s("Xxa5"),i=s.n(a),n=s("exGp"),c=s.n(n),r=(s("yrlf"),s("0Mti")),o={name:"TestPaper",data:function(){return{headTitle:"",titile:"",qbDesc:"",score:"",totalNum:"",qbId:"",questType:"",img_api:r.a.img_api,stTime:"",edTime:"",startTime:"",endTime:"",endLastTime:"",usedTime:0,answerList:[],qcList:[],sinData:[],mulData:[],JudData:[],comData:[],DisData:[],every0:"",every1:"",every2:"",every3:"",every4:"",subjectName:"",sublevel:"",targetImg:"",allQuesNum:[],countNums:"",dialogTableVisible:!1,countNumsFlg:!0,imgDialogVisible:!1,clock:"",myX:"",tempTT:""}},methods:{goBack:function(){this.$router.back(-1)},showImages:function(){this.targetImg=event.target.getAttribute("src"),this.imgDialogVisible=!0},onpaste:function(){if(this.isIos());else if(1==this.questType||2==this.questType||4==this.questType)return"return false"},oksubmit:function(t){this.myX=t,this.submitInfo(this.myX)},CurentTime:function(){var t=new Date,e=t.getFullYear(),s=t.getMonth()+1,a=t.getDate(),i=t.getHours(),n=t.getMinutes(),c=e+"-";return s<10&&(c+="0"),c+=s+"-",a<10&&(c+="0"),c+=a+" ",i<10&&(c+="0"),c+=i+":",n<10&&(c+="0"),c+=n},getList:function(){var t=this;return c()(i.a.mark(function e(){var s,a,n,c,r,o,l,u,d,m,v,p,h,_,g,f;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t.qbId=t.$route.query.qbId,s={qbId:t.qbId},a=[],n=[],c=[],r=[],o=[],l=[],e.next=4,t.$axios.getTestPaperDetail(s);case 4:1100===(u=e.sent).code&&t.dialog(u.message),1e3===u.code&&(d=u.data.qcOptionList,t.titile=u.data.titile,t.qbDesc=u.data.qbDesc,t.startTime=u.data.startTime,t.endLastTime=u.data.endTime,2==t.questType||4==t.questType?t.endTime=t.dayjs(u.data.endTime).format("HH:mm"):t.endTime=u.data.endTime,t.subjectName=u.data.subjectName?u.data.subjectName:"",t.sublevel=u.data.level?u.data.level:"",t.score=u.data.score,t.totalNum=u.data.totalNum,t.qcList=u.data.qcList,t.qcList.forEach(function(t,e){var s={};s.qcId=t.qcId,s.qcDesc=t.qcDesc,s.orderNum=t.orderNum,s.type=t.type,s.qcPic=t.qcPic,s.qcScore=t.qcScore,s.arr=[],d.forEach(function(e,a){var i={};i.itemDesc=e.optionName,i.item=e.optionValue,i.qcId=e.qcId,e.qcId==t.qcId&&s.arr.push(i)}),a.push(s)}),m=void 0,v=void 0,p=void 0,h=void 0,_=void 0,a.forEach(function(t,e){0==t.type?(n.push(t),m=t.qcScore):1==t.type?(c.push(t),v=t.qcScore):2==t.type?(r.push(t),p=t.qcScore):3==t.type?(o.push(t),h=t.qcScore):4==t.type&&(l.push(t),_=t.qcScore)}),t.every0=m,t.every1=v,t.every2=p,t.every3=h,t.every4=_,t.sinData=n,t.mulData=c,t.JudData=r,t.comData=o,t.DisData=l,g=[],t.DisData.forEach(function(t,e){if(t.qcPic){g=t.qcPic.split("ψ");for(var s=[],a=0;a<g.length;a++)g[a].length>0&&(s[a]=g[a]);t.imgArr=s}}),f=0,t.sinData.length>0&&(f++,t.allQuesNum[0]=f),t.mulData.length>0&&(f++,t.allQuesNum[1]=f),t.JudData.length>0&&(f++,t.allQuesNum[2]=f),t.comData.length>0&&(f++,t.allQuesNum[3]=f),t.DisData.length>0&&(f++,t.allQuesNum[4]=f),2!=t.questType&&4!=t.questType||t.countFun(t.countTime(u.data.serverTime,t.endLastTime)));case 7:case"end":return e.stop()}},e,t)}))()},submitInfo:function(t){var e=this;return c()(i.a.mark(function s(){var a,n,c,r,o,l,u;return i.a.wrap(function(s){for(;;)switch(s.prev=s.next){case 0:if(a={qbId:e.qbId,usedTime:e.usedTime,answerList:e.answerList},{},n=[],c=void 0,e.sinData.forEach(function(t,e){var s={};s.qcId=t.qcId,void 0==t.answers?c=!0:s.qcAnswer=t.answers.toString(),n.push(s)}),e.mulData.forEach(function(t,e){var s={qcAnswer:""};s.qcId=t.qcId,t.arr.forEach(function(t,e){var a="";""!=(a=t.answersl)&&void 0!=a||(a=!1),s.qcAnswer+=a+"ψ"}),s.qcAnswer=s.qcAnswer.substring(0,s.qcAnswer.length-1),n.push(s)}),r=void 0,e.JudData.forEach(function(t,e){var s={};s.qcId=t.qcId,void 0==t.answers?r=!0:s.qcAnswer=t.answers.toString(),n.push(s)}),o=void 0,e.comData.forEach(function(t,e){var s={qcAnswer:""};s.qcId=t.qcId,t.arr.forEach(function(t,e){t.qcAnswer?s.qcAnswer+=t.qcAnswer+"ψ":o=!0}),s.qcAnswer=s.qcAnswer.substring(0,s.qcAnswer.length-1),n.push(s)}),l=void 0,e.DisData.forEach(function(t,e){var s={};s.qcId=t.qcId,t.qcAnswer?s.qcAnswer=t.qcAnswer:l=!0,n.push(s)}),e.edTime=new Date,a.usedTime=e.usedTime,a.answerList=n,u=void 0,1!=t){s.next=22;break}return s.next=18,e.$axios.studentSubmitAnswers(a);case 18:u=s.sent,e.myX="",s.next=37;break;case 22:if(0!=t){s.next=27;break}return e.dialogTableVisible=!1,s.abrupt("return",!1);case 27:if(!(c||r||o||l)){s.next=32;break}return e.dialogTableVisible=!0,s.abrupt("return",!1);case 32:return s.next=34,e.$axios.studentSubmitAnswers(a);case 34:u=s.sent,e.myX="",window.clearInterval(e.clock);case 37:1e3===u.code?0==e.questType||1==e.questType?(e.$router.push({path:"/Questions"}),e.successMsg("练习结束!")):2==e.questType?(e.$router.push({path:"/TeachPass"}),e.successMsg("考核结束!")):3==e.questType?(e.$router.push({path:"/TeachTask"}),e.successMsg("作业结束!")):4==e.questType&&(e.$router.back(-1),e.successMsg("比赛结束!")):1100===u.code&&e.dialog(u.message);case 38:case"end":return s.stop()}},s,e)}))()},countTime:function(t,e){var s=Date.parse(new Date(e.replace(/-/g,"/")))-Date.parse(new Date(t.replace(/-/g,"/"))),a=(Math.floor(s/864e5),s%864e5),i=a%36e5,n=i%6e4,c=3600*Math.floor(a/36e5)+60*Math.floor(i/6e4)+Math.round(n/1e3);return c>10?c-=5:c=c,c},countFun:function(t){var e=this;this.clock=window.setInterval(function(){9==--t&&(e.myX=1,e.submitInfo(e.myX),window.clearInterval(e.clock),e.countNumsFlg=!1),e.tempTT=t;Math.floor(t/86400);var s=t%86400,a=Math.floor(s/3600),i=s%3600,n=Math.floor(i/60),c=i%60,r=Math.round(c);e.usedTime++,e.countNums=a+"时"+n+"分"+r+"秒"},1e3)}},mounted:function(){this.stTime=new Date,this.getList(),this.questType=this.$route.query.questType,0==this.questType?this.headTitle="日常练习":1==this.questType?this.headTitle="技能考证":2==this.questType?this.headTitle="考核":3==this.questType?this.headTitle="作业":4!=this.questType||(this.headTitle="比赛")}},l={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"testPaper"},[s("Header",{attrs:{title:t.headTitle},on:{goBack:t.goBack}}),t._v(" "),s("div",{staticClass:"headBox"},[s("h3",[t._v(t._s(t.titile))]),t._v(" "),t.startTime.length>0||t.endTime.length>0?s("p",{staticClass:"comCol mt"},[t._v("考试时间："+t._s(t.startTime)+" - "+t._s(t.endTime))]):t._e(),t._v(" "),s("div",{staticClass:"score mt"},[s("p",[s("span",{staticClass:"comCol comWeight mr"},[t._v(t._s(0==t.score?100:t.score))]),t._v(" "),s("span",{staticClass:"comCol comWeight"},[t._v(t._s(t.totalNum))])]),t._v(" "),t._m(0)]),t._v(" "),t.subjectName?s("p",{staticClass:"mt"},[t._v("\n\t\t\t\t科目："+t._s(t.subjectName)+"\n\t\t\t")]):t._e(),t._v(" "),t.sublevel?s("p",{staticClass:"mt"},[t._v("\n\t\t\t\t题目类别："+t._s(t.sublevel)+"\n\t\t\t")]):t._e(),t._v(" "),s("p",{staticClass:"mt"},[t._v("\n\t\t\t\t描述："+t._s(t.qbDesc)+"\n\t\t\t")])]),t._v(" "),t.sinData.length>0?s("div",{staticClass:"selectBox Single"},[s("h3",{staticClass:"line"},[t._v(t._s(t.allQuesNum[0])+"、单选题（每题"+t._s(t.every0)+"分，合计"+t._s(t.every0*t.sinData.length)+"分）")]),t._v(" "),s("div",{staticClass:"contentBox"},t._l(t.sinData,function(e,a){return s("div",{key:a,staticClass:"timuBox"},[s("div",{staticClass:"timu"},[s("h4",[t._v("\n\t\t\t\t\t\t\t"+t._s(a+1)+"、"+t._s(e.qcDesc)+"\n\t\t\t\t\t\t")]),t._v(" "),t._l(e.arr,function(a,i){return s("el-radio-group",{key:i,model:{value:e.answers,callback:function(s){t.$set(e,"answers",s)},expression:"item.answers"}},[s("el-radio",{attrs:{label:i,checked:e.answers}},[t._v(t._s(a.item)+"、"+t._s(a.itemDesc))])],1)})],2)])}))]):t._e(),t._v(" "),t.mulData.length>0?s("div",{staticClass:"selectBox"},[s("h3",{staticClass:"line"},[t._v(t._s(t.allQuesNum[1])+"、多选题下列题目中至少有2个及以上的正确答案，多选少选均不得分（每题"+t._s(t.every1)+"分，合计"+t._s(t.every1*t.mulData.length)+"分）")]),t._v(" "),s("div",{staticClass:"contentBox"},t._l(t.mulData,function(e,a){return s("div",{key:a,staticClass:"timuBox"},[s("div",{staticClass:"timu"},[s("h4",[t._v("\n\t\t\t\t\t\t\t"+t._s(a+1)+"、"+t._s(e.qcDesc)+"\n\t\t\t\t\t\t")]),t._v(" "),t._l(e.arr,function(e,a){return s("el-checkbox-group",{key:a,model:{value:e.answersl,callback:function(s){t.$set(e,"answersl",s)},expression:"itecM.answersl"}},[s("el-checkbox",{attrs:{label:e.qcId}},[t._v(t._s(e.item)+"、"+t._s(e.itemDesc)+" ")])],1)})],2)])}))]):t._e(),t._v(" "),t.JudData.length>0?s("div",{staticClass:"selectBox Single"},[s("h3",{staticClass:"line"},[t._v(t._s(t.allQuesNum[2])+"、判断题（每题"+t._s(t.every2)+"分，合计"+t._s(t.every2*t.JudData.length)+"分）")]),t._v(" "),s("div",{staticClass:"contentBox"},t._l(t.JudData,function(e,a){return s("div",{key:a,staticClass:"timuBox"},[s("div",{staticClass:"timu"},[s("h4",[t._v("\n\t\t\t\t\t\t\t"+t._s(a+1)+"、"+t._s(e.qcDesc)+"\n\t\t\t\t\t\t")]),t._v(" "),t._l(e.arr,function(a,i){return s("el-radio-group",{key:i,model:{value:e.answers,callback:function(s){t.$set(e,"answers",s)},expression:"item.answers"}},[s("el-radio",{attrs:{label:i,checked:e.answers}},[t._v(t._s(a.item)+"、"+t._s(a.itemDesc))])],1)})],2)])}))]):t._e(),t._v(" "),t.comData.length>0?s("div",{staticClass:"selectBox"},[s("h3",{staticClass:"line"},[t._v(t._s(t.allQuesNum[3])+"、填空题（每题"+t._s(t.every3)+"分，合计"+t._s(t.every3*t.comData.length)+"分）")]),t._v(" "),s("div",{staticClass:"contentBox"},t._l(t.comData,function(e,a){return s("div",{key:a,staticClass:"timuBox"},[s("div",{staticClass:"timu line"},[s("h4",[t._v(t._s(a+1)+"."+t._s(e.qcDesc))]),t._v(" "),s("div",{staticClass:"continputBox"},t._l(e.arr,function(e,a){return s("p",{key:a},[s("span",[t._v("( "+t._s(a+1)+" )")]),t._v(" "),s("span",[s("input",{directives:[{name:"model",rawName:"v-model",value:e.qcAnswer,expression:"itec.qcAnswer"}],staticClass:"inputTox classKill",attrs:{type:"text",onpaste:t.onpaste(),oncontextmenu:t.onpaste(),placeholder:"答案"},domProps:{value:e.qcAnswer},on:{input:function(s){s.target.composing||t.$set(e,"qcAnswer",s.target.value)}}})])])}))])])}))]):t._e(),t._v(" "),t.DisData.length>0?s("div",{staticClass:"selectBox"},[s("h3",{staticClass:"line"},[t._v(t._s(t.allQuesNum[4])+"、论述题（每题"+t._s(t.every4)+"分，合计"+t._s(t.every4*t.DisData.length)+"分）")]),t._v(" "),s("div",{staticClass:"contentBox"},t._l(t.DisData,function(e,a){return s("div",{key:a,staticClass:"timuBox"},[s("div",{staticClass:"timu "},[s("h4",[t._v(t._s(a+1)+"."+t._s(e.qcDesc))]),t._v(" "),s("div",{staticClass:"continputBox"},[s("div",t._l(e.imgArr,function(e,a){return s("span",{key:a,staticStyle:{"vertical-align":"top",display:"inline-block","margin-right":"0.5%"}},[s("img",{staticStyle:{width:"100px"},attrs:{src:t.img_api+e},on:{click:t.showImages}})])})),t._v(" "),s("p",{staticStyle:{"font-size":"14px"}},[s("textarea",{directives:[{name:"model",rawName:"v-model",value:e.qcAnswer,expression:"item.qcAnswer"}],staticClass:"form-control classKill",attrs:{onpaste:t.onpaste(),oncontextmenu:t.onpaste(),name:"description",placeholder:"答案"},domProps:{value:e.qcAnswer},on:{input:function(s){s.target.composing||t.$set(e,"qcAnswer",s.target.value)}}})])])])])}))]):t._e(),t._v(" "),2==t.questType||4==t.questType?[s("div",{directives:[{name:"show",rawName:"v-show",value:t.countNumsFlg,expression:"countNumsFlg"}],staticClass:"CountFun"},[s("p",[t._m(1),t._v(" "),s("span",{staticClass:"big"},[t._v(t._s(t.countNums))])])])]:t._e(),t._v(" "),s("el-dialog",{attrs:{visible:t.dialogTableVisible,center:"","show-close":!0},on:{"update:visible":function(e){t.dialogTableVisible=e}}},[s("div",{staticClass:"success-dialog"},[s("div",{staticClass:"content"},[s("img",{attrs:{src:"static/img/waring.png"}}),t._v(" "),s("div",{staticClass:"name"},[t._v(" 你还有题没填，确定要交卷吗? ")])]),t._v(" "),s("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[s("el-button",{staticStyle:{display:"inline",width:"45%"},attrs:{type:"primary"},on:{click:function(e){t.oksubmit(1)}}},[t._v("确定")]),t._v(" "),s("el-button",{staticStyle:{display:"inline",width:"45%",padding:"17px"},on:{click:function(e){t.oksubmit(0)}}},[t._v("取消")])],1)])]),t._v(" "),s("el-dialog",{attrs:{title:"查看图片",visible:t.imgDialogVisible,width:"80%",center:""},on:{"update:visible":function(e){t.imgDialogVisible=e}}},[s("div",[s("img",{staticStyle:{width:"100%"},attrs:{src:t.targetImg}})]),t._v(" "),s("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[s("el-button",{attrs:{type:"primary"},on:{click:function(e){t.imgDialogVisible=!1}}},[t._v("确 定")])],1)]),t._v(" "),t.hasQx("stu:qc:submitAnswer")?s("div",{staticClass:"selectBox"},[s("el-row",[s("el-button",{attrs:{type:"primary"},on:{click:t.submitInfo}},[t._v("提交")])],1)],1):t._e()],2)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("p",[e("span",{staticClass:"mr"},[this._v("卷面分数")]),this._v(" "),e("span",[this._v("题目总数")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("span",[this._v("剩余"),e("br")])}]};var u=s("VU/8")(o,l,!1,function(t){s("fnNj")},null,null);e.default=u.exports}});