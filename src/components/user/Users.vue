<template>
  <div>
  <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片展示区 -->
    <el-card>
      <!-- 表头搜索 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入搜索用户" v-model="queryInfo.query" clearable @clear="getUserList">
            <el-button slot="append" icon="el-icon-search" type="info" @click="getUserList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true">添加用户</el-button>
        </el-col>
      </el-row>
      <!-- 列表展示 -->
      <el-table :data="userList" stripe border>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="username" label="姓名"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="mobile" label="电话"></el-table-column>
        <el-table-column prop="role_name" label="角色"></el-table-column>
        <el-table-column label="状态" width="70px">
          <!-- 放置自定义作用域插槽 -->
          <template slot-scope="scope">
            <el-switch v-model="scope.row.mg_state" @change="userStateChanged(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180px">
          <template slot-scope="scope">
            <el-tooltip effect="dark" content="修改用户" placement="top" :enterable="false">
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row.id)"></el-button>
            </el-tooltip>
            <el-tooltip effect="dark" content="删除用户" placement="top" :enterable="false">
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeUser(scope.row.id)"></el-button>
            </el-tooltip>
            <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
              <el-button type="warning" icon="el-icon-setting" size="mini" @click="setRoleDialog(scope.row)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 底部分页 -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
      :current-page="queryInfo.pagenum" :page-sizes="[1, 3, 5, 7]"
      :page-size="queryInfo.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
      <!-- 添加用户对话框 -->
      <el-dialog
        title="添加用户"
        :visible.sync="addDialogVisible"
        width="40%">
        <!-- 主体内容 -->
        <el-form ref="addFormRef" :model="addForm" label-width="70px" :rules="addUserRules">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="addForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="addForm.password" type="password"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="addForm.email"></el-input>
          </el-form-item>
          <el-form-item label="电话" prop="mobile">
            <el-input v-model="addForm.mobile"></el-input>
          </el-form-item>
        </el-form>
        <!-- 底部按钮 -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="addDialogCancel">取 消</el-button>
          <el-button type="primary" @click="addDialogSure">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 修改用户对话框 -->
      <el-dialog
        title="修改用户"
        :visible.sync="editDialogVisible"
        width="40%">
        <el-form ref="editFormRef" :model="editForm" :rules="editFormRules" label-width="80px">
          <el-form-item label="用户名">
            <el-input v-model="editForm.username" disabled></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="editForm.email"></el-input>
          </el-form-item>
          <el-form-item label="电话号码" prop="mobile">
            <el-input v-model="editForm.mobile"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editDialogCancel">取 消</el-button>
          <el-button type="primary" @click="editDialogSure()">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 分配角色对话框 -->
      <el-dialog
        title="分配角色"
        :visible.sync="setRoleVisible"
        width="40%">
        <div>
          <p>当前用户：{{currentUser.username}}</p>
          <p>当前角色：{{currentUser.role_name}}</p>
          <p>分配新角色：
            <el-select v-model="selectedRoleId" placeholder="请选择">
              <el-option v-for="item in roleList" :key="item.id" :label="item.roleName" :value="item.id">
              </el-option>
            </el-select>
          </p>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="setRoleVisible = false">取 消</el-button>
          <el-button type="primary" @click="allotChangeRole">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 返回顶部 -->
      <el-backtop>
        <div class="back-to-top">UP</div>
      </el-backtop>
    </el-card>
  </div>
</template>
<script>
export default {
  data () {
    // 设置表单自定义合法规则（邮箱和电话）
    var checkEmail = (rule, value, callback) => {
      const regEmail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
      if (!regEmail.test(value)) {
        return callback(new Error('邮箱格式有误'))
      } else {
        callback()
      }
    }
    var checkMobile = (rule, value, callback) => {
      const regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
      if (!regMobile.test(value)) {
        return callback(new Error('手机号码格式有误'))
      } else {
        callback()
      }
    }
    return {
      // 向服务器请求展示用户表单参数
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 2
      },
      // 接收返回展示用户表单参数信息
      userList: [],
      total: 0,
      // 设置添加用户参数(含对话框展示、表单数据初始值、表单校验规则)
      addDialogVisible: false,
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      addUserRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入电话号码', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ]
      },
      // 设置修改用户参数（含对话框展示、表单接收对象、表单校验规则）
      editDialogVisible: false,
      editForm: {},
      editFormRules: {
        email: [
          { required: true, message: '请输入要修改的邮箱地址', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入要修改的电话号码', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ]
      },
      // 配置分配用户角色参数
      setRoleVisible: false,
      currentUser: {},
      roleList: [],
      selectedRoleId: ''
    }
  },
  created () {
    // 页面创立即调用渲染
    this.getUserList()
  },
  methods: {
    // 获取用户展示列表
    async getUserList () {
      const { data: res } = await this.$http.get('users', { params: this.queryInfo })
      if (res.meta.status !== 200) {
        return this.$message.error('获取管理员列表失败')
      } else {
        this.userList = res.data.users
        this.total = res.data.total
      }
    },
    // 监听页面行数
    handleSizeChange (newSize) {
      this.queryInfo.pagesize = newSize
      this.getUserList()
    },
    // 监听当前页数
    handleCurrentChange (newPage) {
      this.queryInfo.pagenum = newPage
      this.getUserList()
    },
    // 监听角色状态
    async userStateChanged (useInfo) {
      const { data: res } = await this.$http.put(`users/${useInfo.id}/state/${useInfo.mg_state}`)
      if (res.meta.status !== 200) {
        this.$message.error('修改角色状态失败！')
      } else {
        this.$message.success('更新角色状态成功！')
      }
    },
    // 添加用户对话框取消后重置信息
    addDialogCancel () {
      this.$refs.addFormRef.resetFields()
      this.addDialogVisible = false
    },
    addDialogSure () {
      // 添加用户的表单预验证
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.post('users', this.addForm)
        if (res.meta.status !== 201) {
          return this.$message.error('添加用户失败！')
        } else {
          this.$message.success('添加用户成功！')
          this.getUserList()
          this.$refs.addFormRef.resetFields()
          this.addDialogVisible = false
        }
      })
    },
    // 获取当前id用户修改的信息
    async showEditDialog (userId) {
      this.editDialogVisible = true
      const { data: res } = await this.$http.get('users/' + userId)
      if (res.meta.status !== 200) {
        return this.$message.error('查询用户信息失败！')
      } else {
        this.editForm = res.data
      }
    },
    // 修改用户对话框取消后重置信息
    editDialogCancel () {
      this.$refs.editFormRef.resetFields()
      this.editDialogVisible = false
    },
    editDialogSure () {
      // 修改用户的表单预验证
      this.$refs.editFormRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.put('users/' + this.editForm.id, {
          email: this.editForm.email,
          mobile: this.editForm.mobile
        })
        if (res.meta.status !== 200) {
          return this.$message.error('更新用户信息失败！')
        } else {
          this.$message.success('更新用户信息成功！')
          this.getUserList()
          this.editDialogVisible = false
        }
      })
    },
    // 删除用户的警告信息
    async removeUser (userId) {
      // 弹框提示是否删除（调用组件挂载到Vue全局下的方法）
      const messageRes = await this.$confirm('此操作将永久删除该用户, 是否继续?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      // 用户确认删除，返回字符串confirm
      // 用户取消删除，返回字符串cancel
      if (messageRes !== 'confirm') {
        return this.$message.info('已取消删除！')
      } else {
        const { data: res } = await this.$http.delete('users/' + userId)
        if (res.meta.status !== 200) return
        this.$message.success('删除用户成功！')
        this.getUserList()
      }
    },
    // 分配用户角色对话框获取角色列表
    async setRoleDialog (userInfo) {
      this.setRoleVisible = true
      this.currentUser = userInfo
      const { data: res } = await this.$http.get('roles')
      if (res.meta.status !== 200) {
        return this.$message.error('获取角色列表失败！')
      } else {
        this.roleList = res.data
        this.selectedRoleId = ''
      }
    },
    // 获取已选角色ID向服务器请求
    async allotChangeRole () {
      // 预校验角色ID是否为空
      if (!this.selectedRoleId) {
        return this.$message.error('请选择要分配的新角色')
      } else {
        const { data: res } = await this.$http.put(`users/${this.currentUser.id}/role`, {
          rid: this.selectedRoleId
        })
        if (res.meta.status !== 200) {
          return this.$message.error('设置角色失败！')
        } else {
          this.$message.success('设置角色成功！')
          this.getUserList()
          this.setRoleVisible = false
        }
      }
    }
  }
}
</script>
<style lang="less" scoped>
</style>
