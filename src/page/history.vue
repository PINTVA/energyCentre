<template>
  <div>
    <mt-header fixed title="电量历史信息" class="header-top" id="header-title">
      <mt-button icon="back" @click="show" style="width: 100%;text-align: left" slot="left"></mt-button>
    </mt-header>
    <div class="select-date">
      <span>选择:</span>
      <el-select v-model="value" @change="test(value,label)" style="padding-top: 10px;">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"></el-option>
      </el-select>
      <span>选择:</span>
      <mt-button size="small" @click="chooseDayVisible=true">一天</mt-button>
      <mt-button size="small" @click="chooseMonthVisible=true">一个月</mt-button>
    </div>
    <div class="history-panel">
      <div class="wrapper">
        <div id="history-bar" :style="{width: '100%', height: '380px'}"></div>
      </div>
    </div>
    <mt-popup class="chooseDay" v-model="chooseDayVisible" position="bottom">
      <mt-header fixed title="按日选择" class="header-choose">
        <mt-button slot="right" @click="defineTime(chooseDay)" style="padding-right: 12px;">确定</mt-button>
      </mt-header>
      <mt-picker :slots="pinkerDay" @change="onValuesChange"></mt-picker>
    </mt-popup>
    <mt-popup class="chooseMonth" v-model="chooseMonthVisible" position="bottom">
      <mt-header fixed title="按月选择" class="header-choose">
        <mt-button slot="right" @click="defineTime(chooseMonth)" style="padding-right: 12px;">确定</mt-button>
      </mt-header>
      <mt-picker :slots="pinkerMonth" @change="onValuesChange"></mt-picker>
    </mt-popup>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        chooseMonth: 'getPowerByMonth',
        chooseDay: 'getPowerByDay',
        chooseDayVisible: false,
        chooseMonthVisible: false,
        chooseTime: '',
        pinkerDay: [
          {
            flex: 1,
            values: ['2016', '2017', '2018', '2019', '2020'],
            className: 'slot1',
            textAlign: 'center'
          }, {
            divider: true,
            content: '-',
            className: 'slot2'
          }, {
            flex: 1,
            values: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
            className: 'slot3',
            textAlign: 'center'
          }, {
            divider: true,
            content: '-',
            className: 'slot4'
          }, {
            flex: 1,
            values: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'],
            className: 'slot5',
            textAlign: 'center'
          }
        ],
        pinkerMonth: [
          {
            flex: 1,
            values: ['2016', '2017', '2018', '2019', '2020'],
            className: 'slot1',
            textAlign: 'center'
          }, {
            divider: true,
            content: '-',
            className: 'slot2'
          }, {
            flex: 1,
            values: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
            className: 'slot3',
            textAlign: 'center'
          }
        ],
        options: [{
          value: 'currentWeek',
          label: '本周'
        }, {
          value: 'currentMonth',
          label: '本月'
        }, {
          value: 'lastWeek',
          label: '上周'
        }, {
          value: 'lastMonth',
          label: '上个月'
        }],
        value: '',
        label: '请选择',
        seriesData: [],
        xAxisData: []
      }
    },
    created () {
      this.devTest()
      // this.test(this.value)
      this.startView(this.$route.params.viewType)
    },
    mounted () {
      this.drawHistoryBar()
    },
    methods: {
      startView (viewType) {
        let date = new Date()
        let chooseDate = date.getFullYear() + '' + this.dateFormat(date.getMonth() + 1) + '' + this.dateFormat(date.getDate())
        if (viewType === 'everyDay') {
          this.loadDataByDay(this.chooseDay, chooseDate)
        } else if (viewType === 'everyMonth') {
          this.loadData(this.chooseMonth, chooseDate)
        }
      },
      dateFormat (value) {
        return value < 10 ? '0' + value : value
      },
      devTest () {
        this.$store.state.show = false
      },
      onValuesChange (picker, values) {
        let value = ''
        values.forEach(function (item) {
          value += item
        })
        // this.chooseTime = value + '01'
        this.chooseTime = value < 999999 ? value + '01' : value
      },
      defineTime (apiType) {
        this.chooseDayVisible = false
        this.chooseMonthVisible = false
        if (apiType === 'getPowerByMonth') {
          this.loadData(apiType, this.chooseTime)
        } else {
          this.loadDataByDay(apiType, this.chooseTime)
        }
        // this.loadData(apiType, this.chooseTime)
        console.log(this.chooseTime)
      },
      // 返回上一级 Tabbar显示
      show () {
        this.$router.back(-1)
        // this.$store.state.show = true
      },
      test (value, lable) {
        let date = new Date()
        let apiType = ''
        let chooseDate = ''
        if (value === 'currentWeek') {
          apiType = 'getPowerByWeek'
          date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
          chooseDate = date.getFullYear() + '' + this.dateFormat(date.getMonth() + 1) + '' + this.dateFormat(date.getDate())
          console.log(chooseDate)
          this.loadData(apiType, chooseDate)
        } else if (value === 'currentMonth') {
          apiType = 'getPowerByMonth'
          chooseDate = date.getFullYear() + '' + this.dateFormat(date.getMonth() + 1) + '' + this.dateFormat(date.getDate())
          console.log(chooseDate)
          this.loadData(apiType, chooseDate)
        } else if (value === 'lastWeek') {
          apiType = 'getPowerByWeek'
          date.setTime(date.getTime() - 3600 * 1000 * 24 * 14)
          chooseDate = date.getFullYear() + '' + this.dateFormat(date.getMonth() + 1) + '' + this.dateFormat(date.getDate())
          console.log(chooseDate)
          this.loadData(apiType, chooseDate)
        } else if (value === 'lastMonth') {
          apiType = 'getPowerByMonth'
          date.setTime(date.getTime() - 3600 * 1000 * 24 * 30)
          chooseDate = date.getFullYear() + '' + this.dateFormat(date.getMonth() + 1) + '' + this.dateFormat(date.getDate())
          console.log(chooseDate)
          this.loadData(apiType, chooseDate)
          // this.xAxisData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
          // this.seriesData = [820, 932, 901, 934, 1290, 1330, 1320, 330, 1320, 820, 932, 901, 934, 1290, 1330, 1320, 1320, 330, 1320, 820, 901, 934, 1290, 1330, 1320, 330, 1320, 820, 932, 901]
        }
        console.log(value + lable)
      },
      loadData (apiType, chooseDate) {
        let postData = this.$qs.stringify({
          token: localStorage.userToken,
          dvId: this.$route.params.dvId,
          date: chooseDate
        })
        this.$ajax({
          method: 'post',
          // url: process.env.INFO_API + '/Equipment/' + apiType,
          url: '/dev/Equipment/' + apiType,
          data: postData
        }).then(response => {
          this.xAxisData = []
          this.seriesData = []
          let data = response.data.data
          data.forEach(value => {
            this.xAxisData.push(value.powerStartTime.substring(8, 10))
            this.seriesData.push(value.power)
          })
          this.drawHistoryBar()
          console.log(data)
        }).catch(err => {
          console.log(err)
        })
      },
      loadDataByDay (apiType, chooseDate) {
        let postData = this.$qs.stringify({
          token: localStorage.userToken,
          dvId: this.$route.params.dvId,
          time: chooseDate
        })
        this.$ajax({
          method: 'post',
          // url: process.env.INFO_API + '/Equipment/' + apiType,
          url: '/dev/Equipment/' + apiType,
          data: postData
        }).then(response => {
          this.xAxisData = []
          this.seriesData = []
          let data = response.data.data
          data.forEach(value => {
            this.xAxisData.push(value.powerStartTime.substring(11, 13))
            this.seriesData.push(value.power)
          })
          this.drawHistoryBar()
          console.log(data)
        }).catch(err => {
          console.log(err)
        })
      },
      drawHistoryBar () {
        // for (var i = 0; i < this.data.length; i++) {
        //   this.dataShadow.push(this.yMax);
        // }
        let myChart = this.$echarts.init(document.getElementById('history-bar'))
        myChart.setOption({
          xAxis: {
            type: 'category',
            data: this.xAxisData,
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            z: 10,
            axisLabel: {
              textStyle: {
                color: '#999',
                fontSize: 10
              }
            },
          },
          yAxis: {
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              textStyle: {
                color: '#999',
                fontSize: 10
              }
            }
          },
          dataZoom: [
            {
              type: 'inside'
            }
          ],
          series: [{
            type: 'bar',
            data: this.seriesData,
            label: {
              show: true,
              fontSize: 9,
              align: 'right',
              rotate: 90,
              color: '#fff'
            },
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    {offset: 0, color: '#83bff6'},
                    {offset: 0.5, color: '#44bee6'},
                    {offset: 1, color: '#40b0d7'}
                  ]
                )
              },
              emphasis: {
                color: new this.$echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    {offset: 0, color: '#44bee6'},
                    {offset: 0.7, color: '#49c9f3'},
                    {offset: 1, color: '#83bff6'}
                  ]
                )
              }
            },
            barGap: '-100%',
            barCategoryGap: '40%',
            animation: false
          }]
        })
        window.onresize = function () {
          myChart.resize()
        }
      }
    }
  }
</script>
<style scoped>
  .select-date {
    width: 100%;
    height: 60px;
    margin-top: 60px;
    margin-bottom: 10px;
    background-color: #fff;
  }

  .select-date .el-select {
    width: 30%;
    height: 10px;
    text-align: center;
  }

  .select-date .el-scrollbar {
    width: 90%;
  }

  .history-panel {
    width: 100%;
    height: 400px;
    background: #fff;
  }

  .chooseDay {
    width: 100%;
    height: 30%;
  }

  .chooseMonth {
    width: 100%;
    height: 30%;
  }

  .header-choose {
    height: 50px;
    font-size: 16px;
    background-color: #fff;
    color: #5a5a5a;
  }

  .mint-button--default {
    background-color: #fff;
  }
</style>
