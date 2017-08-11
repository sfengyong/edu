<template>
    <div id="login">
        <div class="loginWrap">
            <el-row>
                <el-col :span="2" :offset="4"><span class="iconfont">&#xe601;</span></el-col>
                <el-col :span="14"><el-input v-model="username" placeholder="请输入账号"></el-input></el-col>
            </el-row>
            <el-row>
                <el-col :span="2" :offset="4"><span class="iconfont">&#xe63d;</span></el-col>
                <el-col :span="14"><el-input v-model="password" placeholder="请输入密码" type="password"></el-input></el-col>
            </el-row>
            <el-row>
                <el-col :span="14" :offset="5">
                    <el-button :loading="false" @click="Login()">登录</el-button>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
    import { mapActions,mapGetters } from 'vuex'
    import axios from 'axios'

    export default {
        name: 'login',
        data () {
            return {
                username:'',
                password:''
            }
        },
        computed:{
            ...mapGetters({
                token:'token',
                loginState:'login'
            })
        },
        watch:{
            loginState:function (newVal,oldVal) {
                if(newVal){
                    this.router.replace({ path: "/main"});
                }
            }
        },
        methods:{
            ...mapActions([
                'login',
                'getTeacherInfo'
            ]),
            Login:function(){
                var _this = this;
                new Promise(function (resolve,reject) {
                    _this.login({
                        username:_this.username,
                        password:_this.password
                    });
                    if(_this.token)
                        resolve(_this.token);
                    else
                        reject()
                }).then(function (token) {
                        _this.getTeacherInfo(token);
                        _this.$router.push({path:"/main"});
                    },function () {
                        console.log("token is null")
                    })

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
                        color:rgba(255, 255, 255, 0.7);
                        font-size:1.8rem;
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
