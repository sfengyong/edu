<template>
    <div id="detail">
        <mt-header title="课程详情">
            <router-link to="/courseManage" slot="left" @click.native="close()">
                <mt-button icon="back">返回</mt-button>
            </router-link>
            <mt-button icon="more" slot="right"></mt-button>
        </mt-header>
        <div class="courseName" >初二语文</div>
        <div class="courseDetail">
            <mt-field label="日期" type="text" disabled rows="1" v-model="info.date" ></mt-field>
            <mt-field label="上课时间" type="text" disabled rows="1" v-model="info.start"></mt-field>
            <mt-field label="学生" type="text" disabled rows="1" v-model="info.studentName"></mt-field>
            <mt-field label="老师" type="text" disabled rows="1" v-model="teacherInfo.name"></mt-field>
            <mt-field label="状态" type="text" disabled rows="1" v-model="status" ></mt-field>
            <mt-field label="计划课时" type="text" disabled rows="1" v-model="info.courseHour"></mt-field>
            <el-row @click.native="popupVisible=true">
                <el-col :span="6">实际课时</el-col>
                <el-col :span="18" >
                    <mt-popup
                        v-model="popupVisible"
                        popup-transition="popup-fade"
                        :closeOnClickModal = 'false'>
                            <mt-picker :slots="slots" :showToolbar='true' :visibleItemCount='3'  @change="onValuesChange"> 
                                <span>请选择课时</span>
                            </mt-picker>
                            <el-row>
                                <el-col :span="12"><mt-button type="default" @click.stop='cancel()'>取消</mt-button></el-col>
                                <el-col :span="12"><mt-button type="primary" @click.stop='confirm()'>确认</mt-button></el-col>
                            </el-row>
                    </mt-popup>
                    <span class="actualClass">{{realCourseTime}}</span>
                </el-col>
            </el-row>
            <mt-field label="备注" placeholder="备注内容" type="text"  rows="1" v-model="remark"></mt-field>
            <el-row>
                <el-col :span="6">拍照取证</el-col>
                <el-col :offset="13" :span="5">
                    <el-upload
                        ref="photoEvidence"
                        class="avatar-uploader"
                        action="http://127.0.0.1:3000/photo/photoEvidence"
                        :multiple = 'false'
                        :auto-upload='false'
                        :show-file-list="false"
                        :on-success = "setPhotoEvidencePath"
                        :on-error = 'uploadError'
                        :on-change="showPhotoEvidence"
                        :before-upload="beforeAvatarUpload">
                    <img v-if="photoEvidenceUrl" :src="photoEvidenceUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6">微信回访</el-col>
                <el-col :offset="13" :span="5">
                    <el-upload
                        ref="returnVisit"
                        class="avatar-uploader"
                        action="http://127.0.0.1:3000/photo/returnVisit"
                        :multiple = 'false'
                        :auto-upload='false'
                        :show-file-list="false"
                        :on-success = "setReturnVisitPath"
                        :on-error = 'uploadError'
                        :on-change="showReturnVisit"
                        :before-upload="beforeAvatarUpload">
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
import { _post } from '../api/axios'
import { Toast } from 'mint-ui'
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
            realCourseTime:'',
            remark:"",//备注
            status:"未审核",
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
        close(){
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
        setPhotoEvidencePath(response,file,fileList){
            this.photoEvidencePath = response;
            this.$refs.returnVisit.submit();
        },
        setReturnVisitPath(response,file,fileList){
            this.returnVisitPath = response;
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
                "http://127.0.0.1:3000/audit",
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
                        console.log(res)
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
            this.$refs.photoEvidence.submit();
        }
    }
}
</script>
<style lang="scss" rel="stylesheet/scss">
.icon{
    content:"&#xe60b"
}
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
        input:disabled{
            background: white;
        }
        input{
            text-align:right;
            margin-right:1.2rem;
        }
        .el-row{
            background: white;
            box-sizing: border-box;
            padding:1.5rem 1rem;
            .el-col{
                font-size:1.6rem;
                .avatar-uploader .el-upload {
                    border: 1px dashed #d9d9d9;
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
            .actualClass{
                float: right;
                margin-right: 1.2rem;
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
        .commit{
            display: block;
            width: 100%;
        }
    }

}
</style>
