<template>
    <div id="login">
        <div class="loginWrap">
            <el-row>
                <el-col :span="2" :offset="7"><span class="iconfont">&#xe601;</span></el-col>
                <el-col :span="8"><el-input v-model="input" placeholder="请输入账号"></el-input></el-col>
            </el-row>
            <el-row>
                <el-col :span="2" :offset="7"><span class="iconfont">&#xe63d;</span></el-col>
                <el-col :span="8"><el-input v-model="input" placeholder="请输入密码"></el-input></el-col>
            </el-row>
            <el-row>
                <el-col :span="10" :offset="7">
                    <el-button :loading="false" @click="login()">登录</el-button>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'login',
        data () {
            return {
                input:''
            }
        },
        methods:{
            login:function(){

            }
        }
    }
</script>
<style lang="scss" rel="stylesheet/scss">
    #login{
        width: 100%;
        height: 100%;
        background: url("../image/loginbackground.jpg") no-repeat;
        background-size: 100% 100%;
        .loginWrap{
            position: absolute;
            width: 100%;
            top: 50%;
            transform: translateY(-50%);
            .el-row{
                margin-top: 1.2rem;
                .el-col{
                    span{
                        font-size: 3rem;
                        color: rgba(255, 255, 255, 0.7);
                    }
                    .el-input__inner{
                        background-color: rgba(255, 255, 255, 0);
                        border: none;
                        border-bottom: 1px solid #bfcbd9;
                        border-radius: 0px;
                        margin-top: -0.45rem;
                    }
                    .el-button{
                        width: 100%;
                        padding: 0.7rem;
                        background: rgba(255, 255, 255, 0);
                        span{
                            font-size: 1rem;
                        }
                        &:focus{
                            color: white;
                            border-color: #C4c4c4;
                        }
                    }
                }
            }
        }
    }
</style>
