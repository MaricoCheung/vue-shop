<template>
  <div>
    <!-- 面包屑地址导航 -->
    <el-breadcrumb>
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片展示区 -->
    <el-card>
      <!-- 表头搜索区 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入搜索订单" v-model="queryInfo.query" clearable @clear="getOrdersList">
            <el-button slot="append" icon="el-icon-search" @click="getOrdersList"></el-button>
          </el-input>
        </el-col>
      </el-row>
      <!-- 表格订单展示 -->
      <el-table border stripe :data="ordersList">
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="订单编号" prop="order_number"></el-table-column>
        <el-table-column label="订单金额(元)" prop="order_price" width="95px"></el-table-column>
        <el-table-column label="发票抬头" prop="order_fapiao_title" width="75px"></el-table-column>
        <el-table-column label="是否付款" prop="pay_status" width="80px">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.pay_status === '1'" type="success">已付款</el-tag>
            <el-tag v-else type="danger">未付款</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="是否发货" prop="is_send" width="75px"></el-table-column>
        <el-table-column label="下单时间" prop="create_time" width="150px">
          <template slot-scope="scope">{{scope.row.create_time | dateFormat}}</template>
        </el-table-column>
        <el-table-column label="操作" width="140px">
          <template slot-scope="scope">
            <el-tooltip content="修改地址" placement="top" :enterable="false">
              <el-button type="primary" class="el-icon-edit" size="mini" @click="showEditDialog(scope.row.order_id)"></el-button>
            </el-tooltip>
            <el-tooltip content="物流进度" placement="top" :enterable="false">
              <el-button type="success" class="el-icon-location" size="mini" @click="showProgress(scope.row.order_id)"></el-button>
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
    <!-- 修改订单地址对话框 -->
    <el-dialog title="修改订单" :visible.sync="editOrderFormVisible"  @close="editOrderFormClosed" width="50%">
      <el-form ref="editOrderFormRef" :model="editOrderForm" label-width="100px" :rules="editOrderFormRules">
        <el-form-item label="订单编号">
          <el-input v-model="editOrderForm.order_number" disabled></el-input>
        </el-form-item>
        <el-form-item label="订单金额">
          <el-row>
            <el-col :span="16">
              <el-input-number v-model="editOrderForm.order_price" controls-position="right" :min="0" :max="999999" size="small">
              </el-input-number>
              <el-tag type="info" plain>￥</el-tag>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="物流状态">
          <el-radio v-model="editOrderForm.is_send" label="是" disabled>
            <el-tag type="success">已发货</el-tag>
          </el-radio>
          <el-radio v-model="editOrderForm.is_send" label="否" disabled>
            <el-tag type="danger">未发货</el-tag>
          </el-radio>
        </el-form-item>
        <el-form-item label="支付状态">
          <el-radio v-model="editOrderForm.pay_status" label="1" disabled>
            <el-tag type="success">已付款</el-tag>
          </el-radio>
          <el-radio v-model="editOrderForm.pay_status" label="0" disabled>
            <el-tag type="danger">未付款</el-tag>
          </el-radio>
        </el-form-item>
        <el-form-item label="支付方式">
          <el-radio v-model="editOrderForm.order_pay" label="1" disabled>
            <svg class="icon-pay" aria-hidden="true">
              <use xlink:href="#icon-pay-ali"></use>
            </svg>支付宝
          </el-radio>
          <el-radio v-model="editOrderForm.order_pay" label="2" disabled>
            <svg class="icon-pay" aria-hidden="true">
              <use xlink:href="#icon-pay-wechat"></use>
            </svg>微信支付
          </el-radio>
          <el-radio v-model="editOrderForm.order_pay" label="3" disabled>
            <svg class="icon-pay" aria-hidden="true">
              <use xlink:href="#icon-pay-union"></use>
            </svg>银行卡
          </el-radio>
          <el-radio v-model="editOrderForm.order_pay" label="0" disabled>
            <el-tag type="danger">未付款</el-tag>
          </el-radio>
        </el-form-item>
        <el-divider content-position="center">收货地址</el-divider>
        <el-form-item label="省市区/县" prop="addressRegion" :rules="{ required:addressForm.addressRegion == '' ? true : false,message:'请选择省市区县' }">
          <el-cascader :options="cityData" v-model="addressForm.addressRegion" expandTrigger="'hover" clearable></el-cascader>
        </el-form-item>
        <el-form-item label="详细地址" prop="addressDetail" :rules="{ required:addressForm.addressDetail === '' ? true : false,message:'请填写详细地址' }">
          <el-input v-model="addressForm.addressDetail"></el-input>
        </el-form-item>
        <el-divider content-position="center">发票</el-divider>
        <el-form-item label="发票抬头">
          <el-radio v-model="editOrderForm.order_fapiao_title" label="个人">
            <el-tag type="success">个人</el-tag>
          </el-radio>
          <el-radio v-model="editOrderForm.order_fapiao_title" label="公司">
            <el-tag>公司</el-tag>
          </el-radio>
        </el-form-item>
        <el-form-item label="实体名称">
          <el-input v-model="editOrderForm.order_fapiao_company"></el-input>
        </el-form-item>
        <el-form-item label="发票内容">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="editOrderForm.order_fapiao_content"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editOrderFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="allowEditOrder">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 查看物流进度对话框 -->
    <el-dialog title="物流进度" :visible.sync="progressVisible" width="40%">
      <el-timeline>
        <el-timeline-item v-for="(activity, index) in progressInfo" :key="index" :timestamp="progressInfo.time">
          {{progressInfo.context}}
        </el-timeline-item>
      </el-timeline>
    </el-dialog>
    <!-- 返回顶部 -->
    <el-backtop>
      <div class="back-to-top">UP</div>
    </el-backtop>
  </div>
</template>
<script>
// 导入省市区县
import cityData from '../../assets/js/citydata'
// 导入支付图标symbol文件
import '../../assets/js/icon-pay'

export default {
  data () {
    return {
      // 配置搜索及分页参数
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 5
      },
      ordersList: [],
      total: 0,
      // 配置修改订单对话框参数
      editOrderFormVisible: false,
      editOrderId: 0,
      editOrderForm: {},
      addressForm: {
        addressRegion: [],
        addressDetail: ''
      },
      editOrderFormRules: {
        addressRegion: [
          { required: true, message: '请选择省市区县', trigger: 'blur' }
        ],
        addressDetail: [
          { required: true, message: '请填写详细地址', trigger: 'change' }
        ]
      },
      cityData: cityData,
      // 配置物流进度对话框参数
      progressVisible: false,
      progressInfo: []
    }
  },
  // 创建页面组件时，加载订单列表数据
  created () {
    this.getOrdersList()
  },
  methods: {
    // 向服务器请求获取商品订单列表
    async getOrdersList () {
      const { data: res } = await this.$http.get('orders', { params: this.queryInfo })
      if (res.meta.status !== 200) this.$message.error('获取订单列表失败！')
      this.ordersList = res.data.goods
      this.total = res.data.total
    },
    // 监听页面展示条数
    handleSizeChange (newSize) {
      this.queryInfo.pagesize = newSize
      this.getOrdersList()
    },
    // 监听页面当前页数
    handleCurrentChange (newPage) {
      this.queryInfo.pagenum = newPage
      this.getOrdersList()
    },
    // 显示修改对话框
    async showEditDialog (orderId) {
      // 获取订单信息
      const { data: res } = await this.$http.get('orders/' + orderId)
      if (res.meta.status !== 200) return this.$message.error('获取当前订单信息失败！')
      this.editOrderForm = res.data
      this.editOrderId = res.data.order_id
      // 处理收货地址对象类型（判断是否已经设置收货地址）
      const addressInfo = res.data.consignee_addr.split(',')
      this.addressForm.addressRegion = addressInfo[0]
      const detailInfo = res.data.consignee_addr ? '【' + addressInfo[0] + '】' + addressInfo[1] : ''
      this.addressForm.addressDetail = detailInfo
      this.editOrderFormVisible = true
    },
    // 关闭修改地址对话框重置表单
    editOrderFormClosed () {
      this.editOrderForm = {}
      this.addressForm.addressRegion = []
      this.addressForm.addressDetail = ''
      this.$refs.editOrderFormRef.resetFields()
    },
    // 允许对话框修改预验证
    allowEditOrder () {
      this.$refs.editOrderFormRef.validate(async valid => {
        if (!valid) return
        // 封装收货地址数据对象类型（判断详细地址中是否包含区域地址）
        const regionInfo = this.addressForm.addressRegion.join('')
        const consigneeAddress = regionInfo + ',' + this.addressForm.addressDetail
        this.editOrderForm.consignee_addr = consigneeAddress
        // 向服务器发起请求
        const { data: res } = await this.$http.put('orders/' + this.editOrderId, this.editOrderForm)
        if (res.meta.status !== 201) return this.$message.error('更新订单信息失败！')
        this.$message.success('更新订单信息成功！')
        this.getOrdersList()
        this.editOrderFormVisible = false
      })
    },
    // 显示物流进度对话框
    showProgress () {
      this.$message.warning('物流查询功能正在抢修！')
      // 获取当前订单物流信息
      // const { data: res } = await this.$http.get('/kuaidi/:804909574412544580')
      // if (res.meta.status !== 200) this.$message.error('获取物流信息失败！')
      // this.progressInfo = res.data
      // this.progressVisible = true
    }
  }
}
</script>
<style lang="less" scoped>
.el-cascader {
  width: 100%;
}
// 设置支付图标
.icon-pay {
  width: 2em;
  height: 2em;
  vertical-align: -0.6em;
  fill: currentColor;
  overflow: hidden;
  margin-right: 4px;
}
</style>
