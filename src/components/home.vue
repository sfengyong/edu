<template>
    <div id="home">
        <header>
            <span class="name">学霸君</span>
            <i class="iconfont">&#xe73d;</i>
        </header>
        <el-carousel :interval="4000" type="card" height="200px">
            <el-carousel-item v-for="item in 3" :key="item">
                <h3>{{ item }}</h3>
            </el-carousel-item>
        </el-carousel>
        <div class="function">
            <el-row :gutter="10">
                <el-col :span="6"><div class="wrap">
                    <div class="iconfont">&#xe791;</div>
                    <span class="name">课程管理</span>
                </div></el-col>
                <el-col :span="6"><div class="wrap">
                    <div class="iconfont">&#xe600;</div>
                    <span class="name">课消统计</span>
                </div></el-col>
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

</script>
<style lang="scss" rel="stylesheet/scss">
    #home{
        width: 100%;
        height: 100%;
        .el-carousel__item h3 {
            color: #475669;
            font-size: 14px;
            opacity: 0.75;
            line-height: 200px;
            margin: 0;
        }
        .el-carousel__item:nth-child(2n) {
            background-color: #99a9bf;
        }
        .el-carousel__item:nth-child(2n+1) {
            background-color: #d3dce6;
        }
        header{
            width: 100%;
            box-sizing: border-box;
            padding: 1rem;
            background: #fafafa;
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
        .el-carousel{
            margin-top: 0.4rem;
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
