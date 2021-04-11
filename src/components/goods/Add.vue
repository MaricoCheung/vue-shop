<template>
  <div>
    <!-- 面包屑地址导航 -->
    <el-breadcrumb>
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加商品</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片展示区 -->
    <el-card>
      <el-alert title="添加商品信息" type="info" show-icon :closable="false" center></el-alert>
      <!-- 步骤条状态区，【注：active是number类型】 -->
      <el-steps :space="200" :active="activeIndex - 0" finish-status="success" align-center>
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
      <!-- 左边tab切换区 -->
      <el-form ref="addGoodsFormRef" :rules="addGoodsFormRules" :model="addGoodsForm" label-position="top">
        <el-tabs :tab-position="'left'" :before-leave="beforeTabLeave"  v-model="activeIndex" @tab-click="tabClicked">
          <!-- 【注：tabs父与tab子的active与name是字符串类型】 -->
          <el-tab-pane label="基本信息" name="0">
          <el-form-item label="商品名称" prop="goods_name">
            <el-input v-model="addGoodsForm.goods_name"></el-input>
          </el-form-item>
          <el-form-item label="商品价格" prop="goods_price">
            <el-row>
              <el-col :span="16">
                <el-input-number v-model="addGoodsForm.goods_price" controls-position="right" :min="0"  :max="999999" size="small">
                </el-input-number>
                <el-tag type="info" plain>￥</el-tag>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="商品重量" prop="goods_weight">
            <el-row>
              <el-col :span="16">
                <el-input-number v-model="addGoodsForm.goods_weight" controls-position="right" :min="0"  :max="999999" size="small">
                </el-input-number>
                <el-tag type="info" plain>KG</el-tag>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="商品数量" prop="goods_number">
            <el-row>
              <el-col :span="16">
                <el-input-number v-model="addGoodsForm.goods_number" controls-position="right" :min="0"  :max="999999" size="small">
                </el-input-number>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="商品分类" prop="goods_cat">
            <el-cascader v-model="addGoodsForm.goods_cat" :options="cateList" :props="cateProps" clearable @change="goods_cat_KeysChange"></el-cascader>
          </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品参数" name="1">
          <el-form-item :label="item.attr_name" v-for="item in manyDataList" :key="item.attr_id">
            <el-checkbox-group v-model="item.attr_vals">
              <el-checkbox :label="itemVal" v-for="(itemVal, index) in item.attr_vals" :key="index" border size="mini"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品属性" name="2">
          <el-form-item :label="item.attr_name" v-for="item in onlyDataList" :key="item.attr_id">
            <el-input v-model="item.attr_vals"></el-input>
          </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品图片" name="3">
          <el-upload class="upload-demo" ref="uploadRef" :action="uploadURL" :on-preview="handlePreview" :on-remove="handleRemove" :on-success="handleSuccess" list-type="picture" :multiple="true" :headers="headerObj" :limit="uploadLimitNum">
            <el-button size="small" type="primary">选取图片上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
          </el-tab-pane>
          <el-tab-pane label="商品内容" name="4">
          <quill-editor v-model="addGoodsForm.goods_introduce"></quill-editor>
          <el-button type="primary" class="addBtn" @click="allowAddGoods">添加商品</el-button>
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </el-card>
    <!-- 图片预览对话框 -->
    <el-dialog title="图片预览" :visible.sync="previewVisible" width="80%">
      <img :src="previewPath" class="previewImg" />
    </el-dialog>
  </div>
</template>
<script>
// 导入lodash，对添加商品表单进行深拷贝
import _ from 'lodash'

export default {
  data () {
    return {
      // 步骤条索引
      activeIndex: '0',
      // 配置添加商品表单参数(基本信息)
      addGoodsForm: {
        goods_name: '',
        goods_price: 0,
        goods_weight: 0,
        goods_number: 0,
        goods_cat: [],
        pics: [],
        goods_introduce: '',
        attrs: []
      },
      addGoodsFormRules: {
        goods_name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
          { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
        ],
        goods_price: [
          { required: true, message: '请输入商品价格', trigger: 'blur' }
        ],
        goods_weight: [
          { required: true, message: '请输入商品重量', trigger: 'blur' }
        ],
        goods_number: [
          { required: true, message: '请输入商品数量', trigger: 'blur' }
        ],
        goods_cat: [
          { required: true, message: '请选择商品分类', trigger: 'blur' }
        ]
      },
      cateList: [],
      cateProps: {
        value: 'cat_id',
        label: 'cat_name',
        children: 'children',
        expandTrigger: 'hover'
      },
      // (商品参数)
      manyDataList: [],
      onlyDataList: [],
      // 图片上传
      uploadURL: 'http://127.0.0.1:8888/api/private/v1/upload',
      uploadLimitNum: 15,
      headerObj: {
        Authorization: window.sessionStorage.getItem('token')
      },
      previewPath: '',
      previewVisible: false
    }
  },
  // 创建页面加载级联选择：分类商品列表
  created () {
    this.getCateList()
  },
  methods: {
    // 向服务器请求获取级联选择器商品分类
    async getCateList () {
      const { data: res } = await this.$http.get('categories')
      if (res.meta.status !== 200) return this.$message.error('获取商品分类列表失败！')
      this.cateList = res.data
    },
    // 判断级联选择器商品级数
    goods_cat_KeysChange () {
      if (this.addGoodsForm.goods_cat.length !== 3) {
        this.addGoodsForm.goods_cat = []
      }
    },
    // 侦听tab切换的索引，形参为tab切换前后的name
    beforeTabLeave (activeName, oldActiveName) {
      if (oldActiveName === '0' && this.addGoodsForm.goods_cat.length !== 3) {
        this.$message.error('请选择商品分类！')
        return false
      }
    },
    // 侦听tab切换事件
    async tabClicked () {
      // 获取商品参数列表数据
      if (this.activeIndex === '1') {
        const { data: res } = await this.$http.get(`categories/${this.cateId}/attributes`, { params: { sel: 'many' } })
        res.data.forEach(item => {
          item.attr_vals = item.attr_vals ? item.attr_vals.split(' ') : []
        })
        if (res.meta.status !== 200) return this.$message.error('获取商品动态参数失败！')
        this.manyDataList = res.data
      } else if (this.activeIndex === '2') {
        const { data: res } = await this.$http.get(`categories/${this.cateId}/attributes`, { params: { sel: 'only' } })
        if (res.meta.status !== 200) return this.$message.error('获取商品静态属性失败！')
        this.onlyDataList = res.data
      }
    },
    // 点击图图片进行对话框预览
    handlePreview (file) {
      this.previewPath = file.response.data.url
      this.previewVisible = true
    },
    // 点击右上角按钮删除图片
    handleRemove (file) {
      // 获取删除图片临时路径，找到数组对应索引，然后将其剔除
      const fileDelPath = file.response.data.tmp_path
      const fileDelIndex = this.addGoodsForm.pics.findIndex(item => item.pic === fileDelPath)
      this.addGoodsForm.pics.splice(fileDelIndex, 1)
    },
    // 监听图片上传成功事件
    handleSuccess (file) {
      // 拼接得到图片的临时路径对象，加到图片路径数组
      const picInfo = { pic: file.data.tmp_path }
      this.addGoodsForm.pics.push(picInfo)
    },
    // 最后添加商品预校验
    allowAddGoods () {
      this.$refs.addGoodsFormRef.validate(async valid => {
        if (!valid) return this.$message.error('请填写必要的表单项')
        // 按API接口要求，封装数据对象类型（array数组转变为string字符串）
        // 避免级联选择器数据绑定冲突，用第三方lodash对表单进行深拷贝
        const cloneAddForm = _.cloneDeep(this.addGoodsForm)
        cloneAddForm.goods_cat = this.addGoodsForm.goods_cat.join(',')
        // 封装参数属性数据对象
        this.manyDataList.forEach(item => {
          const manyNewInfo = { attr_id: item.attr_id, attr_value: item.attr_vals.join(' ') }
          this.addGoodsForm.attrs.push(manyNewInfo)
        })
        this.onlyDataList.forEach(item => {
          const onlyNewInfo = { attr_id: item.attr_id, attr_value: item.attr_vals }
          this.addGoodsForm.attrs.push(onlyNewInfo)
        })
        cloneAddForm.attrs = this.addGoodsForm.attrs
        // 向服务器发起请求
        const { data: res } = await this.$http.post('goods', cloneAddForm)
        if (res.meta.status !== 201) return this.$message.error('添加商品失败！')
        console.log(res)
        this.$message.success('添加商品成功！')
        this.$router.push('/goods')
      })
    }
  },
  computed: {
    // 获取商品三级分类ID
    cateId () {
      if (this.addGoodsForm.goods_cat.length === 3) {
        return this.addGoodsForm.goods_cat[this.addGoodsForm.goods_cat.length - 1]
      } else {
        return null
      }
    }
  }
}
</script>
<style lang="less" scoped>
.el-steps {
  margin: 15px 0;
}
.el-checkbox {
  margin: 0 12px 0 0 !important;
}
.previewImg {
  width: 100%;
}
.addBtn {
  margin-top: 15px;
}
</style>
