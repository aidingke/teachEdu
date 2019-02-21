<!-- 
* name: 考试答题
* author: fjd
* time: 2018-7-31
-->
<template>
    <div class="testPaper">
		<!-- 导航 --> 
        <Header :title='headTitle' @goBack="goBack"></Header>
		<div class="headBox">
			<h3>{{titile}}</h3>
			<p class="comCol mt" v-if="startTime.length>0||endTime.length>0">考试时间：{{startTime}} - {{endTime}}</p>
			<div class="score mt">
				<p><span class="comCol comWeight mr">{{score==0?100:score}}</span> <span class="comCol comWeight">{{totalNum}}</span></p>	
				<p><span class="mr">卷面分数</span> <span>题目总数</span></p>
			</div>	
			<p class="mt" v-if="subjectName">
				科目：{{subjectName}}
			</p>
			<p class="mt" v-if="sublevel">
				题目类别：{{sublevel}}
			</p>
			<p class="mt">
				描述：{{qbDesc}}
			</p>
			<!-- <p>{{tempTT}}</p> -->
		</div>

		<div class="selectBox Single" v-if="sinData.length>0">
			<h3 class="line">{{allQuesNum[0]}}、单选题（每题{{every0}}分，合计{{every0*sinData.length}}分）</h3>
			<div class="contentBox">
				<div class="timuBox" v-for="(item,index) in sinData" :key="index">
					<div class="timu" >
						<h4>
							{{index+1}}、{{item.qcDesc}}
						</h4>
						<el-radio-group v-for="(itec,ii) in item.arr" :key="ii" v-model="item.answers">
							<el-radio :label="ii" :checked="item.answers">{{itec.item}}、{{itec.itemDesc}}</el-radio>
						</el-radio-group>
					</div>
				</div>	
			</div>
		</div>
		<div class="selectBox" v-if="mulData.length>0">
			<h3 class="line">{{allQuesNum[1]}}、多选题下列题目中至少有2个及以上的正确答案，多选少选均不得分（每题{{every1}}分，合计{{every1*mulData.length}}分）</h3>
			<div class="contentBox">
				<div class="timuBox" v-for="(item,index) in mulData" :key="index">
					<div class="timu" >
						<h4>
							{{index+1}}、{{item.qcDesc}}
						</h4>
						<el-checkbox-group v-for="(itecM,ii) in item.arr" :key="ii" v-model="itecM.answersl">
							<el-checkbox :label="itecM.qcId">{{itecM.item}}、{{itecM.itemDesc}} </el-checkbox>
						</el-checkbox-group>
					</div>
				</div>	
			</div>
		</div>
		<div class="selectBox Single" v-if="JudData.length>0">
			<h3 class="line">{{allQuesNum[2]}}、判断题（每题{{every2}}分，合计{{every2*JudData.length}}分）</h3>
			<div class="contentBox">
				<div class="timuBox" v-for="(item,index) in JudData" :key="index">
					<div class="timu" >
						<h4>
							{{index+1}}、{{item.qcDesc}}
						</h4>
						<el-radio-group v-for="(itec,ii) in item.arr" :key="ii" v-model="item.answers">
							<el-radio :label="ii" :checked="item.answers">{{itec.item}}、{{itec.itemDesc}}</el-radio>
						</el-radio-group>
					</div>
				</div>
			</div>	
		</div>	
		<div class="selectBox" v-if="comData.length>0">
			<h3 class="line">{{allQuesNum[3]}}、填空题（每题{{every3}}分，合计{{every3*comData.length}}分）</h3>
			<div class="contentBox">
				<div class="timuBox" v-for="(item,index) in comData" :key="index">
					<div class="timu line">
						<h4>{{index+1}}.{{item.qcDesc}}</h4>
						<div class="continputBox">
							<p v-for="(itec,index) in item.arr" :key="index"> 
								<span>( {{index+1}} )</span> 
								<span> <input type="text" class="inputTox classKill" v-model="itec.qcAnswer" :onpaste="onpaste()" :oncontextmenu="onpaste()" placeholder="答案"> </span>
							</p>
							<!-- <p v-if="item.arr<=0"> 
								<span>( 1 )</span> 
								<span> <input type="text" class="inputTox" placeholder="答案"> </span>
							</p> -->
						</div>
					</div>
				</div>	
			</div>
		</div>
		<div class="selectBox" v-if="DisData.length>0">
			<h3 class="line">{{allQuesNum[4]}}、论述题（每题{{every4}}分，合计{{every4*DisData.length}}分）</h3>
			<div class="contentBox">
				<div class="timuBox" v-for="(item,index) in DisData" :key=index>
					<div class="timu ">
						<h4>{{index+1}}.{{item.qcDesc}}</h4>
						
						<div class="continputBox">
							<div>
								<span  v-for="(v,i) in item.imgArr" :key="i" style="vertical-align: top;display: inline-block;margin-right:0.5%">
									<img :src="img_api+v" style="width:100px" @click="showImages" />
								</span>
							</div>
							<p style="font-size:14px"><textarea class="form-control classKill" :onpaste="onpaste()" :oncontextmenu="onpaste()" v-model="item.qcAnswer" name="description" placeholder="答案" /></p>
						</div>
					</div>
					<!-- <div class="timu">
						<h4>2.发动机是汽车的心脏</h4>
						<p><img src="http://img.baidu.com/hi/jx2/j_0028.gif"><img src="http://img.baidu.com/hi/jx2/j_0027.gif"></p>
						<div class="continputBox">
							<textarea class="form-control" name="description" placeholder="答案" />
						</div>
					</div> -->
				</div>
			</div>
		</div>

		<template v-if="questType==2||questType==4">	
			<div class="CountFun" v-show="countNumsFlg">
				<p>
					<span>剩余<br></span>
					<span class="big">{{countNums}}</span>
				</p>
			</div>
		</template>

		<el-dialog :visible.sync="dialogTableVisible" center :show-close="true">
			<div class="success-dialog">
				<div class="content">
					<img src="static/img/waring.png" />
					<div class="name"> 你还有题没填，确定要交卷吗? </div>
				</div>	
				<span slot="footer" class="dialog-footer">
					<el-button type="primary" @click="oksubmit(1)" style="display: inline;width:45%">确定</el-button>
					<el-button @click="oksubmit(0)" style="display: inline;width:45%;padding: 17px;">取消</el-button>
				</span>
			</div>	
		</el-dialog>

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

		<div class="selectBox" v-if="hasQx('stu:qc:submitAnswer')">
			<el-row>
				<el-button type="primary" @click="submitInfo">提交</el-button>
			</el-row>	
		</div>

	</div>
</template>

<script>
import { dialog } from '@/common/dialog'   //警告提示
import baseUrl from '@/apiconfig'
export default {
    name:'TestPaper',
    data(){
        return {
			headTitle:				'',
			titile:					'',
			qbDesc:					'',
			score:					'',
			totalNum:				'',
			qbId:					'',
			questType:				'',
			img_api: 				baseUrl.img_api,//路径
			stTime:					'',//开始
			edTime:					'',//结束
			startTime:				'',//用来存全局返回时间
			endTime:				'',//用来存全局返回时间
			endLastTime:				'',
			usedTime:				0,//做题用的时间 秒数 ， 考试，考核，比赛时，必填
			answerList:				[],
			qcList:					[],
			sinData:				[],//单选数据
			mulData:				[],//多选数据
			JudData:				[],//判断数据
			comData:				[],//填空数据
			DisData:				[],//论述数据
			every0:					'',//每个单选分
			every1:					'',//每个多选分
			every2:					'',//每个判断分
			every3:					'',//每个填选分
			every4:					'',//每个论选分	
			subjectName:			'',	
			sublevel:				'',
			targetImg:				'',	
			allQuesNum:				[],
			countNums:				'',//倒计时
			dialogTableVisible: 	false,//确定交卷弹窗
			countNumsFlg:			true,
			imgDialogVisible:		false,
			clock:					'',//定义全局计时器
			myX:					'',
			tempTT:					''
        }
	},
	methods: {
		goBack(){
			this.$router.back(-1)
		},
		showImages(){
			this.targetImg = event.target.getAttribute('src')
			this.imgDialogVisible=true
		},
		onpaste(){
			// questType:				0, //0-日常练习 1-技能考证 2-考核 3-作业 4-比赛题
			if (this.isIos()) {

			}else{
				if(this.questType==1||this.questType==2||this.questType==4){
					return 'return false'
				}
			}
			
		},
		oksubmit(x){
			this.myX =x
			this.submitInfo(this.myX)
		},
		CurentTime(){ 
			var now = new Date()
			var year = now.getFullYear()       //年
			var month = now.getMonth() + 1    //月
			var day = now.getDate()           //日
			var hh = now.getHours()            //时
			var mm = now.getMinutes()          //分
			var clock = year + "-"
			if(month < 10)
				clock += "0"
			clock += month + "-"
			if(day < 10)
				clock += "0"
			clock += day + " "
			if(hh < 10)
				clock += "0"
			clock += hh + ":"
			if (mm < 10) clock += '0'
			clock += mm 
			return(clock)
		},
		async getList(){//获取单选题列表
			this.qbId=this.$route.query.qbId
			//获取科目
			let params = {qbId:this.qbId},newList=[],sinData=[],mulData=[],JudData=[],comData=[],DisData=[]
			const res = await this.$axios.getTestPaperDetail(params)
			if(res.code===1100){
				this.dialog(res.message)
			}
			if(res.code ===1000){
				let itemListArr = res.data.qcOptionList
				this.titile= res.data.titile
				this.qbDesc= res.data.qbDesc
				this.startTime= res.data.startTime
				this.endLastTime = res.data.endTime
				
				//考核 和 比赛 2.4
				if(this.questType==2||this.questType==4){
					this.endTime= this.dayjs(res.data.endTime).format('HH:mm')
				}else{
					this.endTime= res.data.endTime
				}
				
				this.subjectName = res.data.subjectName?res.data.subjectName:''
				this.sublevel =res.data.level?res.data.level:''
				this.score= res.data.score
				this.totalNum= res.data.totalNum

				this.qcList = res.data.qcList

				
				// console.log(this.qcList)
				this.qcList.forEach(function(item,index){
					let itemobj = {}
					itemobj.qcId =item.qcId
					itemobj.qcDesc = item.qcDesc
					itemobj.orderNum = item.orderNum
					itemobj.type = item.type
					itemobj.qcPic = item.qcPic
					itemobj.qcScore = item.qcScore
					itemobj.arr=[]
					itemListArr.forEach(function(v,i){
						let vobj = {}
						vobj.itemDesc = v.optionName
						vobj.item = v.optionValue			
						vobj.qcId = v.qcId			
						if(v.qcId==item.qcId){
							itemobj.arr.push(vobj)
						}
					})
					newList.push(itemobj)
				})
				// console.log(newList)
				//给单选多选填空等赋值
				let aa1,aa2,aa3,aa4,aa5
				newList.forEach(function(v,i){
					if(v.type==0){
						sinData.push(v)
						aa1=v.qcScore
					}else if(v.type==1){
						mulData.push(v)
						aa2=v.qcScore
					}else if(v.type==2){
						JudData.push(v)
						aa3=v.qcScore
					}else if(v.type==3){
						comData.push(v)
						aa4=v.qcScore
					}else if(v.type==4){
						DisData.push(v)
						aa5=v.qcScore
					}
					// v.type==0?sinData.push(v):v.type==1?mulData.push(v):v.type==2?JudData.push(v):v.type==3?comData.push(v):v.type==4?DisData.push(v):'无解'
				})
				this.every0 = aa1,this.every1 = aa2,this.every2 = aa3,this.every3 = aa4,this.every4 = aa5
				this.sinData=sinData
				this.mulData=mulData
				this.JudData=JudData
				this.comData=comData
				this.DisData=DisData

				/***************论述题拆分图片*****************/
				let ansData=[]
				this.DisData.forEach(function(vv,ii){
					if(vv.qcPic){
						ansData=vv.qcPic.split("ψ")
						let newAns=[]
						for(let i=0;i<ansData.length;i++){
							if(ansData[i].length>0){
								newAns[i] = ansData[i]
								// console.log(ansData[i])
							}
						}
						vv.imgArr = newAns
					}
				})
				// console.log(this.DisData)
				/*******************论述题end********************/

				let nn=0	
				if(this.sinData.length>0){
					nn++
					this.allQuesNum[0]=nn
				}
				if(this.mulData.length>0){
					nn++
					this.allQuesNum[1]=nn
				}
				if(this.JudData.length>0){
					nn++
					this.allQuesNum[2]=nn
				}
				if(this.comData.length>0){
					nn++
					this.allQuesNum[3]=nn
				}
				if(this.DisData.length>0){
					nn++
					this.allQuesNum[4]=nn
				}

				//计算出时间差
				// console.log(this.countTime(new Date(this.startTime),new Date(this.endLastTime)))
				//考核 和 比赛 2、4
				if(this.questType==2||this.questType==4){
					//执行计时器
					this.countFun(this.countTime(res.data.serverTime,this.endLastTime))
				}

				// console.log(mulData)
				// console.log(JudData)
				// console.log(comData)
				// console.log(DisData)	
			}
		},
		//最后提交数据 如果有参数，直接交卷的x==1
		async submitInfo(myX){
			let ywkData ={
				qbId:this.qbId,
				usedTime:this.usedTime,
				answerList:this.answerList
			}
			
			//遍历数组赋值
			let itemobj = {},newList=[]

			/*****************单选题****************/
			let tempSin
			this.sinData.forEach(function(v,i){
				let itemobj0={}
				itemobj0.qcId =v.qcId
				// console.log(v.answers)
				if(v.answers==undefined){
					tempSin=true
				}else{
					itemobj0.qcAnswer =v.answers.toString()
				}
				// itemobj0.qcAnswer =v.answers
				newList.push(itemobj0)
			})
			/*
			if(tempSin){
				this.dialog('单选题还有未选的哦！')
				tempSin=false
		        // return false
			}
			*/
			// console.log(this.sinData)
			/*****************单选题end****************/	

			/*****************多选题****************/
			this.mulData.forEach(function(v,i){
				let itemobj1={}
				itemobj1.qcAnswer=''
				itemobj1.qcId =v.qcId
			
				v.arr.forEach(function(val,index){
					let ans=''
					ans = val.answersl
					// console.log(ans)  这里有个坑，一定要定义变量去赋值，不能操作 model
					if(ans==''||ans==undefined){
						ans=false
					}
					itemobj1.qcAnswer+=	ans+'ψ'
				})
				itemobj1.qcAnswer=itemobj1.qcAnswer.substring(0,itemobj1.qcAnswer.length-1)
				newList.push(itemobj1)
			})
			//  console.log(this.mulData)
			/*****************多选题end****************/


			/*****************判断题****************/
			let tempJud
			this.JudData.forEach(function(v,i){
				let itemobj2={}
				itemobj2.qcId =v.qcId
				// itemobj2.qcAnswer =v.answers

				if(v.answers==undefined){
					tempJud=true
				}else{
					itemobj2.qcAnswer =v.answers.toString()
				}
				newList.push(itemobj2)
			})
			/*
			if(tempJud){
				this.dialog('判断题还有未选的！')
				tempJud=false
		        // return false
			}
			*/
			/*****************判断题end****************/			


			/*****************填空题****************/	
		
			let tempCom
			this.comData.forEach(function(v,i){
				let itemobj3={}
				itemobj3.qcAnswer=''
				itemobj3.qcId =v.qcId
				v.arr.forEach(function(val,index){
					if(val.qcAnswer){
						itemobj3.qcAnswer+=	val.qcAnswer+'ψ'
					}else{
						tempCom=true
					}
				})
				itemobj3.qcAnswer=itemobj3.qcAnswer.substring(0,itemobj3.qcAnswer.length-1)
				// console.log(itemobj3.qcAnswer)
				newList.push(itemobj3)
			})
			/*
			if(tempCom){
				this.dialog('填空题未填！')
				tempCom=false
				// return false
			}
			*/
			// console.log(this.comData)
			// return false			
			/******************填空题end***************/


			/*****************论述题****************/	
			let tempDis
			this.DisData.forEach(function(v,i){
				let itemobj4={}
				itemobj4.qcId =v.qcId
				if(v.qcAnswer){
					itemobj4.qcAnswer =v.qcAnswer	
				}else{
					tempDis=true
				}
				newList.push(itemobj4)
			})
			/*
			if(tempDis){
				this.dialog('论述题未填！')
				tempDis=false
				// return false
			}
			*/
			// console.log(this.DisData)			
			/*****************论述题end****************/	

			//把时间差传过去
			this.edTime = new Date()
			// console.log(this.countTime(this.stTime,this.edTime))
			// return false
			
			ywkData.usedTime = this.usedTime
			//传集合回去
			ywkData.answerList=newList

			
			
			let res
			//如果有参数，直接交卷的x==1,0考虑一下
			if(myX==1){
				res = await this.$axios.studentSubmitAnswers(ywkData)
				this.myX=''
			}else if(myX==0){
				this.dialogTableVisible = false
				return false
			}else{
				if(tempSin||tempJud||tempCom||tempDis){
					this.dialogTableVisible = true
					return false
					// if (confirm('你还有题没填，确定要交卷吗')==true){ 
					// 	res = await this.$axios.studentSubmitAnswers(ywkData)
					// }else{ 
					// 	return false
					// } 
				}else{
					res = await this.$axios.studentSubmitAnswers(ywkData)
					this.myX=''
					window.clearInterval(this.clock)
				}
			}
			
			if(res.code===1000){
				if(this.questType==0||this.questType==1){  //日常练习、技能考证
					this.$router.push({path:"/Questions"}) 
					this.successMsg('练习结束!')
				}else if(this.questType==2){ //考核
					this.$router.push({path:"/TeachPass"}) 
					this.successMsg('考核结束!')
				}else if(this.questType==3){ //作业
					this.$router.push({path:"/TeachTask"})
					this.successMsg('作业结束!')
				}else if(this.questType==4){ //比赛
					this.$router.back(-1)
					this.successMsg('比赛结束!')
				}
			}else if(res.code===1100){
				this.dialog(res.message)
			}
		},
		//计算时间差
		countTime(s,e){
			var date3=Date.parse(new Date(e.replace(/-/g,'/')))-Date.parse(new Date(s.replace(/-/g,'/')))  //时间差的毫秒数
			// var date3=e.getTime()-s.getTime()  //时间差的毫秒数
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
			// return (days+hours+minutes+seconds)
			let times= hours*3600+minutes*60+seconds
			if(times>10){//服务时间差
				times=times-5
			}else{
				times=times
			}
			return times
			// console.log(hours*3600+minutes*60+seconds)
			// console.log(" 相差 "+days+"天 "+hours+"小时 "+minutes+" 分钟"+seconds+" 秒")
		},
		//计时器
		countFun(x){ //x是总秒数
			this.clock = window.setInterval(() => {
				x--
				if (x == 600) {     //当倒计时小于600S时 10分钟提醒 一下交卷了
					// this.dialog('10分钟后自动交卷')
					// this.countNumsFlg=true
				}
				if (x < 600) {     //当倒计时小于600S时 10分钟提醒 一下交卷了
					// this.dialog('10分钟后自动交卷')
					// this.countNumsFlg=true
				}
				// if(x==180){
				// 	this.dialog('3分钟后自动交卷！')
				// 	this.submitInfo(1)//交卷函数,传参数1是直接交卷
				// 	window.clearInterval(clock)
				// }
				if(x==9){
					this.myX = 1
					this.submitInfo(this.myX)//交卷函数,传参数1是直接交卷
					window.clearInterval(this.clock)
					this.countNumsFlg=false
				}
this.tempTT = x
				//计算出相差天数
				var days=Math.floor(x/(24*3600))
				//计算出小时数
				var leave1=x%(24*3600)    //计算天数后剩余的毫秒数
				var hours=Math.floor(leave1/(3600))
				//计算相差分钟数
				var leave2=leave1%(3600)        //计算小时数后剩余的毫秒数
				var minutes=Math.floor(leave2/(60))
				//计算相差秒数
				var leave3=leave2%(60)      //计算分钟数后剩余的毫秒数
				var seconds=Math.round(leave3)
				this.usedTime++	
				this.countNums=hours+'时'+minutes+'分'+seconds+'秒'
				// console.log(this.usedTime)
			},1000)
		}
	},
	mounted() {
		this.stTime = new Date()
		// console.log(this.CurentTime())
		this.getList()
		this.questType=this.$route.query.questType
		this.questType==0?this.headTitle='日常练习':this.questType==1?this.headTitle='技能考证':this.questType==2?this.headTitle='考核':this.questType==3?this.headTitle='作业':this.questType==4?this.headTitle='比赛':'无解'
		
		
		// if(this.hasQx('stu:qc:detail')){
		    
		// }else{
		//     this.dialog('您无权进行该操作');/*  */
		//     this.$router.back(-1)
		// }   
	}
}
</script>


<style lang="stylus">
.testPaper
	background :#eee
	.classKill 
		user-select: none; 
		-webkit-user-select:none;
		-moz-user-select:none;
		-ms-user-select:none;
	.headBox
		background :#fff
		margin-top:40px
		padding 0 30px 50px 30px
		color:#909399
		h3
			color #333
			font-size:36px
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
		.el-radio__inner
			height 40px
			width 40px
			border 2px solid #dcdfe6
		.el-radio__inner:after 
			width 15px
			height 15px
		.el-radio,.el-checkbox
			display inline-block
			margin-bottom 50px
		.el-radio+.el-radio
			margin-left 0				
	.selectBox
		margin-top 30px
		background #fff
		border-bottom 4px solid #ddd
		padding 0 30px 0 30px
		h3
			line-height 70px
			font-size 36px
			font-weight 900
		.timuBox
			.timu
				margin-bottom 1%
				h4
					font-weight 300;
					line-height 60px;
					font-size 32px;
					color #303133;
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
					margin-left 0px	
	.continputBox
		p
			margin-bottom 30px;
			.inputTox
				height 70px;
				line-height 70px;
				padding-left 50px;
				width: 79%;
				border: 2px solid #eee;				
		textarea
			height: 200px 
			border: 2px solid #ddd
			width: 90%
			margin-top 20px
	.el-button--primary
		width 90%
		height 90px
		display block
		margin 20px auto
	.mt
		margin-top 30px
	.mr
		margin-right 20px
	.pb
		padding-bottom 20px	
	.line
		border-bottom 2px solid #eee 
	.CountFun
		height 120px
		background #E6A23C
		width 180px
		position fixed
		right 0
		top 7%
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
				font-size 26px	
	.success-dialog
		.content
			text-align center
			img
				width 100px
				height 100px
			.name
				color #000
				font-size 36px
				font-weight bold
				margin 20px 0
			.time
				color #909399
				margin 50px 0
			.button-items
				text-align center
				.el-button
					padding 30px 0
					width 40%
					font-size 30px							
</style>