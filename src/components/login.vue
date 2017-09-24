<template>
    <div id="login">
        <div class="loginWrap">
            <el-row>
                <el-col :span="2" :offset="4"><span class="iconfont">&#xe601;</span></el-col>
                <el-col :span="14" ><el-input v-model="workNumber" placeholder="请输入账号"></el-input></el-col>
            </el-row>
            <el-row>
                <el-col :span="2" :offset="4"><span class="iconfont">&#xe63d;</span></el-col>
                <el-col :span="14" ><el-input v-model="password" placeholder="请输入密码" type="password"></el-input></el-col>
            </el-row>
            <el-row>
                <el-col :span="14" :offset="5">
                    <el-button :loading="false" @click.native="Login()">登录</el-button>
                </el-col>
            </el-row>
        </div>
        <!-- <div id="particles-js"></div> -->
    </div>
</template>
<script>
    import { mapActions,mapGetters } from 'vuex'
    import axios from 'axios'
    require('particles.js')
    export default {
        name: 'login',
        data () {
            return {
                workNumber:'',
                password:''
            }
        },
        computed:{
            ...mapGetters({
                token:'token',
                loginState:'login'
            })
        },
        mounted(){
           /*  this.$nextTick(() => {
                this.initParticleJS()
            }) */
            if(this.loginState)
                this.$router.replace({ path: "/main"});
        },
        watch:{
            loginState:function (newVal,oldVal) {
                if(newVal){
                    this.getTeacherInfo(this.workNumber);
                    this.$router.replace({ path: "/main"});
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
                this.login({
                        workNumber:this.workNumber,
                        password:this.password
                    });
            },
            /* initParticleJS() {
                 particlesJS('particles-js', {
                    "particles": {
                        "number": {
                            "value": 80,
                            "density": {
                                "enable": true,
                                "value_area": 800
                            }
                        },
                        "color": {
                            "value": "#E4E4E4"
                        },
                        "shape": {
                            "type": "circle",
                            "stroke": {
                                "width": 0,
                                "color": "#000000"
                            },
                            "polygon": {
                                "nb_sides": 5
                            },
                            "image": {
                                "src": "img/github.svg",
                                "width": 100,
                                "height": 100
                            }
                        },
                        "opacity": {
                            "value": 0.5,
                            "random": false,
                            "anim": {
                                "enable": false,
                                "speed": 1,
                                "opacity_min": 0.1,
                                "sync": false
                            }
                        },
                        "size": {
                            "value": 10,
                            "random": true,
                            "anim": {
                                "enable": false,
                                "speed": 40,
                                "size_min": 0.1,
                                "sync": false
                            }
                        },
                        "line_linked": {
                            "enable": true,
                            "distance": 150,
                            "color": "#D1D1D1",
                            "opacity": 0.4,
                            "width": 1
                        },

                        "move": {
                            "enable": true,
                            "speed": 2,
                            "direction": "none",
                            "random": false,
                            "straight": false,
                            "out_mode": "out",
                            "attract": {
                                "enable": false,
                                "rotateX": 600,
                                "rotateY": 1200
                            }
                        }
                    },
                    "interactivity": {
                        "detect_on": "canvas",
                        "events": {
                            "onhover": {
                                "enable": true,
                                "mode": "grab"
                            },
                            "onclick": {
                                "enable": true,
                                "mode": "push"
                            },
                            "resize": true
                        },
                        "modes": {
                            "grab": {
                                "distance": 100,
                                "line_linked": {
                                    "opacity": 1
                                }
                            },
                            "bubble": {
                                "distance": 400,
                                "size": 40,
                                "duration": 2,
                                "opacity": 8,
                                "speed": 3
                            },
                            "repulse": {
                                "distance": 200
                            },
                            "push": {
                                "particles_nb": 4
                            },
                            "remove": {
                                "particles_nb": 2
                            }
                        }
                    },

                    "retina_detect": true
                });
            } */
        }
    }
</script>
<style lang="scss" rel="stylesheet/scss">
    #login{
        width: 100%;
        height: 100%;
        background: url("../image/loginbackground.jpg") no-repeat;
        /* background: rgba(105, 144, 141, 0.26); */
        background-size: 100% 100%;
        .loginWrap{
            position: absolute;
            width: 100%;
            top: 50%;
            transform: translateY(-50%);
            .el-row{
                /* margin-top: 1.2rem; */
                margin-top: 0.3rem;
                .el-col{
                    span{
                        font-size: 0.88rem;
                        /* font-size: 3rem; */
                        color: rgba(255, 255, 255, 0.7);
                    }
                    .el-input__inner{
                        background-color: rgba(255, 255, 255, 0);
                        border: none;
                        border-bottom: 1px solid #bfcbd9;
                        border-radius: 0px;
                        margin-top: -0.05rem;
                        color:rgba(255, 255, 255, 0.7);
                        /* font-size:1.8rem; */
                        font-size: 0.49rem;
                    }
                    .el-button{
                        width: 100%;
                        /* padding: 0.7rem; */
                        padding: 0.2rem;
                        background: rgba(255, 255, 255, 0);
                        span{
                            font-size:0.49rem;
                            /* font-size: 1rem; */
                        }
                        &:focus{
                            color: white;
                            border-color: #C4c4c4;
                        }
                    }
                }
            }
        }
        #particles-js {
            background-size: cover;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
        }
    }
</style>
