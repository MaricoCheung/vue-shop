<template>
  <div>
    <!-- 面包屑地址导航 -->
    <el-breadcrumb>
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片展示区 -->
    <el-card>
      <el-row>
        <el-col><el-button type="primary" @click="addCategories">添加分类</el-button></el-col>
      </el-row>
      <!-- 分类列表展示(引入第三方组件库满足树形表格 + el-ui) -->
      <tree-table class="tree-table" :data="cateList" :columns="columns" border :selection-type="false" :expand-type="false" :show-index="true" :index-text="'#'" :show-row-hover="false">
        <template slot="validate" slot-scope="scope">
          <i class="el-icon-success" v-if="scope.row.cat_deleted === false" style="color: #00bb88;"></i>
          <i class="el-icon-error" v-else style="color: red;"></i>
        </template>
        <template slot="rank" slot-scope="scope">
          <el-tag v-if="scope.row.cat_level === 0" size="mini">一级</el-tag>
          <el-tag v-else-if="scope.row.cat_level === 1" type="success" size="mini">二级</el-tag>
          <el-tag v-else type="warning" size="mini">三级</el-tag>
        </template>
        <template slot="operate" slot-scope="scope">
          <el-tooltip content="编辑分类" placement="top" :enterable="false">
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="editCategories(scope.row)">编辑</el-button>
          </el-tooltip>
          <el-tooltip content="删除分类" placement="top" :enterable="false">
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeCategories(scope.row.cat_id)">删除</el-button>
          </el-tooltip>
        </template>
      </tree-table>
      <!-- 底部分页区 -->
      <el-pagination @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="cateInfo.pagenum"
        :page-size="cateInfo.pagesize"
        :page-sizes="[3, 5, 10, 15]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
      <!-- 添加分类对话框 -->
      <el-dialog
        title="添加分类"
        :visible.sync="addCateVisible"
        width="40%" @close="addCateDialogClose">
        <el-form ref="addCateFormRef" :model="addCateForm" :rules="addCateFormRules" label-width="100px">
          <el-form-item label="分类名称：" prop="cat_name">
            <el-input v-model="addCateForm.cat_name"></el-input>
          </el-form-item>
          <el-form-item label="父级分类：">
            <el-cascader clearable change-on-select v-model="selectedKeys" :options="parentCateList" :props="cascaderProps" @change="parentCateChange">
            </el-cascader>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addCateVisible = false">取 消</el-button>
          <el-button type="primary" @click="allotCate">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 编辑分类对话框 -->
      <el-dialog
        title="编辑分类"
        :visible.sync="editCateVisible"
        width="40%" @close="editCateDialogClose">
        <el-form ref="editCateFormRef" :model="editCateForm" :rules="editCateFormRules" label-width="100px">
          <el-form-item label="分类ID：">
            <el-input v-model="editCateForm.cat_id" disabled></el-input>
          </el-form-item>
          <el-form-item label="分类名称：" prop="cat_name">
            <el-input v-model="editCateForm.cat_name"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editCateVisible = false">取 消</el-button>
          <el-button type="primary" @click="allotEditCate">确 定</el-button>
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
      // 向服务器请求分类列表参数
      cateInfo: {
        type: 3,
        pagenum: 1,
        pagesize: 3
      },
      total: 0,
      cateList: [],
      // 为表格指定列意义及其参数
      columns: [
        {
          label: '分类名称',
          prop: 'cat_name'
        }, {
          label: '是否有效',
          type: 'template',
          template: 'validate'
        }, {
          label: '排序',
          type: 'template',
          template: 'rank'
        }, {
          label: '操作',
          type: 'template',
          template: 'operate'
        }
      ],
      // 配置添加分类参数(表单含分类名称，父级ID，分类等级)
      addCateVisible: false,
      // 0为1级分类
      addCateForm: {
        cat_name: '',
        cat_id: 1,
        cat_level: 0
      },
      addCateFormRules: {
        cat_name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
        ]
      },
      // 配置级联参数
      selectedKeys: [],
      parentCateList: [],
      cascaderProps: {
        value: 'cat_id',
        label: 'cat_name',
        children: 'children',
        expandTrigger: 'hover'
      },
      // 配置编辑分类参数
      editCateVisible: false,
      editCateForm: [],
      editCateFormRules: {
        cat_name: [
          { required: true, message: '请输入要更改的分类名称', trigger: 'blur' },
          { min: 1, max: 8, message: '长度在1 到 8 个字符', trigger: 'blur' }
        ]
      },
      editCateId: ''
    }
  },
  created () {
    this.getCateList()
  },
  methods: {
    // 向服务器请求分类列表
    async getCateList () {
      const { data: res } = await this.$http.get('categories', { params: this.cateInfo })
      if (res.meta.status !== 200) {
        return this.$http.error('获取商品分类列表失败！')
      } else {
        this.cateList = res.data.result
        this.total = res.data.total
      }
    },
    // 监听页面行数
    handleSizeChange (newSize) {
      this.cateInfo.pagesize = newSize
      this.getCateList()
    },
    // 监听当前页数
    handleCurrentChange (newPage) {
      this.cateInfo.pagenum = newPage
      this.getCateList()
    // 添加分类
    },
    // 添加分类
    addCategories () {
      this.getParentCate()
      this.addCateVisible = true
    },
    // 获取父级分类列表
    async getParentCate () {
      const { data: res } = await this.$http.get('categories', {
        params: { type: 2 }
      })
      if (res.meta.status !== 200) {
        return this.$message.error('获取父级分类列表失败！')
      } else {
        this.parentCateList = res.data
      }
    },
    // 级联菜单选择项发生变化时触发
    parentCateChange () {
      if (this.selectedKeys.length > 0) {
        this.addCateForm.cat_pid = this.selectedKeys[this.selectedKeys.length - 1]
        this.addCateForm.cat_level = this.selectedKeys.length
      } else {
        this.addCateForm.cat_pid = 0
        this.addCateForm.cat_level = 0
      }
    },
    // 关闭添加对话框重置表单
    addCateDialogClose () {
      this.$refs.addCateFormRef.resetFields()
      this.addCateVisible = false
      this.selectedKeys = []
      this.addCateForm.cat_pid = 0
      this.addCateForm.cat_level = 0
    },
    // 添加分类预验证
    async allotCate () {
      this.$refs.addCateFormRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.post('categories', this.addCateForm)
        console.log(res)
        if (res.meta.status !== 201) {
          return this.$message.error('添加分类失败！')
        } else {
          this.$message.success('添加分类成功！')
          this.getCateList()
          this.addCateVisible = false
        }
      })
    },
    // 编辑分类获取要修改的目标分类数据,储存到表单
    editCategories (cateInfo) {
      this.editCateVisible = true
      this.editCateForm = cateInfo
      this.editCateId = cateInfo.cat_id
    },
    // 编辑预验证
    allotEditCate () {
      this.$refs.editCateFormRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.put('categories/' + this.editCateId, {
          cat_name: this.editCateForm.cat_name
        })
        console.log(res)
        if (res.meta.status !== 200) return this.$message.error('更新分类失败！')
        this.$message.success('更新分类成功！')
        this.getCateList()
        this.editCateVisible = false
      })
    },
    // 关闭编辑分类对话框重置数据状态
    editCateDialogClose () {
      this.$refs.editCateFormRef.resetFields()
      this.editCateForm = {}
      this.editCateVisible = false
    },
    // 删除分类
    async removeCategories (cateId) {
      const messageRes = await this.$confirm('此操作将永久删除该分类, 是否继续?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      console.log(messageRes)
      console.log(cateId)
      if (messageRes !== 'confirm') return this.$message.info('已取消删除')
      const { data: res } = await this.$http.delete('categories/' + cateId)
      console.log(res)
      if (res.meta.status !== 200) return this.$message.error('删除分类失败！')
      this.$message.success('删除分类成功！')
      this.getCateList()
    }
  }
}
</script>
<style lang="less" scoped>
.tree-table {
  margin: 15px 0;
}
.el-cascader {
  width: 100%;
}
</style>
