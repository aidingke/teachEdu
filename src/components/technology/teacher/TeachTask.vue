<!-- 
* name: 教师版作业
* author: fjd
* time: 2018-7-31
-->
<template>
   	<div class="TeachTask">
		<!-- 导航 --> 
        <Header :title='typeTitle' @goBack="goBack"></Header>     
        <!-- 导航 -->
        <!-- <appNav :nameNumber="nameNumber" v-on:tabValue="updateTabValue($event)"></appNav> -->
		<!-- <div class="tab-cont" v-if="status===0" style="display:none">  
            <div class="tab" :class="tabValue ==1?'on':''" @click="updateTabValue(1)" >未批改<i class="line"></i></div>
            <div class="tab" :class="tabValue ==2?'on':''" @click="updateTabValue(2)" >已完成<i class="line"></i></div>			
		</div>  -->
		<div class="tab-cont" v-if="status===1">  
            <div class="tab" :class="tabValue ==1?'on':''" @click="updateTabValue(1)" >未完成<i class="line"></i></div>
            <div class="tab" :class="tabValue ==2?'on':''" @click="updateTabValue(2)" >已完成<i class="line"></i></div>
		</div> 

		<!-- 写作业 -->
		<div class="Box">
			<div class="selectBox" v-for="(item,index) in resData" :key="index">
				<template v-if="status===0">
					<div class="passBox" v-if="tabValue==1"> <!-- 老师 -->
						<router-link v-bind:to="'/TeachPaperDetail?qbId='+item.questBankId+'&questType='+questType">
							<h3 class="head">{{item.examName}}</h3>
							<!-- <p class="comCol">作业提交时间：{{item.submitTime}}</p> -->
							<p class="ctit">{{item.examDesc}}</p>
						</router-link> 
						<div class="kaoshiBtn">
							<router-link v-bind:to="'/TeachTaskDetails?qbId='+item.questBankId+'&questType='+questType">
								<template v-if="item.stuNum==0&&item.finishNum==0"> <!--不显示--> </template>
								<template v-if="item.stuNum>item.finishNum&&item.stuNum>0"><span class="default" > 批改作业 </span></template>
								<template v-if="item.stuNum==item.finishNum&&item.finishNum>0&&item.stuNum>0"><span class="default" > 已批作业 </span></template>
							</router-link>
						</div>
					</div>

					<div class="passBox" v-if="tabValue==2"> 
						<router-link v-bind:to="'/TeachTaskDetails?qbId='+item.questBankId+'&questType='+questType">
							<h3 class="head">{{item.examName}}</h3>
							<p class="comCol">作业提交时间：{{item.submitTime}}</p>
							<p class="ctit">{{item.examDesc}}</p>
						</router-link> 
					</div>
				</template>	

				<template v-if="status===1">
					<div class="passBox" v-if="tabValue===1"> <!-- 学生 -->
						<!-- 还没完成 -->
						<h3 class="head">{{item.qbTitle}}</h3>
						<!-- <p class="comCol">{{item.endTime}}</p> -->
						<p class="ctit">{{item.qbDesc}}</p>
						<div class="kaoshiBtn" v-if="hasQx('stu:qc:detail')">
							<router-link v-bind:to="'/TestPaper?qbId='+item.qbId+'&questType='+questType">
								<span class="default">
									写作业
								</span>
							</router-link>
						</div>
					</div>

					<div class="passBox" v-if="tabValue===2"> <!-- 学生 -->
						<template  v-if="hasQx('comm:stu:commitExamInfo')">
							<router-link v-bind:to="'/AnsderDetail?qbId='+item.qbId+'&questType='+questType"><!-- 已经完成 -->
								<h3 class="head">{{item.qbTitle}}</h3>
								<p class="comCol">作业提交时间：{{item.submitTime}}</p>
								<p class="ctit">{{item.qbDesc}}</p>
								<div class="kaoshiScore">
									<span class="default">
										<template v-if="item.score>0">
											{{item.score}}<i>分</i>
										</template>
									</span>
								</div>
							</router-link>
						</template>
						<template  v-if="!hasQx('comm:stu:commitExamInfo')">	
							<h3 class="head">{{item.qbTitle}}</h3>
							<p class="comCol">作业提交时间：{{item.submitTime}}</p>
							<p class="ctit">{{item.qbDesc}}</p>
							<div class="kaoshiScore">
								<span class="default">
									<template v-if="item.score>0">
										{{item.score}}<i>分</i>
									</template>
								</span>
							</div>
						</template>
					</div>
				</template>	
			</div>
			<div class="noInfo" v-if="resData.length<=0">
				<div class="default">
					<img src="static/img/not-add-default.png" alt="" />
					<div class="not-class">
						暂无数据
					</div>
				</div>
			</div>
		</div>
		<!-- 上传作业 -->
		<template v-if="hasQx('teach:quest:add')">
			<section class="uploadBtn" @click="addTestPaper()" v-if="status ===0">
				<div class="prel">
					<div class="upBox">
						<p>+</p>
						<a href="javascript:" class="itemBtn" style="display: inline-block;">新增作业</a>
					</div>
				</div>   
			</section> 
		</template>
	</div>
</template>

<script>
// import Nav from '@/components/technology/Tnav'
export default {
	name: 'TeachTask',
	// components:{
	// 	"appNav":Nav
	// },
    data(){
        return {
			status:					'',//0教师状态,1学生
			typeTitle:				'',
			token:					'',
			tabValue: 				1, //切换tab标签
			nameNumber:             5,//数字5 教师管理作业，即未批改 已完成,数字2 作业菜单，即未、结束 
			questType:              3,//0-日常练习 1-技能考证 2-考核 3-作业 4-比赛题
			workType:				0,//作业状态 0-未批改 1-已批改
			resData:				[]
        }
	},
	methods:{
		goBack(){
			this.$router.push({
				path:'/TrainExamIndex'
			})
			sessionStorage.setItem("tabValue", '')
		},
		updateTabValue(type) { //切换考试状态
			this.tabValue = type
			sessionStorage.setItem("tabValue", this.tabValue)
			this.getList()
		},
		//传参数，questType	是string	0-日常练习 1-技能考证 2-考核 3-作业 4-比赛题
		addTestPaper(){
			this.$router.push({
				path: './AddTestPaper?questType='+this.questType
			})
		},
		async getList(){
			//老师版的
			if(this.status == 0){
				//获取题库列表
				let params = {
					pageNo: 1,
					pageSize: 100,
					// workType:this.tabValue-1
				}
				
				const res = await this.$axios.getHomeworkList(params)
				if(res.code===1000){
					this.resData=res.data
				}else if(res.code===1100){
					this.resData=''
					// this.$message.warning(res.message)
				}
			}else if(this.status == 1){
				//学生版 getExamEduList
				let params = {
					status: this.tabValue-1,
					pageNum:1,
					pageSize: 100
				}
				// if(type==0){
				// 	params.status=0
				// }else{
				// 	params.status=(type-1)
				// }

				const res = await this.$axios.getStuHomeworkList(params)
				if(res.code===1000){
					this.resData=res.data
				}
			}
			// console.log(this.resData)     
		}
	},
	mounted() {
		this.tabValue = Number(sessionStorage.getItem("tabValue")) || 1 //用于标识切换
		//获取token
		if(localStorage.getItem("userType") == 0 || localStorage.getItem("userType") == 4) { //老师 管理员
			this.status = 0
			this.typeTitle ='作业'
			this.nameNumber = 5
			this.token = localStorage.getItem("accessToken")
			if(this.token===null){
				this.$router.push({path:"/Login"})    
			}
		}

		// if(localStorage.getItem("userType") == 0 || localStorage.getItem("userType") == 4) { //老师 管理员
		// 	this.status = 0
		// 	this.typeTitle ='作业'
		// 	this.nameNumber = 5
		// 	this.token = localStorage.getItem("accessToken")
		// 	if(this.token===null){
		// 		this.$router.push({path:"/Login"})    
		// 	}
		// }else 
		if(localStorage.getItem("userType") == 1) { //学生
			this.typeTitle ='作业'
			this.nameNumber = 2
			this.status = 1
			this.token = localStorage.getItem("accessToken")
		}
		// else{
		// 	this.status = ''
		// 	this.token = ''
		// }

		this.getList(this.tabValue-1)
	}
}
</script>


<style lang="stylus">
	.TeachTask
		background :#eee
		.tab-cont
			height 130px
			display flex
			justify-content center
			align-items center
			border-bottom 1px solid #d3d6db
			background #fff
			color #666
			.tab
				text-align center
				font-size 35px
				line-height 130px
				margin 0 100px
			.on
				border-bottom 3px solid #138be7
				color #138be7
				font-weight 900
		.selectBox
			margin-top 30px;
			background #fff;
			border-bottom 4px solid #ddd;
			padding 0 30px 0 30px;
			.passBox
				position relative
				padding 15px 0 30px 0
				font-size 35px
				.head
					padding-top 25px
					color #000
					font-weight 300
					font-size 30px
				p
					font-size 24px	
				.comCol
					color #E7A544	
					margin-top 30px	
					font-size 25px
				.ctit
					color #888
				.kaoshiBtn
					position absolute
					right 2%
					bottom 15%
					.default
						background: #fff
						border: 2px solid #ccc
						padding: 30px 40px
						border-radius: 50px
						display: block
						text-align: center
						color: #666
						font-size 30px
				.kaoshiScore
					position absolute
					right 2%
					bottom 15%
					.default
						font-size 60px
						font-weight 900
						color #F56C6C
						i
							font-style: normal;
							font-size: 20px;
							font-weight: 300;
		.noInfo		
			overflow hidden
			margin-top 1.5%
			height 850px
			position relative
			background #fff
			.default
				width 400px
				position absolute
				left 50%
				top 50%
				transform: translate(-50%,-50%)
				img
					max-width 100%
				.not-class
					font-size 40px
					text-align center
					color #9b9b9b
					margin 30px 0 0 0
				.add-text
					font-size 20px
					text-align center
					color #a5a5a5
					margin 30px 0 50px 0
				.el-button
					width 100%
					padding 30px 20px
					font-size 30px
		.uploadBtn
			position fixed
			right  2%
			bottom  2%
			font-size  14px
			z-index 500
			border-radius  150px
			.prel
				position relative
				width  170px
				height  170px
				color  #fff
				background  #148ce8
				z-index  500
				border-radius  150px
				border 12px solid #bcdef8
				.upBox
					width  150px
					height  150px
					// background #148ce8
					border-radius 150px
					position absolute
					top 50%
					left 50%
					margin -43% 0 0 -45%
					text-align  center
					p
						text-align center
						font-size 80px
						line-height 97%
					.itemBtn
						color #fff
						text-decoration none
						font-size 28px

</style>