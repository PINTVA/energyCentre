<template>
  <div id="#app">
    <mt-header fixed title="我的" class="header-top"></mt-header>
    <div class="user-box">
      <div class="wrapper">
        <ul>
          <li class="user-avatar">
            <img src="../assets/user-avatar.png" height="56" width="56"/>
          </li>
          <li class="user-info">
            <p class="user-name">管理员</p>
            <p class="user-account">{{account}}</p>
          </li>
        </ul>
      </div>
    </div>
    <el-button class="logout-btn" type="primary" round @click="logout">退出登录</el-button>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        account: ''
      }
    },
    created () {
      this.$store.dispatch('selectTab', '我的')
    },
    mounted () {
      this.account = localStorage.userAccount
    },
    methods: {
      logout(){
        this.$store.dispatch('userLogout')
        this.$router.push('/')
        for(var i = 0; i < 9999; i++) {
          clearInterval(i)
        }
      }
    }
  }
</script>

<style scoped>
  .lower-tab {
    display: -webkit-box;
  }

  .user-box {
    margin-top: 60px;
    width: 100%;
    height: 92px;
    background-color: #fff;
  }

  .user-box ul {
    padding-top: 18px;
  }

  .user-box ul .user-avatar {
    width: 24%;
    height: 56px;
    float: left;
  }

  .user-box ul .user-avatar img {
    float: left;
    border-radius: 100px;
  }

  .user-box ul .user-info {
    width: 76%;
    height: 56px;
    float: left;
    text-align: left;
  }

  .user-box ul .user-info .user-name {
    margin-top: 8px;
    margin-bottom: 4px;
    font-size: 15px;
    color: #5a5a5a;
  }

  .user-box ul .user-info .user-account {
    font-size: 15px;
    color: #5a5a5a;
  }

  .logout-btn {
    position: absolute;
    width: 88%;
    margin-left: -44%;
    left: 50%;
    bottom: 70px;
    color: #9b9b9b;
    background-color: #fff;
    border: none;
  }
</style>
