<template>
  <div>
    <!-- 面包屑导航地址区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片展示表格区 -->
    <el-card>
      <el-row><el-col><el-button type="primary" @click="addRoleVisible = true">添加角色</el-button></el-col></el-row>
      <!-- 表格权限区 -->
      <el-table border stripe :data="rolesList">
        <!-- 展开列 -->
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-row v-for="(itemFir,idFir) in scope.row.children" :key="itemFir.id" :class="['bdbottom', idFir === 0 ? 'bdtop' : '']">
              <!-- 渲染一级权限 -->
              <el-col :span="5">
                <el-tag closable @close="removeRoleRights(scope.row,itemFir.id)">{{itemFir.authName}}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <!-- 渲染二三级权限 -->
              <el-col :span="19">
                <el-row v-for="(itemSec,idSec) in itemFir.children" :key="itemSec.id" :class="idSec !== 0 ? 'bdtop' : ''">
                  <el-col :span="6">
                    <el-tag type="success" closable @close="removeRoleRights(scope.row,itemSec.id)">{{itemSec.authName}}</el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col :span="18">
                    <el-tag v-for="itemThi in itemSec.children" :key="itemThi.id" type="warning" closable @close="removeRoleRights(scope.row,itemThi.id)">{{itemThi.authName}}</el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <!-- 索引列 -->
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column label="角色名称" prop="roleName"></el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-tooltip  effect="dark" content="编辑" placement="top" enterable>
              <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditRole(scope.row.id)">编辑</el-button>
            </el-tooltip>
            <el-tooltip  effect="dark" content="删除" placement="top" enterable>
              <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeRole(scope.row.id)">删除</el-button>
            </el-tooltip>
            <el-tooltip  effect="dark" content="分配权限" placement="top" enterable>
              <el-button type="warning" icon="el-icon-setting" size="mini" @click="showSetRights(scope.row)">分配权限</el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 添加角色对话框 -->
      <el-dialog
        title="添加角色"
        :visible.sync="addRoleVisible"
        width="40%">
        <el-form ref="addRoleRef" :model="addRoleForm" :rules="addFormRules" label-width="80px">
          <el-form-item label="角色名称" prop="roleName">
            <el-input v-model="addRoleForm.roleName"></el-input>
          </el-form-item>
          <el-form-item label="角色描述" prop="roleDesc">
            <el-input v-model="addRoleForm.roleDesc"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addDialogCancel">取 消</el-button>
          <el-button type="primary" @click="allotAddRole">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 编辑角色对话框 -->
      <el-dialog
        title="编辑角色"
        :visible.sync="editRoleVisible"
        width="40%">
        <el-form ref="editRoleRef" :model="editRoleForm" :rules="addFormRules" label-width="80px">
          <el-form-item label="角色ID" prop="roleId">
            <el-input v-model="editRoleForm.roleId" disabled></el-input>
          </el-form-item>
          <el-form-item label="角色名称" prop="roleName">
            <el-input v-model="editRoleForm.roleName"></el-input>
          </el-form-item>
          <el-form-item label="角色描述" prop="roleDesc">
            <el-input v-model="editRoleForm.roleDesc"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editRoleCancel">取 消</el-button>
          <el-button type="primary" @click="editRoleSure">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 分配权限对话框 -->
      <el-dialog
        title="分配权限"
        :visible.sync="setRightsVisible"
        width="40%" @close="setRightsDialogClose">
        <el-tree :data="rightsList" :props="treeProps" show-checkbox node-key="id" :default-expand-all="true" :default-checked-keys="defKeys" ref="treeRef"></el-tree>
        <span slot="footer" class="dialog-footer">
          <el-button @click="setRightsVisible = false">取 消</el-button>
          <el-button type="primary" @click="allotRights">确 定</el-button>
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
    return {
      rolesList: [],
      // 配置添加角色参数
      addRoleVisible: false,
      addRoleForm: {
        roleName: '',
        roleDesc: ''
      },
      addFormRules: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
          { min: 2, max: 12, message: '长度在2 到 12 个字符', trigger: 'blur' }
        ],
        roleDesc: [
          { min: 1, max: 30, message: '长度在1 到 30 个字符', trigger: 'blur' }
        ]
      },
      // 配置修改角色参数
      editRoleVisible: false,
      editRoleForm: {},
      // 配置分配权限参数
      setRightsVisible: false,
      rightsList: [],
      // 树形控件的属性绑定对象
      treeProps: {
        label: 'authName',
        children: 'children'
      },
      // 默认选中的节点ID数组
      defKeys: [],
      // 保存正在操作的角色
      roleId: ''
    }
  },
  // 创建页面组件并获取初始角色数据
  created () {
    this.getRolesList()
  },
  methods: {
    // 向服务器请求角色列表
    async getRolesList () {
      const { data: res } = await this.$http.get('roles')
      if (res.meta.status !== 200) {
        return this.$message.error('获取角色列表失败！')
      } else {
        this.rolesList = res.data
      }
    },
    // 添加角色及其预校验
    allotAddRole () {
      this.$refs.addRoleRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.post('roles', this.addRoleForm)
        if (res.meta.status !== 201) {
          return this.$message.error('添加角色失败！')
        } else {
          this.$message.success('添加角色成功！')
          this.getRolesList()
          this.$refs.addRoleRef.resetFields()
          this.addRoleVisible = false
        }
      })
    },
    addDialogCancel () {
      this.$refs.addRoleRef.resetFields()
      this.addRoleVisible = false
    },
    // 获取将要修改的当前ID角色信息
    async showEditRole (roleId) {
      this.editRoleVisible = true
      const { data: res } = await this.$http.get('roles/' + roleId)
      if (res.meta.status !== 200) {
        return this.$message.error('查询角色信息失败！')
      } else {
        this.editRoleForm = res.data
      }
    },
    editRoleCancel () {
      this.$refs.editRoleRef.resetFields()
      this.editRoleVisible = false
    },
    editRoleSure () {
      // 修改角色的表单预验证
      this.$refs.editRoleRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.put('roles/' + this.editRoleForm.roleId, this.editRoleForm)
        if (res.meta.status !== 200) {
          return this.$message.error('修改角色信息失败！')
        } else {
          this.$message.success('更新角色信息成功！')
          this.getRolesList()
          this.editRoleVisible = false
        }
      })
    },
    // 根据角色ID删除
    async removeRole (roleId) {
      console.log(roleId)
      // 弹框提示是否删除（调用组件挂载到Vue全局下的方法）
      const messageRes = await this.$confirm('此操作将永久删除该角色, 是否继续?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (messageRes !== 'confirm') {
        return this.$message.info('已取消删除！')
      } else {
        const { data: res } = await this.$http.delete('roles/' + roleId)
        if (res.meta.status !== 200) return this.$message.error('删除角色失败！')
        this.$message.success('删除角色成功！')
        this.getRolesList()
      }
    },
    // 根据角色ID和权限ID删除角色
    async removeRoleRights (role, rightsId) {
      // 弹框提示
      const messageRes = await this.$confirm('此操作将永久删除该权限, 是否继续?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (messageRes !== 'confirm') {
        return this.$message.info('已取消删除')
      } else {
        const { data: res } = await this.$http.delete(`roles/${role.id}/rights/${rightsId}`)
        // 重定向当前用户最新权限
        role.children = res.data
      }
    },
    // 设置角色权限对话框
    async showSetRights (role) {
      // 将role.id保存起来以供保存权限时使用
      this.roleId = role.id
      const { data: res } = await this.$http.get('rights/tree ')
      if (res.meta.status !== 200) {
        return this.$message.error('获取权限列表失败！')
      } else {
        this.rightsList = res.data
        this.getLeafKeys(role, this.defKeys)
        this.setRightsVisible = true
      }
    },
    // 以递归形式获取已有权限各三级节点的ID，并传递给节点数组
    getLeafKeys (node, arr) {
      if (!node.children) {
        return arr.push(node.id)
      } else {
        node.children.forEach(item => this.getLeafKeys(item, arr))
      }
    },
    // 关闭权限设置对话框，清除选中项
    setRightsDialogClose () {
      this.defKeys = []
    },
    // 请求服务器分配权限
    async allotRights () {
      // 组件属性获得当前已点击叶子和半叶keys即权限ID
      // ...展开运算符替代apply方法合并数组
      const keys = [...this.$refs.treeRef.getCheckedKeys(), ...this.$refs.treeRef.getHalfCheckedKeys()]
      // 按请求头要求分割数组为字符串
      const strId = keys.join(',')
      const { data: res } = await this.$http.post(`roles/${this.roleId}/rights`, { rids: strId })
      if (res.meta.status !== 200) {
        return this.$message.error('分配角色权限失败！')
      } else {
        this.$message.success('分配角色权限成功！')
        this.getRolesList()
        this.setRightsVisible = false
      }
    }
  }
}
</script>
<style lang="less" scoped>
.bdtop {
  border-top: 1px solid #eee;
}
.bdbottom {
  border-bottom: 1px solid #eee;
}
.el-tag {
  margin: 7px;
}
.el-row {
  display: flex;
  align-items: center;
}
</style>
