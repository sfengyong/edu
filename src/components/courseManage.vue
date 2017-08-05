<template>
    <div id="courseManage">
        <mt-header fixed title="排课列表">
            <router-link to="/main" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
            <mt-button icon="more" slot="right"></mt-button>
        </mt-header>
        <el-row class="date">
            <el-col :span="3">8月</el-col>
            <el-col :span="3">日</el-col>
            <el-col :span="3">一</el-col>
            <el-col :span="3">二</el-col>
            <el-col :span="3">三</el-col>
            <el-col :span="3">四</el-col>
            <el-col :span="3">五</el-col>
            <el-col :span="3">六</el-col>
        </el-row>
        <el-row class="tableWrap">
            <el-col :span="3">
                <el-row v-for="item in 15">
                    <el-col :span="24"  class="table">{{item + 7 +":00"}}</el-col>
                </el-row>
            </el-col>
            <el-col :span="3"></el-col>
            <el-col :span="3"></el-col>
            <el-col :span="3"></el-col>
            <el-col :span="3"></el-col>
            <el-col :span="3"></el-col>
            <el-col :span="3"></el-col>
            <el-col :span="3"></el-col>
        </el-row>
    </div>
</template>
<script>
export default{
    name:'courseManage',
    data(){
        return{
            time:["8:00"]
        }
    }
}
</script>
<style lang="scss" rel="stylesheet/scss">
#courseManage{
    header{
        position: relative;
    }
    .date{
        .el-col{
            text-align: center;
            box-sizing: border-box;
            padding: 1rem 0;
            background: #f3f3f6;
        }
    }
    .tableWrap{
        .table{
            box-sizing: border-box;
            text-align: center;
            padding: 3rem 0;
        }
    }

}
</style>
