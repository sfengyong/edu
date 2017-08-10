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
                <el-row v-for="item in 9">
                    <el-col :span="24"  class="table index">{{item}}</el-col>
                </el-row>
            </el-col>
            <el-col :span="3"v-for="(day,dayIndex) in sevenDay">
                <el-row v-for="(item,itemIndex) in day">
                    <el-col :span="24"  class="table">
                        <div @click="detail(dayIndex,itemIndex)">{{item.time}}</div>
                        <div @click="detail(dayIndex,itemIndex)">{{item.courseName}}</div>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    import { mapGetters } from 'vuex'
export default{
    name:'courseManage',
    data(){
        return{
            header:"",
            sevenDay:[[{time:'',courseName:'化学'},{time:'8:00',courseName:'化学'},{time:'8:00',courseName:'化学'},{time:'8:00',courseName:'化学'},{time:'8:00',courseName:'化学'},{time:'8:00',courseName:'化学'},{time:'8:00',courseName:'化学'},{time:'8:00',courseName:'化学'},{time:'8:00',courseName:'化学'}],[{time:'8:00',courseName:'化学'},{time:'8:00',courseName:'化学'},{time:'8:00',courseName:'化学'},{time:'8:00',courseName:'化学'},{time:'8:00',courseName:'化学'},{time:'8:00',courseName:'化学'},{time:'8:00',courseName:'化学'},{time:'8:00',courseName:'化学'},{time:'8:00',courseName:'化学'}],[{time:'8:00',courseName:'化学'},{time:'8:00',courseName:'化学'},{time:'8:00',courseName:'化学'},{time:'8:00',courseName:'化学'},{time:'8:00',courseName:'化学'},{time:'8:00',courseName:'化学'},{time:'8:00',courseName:'化学'},{time:'8:00',courseName:'化学'},{time:'8:00',courseName:'化学'}],[{time:'8:00',courseName:'化学'},{time:'8:00',courseName:'化学'},{time:'8:00',courseName:'化学'},{time:'8:00',courseName:'化学'},{time:'8:00',courseName:'化学'},{time:'8:00',courseName:'化学'},{time:'8:00',courseName:'化学'},{time:'8:00',courseName:'化学'},{time:'8:00',courseName:'化学'}],[{time:'8:00',courseName:'化学'},{time:'8:00',courseName:'化学'},{time:'8:00',courseName:'化学'},{time:'8:00',courseName:'化学'},{time:'8:00',courseName:'化学'},{time:'8:00',courseName:'化学'},{time:'8:00',courseName:'化学'},{time:'8:00',courseName:'化学'},{time:'8:00',courseName:'化学'}],[{time:'8:00',courseName:'化学'},{time:'8:00',courseName:'化学'},{time:'8:00',courseName:'化学'},{time:'8:00',courseName:'化学'},{time:'8:00',courseName:'化学'},{time:'8:00',courseName:'化学'},{time:'8:00',courseName:'化学'},{time:'8:00',courseName:'化学'},{time:'8:00',courseName:'化学'}],[{time:'8:00',courseName:'化学'},{time:'8:00',courseName:'化学'},{time:'8:00',courseName:'化学'},{time:'8:00',courseName:'化学'},{time:'8:00',courseName:'化学'},{time:'8:00',courseName:'化学'},{time:'8:00',courseName:'化学'},{time:'8:00',courseName:'化学'},{time:'8:00',courseName:'化学'}]]
        }
    },
    computed:{
        ...mapGetters({
            userInfo:'userInfo'

        })
    },
    created(){
        this.showHeader();
    },
    methods:{
        showHeader(){
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
                workNumber:userInfo.workNumber
            })
                .then(function () {

                }).catch(function () {
            })
        },
        detail(dayIndex,itemIndex){
            alert(2);
            this.$router.push({path:"/detail"});
        }
    }
}
</script>
<style lang="scss" rel="stylesheet/scss">
#courseManage{
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
    }

}
</style>
