<template>
  <div id="#app">
    <mt-header fixed title="DZ-CNC加工车间" class="header-top">
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <div class="info-panel">
      <div class="wrapper">
        <ul class="equip-ul">
          <li class="equip-li"><span>名称:</span>{{equipment[0].name}}</li>
          <li class="equip-li"><span>分组编号:</span>{{equipment[0].group}}</li>
          <li class="equip-li"><span>状态:</span>{{equipment[0].status}}</li>
          <li class="equip-li"><span>利用率:</span>{{equipment[0].type}}</li>
          <li class="equip-li" style="width: 100%"><span>更新时间:</span>{{equipment[0].update}}</li>
        </ul>
      </div>
    </div>
    <div class="work-line">
      <ul class="line-ul">
        <li class="line-li" v-for="line in lines" :key="line.num" @click="lineVisible=true">
          <div class="wrapper">
            <div class="work-title-box">
              <p class="workshop-title">{{line.title}}</p>
            </div>
            <mt-progress :value="line.status" :bar-height="10"></mt-progress>
            <div class="status-prompt">
              <div class="status-prompt-box">
                <div style="background: #44bee6;"></div>
                <p style="display: inline">运行中</p>
                <div style="background: #e7e7e7;"></div>
                <p style="display: inline">未运行</p>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <mt-popup v-model="lineVisible" position="left" class="line-info">
      <mt-header fixed title="车间生产线" class="header-top">
        <mt-button icon="back" slot="left" @click="lineVisible=false"></mt-button>
      </mt-header>
      <productionline></productionline>
    </mt-popup>
  </div>
</template>

<script>
  import productionline from '../components/productionline'

  export default {
    data () {
      return {
        lineVisible: false,
        equipment: [{
          name: 'DZ-CNC加工车间',
          group: '2017001',
          status: '未连接',
          type: 0.00,
          update: '2018-03-27 15:40:00'
        }],
        lines: [{
          num: '2017001',
          title: '车间生产线',
          status: 100
        }, {
          num: '2017002',
          title: '车间生产线',
          status: 100
        }, {
          num: '2017003',
          title: '车间生产线',
          status: 0
        }, {
          num: '2017004',
          title: '车间生产线',
          status: 100
        }, {
          num: '2017005',
          title: '车间生产线',
          status: 100
        }, {
          num: '2017006',
          title: '车间生产线',
          status: 0
        }]
      }
    },
    created () {
      this.$store.dispatch('selectTab', '车间');
    },
    components: {
      productionline: productionline
    }
  }
</script>
<style>
  .lower-tab {
    display: -webkit-box;
  }

  .line-info {
    width: 100%;
    height: 100%;
    background: #f6f6f6;
  }

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

  .work-line {
    margin-bottom: 65px;
  }

  .work-line .line-ul .line-li {
    margin-bottom: 10px;
    padding-top: 14px;
    height: 80px;
    background-color: #fff;
  }

  .work-line .line-ul .line-li .work-title-box {
    background: url('../assets/eq-status-icon.png') no-repeat 0 2px;
    background-size: 18px 14px;
    height: 18px;
  }

  .work-line .line-ul .line-li .work-title-box .workshop-title {
    font-size: 15px;
    line-height: 18px;
    text-align: left;
    padding-left: 28px;
    color: #5a5a5a;
  }

  .work-line .line-ul .line-li .status-prompt {
    width: 100%;
    height: 20px;
  }

  .work-line .line-ul .line-li .status-prompt .status-prompt-box {
    float: left;
  }

  .work-line .line-ul .line-li .status-prompt .status-prompt-box div {
    display: inline-block;
    line-height: 20px;
    width: 8px;
    height: 8px;
  }

  .work-line .line-ul .line-li .status-prompt p {
    font-size: 11px;
    line-height: 20px;
    color: #808080;
  }
</style>
