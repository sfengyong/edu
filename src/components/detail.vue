<template>
    <div id="detail">
        <mt-header title="课程详情">
            <router-link to="/courseManage" slot="left" @click.native="closeDetail()">
                <mt-button icon="back">返回</mt-button>
            </router-link>
            <mt-button icon="more" slot="right"></mt-button>
        </mt-header>
        <div class="courseName" >初二语文</div>
        <div class="courseDetail">
            <div class="item">
                <span class="infoTitle">日期</span><!-- 
             --><span class="infoContent">{{info.date}}</span>
            </div>
            <div class="item">
                <span class="infoTitle">上课时间</span><!-- 
             --><span class="infoContent">{{info.start}}</span>
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
            <div class="item" @click="popupVisible=true">
                <span class="infoTitle">实际课时</span><!-- 
             --><span class="infoContent">{{realCourseTime}}</span>
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
                        action="http://192.168.232.243:3000/photo/photoEvidence"
                        :multiple = 'false'
                        :auto-upload='false'
                        :show-file-list="false"
                        :on-success = "setPhotoEvidencePath"
                        :on-error = 'uploadError'
                        :on-change="showPhotoEvidence"
                        :before-upload="beforeAvatarUpload"
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
                        action="http://192.168.232.243:3000/photo/returnVisit"
                        :multiple = 'false'
                        :auto-upload='false'
                        :show-file-list="false"
                        :on-success = "setReturnVisitPath"
                        :on-error = 'uploadError'
                        :on-change="showReturnVisit"
                        :before-upload="beforeAvatarUpload"
                        :http-request="uploadReturnVisit">
                    <img v-if="returnVisitUrl" :src="returnVisitUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </el-col>
            </el-row>
            <mt-button  class='commit' type="primary" @click="commit()">提交</mt-button>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { _post , _get } from '../api/axios'
import { Toast } from 'mint-ui'
import { imageCompression } from "../util/imageCompression"
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
            returnVisitPath:""  //微信回访取证路径
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
    watch:{
        detailShow:function(newValue,oldValue){
            var _this = this;
            if(newValue){
                _get(
                    "http://192.168.232.243:3000/getClassCount",
                    {
                        workNumber:this.teacherInfo.workNumber,
                        sno:this.info.sno
                    },
                    function(response){
                        if(typeof response.data.count == 'number'){
                            if( (response.data.count+1) % 3 == 0 ){
                                _this.returnWay = "电话回访";
                                Toast({
                                    message:"这次需要提交电话回访哦~",
                                    position:"bottom",
                                    duration:2500
                                });
                            }else{
                                _this.returnWay = "微信回访";
                            }
                        }else{
                            Toast({
                                message:"未知错误，请重试",
                                position:"bottom",
                                duration:1000
                            });
                            setTimeout(function(){
                                _this.$emit('update:detailShow', false);
                            },1000);
                        }                
                    },
                    function(error){
                        console.log(error);
                        Toast({
                            message:"未知错误，请重试",
                            position:"bottom",
                            duration:1000
                        });
                        setTimeout(function(){
                            _this.$emit('update:detailShow', false);
                        },1000);
                    });
            }
        }
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
        },
        closeDetail(){
            this.$emit('update:detailShow', false);
        },
        showPhotoEvidence(file) {
            this.photoEvidenceUrl = URL.createObjectURL(file.raw);
        },
        showReturnVisit(file){
            this.returnVisitUrl = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload(file) {
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
                    "http://192.168.232.243:3000/photo/" + species,
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
                        _this.uploadError(error);
                    }
                )
            })
            
        },
        setPhotoEvidencePath(response,file,fileList){
            this.photoEvidencePath = response.data.name;
            this.$refs.returnVisit.submit();
        },
        setReturnVisitPath(response,file,fileList){
            var _this = this;
            this.returnVisitPath = response.data.name;
            var data = {
                workNumber:this.info.workNumber,
                sno:this.info.sno,
                courseNo:this.info.courseNo,
                startTime:this.info.startTime,
                endTime:this.info.endTime,
                courseNumber:this.info.courseNumber,
                courseHour:this.info.courseHour,
                realCourseTime:this.realCourseTime,//实际课时
                remark:this.remark,
                photoEvidencePath:this.photoEvidencePath,
                returnVisitPath:this.returnVisitPath

            };
            _post(
                "http://192.168.232.243:3000/audit",
                data,
                function(res){
                   if(res.data == 'successful'){
                        _this.status = '审核中';
                       Toast({
                            message: '提交成功',
                            iconClass: 'icon-xiaolian iconfont',
                            duration:1000
                        });
                        setTimeout(function(){
                            _this.$emit('update:detailShow', false);
                        },1000)
                    }else{
                        Toast({
                            message: '提交失败',
                            iconClass: 'icon-xiaolian iconfont',
                            duration:1000
                        });
                    }
                    
                },
                function(){
                    Toast({
                        message: '提交失败',
                        iconClass: 'icon-xiaolian iconfont',
                        duration:1000
                    });
                }
            )
        },
        uploadError(err,file,fileList){ 
            Toast({
                message: '提交成功',
                iconClass: 'icon-xiaolian iconfont',
                duration:1000
            });
        },
        commit(){
            if(!this.realCourseTime){
                Toast({
                    message: '请完善信息',
                    iconClass: 'icon-xiaolian iconfont',
                    duration:1000
                });
                return;
            }
            this.$refs.photoEvidence.submit();
        }
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
        font-size: 1.6rem;
        box-sizing: border-box;
        padding: 0.4rem;
    }
    .courseDetail{
        .item{
            background: white;
            height: 4.4rem;
            box-sizing: border-box;
            padding: 1rem 2.3rem 1rem 1.2rem;
            border-bottom: 0.1rem rgba(217,217,217,0.43) solid;
            .infoTitle{
                display: inline-block;
                width: 25%;
                font-size: 1.7rem;
                color: rgba(0,0,0,0.8);
            }
            .infoContent{
                display: inline-block;
                width:75%;
                text-align: right;
                font-size: 1.7rem;
                color: rgba(0,0,0,0.8);
                input{
                    border: none;
                    outline: none;
                    display: inline-block;
                    width: 100%;
                    height: 100%;
                    font-size: 1.7rem;
                }
                
            }
            .mint-popup{
                width: 20rem;
                text-align: center;
                span{
                    font-size: 1.8rem;
                    display: inline-block;
                    margin-top: 0.5rem;
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
            height: 3.8rem;
            padding: 1rem 2.3rem 1rem 1.2rem;
        }
        .el-row{
            background: white;
            box-sizing: border-box;
            padding:1.5rem 1rem;
            border-bottom:0.1rem solid rgba(217,217,217,0.43);
            .el-col{
                font-size:1.6rem;
                .avatar-uploader .el-upload {
                    border: 1px dashed rgba(217,217,217,0.43);
                    border-radius: 6px;
                    cursor: pointer;
                    position: relative;
                    right: 0.2rem;
                    overflow: hidden;
                }
                .avatar-uploader .el-upload:hover {
                    border-color: #20a0ff;
                }
                .avatar-uploader-icon {
                    font-size: 28px;
                    color: #8c939d;
                    width: 3.8rem;
                    height: 3.8rem;
                    line-height: 3.8rem;
                    text-align: center;
                }
                .avatar {
                    width: 3.8rem;
                    height: 3.8rem;
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
