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
    </div>
</template>
<script>
    import { _post } from "../api/axios"
    import { tip } from "../util/tip"
    export default{
        data(){
            return{
                oldPassword:"",
                newPassword:"",
                confirmPassword:""
            }
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
                _post(
                    "changePassword",
                    {
                        oldPassword:this.oldPassword,
                        newPassword:this.newPassword
                    },
                    (response) =>{
                        if(response.data == "successful"){
                            tip("密码修改成功",'middle','1000',"icon-iconchenggong");
                        }else{
                            tip("密码修改失败",'middle','1000',"icon-daku");
                        }
                    },
                    (error) =>{
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
        height: 3.3rem;
    }
    
    .item {
        margin-top: 1.8rem;
        .password {
            background: white;
            height: 4.4rem;
            box-sizing: border-box;
            padding: 1rem 2.3rem 1rem 1.2rem;
            border-bottom: 0.1rem rgba(217, 217, 217, 0.43) solid;
            .title {
                font-size: 1.7rem;
            }
            input {
                width: 50%;
                float: right;
                font-size: 1.9rem;
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