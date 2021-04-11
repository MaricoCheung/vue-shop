<template>
  <div class="login-container">
    <div class="login-box">
      <!-- LOGO图标 -->
      <div class="login-avater">
        <img src="../assets/logo.png" alt="">
      </div>
      <!-- 表单数据 -->
      <el-form ref="ruleFormRef" class="login-form" :rules="loginRules" :model="loginForm">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" prefix-icon="iconfont icon-user"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" prefix-icon="iconfont icon-3702mima" type="password"></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="loginPre">登录</el-button>
          <el-button type="info" @click="resetLoginForm('ruleFormRef')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      loginRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    resetLoginForm () {
      // this=>当前组件对象，其中的属性$refs包含了设置的表单ref，该对象下有重置表单方法
      this.$refs.ruleFormRef.resetFields()
    },
    loginPre () {
      // 点击登录时,先调用validate方法验证表单内容是否有误
      this.$refs.ruleFormRef.validate(async valid => {
        // valid参数为true则为验证通过
        if (!valid) return
        // 异步发送服务器请求登录，从返回的对象中解构data属性，并赋值给res
        const { data: res } = await this.$http.post('login', this.loginForm)
        // 根据服务器返回信息，设置用户提示
        if (res.meta.status !== 200) {
          return this.$message.error('登陆失败：' + res.meta.msg)
        } else {
          this.$message.success('登陆成功')
        }
        // 1. 将登录成功的 token ，保存到客户端的 sessionStorage 中
        //  1.1 项目中除了登录之外的其他API接口，必须在登录之后才能访问【设置路由导航守卫】
        //  1.2 token 只应在当前网站打开期间生效，所以将 token 保存在 sessionStorage 中
        // 2. 通过编程式导航跳转到后台主页
        window.sessionStorage.setItem('token', res.data.token)
        this.$router.push('home')
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  height: 100%;
  background-color: #2b4b6b;
}
.login-box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 6px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  .login-avater {
  width: 130px;
  height: 130px;
  padding: 10px;
  border: 1px solid #eee;
  border-radius: 50%;
  box-shadow: 0 0 10px #ddd;
  position: absolute;
  left: 50%;
  background-color: #fff;
  transform: translate(-50%, -50%);
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #eee;
  }
  }
}
.login-form {
  position: absolute;
  width: 100%;
  padding: 20px;
  bottom: 0;
    box-sizing: border-box;
}
.btns {
  display: flex;
  justify-content: flex-end;
}
</style>
