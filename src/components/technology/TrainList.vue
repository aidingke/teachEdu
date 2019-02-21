<!-- 
* name: 技术培训列表
* author: fjd
* time: 2018-7-31
-->
<template>
   	<div class="TrainList">
		<!-- 导航 --> 
        <Header :title='title' @goBack="goBack"></Header>
		<div class="passBox">
			<div class="selectBox" v-for="(item,index) in resData1" :key="index">
				<div class="passBox">
					<h3 class="head">{{item.name}}</h3>
					<p class="comCol">培训时间：{{item.time}}</p>
					<p class="cimg"> 
						<img v-for="(v,i) in item.img" :key="i" :src=v />
					</p>
					<p class="ctit">
						描述：{{item.cont}}
					</p>
					<div class="kaoshiScore">
						<span class="default">
							{{item.nums}}
							<p>报名人数</p>
						</span>
					</div>
				</div>
				<div class="selectBox" v-if="status===0">
					<!-- <el-row>
						<el-button type="primary"></el-button>
					</el-row>	 -->
					<router-link class="el-button--primary" v-bind:to="'/TeachTrainDetails/'+(index+1)">
						查看报名学生（{{item.total}}）
					</router-link>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'TrainList',
    data(){
        return {
			status:0,					//教师
			title:'技术培训列表',		 			//根据学生还是教师状态来赋值	
            resData1: [
				{
					"name": "2018年第一季度考核",
					"time":'2018-05-06 14:00-16:00',
					'img':[
						'http://img.baidu.com/hi/jx2/j_0028.gif',
						'http://img.baidu.com/hi/jx2/j_0027.gif',
						'http://img.baidu.com/hi/jx2/j_0028.gif'],
						nums:91,
						total:90,
						'cont':`汽车是空调的老板，此次开会针对空调冷却系统汽车是空调的老板，
						汽车是空调的老板，此次开会针对空调冷却系统汽车是空调的老板，
						此次开会针对空调冷却系统汽车是空调的老板，此次开会针对空调冷却系统`
				},
				{
					"name": "2018年第一季度考核",
					"time":'2018-05-06 14:00-16:00',
					'img':[
						'http://img.baidu.com/hi/jx2/j_0028.gif',
						'http://img.baidu.com/hi/jx2/j_0027.gif',
						'http://img.baidu.com/hi/jx2/j_0028.gif'],
						nums:91,
						total:50,
						'cont':`汽车是空调的老板，此次开会针对空调冷却系统汽车是空调的老板，
						汽车是空调的老板，此次开会针对空调冷却系统汽车是空调的老板，
						此次开会针对空调冷却系统汽车是空调的老板，此次开会针对空调冷却系统`
				},
				{
					"name": "2018年第一季度考核",
					"time":'2018-05-06 14:00-16:00',
					'img':[
						'http://img.baidu.com/hi/jx2/j_0028.gif',
						'http://img.baidu.com/hi/jx2/j_0027.gif',
						'http://img.baidu.com/hi/jx2/j_0028.gif'],
						nums:91,
						total:59,
						'cont':`汽车是空调的老板，此次开会针对空调冷却系统汽车是空调的老板，
						汽车是空调的老板，此次开会针对空调冷却系统汽车是空调的老板，
						此次开会针对空调冷却系统汽车是空调的老板，此次开会针对空调冷却系统`
				}
			]
        }
	},
	methods:{
		goBack(){
			this.$router.back(-1)
		},
		updateTabValue(type) { //切换考试状态
			this.tabValue = type
		},
		openAddInfo(){
			this.showAdd = true
		}
	},
	created(){
		this.status=0
		if(this.status===0){
			this.title = '教师技术培训列表'
		}else{
			this.title = '学生技术培训列表'
		}
	}
}
</script>


<style lang="stylus">
	.TrainList
		background :#eee;
		.selectBox
			overflow hidden
			margin-top 30px
			background #fff
			padding 0 30px 0 30px
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
				.cimg
					border-top 1px solid #eee
					margin-top 15px
					padding-top 20px	
				.ctit
					color #888
					margin-top 20px
				.kaoshiBtn
					position absolute
					right 2%
					bottom 15%
					.default
						background: #fff;
						border: 2px solid #ccc;
						padding: 30px 40px;
						border-radius: 50px;
				.kaoshiScore
					position absolute
					right 2%
					top: 5%
					text-align center
					.default
						font-size 60px
						font-weight 900
						color #000
						p
							font-size 30px
							font-weight 300
							color #999
						i
							font-style: normal;
							font-size: 20px;
							font-weight: 300;
		    .el-button--primary
				width 95%
				height 90px
				line-height 90px
				display block
				border-radius 15px
				margin 20px 0 30px 0
				text-align center
				font-size 30px
</style>