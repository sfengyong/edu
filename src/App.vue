<template>
  <div id="app">
      <div class="loginWrap">
        <el-row>
          <el-col :span="2" :offset="7"><span class="iconfont">&#xe601;</span></el-col>
          <el-col :span="8"></el-col>
        </el-row>
        <el-row>
          <el-col :span="2" :offset="7"><span class="iconfont">&#xe63d;</span></el-col>
          <el-col :span="8"></el-col>
        </el-row>
      </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  @font-face {
    font-family: 'iconfont';  /* project id 368210 */
    src: url('http://at.alicdn.com/t/font_jx0vyiu0zhph9f6r.eot');
    src: url('http://at.alicdn.com/t/font_jx0vyiu0zhph9f6r.eot?#iefix') format('embedded-opentype'),
    url('http://at.alicdn.com/t/font_jx0vyiu0zhph9f6r.woff') format('woff'),
    url('http://at.alicdn.com/t/font_jx0vyiu0zhph9f6r.ttf') format('truetype'),
    url('http://at.alicdn.com/t/font_jx0vyiu0zhph9f6r.svg#iconfont') format('svg');
  }
  .iconfont{
    font-family: iconfont;
    font-style: normal;
  }
  *{
    padding: 0;
    margin: 0;
  }
  html,body{
      width: 100%;
      height: 100%;
      font-size: 62.5%;
  }
#app{
  width: 100%;
  height: 100%;
  background: url("./image/loginbackground.jpg") no-repeat;
  background-size:100% 100%;
  .loginWrap{
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
    .el-row{
      .el-col{
        span{
          font-size: 3rem;
          color: rgba(255,255,255,0.7);
        }
      }
    }
  }
}
</style>
