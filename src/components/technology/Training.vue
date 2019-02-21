<!-- 
* name: 技术培训
* author: fjd
* time: 2018-7-31
-->
<template>
   	<div class="Training">
		<!-- 导航 --> 
        <Header title='技术培训' @goBack="goBack"></Header>   
        <!-- 导航 -->
		<tabNav :tabNavArr="NavArr" @tabChange="updateTabValue($event)" :tabVal="tabValue"></tabNav>
		<NotInfo v-if="resData.length === 0 && !show" notClass="暂无技术培训列表信息" defaultImg="static/img/not-data-default.png"></NotInfo>
		<!-- 待报名-->
		<div class="passBox" v-if="tabValue===1">
			<div class="selectBox" v-for="(item,index) in resData" :key="index">
				<div class="passBox">
					<h3 class="head">{{item.trainTitle}}</h3>
					<p class="comCol">{{item.startTime}} 至 {{item.endTime}}</p>
					<p class="ctit">{{item.trainDesc}}</p>
					<div class="kaoshiBtn">
						<button class="default" @click="changePage(item)">
							报名培训
						</button>
					</div>
				</div>
			</div>
		</div>
		<!-- 历史培训 -->
		<div class="passBox" v-if="tabValue===2">
			<div class="selectBox" v-for="(item,index) in resData" :key="index" @click="changePage(item)">
				<div class="passBox">
					<h3 class="head">{{item.trainTitle}}</h3>
					<p class="comCol">{{item.startTime}} 至 {{item.endTime}}</p>
					<p class="ctit">{{item.trainDesc}}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import tabNav from '@/common/tabNav'
export default {
	name: 'Training',
	components:{
		"tabNav":tabNav
	},
    data(){
        return {
			tabValue: 				Number(sessionStorage.getItem("TrainingTabNavType")) || 1, //切换tab标签
            resData: [],
			params: {
				pageNum    : 1,
                pageSize  : 10
			},
			NavArr:  ["待报名","历史培训"],
			show: true
        }
	},
	methods:{
		updateTabValue(type) { //切换考试状态
			this.tabValue = type;
			window.sessionStorage.setItem("TrainingTabNavType", type);
			this.getList();
		},
		goBack(){
			// 返回
			this.$router.back(-1);
			window.sessionStorage.removeItem("TrainingTabNavType");
		},
		changePage(item){
			if(this.hasQx('comm:train:detail')){
				if(this.tabValue===1){
					this.$router.push({name:'TrainingDetail',query:{isStudent: true,trainId:item.trainId,type:1}});
				}else if(this.tabValue===2){
					this.$router.push({name:'TrainingDetail',query:{isStudent: true,trainId:item.trainId,type:2}});
				}
			}else{
				this.dialog('您无权进行该操作');
			}
		},
		async getList(){
			if(this.tabValue===1){
				this.params.status = '0'
			}else if(this.tabValue===2){
				this.params.status = '1'
			}
			 const res = await this.$axios.getStuTrainList(this.params);
			 this.resData = [];
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
        },
	},
	mounted() {
		this.getList();
	}
}
</script>


<style lang="stylus">
	.Training
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