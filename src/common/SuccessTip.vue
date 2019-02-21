<template lang="pug">
    .success-dialog
        //- <el-button type="text" @click="dialogTableVisible = true">click Me!</el-button>
        <el-dialog :visible.sync="dialogTableVisible" center :show-close="false" :width="width">
            .content
                img(src="static/img/success.png")
                .name {{tip}}
                .time(v-if="sendMsgDisabled") {{time+'s回到'+hint}}
                    slot(name="stuResume-tip")
                .button-items
                    el-button(plain,@click="close") 知道了
        </el-dialog>
</template>
<script>
export default {
  name: "SuccessDialog",
  props: ["dialogTableVisible","tip","hint","width"],
  data() {
    return {
      time: 3, //默认时间3S
      sendMsgDisabled: true
    };
  },
  methods: {
    close() {    
      this.$emit("successDone", this.dialogTableVisible);
    }
  },
  watch:{
      dialogTableVisible(val) {
        let me = this;
        if (val) {
          me.sendMsgDisabled = true;
          let interval = window.setInterval(function() {
            me.time = --me.time;
            if (me.time <= 0) {
              me.sendMsgDisabled = false;
              window.clearInterval(interval); //停止
              me.time = 3;
              me.close();
            }
          }, 1000);
        }
    }
  }
};
</script>
<style lang="stylus">
.success-dialog {
    .content {
        text-align: center;

        img {
            width: 100px;
            height: 100px;
        }

        .name {
            color: #000;
            font-size: 30px;
            font-weight: bold;
            margin: 20px 0;
        }

        .time {
            color: #909399;
            margin: 50px 0;
        }

        .button-items {
            text-align: center;

            .el-button {
                padding: 30px 0;
                width: 80%;
                font-size: 30px;
            }
        }
    }
}
</style>

