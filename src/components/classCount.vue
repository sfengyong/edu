<template>
    <div id="classCount">
        <mt-header fixed title="课消统计">
            <router-link to="/main" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
            <mt-button icon="more" slot="right"></mt-button>
        </mt-header>
        <div id="main" style="width: 600px;height:400px;"></div>
    </div>
</template>
<script>
import { mapGetters }  from 'vuex'
import  echarts from 'echarts/lib/echarts';
require('echarts/lib/chart/bar');
export default{
    computed:{
        ...mapGetters({
            teacherInfo:'teacherInfo'
        })
    },
    mounted(){
        console.log(this.teacherInfo);
    },
    created(){
        var myChart = echarts.init(document.getElementById('main'));
        // 绘制图表
        myChart.setOption({
            title: { text: '课消统计' },
            tooltip: {},
            xAxis: {
                data: ["未结课时","已结课时","总课时"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        });
    }
}
</script>
<style lang="scss" rel="stylesheet/scss">
#classCount{
    width: 100%;
    height: 100%;
}
</style>