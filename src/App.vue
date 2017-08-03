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
        src: url('http://at.alicdn.com/t/font_qahlyhqre3f03sor.eot');
        src: url('http://at.alicdn.com/t/font_qahlyhqre3f03sor.eot?#iefix') format('embedded-opentype'),
        url('http://at.alicdn.com/t/font_qahlyhqre3f03sor.woff') format('woff'),
        url('http://at.alicdn.com/t/font_qahlyhqre3f03sor.ttf') format('truetype'),
        url('http://at.alicdn.com/t/font_qahlyhqre3f03sor.svg#iconfont') format('svg');
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
