<!-- 
* name: 考试答题
* author: fjd
* time: 2018-7-31
-->
<template>
    <div class="AnsderDetail">
		<!-- 导航 --> 
        <Header :title='headTitle' @goBack="goBack"></Header>
		<div class="headBox">
			<h3>{{titile}}</h3>
			<p class="comCol mt" style="height:10px"><template v-if="startTime&&endTime">考试时间：{{startTime}} - {{endTime}}</template></p>
			<div class="score mt">
				<p><span class="comCol comWeight mr">{{every0*sinData.length+every1*mulData.length+every2*JudData.length+every3*comData.length+every4*DisData.length}}</span> <span class="comCol comWeight">{{totalNum}}</span></p>	
				<p><span class="mr">卷面分数</span> <span>题目总数</span></p>
			</div>
			<p class="mt" v-if="subjectName">
				科目：{{subjectName}}
			</p>
			<p>
				描述：{{qbDesc}}
			</p>
			<!-- 作业、考核、比赛显示	 -->
			<div class="scoresAll" v-show="questType==2||questType==3||questType==4">
				<span class="sc"> 
					<template v-if="examStatus==0||examStatus==1"><b style="font-size:28px" id="myScoresAll">未批卷</b></template>
					<template v-if="examStatus==2">{{scoreAll}}</template>
				</span>
				<span>总得分</span>
			</div>	
		</div>

		<div class="selectBox Single" v-if="sinData.length>0">
			<h3 class="line">
				<span style="float:right;color:#e7a848;margin-right:1%">{{scoreA0}}分</span>	
				{{allQuesNum[0]}}、单选题（每题{{every0}}分，合计{{every0*sinData.length}}分）</h3>
			<div class="contentBox">
				<div class="timuBox" v-for="(item,index) in sinData" :key="index">
					<div class="timu" >
						<h4>
							<span style="float:right;color:#e7a848;margin-right:1%">{{item.qcScore}}分</span>
							{{index+1}}、{{item.qcDesc}}
						</h4>
						<el-radio-group v-for="(itec,ii) in item.arr" :key="ii" v-model="item.qcAnswer">
							<!-- currentIndex(itecM.qcAnswer,itecM.qcStAnswer)===true -->
							<el-radio disabled :label="ii" :class="{'active':item.stuAnswer===ii}" >{{itec.item}}、{{itec.itemDesc}}</el-radio>
						</el-radio-group>
					</div>
				</div>	
			</div>
		</div>
		<div class="selectBox" v-if="mulData.length>0">
			<h3 class="line">
				<span style="float:right;color:#e7a848;margin-right:1%">{{scoreA1}}分</span>
				{{allQuesNum[1]}}、多选题下列题目中至少有2个及以上的正确题目，多选少选均不得分（每题{{every1}}分，合计{{every1*mulData.length}}分）</h3>
			<div class="contentBox">
				<div class="timuBox" v-for="(item,index) in mulData" :key="index">
					<div class="timu" >
						<h4>
							<span style="float:right;color:#e7a848;margin-right:1%">{{item.qcScore}}分</span>
							{{index+1}}、{{item.qcDesc}}
						</h4>
						<el-checkbox-group v-for="(itecM,ii) in item.arr" :key="ii" v-model="itecM.qcAnswer">
							<!-- 答案相等给类 -->
							<el-checkbox disabled :label="itecM.qcId" :class="{'active':currentIndex(itecM.qcAnswer,itecM.qcStAnswer)===true}">{{itecM.item}}、{{itecM.itemDesc}} </el-checkbox>
						</el-checkbox-group>
					</div>
				</div>	
			</div>
		</div>
		<div class="selectBox Single" v-if="JudData.length>0">
			<h3 class="line">
				<span style="float:right;color:#e7a848;margin-right:1%">{{scoreA2}}分</span>
				{{allQuesNum[2]}}、判断题（每题{{every2}}分，合计{{every2*JudData.length}}分）</h3>
			<div class="contentBox">
				<div class="timuBox" v-for="(item,index) in JudData" :key="index">
					<div class="timu" >
						<h4>
							<span style="float:right;color:#e7a848;margin-right:1%">{{item.qcScore}}分</span>
							{{index+1}}、{{item.qcDesc}}
						</h4>
						<el-radio-group v-for="(itec,ii) in item.arr" :key="ii" v-model="item.qcAnswer">
							<el-radio disabled :label="ii" :class="{'active':item.stuAnswer===ii}">{{itec.item}}、{{itec.itemDesc}}</el-radio>
						</el-radio-group>
					</div>
				</div>
			</div>	
		</div>	
		<div class="selectBox" v-if="comData.length>0">
			<h3 class="line">
				<span style="float:right;color:#e7a848;margin-right:1%">{{scoreA3}}分</span>
				{{allQuesNum[3]}}、填空题（每题{{every3}}分，合计{{every3*comData.length}}分）</h3>
			<div class="contentBox">
				<div class="timuBox" v-for="(item,index) in comData" :key="index">
					<div class="timu line">
						<h4>
							<template v-if="examStatus==0||examStatus==1"> <!-- 不为2的时候显示 -->
								<span class="editBtn" style="float:right;color:#409EFF" @click="editAnswersScore(item.qcId,item.qcDesc,item.teachScore,item.teachComment,every3)" v-if="hasQx('teach:examComment:add')"> 
									<template v-if="item.teachScore">修改评分</template> 
									<template v-else>人工评分</template>
								</span>
							</template>

							<span style="float:right;color:#e7a848;margin-right:1%" class="teachScore">
								<template v-if="item.teachScore">{{item.teachScore}}分</template>
							</span>
							{{index+1}}.{{item.qcDesc}}
						</h4>
						<div class="continputBox">
							<p v-for="(itec,index) in item.arr" :key="index"> 
								<template v-if="itec.answersl">
									<span>( {{index+1}} )</span> 
									<span class="trueColor" style="color:#999"> <b style="color:#000">{{itec.stuAnswer}}</b> （正确答案：{{itec.answersl}}） </span>
								</template>
							</p>
							<p class="teachComment"> <template v-if="item.teachComment">评语：{{item.teachComment}}</template> </p>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="selectBox" v-if="DisData.length>0">
			<h3 class="line">
				<span style="float:right;color:#e7a848;margin-right:1%">{{scoreA4}}分</span>
				{{allQuesNum[4]}}、论述题（每题{{every4}}分，合计{{every4*DisData.length}}分）
			</h3>
			<div class="contentBox">
				<div class="timuBox" v-for="(item,index) in DisData" :key=index>
					<div class="timu line">
						<h4>
							<template v-if="examStatus==0||examStatus==1"> <!-- 不为2的时候显示 -->
								<span class="editBtn" style="float:right;color:#409EFF" @click="editAnswersScore(item.qcId,item.qcDesc,item.teachScore,item.teachComment,every4)" v-if="hasQx('teach:examComment:add')"> 
									<template v-if="item.teachScore">修改评分</template> 
									<template v-else>人工评分</template>
								</span>
							</template>
							<span style="float:right;color:#e7a848;margin-right:1%" class="teachScore">
								<template v-if="item.teachScore">{{item.teachScore}}分</template>
							</span>
							{{index+1}}.{{item.qcDesc}}
						</h4>
						
						<div class="continputBox">
							<div>
								<span  v-for="(v,i) in item.imgArr" :key="i" style="vertical-align: top;display: inline-block;margin-right:0.5%">
									<img :src="img_api+v" style="width:100px" @click="showImages" />
								</span>
							</div>
							<p style="font-size:14px"><span style="color:#000">答案：</span>{{item.stuAnswer}}</p>
							<p style="font-size:14px;color:#999"><span>（正确答案：</span>{{item.qcAnswer}}）</p>
							<p class="teachComment"> <template v-if="item.teachComment">评语：{{item.teachComment}}</template> </p>
						</div>
					</div>
				</div>
			</div>
		</div>
		
		<!-- 状态为老师或已批倦 -->
		<template v-if="statusM==0">
			<div class="addScore" v-if="examStatus==1||examStatus==0">
				<el-button type="primary" @click="AddScore" style="width:95%" v-if="questType==2||questType==3||questType==4">提交</el-button>
			</div>
		</template>
		
			
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
				<el-button type="primary" @click="imgDialogVisible = false" style="width:100%">确 定</el-button>
			</span>
		</el-dialog>

		<el-dialog title="人工评分" :visible.sync="showAdd">
			<p style="color:#ccc">标题:{{pfTitle}}</p>
            <el-form :model="form">
                <div>
					<p>评分<b style="color:red">*</b></p>
                    <input type="text" style="width: 99%;padding: 8px 0 8px 3px;border: 1px solid #ddd;" v-model="form.formScore" />
                </div>
				<div style="margin-top:2%">
					<p>评语</p>
                    <el-input v-model="form.pContent" maxlength=20 type="textarea" :autosize="{ minRows: 2, maxRows: 4}"  placeholder="评语" >
                    </el-input>
                </div>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="AddInfo" style="width:47%">确 定</el-button>
				<el-button @click="showAdd = false" style="width:47%">取 消</el-button>
            </div>
        </el-dialog>

	</div>
</template>

<script>
import baseUrl from '@/apiconfig'
export default {
    name:'AnsderDetail',
    data(){
        return {
			headTitle:				'',
			edit:					'',//用数字9标识，有9就可以修改评分
			titile:					'',
			qbDesc:					'',
			startTime:				'',
			endTime:				'',
			score:					'',
			totalNum:				'',
			showAdd:				false,
			imgDialogVisible:		false,
			img_api: 				baseUrl.img_api,//路径
			targetImg:				'',
			pfTitle:				'',
			tempTarget:				'',//用于改分临时存的标签
			tempScore:				'',//用于改分临时
			tempCont:				'',	//用于改内容临时
			scoreAll:				'',//用于总分
			examStatus:				'',//考试状态 0-考试中 1-已提交 2-已批卷
			questType:				'',	
			statusM:				'',
			form: {
				formScore:'',
				pContent: ''
			},
			questId:				'',//试题id
			qbId:					'',//考试卷子ID
			examId:					'',//试卷ID
			qcList:					[],
			scoreA0:				0,//单选总分
			scoreA1:				0,//多选总分
			scoreA2:				0,//判断总分
			scoreA3:				0,//判断总分
			scoreA4:				0,//判断总分
			sinData:				[],//单选数据
			mulData:				[],//多选数据
			JudData:				[],//判断数据
			comData:				[],//填空数据
			DisData:				[],//论述数据
			every0:					0,//每题多少分
			every1:					0,//每题多少分
			every2:					0,//每题多少分
			every3:					0,//每题多少分
			every4:					0,//每题多少分	
			tempSc:					'',
			allQuesNum:				[],//记录每个大题的索引
			subjectName:			'',//科目
			stuExamId:				''
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
		//搞局的方法 
		currentIndex(x,y){
			//学生答案为true就为 高亮,x正确，y学生
			if(x==y){
				return false
			}else if(x!=y){
				if(y==false){
					return true
				}else if(y==true){
					return true
				}
			}
			// itecM.qcAnswer==itecM.qcStAnswer==true
		},
		editAnswersScore(x,y,z,o,p){  //X 是试题ID，y内容，z分数,o评语,p每题多少分做判断
			this.questId =x
			//解除封印
			this.showAdd = true
			if(y.length>0){
				this.pfTitle = y
			}
			this.tempSc = p
			
			this.form.formScore=''
			this.form.pContent=''

			this.tempTarget = event.target.parentNode
			// console.log(this.tempTarget.parentNode.getElementsByClassName('editBtn')[0])
		},
		async AddScore(){
			// let stuId=this.$route.query.stuId,stuExamId=this.$route.query.stuExamId
			let params = {stuId:this.$route.query.stuId,stuExamId:this.stuExamId}
			const res = await this.$axios.addExamworkComment(params) 
			if(res.code===1000){
				this.successMsg('改卷成功!')
				this.$router.back(-1)
			}else{
				this.dialog('改卷没成功!再试一次或者联系管理员')
			}
		},
		async AddInfo(){
			if(this.form.formScore==''){
				this.dialog('分数必填!')
			}else if (isNaN(this.form.formScore))
			{
				this.dialog('请填数字!')
			}
			// console.log(Number(this.form.formScore))

			if(Number(this.form.formScore)>Number(this.tempSc)){
				this.dialog('分数不能大于 每题规定的分数!')
				return false
			}

			/*
			stuExamId	是	string	学生考核(作业/比赛)记录表id
			questId	是	string	试题id
			teachScore	是	string	老师评分
			teachComment
			*/
			let params = {questId:this.questId,teachScore:this.form.formScore,teachComment:this.form.pContent,stuExamId:this.$route.query.stuExamId}
			
			params.stuExamId = this.stuExamId
			const res = await this.$axios.addExamComment(params) 
			if(res.code===1000){
				this.tempTarget.children[1].innerHTML=this.form.formScore+"分"
				this.tempTarget.parentNode.getElementsByClassName('editBtn')[0].innerHTML='修改评分'
				this.tempTarget.parentNode.getElementsByClassName('teachComment')[0].innerHTML = '评语：'+this.form.pContent
				this.tempScore =this.form.formScore
				this.tempCont =this.form.pContent
				this.showAdd= false
				this.successMsg('改分成功!')
				//执行分数循环
				this.getList()
			}
		},
		async getList(){//获取单选题列表
			let stuId=this.$route.query.stuId
			let params = {qbId: this.qbId,examId:this.examId,stuId:stuId},newList=[],sinData=[],mulData=[],JudData=[],comData=[],DisData=[]
			const res = await this.$axios.getCommitExamInfo(params),itemListArr = res.data.qcOptionList,qcStuList=res.data.qcStuList //学生答案
			// console.log(res)
			if(res.data.qcStuList.length<=0||res.data.qcList.length<=0){
				this.dialog('暂无学生答题!')
				this.$router.back(-1)
			}

			this.subjectName = res.data.subjectName
			this.stuExamId = res.data.stuExamId
			this.titile= res.data.title
			this.qbDesc= res.data.qcDesc
			this.startTime= res.data.startTime
			this.endTime= res.data.endTime
			this.score= res.data.score
			this.totalNum= res.data.orderNum
			this.examStatus =res.data.examStatus

			this.qcList = res.data.qcList
			// console.log(this.qcList)
			this.qcList.forEach(function(item,index){
				let itemobj = {}
				itemobj.qcId =item.qcId
				itemobj.qcDesc = item.qcDesc
				itemobj.orderNum = item.orderNum
				itemobj.type = item.type
				itemobj.qcPic = item.qcPic
				itemobj.qcAnswer = item.qcAnswer
				itemobj.qcScore = item.qcScore
				
				itemobj.arr=[]

				//字段存学生答案,分数
				itemobj.stuAnswer=''
				itemobj.teachScore=''
				itemobj.teachComment=''
				

				qcStuList.forEach(function(v,i){
					if(v.qcId==item.qcId){
						itemobj.stuAnswer = v.stuAnswer
						itemobj.teachScore =v.teachScore
						itemobj.teachComment=v.teachComment
					}
				})

				//循环学生答案
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
			newList.forEach(function(v,i){
				v.type==0?sinData.push(v):v.type==1?mulData.push(v):v.type==2?JudData.push(v):v.type==3?comData.push(v):v.type==4?DisData.push(v):'无解'
			})
			this.sinData=sinData
			this.mulData=mulData
			this.JudData=JudData
			this.comData=comData
			this.DisData=DisData

			let a=0,b=0,c=0,d=0,e=0,answers=[],qcPic=[],stuAnswers=[],tempSc=''
			this.sinData.forEach(function(vv,ii){
				tempSc = vv.qcScore
				//字符串转数字答案才出来
				vv.qcAnswer=parseInt(vv.qcAnswer)
				vv.stuAnswer=parseInt(vv.stuAnswer)
				// 统计得分
				if(vv.qcAnswer===vv.stuAnswer){
					a+=vv.qcScore
				}else{
					vv.qcScore=0
				}
			})
			this.every0 = tempSc
			// console.log(this.sinData)

			this.mulData.forEach(function(vv,i){
				tempSc = vv.qcScore
				//吧答案拆分
				answers=vv.qcAnswer.split("ψ"),stuAnswers=vv.stuAnswer.split("ψ")
				vv.arr.forEach(function(v,i){
					if(answers[i].length>0){
						answers[i]=='true'?v.qcAnswer=true:v.qcAnswer=false
					}
					if(stuAnswers[i].length>0){
						stuAnswers[i]=='true'?v.qcStAnswer=true:v.qcStAnswer=false
					}
					// 给分数赋值
					if(v.qcAnswer!=v.qcStAnswer){
						vv.qcScore=0
					}
				})
				b+=vv.qcScore
			})
			this.every1 = tempSc

			this.JudData.forEach(function(vv,ii){
				tempSc = vv.qcScore
				//字符串转数字答案才出来
				vv.qcAnswer=parseInt(vv.qcAnswer)
				vv.stuAnswer=parseInt(vv.stuAnswer)
				// 统计得分
				if(vv.qcAnswer===vv.stuAnswer){
					c+=vv.qcScore
				}else{
					vv.qcScore=0
				}
			})
			this.every2 = tempSc

			this.comData.forEach(function(vv,i){
				tempSc = vv.qcScore
				// d+=vv.qcScore
				if(vv.teachScore){
					d+=Number(vv.teachScore) 
				}
				//吧答案拆分
				answers=vv.qcAnswer.split("ψ"),stuAnswers=vv.stuAnswer.split("ψ")
				
				if(answers.length>0){
					// vv.arr=[]
					answers.forEach(function(v,i){
						if(v.length>0){
							let vobj = {}
							if(stuAnswers.length>0){
								// vv.arrSt=[]
								stuAnswers.forEach(function(vv,ii){
									if(v.length>0){
										if(i==ii){
											vobj.stuAnswer=vv
										}
										// let vobj = {}
										// vobj.stuAnswers = v
										// vv.arrSt.push(vobj)
									}
								})
							}
							vobj.answersl = v
							vv.arr.push(vobj)
						}
					})
				}
				//再来一重循环去掉没答案的填空
				let y =0
				vv.arr.forEach((val,ind)=>{
					if(val.answersl==''||val.answersl==undefined){
						y++
					}			
				})
				vv.arr.splice(0,y)
			})
			this.every3 = tempSc
			// console.log(this.sinData)
			// console.log(this.mulData)	
			// console.log(this.JudData)	
			// console.log(this.comData)	
			// console.log(this.DisData)	


			/***************论述题拆分图片*****************/

			// console.log(this.DisData)	
			let ansData=[]
			this.DisData.forEach(function(vv,ii){
				tempSc = vv.qcScore
				if(vv.teachScore){
					e+=Number(vv.teachScore)
				}
				
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
			this.every4 = tempSc

			this.scoreA0 =a
			this.scoreA1 =b
			this.scoreA2 =c
			this.scoreA3 =d
			this.scoreA4 =e
			this.scoreAll= a+b+c+d+e
			// console.log(this.scoreAll+'end')

			if(Number(this.examStatus)==1||Number(this.examStatus)==0){
				if(document.getElementById('myScoresAll')!=undefined){
					// -examStatus	String	考试状态 0-考试中 1-已提交 2-已批卷
					document.getElementById('myScoresAll').innerHTML = this.scoreAll
				}
			}

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
			// console.log(this.allQuesNum)
			/*******************论述题end********************/
			// console.log(comData)
			// console.log(mulData)
			// console.log(JudData)
			// console.log(comData)
			// console.log(DisData)
		}
	},
	mounted() {
		this.qbId=this.$route.query.qbId
		this.examId=this.$route.query.examId
		//如果是9就显示可以编辑
		// this.edit=this.$route.query.edit
		if(localStorage.getItem("userType") == 0) { //老师 
			this.statusM = 0
			this.edit=true
		}else if(localStorage.getItem("userType") == 1) { //学生 
			this.statusM = 1
			this.edit=false
		}
		
		this.getList()
		this.questType=Number(this.$route.query.questType)
		this.questType==0?this.headTitle='日常练习':this.questType==1?this.headTitle='技能考证':this.questType==2?this.headTitle='考核':this.questType==3?this.headTitle='作业':this.questType==4?this.headTitle='比赛':'无解'
	}
}
</script>


<style lang="stylus">
.AnsderDetail
	background #eee
	.headBox
		background #fff
		margin-top 40px
		padding 0 30px 50px 30px
		color #909399
		position relative
		.scoresAll
			height 170px
			width 170px
			position absolute
			right 15%
			top 10%
			text-align center
			color #E6A23C
			border-radius 500px
			border 3px solid #E6A23C
			.sc
				font-size 80px
				margin-top 2%
				margin-bottom -5%
				display block
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
			.active
				color red
				.el-radio__label
					color red
			.is-checked
				.el-radio__inner	
					background-color #67c23a	
				.el-radio__label
					color #67c23a		
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
				.is-checked
					.el-checkbox__label
						color #67c23a	
				.active
					color red
					.el-checkbox__label
						color red		
				.el-checkbox
					margin-right :15px;
					margin-top:30px
					.is-checked
						.el-checkbox__label
							color #67c23a
						.el-checkbox__inner
							width 45px
							height 45px
							border 3px solid #ddd
							background-color #67c23a
					.el-checkbox__inner
						width 45px
						height 45px
						border 3px solid #ddd
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
	.addScore
		margin: 0px auto
		text-align: center
		background: #fff
		margin-top: 20px
		padding: 2%
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
			border: 1px solid #ddd
			width: 90%
			margin-top 20px
	.el-dialog__header
		text-align center			
		.el-dialog__title
			font-size 40px
			font-weight 900		
	.mt
		margin-top 30px
	.mr
		margin-right 20px
	.pb
		padding-bottom 20px	
	.line
		border-bottom 1px solid #eee 	
	.active
		color red		
</style>