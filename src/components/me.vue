<template>
    <div id="me">
        <header>
            <span class="name">我</span>
            <i class="iconfont">&#xe73d;</i>
        </header>
        <div class="info">
            <div class="avator">
                <img src="../image/loginbackground.jpg" alt="">
                <span class="edit">编辑</span>
            </div>
            <div class="name">郭泽伟</div>
            <div class="position">主职位：教师</div>
        </div>
    </div>
</template>
<script>

</script>
<style lang="scss" rel="stylesheet/scss">
#me{
    header{
        width: 100%;
        box-sizing: border-box;
        padding: 1rem;
        background: #fafafa;
        text-align: center;
        position: relative;
        span{
            font-size: 2rem;
        }
        .iconfont{
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            right: 1.2rem;
            font-size: 2rem;
        }
    }
    .info{
        width: 100%;
        box-sizing: border-box;
        padding: 1rem 0;
        background: rgba(153,153,153,0.12);
        text-align: center;
        .avator{
            img{
                width: 6rem;
                height: 6rem;
                border-radius: 50%;
                background: red;
            }
            .edit{
                vertical-align: top;
                position: absolute;
                right: 1rem;
                color: rgba(0,0,0,0.8);
            }
        }
        .name{
            margin-top: 1.5rem;
            font-size: 1.5rem;
            color: rgba(0,0,0,0.8);
        }
        .position{
            font-size: 1rem;
            color: rgba(0,0,0,0.8);
        }
    }
}
</style>
