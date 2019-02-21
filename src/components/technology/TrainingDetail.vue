<!-- 
* name: 教师或学生版技术培训详情
* author: fjd
* time: 2018-7-31
-->
<template>
   	<div class="teach-training">
		<!-- 导航 --> 
        <Header title='技术培训' @goBack="goBack"></Header>    

		<!-- 报名培训 -->
		<div class="passBox" v-if="resData" >
			<div class="selectBox">
				<div class="passBox">
					<h3 class="head">{{resData.trainTitle}}</h3>
					<p class="comCol">培训时间：{{resData.startTime}} {{resData.endTime}}</p>
					<p class="cimg"> 
						<img v-for="(v,i) in resData.pic" :key="i" :src="imgUrl+v" />
					</p>
					<p class="ctit">
						描述：{{resData.trainDesc}}
					</p>
					<div class="kaoshiScore">
						<template v-if="isStudent">
							<template v-if="resData.isTrain==='0'">
								<el-button type="primary" @click="dialogVisible=true" style="margin-top:20px" v-if="registPermission">报名培训</el-button>
							</template>
							<template v-if="resData.isTrain==='1'">
								<el-button type="primary" @click="dialogVisible=true" style="margin-top:20px" v-if="registPermission" disabled>已报名</el-button>
							</template>
						</template>
						<template v-else-if="isStudent">
							<span class="default">
								{{resData.trainStuNum}}
								<p>报名人数</p>
							</span>
						</template>
					</div>
				</div>
			</div>
		</div>
        <div class="passBox" v-else>暂无数据</div>
		<el-button type="primary" @click="ViewStudents" class="seeStu" v-show="!isStudent" v-if="hasQx('teach:train:stuList')">查看报名学生 ( {{trainStuNum}} )</el-button>
		<el-dialog
		title="报名培训"
		:visible.sync="dialogVisible"
		width="50%">
		<span>确定要报名参加培训吗</span>
		<span slot="footer" class="dialog-footer">
			<el-button type="primary" @click="stuTrainJoin">报名</el-button>
			<el-button @click="dialogVisible = false">取 消</el-button>
		</span>
		</el-dialog>
		<SuccessTip :dialogTableVisible="dialogTableVisible" @successDone="done" :tip="tip" :hint="hint"></SuccessTip>
	</div>
</template>

<script>
import SuccessTip from "../../common/SuccessTip.vue";
import baseURL from '../../apiconfig'
export default {
	name: 'teach-training',
	components: {
		SuccessTip
	},
    data(){
        return {
			tabValue: 				1, //切换tab标签
			nameNumber:             6,//如果是数字6就展示 培训菜单，即进行中、历史培训 
            showAdd:             	false, 
            userType:               '0',
            resData:                {},
			trainId:                '',
			trainStuNum:            0,    // 报名学生个数 
			isStudent: 				false,   // 是否是学生版，true为是，默认为false  
			type: 					1 ,   // 是否进行中，true为是，默认为false  
			dialogVisible: 			false, // 是否显示弹窗，默认不显示
			tip: 					"报名成功", // 
			dialogTableVisible: 	false,
			type:					false,
			imgUrl: 				baseURL.img_api,
			hint:					"详情页",
			registPermission:		false // 是否有报名权限，默认没有
        }
	},
	methods:{
		openAddInfo(){
			this.showAdd = true
		},
		ViewStudents(){
			this.$router.push({
				path:'TeachTrainDetails',
				query:{
					trainId: this.trainId,
					// trainStuNum: trainStuNum
				}
			})
		},
		// 监听子组件的事件，完成时，重新获取获取某班级的课程表信息并关闭弹窗
		done() {
			this.dialogTableVisible = false;
			this.getList();
		},
		goBack(){
			// 返回
			this.$router.back(-1);
		},
        async getList(){
            let params = {
                trainId : this.trainId
            }
			const res = await this.$axios.getTeachTrainDetail(params);
			if(res.code===1000){
				this.resData = res.data;
				this.resData.trainStuNum = this.trainStuNum;
				this.resData.pic = res.data.pic.split(",");
			}else{
				if(res.code===1100){ // 暂无数据，不弹窗
					return ;
				}else{
					this.dialog(res.message);
				}
			}
		},
		async stuTrainJoin(){
			// 报名培训
			const res = await this.$axios.stuTrainJoin({trainId:this.resData.trainId});
			if(res.code === 1000){
				this.dialogVisible = false;
				this.dialogTableVisible = true;
			}else{
				this.dialog(res.message)
			}
		},
	},
	created(){
		this.userType = localStorage.getItem('userType');
		let query = this.$route.query;
        if(query.trainId){
            this.trainId = query.trainId;
		}
		if(query.trainStuNum){
			this.trainStuNum = query.trainStuNum;
		}
		if(query.isStudent){
			if(query.isStudent=="false" || query.isStudent==false){
				this.isStudent = false;
			}else if(query.isStudent=="true" || query.isStudent==true){
				this.isStudent = true;
			}
		}
		this.type = false;
		if(query.type===1){ // 进行中
			this.type = true;
		}
		if(this.userType==='1'){ // 学生
			if(this.hasQx('stu:train:join')){ // 有报名培训权限
				this.registPermission = true;
				if(!this.type){
					this.registPermission = false;
				}
			}else{ // 无报名培训权限
				this.registPermission = false;
			}
		}else if(this.userType==='0'){ // 老师

		}
    },
    mounted(){
        this.getList()
    }
}
</script>


<style lang="stylus">
	.teach-training
		background :#eee;
		.seeStu
			width: 96%;
			position: fixed;
			bottom: 1%;
			left: 2%;
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
				.cimg
					border-top 1px solid #eee
					margin-top 15px
					padding-top 20px
					img
						height: 120px;
						width: 120px;
						margin-right: 20px;	
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
		.uploadBtn
			position fixed
			right  2%
			bottom  2%
			font-size  14px
			z-index 500
			border-radius  150px
			.prel
				position relative
				width  150px
				height  150px
				color  #fff
				background  #148ce8
				z-index  500
				border-radius  150px
				border: 12px solid #BCDEF8;
				.upBox
					width  150px
					height  150px
					border-radius 50px
					position absolute
					top 50%
					left 50%
					margin -50% 0 0 -50%
					text-align  center
					p
						text-align center
						font-size 60px
					.itemBtn
						color #fff
						text-decoration none	
		.el-dialog__wrapper
			.el-upload 
				border: 1px dashed #d9d9d9
				border-radius: 6px
				cursor: pointer
				position: relative
				overflow: hidden
				.avatar-uploader-icon
					font-size: 28px
					color: #8c939d
					width: 178px
					height: 178px
					line-height: 178px
					text-align: center
			.el-button--primary,.el-button--default
				width 47%
				height 90px
				display inline-block
				border-radius 10px
				margin 20px 0 30px 0  
				span	
					font-size 32px		
			.el-dialog
				width 65%
			.el-dialog__header
				text-align center
				padding-top 50px
				.el-dialog__title
					font-size 40px
					font-weight 900
			.el-dialog__body
				padding 30px 60px
				.el-form-item__label
					font-size 32px
					margin-bottom 20px
					display: block
					float: none
					text-align: left
				.el-input__inner
					height 70px
					width 100%	
					border none	
					input 
						height 60px
						line-height 60px
						width 86%
						margin-left 15px
						color #666
						border 1px solid #ccc
						// border-radius 15px 0 0 15px
						padding-left: 15px
					.el-dialog__headerbtn
						position static	
						line-height 60px
						height 60px
						border 1px solid #ccc
					.closeBtn
						position absolute
						font-size 50px	
						height: 82%
						right 3%
						border-left 1px solid #ccc
						padding-top 1%
						width: 7%							

</style>