<template>
    <div id="home">
        <mt-header fixed title="学霸君">
            <i class="iconfont" slot="right">&#xe73d;</i>
        </mt-header>
        <mt-swipe :show-indicators="false">
            <mt-swipe-item><img src="../image/swipe-1.jpg" alt=""></mt-swipe-item>
            <mt-swipe-item><img src="../image/swipe-2.jpg" alt=""></mt-swipe-item>
            <mt-swipe-item><img src="../image/swipe-3.jpg" alt=""></mt-swipe-item>
        </mt-swipe>
        <div class="function">
            <el-row :gutter="10">
                <el-col :span="6">
                    <div class="wrap" @click="courseManage">
                        <div class="iconfont">&#xe791;</div>
                        <span class="name">课程管理</span>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="wrap" @click="classCount">
                        <div class="iconfont">&#xe600;</div>
                        <span class="name">课消统计</span>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="announcement">
            <div class="title">公告</div>
            <div class="content">
                <el-row></el-row>
            </div>
        </div>
    </div>
</template>
<script>
    import { Swipe, SwipeItem } from 'mint-ui'
export default{
    name:'home',
    data(){
        return {

        }
    },
    methods:{
        courseManage(){
            this.$router.push({path:"/courseManage"})
        },
        classCount(){
            this.$router.push({path:"/classCount"});
        }
    }
}
</script>
<style lang="scss" rel="stylesheet/scss">
    #home{
        width: 100%;
        height: 100%;
        position: relative;
        header{
            width: 100%;
            height: 1.1rem;
            box-sizing: border-box;
            font-size:0.5rem;
            padding:0.16rem;
            text-align: center;
            position: relative;
            span{
                font-size: 0.32rem;
            }
            .iconfont{
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                right:0.39rem;
                font-size:0.52rem;
            }
        }
        .mint-swipe{
            height: 3.5rem;
            img{
                width:100%;
                height: 100%;
            }
        }
        .function{
            width: 100%;
            box-sizing: border-box;
            padding: 0.208rem 0.32rem;
            border-top:0.02rem solid #e5e6e6;
            .wrap{
                text-align: center;
                .iconfont{
                    font-size: 0.95rem;
                    color: #88b3c7;
                }
                .name{
                    font-size: 0.36rem;
                }
            }
        }
        .announcement{
            width: 100%;
            margin-top: 1.6rem;
            .title{
                width: 100%;
                box-sizing:border-box;
                padding: 0.15rem 0.32rem;
                background: #fafafa;
                border-top:0.02rem solid #e5e6e6;
                border-bottom: 0.02rem solid #e5e6e6;
                font-size: 0.54rem;

            }
        }
    }
</style>
