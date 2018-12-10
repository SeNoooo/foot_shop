<template>
     <div class="loginContainer">
      <div class="loginInner">
        <div class="login_header">
          <h2 class="login_logo">硅谷外卖</h2>
          <div class="login_header_title">
            <!-- 如果是true 显示短信登录  如果是false 显示密码登录 -->
            <!-- 点击时短信登录时 loginWay值为true 则短信登录显示 -->
            <a href="javascript:;" :class="{on:loginWay}" @click="loginWay=true">短信登录</a>
            <a href="javascript:;" :class="{on:!loginWay}" @click="loginWay=false">密码登录</a>
          </div>
        </div>
        <div class="login_content">
          <form @submit.prevent="login">
            <!-- 如果是true 显示短信登录  如果是false 显示密码登录 -->
            <div :class="{on:loginWay}">
              <section class="login_message">
                <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
                <!-- rightPhone可以根据phone确定，所以是计算属性 right_phone是一个class名-->
                <!-- @click.prevent 取消默认提交 -->
                <!-- 三目运算符判断显示什么 -->
                <button :disabled="!rightPhone" class="get_verification" :class="{right_phone:rightPhone}" @click.prevent="getCode">{{computeTime>0 ? `已发送(${computeTime})秒`:"获取验证码"}}</button>
              </section>
              <section class="login_verification">
                <input type="tel" maxlength="8" placeholder="验证码" v-model="code">
              </section>
              <section class="login_hint">
                温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
                <a href="javascript:;">《用户服务协议》</a>
              </section>
            </div>
            <div :class="{on:!loginWay}">
              <section>
                <section class="login_message">
                  <input type="text" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name">
                </section>
                <section class="login_verification">
                  <!-- 实现密码的显示和隐藏 -->
                  <!-- 默认showPwd为false 不显示密码 -->
                  <!-- 双向绑定pwd输入框密码 -->
                  <input type="password" maxlength="8" placeholder="密码" v-if="!showPwd" v-model="pwd">
                  <input type="text" maxlength="8" placeholder="密码" v-else v-model="pwd">
                  <!-- 点击小滑块时 让showPwd的值取反 -->
                  <div class="switch_button" @click="showPwd=!showPwd" :class="showPwd?'on':'off'">
                    <div class="switch_circle" :class="{right:showPwd}"></div>
                    <span class="switch_text">{{showPwd?'abc':'...'}}</span>
                  </div>
                </section>
                <section class="login_message">
                  <input type="text" maxlength="11" placeholder="验证码" v-model="captcha">
                  <!-- 发送远程路径访问返回验证码 -->
                  <img class="get_verification" src="http://localhost:4000/captcha" alt="captcha" @click="getCaptcha" ref="captcha">
                </section>
              </section>
            </div>
            <button class="login_submit">登录</button>
          </form>
          <a href="javascript:;" class="about_us">关于我们</a>
        </div>
        <!-- $router.back() 返回上一个页面 -->
        <a href="javascript:" class="go_back" @click="$router.back()">
          <i class="iconfont icon-jiantou2"></i>
        </a>
      </div>
      <AlertTip :alertText="alertText" v-show="alertShow" @closeTip="closeTip"></AlertTip>
    </div>
</template>
<script>
import AlertTip from '../../components/AlertTip/AlertTip.vue'
import {reqSendCode,reqSmsLogin,reqPwdLogin, reqUserInfo} from '../../api'
export default {
  data(){
    return {
      loginWay:true,  //true代表短信登录，false代表密码登录
      computeTime:0,       //计时时间
      showPwd:false,      //是否显示密码
      phone:'',         //手机号码
      code:'',         //短信验证码
      name:'',          //用户名
      pwd:'',          //密码
      captcha:'',        //图像验证码
      alertText:'',      //提示文本
      alertShow:false    //是否显示提示框

    }
  },

  computed:{
    rightPhone(){
      // 如果匹配就是true
      return /^1\d{10}$/.test(this.phone)
    }
  },

  methods:{
    // 异步获取短信验证码
    async getCode(){
      if(!this.computeTime){
        // 启动倒计时
        this.computeTime=30
        this.intervalId=setInterval(()=>{
          this.computeTime--
          if(this.computeTime<=0){
            clearInterval(this.intervalId)
          }
        },1000)

         // 发送ajax请求（向指定手机号发送验证码短信）
         const result=await reqSendCode(this.phone)
         //  失败了
         console.log(result.code);
         if(result.code===1){
          // 显示提示   
          this.showAlert(result.msg)
          // 停止倒计时
          if(this.computeTime){
            this.computeTime=0
            clearInterval(this.intervalId)
            this.intervalId=undefined
          }
         }
      }
    },
    showAlert(alertText){
      this.alertShow=true
      this.alertText=alertText
    },
    closeTip(){
      this.alertShow=false
      this.alertText=''
    },
    // 获取一个新的图片验证码
    getCaptcha(){
      // 怎么让他重新访问一次？路径不同才能重新访问
      // 并且这不是ajax请求 所以不存在跨域问题
      // this.$refs.captcha 是找到ref属性为captcha的元素
      this.$refs.captcha.src='http://localhost:4000/captcha?time='+Date.now()
    },
    // 异步登录
    async login(){
      let result
      // 前台表单验证
      // 先判断是哪种登录方式
      if(this.loginWay){
        // ---------短信登录-------//
        const {rightphone,phone,code} = this
        if(!this.rightPhone){
          // 如果手机号格式不正确
          this.showAlert('手机号不正确')
          return
        }else if(!/^\d{6}$/.test(code)){
          // 如果短信验证码格式不正确
          this.showAlert('验证码必须是六位数字')
          return
        }
        result=await reqSmsLogin(phone,code)
      }else{
        // ----------密码登录---------// 
        const {name,pwd,captcha}=this
        if(!this.name){
          // 如果用户名没有
          this.showAlert('用户名不正确')
          return
        }else if(!this.pwd){
          // 如果密码没有
          this.showAlert('密码不正确')
          return
        }else if(!this.captcha){
          // 如果验证码没有
          this.showAlert('验证码不正确')
          return
        }
        // 发送ajax请求密码登录
        result=await reqPwdLogin({name,pwd,captcha})
      }
      //取消验证码倒计时
      if(this.computeTime){
        this.computeTime=0
        clearInterval(this.intervalId)
        this.intervalId=undefined
      }
      // 根据结果数据处理
      if(result.code==0){
          const user=result.data
          //将user保存到vuex的state中
          this.$store.dispatch('recordUser',user)
          //去个人中心界面
          this.$router.replace('/profile')
      }else{
          const msg=result.msg
          this.showAlert(msg)
          // 如果登录失败则更换验证码
          this.getCaptcha()
        }
    }
  },

  components:{
    AlertTip
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixins.styl'
.loginContainer
      width 100%
      height 100%
      background #fff
      .loginInner
        padding-top 60px
        width 80%
        margin 0 auto
        .login_header
          .login_logo
            font-size 40px
            font-weight bold
            color #6699cc
            text-align center
          .login_header_title
            padding-top 40px
            text-align center
            >a
              color #333
              font-size 14px
              padding-bottom 4px
              &:first-child
                margin-right 40px
              &.on
                color #6699cc
                font-weight 700
                border-bottom 2px solid #6699cc
        .login_content
          >form
            >div
              display none
              &.on
                display block
              input
                width 100%
                height 100%
                padding-left 10px
                box-sizing border-box
                border 1px solid #ddd
                border-radius 4px
                outline 0
                font 400 14px Arial
                &:focus
                  border 1px solid #99ccff
              .login_message
                position relative
                margin-top 16px
                height 48px
                font-size 14px
                background #fff
                .get_verification
                  position absolute
                  top 50%
                  right 10px
                  transform translateY(-50%)
                  border 0
                  color #ccc
                  font-size 14px
                  background transparent
                  &.right_phone 
                    color black
              .login_verification
                position relative
                margin-top 16px
                height 48px
                font-size 14px
                background #fff
                .switch_button
                  font-size 12px
                  border 1px solid #ddd
                  border-radius 8px
                  transition background-color .3s,border-color .3s
                  padding 0 6px
                  width 30px
                  height 16px
                  line-height 16px
                  color #fff
                  position absolute
                  top 50%
                  right 10px
                  transform translateY(-50%)
                  &.off
                    background #fff
                    .switch_text
                      float right
                      color #ddd
                  &.on
                    background #99ccff
                  >.switch_circle
                    //transform translateX(27px)
                    position absolute
                    top -1px
                    left -1px
                    width 16px
                    height 16px
                    border 1px solid #ddd
                    border-radius 50%
                    background #fff
                    box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                    transition transform .3s
                    &.right
                      transform  translateX(30px)
              .login_hint
                margin-top 12px
                color #999
                font-size 14px
                line-height 20px
                >a
                  color #99ccff
            .login_submit
              display block
              width 100%
              height 42px
              margin-top 30px
              border-radius 4px
              background #6699cc
              color #fff
              text-align center
              font-size 16px
              line-height 42px
              border 0
          .about_us
            display block
            font-size 12px
            margin-top 20px
            text-align center
            color #999
        .go_back
          position absolute
          top 5px
          left 5px
          width 30px
          height 30px
          >.iconfont
            font-size 20px
            color #999
</style>