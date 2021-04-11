<template>
  <div id="app">
    <el-container class="home-container">
      <!-- 头部 -->
      <el-header>
        <div>
          <img src="../assets/Ecommerce.png" alt="">
          <span>电商后台管理系统</span>
        </div>
        <el-button type="info" @click="logout">退出</el-button>
      </el-header>
      <el-container>
        <!-- 侧边栏 -->
        <el-aside :width="isCollapse ? '64px' : '200px'">
          <div class="toggle-button" @click="toggleCollapse">|||</div>
          <el-menu
            :default-active="activePath"
            :router="true"
            :collapse="isCollapse"
            :collapse-transition="false"
            :unique-opened="true"
            background-color="#333744"
            text-color="#fff"
            active-text-color="#409EFF">
            <!-- 一级菜单 -->
            <el-submenu :index="item.id + ''" v-for="item in menuList" :key="item.id">
              <!-- 一级菜单模板 -->
              <template slot="title">
                <!-- 图标 -->
                <i :class="iconsObj[item.id]"></i>
                <!-- 文本 -->
                <span>{{item.authName}}</span>
              </template>
              <!-- 二级菜单 -->
              <el-menu-item
                @click="saveNavStatus('/' + subItem.path)"
                :index="'/' + subItem.path"
                v-for="subItem in item.children"
                :key="subItem.id">
                <template slot="title">
                  <!-- 图标 -->
                  <i class="el-icon-menu"></i>
                  <!-- 文本 -->
                  <span>{{subItem.authName}}</span>
                </template>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <!-- 主体区 -->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  created () {
    this.getMenuList()
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  data () {
    return {
      menuList: [],
      iconsObj: {
        125: 'iconfont icon-users',
        103: 'iconfont icon-tijikongjian',
        101: 'iconfont icon-shangpin',
        102: 'iconfont icon-danju',
        145: 'iconfont icon-baobiao'
      },
      isCollapse: false,
      activePath: {}
    }
  },
  methods: {
    // 实现退出功能
    logout() {
      window.sessionStorage.clear()
      this.$router.push('login')
    },
    // 向服务器请求获取菜单，然后for循环渲染组件
    async getMenuList () {
      const { data: res } = await this.$http.get('menus')
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      } else {
        this.menuList = res.data
      }
    },
    // 实现折叠菜单功能
    toggleCollapse () {
      this.isCollapse = !this.isCollapse
    },
    // 实现储存点击菜单激活状态
    saveNavStatus (path) {
      window.sessionStorage.setItem('activePath', path)
      this.activePath = path
    }
  }
}
</script>
<style lang="less" scoped>
.home-container {
  height: 100%;
}
.el-header {
  padding-left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #373D41;
  color:#fff;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    img {
      width: 61px;
      height: 56px;
    }
    span {
      margin-left: 10px;
    }
  }
}
.el-aside {
  background-color: #333744;
  .toggle-button {
    background-color: #8f9399;
    font-size: 10px;
    line-height: 22px;
    text-align: center;
    letter-spacing: 0.2em;
    color: #fff;
    cursor: pointer;
  }
  .el-menu {
    border-right: 0;
  }
}
.el-main {
  background-color: #e7ebef;
}
.iconfont {
  margin-right: 10px;
}
</style>
