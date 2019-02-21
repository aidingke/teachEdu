<!-- 
* name: 综合查询（视频列表）组件
* author: gxr
* time: 2018-8-1
-->
<template lang="pug">
    .videoDetails
        Header(title="视频详情", @goBack="goBack" v-if="headerLen")
        .img(@click="handleVideoClick" v-show="flag") 
            img(:src="imgUrl")
            #J_prismPlayer_component_C2090888-EC27-42F9-9D7E-6309DB4C9F5E.prism-big-play-btn.pause
                .outter(style='\
                /* display: none; */\
                ')
        iframe(:src='payUrl', width='100%', height='100%' v-if="isIframe")
        .videoConts(v-show="isPlayStart")
            <div id="J_prismPlayer" class="prism-player"></div>
        .videoInfo(v-if="!isIframe")
            h3 {{renderObj.videoName}}
            p.num 
                span {{renderObj.playNum}}个播放量 
                span {{renderObj.videoTime}}
            .videoDesc
                strong 视频简介
                .descConts {{renderObj.videoDesc}}
</template>
<script>
export default {
  name: "VideoDetails",
  data() {
    return {
      renderObj: {
        videoTime: "",
        videoName: "",
        videoUrl: "",
        videoDesc: "",
        playNum: ""
      },
      player: null,
      payUrl: "",
      payStatus: "",
      imgUrl: "",
      isPlayStart: false
    };
  },
  computed: {
    isIframe() {
      return this.payStatus === "0" ? true : false;
    },
    flag() {
      if (this.payStatus === "0" || this.isPlayStart === true) {
        return false
      } else {
        return true
      }
    },
    headerLen() {
      return document.querySelectorAll(".header").length > 1 ? false : true;
    }
  },
  methods: {
    goBack() {
      //返回按钮
      this.$router.push({
        path: "/VideoList"
      });
    },
    async getVideoDetail() {
      //获取视频详情
      const params = {};
      params.videoId = this.$route.query.videoId;
      params.frontUrl = window.location.href;
      const res = await this.$axios.getVideoDetail(params);
      if (res.code == 1000) {
        this.renderObj = res.data;
        this.payUrl = res.data.payUrl;
        this.payStatus = res.data.payStatus; // 支付状态 0-待支付 1-支付成功
      } else {
        this.dialog(res.message);
      }
    },
    playering: function(vid, url) {
      //实例化视频播放器
      var _this = this;
      this.$nextTick(function() {
        _this.player = new Aliplayer({
          id: "J_prismPlayer",
          autoplay: true,
          width: "100%",
          height: "100%",
          playsinline:true,
          vid: vid,
          playauth: url,
          useFlashPrism:true,
        });
      });
    },
    handleVideoClick() {
      console.log(this.isDevice())
      this.isPlayStart = true;
      if(this.isDevice()==='pc'){
          this.playering(this.renderObj.videoUrl, this.renderObj.playAuth);
          return;
      }else{
          if (this.isIos()) {
            window.location = 'objc://doFunc/alPlayer/'+this.renderObj.videoUrl+'/'+encodeURIComponent(this.renderObj.playAuth);
          } else if (!this.isIos()) {
            android.orderlist("alPlayer", this.renderObj.videoUrl, this.renderObj.playAuth);
          }
      }
    }
  },
  mounted() {
    this.getVideoDetail();
  },
  created() {
    if (!document.getElementById("prismH5")) {
      var script = document.createElement("script");

      script.src = "https://g.alicdn.com/de/prismplayer/2.3.0/aliplayer-min.js";
      script.id = "prismH5";
      document.body.appendChild(script);
    }
    this.imgUrl = this.$route.query.imgUrl;
    // this.renderObj = this.$route.params.renderObj;
    // this.payUrl = this.$route.params.payUrl;
    // this.payStatus = this.$route.params.payStatus;
  }
};
</script>
<style lang="stylus">
@import '../../common/style/prism.css'
.videoDetails
    width 100%
    height 100%
    .prism-big-play-btn
        position absolute
        left 30px
        bottom 30px
        display block
        background url('https://g.alicdn.com/de/prismplayer/2.7.2/skins/default/img/bigplay.png') no-repeat
        background-size contain
        width 128px
        height 128px
    .img
        position relative
        width 100%
        padding-bottom 56.25%
        img
            position absolute
            top 0
            left 0
            width 100%
            height 100%
    .videoConts
        width 100%
        height 0
        padding-bottom 56.25%
        position relative
        .prism-player
            width 100%
            height 100%
            position absolute
            top 0
            left 0
    .videoInfo
        padding 30px
        h3
            font-size 32px
            margin-bottom 20px
        .num
            font-size 26px
            margin-bottom 20px
            color #a5a7ac
            span
                margin-right 20px
        .videoDesc
            display flex
            color #303133
            .descConts
                flex 1
                margin-left 50px
                color #636465
</style>