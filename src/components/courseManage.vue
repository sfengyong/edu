<template>
    <div id="courseManage">
        <mt-header fixed title="排课列表">
            <router-link to="/main" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
            <mt-button icon="more" slot="right"></mt-button>
        </mt-header>
        <el-row class="tableHeader">
            <el-col :span="3" class="month">
                {{header.month}}月
            </el-col>
            <el-col :span="3">
                <div class="date">{{header.date[0]}}</div>
                <div class="day">日</div>
            </el-col>
            <el-col :span="3">
                <div class="date">{{header.date[1]}}</div>
                <div class="day">一</div>
            </el-col>
            <el-col :span="3">
                <div class="date">{{header.date[2]}}</div>
                <div class="day">二</div>
            </el-col>
            <el-col :span="3">
                <div class="date">{{header.date[3]}}</div>
                <div class="day">三</div>
            </el-col>
            <el-col :span="3">
                <div class="date">{{header.date[4]}}</div>
                <div class="day">四</div>
            </el-col>
            <el-col :span="3">
                <div class="date">{{header.date[5]}}</div>
                <div class="day">五</div>
            </el-col>
            <el-col :span="3">
                <div class="date">{{header.date[6]}}</div>
                <div class="day">六</div>
            </el-col>
        </el-row>
        <el-row class="tableWrap">
            <el-col :span="3">
                <el-row v-for="item in 6">
                    <el-col :span="24"  class="table index">{{item}}</el-col>
                </el-row>
            </el-col>
            <el-col :span="3"v-for="(day,dayIndex) in sevenDay">
                <el-row v-for="(item,itemIndex) in day">
                    <el-col :span="24"  class="table color" @click.native="transferData(item)" :class="[colorClass[item.status]]">
                        <div >{{item.start | time }}</div>
                        <div >{{item.courseName}}</div>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
        <transition name="show">
            <detail :info="info" :detailShow.sync='detailShow' v-show='detailShow'></detail>
        </transition>
        
    </div>
</template>
<script>
    import { mapGetters } from 'vuex'
    import { _get } from "../api/axios.js"
    import detail from "./detail.vue"
export default{
    name:'courseManage',
    data(){
        return{
            header:"",
            //sevenDay:[[{},{},{},{},{},{},{}],[{},{},{},{},{},{},{}],[{},{},{},{},{},{},{}],[{},{},{},{},{},{},{}],[{},{},{},{},{},{},{}],[{},{},{},{},{},{},{}],[{},{},{},{},{},{},{}]]
            sevenDay:[[],[],[],[],[],[],[]],
            info:"",
            detailShow:false,
            colorClass:{
                '未审核':"noAudit",
                "审核中":"reviewing",
                "已审核":"success",
                "未通过":"danger"
            }
        }
    },
    computed:{
        ...mapGetters({
            teacherInfo:'teacherInfo'

        })
    },
    filters:{
        time:function(value){
            return value.slice(0,2) + ":" + value.slice(2);
        }
    },
    components:{
        detail:detail
    },
    created(){
        this.showHeader();
    },
    mounted(){
        var _this = this;
        _get("getArrangeClass",{workNumber:this.teacherInfo.workNumber},function(data){
            _this.dataConversion(data.data);
        },function(){

        });
    },
    methods:{
        showHeader(){
            //处理头部日期显示
            var today = new Date();
            this.header = new Object();
            this.header.date = new Array();
            this.header.month = today.getMonth()+1;
            var lastmonth = today.getMonth() || 12;

            var currentMonthDay = this.getMonthDay(today.getFullYear(),this.header.month);//当月天数
            var lastMonthDay = this.getMonthDay(today.getFullYear(),lastmonth);//上个月天数

            var zero = today.getDate() - today.getDay();
            if(zero < 0){
                zero = lastMonthDay + zero;
                this.header.date[0] = zero;
                for( var i = 1 ; i < 7 ; i++ ){
                    this.header.date[i] = ( this.header.date[i-1]+1 ) % lastMonthDay || lastMonthDay;
                }
                var index = this.header.date.indexOf(1);
                if( index != -1){
                    this.header.date[index] = this.header.month + '月';
                    this.header.month--;
                }
            }else{
                this.header.date[0] = zero;
                for(var i = 1 ; i < 7 ; i++ ){
                    this.header.date[i] = (this.header.date[i-1]+1) %currentMonthDay || currentMonthDay;
                }
                var index = this.header.date.indexOf(1);
                if( index != -1){
                    this.header.date[index] = this.header.month + 1 + '月';
                }
            }
        },
        getMonthDay(year,month){
            var thirtyOne = [1,3,5,7,8,10,12];
            var thirty = [4,6,9,11];
            if(thirtyOne.indexOf(month) != -1){
                var monthDay = 31;
            }else if(thirty.indexOf(month) != -1){
                var monthDay = 30;
            }else{
                if( (year%4==0 && year%100!=0) || year%400 == 0)
                    var monthDay = 29;
                else
                    var monthDay = 28;
            }
            return monthDay;
        },
        showClass(){
            this.$http.get("/getArrangeClass",{
                workNumber:teacherInfo.workNumber
            })
                .then(function () {

                }).catch(function () {
            })
        },
        detail(dayIndex,itemIndex){
            this.$router.push({path:"/detail"});
        },
        dataConversion(data){
            for( var i = 0 ; i < data.length ; i++ ){
                var date = new Date(data[i].startTime);
                data[i].date = date.getMonth() + 1 + '月' + date.getDate() + '日';//某月某日
                data[i].day = date.getDate();//具体日期
                data[i].start = date.getHours().toString() + date.getMinutes().toString();
            }
            this.fillTable(data);
        },
        fillTable(data){
            for( var i = 0 ; i < data.length ; i++ ){

                var index = this.header.date.indexOf(data[i].day);//判断当前读取的记录对应着表头哪一列

                if(index == -1 && data[i].day == 1){
                    var index = this.header.date.indexOf(this.header.month+1+'月');
                }
                if(index != -1){
                    this.judgmentTime(index,data[i]);
                }
            }
        },
        judgmentTime(index,data){     //判断每节课的开始时间，以确定它填在某一列的哪一行
            this.sevenDay[index].push(data);
        },
        transferData(item){
            this.info = item;
            this.detailShow = true;
        }
    }
}
</script>
<style lang="scss" rel="stylesheet/scss">
#courseManage{
    position: relative;
    width: 100%;
    height: 100%;
    .tableHeader {
        top: 3.3rem;
        right: 0;
        left: 0;
        position: fixed;
        z-index: 1;
        .el-col {
            text-align: center;
            box-sizing: border-box;
            height:3.7rem;
            padding-top: 0.5rem;
            background: #f3f3f6;
            .month{
                font-size: 1.7rem;
                padding-top: 0.8rem;
            }
            .date{
                font-size: 0.4rem;
            }
            .day{
                font-size: 0.6rem
            }
        }
    }
    .tableWrap{
        top:7rem;
        background: #f3f3f6;
        .table{
            box-sizing: border-box;
            text-align: center;
            height: 8rem;
            padding-top: 1rem;
            background: white;
            border-right: 0.1rem solid rgba(243, 245, 245, 0.74);;
            border-bottom: 0.1rem solid rgba(243, 245, 245, 0.74);;
        }
        .index{
            padding-top: 2.2rem;
            background: #f3f3f6;
        }
        .color{
            transform: scale(0)
        }
        .noAudit{
            background: #50bfff;
            animation: show 0.3s linear;
            animation-fill-mode:forwards
        }
        .reviewing{
            background:#f7ba2a ;
            animation: show 0.3s linear;
            animation-delay: .3s;
            animation-fill-mode: forwards;
        }
        .danger{
            background: red;
            animation: show 0.3s linear;
            animation-delay: .4s;
            animation-fill-mode: forwards;
        }
        .success{
            background: #13ce66;
            animation: show 0.3s linear;
            animation-delay: .5s;
            animation-fill-mode: forwards;
        }
        @keyframes show {
            from{
                transform: scale(0);
            }
            to{
                transform: scale(1);
            }
        }
    }
    .show-enter-active,.show-leave-active{
        transition: opacity .4s ease-in , transform .4s ease-in;
    }
    .show-enter,.show-leave-active{
        opacity: 0;
        transform: scale(0);
    }
}
</style>
