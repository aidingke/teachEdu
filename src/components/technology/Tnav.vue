<!-- 
* name: tab切换菜单
* author: fjd
* time: 2018-7-31
-->
<template>
   	<div class="navBox">
		<div class="nav" v-if="nameNumber===1">  
            <div class="nav-item" :class="tabValue ==1?'active':''" @click="tabChange(1)" >待考核<i class="line"></i></div>
            <div class="nav-item" :class="tabValue ==2?'active':''" @click="tabChange(2)" >进行中<i class="line"></i></div>
			<div class="nav-item" :class="tabValue ==3?'active':''" @click="tabChange(3)" >考核完成<i class="line"></i></div>			
		</div>  
		<div class="nav" v-if="nameNumber===2">  
            <div class="nav-item" :class="tabValue ==1?'active':''" @click="tabChange(1)" >未完成<i class="line"></i></div>
            <div class="nav-item" :class="tabValue ==2?'active':''" @click="tabChange(2)" >已完成<i class="line"></i></div>			
		</div> 
		<div class="nav" v-if="nameNumber===3">  
            <div class="nav-item" :class="tabValue ==1?'active':''" @click="tabChange(1)" >待报名<i class="line"></i></div>
            <div class="nav-item" :class="tabValue ==2?'active':''" @click="tabChange(2)" >历史培训<i class="line"></i></div>			
		</div>
		<div class="nav" v-if="nameNumber===4">  
            <div class="nav-item" :class="tabValue ==1?'active':''" @click="tabChange(1)" >待批卷<i class="line"></i></div>
            <div class="nav-item" :class="tabValue ==2?'active':''" @click="tabChange(2)" >批卷完成<i class="line"></i></div>			
		</div>  
		<div class="nav" v-if="nameNumber===5">  
            <div class="nav-item" :class="tabValue ==1?'active':''" @click="tabChange(1)" >未批改<i class="line"></i></div>
            <div class="nav-item" :class="tabValue ==2?'active':''" @click="tabChange(2)" >已完成<i class="line"></i></div>			
		</div> 
		<div class="nav" v-if="nameNumber===6"><!-- 教师版技术培训 -->
            <div class="nav-item" :class="tabValue ==1?'active':''" @click="tabChange(1)" >进行中<i class="line"></i></div>
            <div class="nav-item" :class="tabValue ==2?'active':''" @click="tabChange(2)" >历史培训<i class="line"></i></div>			
		</div> 
		<div class="nav" v-if="nameNumber===7"><!-- 题库 -->
            <div class="nav-item" :class="tabValue ==1?'active':''" @click="tabChange(1)" >日常练习<i class="line"></i></div>
            <div class="nav-item" :class="tabValue ==2?'active':''" @click="tabChange(2)" >技能考证<i class="line"></i></div>			
		</div> 
	</div>
</template>

<script>
export default {
	name:'Tnav',
	props:{
		nameNumber:{
			type:Number
		}
	},
    data(){
        return {
            tabValue: 				1 //切换tab标签
        }
	},
	methods:{
		tabChange(type) { //切换考核状态，子传父组件
			this.tabValue = type;
			this.$emit("tabValue",type);
		}
	},
	created(){
	}
}
</script>


<style scoped>
	.navBox{
		background: #fff;
	}
	.nav{
		display:flex;
		width: 100%;
		height: 110px;
		line-height: 110px;
        width: 75%;
        margin: 0 auto;
	}
	.nav-item{
		flex:1;
		font-size: 30px;
		text-align: center;
		text-decoration: none;
		position: relative;
        color: #333;
	}
	.nav .active{
		color:#148CE8;
        font-weight:900;
	}
	.nav .active .line{
		width: 120px;
		height: 5px;
		display: inline-block;
		background: #148CE8;
		position: absolute;
		left: 50%;
		bottom:-1%;
		margin-left: -60px;
	}
</style>