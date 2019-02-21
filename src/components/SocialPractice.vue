<!-- 
* name: 社会实践
* author: xwq
* time: 2018-11-30
-->
<template lang="pug">
    .social-practice
        Header(title="社会实践",@goBack="goBack")
        .container
            .col-wrap
                .col(@click="change(item.code,item.status,item.msg)" v-for="(item,key) in SocialPractice" :key="key")
                    .col-item
                        //a(href="javascript:void(0)")
                        img(:src="imgBaseUrl+item.code+'.png'") 
                        span {{item.title}}
</template>
<script>
export default {
  name: "SocialPractice",
  data() {
    return {
      userType: "",
      iosFlag: true,
      phpToken: "",
      iosFlag: "",
      imgBaseUrl: "static/img/",
      SocialPractice: [],                         //获取社会实践的列表数据
      allCode: [],                                //所有的code值
      locationBaseUrl: "objc://doFunc/",          //点击跳转的基础路径
      checkList: {
        menu_safe_check: "safetyDiagnosis",       //综合诊断
        menu_bill: "manageWork",                  //工单管理
        help_intelligent: "intelligentDiagnosis", //智能诊断  
        menu_solution: "ResolveProgram",          //解决方案
        specialCheck:  "SpecialDiagnosis"         //专项诊断跳转
      }
    };
  },
  mounted() {
    this.iosFlag = this.isIos();
    this.phpToken = localStorage.getItem("phpToken");
    //获取社会实践列表数据
    let params = {
      token: this.phpToken
    };
    this.$axios.getStuSocialPractice(params).then(res => {
      this.SocialPractice = res.data.indexMenu;
      res.data.indexMenu.forEach(item => {
        this.allCode.push(item.code);
      });
      console.log(res.data.indexMenu);
    });
  },
  methods: {
    goBack() {
      this.$router.push({
        path: "Home"
      });
    },
    change(code, status, msg) {
      let test = "menu_safe_check";
      let baseUrl = "";
      if (location.hostname === "http://192.168.1.198") {
        //生产
        baseUrl = "http://dev.demo.com/app/";
      } else if (location.hostname === "http://192.168.1.220") {
        //测试
        baseUrl = "http://static.demo.com/app/";
      } else {
        //默认开发
        baseUrl = "http://dev.demo.com/app/";
      }

      if (!(this.allCode.includes(code))) {
        return false;
      }
      if (status === "1") {
        if (this.iosFlag) {
          window.location = this.locationBaseUrl + this.checkList[code];
        } else {
          android.orderlist(this.checkList[code]);
        }
      }else{
          msg = ''?this.dialog('您无权进行该操作'):this.dialog(msg)   
      }






      // if(code===0){          //----------综合诊断
      // 		// console.log(status,typeof(status))
      // 	if(status==='1'){
      // 		if(this.iosFlag){
      // 			window.location = "objc://"+"doFunc"+"/"+"safetyDiagnosis";
      // 		}else{
      // 			android.orderlist("safetyDiagnosis");
      // 		}
      // 	}else{
      // 			msg = ' '?this.dialog('您无权进行该操作'):this.dialog(msg)
      // 	}
      //     //window.location.href = `${baseUrl}billimenu.html?token=${this.phpToken}&status=${this.iosFlag?'ios':'android'}&education=1&menuId=1`;
      // }else if(code===1){    //-----------工单管理8
      // 	if(status==='1'){
      // 		if(this.iosFlag){
      // 			window.location = "objc://"+"doFunc"+"/"+"manageWork";
      // 		}else{
      // 			android.orderlist("manageWork");
      // 		}
      // 	}else{
      // 			msg = ' '?this.dialog('您无权进行该操作'):this.dialog(msg)
      // 	}
      //     //window.location.href = `${baseUrl}menu.html?token=${this.phpToken}&status=${this.iosFlag?'ios':'android'}&education=1`;
      // }else if(code===2){                  //-----------智能诊断
      // 	if(status==='1'){
      // 		if(this.iosFlag){
      // 			window.location = "objc://"+"doFunc"+"/"+"intelligentDiagnosis";
      // 		}else{
      // 			android.orderlist("intelligentDiagnosis");
      // 		}
      // 	}else{
      // 			msg = ' '?this.dialog('您无权进行该操作'):this.dialog(msg)
      // 	}
      //     //window.location.href = `${baseUrl}cloudHelper/index.html?token=${this.phpToken}&status=${this.iosFlag?'ios':'android'}&education=1`
      // }else if(code===3){                  //-----------解决方案
      // 	if(status==='1'){
      // 		if(this.iosFlag){
      // 			window.location = "#";
      // 		}else{
      // 			android.orderlist("");
      //         }
      //         // window.location.href = `${baseUrl}resolveSolution/index.html?token=${this.phpToken}&status=${this.iosFlag?'ios':'android'}&education=1`
      //     }else{
      // 			msg = ' '?this.dialog('您无权进行该操作'):this.dialog(msg)
      // 	}
      // }else if(code===4){                  //-----------专项诊断
      // 	if(status==='1'){
      // 		if(this.iosFlag){
      // 			window.location = "#";
      // 		}else{
      // 			android.orderlist("");
      // 		}
      // 	}else{
      // 		msg = ' '?this.dialog('您无权进行该操作'):this.dialog(msg)
      // 	}
      // }
    }
  }
};
</script>
<style lang="stylus">
.social-practice {
  .container {
    background: #efefef;
    // height calc(100vh - 88px)
    position: fixed;
    left: 0;
    right: 0;
    height: 100%;
    overflow: scroll;

    .col-wrap {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      padding: 20px 15px;
      margin: 80px 0;

      .col {
        border-radius: 10px;
        text-align: center;
        width: 33.33%;
        cursor: pointer;

        .col-item {
          margin: 20px;
          background: #fff;
          border: 1px solid #e3e3e3; /* no */

          img {
            max-width: 130px;
            max-height: 130px;
            margin-top: 80px;
          }

          span {
            display: block;
            font-size: 30px;
            padding: 89px 0;
          }
        }
      }
    }
  }
}
</style>

