<template>
    <div id="main">
        <mt-tab-container v-model="currentComponent" swipeable>
            <mt-tab-container-item id="home">
                <home></home>
            </mt-tab-container-item>
            <mt-tab-container-item id="me">
                <me></me>
            </mt-tab-container-item>
        </mt-tab-container>
        <mt-tabbar v-model="currentComponent" fixed>
            <mt-tab-item id="home">
                <div class="iconfont">&#xe640;</div>
            </mt-tab-item>
            <mt-tab-item id="me">
                <div class="iconfont">&#xe601;</div>
            </mt-tab-item>
        </mt-tabbar>
    </div>
</template>
<script>
    import home from "./home.vue"
    import me from  "./me.vue"
    export default{
        name:'main',
        data(){
          return {
              currentComponent: "home"
          }
        },
        components:{
            home:home,
            me:me
        },
        methods:{
        }
    }
</script>
<style lang="scss" rel="stylesheet/scss">
    #main{
        position: relative;
        width: 100%;
        height: 100%;
        .mint-tab-item{
            .iconfont{
                font-size: 0.7rem; 
            }
        }
        .mint-tab-container{
            width: 100%;
            height: 100%;
            .mint-tab-container-wrap{
                width: 100%;
                height: 100%;
                .mt-tab-container-item{
                    width: 100%;
                    height: 100%;
                    
                }
            }
        }
    }
</style>
