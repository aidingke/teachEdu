<!-- 
* name: 新增试卷
* author: fjd
* time: 2018-8-24
-->
<template>
    <div class="AddTestPaper">
		<div class="showPaper" v-if="showPaperShow">
			<!-- 导航 --> 
			<Header :title="typeTitle" @goBack="goBack"></Header>
			<div class="head">
				<div class="headBox">
					<div class="head-div">
						<div class="head-title">试题标题<i class="tip">*</i></div>
						<input v-model="questBankTitle" placeholder="请输入试题标题" style="padding-left:1%" />
					</div>
					<div class="head-div">
						<div class="head-title">描述<i class="tip">*</i></div>
						<el-input v-model="questDesc" maxlength=36 type="textarea" :autosize="{ minRows: 2, maxRows: 4}"  placeholder="请输入题目描述" >
						</el-input>
					</div>
					<!-- 复选框 -->
					<div class="head-div" v-if="questType!=4">
						<div class="head-title">专业班级<i class="tip">*</i></div>						
						<div style="width:75%;margin-left:0.2rem">
							<div style="display:inline" class="el-checkbox-group" v-if="questType==0||questType==1">
								<el-checkbox @change="changeClass" v-model="checkClass" class="checkClass">不限</el-checkbox>
							</div>							
							<el-checkbox-group v-for="(itec,ii) in classList" :key="ii" v-model="itec.selected">
								<el-checkbox :disabled="classBled" :label="itec.classId" @change="singleChange">{{itec.className}}</el-checkbox>
							</el-checkbox-group>
						</div>
					</div>	
					<div class="head-div">
						<div class="head-title">试卷分值<i class="tip">*</i></div>
						<input v-model="checkScore" disabled placeholder="0" style="width:30%" />
						<!-- <el-checkbox v-model="checkS" style="margin-left:15px;margin-top: 1%;">不限</el-checkbox> -->
					</div>
					<div class="head-div">
						<div class="head-title">起止时间<i class="tip">*</i></div>
						<div class="block">
							<!-- <div class="demonstration">值：{{ startTime }}... {{ endTime }}</div> -->
							<el-date-picker v-model="startTime" type="datetime" :disabled="startBled" placeholder="选择日期" format="yyyy-MM-dd HH:mm" >
							</el-date-picker>
							<span style="margin-right:10px">至</span>
							<!-- v-on:blur="checkTime()" -->
							<el-date-picker v-model="endTime" type="datetime" :disabled="endBled" placeholder="选择日期" format="yyyy-MM-dd HH:mm">
							</el-date-picker>
							
							<el-checkbox style="margin-left:15px;margin-top: 1%;" @change="changeTimes" v-model="checkT" v-if="questType==0||questType==1||questType==3">不限</el-checkbox>
						</div>   
					</div>
					<div class="head-div">
						<div class="head-title">公开试题</div>
						<div class="block">
							<!-- isPublic	是	string	公开标识 0-不公开 1-公开 -->
							<el-radio-group v-model="isPublic">
								<el-radio :label="1">是</el-radio>
								<el-radio :label="0">否</el-radio>
							</el-radio-group>
						</div>
					</div>

					<div class="head-div" v-if="questType!=1">
						<div class="head-title">科目</div>
						<div class="block" style="width:79%;margin-left:1%;">
							<el-radio-group v-for="(itec,ii) in SubjectsList" :key="ii" v-model="subjradio" style="width:25%;overflow: hidden;">
								<el-radio :label="itec.id">{{itec.subjectName}}</el-radio>
							</el-radio-group>
						</div>
					</div>
					<div class="head-div" v-if="questType==1">
						<div class="head-title">类别</div>
						<div class="block">
							<el-radio-group v-model="level">
								<el-radio :label="1">中级</el-radio>
								<el-radio :label="2">高级</el-radio>
							</el-radio-group>
						</div>
					</div>
					
					<div class="head-div">
						<div class="head-title">题目总数</div>
						<div class="block">
							<p>
								<span>单选题（{{questSingleNum}}）</span>
								<span>多选题（{{questMultNum}}）</span>
								<span>判断题（{{questJudgeNum}}）</span>
								<span>填空题（{{questFillNum}}）</span>
								<span>论述题（{{questDissNum}}）</span>
							</p>
							<p style="color:#bbb;margin-top:3%">备注&nbsp;&nbsp;&nbsp;&nbsp;
								<span><i style="display: inline-block;width: 15px;height: 15px;background: #67C23A;margin: 0 3px -3px 0;"></i>绿色表示为正确答案</span> 
								<span><i style="display: inline-block;width: 15px;height: 15px;background: #F56C6C;margin: 0 3px -3px 0;"></i>红色字体表示选错</span>
							</p>

						</div>
					</div>

					<div class="head-div">
						<div class="head-title"></div>
						<div @click="QuesFun" class="block" style="border:1px solid #409EFF;padding:2px 10px 2px 5px;color:#409EFF;border-radius:5px;box-shadow: 1px 1px 2px;">
							<span style="font-size:20px;">+</span> 复制其他老师试题
						</div>
					</div>
				</div>
			</div>

			<div class="selectBox Single">
				<!-- <a href="/#/AddTestPaper/#0"></a>	 -->
				<h3 class="line">
					<span class="editBtn" style="float:right;" @click="editAnswers(0)" v-if="hasQx('teach:quest:kindList')"><img src="static/img/edit.png" /></span>
					<span style="float:right;color:#bbb;margin-right:1%">{{scoreA0}}分</span>
					1、单选题（每题{{(scoreA0/questSingleNum)?scoreA0/questSingleNum:0}}分，合计{{scoreA0}}分）
				</h3>
				<div class="contentBox">
					<!-- 循环 -->
					<div class="timuBox" v-for="(item,index) in sinData" :key="index">
						<div class="timu" >
							<h4>
								{{index+1}}、{{item.qcDesc}}
							</h4>
							<el-radio-group v-for="(itec,ii) in item.arr" :key="ii" v-model="item.answers">
								<el-radio disabled :label="ii" :checked="item.answers">{{itec.item}}、{{itec.itemDesc}}</el-radio>
							</el-radio-group>
						</div>
					</div>

				</div>
			</div>
			<div class="selectBox">
				<h3 class="line">
					<span class="editBtn" style="float:right;" @click="editAnswers(1)" v-if="hasQx('teach:quest:kindList')"><img src="static/img/edit.png" /></span>
					<span style="float:right;color:#bbb;margin-right:1%">{{scoreA1}}分</span>
					2、多选题下列题目中至少有2个以上的正确答案，多选少选均不得分（每题{{(scoreA1/questMultNum)?scoreA1/questMultNum:0}}分，合计{{scoreA1}}分）
				</h3>
				<div class="contentBox">
					<!-- 循环 -->
					<div class="timuBox" v-for="(item,index) in mulData" :key="index">
						<div class="timu" >
							<h4>
								{{index+1}}、{{item.qcDesc}}
							</h4>
							<el-checkbox-group v-for="(itec,ii) in item.arr" :key="ii" v-model="itec.answersl">
								<el-checkbox disabled :label="ii" :checked="itec.answersl">{{itec.item}}、{{itec.itemDesc}} </el-checkbox>
							</el-checkbox-group>
						</div>
					</div>	
				</div>
			</div>
			<div class="selectBox Single">
				<h3 class="line">
					<span class="editBtn" style="float:right;" @click="editAnswers(2)" v-if="hasQx('teach:quest:kindList')"><img src="static/img/edit.png" /></span>
					<span style="float:right;color:#bbb;margin-right:1%">{{scoreA2}}分</span>
					3、判断题（每题{{(scoreA2/questJudgeNum)?scoreA2/questJudgeNum:0}}分，合计{{scoreA2}}分）
				</h3>
				<div class="contentBox">
					<!-- 循环 -->
					<div class="timuBox" v-for="(item,index) in JudData" :key="index">
						<div class="timu" >
							<h4>
								{{index+1}}、{{item.qcDesc}}
							</h4>
							<el-radio-group v-for="(itec,ii) in item.arr" :key="ii" v-model="item.answers">
								<el-radio disabled :label="ii" :checked="item.answers">{{itec.item}}、{{itec.itemDesc}}</el-radio>
							</el-radio-group>
						</div>
					</div>
				</div>	
			</div>	
			<div class="selectBox">
				<h3 class="line">
					<span class="editBtn" style="float:right;" @click="editAnswers(3)" v-if="hasQx('teach:quest:kindList')"><img src="static/img/edit.png" /></span>
					<span style="float:right;color:#bbb;margin-right:1%">{{scoreA3}}分</span>
					4、填空题（每题{{(scoreA3/questFillNum)?scoreA3/questFillNum:0}}分，合计{{scoreA3}}分）
				</h3>
				<div class="contentBox">
					<!-- 循环 -->
					<div class="timuBox" v-for="(item,index) in comData" :key="index">
						<div class="timu line">
							<h4>{{index+1}}.{{item.qcDesc}}</h4>
							<div class="continputBox">
								<p v-for="(itec,index) in item.arr" :key="index"> 
									<span>( {{index+1}} )</span> 
									<span class="trueColor"> {{itec.answersl}} </span>
								</p>
							</div>
						</div>
					</div>

				</div>
			</div>
			<div class="selectBox">
				<h3 class="line">
					<span class="editBtn" style="float:right;" @click="editAnswers(4)" v-if="hasQx('teach:quest:kindList')"><img src="static/img/edit.png" /></span>
					<span style="float:right;color:#bbb;margin-right:1%">{{scoreA4}}分</span>
					5、论述题（每题{{(scoreA4/questDissNum)?scoreA4/questDissNum:0}}分，合计{{scoreA4}}分）
				</h3>
				<div class="contentBox">
					<!-- 循环 -->
					<div class="timuBox" v-for="(item,index) in DisData" :key=index>
						<div class="timu ">
							<h4>{{index+1}}.{{item.qcDesc}}</h4>
							<div class="continputBox">
								<div>
									<span  v-for="(v,i) in item.arr" :key="i" style="vertical-align: top;display: inline-block;margin-right:0.5%">
										<img style="width:100px" :src="baseUrl+v.questImg" @click="showImages"/>
									</span>
								</div>
								<p style="font-size:14px"><span style="color:#000">答案：</span>{{item.answersl}}</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="selectBox" v-if="hasQx('teach:quest:add')">
				<el-row>
					<el-button type="primary" @click="submitInfo">提交</el-button>
				</el-row>	
			</div>
			<div class="scoreAll">
				<p>
					<span class="big">{{checkScore?checkScore:0}}</span>
					/<span>{{allScores}}</span>
				</p>
				<p>试卷分值</p>
			</div>
		</div>
		<el-dialog
			title="查看图片"
			:visible.sync="imgDialogVisible"
			width="80%"
			center>
			<!-- <span>查看图片</span> -->
			<div>
				<img :src="targetImg" style="width:100%"/>	
			</div>
			<span slot="footer" class="dialog-footer">
				<!-- <el-button @click="imgDialogVisible = false" style="">取 消</el-button> -->
				<el-button type="primary" @click="imgDialogVisible = false">确 定</el-button>
			</span>
		</el-dialog>

		<div class="addPaper" v-if="addPaperShow">
			<!-- 各类型题目组件 -->
			<div v-if="paperNumber===0"><Single :objSin="objSin" v-on:goBackInfo="goBackInfo($event)" v-on:getPaperInfo="getPaperInfo($event)"></Single></div>
			<div v-if="paperNumber===1"><MultipleChoice :objMul="objMul" v-on:goBackInfo="goBackInfo($event)" v-on:getPaperInfo="getPaperInfo($event)"></MultipleChoice></div>
			<div v-if="paperNumber===2"><Judge :objJud="objJud" v-on:goBackInfo="goBackInfo($event)" v-on:getPaperInfo="getPaperInfo($event)"></Judge></div>
			<div v-if="paperNumber===3"><Completion :objCom="objCom" v-on:goBackInfo="goBackInfo($event)" v-on:getPaperInfo="getPaperInfo($event)"></Completion></div>
			<div v-if="paperNumber===4"><Discussion :objDis="objDis" v-on:goBackInfo="goBackInfo($event)" v-on:getPaperInfo="getPaperInfo($event)"></Discussion></div>
			<div v-if="paperNumber===5"><Ques :objParams="objParams" @goBackInfo="goBackInfo" @goBackDetail="goBackDetail"></Ques></div>
			<div v-if="paperNumber===6"><QuesDetail :objQues="objQues" @goBackInfo="goBackInfo" @BigObjInfo="BigObjInfo"></QuesDetail></div>
		</div>
	</div>
</template>

<script>
import baseUrl from '@/apiconfig'
import Single from '@/components/technology/Single'
import MultipleChoice from '@/components/technology/MultipleChoice'
import Completion from '@/components/technology/Completion'
import Judge from '@/components/technology/Judge'
import Discussion from '@/components/technology/Discussion'
import Ques from '@/components/technology/teacher/Ques'
import QuesDetail from '@/components/technology/teacher/QuesDetail'

export default {
	name:'AddTestPaper',
	components:{
		"Single":Single,
		"MultipleChoice":MultipleChoice,
		"Judge":Judge,
		"Completion":Completion,
		"Discussion":Discussion,
		"Ques":Ques,
		"QuesDetail":QuesDetail
	},
    data(){
        return {
			questType:				0, //0-日常练习 1-技能考证 2-考核 3-作业 4-比赛题
			typeTitle:				'',
			questBankTitle:			'',//标题
			questDesc:				'',//描述
			score:					'',
			checkS:					'',
			checkT:					'',
			checkClass:				'',
			isPublic:				1, //isPublic	是	string	公开标识 0-不公开 1-公开
			startTime: 				"", //开始日期 v-model
			endTime: 				"", //结束日期 v-model
			objSin:					{},//回传子组件对象 单 
			objMul:					{},//回传子组件对象 多
			objJud:					{},//回传子组件对象 判
			objCom:					{},//回传子组件对象 填
			objDis:					{},//回传子组件对象 论
			objParams:				{},//回传子组件对象 试题
			objQues:				{},//回传回来的试题ID等
			sinData:				[],//单选数据
			mulData:				[],//多选数据
			JudData:				[],//判断数据
			comData:				[],//填空数据
			DisData:				[],//论述数据	 
			paperNumber:			'',//根据不同组件ID 显示组件0.1.2.3
			classList:         		[],//班级
			checkClassId:			'',
			SubjectsList:           [],//科目数组
			subId:					'',//科目传子组件
			levelId:				'',//等级传子组件
			subjradio: 				'',//默认科目0k
			url:					window.location.href,
			checkScore:				'',//选中的分数
			allScores:				100,
			questSingleNum:			0,//单选题总数
			questMultNum:			0,//多选题总数
			questJudgeNum:			0,//判断题总数
			questFillNum:			0,//填空题总数
			questDissNum:			0,//论述题总数
			questList:				[],//试题集合
			scoreA0:				0,//单选总分
			scoreA1:				0,//多选总分
			scoreA2:				0,//判断总分
			scoreA3:				0,//填空总分
			scoreA4:				0,//论述总分
			subjectId:				0,//科目ID
			level:					1,//级别 1-中级 2-高级 (questType为1时 必传)
			baseUrl:				baseUrl.img_api,//路径
			showPaperShow:			true,
			addPaperShow:			false,
			startBled:				false,	//开始时间禁用
			endBled:				false,	//结束时间禁用
			classBled:				false, //班级禁用
			targetImg:				'',	
			allQuesNum:				[],//记录每个大题的索引
			imgDialogVisible:		false
        }
	},
	methods: {
		goBack(obj){
			this.$router.back(-1)
		},
		showImages(){
			this.targetImg = event.target.getAttribute('src')
			this.imgDialogVisible=true
		},
		//班级不限
		changeClass(){
			if(this.checkClass){
				this.classBled = true
				this.checkClassId = 0
				this.classList.forEach(function(v,i){
					if(v.selected===true){
						v.selected=false
					}
				})
			}else{
				this.classBled = false
				this.checkClassId = ''
			}
		},
		//时间限制 不限时间
		changeTimes(){
			if(this.checkT){
				this.startBled = true
				this.endBled = true
				this.startTime =''
				this.endTime =''
			}else{
				this.startBled = false
				this.endBled = false
			}
		},
		singleChange(){

		},
		//计算时间差
		countTime(s,e){
			var date3=e.getTime()-s.getTime()  //时间差的毫秒数
			//计算出相差天数
			var days=Math.floor(date3/(24*3600*1000))
			//计算出小时数
			var leave1=date3%(24*3600*1000)    //计算天数后剩余的毫秒数
			var hours=Math.floor(leave1/(3600*1000))
			//计算相差分钟数
			var leave2=leave1%(3600*1000)        //计算小时数后剩余的毫秒数
			var minutes=Math.floor(leave2/(60*1000))
			//计算相差秒数
			var leave3=leave2%(60*1000)      //计算分钟数后剩余的毫秒数
			var seconds=Math.round(leave3/1000)
			return (days+hours+minutes+seconds)
			// console.log(" 相差 "+days+"天 "+hours+"小时 "+minutes+" 分钟"+seconds+" 秒")
		},
		checkTime(){
			// console.log(this.startTime)
			// console.log(this.endTime)
			if(this.startTime==''){
				
			}else if(this.startTime!=''&&this.endTime!=''){
				if(this.countTime(this.startTime,this.endTime).toString()<0){
					this.dialog('开始时间不能大于结束时间！')
					return false
				}
			}
		},
		QuesFun(){
			this.showPaperShow = false
			this.addPaperShow = true
			this.paperNumber=5
			this.objParams.questType = this.questType
		},
		editAnswers(v){
			if(this.questType==1){ //技能考证
				this.subId = ''	//瞎给个值
				this.levelId = this.level.toString()
			}else if(this.questType!=1){ //日常练习
				this.subId = this.subjradio
				this.levelId='' //瞎给个值
			}
			// console.log(this.levelId)
			// // console.log(this.subId)
			// return false
			
			//点编辑的时候把试卷隐藏 ，把选题放出来
			this.showPaperShow = false
			this.addPaperShow = true
			this.paperNumber=v
			
			// :subId="subId" :levelId="levelId" :parentData="sinData"
			//父组件传给子组件
			this.objSin.subId = this.subId
			this.objSin.levelId = this.levelId
			this.objSin.scoresAll = this.checkScore
			this.objSin.scores = Number(this.scoreA0/this.questSingleNum)
			this.objSin.parentData = this.sinData
			
			this.objMul.subId = this.subId
			this.objMul.levelId = this.levelId
			this.objMul.scoresAll = this.checkScore
			this.objMul.scores = Number(this.scoreA1/this.questMultNum)
			this.objMul.parentData = this.mulData

			this.objJud.subId = this.subId
			this.objJud.levelId = this.levelId
			this.objJud.scoresAll = this.checkScore
			this.objJud.scores = Number(this.scoreA2/this.questJudgeNum)
			this.objJud.parentData = this.JudData

			this.objCom.subId = this.subId
			this.objCom.levelId = this.levelId
			this.objCom.scoresAll = this.checkScore
			this.objCom.scores = Number(this.scoreA3/this.questFillNum)
			this.objCom.parentData = this.comData

			this.objDis.subId = this.subId
			this.objDis.levelId = this.levelId
			this.objDis.scoresAll = this.checkScore
			this.objDis.scores = Number(this.scoreA4/this.questDissNum)
			this.objDis.parentData = this.DisData

			// //把总分存起来
			// sessionStorage.setItem("scoresAll",this.checkScore)
		},
		goBackInfo(v){
			this.showPaperShow = v.showPaperShow
			this.addPaperShow = v.addPaperShow
			this.paperNumber = v.paperNumber
			this.objParams.qbId = v.qbId
		},
		goBackDetail(v){
			this.showPaperShow = v.showPaperShow
			this.addPaperShow = v.addPaperShow
			this.paperNumber=v.paperNumber
			this.objQues.qbId = v.qbId
		},
		BigObjInfo(v){
			this.showPaperShow = v.showPaperShow
			this.addPaperShow = v.addPaperShow
			if(v.sinData){
				this.objSin.parentData = this.sinData = v.sinData
				this.scoreA0 = v.scoreA0,this.questSingleNum=v.sinData.length
			}
			if(v.mulData){
				this.objMul.parentData = this.mulData = v.mulData
				this.scoreA1 = v.scoreA1,this.questMultNum=v.mulData.length
			}
			if(v.JudData){
				this.objJud.parentData = this.JudData = v.JudData
				this.scoreA2 = v.scoreA2,this.questJudgeNum=v.JudData.length
			}
			if(v.comData){
				this.objCom.parentData = this.comData = v.comData
				this.scoreA3 = v.scoreA3,this.questFillNum=v.comData.length
			}
			if(v.DisData){
				this.objDis.parentData = this.DisData = v.DisData
				this.scoreA4 = v.scoreA4,this.questDissNum=v.DisData.length
			}
			this.checkScore=this.scoreA0+this.scoreA1+this.scoreA2+this.scoreA3+this.scoreA4
			// this.objMul.parentData = this.sinData
			// this.objJud.parentData = this.sinData
			// this.objCom.parentData = this.sinData
			// this.objDis.parentData = this.sinData
			console.log(v)
			//拿到数据还不行，还要遍历数组赋值
			let checkN = 0,newList=[]
			this.sinData.forEach(function(v,i){
				let itemobj0={}
				itemobj0.itemId =v.questId
				itemobj0.itemSort =i+1
				itemobj0.itemScore = v.qcScore.toString()
				newList.push(itemobj0)
				checkN+=v.score
			})
			this.mulData.forEach(function(v,i){
				let itemobj1={}
				itemobj1.itemId =v.questId
				itemobj1.itemSort =i+1
				itemobj1.itemScore = v.qcScore.toString()
				newList.push(itemobj1)
				checkN+=v.score
			})
			this.JudData.forEach(function(v,i){
				let itemobj2={}
				itemobj2.itemId =v.questId
				itemobj2.itemSort =i+1
				itemobj2.itemScore = v.qcScore.toString()
				newList.push(itemobj2)
				checkN+=v.score
			})
			this.comData.forEach(function(v,i){
				let itemobj3={}
				itemobj3.itemId =v.questId
				itemobj3.itemSort =i+1
				itemobj3.itemScore = v.qcScore.toString()
				newList.push(itemobj3)
				checkN+=v.score
			})
			this.DisData.forEach(function(v,i){
				let itemobj4={}
				itemobj4.itemId =v.questId
				itemobj4.itemSort =i+1
				itemobj4.itemScore = v.qcScore.toString()
				newList.push(itemobj4)
				checkN+=v.score
			})
			// console.log('--------来一发')
			// console.log(newList)
			//传集合回去
			this.questList=newList
		},
		getPaperInfo(v){
			//子组件传回来的 tit = 0,1,2,3,4给相应题赋值,同时给父组件显示
			//点编辑的时候把试卷隐藏 ，把选题放出来
			this.showPaperShow = true
			this.addPaperShow = false
			// let url = this.url
			// window.location.href=url+'#'+v.tit

			if(v.tit===0){
				this.scoreA0 = v.score
				this.sinData=v.resData
				
			}else if(v.tit===1){
				this.scoreA1 = v.score
				this.mulData=v.resData
			}else if(v.tit===2){
				this.scoreA2 = v.score
				this.JudData=v.resData
			}else if(v.tit===3){
				this.scoreA3 = v.score
				this.comData=v.resData
			}else if(v.tit===4){
				this.scoreA4 = v.score
				this.DisData=v.resData
			}
			//遍历数组赋值
			let checkN = 0,itemobj = {},newList=[]
			let everyA = Number(this.scoreA0/this.sinData.length),everyB = Number(this.scoreA1/this.mulData.length),everyC = Number(this.scoreA2/this.JudData.length)
			let everyD = Number(this.scoreA3/this.comData.length),everyE = Number(this.scoreA4/this.DisData.length)

			this.sinData.forEach(function(v,i){
				let itemobj0={}
				itemobj0.itemId =v.questId
				itemobj0.itemSort =i+1
				itemobj0.itemScore = everyA.toString()
				newList.push(itemobj0)
				checkN+=v.score
			})
			this.mulData.forEach(function(v,i){
				let itemobj1={}
				itemobj1.itemId =v.questId
				itemobj1.itemSort =i+1
				itemobj1.itemScore = everyB.toString()
				newList.push(itemobj1)
				checkN+=v.score
			})
			this.JudData.forEach(function(v,i){
				let itemobj2={}
				itemobj2.itemId =v.questId
				itemobj2.itemSort =i+1
				itemobj2.itemScore = everyC.toString()
				newList.push(itemobj2)
				checkN+=v.score
			})
			this.comData.forEach(function(v,i){
				let itemobj3={}
				itemobj3.itemId =v.questId
				itemobj3.itemSort =i+1
				itemobj3.itemScore = everyD.toString()
				newList.push(itemobj3)
				checkN+=v.score
			})
			this.DisData.forEach(function(v,i){
				let itemobj4={}
				itemobj4.itemId =v.questId
				itemobj4.itemSort =i+1
				itemobj4.itemScore = everyE.toString()
				newList.push(itemobj4)
				checkN+=v.score
			})
			// console.log('--------来一发')
			// console.log(newList)
			//传集合回去
			this.questList=newList
			this.checkScore=this.scoreA0+this.scoreA1+this.scoreA2+this.scoreA3+this.scoreA4

			//总数
			this.questSingleNum = this.sinData.length
			this.questMultNum = this.mulData.length
			this.questJudgeNum = this.JudData.length
			this.questFillNum = this.comData.length
			this.questDissNum = this.DisData.length
		},
		//最后提交数据
		async submitInfo(){
			let ywkData ={
				questBankTitle:this.questBankTitle,
				questDesc:this.questDesc,
				classId:'',
				score:'',

				startTime:'',
				endTime:'',
				isPublic:this.isPublic.toString(),	//是	string	公开标识 0-不公开 1-公开
				questType:this.questType,
				questSingleNum:this.questSingleNum,
				questMultNum:this.questMultNum,
				questJudgeNum:this.questJudgeNum,
				questFillNum:this.questFillNum,
				questDissNum:this.questDissNum,
				questList:this.questList
			}
	
			if(this.checkT){
				//不限时间选空值
				ywkData.startTime=''
				ywkData.endTime=''
			}

			if(this.startTime==''&&this.endTime==''&&this.checkT==false){
				ywkData.startTime=''
				ywkData.endTime=''
			}
			if(this.startTime!=''&&this.endTime==''&&this.checkT==false){
				ywkData.startTime=''
				ywkData.endTime=''
				// this.dialog('请选结束时间')
				// return false
			}
			if(this.startTime==''&&this.endTime!=''&&this.checkT==false){
				ywkData.startTime=''
				ywkData.endTime=''
				// this.dialog('请选开始时间')
				// return false
			}
			if(this.startTime!=''&&this.endTime!=''){
				if(this.startTime!=null&&this.endTime!=null){
					if(this.countTime(this.startTime,this.endTime).toString()<0){
						this.dialog('开始时间不能大于结束时间！')
						return false
					}else{
						ywkData.startTime=this.dayjs(this.startTime).format('YYYY-MM-DD HH:mm')
						ywkData.endTime=this.dayjs(this.endTime).format('YYYY-MM-DD HH:mm')
					}
				}
			}
			
			//考核时间必选
			if(this.questType==2||this.questType==4){
				if(this.startTime==''||this.endTime==''||this.endTime==null||this.startTime==null){
					this.dialog('开始和结束时间必填！')
					return false
				}
			}

			// this.dayjs(tt).format('yyyy-MM-DD')
			// console.log(this.dayjs(this.startTime).format('YYYY-MM-DD HH:mm'))
			// console.log(this.dayjs(this.endTime).format('YYYY-MM-DD HH:mm'))
			
			// return false
			//0-日常练习 1-技能考证 2-考核 3-作业 4-比赛题
			if(this.questType==1){
				ywkData.level=this.level.toString()
				ywkData.subjectId = ''	//瞎给个值
			}else if(this.questType!=1){
				if(this.subjradio==''){
					this.dialog('科目得选一个亲！')
					return false
				}
				ywkData.level='' //瞎给个值
				ywkData.subjectId = this.subjradio
			}

			if(this.questType==4){
				ywkData.matchId = this.$route.query.matchId
			}


			let classId='' /*,k*/
			//班级不限赋值为0
			if(this.checkClassId===0){
				classId=0
				ywkData.classId=0
			}else{
				this.classList.forEach(function(v,i){
					if(v.selected===true){
						classId+= v.classId+','
					}
				})
				//比赛不需要班级ID,比赛
				if(this.questType==4){
					ywkData.classId=''
				}else{
					ywkData.classId = classId.substring(0,classId.length-1)
				}	
			}

			//试卷分值，空表示不限
			if(this.checkS){
				ywkData.score=0
				// k=100
			}
			this.checkS?ywkData.score=0:ywkData.score=this.checkScore

			if(this.questBankTitle==''){
				this.dialog('试题标题不能为空！')
				return false
			}	
			if(this.questDesc==''){
				this.dialog('试题描述不能为空！')
				return false
			}	
			if(classId===''&&this.questType!=4){
 				this.dialog('专业班级必选一个')
 				return false
			}

			if(this.checkScore==''&&k!=100){
				this.dialog('试题分值必选')
				return false
			}
			if(this.startTime==''){
				// this.$message.error('开始时间必选')

			}
			if(this.endTime==''){
				// this.$message.error('结束时间必选')

			}

			const res = await this.$axios.addTestPaper(ywkData)
			if(res.code===1000){
				this.successMsg('添加成功!')
				if(this.questType==0||this.questType==1){  //日常练习、技能考证
					this.$router.push({path:"/Questions"}) 
				}else if(this.questType==2){ //考核
					this.$router.push({path:"/TeachPass"}) 
				}else if(this.questType==3){ //作业
					this.$router.push({path:"/TeachTask"}) 
				}else if(this.questType==4){ //比赛
					this.$router.push({path:"/MatchManage"}) 
				}
				
			}else if(res.code==1100){
				this.dialog(res.message)
			}
		},
		async getInfos(){
			// 获取班级
			const res = await this.$axios.getQuestBankClassList()
			//获取科目
			let params = {
				pageNo: 1,
				pageSize: 100
			}
			const res1 = await this.$axios.getSubjectList(params)
			if(res.code===1000){
				this.classList=res.data
			}
			if(res1.code===1000){
				this.SubjectsList=res1.data
				this.subjradio = res1.data[0].id
			}
		}
	},
	mounted() {
		// //把总分存起来
		// sessionStorage.setItem("scoresAll",0)
		this.getInfos()
		this.questType=this.$route.query.questType
		this.questType==0?this.typeTitle='新增日常练习':this.questType==1?this.typeTitle='新增技能考证':this.questType==2?this.typeTitle='新增考核':this.questType==3?this.typeTitle='新增作业':this.questType==4?this.typeTitle='新增比赛':'无解'
	},
}
</script>


<style lang="stylus">
.AddTestPaper
	background :#eee
	.headBox
		background :#fff
		padding 15px 30px 50px 30px
		color:#909399
		.head-div
			display flex
			padding 30px 0 0 0
			font-size 30px
			color #333
			padding 15px 0 15px 0
			.el-checkbox-group
				display inline
			.el-input
				width: 425px
				.el-input__inner
					width 95%
					margin-left 5%
			.el-input__prefix
				left 30px	
			input
				padding 20px 20px 20px 60px
				color #777
				margin-left 20px
				border 1px solid #dcdfe6
				width 73.5%
				display  inline-block
			.el-textarea
				display inline-block
				width 76%	
				textarea	
					padding 15px
					color #777
					margin-left 20px
					width 100%
					display  inline-block
			.head-title
				width 17%
			.el-checkbox-group
				flex 1
				.el-checkbox
					font-size 30px
					margin-left 0px
					margin-bottom 15px
					width 380px
					overflow hidden
					.el-checkbox__label
						font-size 28px
						padding-left 5px
						color #303133
					.el-checkbox__inner
						width 45px
						height 45px
					.el-checkbox__inner::after
						border-width 3px
						height 32px
						left 16px
						width 13px
				.checkClass
					width 371px			
		h3
			color #333
			font-size:36px;
		.comCol
			color #E7A848
			font-size 28px
		.comWeight
			font-weight:900	
		.score
			border-bottom 2px solid #ddd
			padding-bottom 40px
			span 
				width 180px
				display inline-block
	.Single		
		.el-radio-group
			display block	
		.el-checkbox__input.is-checked+.el-checkbox__label
			color #666
		.el-checkbox__input.is-checked .el-checkbox__inner
			background  #666
			border-color #666	
		.el-radio__inner
			height 40px
			width 40px
			border 2px solid #dcdfe6
		.el-radio__input.is-checked .el-radio__inner
			background 	#bbb
		.el-radio__input.is-checked+.el-radio__label
			color #67C23A
		.el-radio__inner:after 
			width 15px
			height 15px
		.el-radio,.el-checkbox
			display inline-block
			margin-bottom 50px
		.el-radio+.el-radio
			margin-left 0	
	.selectBox
		margin-top 30px;
		background #fff;
		border-bottom 4px solid #ddd;
		padding 0 30px 0 30px;
		h3
			line-height 70px;
			font-size 36px;
			font-weight 900;
			.editBtn img
				width 65%
		.timuBox
			h4
				font-weight 300;
				line-height 60px;
				font-size 32px;
				color #303133;
			.el-radio__input.is-checked .el-radio__inner,.el-radio__inner
				height 40px
				width 40px
				border 2px solid #dcdfe6;
			.el-radio__inner:after 
				width 15px
				height 15px
			.el-radio,.el-checkbox
				display block
				margin-bottom 50px
			.el-radio+.el-radio
				margin-left 0
			.checkBox
				.el-checkbox
					margin-right :15px;
					width:190px;
					margin-top:30px;      
					.el-checkbox__inner
						width :45px;
						height :45px;
						border: 3px solid #ddd;
				.el-checkbox__inner:after
					border: 2px solid #fff;
					border-left: 0;
					border-top: 0;
					height: 25px;
					left: 8px;
					top: 3px;
					width: 15px;
				.el-checkbox+.el-checkbox
					margin-left :0px;	
			.el-checkbox__input.is-checked .el-checkbox__inner
					background  #666
					border-color #666	
				.el-checkbox__input.is-checked+.el-checkbox__label
					color #666	
			.el-checkbox__input.is-checked+.el-checkbox__label
				color #67c23a
			.el-checkbox__input.is-checked .el-checkbox__inner
				background  #ccc
				border-color #ccc		
	.continputBox
		p
			margin-bottom 30px
			color #888
			.inputTox
				height 70px;
				line-height 70px;
				padding-left 50px;
				width: 79%;
				border: 2px solid #eee;				
		textarea
			height: 200px 
			border: 1px solid #ddd
			width: 90%
			margin-top 20px
	.el-button--primary
		width 90%
		height 90px
		display block
		margin 20px 0 30px 0	
	.tip
		color:red	
		font-style normal
	.trueColor
		color #67c23a	
	.scoreAll
		height 120px
		background #E6A23C
		width 180px
		position fixed
		right 0
		bottom 3%
		text-align center
		color #ffffff
		border-radius 90px 0 0 90px
		z-index 999
		padding-top 20px
		p
			font-size 30px
			span
				font-size 20px
			.big
				font-weight 900
				font-size 40px	
</style>