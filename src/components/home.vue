<template>
    <div id="home">
        <mt-header fixed title="学霸君">
            <i class="iconfont" slot="right">&#xe73d;</i>
        </mt-header>
        <mt-swipe :show-indicators="false">
            <mt-swipe-item>1</mt-swipe-item>
            <mt-swipe-item>2</mt-swipe-item>
            <mt-swipe-item>3</mt-swipe-item>
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
                    <div class="wrap">
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
export default{
    name:'home',
    data(){
        return {

        }
    },
    methods:{
        courseManage(){
            this.$router.push({path:"/courseManage"})
        }
    }
}
</script>
<style lang="scss" rel="stylesheet/scss">
    #home{
        width: 100%;
        height: 100%;
        header{
            width: 100%;
            box-sizing: border-box;
            padding: 1rem;
           /*  background: #fafafa; */
            text-align: center;
            position: relative;
            span{
                font-size: 2rem;
            }
            .iconfont{
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                right: 1.2rem;
                font-size: 2rem;
            }
        }
        .mint-swipe{
            height: 25%;
        }
        .function{
            width: 100%;
            box-sizing: border-box;
            padding: 1.3rem 2rem;
            border-top: 0.1rem solid #e5e6e6;
            .wrap{
                text-align: center;
                .iconfont{
                    font-size: 2.8rem;
                    color: #88b3c7;
                }
                .name{
                    font-size: 1rem;
                }
            }
        }
        .announcement{
            width: 100%;
            margin-top: 10rem;
            .title{
                width: 100%;
                box-sizing:border-box;
                padding: 0.3rem 2rem;
                background: #fafafa;
                border-top:0.1rem solid #e5e6e6;
                border-bottom:0.1rem solid #e5e6e6;
                font-size: 1.5rem;

            }
        }
    }
</style>
