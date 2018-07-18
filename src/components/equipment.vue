<template>
  <div>
    <div class="electricity-panel">
      <ul class="electricity-ul">
        <li class="electricity-li">
          <p class="count-title">今日电量</p>
          <p class="count"><span class="count-num">{{electricity.dailyCount}}</span><span class="count-unit">KW.H</span>
          </p>
        </li>
        <li class="electricity-li">
          <p class="count-title">今日当前电量</p>
          <p class="count"><span class="count-num">{{electricity.currentCount}}</span><span
            class="count-unit">KW.H</span></p>
        </li>
        <li class="electricity-li" style="border: 0">
          <p class="count-title">昨天当前电量</p>
          <p class="count"><span class="count-num">{{electricity.pastCount}}</span><span class="count-unit">KW.H</span>
          </p>
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
          <el-progress type="circle" :percentage="yep(item.rate,item.max)" color="#44bee6" :show-text="false" :width=90 :stroke-width=5></el-progress>
          <p class="view-rate">{{item.rate}}{{item.unit}}</p>
        </li>
      </ul>
    </div>
    <p>456</p>
    <p>456</p>
    <p>456</p>
    <p>456</p>
    <p>456</p>
    <p>456</p>
    <p>456</p>
    <p>456</p>
    <p>456</p>
    <p>456</p>
    <p>456</p>
    <p>456</p>
    <p>456</p>
    <p>456</p>
    <p>456</p>
    <p>456</p>
    <p>456</p>
    <p>456</p>
    <p>456</p>
    <p>456</p>
    <p>456</p>
    <p>456</p>
    <p>456</p>
    <p>456</p>
    <p>456</p>
    <p>456</p>
    <p>456</p>
    <p>456</p>
    <p>456</p>
    <p>456</p>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        electricity: {
          dailyCount: 465.6,
          currentCount: 108.8,
          pastCount: 105.5,
          update: '2018-04-17 15:40',
          temperature: 48.2
        },
        electricityView: [{
          title: '电流',
          unit: 'A',
          rate: 4.48,
          min: 0,
          max: 10
        }, {
          title: '电压',
          unit: 'V',
          rate: 411,
          min: 0,
          max: 450
        }, {
          title: '功率',
          unit: 'W',
          rate: 2342,
          min: 0,
          max: 2500
        }]
      }
    },
    methods: {
      yep (rate, max) {
        return Number((rate / max * 100).toFixed(1))
      }
    }
  }
</script>

<style>
  .equip-info {
    width: 100%;
    height: 100%;
    background: #f6f6f6;
  }

  .electricity-show .equip-ele-box {
    margin-top: 14px;
    margin-bottom: 5px;
    width: 100%;
    height: 18px;
    background: url('../assets/eq-rate-icon.png') no-repeat 0 1px;
    background-size: 18px 14px;
  }

  .electricity-show .equip-ele-box ul li{
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
</style>
