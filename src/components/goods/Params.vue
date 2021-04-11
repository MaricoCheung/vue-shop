<template>
  <div>
    <!-- 面包屑地址导航 -->
    <el-breadcrumb>
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>分类参数</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片展示区 -->
    <el-card>
      <!-- 注意条 -->
      <el-alert title="注意：只允许为第三级分类设置相关参数！" type="warning"   show-icon :closable="false"></el-alert>
      <!-- 级联选择菜单 -->
      <el-row class="cat_opt">
        <el-col>
          <span>选择商品分类：</span>
          <el-cascader v-model="selecteCatedKeys" :options="cateList" :props="cascaderProps" @change="selecteCatedKeysChange" clearable change-on-select></el-cascader>
        </el-col>
      </el-row>
        <!-- 具体动静态参数切换 -->
        <el-tabs v-model="activePara" @tab-click="activeParaClick">
          <el-tab-pane label="动态参数" name="many">
            <el-button type="primary" :disabled="isBtnDisabled" size="mini" @click="addComDialogVisiable = true">添加参数</el-button>
            <el-table border :data="manyListData">
              <!-- 展开列 -->
              <el-table-column type="expand">
                <template slot-scope="scope">
                  <el-tag v-for="(item, index) in scope.row.attr_vals" :key="index" closable @close="removeTag(index, scope.row)">{{item}}</el-tag>
                  <el-input class="input-new-tag" v-if="scope.row.tagInputVisible" v-model="scope.row.tagInputValue" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm(scope.row)" @blur="handleInputConfirm(scope.row)"></el-input>
                  <el-button v-else class="button-new-tag" size="small" @click="showTagInput(scope.row)">+ New Tag</el-button>
                </template>
              </el-table-column>
              <!-- 索引列 -->
              <el-table-column type="index" label="#"></el-table-column>
              <el-table-column label="参数名称" prop="attr_name"></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-tooltip content="编辑参数" placement="top" :enterable="false">
                    <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row)">编辑</el-button>
                  </el-tooltip>
                  <el-tooltip content="删除参数" placement="top" :enterable="false">
                    <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeParams(scope.row.attr_id)">删除</el-button>
                  </el-tooltip>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="静态属性" name="only">
            <el-button type="primary" :disabled="isBtnDisabled" size="mini" @click="addComDialogVisiable = true">添加属性</el-button>
            <el-table border :data="onlyListData">
              <!-- 展开列 -->
              <el-table-column type="expand">
                <template slot-scope="scope">
                  <el-tag v-for="(item, index) in scope.row.attr_vals" :key="index" closable @close="removeTag(index, scope.row)">{{item}}</el-tag>
                  <el-input class="input-new-tag" v-if="scope.row.tagInputVisible" v-model="scope.row.tagInputValue" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm(scope.row)" @blur="handleInputConfirm(scope.row)"></el-input>
                  <el-button v-else class="button-new-tag" size="small" @click="showTagInput(scope.row)">+ New Tag</el-button>
                </template>
              </el-table-column>
              <!-- 索引列 -->
              <el-table-column type="index" label="#"></el-table-column>
              <el-table-column label="参数名称" prop="attr_name"></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-tooltip content="编辑属性" placement="top" :enterable="false">
                    <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row)">编辑</el-button>
                  </el-tooltip>
                  <el-tooltip content="删除属性" placement="top" :enterable="false">
                    <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeParams(scope.row.attr_id)">删除</el-button>
                  </el-tooltip>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
    </el-card>
    <!-- 返回顶部 -->
    <el-backtop>
      <div class="back-to-top">UP</div>
    </el-backtop>
    <!-- 共用添加对话框 -->
    <el-dialog :title="'添加' + titleText" :visible.sync="addComDialogVisiable" width="40%" @close="addComDialogClose">
      <el-form ref="addComFormRef" :model="addComForm" :rules="addComFormRules" label-width="100px">
        <el-form-item label="属性名称：" prop="attr_name">
          <el-input v-model="addComForm.attr_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addComDialogVisiable = false">取 消</el-button>
        <el-button type="primary" @click="allotAdd">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 共用编辑参数对话框 -->
    <el-dialog :title="'修改' + titleText" :visible.sync="editComDialogVisiable" width="40%" @close="editComDialogClose">
      <el-form ref="editComFormRef" :model="editComForm" :rules="editComFormRules" label-width="100px">
        <el-form-item :label="titleText" prop="attr_name">
          <el-input v-model="editComForm.attr_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editComDialogVisiable = false">取 消</el-button>
        <el-button type="primary" @click="allotEdit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
      // 配置级联选择器参数
      selecteCatedKeys: [],
      cateList: [],
      cascaderProps: {
        value: 'cat_id',
        label: 'cat_name',
        children: 'children',
        expandTrigger: 'hover'
      },
      // 配置参数切换
      activePara: 'many',
      // 配置动静态参数列表
      manyListData: [],
      onlyListData: [],
      // 配置共用添加对话框
      addComDialogVisiable: false,
      addComForm: {
        attr_name: ''
      },
      addComFormRules: {
        attr_name: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
        ]
      },
      // 配置编辑对话框
      editComDialogVisiable: false,
      editComForm: {
        attr_name: ''
      },
      editComFormRules: {
        attr_name: [
          { required: true, message: '请输入修改名称', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  // 创建页面时获取分类菜单列表
  created () {
    this.getCateList()
  },
  methods: {
    // 向服务器请求商品分类列表
    async getCateList () {
      const { data: res } = await this.$http.get('categories')
      if (res.meta.status !== 200) return this.$message.error('获取分类列表失败！')
      this.cateList = res.data
    },
    // 已选中的三级商品分类ID，向服务器请求参数列表数据
    async getParamsList () {
      if (this.selecteCatedKeys.length !== 3) {
        this.selecteCatedKeys = []
        this.manyListData = []
        this.onlyListData = []
      } else {
        const { data: res } = await this.$http.get(`categories/${this.cateId}/attributes`, { params: { sel: this.activePara } })
        if (res.meta.status !== 200) return this.$message.error('获取参数列表失败！')
        // 把字符串分割成数组，给tag标签做循环
        res.data.forEach(item => {
          item.attr_vals = item.attr_vals ? item.attr_vals.split(' ') : []
          // 给每个类添加自有属性，避免事件冲突
          item.tagInputVisible = false
          item.tagInputValue = ''
        })

        if (this.activePara === 'many') {
          this.manyListData = res.data
        } else {
          this.onlyListData = res.data
        }
      }
    },
    // 级联选择器的已选项ID
    selecteCatedKeysChange () {
      this.getParamsList()
    },
    // tab参数与属性切换信息
    activeParaClick () {
      this.getParamsList()
    },
    // 关闭共用添加对话框重置表单
    addComDialogClose () {
      this.$refs.addComFormRef.resetFields()
    },
    // 添加预验证
    allotAdd () {
      this.$refs.addComFormRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.post(`categories/${this.cateId}/attributes`, { attr_name: this.addComForm.attr_name, attr_sel: this.activePara })
        console.log(res)
        if (res.meta.status !== 201) return this.$message.error('添加' + this.titleText + '失败!')
        this.$message.success('添加' + this.titleText + '成功！')
        this.getParamsList()
        this.addComDialogVisiable = false
      })
    },
    // 编辑参数
    async showEditDialog (row) {
      const { data: res } = await this.$http.get(`categories/${this.cateId}/attributes/${row.attr_id}`, { params: { attr_sel: this.activePara } })
      if (res.meta.status !== 200) {
        return this.$message.error('获取' + this.titleText + '失败！')
      } else {
        this.editComForm = res.data
        this.editComDialogVisiable = true
      }
    },
    // 关闭编辑对话框重置表单
    editComDialogClose () {
      this.$refs.editComFormRef.resetFields()
    },
    // 编辑预验证
    allotEdit () {
      this.$refs.editComFormRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.put(`categories/${this.cateId}/attributes/${this.editComForm.attr_id}`, {
          attr_name: this.editComForm.attr_name,
          attr_sel: this.activePara
        })
        if (res.meta.status !== 200) {
          return this.$message.error('更新' + this.titleText + '失败！')
        } else {
          this.$message.success('更新' + this.titleText + '成功！')
          this.getParamsList()
          this.editComDialogVisiable = false
        }
      })
    },
    // 弹框提示删除参数
    async removeParams (attrId) {
      const messageRes = await this.$confirm('此操作将永久除该' + this.titleText + ', 是否继续?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (messageRes !== 'confirm') {
        return this.$message.info('已取消删除')
      } else {
        const { data: res } = await this.$http.delete(`categories/${this.cateId}/attributes/${attrId}`)
        if (res.meta.status !== 200) {
          return this.$message.error('删除' + this.titleText + '失败！')
        } else {
          this.$message.success('删除' + this.titleText + '成功！')
          this.activeParaClick()
        }
      }
    },
    // 控制tag输入框接收数据及关闭
    handleInputConfirm (row) {
      // 判断文本框中输入的内容是否合法(去除空格值)
      if (row.tagInputValue.trim().length === 0) {
        row.tagInputValue = ''
        row.tagInputVisible = false
      } else {
        row.attr_vals.push(row.tagInputValue.trim())
        this.saveAttrVals(row)
        row.tagInputValue = ''
        row.tagInputVisible = false
      }
    },
    // tag标签删除
    removeTag (tagId, row) {
      row.attr_vals.splice(tagId, 1)
      this.saveAttrVals(row)
    },
    // 控制静态tag输入框打开
    showTagInput (row) {
      row.tagInputVisible = true
      // $nextTick当页面input元素重新渲染后，指定回调函数中的代码
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    // 封装提交保存属性更改函数
    async saveAttrVals (row) {
      const { data: res } = await this.$http.put(`categories/${this.cateId}/attributes/${row.attr_id}`, {
        attr_name: row.attr_name,
        attr_sel: row.attr_sel,
        // 把数组用空格拼接回字符串
        attr_vals: row.attr_vals.join(' ')
      })
      if (res.meta.status !== 200) {
        return this.$message.error('更新' + this.titleText + '失败！')
      } else {
        this.$message.success('更新' + this.titleText + '成功！')
      }
    }
  },
  computed: {
    // 侦听添加按钮状态
    isBtnDisabled () {
      if (this.selecteCatedKeys.length === 3) {
        return false
      } else {
        return true
      }
    },
    // 获取商品三级分类ID
    cateId () {
      if (this.selecteCatedKeys.length === 3) {
        return this.selecteCatedKeys[this.selecteCatedKeys.length - 1]
      } else {
        return null
      }
    },
    // 侦听添加对话框提示文本
    titleText () {
      if (this.activePara === 'many') {
        return '动态参数'
      } else {
        return '静态属性'
      }
    }
  }
}
</script>
<style lang="less" scoped>
.cat_opt {
  margin: 15px 0;
}
.el-tag {
  margin: 5px;
}
.input-new-tag {
  width: 100px;
}
</style>
