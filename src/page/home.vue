<template>
  <div id="#app">
    <mt-header fixed title="广智云能管系统" class="header-top"></mt-header>
    <div class="electricity-panel">
      <ul class="electricity-ul">
        <li class="electricity-li" @click="viewHistory(viewType.everyDay)">
          <p class="count-title">当天全厂电量</p>
          <p class="count"><span class="count-num">{{electricity.dayCount}}</span><span class="count-unit">KW.H</span>
          </p>
        </li>
        <li class="electricity-li" @click="viewHistory(viewType.everyMonth)">
          <p class="count-title">当月全厂电量</p>
          <p class="count"><span class="count-num">{{electricity.monthCount}}</span><span class="count-unit">KW.H</span>
          </p>
        </li>
        <li class="electricity-li" style="border: 0">
          <p class="count-title">设备状态</p>
          <p class="count"><span class="count-num" style="font-size: 1rem">{{electricity.status}}</span></p>
        </li>
      </ul>
      <span class="updata-date">更新时间:{{electricity.update}}</span>
      <!--<span class="history-data"><router-link to="/history">查看历史数据</router-link></span>-->
    </div>
    <div class="electricity-show">
      <div class="wrapper">
        <div class="ele-title-box">
          <p class="electricity-title">用电总览</p>
        </div>
      </div>
      <ul class="ele-view-ul">
        <li class="ele-view-li" v-for="item in electricityView" :key="item.title">
          <p class="view-title">{{item.title}}({{item.unit}})</p>
          <el-progress type="circle" :percentage="transRate(item.rate, item.max)" color="#44bee6" :show-text="false"
                       :width=90
                       :stroke-width=5></el-progress>
          <p class="view-rate">{{item.rate}}{{item.unit}}</p>
        </li>
      </ul>
    </div>
    <div class="equipment-list">
      <div class="wrapper">
        <div class="eq-title-box">
          <p class="equipment-title">车间列表</p>
        </div>
        <el-table :data="workshopList" style="width: 100%;font-size: 12px;">
          <el-table-column prop="name" label="车间名称" align="center">
          </el-table-column>
          <el-table-column prop="equipmentLevel.id" label="层级ID" align="center">
          </el-table-column>
          <el-table-column prop="equipmentLevel.pid" label="数字ID" align="center">
          </el-table-column>
          <el-table-column prop="opear" label="操作" align="center">
            <template slot-scope="scope">
              <el-button @click="operate(scope.row.name,scope.row.equipmentLevel.pid)" type="text" size="small"
                         style="color:#769eb9">
                查看
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        equipVisible: false,
        electricity: {
          dayCount: 0,
          monthCount: 0,
          update: null,
          status: '',
          dvId: ''
        },
        viewType: {
          everyDay: 'everyDay',
          everyMonth: 'everyMonth'
        },
        electricityView: [{
          title: '电流',
          unit: 'A',
          rate: 0,
          min: 0,
          max: 20
        }, {
          title: '电压',
          unit: 'V',
          rate: 0,
          min: 0,
          max: 450
        }, {
          title: '功率',
          unit: 'W',
          rate: 0,
          min: 0,
          max: 20000
        }],
        tableData: [{
          id: 1
        }]
      }
    },
    computed: {
      workshopList () {
        return this.$store.state.workshopList
      }
    },
    mounted () {
      this.$store.state.show = true
      document.getElementsByTagName('body')[0].style.backgroundColor = '#f6f6f6'
    },
    created () {
      clearInterval(window.clearEqu)
      clearInterval(window.clearEcharts)
      // 初始化Tabbar高亮
      this.$store.dispatch('selectTab', '首页')
      // 初始化加载Data
      this.loadData()
      // 轮询 10s 发一次请求 (后续考虑长轮询)
      window.clearInt = setInterval(function () {
        this.loadData()
      }.bind(this), 10000)
    },
    methods: {
      viewHistory (viewType) {
        this.$router.push({
          name: 'history',
          params: {
            dvId: this.electricity.dvId,
            viewType: viewType
          }
        })
      },
      // 判断状态
      status (status) {
        if (status === 'true') {
          this.electricity.status = '正常'
        } else {
          this.electricity.status = '未连接'
        }
      },
      // 车间列表根据leaves.cLevel所属层级跳转到相应的详情页面
      operate (name, pId) {
        localStorage.childDeviceName = name
        localStorage.childDevicepId = pId
        // this.$store.dispatch('childInfo', {
        //   'name': name,
        //   'pId': pId
        // })
        this.$router.push({
          name: 'equipment'
          // params: {
          //   name: name,
          //   pId: pId
          // }
        })
        this.$store.state.show = false
      },
      // 计算根据传入的Rate;max转化为百分比
      transRate (rate, max) {
        return Number((rate / max * 100).toFixed(1))
      },
      // 加载首页数据
      loadData () {
        // if (localStorage.userPid === 'NULL') {
        //   this.$ajax.get('/api/v1/device/deviceList', {
        //     params: {
        //       // token;companyId 为必传参数
        //       'token': localStorage.userToken,
        //       'companyId': localStorage.userCompanyId
        //     }
        //   }).then(response => {
        //     let eleData = response.data
        //     // response.data.leaves 为字符串数组 需转换为json格式
        //     let workshopList = JSON.parse(eleData.leaves)
        //     // 提交到store保存
        //     this.$store.dispatch('workshopList', workshopList)
        //     // 后续考虑规范 目前为测试阶段
        //     // this.electricity.update = eleData.updateTime
        //     // this.electricity.dayCount = eleData.dayPower
        //     // this.electricity.monthCount = eleData.monthPower
        //     // this.electricityView[0].rate = eleData.aA
        //     // this.electricityView[1].rate = eleData.aV
        //     // this.electricityView[2].rate = eleData.aW
        //     // this.status(eleData.status)
        //   }).catch(function (err) {
        //     console.log(err)
        //   })
        // } else {
        let postData = this.$qs.stringify({
          token: localStorage.userToken,
          pId: localStorage.userPId
        })
        this.$ajax({
          method: 'post',
          // url: process.env.INFO_API + '/Equipment/getEquipmentInfo',
          url: '/dev/Equipment/getEquipmentInfo',
          data: postData
        }).then(response => {
          let equipData = response.data.data
          this.electricity.update = equipData.updateTime
          this.electricity.dayCount = equipData.dayPower
          this.electricity.monthCount = equipData.monthPower
          this.electricity.dvId = equipData.dvId
          this.electricityView[0].rate = equipData.aa
          this.electricityView[1].rate = equipData.av
          this.electricityView[2].rate = equipData.aw
          this.status(equipData.status)
          let workshopList = equipData.equipmentInfoList
          this.$store.dispatch('workshopList', workshopList)
          console.log(equipData)
        }).catch(err => {
          console.log(err)
        })
        // this.$ajax.get('/dev/Equipment/getEquipmentInfo', {  可以删除可以删除可以删除可以删除可以删除
        //   params: {
        //     token;pid;requestDayPower;requestMonthPower 为必传参数
        //     'token': localStorage.userToken,
        //     'pid': localStorage.userPId,
        //     'lever': 'F',
        //     'requestDayPower': 'Y',
        //     'requestMonthPower': 'Y'
        //   }
        // }).then(response => {
        //   let equipData = response.data
        //   response.data.leaves 为字符串数组 需转换为json格式
        //   let workshopList = JSON.parse(equipData.leaves)
        //   提交到store保存
        //   this.$store.dispatch('workshopList', workshopList)
        //   后续考虑规范 目前为测试阶段
        //   this.electricity.update = equipData.updateTime
        //   this.electricity.dayCount = equipData.dayPower
        //   this.electricity.monthCount = equipData.monthPower
        //   this.electricityView[0].rate = equipData.aa
        //   this.electricityView[1].rate = equipData.av
        //   this.electricityView[2].rate = equipData.aw
        //   this.status(equipData.status)
        //   console.log(equipData)
        // }).catch(function (err) {
        //   console.log(err)
        // })   可以删除可以删除可以删除可以删除可以删除
        // }
      }
    }
  }
</script>

<style scoped>
  body {
    background: #f6f6f6;
  }

  .mint-tabbar {
    display: -webkit-box;
  }

  .electricity-panel {
    margin-top: 60px;
    width: 100%;
    height: 120px;
    background-color: #fff;
  }

  .electricity-panel .electricity-ul .electricity-li {
    margin-top: 30px;
    margin-bottom: 18px;
    width: 33.33%;
    height: 41.2px;
    float: left;
    text-align: left;
    border-right: #e7e7e7 solid 1px;
    box-sizing: border-box;
  }

  .electricity-panel .electricity-ul .electricity-li .count-title {
    padding-bottom: 6px;
    padding-left: 18px;
    font-size: 9px;
    color: #808080;
  }

  .electricity-panel .electricity-ul .electricity-li .count .count-num {
    padding-left: 18px;
    font-size: 19px;
    color: #5a5a5a;
  }

  .electricity-panel .electricity-ul .electricity-li .count .count-unit {
    padding-left: 6px;
    font-size: 9px;
    color: #808080;
  }

  .electricity-panel .updata-date {
    padding-left: 18px;
    float: left;
    text-align: left;
    font-size: 9px;
    color: #808080;
  }

  .electricity-panel .history-data {
    padding-right: 18px;
    float: right;
    font-size: 12px;
    color: #808080;
  }

  .electricity-show {
    margin-top: 10px;
    padding-top: 1px;
    width: 100%;
    height: 180px;
    background-color: #fff;
  }

  .electricity-show .ele-title-box {
    margin-bottom: 5px;
    width: 100%;
    height: 18px;
    background: url('../assets/eq-rate-icon.png') no-repeat 0 1px;
    background-size: 18px 14px;
  }

  .electricity-show .ele-title-box .electricity-title {
    margin-top: 14px;
    padding-left: 28px;
    font-size: 15px;
    line-height: 18px;
    text-align: left;
    color: #5a5a5a;
  }

  .electricity-show .ele-view-ul .ele-view-li {
    width: 33.33%;
    position: relative;
    float: left;
    margin-bottom: 10px;
    padding: 12px 0 8px 0;
    /*border-left: 1px solid #f6f6f6;*/
    /*border-right: 1px solid #f6f6f6;*/
    box-sizing: border-box;
  }

  .electricity-show .ele-view-ul .ele-view-li .view-title {
    margin-bottom: 10px;
    font-size: 12px;
    color: #5a5a5a;
  }

  .electricity-show .ele-view-ul .ele-view-li .view-rate {
    position: absolute;
    left: 0;
    right: 0;
    top: 60%;
    bottom: 0;
    margin: -8px auto 0 auto;
    font-size: 12px;
    color: #5a5a5a;
  }

  .equipment-list {
    margin-top: 10px;
    margin-bottom: 65px;
    padding-top: 1px;
    padding-bottom: 10px;
    width: 100%;
    background-color: #fff;
  }

  .equipment-list .eq-title-box {
    margin-bottom: 5px;;
    background: url('../assets/eq-list-icon.png') no-repeat 0 1px;
    background-size: 18px 14px;
    height: 18px;
  }

  .equipment-panel .equipment-info .eq-title-box .equipment-title {
    padding-left: 28px;
    font-size: 15px;
    line-height: 18px;
    text-align: left;
    color: #5a5a5a;
  }

  .equipment-list .eq-title-box .equipment-title {
    margin-top: 14px;
    padding-left: 28px;
    font-size: 15px;
    line-height: 18px;
    text-align: left;
    color: #5a5a5a;
  }
</style>
