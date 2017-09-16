<template>
    <div id="changePassword">
        <mt-header fixed title="修改密码">
            <router-link to="/accountSecurity" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
            <mt-button icon="more" slot="right"></mt-button>
        </mt-header>
        <div class="emptyWrap"></div>
        
        <div class="item">
            <div class="password">
                <span class="title">旧密码</span>
                <input type="password" v-model="oldPassword">
            </div>
            <div class="password">
                <span class="title">新密码</span>
                <input type="password" v-model="newPassword">
            </div>
            <div class="password">
                <span class="title">确认密码</span>
                <input type="password" v-model="confirmPassword">
            </div>
        </div>
        <div class="item" @click="confirm">
            <mt-button type="primary">确认修改</mt-button>
        </div>
        <loading v-show="loadingShow"></loading>
    </div>
</template>
<script>
    import loading from "./loading.vue"
    import { _post } from "../api/axios"
    import { POST_URL } from "../api/config"
    import { tip } from "../util/tip"
    import { mapGetters } from 'vuex'
    export default{
        data(){
            return{
                oldPassword:"",
                newPassword:"",
                confirmPassword:"",
                loadingShow:false
            }
        },
        computed:{
            ...mapGetters({
                teacherInfo:"teacherInfo"
            })
        },
        components:{
            loading:loading  
        },
        methods:{
            confirm(){
                var _this = this;
                if( !this.oldPassword || !this.newPassword || !this.confirmPassword){
                    tip("请完整填写信息",'middle','1000');
                    return
                }
                if( this.newPassword != this.confirmPassword ){
                    tip("新密码填写不一致",'middle','1000');
                    return
                }
                this.loadingShow = true;
                _post(
                    POST_URL.CHANGEPASSWORD,
                    {
                        workNumber:this.teacherInfo.workNumber,
                        oldPassword:this.oldPassword,
                        newPassword:this.newPassword
                    },
                    (response) =>{
                        if(response.data == "successful"){
                            tip("密码修改成功",'middle','1000',"icon-iconchenggong");
                            setTimeout(function(){
                                _this.loadingShow = false;
                                _this.$router.push({path:"accountSecurity"});
                            },1000);
                        }else if(response.data == 'oldPassword error'){
                            _this.loadingShow = false;
                            tip("旧密码错误",'middle','1000',"icon-daku");
                        }else{
                            _this.loadingShow = false;
                            tip("密码修改失败",'middle','1000',"icon-daku");
                        }
                    },
                    (error) =>{
                        _this.loadingShow = false;
                        tip("密码修改失败",'middle','1000',"icon-daku");
                    }
                )
            }
        }
    }
</script>
<style lang="scss" rel="stylesheet/scss">
#changePassword{
    width: 100%;
    height: 100%;
    background: #f3f3f6;
    position: absolute;
    z-index: 2;
    top: 0;
    left: 0;
    .emptyWrap{
        height: 1.07rem;
    }
    
    .item {
        margin-top: 0.29rem;
        .password {
            background: white;
            height: 1.2rem;
            box-sizing: border-box;
            padding:0.16rem 0.37rem 0.16rem 0.2rem;
            border-bottom: 0.02rem rgba(217, 217, 217, 0.43) solid;
            .title {
                font-size: 0.42rem;
            }
            input {
                width: 50%;
                float: right;
                font-size: 0.62rem;
                border: none;
                outline: none;
            }
        }
        button {
            display: block;
            width: 100%;
        }
    }

}
</style>