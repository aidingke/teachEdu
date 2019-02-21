<!-- 
* name: 教师管理考核
* author: fjd
* time: 2018-8-13
-->

<template>
   	<div class="TeachPass">
		<!-- 导航 --> 
        <Header :title='typeTitle' @goBack="goBack"></Header> 
        <!-- 导航 -->
        <!-- <appNav :nameNumber="nameNumber" :tabValues="tabValues" v-on:tabValue="updateTabValue($event)"></appNav> -->
		<div class="tab-cont" v-if="status===0">  
            <div class="tab" :class="tabValue ==1?'on':''" @click="updateTabValue(1)" >待批卷<i class="line"></i></div>
            <div class="tab" :class="tabValue ==2?'on':''" @click="updateTabValue(2)" >批卷完成<i class="line"></i></div>			
		</div> 
		<div class="tab-cont" v-if="status===1">  
            <div class="tab" :class="tabValue ==1?'on':''" @click="updateTabValue(1)" >待考核<i class="line"></i></div>
            <div class="tab" :class="tabValue ==2?'on':''" @click="updateTabValue(2)" >进行中<i class="line"></i></div>
			<div class="tab" :class="tabValue ==3?'on':''" @click="updateTabValue(3)" >考核完成<i class="line"></i></div>			
		</div> 

		<!-- 批卷 -->
		<div class="TeachPassBox" id="WaitPass">
			<div class="selectBox" v-for="(item,index) in resData" :key="index">
				<div class="passBox" v-if="status===0"> <!-- 老师 -->
					<template v-if="tabValue===1">
						<router-link v-bind:to="'/TeachPaperDetail?qbId='+item.questBankId+'&questType='+questType" >
							<h3 class="head">{{item.examName}}</h3>
							<!-- <p class="comCol">{{item.startTime}}-{{item.endTime}}</p> -->
							<p class="comCol">{{item.examTime}}</p>
							<p class="ctit">{{item.examDesc}}</p>
						</router-link> 
						<div class="kaoshiBtn" v-if="item.examStatus==2">
							<button class="default" disabled="disabled" style="width:100%;color:#ddd">
								尚未开始
							</button>
						</div>
						<div class="kaoshiBtn" v-if="item.examStatus!=2">
							<!-- {{item.examStatus}} -->
							<template v-if="item.stuNum==0">
								<div class="kaoshiBtn">
									<button class="default" disabled="disabled" style="width:100%;color:#ccc">
										暂无学生答题
									</button>
								</div>
							</template>
							<template v-if="item.stuNum!=0">
								<router-link v-bind:to="'/TeachPassDetails?qbId='+item.questBankId+'&questType='+questType">
									<span class="default">
										详情
									</span>
								</router-link>
							</template>
						</div>	
					</template>

					<template v-if="tabValue===2">
						<router-link v-bind:to="'/TeachPassDetails?qbId='+item.questBankId+'&questType='+questType">
							<h3 class="head">{{item.examName}}</h3>
							<!-- <p class="comCol">{{item.startTime}}-{{item.endTime}}</p> -->
							<p class="comCol">{{item.examTime}}</p>
							<p class="ctit">{{item.examDesc}}</p>
							<div class="kaoshiBtn" v-if="hasQx('teach:exam:exportExcel')">
								<span class="default" @click.stop.prevent="downloadResult(item.questBankId, item.classId, item.examName)">
									导出考试成绩
								</span>
							</div>
						</router-link>
					</template>
				</div>

				<div class="passBox" v-if="status===1"> <!-- 学生 -->
					<template v-if="tabValue===1">
						<!-- 还没开始 -->
						<div>
							<h3 class="head">{{item.qbTitle}}</h3>
							<!-- <p class="comCol">{{item.startTime}}-{{item.endTime}}</p> -->
							<p class="comCol">{{item.examTime}}</p>
							<p class="ctit">{{item.qbDesc}}</p>
						</div> 
						<div style="display:none;">
							<div class="kaoshiBtn" style="width:190px;color:#bbb;display:none" v-show="index==0">
								<span class="default" style="color:#bbb">
									{{countNumsM}}分{{countNumsS}}秒开始
								</span>
							</div>
						</div>
					</template>
					<!-- 考核中 -->
					<template v-if="tabValue==2">
						<div v-if="item.examStatus==1||item.examStatus==2"> <!-- 已经交卷不可以点 -->
							<h3 class="head">{{item.qbTitle}}</h3>
							<!-- <p class="comCol">{{item.startTime}}-{{item.endTime}}</p> -->
							<p class="comCol">{{item.examTime}}</p>
							<p class="ctit">{{item.qbDesc}}</p>
							<div class="kaoshiBtn" >
								<span class="default" style="color:#ccc;border-color:#ccc">
									已交卷
								</span>
							</div>
						</div>	
						<div v-if="item.examStatus==null"> <!-- 其他 -->
							<h3 class="head">{{item.qbTitle}}</h3>
							<!-- <p class="comCol">{{item.startTime}}-{{item.endTime}}</p> -->
							<p class="comCol">{{item.examTime}}</p>
							<p class="ctit">{{item.qbDesc}}</p>
							<router-link v-bind:to="'/TestPaper?qbId='+item.qbId+'&questType='+questType"><!-- 还没完成 -->
								<div class="kaoshiBtn" v-if="hasQx('stu:qc:detail')">
									<span class="default">
										开始考试
									</span>
								</div>
							</router-link>
						</div>
					</template>

					<template v-if="tabValue==3">
						<template v-if="hasQx('comm:stu:commitExamInfo')">
							<router-link v-bind:to="'/AnsderStuDetail?qbId='+item.qbId+'&questType='+questType"><!-- 还没完成 -->
								<h3 class="head">{{item.qbTitle}}</h3>
								<!-- <p class="comCol">{{String(item.startTime)}}-{{String(item.endTime)}}</p> -->
								<p class="comCol">{{item.examTime}}</p>
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

						<template v-if="!hasQx('comm:stu:commitExamInfo')">
							<h3 class="head">{{item.qbTitle}}</h3>
							<!-- <p class="comCol">{{String(item.startTime)}}-{{String(item.endTime)}}</p> -->
							<p class="comCol">{{item.examTime}}</p>
							<p class="ctit">{{item.qbDesc}}</p>
							<div class="kaoshiScore">
								<span class="default">
									<template v-if="item.score>0">
										{{item.score}}<i>分</i>
									</template>
								</span>
							</div>
						</template>
					</template>
				</div>
			</div>
			<NotInfo v-if="resData.length === 0" notClass="暂无相关信息" defaultImg="static/img/not-data-default.png"></NotInfo>
		</div>
 
		<template v-if="hasQx('teach:quest:add')">
			<section class="uploadBtn" @click="addTestPaper()" v-if="status ===0">
				<div class="prel">
					<div class="upBox">
						<p>+</p>
						<a href="javascript:" class="itemBtn" style="display: inline-block;">新增考核</a>
					</div>
				</div>   
			</section> 
		</template>	
	</div>
</template>

<script>
// import Nav from '@/components/technology/Tnav'
export default {
	name: 'TeachPass',
	// components:{
	// 	"appNav":Nav
	// },
    data(){
        return {
			typeTitle:				'考核',
			status:					'',//0教师状态,1学生
			token:					'',
			tabValue: 				1, //切换tab标签
			nameNumber:             4,//如果是数字4就展示 教师考核菜单，即待批卷、批卷完成 数字1就展示 考核菜单，即待、进行、结束考核 
			questType:              2,//0-日常练习 1-技能考证 2-考核 3-作业 4-比赛题
			examType:				0,//考核类型 0-待批卷 1-批卷完成	
			countNumsM:				'',//倒计时 分
			countNumsS:				'',//秒
			resData:				[]
        }
	},
	methods:{
		goBack(){
			this.$router.push({
				path:'/TrainExamIndex'
			})
			sessionStorage.setItem("tabValueTPass", '')
		},
		updateTabValue(type) { //切换考试状态
			this.tabValue = type
			// this.examType = type-1
			sessionStorage.setItem("tabValueTPass", this.tabValue)
			//执行函数
			this.getList()
		},
		//传参数，questType	是string	0-日常练习 1-技能考证 2-考核 3-作业 4-比赛题
		addTestPaper(){
			this.$router.push({
				path: './AddTestPaper?questType='+this.questType
			})
		},
		async getList(){
			//传0和1 examType
			if(this.status == 0){
				//获取题库列表
				let params = {
					pageNo: 1,
					pageSize: 100,
					examType:this.tabValue-1
				}
				const res = await this.$axios.getExamList(params)
				if(res.code===1000){
					this.resData=res.data	
					this.resData.forEach((vv,ii)=>{
						vv.startTime = this.dayjs(vv.startTime).format('YYYY-MM-DD HH:mm').toString()
						vv.endTime = this.dayjs(vv.endTime).format('HH:mm').toString()
					})
					// return this.resData
				}else if(res.code===1100){
					this.resData=''
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
				// params.status = this.tabValue-1
				
				const res = await this.$axios.getExamEduList(params)
				let tempSt=''
				if(res.code===1000){
					this.resData=res.data					
					this.resData.forEach((vv,ii)=>{
						vv.startTime = this.dayjs(vv.startTime).format('YYYY-MM-DD HH:mm').toString()
						vv.endTime = this.dayjs(vv.endTime).format('HH:mm').toString()
						if(ii==0){
							tempSt = vv.startTime
						}
					})
					//只有0的情况执行
					if(params.status==0){
						let tempTime = this.countTime(new Date(),new Date(tempSt))
						//执行计时器
						this.countFun(tempTime)
					}					
				} 
			}
			// console.log(this.resData)
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
			// return (days+hours+minutes+seconds)
			return hours*3600+minutes*60+seconds
			// console.log(hours*3600+minutes*60+seconds)
			// console.log(" 相差 "+days+"天 "+hours+"小时 "+minutes+" 分钟"+seconds+" 秒")
		},
		//计时器
		countFun(x){ //x是总秒数
			let clock = window.setInterval(() => {
				x--
				if(Number(x)==1){
					//刷新当前页开始考试
					// window.location.href=window.location.href
					this.dialog('考试开始，请刷新页面')
					this.$router.push({path:"/teachPass"}) 
					window.clearInterval(clock)
					this.countNumsFlg=false
				}

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

				this.countNumsM=minutes
				this.countNumsS=seconds
				// 之所以不用组装时间是有闪动
				// console.log(x)
			},1000)
		},

		async downloadResult(questBankId, classid, name) {		// 导出结果
			let params = {
				questBankId : questBankId,
				classId: classid
			}
			let data = await this.$axios.exportExamResult(params);
			if (!data) {
				return;
			}
			let url = window.URL.createObjectURL(new Blob([data]));
			let link = document.createElement('a');
			link.style.display = 'none';
			link.href = url;
			link.setAttribute('download', `${name}考试成绩.xls`);
			document.body.appendChild(link);
			link.click();
			link.parentNode.removeChild(link);
		}
	},
	mounted() {
		this.tabValue = Number(sessionStorage.getItem("tabValueTPass")) || 1 //用于标识切换
		if(localStorage.getItem("userType") == 0) { //老师 
			this.nameNumber = 4
			this.status = 0
			this.token = localStorage.getItem("accessToken")
			if(this.token===null){
				this.$router.push({path:"/Login"})    
			}
		}else if(localStorage.getItem("userType") == 1) { //学生
			this.nameNumber = 1
			this.status = 1
			this.token = localStorage.getItem("accessToken")
		}else{
			this.status = ''
			this.token = ''
		}
		this.getList()
	}
}
</script>

<style lang="stylus">
.TeachPass
	background :#eee
	.tab-cont
		height 130px
		display flex
		justify-content center
		align-items center
		border-bottom 1px solid #d3d6db
		background #fff
		.tab
			text-align center
			font-size 35px
			line-height 130px
			color #555
			margin 0 100px
		.on
			border-bottom 3px solid #138be7	
			color #138be7
			font-weight 900
	.TeachPassBox		
		.selectBox
			margin-top 30px;
			background #fff;
			border-bottom 4px solid #ddd;
			padding 0 30px 0 30px;
			.passBox
				position relative
				padding 0 0 30px 0
				font-size 35px
				.head
					padding-top 25px
					color #555
					width 75%
					font-weight 300
				p
					font-size 30px	
					width 75%
				.comCol
					color #E7A544	
					display inline-block
					margin-top 30px	
				.ctit
					color #888
				.kaoshiBtn
					position absolute
					right 2%
					bottom 15%
					min-width 265px
					.default
						background: #fff
						border: 2px solid #ccc
						padding: 30px 40px
						border-radius: 50px
						display: block
						text-align: center
						color: #666
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
		right  0
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