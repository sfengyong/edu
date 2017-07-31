<template>
  <div id="app">
      <router-view></router-view>
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
    }

</style>
