<template>
    <div id="main">
        <router-view></router-view>
        <footer>
            <el-row>
                <el-col :span="12">
                    <div class="wrap">
                        <div class="iconfont active">&#xe640;</div>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="wrap">
                        <div class="iconfont">&#xe601;</div>
                    </div>
                </el-col>
            </el-row>
        </footer>
    </div>
</template>
<script>

</script>
<style lang="scss" rel="stylesheet/scss">
    #main{
        position: relative;
        width: 100%;
        height: 100%;

        footer{
            position: absolute;
            background: #fafafa;
            box-sizing:border-box;
            padding: 0.4rem;
            width: 100%;
            z-index: 10;
            bottom: 0;
            border-top:0.1rem solid #e5e6e6;
            .wrap{
                text-align: center;
                .iconfont{
                    font-size: 2.8rem;
                }
            }
            .active{
                color: #88b3c7 !important;
            }
        }
    }
</style>
