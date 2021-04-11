<template>
  <div>
    <!-- 面包屑地址导航区 -->
    <el-breadcrumb>
      <el-breadcrumb-item :to=" { path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片展示区 -->
    <el-card>
      <!-- 商品搜索区 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入搜索商品" v-model="queryInfo.query" clearable @clear="getGoodsList">
            <el-button slot="append" icon="el-icon-search" @click="getGoodsList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="goAddPage">添加商品</el-button>
        </el-col>
      </el-row>
      <!-- 商品列表展示区 -->
      <el-table :data="goodsList" border stripe>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="商品名称" prop="goods_name"></el-table-column>
        <el-table-column label="商品价格(元)" prop="goods_price" width="95px"></el-table-column>
        <el-table-column label="商品重量(KG)" prop="goods_weight" width="100px"></el-table-column>
        <el-table-column label="商品数量" prop="goods_number" width="75px"></el-table-column>
        <el-table-column label="入库时间" prop="add_time" width="150px">
          <template slot-scope="scope">{{scope.row.add_time | dateFormat}}</template>
        </el-table-column>
        <el-table-column label="操作" width="140px">
          <template slot-scope="scope">
            <el-tooltip content="编辑商品" placement="top" :enterable="false">
              <el-button type="primary" class="el-icon-edit" size="mini" @click="showEditGoodsDialog(scope.row)"></el-button>
            </el-tooltip>
            <el-tooltip content="删除商品" placement="top" :enterable="false">
              <el-button type="danger" class="el-icon-delete" size="mini" @click="removeGoods(scope.row.goods_id)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 底部分页区 -->
      <el-pagination @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-size="queryInfo.pagesize"
        :page-sizes="[3, 5, 10, 15]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-card>
    <!-- 编辑商品对话框 -->
    <el-dialog
      title="编辑商品"
      :visible.sync="editGoodsVisible"
      width="40%" @close="editGoodsDialogClose">
      <el-form :model="editGoodsForm" :rules="editGoodsFormRules" ref="editGoodsFormRef">
        <el-form-item label="商品名称" prop="goods_name">
          <el-input v-model="editGoodsForm.goods_name"></el-input>
        </el-form-item>
        <el-form-item label="商品价格" prop="goods_price">
          <el-input v-model="editGoodsForm.goods_price"></el-input>
        </el-form-item>
        <el-form-item label="商品数量" prop="goods_number">
          <el-input v-model="editGoodsForm.goods_number"></el-input>
        </el-form-item>
        <el-form-item label="商品重量" prop="goods_weight">
          <el-input v-model="editGoodsForm.goods_weight"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editGoodsVisible = false">取 消</el-button>
        <el-button type="primary" @click="allowEditGood">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 返回顶部 -->
    <el-backtop>
      <div class="back-to-top">UP</div>
    </el-backtop>
  </div>
</template>
<script>
export default {
  data () {
    return {
      // 配置查询参数
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 5
      },
      total: 0,
      goodsList: [],
      // 配置编辑商品参数
      editGoodsVisible: false,
      editGoodsForm: {},
      editGoodsFormRules: {
        goods_name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
          { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
        ],
        goods_price: [
          { required: true, message: '请输入商品价格', trigger: 'blur' },
          { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
        ],
        goods_number: [
          { required: true, message: '请输入商品数量', trigger: 'blur' },
          { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
        ],
        goods_weight: [
          { required: true, message: '请输入商品重量', trigger: 'blur' },
          { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  // 页面创建时加载商品列表数据
  created () {
    this.getGoodsList()
  },
  methods: {
    async getGoodsList () {
      const { data: res } = await this.$http.get('goods', { params: this.queryInfo })
      if (res.meta.status !== 200) return this.$message.error('获取商品列表失败！')
      this.goodsList = res.data.goods
      this.total = res.data.total
    },
    // 侦听页面展示条数
    handleSizeChange (newSize) {
      this.queryInfo.pagesize = newSize
      this.getGoodsList()
    },
    // 侦听当前页数
    handleCurrentChange (newNum) {
      this.queryInfo.pagenum = newNum
      this.getGoodsList()
    },
    // 编程式导航到添加商品页面
    goAddPage () {
      this.$router.push('/goods/add')
    },
    // 打开修改商品对话框，并获取当前商品信息
    showEditGoodsDialog (row) {
      this.editGoodsVisible = true
      console.log(row)
    },
    // 关闭修改商品对话框重置表单
    editGoodsDialogClose () {
      this.$refs.editGoodsFormRef.resetFields()
    },
    // 允许更新修改商品，表单预校验
    allowEditGood () {
      this.editGoodsVisible = false
    },
    // 删除商品弹框提示警告
    async removeGoods (goodsId) {
      const messageRes = await this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (messageRes !== 'confirm') return this.$message.info('已取消删除！')
      const { data: res } = await this.$http.delete('goods/' + goodsId)
      if (res.meta.status !== 200) return this.$message.error('删除商品失败！')
      this.$message.success('删除商品成功！')
      this.getGoodsList()
    }
  }
}
</script>
<style lang="less" scoped>
</style>
