<template>
  <div id="app">
      <!-- 路由组件  上面的组件是变化的-->
      <router-view></router-view>
      <!-- 底部组件是不变的 -->
      <!-- $route 代表当前路由 只有当meta对象中showFooter的值为true时-->
      <FooterGuide v-show="$route.meta.showFooter"></FooterGuide>
  </div>
</template>

<script>
    import FooterGuide from './components/FooterGuide/FooterGuide.vue'
    import {mapActions} from 'vuex'
    export default {
        mounted(){
            //this.$store.dispatch('getAddress')
            // 使用getAddress()方法 发起异步请求
            this.getAddress()
        },
        
        components:{
            FooterGuide
        },
        methods:{
            // 获取getAddress方法
            ...mapActions(["getAddress"])
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
#app
    width 100%
    height 100%
    background #f5f5f5
</style>