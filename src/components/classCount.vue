<template>
    <div id="classCount">
        <mt-header fixed title="课消统计">
            <router-link to="/main" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
            <mt-button icon="more" slot="right"></mt-button>
        </mt-header>
        <div id="echarts" style="width: 400px;height:300px;"></div>
    </div>
</template>
<script>
import { mapGetters,mapActions }  from 'vuex'
import  echarts from 'echarts/lib/echarts';
require('echarts/lib/chart/bar');
export default{
    computed:{
        ...mapGetters({
            teacherInfo:'teacherInfo'
        })
    },
    created(){
        this.getTeacherInfo(this.teacherInfo.workNumber);
    },
    mounted(){

        var myChart = echarts.init(document.getElementById('echarts'));
        // 绘制图表
        myChart.setOption({
            color:['#26a2ff'],
            title: { text: '课消统计' },
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            legend:{
                data:["销量"]
            },
            xAxis: {
                type:'category',
                data: ["未结课时","已结课时","总课时"],   
                axisLabel:{
                    margin:13
                }
            },
            yAxis: {type : 'value'},
            series: [{
                name: '销量',
                type: 'bar',
                barWidth: '40%',
                data: [this.teacherInfo.unpaidTime, this.teacherInfo.paidTime,this.teacherInfo.unpaidTime+this.teacherInfo.paidTime]
            }]
        });
    },
    methods:{
        ...mapActions([
                'getTeacherInfo'
            ]),
    }
}
</script>
<style lang="scss" rel="stylesheet/scss">
#classCount{
    width: 100%;
    height: 100%;
}
</style>