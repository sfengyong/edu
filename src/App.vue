<template>
  <div id="app">
      <transition name="show">
        <router-view></router-view> 
      </transition>
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
    src: url('http://at.alicdn.com/t/font_368210_bcrq9gx58ekzw7b9.eot');
    src: url('http://at.alicdn.com/t/font_368210_bcrq9gx58ekzw7b9.eot?#iefix') format('embedded-opentype'),
    url('http://at.alicdn.com/t/font_368210_bcrq9gx58ekzw7b9.woff') format('woff'),
    url('http://at.alicdn.com/t/font_368210_bcrq9gx58ekzw7b9.ttf') format('truetype'),
    url('http://at.alicdn.com/t/font_368210_bcrq9gx58ekzw7b9.svg#iconfont') format('svg');
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
      //font-size: 62.5%;
  }
  #app{
      width: 100%;
      height: 100%;
  }
  .show-enter-active,.show-leave-active{
      transition: opacity .4s ease-in , transform .4s ease-in;
  }
  .show-enter,.show-leave-active{
      opacity: 0;
      transform: scale(0);
  }

</style>
