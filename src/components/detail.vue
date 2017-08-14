<template>
    <div id="detail">
        <mt-header title="课程详情">
            <router-link to="/" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
            <mt-button icon="more" slot="right"></mt-button>
        </mt-header>
        <div class="courseName" >初二语文</div>
        <div class="courseDetail">
            <mt-field label="日期" type="text" disabled rows="1" v-modal="introduction"></mt-field>
            <mt-field label="上课时间" type="text" disabled rows="1" v-modal="introduction"></mt-field>
            <mt-field label="学生" type="text" disabled rows="1" v-modal="introduction"></mt-field>
            <mt-field label="老师" type="text" disabled rows="1" v-modal="introduction"></mt-field>
            <mt-field label="状态" type="text" disabled rows="1" v-modal="introduction"></mt-field>
            <mt-field label="计划课时" type="text" disabled rows="1" v-modal="introduction"></mt-field>
            <el-row>
                <el-col :span="6" @click.native="popupVisible=true">实际课时</el-col>
                <el-col :span="18" >
                    <mt-popup
                        v-model="popupVisible"
                        popup-transition="popup-fade"
                        :closeOnClickModal=false>
                            <mt-picker :slots="slots" :showToolbar='true' :visibleItemCount='3'  @change="onValuesChange"> 
                                <span>请选择课时</span>
                            </mt-picker>
                            <el-row>
                                <el-col :span="12"><mt-button type="default" @click='cancel()'>取消</mt-button></el-col>
                                <el-col :span="12"><mt-button type="primary" @click='confirm()'>确认</mt-button></el-col>
                            </el-row>
                    </mt-popup>
                    <span>{{realCourseTime}}</span>
                </el-col>
            </el-row>
            <mt-field label="备注" placeholder="备注内容" type="text"  rows="1" v-modal="introduction"></mt-field>
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

export default{
    name:'detail',
    data() {
        return {
            popupVisible:false,
            slots: [
                {
                flex: 1,
                values: [1, 1.5, 2, 2.5, 3, '学生请假','老师请假'],
                className: 'slot1',
                defaultIndex:2,
                textAlign: 'center'
                }
            ],
            realCourseTime:''
        }
    },
    computed:{

    },
    mounted(){
        
    },
    methods:{
         onValuesChange(picker,values){
             this.realCourseTime = values[0];
         },
         cancel(){
             this.realCourseTime = '';
             this.popupVisible = false;
         },
         confirm(){
             if(!this.realCourseTime)
                this.realCourseTime=1.5;
             this.popupVisible=false;
         }
    }
}
</script>
<style lang="scss" rel="stylesheet/scss">
#detail{
    width: 100%;
    min-height: 100%;
    .courseName{
        width: 100%;
        font-size: 1.6rem;
        box-sizing: border-box;
        padding: 0.4rem;
    }
    .courseDetail{
        input:disabled{
            background: white;
        }
        .el-row{
            box-sizing: border-box;
            padding:1.5rem 1rem;
            .el-col{
                font-size:1.6rem;

            }
            .mint-popup{
                width: 20rem;
                border-radius: 1rem;
                text-align: center;
            }
            .mint-button{
                width: 100%;
            }
        }
    }

}
</style>
