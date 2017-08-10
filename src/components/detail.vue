<template>
    <div id="detail">
        <mt-header title="课程详情">
            <router-link to="/" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
            <mt-button icon="more" slot="right"></mt-button>
        </mt-header>
        <div class="courseDetail">
            <mt-field label="日期" v-model="username"></mt-field>
            <mt-field label="上课时间" type="email" v-model="email" disabled></mt-field>
            <mt-field label="学生" placeholder="请输入手机号" type="tel" v-model="phone"></mt-field>
            <mt-field label="老师" placeholder="请输入网址" type="url" v-model="website"></mt-field>
            <mt-field label="课程状态" placeholder="请输入数字" type="number" v-model="number"></mt-field>
            <mt-field label="计划课时" placeholder="请输入生日" type="date" v-model="birthday"></mt-field>
            <mt-field label="实际课时" placeholder="自我介绍" type="textarea" rows="4" v-modal="introduction"></mt-field>
            <mt-field label="审批备注" placeholder="自我介绍" type="textarea" rows="4" v-modal="introduction"></mt-field>、
            <mt-field label="拍照取证" placeholder="自我介绍" type="textarea" rows="4" v-modal="introduction"></mt-field>
            <mt-field label="微信回访取证" placeholder="自我介绍" type="textarea" rows="4" v-modal="introduction"></mt-field>
        </div>
    </div>
</template>
<script>

</script>
<style lang="scss" rel="stylesheet/scss">

</style>
