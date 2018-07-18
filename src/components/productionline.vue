<template>
  <div>
    <div class="line-panel">
      <div class="wrapper">
        <ul class="line-ul">
          <li class="line-li"><span>名称:</span>{{equipment[0].name}}</li>
          <li class="line-li"><span>分组编号:</span>{{equipment[0].group}}</li>
          <li class="line-li"><span>状态:</span>{{equipment[0].status}}</li>
          <li class="line-li"><span>利用率:</span>{{equipment[0].type}}</li>
          <li class="line-li" style="width: 100%"><span>更新时间:</span>{{equipment[0].update}}</li>
        </ul>
      </div>
    </div>
    <div class="equipment-list">
      <div class="wrapper">
        <div class="eq-title-box">
          <p class="equipment-title">设备列表</p>
        </div>
        <el-table :data="tableData" style="width: 100%;font-size: 12px;">
          <el-table-column prop="name" label="设备名称" align="center">
          </el-table-column>
          <el-table-column prop="type" label="设备类型" align="center">
          </el-table-column>
          <el-table-column prop="status" label="设备状态" align="center">
          </el-table-column>
          <el-table-column prop="rate" label="利用率" align="center">%
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        equipment: [{
          name: 'DZ-CNC加工车间',
          group: '2017001',
          status: '未连接',
          type: 0.00,
          update: '2018-03-27 15:40:00'
        }],
        tableData: [{
          name: 'DZ-CNC01',
          type: 'DZ-CNC',
          status: '未连接',
          rate: 0.00
        }, {
          name: 'DZ-CNC01',
          type: 'DZ-CNC',
          status: '未连接',
          rate: 0.00
        }, {
          name: 'DZ-CNC01',
          type: 'DZ-CNC',
          status: '未连接',
          rate: 0.00
        }, {
          name: 'DZ-CNC01',
          type: 'DZ-CNC',
          status: '未连接',
          rate: 0.00
        }, {
          name: 'DZ-CNC01',
          type: 'DZ-CNC',
          status: '未连接',
          rate: 0.00
        }, {
          name: 'DZ-CNC01',
          type: 'DZ-CNC',
          status: '未连接',
          rate: 0.00
        }]
      }
    }
  }
</script>

<style>
  .line-info .line-panel {
    margin-top: 60px;
    margin-bottom: 10px;
    width: 100%;
    background-color: #fff;
    height: 156px;
  }

  .line-info .line-panel .line-ul {
    width: 100%;
    margin-top: 10px;
    float: left;
  }

  .line-info .line-panel .line-ul .line-li {
    width: 50%;
    height: 40px;
    float: left;
    line-height: 40px;
    text-align: left;
    font-size: 12px;
    color: #808080;
    border-bottom: #e7e7e7 1px solid;
  }

  .line-info .line-panel .line-ul .line-li span {
    padding-left: 15px;
    text-align: left;
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
    margin-bottom: 5px;
    background: url('../assets/eq-list-icon.png') no-repeat 0 2px;
    background-size: 18px 14px;
    height: 18px;
  }

  .equipment-list .eq-title-box .equipment-title {
    margin-top: 14px;
    font-size: 15px;
    line-height: 18px;
    text-align: left;
    padding-left: 28px;
    color: #5a5a5a;
  }
</style>
