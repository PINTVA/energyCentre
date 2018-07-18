<template>
  <div id="#app">
    <mt-header fixed title="DZ-CNC加工车间" class="header-top">
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <div class="info-panel">
      <div class="wrapper">
        <ul class="equip-ul">
          <li class="equip-li"><span>名称:</span>{{equipment[0].name}}</li>
          <li class="equip-li"><span>设备型号:</span>{{equipment[0].model}}</li>
          <li class="equip-li"><span>状态:</span>{{equipment[0].status}}</li>
          <li class="equip-li"><span>利用率:</span>{{equipment[0].type}}</li>
          <li class="equip-li" style="width: 100%"><span>更新时间:</span>{{equipment[0].update}}</li>
        </ul>
      </div>
    </div>
    <!--<div class="self-form">-->
      <!--<ul class="form-ul">-->
        <!--<li class="form-li" v-for="item in self" :key="item.title">-->
          <!--<div class="wrapper">-->
            <!--<p class="form-title">{{item.title}}:<span></span>{{item.rate}}</p>-->
            <!--<mt-progress :value="item.rate / item.max * 100" :bar-height="10"></mt-progress>-->
            <!--<div class="form-range"><span style="float: left">{{item.min}}</span><span style="float: right">{{item.max}}</span></div>-->
          <!--</div>-->
        <!--</li>-->
      <!--</ul>-->
    <!--</div>-->
    <div class="self-form">
      <ul class="form-ul">
        <li class="form-li" v-for="item in self" :key="item.title">
          <p class="form-title">{{item.title}}({{item.unit}})</p>
          <el-progress type="circle" :percentage="yep(item.rate,item.max)" color="#44bee6" :show-text="false" :width=90 :stroke-width=5></el-progress>
          <p class="form-rate">{{item.rate}}{{item.unit}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

  export default {
    data () {
      return {
        equipment: [{
          name: 'DZ-CNC加工车间',
          model: 'DZ-CNC',
          status: '未连接',
          type: 0.00,
          update: '2018-03-27 15:40:00'
        }],
        self: [{
          title: '电流',
          unit:'A',
          rate: 4.48,
          min:0,
          max:10
        },{
          title: '电压',
          unit:'V',
          rate: 411,
          min:0,
          max:450
        },{
          title: '功率',
          unit:'W',
          rate: 2342,
          min:0,
          max:2500
        },{
          title: '电量',
          unit:'KWH',
          rate: 336,
          min:0,
          max:1000
        },{
          title: '温度',
          unit:'℃',
          rate: 45.6,
          min:0,
          max:80
        },{
          title: '电功率',
          rate: 360,
          unit:'W',
          min:0,
          max:860
        }]
      }
    },
    created () {
      this.$store.dispatch('selectTab', '报表')
    },
    methods:{
      yep(rate,max){
        return Number((rate / max * 100).toFixed(1));
      }
    }
  }
</script>
<style>
  /*.lower-tab {*/
    /*display: -webkit-box;*/
  /*}*/

  .info-panel {
    margin-top: 60px;
    margin-bottom: 10px;
    width: 100%;
    background-color: #fff;
    height: 156px;
  }

  .info-panel .equip-ul {
    width: 100%;
    margin-top: 10px;
    float: left;
  }

  .info-panel .equip-ul .equip-li {
    width: 50%;
    height: 40px;
    float: left;
    line-height: 40px;
    text-align: left;
    font-size: 12px;
    color: #808080;
    border-bottom: #e7e7e7 1px solid;
  }

  .info-panel .equip-ul .equip-li span {
    padding-left: 15px;
    text-align: left;
    color: #5a5a5a;
  }

  .self-form {
    padding-bottom: 55px;
  }

  .self-form .form-ul .form-li {
    width: 33.33%;
    position: relative;
    float: left;
    margin-bottom: 10px;
    padding: 16px 0 12px 0;
    /*border-left: 1px solid #f6f6f6;*/
    /*border-right: 1px solid #f6f6f6;*/
    box-sizing: border-box;
    background-color: #fff;
  }

  .self-form .form-ul .form-li .form-title{
    margin-bottom: 10px;
    font-size: 12px;
    color: #5a5a5a;
  }

  .self-form .form-ul .form-li .form-rate {
    position: absolute;
    left: 0;
    right: 0;
    top: 60%;
    bottom: 0;
    margin: -9px auto 0 auto;
    font-size: 12px;
    color: #5a5a5a;
  }

  .self-form .form-ul .form-li .form-range span {
    font-size: 9px;
    color: #808080;
  }
</style>
