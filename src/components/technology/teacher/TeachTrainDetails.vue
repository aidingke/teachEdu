<!-- 
* name: 教师管理报名学生总数
* author: fjd
* time: 2018-8-13
* 根据参数进来
-->

<template>
   	<div class="TeachTrainDetails">
		<!-- 导航 --> 
        <Header title='报名学生列表' @goBack="goBack"></Header>    
		<div class="passBox box">
			<div class="selectBox" v-for="(item,index) in resData" :key="index">
				<div class="passBox">
					<h3 class="head"><span style="float:right;font-weight:300;font-size:16px;color:#999">{{item.stuTrainTime}}</span>{{item.stuName}}</h3>
					<p class="ctit" style="margin-top:20px">学号 {{item.stuNo}}</p>
					<p class="ctit">{{item.className}}</p>
				</div>
			</div>
		</div>
		<NotInfo v-if="resData.length === 0 && !show" notClass="暂无报名学生列表信息" defaultImg="static/img/not-data-default.png"></NotInfo>
	</div>
</template>

<script>
export default {
	name: 'TeachTrainDetails',
    data(){
        return {
			digType: "1",
			resData: [	],
			trainId: "",
			show: true
        }
	},
	methods:{
		goBack(){
			// 返回
			this.$router.back(-1);
		},
		async getTeachTrainStuList(){
			//传参获得列表
			let params = {
				trainId: this.trainId,
				pageNo: 1,
				pageSize: 10
			};
			const res = await this.$axios.getTeachTrainStuList(params);
			if(res.code===1000){
				if(res.data.length>0){
					this.show = true;
				}else{
					this.show = false;
				}
				this.resData = res.data;
			}else{
				this.show = false;
				if(res.code===1100){ // 暂无数据，不弹窗
					return ;
				}else{
					this.dialog(res.message);
				}
			}
		}
	},
	mounted() {
		let trainId = this.$route.query.trainId;
		if(trainId){
			this.trainId = trainId;
		}
		this.getTeachTrainStuList()	
	},
}
</script>


<style lang="stylus">
	.TeachTrainDetails
		background :#eee;
		.box	
			height 100%
			margin-top 30px
		.itemBtn 
			font-size 24px;
		.selectBox
			margin-bottom 30px;
			background #fff;
			border-bottom 4px solid #ddd;
			padding 0 30px 0 30px;
			height 222px;
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