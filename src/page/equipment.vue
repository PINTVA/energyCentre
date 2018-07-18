<template>
  <div>
    <mt-header fixed :title="title" class="header-top" id="header-title">
      <mt-button icon="back" @click="show" style="width: 100%;text-align: left" slot="left"></mt-button>
    </mt-header>
    <div class="electricity-panel">
      <ul class="electricity-ul">
        <li class="electricity-li" @click="viewHistory(viewType.everyDay)">
          <p class="count-title">当天电量</p>
          <p class="count"><span class="count-num">{{electricity.dailyCount}}</span><span class="count-unit">KW.H</span>
          </p>
        </li>
        <li class="electricity-li" @click="viewHistory(viewType.everyMonth)">
          <p class="count-title">当月电量</p>
          <p class="count"><span class="count-num">{{electricity.currentCount}}</span><span
            class="count-unit">KW.H</span></p>
        </li>
        <li class="electricity-li" style="border: 0">
          <p class="count-title">设备状态</p>
          <p class="count"><span class="count-num" style="font-size: 1rem">{{electricity.status}}</span></p>
        </li>
      </ul>
      <p class="updata-date">更新时间:{{electricity.update}}</p>
    </div>
    <div class="electricity-show">
      <div class="wrapper">
        <div class="equip-ele-box">
          <ul>
            <li><p class="equip-electricity">用电总览</p></li>
            <li><p class="equip-temperature">温度:{{electricity.temperature}}℃</p></li>
          </ul>
        </div>
      </div>
      <ul class="ele-view-ul">
        <li class="ele-view-li" v-for="item in electricityView" :key="item.title">
          <p class="view-title">{{item.title}}({{item.unit}})</p>
          <el-progress type="circle" :percentage="transRate(item.rate,item.max)" color="#44bee6" :show-text="false"
                       :width=90
                       :stroke-width=5></el-progress>
          <p class="view-rate">{{item.rate}}{{item.unit}}</p>
        </li>
      </ul>
    </div>
    <div class="electric-current rate-panel">
      <div class="wrapper">
        <p class="rate-line-title">实时电流变化(A)</p>
        <div id="electric-line" :style="{width: '100%', height: '145px'}"></div>
      </div>
    </div>
    <div class="electric-current rate-panel">
      <div class="wrapper">
        <p class="rate-line-title">实时电压变化(V)</p>
        <div id="voltage-line" :style="{width: '100%', height: '145px'}"></div>
      </div>
    </div>
    <div class="electric-current rate-panel">
      <div class="wrapper">
        <p class="rate-line-title">实时功率变化(W)</p>
        <div id="power-line" :style="{width: '100%', height: '145px'}"></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        title: localStorage.childDeviceName,
        equipTitle: '',
        electricity: {
          dailyCount: 0,
          currentCount: 0,
          pastCount: '',
          update: '',
          status: '正常',
          temperature: 0,
          dvId: ''
        },
        viewType: {
          everyDay: 'everyDay',
          everyMonth: 'everyMonth'
        },
        RealTimeData: {
          realTime: ['', '', '', '', ''],
          realEle: ['', '', '', '', ''],
          realVolt: ['', '', '', '', ''],
          realPow: ['', '', '', '', '']
        },
        electricityView: [{
          title: '电流',
          unit: 'A',
          rate: 0,
          min: 0,
          max: 10
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
          max: 8000
        }]
      }
    },
    created () {
      clearInterval(window.clearInt)
      // 初始化加载Data
      this.loadInfo()
      // 轮询 10s 发一次请求 (后续考虑长轮询)
      window.clearEqu = setInterval(function () {
        this.loadInfo()
      }.bind(this), 10000)
      // echarts 数据更新
      window.clearEcharts = setInterval(function () {
        this.updateRLDate(this.electricity.update.substring(11), this.electricityView[0].rate, this.electricityView[1].rate, this.electricityView[2].rate)
        this.drawEleLine()
        this.drawVoltLine()
        this.drawPowerLine()
      }.bind(this), 10000)
    },
    mounted () {
    },
    methods: {
      // 查看当前设备的历史电量数据
      viewHistory (viewType) {
        this.$router.push({
          name: 'history',
          params: {
            dvId: this.electricity.dvId,
            viewType: viewType
          }
        })
      },
      // 计算根据传入的Rate;max转化为百分比
      transRate (rate, max) {
        return Number((rate / max * 100).toFixed(1))
      },
      // 返回上一级 Tabbar显示
      show () {
        this.$router.back(-1)
        this.$store.state.show = true
      },
      // 更新横坐标的时间
      updateRLDate (XTime, Electric, Volt, Power) {
        this.RealTimeData.realTime.shift()
        this.RealTimeData.realEle.shift()
        this.RealTimeData.realVolt.shift()
        this.RealTimeData.realPow.shift()
        this.RealTimeData.realTime.push(XTime)
        this.RealTimeData.realEle.push(Electric)
        this.RealTimeData.realVolt.push(Volt)
        this.RealTimeData.realPow.push(Power)
      },
      // 加载首页数据
      loadInfo () {
        let postData = this.$qs.stringify({
          token: localStorage.userToken,
          pId: localStorage.childDevicepId
        })
        this.$ajax({
          method: 'post',
          // url: process.env.INFO_API + '/Equipment/getEquipmentInfo',
          url: '/dev/Equipment/getEquipmentInfo',
          data: postData
        }).then(response => {
          let equipData = response.data.data
          this.electricity.update = equipData.updateTime
          this.electricity.dailyCount = equipData.dayPower
          this.electricity.currentCount = equipData.monthPower
          this.electricity.dvId = equipData.dvId
          this.electricity.temperature = equipData.at
          this.electricityView[0].rate = equipData.aa
          this.electricityView[1].rate = equipData.av
          this.electricityView[2].rate = equipData.aw
          console.log(equipData)
        }).catch(err => {
          console.log(err)
        })
        // v2
        // this.$ajax.get('/api/v1/electricity', {
        //   params: {
        //     'token': localStorage.userToken,
        //     'pid': localStorage.userPId,
        //     'lever': 'F',
        //     'requestDayPower': 'Y',
        //     'requestMonthPower': 'Y'
        //   }
        // }).then(response => {
        //   let eleData = response.data
        //   this.electricity.update = eleData.updateTime
        //   this.electricity.dailyCount = eleData.dayPower
        //   this.electricity.currentCount = eleData.monthPower
        //   this.electricity.temperature = eleData.aT
        //   this.electricityView[0].rate = eleData.aA
        //   this.electricityView[1].rate = eleData.aV
        //   this.electricityView[2].rate = eleData.aW
        // }).catch(function (err) {
        //   console.log(err)
        // })
      },
      drawEleLine () {
        let myChart = this.$echarts.init(document.getElementById('electric-line'))
        myChart.setOption({
          xAxis: {
            type: 'category',
            data: this.RealTimeData.realTime,
            axisLine: {
              lineStyle: {
                color: '#a5a5a5'
              }
            },
            axisLabel: {
              fontSize: 8
            }
          },
          grid: {
            left: '0',
            right: '0',
            top: '20',
            bottom: '0',
            containLabel: true
          },
          yAxis: {
            type: 'value',
            position: 'left',
            axisLine: {
              lineStyle: {
                color: '#a5a5a5'
              }
            },
            axisLabel: {
              fontSize: 8
            }
          },
          series: [{
            data: this.RealTimeData.realEle,
            type: 'line',
            barWidth: '60%',
            color: '#44bee6'
          }]
        })
      },
      drawVoltLine () {
        let myChart = this.$echarts.init(document.getElementById('voltage-line'))
        myChart.setOption({
          xAxis: {
            type: 'category',
            data: this.RealTimeData.realTime,
            axisLine: {
              lineStyle: {
                color: '#a5a5a5'
              }
            },
            axisLabel: {
              fontSize: 8
            }
          },
          grid: {
            left: '0',
            right: '0',
            top: '20',
            bottom: '0',
            containLabel: true
          },
          yAxis: {
            type: 'value',
            position: 'left',
            axisLine: {
              lineStyle: {
                color: '#a5a5a5'
              }
            },
            axisLabel: {
              fontSize: 8
            }
          },
          series: [{
            data: this.RealTimeData.realVolt,
            type: 'line',
            barWidth: '60%',
            color: '#44bee6'
          }]
        })
      },
      drawPowerLine () {
        let myChart = this.$echarts.init(document.getElementById('power-line'))
        myChart.setOption({
          xAxis: {
            type: 'category',
            data: this.RealTimeData.realTime,
            axisLine: {
              lineStyle: {
                color: '#a5a5a5'
              }
            },
            axisLabel: {
              fontSize: 8
            }
          },
          grid: {
            left: '0',
            right: '0',
            top: '20',
            bottom: '0',
            containLabel: true
          },
          yAxis: {
            type: 'value',
            position: 'left',
            axisLine: {
              lineStyle: {
                color: '#a5a5a5'
              }
            },
            axisLabel: {
              fontSize: 8
            }
          },
          series: [{
            data: this.RealTimeData.realPow,
            type: 'line',
            barWidth: '60%',
            color: '#44bee6'
          }]
        })
      }
    }
  }
</script>

<style scoped>
  .equip-info {
    width: 100%;
    height: 100%;
    background: #f6f6f6;
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
    text-align: left;
    font-size: 9px;
    color: #808080;
  }

  .electricity-show .equip-ele-box {
    margin-top: 14px;
    margin-bottom: 5px;
    width: 100%;
    height: 18px;
    background: url('../assets/eq-rate-icon.png') no-repeat 0 1px;
    background-size: 18px 14px;
  }

  .electricity-show .equip-ele-box ul li {
    width: 50%;
    float: left;
  }

  .electricity-show .equip-ele-box ul li .equip-electricity {
    text-align: left;
    padding-left: 28px;
    font-size: 15px;
    color: #5a5a5a;
    line-height: 18px;
  }

  .electricity-show .equip-ele-box ul li .equip-temperature {
    text-align: right;
    font-size: 12px;
    color: #5a5a5a;
    line-height: 18px;
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

  .rate-panel {
    margin-top: 10px;
    width: 100%;
    height: 186px;
    background: #fff;
  }

  .rate-panel .rate-line-title {
    padding-top: 10px;
    text-align: left;
    font-size: 13px;
    color: #808080;
  }
</style>
