<template>
    <div id="detail">
        <mt-header title="课程详情">
            <router-link to="/courseManage" slot="left" @click.native="closeDetail()">
                <mt-button icon="back">返回</mt-button>
            </router-link>
            <mt-button icon="more" slot="right"></mt-button>
        </mt-header>
        <div class="courseName" >{{info.courseName}}</div>
        <div class="courseDetail">
            <div class="item">
                <span class="infoTitle">日期</span><!-- 
             --><span class="infoContent">{{info.date}}</span>
            </div>
            <div class="item">
                <span class="infoTitle">上课时间</span><!-- 
             --><span class="infoContent">{{info.start|time}}</span>
            </div>
            <div class="item">
                <span class="infoTitle">学生</span><!-- 
             --><span class="infoContent">{{info.studentName}}</span>
            </div>
            <div class="item">
                <span class="infoTitle">老师</span><!-- 
             --><span class="infoContent">{{teacherInfo.name}}</span>
            </div>
            <div class="item">
                <span class="infoTitle">状态</span><!-- 
             --><span class="infoContent">{{info.status}}</span>
            </div>
            <div class="item" v-if="info.reason">
                <span class="infoTitle">原因</span><!-- 
             --><span class="infoContent">{{info.reason}}</span>
            </div>
            <div class="item">
                <span class="infoTitle">计划课时</span><!-- 
             --><span class="infoContent">{{info.courseHour}}</span>
            </div>
            <div class="item" @click="showMtPopup()">
                <span class="infoTitle">实际课时</span><!-- 
             --><span class="infoContent">{{realCourseTime|explain}}</span>
                <transition name="show">
                    <mt-popup
                        v-model="popupVisible"
                        popup-transition="popup-fade"
                        :closeOnClickModal = 'false'>
                            <mt-picker :slots="slots" :showToolbar='true' :visibleItemCount='3'  @change="onValuesChange"> 
                                <span>请选择课时</span>
                            </mt-picker>
                            <div>
                                <mt-button type="default" @click.stop='cancel()'>取消</mt-button><!-- 
                            --><mt-button type="primary" @click.stop='confirm()'>确认</mt-button>
                            </div>
                    </mt-popup>
                </transition>
            </div>
            <div class="item">
                <span class="infoTitle">备注</span><!-- 
             --><span class="infoContent"><input type="text" v-model="remark" placeholder="备注内容"></span>
            </div>
            <el-row>
                <el-col :span="6">拍照取证</el-col>
                <el-col :offset="13" :span="5">
                    <el-upload
                        ref="photoEvidence"
                        class="avatar-uploader"
                        action="photo/photoEvidence"
                        :multiple = 'false'
                        :auto-upload='false'
                        :show-file-list="false"
                        :on-success = "setPhotoEvidencePath"
                        :on-error = 'uploadError'
                        :on-change="showPhotoEvidence"
                        :http-request="uploadPhotoEvidence">
                    <img v-if="photoEvidenceUrl" :src="photoEvidenceUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6">{{returnWay}}</el-col>
                <el-col :offset="13" :span="5">
                    <el-upload
                        ref="returnVisit"
                        class="avatar-uploader"
                        action="photo/returnVisit"
                        :multiple = 'false'
                        :auto-upload='false'
                        :show-file-list="false"
                        :on-success = "setReturnVisitPath"
                        :on-error = 'uploadError'
                        :on-change="showReturnVisit"    
                        :http-request="uploadReturnVisit">
                    <img v-if="returnVisitUrl" :src="returnVisitUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </el-col>
            </el-row>
            <mt-button  
                class='commit' 
                type="primary" 
                @click="commit()" 
                :disabled="info.status=='审核中'||info.status=='已审核'">提交</mt-button>
        </div>
        <loading v-show = "loading"></loading>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { _post , _get } from '../api/axios'
import { POST_URL, GET_URL } from "../api/config"
import { imageCompression } from "../util/imageCompression"
import { tip } from "../util/tip"
import loading from "./loading.vue"
export default{
    props:["info","detailShow"],
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
            returnWay:"",           //回访方式，为同一个学生每上三次课要求老师进行电话回访取代微信回访
            realCourseTime:'',
            remark:"",//备注
            photoEvidenceUrl:"",
            photoEvidencePath:"",//拍照取证地址路径
            returnVisitUrl:"",
            returnVisitPath:"",  //微信回访取证路径
            loading:false
        }
    },
    computed:{
        ...mapGetters({
            teacherInfo:'teacherInfo'
        })
    },
    filters:{
        time:function(value){
            if(value){
                value = value.split(":");
                if(value[0].length == 1){
                    value[0] = "0" + value[0];
                }
                if(value[1].length == 1){
                    value[1] = "0" + value[1];
                }
                return value[0] + ":" + value[1];
            }
            else
                return "";
        },
        explain:function(value){
            if(value == -1 ){
                return "学生请假";
            }else if(value == -2 ){
                return "老师请假";
            }else{
                return value;
            }
        }
    },
    created(){
        var _this = this;
        if(this.info.threeTimes){
            _this.returnWay = "电话回访";
            if(_this.info.status!='审核中' && _this.info.status!="已审核")
                tip("这次需要提交电话回访哦~","bottom",2500);
        }else{
            _get(
            GET_URL.GETCLASSCOUNT,
            {
                workNumber:this.teacherInfo.workNumber,
                sno:this.info.sno
            },
            function(response){
                if(typeof response.data.count == 'number'){
                    if( (response.data.count+1) % 3 == 0 ){
                        _this.returnWay = "电话回访";
                        if(_this.info.status!='审核中' && _this.info.status!="已审核")
                            tip("这次需要提交电话回访哦~","bottom",2500);
                            
                    }else{
                        _this.returnWay = "微信回访";
                    }
                }else{
                    tip("未知错误，请重试","bottom",1000);
                    setTimeout(function(){
                        _this.$emit('update:detailShow', false);
                    },1000);
                }                
            },
            function(error){
                console.log(error);
                tip("未知错误，请重试","bottom",1000);
                setTimeout(function(){
                    _this.$emit('update:detailShow', false);
                },1000);
            });
        }
        
    },
    components:{
        loading:loading
    },

    mounted(){
        this.realCourseTime = this.info.realCourseTime;
    },
    methods:{    
        showMtPopup(){                                                          //点击实际课时时弹出输入框
            if( this.info.status == '未审核' || this.info.status=='未通过')       //若实际课时已经有内容，则不弹出
                this.popupVisible = true;
        },
        onValuesChange(picker,values){  //实际课时
            this.realCourseTime = values[0];
        },
        cancel(){                               //实际课时输入框的取消按钮
            this.realCourseTime = "",
            this.info.realCourseTime = "",
            this.popupVisible = false;
        },
        confirm(){                              //实际课时输入框的确认按钮
            if(!this.realCourseTime){
                this.realCourseTime = 1.5;
                this.info.realCourseTime = 1.5;
            }
                
            if( this.realCourseTime == '学生请假'){
                this.info.realCourseTime = 0;
                this.remark += "(学生请假)";
            }
                
            if( this.realCourseTime == '教师请假'){
                this.info.realCourseTime = 0;
                this.remark += '(教师请假)';
            }
                
            this.popupVisible=false;
        },
        closeDetail(){                              //关闭当前详情页
            this.$emit('update:detailShow', false);
        },
        showPhotoEvidence(file) {                   //上传图片后显示预览图
            this.photoEvidenceUrl = URL.createObjectURL(file.raw);
        },
        showReturnVisit(file){                       //上传图片后显示预览图
            this.returnVisitUrl = URL.createObjectURL(file.raw);
        },
        uploadPhotoEvidence(file){
            this.uploadPhoto(file,"photoEvidence")
        },
        uploadReturnVisit(file){
            this.uploadPhoto(file,"returnVisit")
        },
        uploadPhoto(file,species){
            var IMAGE_REG = /\.(.+)/;
            var _this = this;
            imageCompression(file.file,function(base64){
                _post(
                    POST_URL.PHOTO + species,
                    {
                        base64:base64,
                        type:file.file.name.match(IMAGE_REG)[1]
                    },
                    function(response){
                        if( species == 'photoEvidence'){
                            _this.setPhotoEvidencePath(response);
                        }else if( species == 'returnVisit' ){
                            _this.setReturnVisitPath(response);
                        }
                    },
                    function(error){
                        _this.loading = false;               //关闭加载动画
                        _this.uploadError(error);
        
                    }
                )
            })
            
        },
        setPhotoEvidencePath(response){
            this.photoEvidencePath = response.data.name;
            this.$refs.returnVisit.submit();
        },
        setReturnVisitPath(response){
            var _this = this;
            this.returnVisitPath = response.data.name;
            var data = {
                workNumber:this.info.workNumber,
                sno:this.info.sno,
                startTime:this.info.startTime,
                realCourseTime:this.info.realCourseTime,//实际课时
                remark:this.remark,
                photoEvidencePath:this.photoEvidencePath,
                returnVisitPath:this.returnVisitPath,
                status:'审核中',
                threeTimes:this.returnWay == '电话回访'
            };
            _post(
                POST_URL.AUDIT,
                data,
                function(res){
                   if(res.data == 'successful'){
                        _this.info.status = '审核中';
                        _this.loading = false;               //关闭加载动画
                        tip("提交成功","middle",1000,"icon-xiaolian");
                        //提交成功之后清楚输入内容
                        _this.realCourseTime = "",  
                        _this.remark = "",
                        setTimeout(function(){      //关闭当前详情页
                            _this.$emit('update:detailShow', false);
                        },1000)
                    }else{
                        _this.loading = false;
                        tip('提交失败',"middle",1000,"icon-cry");
                    }
                    
                },
                function(){
                    _this.loading = false;               //关闭加载动画
                    tip('提交失败',"middle",1000,"icon-cry");
                }
            )
        },
        uploadError(err){
            this.loading = false;               //关闭加载动画
            this.tip('提交失败',"middle",1000,"icon-cry");
        },
        commit(){
            if(this.info.realCourseTime === ""){
                tip("请完善信息","middle",1000,"icon-qinwen-")
                return;
            } 
            this.loading = true;                //打开加载动画
            this.$refs.photoEvidence.submit();
            },
        }
}
</script>
<style lang="scss" rel="stylesheet/scss">
#detail{
    top: 0;left: 0;
    position: absolute;
    z-index: 3;
    width: 100%;
    min-height: 100%;
    background: #f3f5f5;
    .courseName{
        width: 100%;
        font-size:0.456rem;
        box-sizing: border-box;
        padding:0.16rem 0.37rem 0.16rem 0.2rem;
    }
    .courseDetail{
        .item{
            background: white;
            height:1.304rem;
            box-sizing: border-box;
            padding:0.26rem 0.67rem 0.16rem 0.3rem;
            border-bottom:0.02rem rgba(217,217,217,0.43) solid;
            .infoTitle{
                display: inline-block;
                width: 25%;
                font-size: 0.456rem;
                color: rgba(0,0,0,0.8);
            }
            .infoContent{
                display: inline-block;
                width:75%;
                text-align: right;
                font-size: 0.456rem;
                color: rgba(0,0,0,0.8);
                input{
                    border: none;
                    outline: none;
                    display: inline-block;
                    width: 100%;
                    height: 100%;
                    foint-size:0.456rem;
                }
                
            }
            .mint-popup{
                width: 5.2rem;
                text-align: center;
                span{
                    font-size:0.49rem;
                    display: inline-block;
                    margin-top:0.08rem;
                }
                .mint-button{
                    display: inline-block;
                    width: 50%;
                    border-radius: 0;
                }
            }
            
        }
        
        input:disabled{
            background: white;
        }
        input{
            text-align:right;
            margin-right:1.2rem;
        }
        .realClass{
            height: 0.61rem;
            padding:0.16rem 0.368rem 0.16rem 0.19rem;
        }
        .el-row{
            background: white;
            box-sizing: border-box;
            height: 2rem;
            padding:0.46rem 0.67rem 0.16rem 0.3rem;
            border-bottom: 0.02rem solid rgba(217, 217, 217, 0.43);
            .el-col{
                font-size:0.456rem;
                .avatar-uploader .el-upload {
                    border: 1px dashed rgba(217,217,217,0.43);
                    border-radius: 6px;
                    cursor: pointer;
                    position: relative;
                    right: 0.03rem;
                    overflow: hidden;
                }
                .avatar-uploader .el-upload:hover {
                    border-color: #20a0ff;
                }
                .avatar-uploader-icon {
                    font-size: 28px;
                    color: #8c939d;
                    width: 1.01rem;
                    height: 1.01rem;
                    line-height: 1.01rem;
                    text-align: center;
                }
                .avatar {
                    width: 1.01rem;
                    height: 1.01rem;
                    display: block;
                }
            }
        }
        .commit{
            display: block;
            width: 100%;
        }
    }

}

</style>
