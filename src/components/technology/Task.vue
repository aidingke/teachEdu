<!-- 
* name: 学生版作业
* author: fjd
* time: 2018-7-31
-->
<template lang="pug">
	.Task
		Header(title="作业",@goBack="goBack")
		// 导航
		appNav(:nameNumber="nameNumber", v-on:tabValue="updateTabValue($event)")
		// 写作业
		.passBox(v-if="tabValue===1")
			.selectBox(v-for="(item,index) in resData1", :key="index")
				.passBox
					h3.head {{item.name}}
					p.comCol {{item.time}}					
					p.ctit {{item.cont}}					
					.kaoshiBtn
						button.default 写作业
		// 完成作业
		.passBox(v-if="tabValue===2")
			.selectBox(v-for="(item,index) in resData2", :key="index")
				.passBox
					h3.head {{item.name}}
					| 					
					p.comCol {{item.time}}
					| 					
					p.ctit {{item.cont}}
</template>

<script>
import Nav from '@/components/technology/Tnav'
export default {
	name: 'Task',
	components:{
		"appNav":Nav
	},
    data(){
        return {
			tabValue: 				1, //切换tab标签
			nameNumber:             2,//如果是数字2就展示 作业菜单，即未、结束 
            resData1: [
				{"name": "2018年第一季度考核","time":'2018-05-06 14:00-16:00','cont':'汽车是空调的老板，此次开会针对空调冷却系统'},
				{"name": "2018年第一季度考核","time":'2018-05-06 14:00-16:00','cont':'汽车是空调的老板，此次开会针对空调冷却系统'},
				{"name": "2018年第一季度考核","time":'2018-05-06 14:00-16:00','cont':'汽车是空调的老板，此次开会针对空调冷却系统'},
				{"name": "2018年第一季度考核","time":'2018-05-06 14:00-16:00','cont':'汽车是空调的老板，此次开会针对空调冷却系统'},
				{"name": "2018年第一季度考核","time":'2018-05-06 14:00-16:00','cont':'汽车是空调的老板，此次开会针对空调冷却系统'},
				{"name": "2018年第一季度考核","time":'2018-05-06 14:00-16:00','cont':'汽车是空调的老板，此次开会针对空调冷却系统'}			
			],
			resData2: [
				{"name": "2019年第一季度考核","time":'2018-05-06 14:00-16:00','cont':'汽车是空调的老板，此次开会针对空调冷却系统'},
				{"name": "2019年第一季度考核","time":'2018-05-06 14:00-16:00','cont':'汽车是空调的老板，此次开会针对空调冷却系统'},
				{"name": "2019年第一季度考核","time":'2018-05-06 14:00-16:00','cont':'汽车是空调的老板，此次开会针对空调冷却系统'},
				{"name": "2019年第一季度考核","time":'2018-05-06 14:00-16:00','cont':'汽车是空调的老板，此次开会针对空调冷却系统'},
				{"name": "2019年第一季度考核","time":'2018-05-06 14:00-16:00','cont':'汽车是空调的老板，此次开会针对空调冷却系统'},
				{"name": "2019年第一季度考核","time":'2018-05-06 14:00-16:00','cont':'汽车是空调的老板，此次开会针对空调冷却系统'}					
			]
        }
	},
	methods:{
		goBack(){
			this.$router.back(-1)
		},
		updateTabValue(type) { //切换考试状态
			this.tabValue = type
		}
	},
	created(){
		// console.log(this.nameNumber)
	}
}
</script>


<style lang="stylus">
	.Task
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
					.default
						background: #fff;
						border: 2px solid #ccc;
						padding: 30px 40px;
						border-radius: 50px;
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