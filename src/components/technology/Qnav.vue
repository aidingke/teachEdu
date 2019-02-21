<template>
   	<div class="navBox">
        <div class="nav" v-if="nameNumber===1"> 
            <router-link class="nav-item" tag="a"  to="/Questions">日常练习<i class="line"></i></router-link>
            <router-link class="nav-item" tag="a"  to="/Skill">技能考证<i class="line"></i></router-link>
		</div> 
		<div class="nav" v-else-if="nameNumber===2"> 
            <router-link class="nav-item" tag="a"  to="/WaitPass">待考核<i class="line"></i></router-link>
            <router-link class="nav-item" tag="a"  to="/GoingPass">进行中<i class="line"></i></router-link>
			<router-link class="nav-item" tag="a"  to="/EndPass">考核完成<i class="line"></i></router-link>			
		</div>  
		<div class="nav" v-else> 
            <router-link class="nav-item"  to="/Questions">待报名<i class="line"></i></router-link>
            <router-link class="nav-item"  to="/11">历史培训<i class="line"></i></router-link>
		</div>   
	</div>
</template>

<script>
export default {
	name:'Qnav',
	props:{
		nameNumber:{
			type:Number
		}
	},
    data(){
        return {
            styleObject: {
                color: 'red',
                fontSize: '13px'
            }
        }
	},
	created(){
		// console.log(this.nameNumber)
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