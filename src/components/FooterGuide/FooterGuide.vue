<template>
    <div class="footer_guide">
        <!-- :class 绑定class属性 
             类名确定时只是不确定有或者没有时 用对象语法
             请求地址中的url 在$route中-->
        <!-- @click 绑定点击事件  -->
        <a href="javascript:;" class="guide_item" :class="{on:'/msite'===$route.path}" @click="goTo('/msite')">
            <span class="item_icon">
                <i class="iconfont icon-waimai"></i>
            </span>
            <span>外卖</span>
        </a>
        <a href="javascript:;" class="guide_item" :class="{on:'/search'===$route.path}" @click="goTo('/search')">
            <span class="item_icon">
                <i class="iconfont icon-search"></i>
            </span>
            <span>搜索</span>
        </a>
        <a href="javascript:;" class="guide_item" :class="{on:'/order'===$route.path}" @click="goTo('/order')">
            <span class="item_icon">
                <i class="iconfont icon-dingdan"></i>
            </span>
            <span>订单</span>
        </a>
        <a href="javascript:;" class="guide_item" :class="{on:'/profile'===$route.path}" @click="goTo('/profile')">
            <span class="item_icon">
                <i class="iconfont icon-geren"></i>
            </span>
            <span>我的</span>
        </a>
    </div>
</template>

<script>
    export default{
        methods:{
            goTo(path){
                // $router 控制路由进行跳转
                // this.$router.push()
                //跳转到不同的url，但这个方法会向history栈添加一个记录，点击后退会返回到上一个页面。
                // this.$router.replace()
                //同样是跳转到指定的url，但是这个方法不会向history里面添加新的记录，点击返回，会跳转到上上一个页面。上一个记录是不存的。
                // this.$router.go(n)
                //相对于当前页面向前或向后跳转多少个页面,类似 window.history.go(n)。n可为正数可为负数。正数返回上一个页面
                this.$router.replace(path)
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .footer_guide
        top-border-1px(#e4e4e4)
        position fixed
        z-index 100
        left 0
        right 0
        bottom 0
        background-color #fff 
        width 100%
        height 50px
        display flex
        .guide_item
            text-decoration none
            display flex
            flex 1
            text-align center
            flex-direction column
            align-items center 
            margin 5px
            color #999999
            &.on    
                color #6699cc
            span
                font-size 12px
                margin-top 2px
                margin-bottom 2px
                .ionfont
                    font-size 22px

        

</style>