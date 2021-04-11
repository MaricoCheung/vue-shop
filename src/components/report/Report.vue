<template>
  <div>
    <!-- 面包屑地址导航 -->
    <el-breadcrumb>
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据统计</el-breadcrumb-item>
      <el-breadcrumb-item>数据报表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片展示区 -->
    <el-card>
      <div id="main"></div>
    </el-card>
  </div>
</template>
<script>
// 导入echarts渲染折线图
import echarts from 'echarts'
// 导入lodash合并配置项的数据
import _ from 'lodash'

export default {
  data () {
    return {
      // 指定图表的配置项和数据，另外需要跟请求的折线图数据合并
      options: {
        title: {
          text: '用户来源'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#E9EEF3'
            }
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            boundaryGap: false
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ]
      }
    }
  },
  // 此时页面dom元素渲染完毕
  mounted () {
    this.getReportData()
  },
  methods: {
    async getReportData () {
      // 基于准备好的dom，初始化echarts实例
      var reportChat = echarts.init(document.getElementById('main'))
      // 向服务器发送请求，获取折线图数据和配置项
      const { data: res } = await this.$http.get('reports/type/1')
      if (res.meta.status !== 200) this.$message.error('获取数据报表失败！')
      // 合并res.data数组和this.options对象，得到新对象
      const result = _.merge(res.data, this.options)
      // 使用刚指定的配置项和数据，显示图表
      reportChat.setOption(result)
    }
  }
}
</script>
<style lang="less" scoped>
#main {
  width:750px;
  height:400px;
}
</style>
