<!-- 
* name: 练习题列表
* author: fjd
* time: 2018-7-31
-->
<template>
   	<div class="ExerciseList">
		<!-- 导航 -->
        <Header :title='typeTitle' @goBack="goBack"></Header>   
		<div class="exerciseBox">
			<div class="head">
				<p>{{titH2}}<span style="float:right">{{tName}}</span></p>
			</div>
			<div class="listBox" v-if="hasQx('stu:qc:praticeList')">
				<ul v-for="(item,index) in resData" :key=index>
					<template v-if="hasQx('comm:stu:commitExamInfo')">
					<router-link v-bind:to="'/AnsderStuDetail?qbId='+item.qbId+'&questType='+questType+'&examId='+item.id">
						<li>
							{{item.exTime}}
						</li>
					</router-link>
					</template>
					
					<template v-if="!hasQx('comm:stu:commitExamInfo')">
					<li>
						{{item.exTime}}
					</li>
					</template>
				</ul>
			</div>
			
			<div class="selectBox" v-if="resData.length>0">
				<el-row v-if="hasQx('stu:qc:detail')">
					<router-link v-bind:to="'/TestPaper?qbId='+qbId+'&questType='+questType">
						<el-button type="primary" class="plain">重新练习</el-button>
					</router-link>
				</el-row>	
			</div>
		</div>

		
		<div class="noInfo" v-if="resData.length<=0">
			<div class="default">
				<img src="static/img/not-add-default.png" alt="" />
                <div class="not-class">
					暂无相关信息
				</div>
                <div class="add-text">
					点击下方按钮开始练习
				</div>	
				
				<el-row v-if="hasQx('stu:qc:detail')">
					<router-link v-bind:to="'/TestPaper?qbId='+qbId+'&questType='+questType">
						<el-button type="default" class="plain">开始练习</el-button>
					</router-link>
				</el-row>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'ExerciseList',
    data(){
        return {
			typeTitle:				'',
			titH2:					'',
			tName:					'',
			questType:				0, //0-日常练习 1-技能考证 2-考核 3-作业 4-比赛题
			qbId:					'',//试题ID
			countData:				'',
			resData:				[]
        }
	},
	methods:{
		goBack(){
			this.$router.back(-1)
		},
		async getList(){
			this.questType=this.$route.query.questType
			this.qbId=this.$route.query.qbId
			this.questType==0?this.typeTitle='练习列表':this.questType==1?this.typeTitle='技能考证列表':this.questType==2?this.typeTitle='考核列表':this.questType==3?this.typeTitle='作业列表':this.questType==4?this.typeTitle='比赛列表':'无解'
			// 获取班
			let params = {
				qbId: this.qbId
			}
			const res = await this.$axios.ExerciseList(params)
			if(res.code===1000){
				this.resData = res.data.praticeList
				this.titH2 = res.data.qbTitle
				this.tName = res.data.teacherName
			}
		}
	},
	mounted() {
		this.getList()
	}
}
</script>


<style lang="stylus">
	.ExerciseList
		background #fff
		.exerciseBox
			.head
				padding 25px
				font-size 30px
				span 
					float right 
					color #67c23a
			.listBox
				background #eeeeee
				padding 15px
				ul
					overflow hidden
					background #fff
					li
						padding 20px 
						font-size 26px
						border-bottom 1px solid #ccc
			.selectBox
				margin 0 auto
				text-align center
				.el-button--primary
					width: 90%
					padding: 25px
					margin: 1% auto
		.noInfo
			position relative
			height 900px
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
</style>