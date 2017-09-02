<template>
    <div id="accountSecurity">
        <mt-header fixed title="账号安全">
            <router-link to="/main" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
            <mt-button icon="more" slot="right"></mt-button>
        </mt-header>
        <div class="emptyWrap"></div>
        <mt-cell
            @click.native="changePassword()"
            title="修改密码"
            is-link>
        </mt-cell>
        <router-view></router-view>
    </div>
</template>
<script>
import { Cell } from 'mint-ui';
export default{
    methods:{
        changePassword(){
            this.$router.push({name:"changePassword"})
        }
    }
}
</script>
<style lang="scss" rel="stylesheet/scss">
#accountSecurity{
    width: 100%;
    height: 100%;
    background: #f3f3f6;
    .emptyWrap{
        height: 3.3rem;
    }
}
</style>