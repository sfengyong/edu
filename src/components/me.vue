<template>
    <div id="me">
        <mt-header fixed title="我">
            <i class="iconfont" slot="right">&#xe73d;</i>
        </mt-header>
        <div class="info">
            <div class="avator">
                <img src="../image/loginbackground.jpg" alt="">
            </div>
            <div class="name">{{teacherInfo.name}}</div>
            <div class="position">主职位：教师</div>
        </div>
        <el-row>
            <el-col class="rol-textCenter" :span="3">
                <i class="iconfont">&#xe60a;</i>
            </el-col>
            <el-col class="rol-border" :span="21">
                <span>我要吐槽</span>
                <i class="iconfont right">&#xe603;</i>
            </el-col>
        </el-row>
        <el-row>
            <el-col class="rol-textCenter" :span="3">
                <i class="iconfont">&#xe602;</i>
            </el-col>
            <el-col class="rol-border"  :span="21">
                <span>关于我们</span>
                <i class="iconfont right">&#xe603;</i>
            </el-col>
        </el-row>
        <el-row @click.native="safe()">
            <el-col class="rol-textCenter" :span="3">
                <i class="iconfont">&#xe626;</i>
            </el-col>
            <el-col :span="21">
                <span>账号安全</span>
                <i class="iconfont right">&#xe603;</i>
            </el-col>
        </el-row>
        <el-row class="logout">
            <el-col class="rol-textCenter" :span="24" @click.native = "Logout()">
                <span>退出登录</span>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    import { mapGetters,mapActions } from 'vuex'
    export default{
        name:'me',
        computed:{
            ...mapGetters({
                teacherInfo:'teacherInfo'
            })
        },
        methods:{
            ...mapActions([
                'logout'
            ]),
            safe(){
                this.$router.push({path:'/accountSecurity'});
            },
            Logout(){
                this.logout();
                this.$router.replace({path:"/login"});
            }
        }
    }
</script>
<style lang="scss" rel="stylesheet/scss">
#me{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    background: rgba(153, 153, 153, 0.12);
    header{
        width: 100%;
        height: 1.1rem;
        font-size:0.5rem;
        box-sizing: border-box;
        /* padding: 1rem; */
        padding:0.16rem;
        text-align: center;
        position: relative;
        span{
            /* font-size: 2rem; */
            font-size: 0.32rem;
        }
        .iconfont{
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            /* right: 1.2rem;
            font-size: 2rem; */
            right: 0.39rem;
            font-size: 0.52rem;
        }
    }
    .info{
        width: 100%;
        box-sizing: border-box;
        /* padding: 1rem 0; */
        padding: 0.86rem 0;
        text-align: center;
        .avator{
            img{
                /* width: 6rem;
                height: 6rem; */
                width: 2.06rem;
                height: 2.06rem;
                border-radius: 50%;
                background: red;
            }
            .edit{
                vertical-align: top;
                position: absolute;
                /* right: 1rem; */
                right: 0.16rem;
                color: rgba(0,0,0,0.8);
            }
        }
        .name{
            /* margin-top: 1.5rem;
            font-size: 1.5rem; */
            margin-top: 0.24rem;
            font-size: 0.54rem;
            color: rgba(0,0,0,0.8);
        }
        .position{
            /* font-size: 1rem; */
            font-size: 0.36rem;
            color: rgba(0,0,0,0.8);
            margin-top: 0.1rem; 
        }
    }
    .el-row{
        background: white;

        .iconfont{
            /* font-size: 2.5rem; */
            font-size:0.9rem;
            color: #88b3c7;
        }
        .rol-textCenter{
            text-align: center;
        }
        .rol-border{
            /* border-bottom: 0.12rem solid #f3f3f3; */
            border-bottom: 0.02rem solid #f3f3f3;

        }
        .el-col{
            /* padding:1rem 0rem; */
            padding: 0.16rem 0rem;
            span{
                vertical-align: top;
                display: inline-block;
                /* margin-top: 0.28rem;
                font-size: 1.6rem; */
                margin-top:0.244rem;
                margin-left:0.2rem;
                font-size:0.456rem;
            }
            i{
                float: right;
            }
        }
    }
    .logout{
        /* margin-top: 2rem; */
        margin-top: 0.32rem;
    }
}
</style>
