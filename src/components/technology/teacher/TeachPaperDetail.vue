<!-- 
* name: 老师版获取试题详情，只做查看不能修改
* author: fjd
* time: 2018-8-29
-->
<template>
    <div class="TeachPaperDetail">
		<!-- 导航 --> 
		<Header :title='typeTitle' @goBack="goBack"></Header>
		<div class="showPaper" v-if="showPaperShow">
			<div class="head">
				<div class="headBox">
					<div class="head-div">
						<div class="head-title">试题标题<i class="tip">*</i></div>
						<input disabled v-model="questBankTitle" placeholder="题目描述" style="padding-left:1%" />
					</div>
					<div class="head-div">
						<div class="head-title">描述<i class="tip">*</i></div>
						<el-input disabled v-model="questDesc" maxlength=36 type="textarea" :autosize="{ minRows: 2, maxRows: 4}"  placeholder="请输入题目描述，最多36个字" >
						</el-input>
					</div>
					<!-- 复选框 -->
					<div class="head-div" v-if="checkClass!=0">
						<div class="head-title">专业班级<i class="tip">*</i></div>				
						<div style="width:75%">							
							<el-checkbox-group v-for="(itec,ii) in classList" :key="ii"  v-model="checkClass">
								<template v-if="checkClass.indexOf(itec.classId)!=-1">
									<el-checkbox disabled :label="itec.classId" >{{itec.className}}</el-checkbox>
								</template>
							</el-checkbox-group>
						</div>
					</div>	
					<div class="head-div">
						<div class="head-title">试卷分值<i class="tip">*</i></div>
						<input v-model="checkScore" disabled placeholder="0" style="width:23%" />
						<!-- <el-checkbox v-model="checkS" disabled style="margin-left:15px;margin-top: 1%;">不限</el-checkbox> -->
					</div>
					<div class="head-div">
						<div class="head-title">起止时间<i class="tip">*</i></div>
						<div class="block">
							<!-- <div class="demonstration">值：{{ startTime }}... {{ endTime }}</div> -->
							<el-date-picker disabled v-model="startTime" type="date" placeholder="选择日期" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm">
							</el-date-picker>
							<span style="margin-right:10px">至</span>
							<el-date-picker disabled v-model="endTime" type="date" placeholder="选择日期" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm">
							</el-date-picker>
							<el-checkbox style="margin-left:15px;margin-top: 1%;" disabled v-model="checkT">不限</el-checkbox>
						</div>   
					</div>
					<div class="head-div">
						<div class="head-title">公开试题</div>
						<div class="block">
							<!-- isPublic	是	string	公开标识 0-不公开 1-公开 -->
							<el-radio-group v-model="isPublic">
								<el-radio disabled :label="1">是</el-radio>
								<el-radio disabled :label="0">否</el-radio>
							</el-radio-group>
						</div>
					</div>

					<div class="head-div" v-if="questType!=1">
						<div class="head-title">科目</div>
						<div class="block" style="width: 85%;margin-left: 2%;">
							<el-radio-group v-for="(itec,ii) in SubjectsList" :key="ii" v-model="subjradio" style="width:17%;overflow: hidden;">
								<el-radio disabled :label="itec.id">{{itec.subjectName}}</el-radio>
							</el-radio-group>
						</div>
					</div>
					<div class="head-div" v-if="questType==1">
						<div class="head-title">类别</div>
						<div class="block">
							<el-radio-group v-model="level">
								<el-radio disabled :label="1">中级</el-radio>
								<el-radio disabled :label="2">高级</el-radio>
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
				</div>
			</div>
			
			<div class="selectBox Single" v-if="sinData.length>0">
				<!-- <a href="/#/AddTestPaper/#0"></a>	 -->
				<h3 class="line">
					<!-- <span class="editBtn" style="float:right;" @click="editAnswers(0)"><img src="static/img/edit.png" /></span> -->
					<span style="float:right;color:#bbb;margin-right:1%">{{scoreA0}}分</span>
					{{allQuesNum[0]}}、单选题（每题{{scoreA0/sinData.length}}分，合计{{scoreA0}}分）
				</h3>
				<div class="contentBox">
					<!-- 循环 -->
					<div class="timuBox" v-for="(item,index) in sinData" :key="index">
						<div class="timu" >
							<h4>
								<span style="float:right;color:#bbb;margin-right:1%">{{item.qcScore}}分</span>
								{{index+1}}、{{item.qcDesc}}
							</h4>
							<el-radio-group v-for="(itec,ii) in item.arr" :key="ii" v-model="item.qcAnswer">
								<el-radio disabled :label="ii">{{itec.item}}、{{itec.itemDesc}}</el-radio>
							</el-radio-group>
						</div>
					</div>

				</div>
			</div>
			<div class="selectBox" v-if="mulData.length>0">
				<h3 class="line">
					<!-- <span class="editBtn" style="float:right;" @click="editAnswers(1)"><img src="static/img/edit.png" /></span> -->
					<span style="float:right;color:#bbb;margin-right:1%">{{scoreA1}}分</span>
					{{allQuesNum[1]}}、多选题下列题目中至少有2个及以上的正确答案，多选少选均不得分（每题{{scoreA1/mulData.length}}分，合计{{scoreA1}}分）
				</h3>
				<div class="contentBox">
					<!-- 循环 -->
					<div class="timuBox" v-for="(item,index) in mulData" :key="index">
						<div class="timu" >
							<h4>
								<span style="float:right;color:#bbb;margin-right:1%">{{item.qcScore}}分</span>
								{{index+1}}、{{item.qcDesc}}
							</h4>
							<el-checkbox-group v-for="(itec,ii) in item.arr" :key="ii" v-model="itec.qcAnswer">
								<el-checkbox disabled :label="ii"> {{itec.item}}、{{itec.itemDesc}} </el-checkbox>
							</el-checkbox-group>
						</div>
					</div>	
				</div>
			</div>
			<div class="selectBox Single" v-if="JudData.length>0">
				<h3 class="line">
					<!-- <span class="editBtn" style="float:right;" @click="editAnswers(2)"><img src="static/img/edit.png" /></span> -->
					<span style="float:right;color:#bbb;margin-right:1%">{{scoreA2}}分</span>
					{{allQuesNum[2]}}、判断题（每题{{scoreA2/JudData.length}}分，合计{{scoreA2}}分）
				</h3>
				<div class="contentBox">
					<!-- 循环 -->
					<div class="timuBox" v-for="(item,index) in JudData" :key="index">
						<div class="timu" >
							<h4>
								<span style="float:right;color:#bbb;margin-right:1%">{{item.qcScore}}分</span>
								{{index+1}}、{{item.qcDesc}}
							</h4>
							<el-radio-group v-for="(itec,ii) in item.arr" :key="ii" v-model="item.qcAnswer">
								<el-radio disabled :label="ii">{{itec.item}}、{{itec.itemDesc}}</el-radio>
							</el-radio-group>
						</div>
					</div>
				</div>	
			</div>	
			<div class="selectBox" v-if="comData.length>0">
				<h3 class="line">
					<!-- <span class="editBtn" style="float:right;" @click="editAnswers(3)"><img src="static/img/edit.png" /></span> -->
					<span style="float:right;color:#bbb;margin-right:1%">{{scoreA3}}分</span>
					{{allQuesNum[3]}}、填空题（每题{{scoreA3/comData.length}}分，合计{{scoreA3}}分）
				</h3>
				<div class="contentBox">
					<!-- 循环 -->
					<div class="timuBox" v-for="(item,index) in comData" :key="index">
						<div class="timu line">
							<h4>
								<span style="float:right;color:#bbb;margin-right:1%">{{item.qcScore}}分</span>
								{{index+1}}.{{item.qcDesc}}
							</h4>
							<div class="continputBox">
								<p v-for="(itec,index) in item.arr" :key="index"> 
									<template v-if="itec.answersl">
										<span>( {{index+1}} )</span> 
										<span class="trueColor"> {{itec.answersl}} </span>
									</template>
								</p>
							</div>
						</div>
					</div>

				</div>
			</div>
			<div class="selectBox" v-if="DisData.length>0">
				<h3 class="line">
					<!-- <span class="editBtn" style="float:right;" @click="editAnswers(4)"><img src="static/img/edit.png" /></span> -->
					<span style="float:right;color:#bbb;margin-right:1%">{{scoreA4}}分</span>
					{{allQuesNum[4]}}、论述题（每题{{scoreA4/DisData.length}}分，合计{{scoreA4}}分）
				</h3>
				<div class="contentBox">
					<!-- 循环 -->
					<div class="timuBox" v-for="(item,index) in DisData" :key=index>
						<div class="timu ">
							<h4>
								<span style="float:right;color:#bbb;margin-right:1%">{{item.qcScore}}分</span>
								{{index+1}}.{{item.qcDesc}}
							</h4>
							<div class="continputBox">
								<div>
									<span  v-for="(v,i) in item.arr" :key="i" style="vertical-align: top;display: inline-block;margin-right:0.5%">
										<img @click="showImages" :src="img_api+v.qcPic" style="width:100px" />
									</span>
								</div>
								<p style="font-size:14px"><span style="color:#000">答案：</span>{{item.qcAnswer}}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="selectBox" style="margin-bottom:5%">
				<el-row style="display:none">
					<el-button type="primary" @click="submitInfo">提交</el-button>
				</el-row>	
			</div>
			<div class="scoreAll">
				<p>
					<span class="big">{{checkScore}}</span>
					<!-- /<span>{{allScores}}</span> -->
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
			<div v-if="paperNumber===0"><Single :parentData="sinData" v-on:getPaperInfo="getPaperInfo($event)"></Single></div>
			<div v-if="paperNumber===1"><MultipleChoice :parentData="mulData" v-on:getPaperInfo="getPaperInfo($event)"></MultipleChoice></div>
			<div v-if="paperNumber===2"><Judge :parentData="JudData" v-on:getPaperInfo="getPaperInfo($event)"></Judge></div>
			<div v-if="paperNumber===3"><Completion :parentData="comData" v-on:getPaperInfo="getPaperInfo($event)"></Completion></div>
			<div v-if="paperNumber===4"><Discussion :parentData="DisData" v-on:getPaperInfo="getPaperInfo($event)"></Discussion></div>
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

export default {
	name:'TeachPaperDetail',
	components:{
		"Single":Single,
		"MultipleChoice":MultipleChoice,
		"Judge":Judge,
		"Completion":Completion,
		"Discussion":Discussion
	},
    data(){
        return {
			questType:				0, //0-日常练习 1-技能考证 2-考核 3-作业 4-比赛题
			typeTitle:				'',//title
			questBankTitle:			'',//标题
			questDesc:				'',//描述
			score:					'',
			checkS:					'',
			checkT:					'',
			isPublic:				1, //isPublic	是	string	公开标识 0-不公开 1-公开
			startTime: 				"", //开始日期 v-model
			endTime: 				"", //结束日期 v-model
			sinData:				[],//单选数据
			mulData:				[],//多选数据
			JudData:				[],//判断数据
			comData:				[],//填空数据
			DisData:				[],//论述数据	 
			paperNumber:			'',//根据不同组件ID 显示组件0.1.2.3
			classList:         		[],//班级
			checkClass:				[],//选中的班级
			SubjectsList:           [],//科目数组
			subjradio: 				'',//默认科目0k
			hostUrl:				'http://192.168.1.200/eduFiles/stu/20180831/15356',//图片地址
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
			allQuesNum:				[],//用来加索引，当某些题没选的时候
			img_api: 				baseUrl.img_api,//路径
			showPaperShow:			true,
			imgDialogVisible:		false,
			targetImg:				'',
			addPaperShow:			false
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
		editAnswers(v){
			//点编辑的时候把试卷隐藏 ，把选题放出来
			this.showPaperShow = false
			this.addPaperShow = true
			this.paperNumber=v
			//父组件传给子组件
			// console.log(this.sinData)
		},
		getPaperInfo(v){
			//子组件传回来的 tit = 0,1,2,3,4给相应题赋值,同时给父组件显示
			//点编辑的时候把试卷隐藏 ，把选题放出来
			this.showPaperShow = true
			this.addPaperShow = false

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
			this.sinData.forEach(function(v,i){
				let itemobj0={}
				itemobj0.itemId =v.questId
				itemobj0.itemSort =i+1
				newList.push(itemobj0)
				checkN+=v.score
			})
			this.mulData.forEach(function(v,i){
				let itemobj1={}
				itemobj1.itemId =v.questId
				itemobj1.itemSort =i+1
				newList.push(itemobj1)
				checkN+=v.score
			})
			this.JudData.forEach(function(v,i){
				let itemobj2={}
				itemobj2.itemId =v.questId
				itemobj2.itemSort =i+1
				newList.push(itemobj2)
				checkN+=v.score
			})
			this.comData.forEach(function(v,i){
				let itemobj3={}
				itemobj3.itemId =v.questId
				itemobj3.itemSort =i+1
				newList.push(itemobj3)
				checkN+=v.score
			})
			this.DisData.forEach(function(v,i){
				let itemobj4={}
				itemobj4.itemId =v.questId
				itemobj4.itemSort =i+1
				newList.push(itemobj4)
				checkN+=v.score
			})
			
			//传集合回去
			this.questList=newList
			// console.log(this.questList)
			this.checkScore=checkN
			this.checkScore = this.checkScore+'分'
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

				classId:0,
				score:'',

				startTime:this.startTime,
				endTime:this.endTime,
				questType:this.questType,
				subjectId:this.subjectId,
				level:this.level,
				questSingleNum:this.questSingleNum,
				questMultNum:this.questMultNum,
				questJudgeNum:this.questJudgeNum,
				questFillNum:this.questFillNum,
				questDissNum:this.questDissNum,
				questList:this.questList
			}
			// console.log(this.checkS)
			let classId='',k
			this.classList.forEach(function(v,i){
				if(v.selected===true){
					classId+= v.classId+','
				}
			})
			ywkData.classId = classId.substring(0,classId.length-1)

			//试卷分值，空表示不限
			if(this.checkS){
				ywkData.score=0
				k=100
			}
			this.checkS?ywkData.score=0:ywkData.score=this.checkScore

			if(this.questBankTitle==''){
				this.$message.error('试卷标题不能为空！')
				return false
			}	
			if(this.questDesc==''){
				this.$message.error('试卷描述不能为空！')
				return false
			}	
			if(classId==''){
				this.$message.error('专业班级必选一个')
				return false
			}
			if(this.checkScore==''&&k!=100){
				this.$message.error('试卷分值必选')
				return false
			}
			if(this.startTime==''){
				this.$message.error('开始时间必选')
				return false
			}
			if(this.endTime==''){
				this.$message.error('结束时间必选')
				return false
			}
			if(this.subjradio==''){
				this.$message.error('科目得选一个亲！')
				return false
			}

			ywkData.subjectId = this.subjradio
			// console.log(ywkData)
			const res = await this.$axios.addTestPaper(ywkData)
			if(res.code===1000){
				this.$message.warning('添加成功!')
				this.$router.push({path:"/AddTestPaper"}) 
			}
		},
		async getList(){//获取单选题列表
			this.qbId=this.$route.query.qbId
			//获取试卷
			let params = {qbId:this.qbId},newList=[],sinData=[],mulData=[],JudData=[],comData=[],DisData=[]
			const res = await this.$axios.getTeachPaperDetail(params),itemListArr = res.data.qcOptionList
			this.qcList = res.data.qcList
			this.questBankTitle = res.data.questBankTitle
			this.questDesc = res.data.questDesc
			this.checkClass=res.data.classId.split(",")
			this.startTime =res.data.startTime
			this.endTime =res.data.endTime
			this.subjradio= res.data.subjectId
			this.questSingleNum = res.data.questSingleNum
			this.questMultNum = res.data.questMultNum
			this.questJudgeNum = res.data.questJudgeNum
			this.questFillNum = res.data.questFillNum
			this.questDissNum = res.data.questDissNum
			this.level = Number(res.data.level)
			this.isPublic = Number(res.data.isPublic)
			
// console.log(res)
			this.qcList.forEach(function(item,index){
				let itemobj = {}
				itemobj.qcId =item.qcId
				itemobj.qcDesc = item.qcDesc
				itemobj.qcScore = item.qcScore

				if(item.qcPic){
					itemobj.qcPic = item.qcPic	
				}
				
				itemobj.qcAnswer=item.qcAnswer
				// itemobj.orderNum = item.orderNum
				itemobj.type = item.type
				itemobj.arr=[]
				itemListArr.forEach(function(v,i){
					let vobj = {}
					vobj.itemDesc = v.optionName
					vobj.item = v.optionValue					
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
				// console.log(v)
			})
			this.sinData=sinData
			this.mulData=mulData
			this.JudData=JudData
			this.comData=comData
			this.DisData=DisData
			//获取类型题总分

			let a=0,b=0,c=0,d=0,e=0,answers=[],qcPic=[]
			this.sinData.forEach(function(vv,ii){
				a+=vv.qcScore
				//字符串转数字答案才出来
				vv.qcAnswer=parseInt(vv.qcAnswer)
			})
			this.mulData.forEach(function(vv,i){
				b+=vv.qcScore
				//吧答案拆分
				answers=vv.qcAnswer.split("ψ")
				vv.arr.forEach(function(v,i){
					if(answers[i].length>0){
						answers[i]=='true'?v.qcAnswer=true:v.qcAnswer=false
					}
				})
			})
// console.log(this.mulData)

			this.JudData.forEach(function(vv,ii){
				c+=vv.qcScore
				//字符串转数字答案才出来
				vv.qcAnswer=parseInt(vv.qcAnswer)
			})

			this.comData.forEach(function(vv,i){
				d+=vv.qcScore
				//吧答案拆分
				answers=vv.qcAnswer.split("ψ")
				if(answers.length>0){
					// vv.arr=[]
					answers.forEach(function(v,i){
						if(v.length>0){
							let vobj = {}
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
			// this.comData=comData
			// console.log(this.comData)

			this.DisData.forEach(function(vv,i){
				e+=vv.qcScore
				//吧论述题图片拆分
				if(vv.qcPic){
					qcPic=vv.qcPic.split("ψ")
					if(qcPic.length>0){
						// vv.arr=[]
						qcPic.forEach(function(v,i){
							if(v.length>0){
								let vobj = {}
								vobj.qcPic = v
								vv.arr.push(vobj)
							}
						})
					}
				}	
			})
			// this.DisData=DisData

			this.scoreA0 =a
			this.scoreA1 =b
			this.scoreA2 =c
			this.scoreA3 =d
			this.scoreA4 =e
			this.checkScore = a+b+c+d+e+'分'

			let nn=0	
			if(this.questSingleNum>0){
				nn++
				this.allQuesNum[0]=nn
			}
			if(this.questMultNum>0){
				nn++
				this.allQuesNum[1]=nn
			}
			if(this.questJudgeNum>0){
				nn++
				this.allQuesNum[2]=nn
			}
			if(this.questFillNum>0){
				nn++
				this.allQuesNum[3]=nn
			}
			if(this.questDissNum>0){
				nn++
				this.allQuesNum[4]=nn
			}
			// console.log(this.allQuesNum)
			// console.log(mulData)
			// console.log(JudData)
			// console.log(comData)
			// console.log(DisData)
		}
	},
	async mounted() {
		if(this.hasQx('teach:quest:detail')){
			
		}else{
			this.dialog('您无权进行该操作')
			this.$router.back(-1)
			return false
		}	


		// 获取班级
		const res = await this.$axios.getClassList()
		//获取科目
		let params = {
			pageNo: 1,
			pageSize: 999
		}
		const res1 = await this.$axios.getSubjectList(params)
		if(res.code===1000){
			this.classList=res.data
		}
		if(res1.code===1000){
			this.SubjectsList=res1.data
		}
		this.questType=this.$route.query.questType
		this.questType==0?this.typeTitle='日常练习详情':this.questType==1?this.typeTitle='技能考证详情':this.questType==2?this.typeTitle='考核详情':this.questType==3?this.typeTitle='作业详情':this.questType==4?this.typeTitle='比赛详情':'无解'

		this.getList()
	}
}
</script>


<style lang="stylus">
.TeachPaperDetail
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
				display inline-block
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
					margin-left 5px
					margin-bottom 15px
					width 380px
					overflow hidden
					.el-checkbox__label
						font-size 28px
						padding-left 5px
						color #303133
					.el-checkbox__inner
						width 50px
						height 50px
					.el-checkbox__inner::after
						border-width 3px
						height 32px
						left 16px
						width 13px
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
		border-radius 15px
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
		border-radius: 90px 0 0 90px
		padding-top 20px
		p
			font-size 30px
			span
				font-size 20px
			.big
				font-weight 900
				font-size 40px	
</style>