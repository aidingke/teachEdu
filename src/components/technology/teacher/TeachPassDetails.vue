<!-- 
* name: 教师管理学生考核
* author: fjd
* time: 2018-8-13
* 根据参数进来
-->

<template>
   	<div class="TeachTaskDetails">
		<!-- 导航 --> 
		<Header :title='typeTitle' @goBack="goBack"></Header>   
		<div class="passBox" v-if="hasQx('teach:examwork:classList')">
			<div class="selectBox" v-for="(item,index) in resData" :key="index">
				<div class="passBox">
					<h3 class="head">{{item.stuName}}</h3>
					<p class="ctit" style="margin-top:20px">学号 {{item.stuNo}}</p>
					<p class="ctit">{{item.className}}</p>
					<template v-if="hasQx('comm:stu:commitExamInfo')">
						<router-link v-bind:to="'/AnsderDetail?qbId='+qbId+'&questType='+questType+'&stuId='+item.stuId"><!-- 已经完成 -->	
							<div class="kaoshiScore">
								<span class="default">
									<template v-if="item.stuScore==''">
										<b style="color:#999">等待打分</b>
									</template>
									
									<template v-if="item.stuScore">
										{{Number(item.stuScore)}}<i>分</i>
									</template>
								</span>
							</div>
						</router-link>
					</template>
				</div>
			</div>
		</div>
		<NotInfo v-if="resData.length === 0" notClass="暂无相关信息" defaultImg="static/img/not-data-default.png"></NotInfo>
	</div>
</template>



<script>
import { dialog } from '@/common/dialog'   //警告提示
export default {
	name: 'TeachTaskDetails',
    data(){
        return {
			qbId:				'',
			typeTitle:			'',
			questType:			'',	
			resData: [
				// {"name": "刘得花1","num":'95271','class':'18级计算机汽车美容专修2班','score':18},
				// {"name": "刘得花2","num":'95272','class':'18级计算机汽车美容专修2班','score':98}	
			]
        }
	},
	methods:{
		goBack(){
			this.$router.back(-1)
		},
		async getList(){
			//传参获得列表	
			let params = {
				pageNo: 1,
				qbId:this.$route.query.qbId,
				qbType:this.$route.query.questType,
				pageSize: 10
			}
			const res = await this.$axios.getTeachTaskDetails(params)
			// console.log(res)
			if(res.code===1000){
				this.resData=res.data
			}if(res.code===1100){
				this.dialog(res.message)
				this.resData=''
			}
		}
	},
	mounted() {
		if(this.hasQx('teach:examwork:classList')){
			this.getList()
			this.qbId = this.$route.query.qbId
			this.questType = this.$route.query.questType
			this.typeTitle ='考核'
		}else{
			this.dialog('您无权进行该操作')
			this.$router.back(-1)
		}


	}
	// created(){
	// 	this.getTeachPassDetails()		
	// }
}
</script>


<style lang="stylus">
	.TeachTaskDetails
		background :#eee;
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
				p
					font-size 30px	
				.comCol
					color #E7A544	
					margin-top 30px	
				.ctit
					color #888
				.kaoshiBtn
					position absolute
					right 2%
					bottom 15%
					width 250px
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


</style>