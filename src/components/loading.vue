<template>
    <div id="loading">
        <div class="spinner">
            <div class="double-bounce1"></div>
            <div class="double-bounce2"></div>
        </div>
    </div>
</template>
<script>
    export default{
        name:'loading'
    }
</script>
<style lang="scss" rel="stylesheet/scss">
#loading{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.15);
    .spinner {
        width: 60px;
        height: 60px;
        position: relative;
        margin: 100px auto;

        top: 30%;
    }
    .double-bounce1,
    .double-bounce2 {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: #26a2ff;
        opacity: 0.6;
        position: absolute;
        top: 0;
        left: 0;
        animation: bounce 2.0s infinite ease-in-out;
    }

    .double-bounce2 {
        animation-delay: -1.0s;
    }

    @keyframes bounce {
        0%,
        100% {
            transform: scale(0.0)
        }
        50% {
            transform: scale(1.0)
        }
    }

}
</style>