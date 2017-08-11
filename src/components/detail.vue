<template>
    <div id="detail">
        <mt-header title="课程详情">
            <router-link to="/" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
            <mt-button icon="more" slot="right"></mt-button>
        </mt-header>
        <div class="courseName">初二语文</div>
        <div class="courseDetail">
            <el-row>
                <el-col :span="6">日期</el-col>
                <el-col :span="18"></el-col>
            </el-row>
            <el-row>
                <el-col :span="6">上课时间</el-col>
                <el-col :span="18"></el-col>
            </el-row>
            <el-row>
                <el-col :span="6">学生</el-col>
                <el-col :span="18"></el-col>
            </el-row>
            <el-row>
                <el-col :span="6">老师</el-col>
                <el-col :span="18"></el-col>
            </el-row>
            <el-row>
                <el-col :span="6">课程状态</el-col>
                <el-col :span="18"></el-col>
            </el-row>
            <el-row>
                <el-col :span="6">计划课时</el-col>
                <el-col :span="18"></el-col>
            </el-row>
            <el-row>
                <el-col :span="6">实际课时</el-col>
                <el-col :span="18"></el-col>
            </el-row>
            <el-row>
                <el-col :span="6">备注</el-col>
                <el-col :span="18"></el-col>
            </el-row>
            <el-row>
                <el-col :span="6">拍照取证</el-col>
                <el-col :span="18"></el-col>
            </el-row>
            <el-row>
                <el-col :span="6">微信回访</el-col>
                <el-col :span="18"></el-col>
            </el-row>
        </div>
    </div>
</template>
<script>

</script>
<style lang="scss" rel="stylesheet/scss">
#detail{
    width: 100%;
    min-height: 100%;
    .courseName{
        width: 100%;
        font-size: 1.9rem;
        box-sizing: border-box;
        padding: 0.4rem;
    }
    .courseDetail{
        .el-row{
            .el-col{
                font-size:2rem;

            }
        }
    }

}
</style>
