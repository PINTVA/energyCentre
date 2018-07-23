<template>
  <mt-tabbar v-model="selected" fixed>
    <mt-tab-item class="tab-item" id="首页">
      <img :src="img1" slot="icon">
      首页
    </mt-tab-item>
    <mt-tab-item class="tab-item" id="报表">
      <img :src="img2" slot="icon">
      报表
    </mt-tab-item>
    <mt-tab-item class="tab-item" id="车间">
      <img :src="img3" slot="icon">
      车间
    </mt-tab-item>
    <mt-tab-item class="tab-item" id="我的">
      <img :src="img4" slot="icon">
      我的
    </mt-tab-item>
  </mt-tabbar>
</template>

<script>
export default {
  data(){
    return{
      selected: "首页",
      img1: "static/images/home-h.png",
      img2: "static/images/table.png",
      img3: "static/images/workshop.png",
      img4: "static/images/me.png"
    }
  },
  computed:{
    otherSelect(){
      return this.$store.state.selectTab
    }
  },
  watch: {
    // 监听 是否从其他的页面跳转过来的数据
    'otherSelect'(){
      this.selected = this.otherSelect
    },
    'selected': {
      handler (val, oldval){
        if(this.selected==='首页'){
          this.$router.push('/home')
          this.img1="static/images/home-h.png"
        }else{
          this.img1="static/images/home.png"
        }
        if(this.selected==='报表'){
          this.$router.push('/selfform')
          this.img2="static/images/table-h.png"
        }else{
          this.img2="static/images/table.png"
        }
        if(this.selected==='车间'){
          this.$router.push('/workshop')
          this.img3="static/images/workshop-h.png"
        }else{
          this.img3="static/images/workshop.png"
        }
        if (this.selected==='我的'){
          this.img4="static/images/me-h.png"
          this.$router.push('/me')
        }else{
          this.img4="static/images/me.png"
        }
      }
    }
  }
}
</script>

<style scoped>
  a {
    text-decoration: none;
  }

  .mint-tabbar{
    background-color: #fff;
    color: #808080;
    background-image:none;
  }

  .mint-tabbar .mint-tab-item.is-selected{
    color: #44bee6;
    background-color: #fff;
  }
</style>
