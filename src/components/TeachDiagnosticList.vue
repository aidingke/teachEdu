<!-- 
* name: 教师管理报名学生总数
* author: fjd
* time: 2018-8-13
* 根据参数进来
-->

<template lang="pug">
	.TeachDiagnosticList
		Header(title="数据诊断",@goBack="goBack")
		<tabNav :tabNavArr="NavArr" @tabChange="updateTabValue($event)" :tabVal="digType"></tabNav>
		NotInfo(v-if="TeachDigList.length === 0 && !show" notClass="暂无相关数据" defaultImg="static/img/not-data-default.png")
		.passBox(v-if="TeachDigList.length>0 && show")
			.selectBox(v-for="(item,index) in TeachDigList", :key="index" @click="pageChange(item.digClassId)")
				.passBox
					h3.head {{item.courseName}}
					| 					
					p(style="margin:10px 0;") 
						span {{item.subjectName}}
					| 					
					p.ctit {{item.className}}
					| 					
					.kaoshiScore.comCol
						span.default {{item.stuNum}}
						| 
						p 班级人数
</template>

<script>
import tabNav from '@/common/tabNav'
export default {
	name: 'TeachDiagnosticList',
	components:{
		"tabNav":tabNav
	},
    data(){
        return {
			digType: Number(sessionStorage.getItem("digType")) || 1,
			NavArr:	["进行中","已结束"],
			TeachDigList: [	
				// {
				// 	digClassId: "1", // 诊断班级ID
				// 	subjectName: "电控，制冷", // 科目名称
				// 	className: "18级计算机系空调班", // 班级名称
				// 	courseName: "2017-07-25 第一节课至第二节课", // 课程名称
				// 	stuNum: "36" // 班级人数
				// }
			],
			show: true
        }
	},
	methods:{
		pageChange(digClassId){ // 跳转到教师诊断详情
			if(this.hasQx('teach:diagnose:stuList')){
				this.$router.push({
					name: 'TeachDiagnosticDetail',
					query: {
						digClassId: digClassId
					}
				});
			}else{
				this.dialog('您无权进行该操作');
			}
		},
		goBack(){
			// 返回
			this.$router.back(-1);
			window.sessionStorage.removeItem("digType");
		},
		updateTabValue(type) { //切换考试状态
			this.digType = type;
			window.sessionStorage.setItem("digType", type);
			this.getTeachDiagnoseList();
		},
		async getTeachDiagnoseList(){
			//传参获得列表
			let params = {
				pageNo: 1,
				pageSize: 1000000000
			};
			if(this.digType===1){
				params.digType = "0";
			} else if(this.digType===2){
				params.digType = "1";
			}
			const res = await this.$axios.getTeachDiagnoseList(params);
			this.TeachDigList = [];
			if(res.code===1000){ 
				if(res.data.length>0){
					this.show = true;
				}else{
					this.show = false;
				}
				this.TeachDigList = res.data;
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
		this.getTeachDiagnoseList()
	},
}
</script>


<style lang="stylus">
	.TeachDiagnosticList
		background :#eee;
		.selectBox
			margin-top 30px;
			background #fff;
			border-bottom 4px solid #ddd;
			padding 0 30px 0 30px;
			height 222px;
			.passBox
				position relative
				padding 0 0 30px 0
				font-size 35px
				height 100%;
				.head
					padding-top 25px
					color #555
				p
					font-size 30px	
				.comCol
					color #E7A544	
					margin: 20px 0;
				.ctit
					color #888
				.kaoshiBtn
					position absolute
					right 2%
					bottom 15%;
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
					bottom 26%
					text-align center
					.default
						font-size 60px
						font-weight: 600;
						color: #e7a544;
						i
							font-style: normal;
							font-size: 20px;
							font-weight: 300;


</style>