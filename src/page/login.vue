<template>
  <div id="#app">
    <img src="../assets/loginbg.png" height="243" width="320"/>
    <div class="input-box">
      <span class="user-icon"><i class="iconfont">&#xe622;</i></span>
      <span class="user-input-box"><input class="user-input" v-model="account" type="text"
                                          placeholder="Account/username" maxlength="28"></span>
    </div>
    <div class="input-box input-box-password">
      <span class="user-icon"><i class="iconfont">&#xe644;</i></span>
      <span class="user-input-box"><input class="user-input" v-model="password" type="password" placeholder="Password"
                                          maxlength="18"></span>
    </div>
    <el-button class="submit-btn" type="primary" round @click="login()">Sign in</el-button>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        account: null,
        password: null,
        userToken: '',
        userCompanyId: '',
        userPId: ''
      }
    },
    mounted () {
      // 起始Login页 Tabbar为hide状态
      this.$store.state.show = false
      // 起始Login页 背景颜色为#fff
      document.getElementsByTagName('body')[0].style.backgroundColor = '#fff'
    },
    methods: {
      // 输入账号密码 请求api返回token 保存到localStorage
      login () {
        var params = new URLSearchParams()
        params.append('account', this.account)
        params.append('password', this.password)
        if (this.account && this.password) {
          this.$ajax({
            method: 'post',
            url: '/api/user/login',
            // url: process.env.BASE_API + '/user/login',
            data: params
          }).then(response => {
            this.userToken = response.data.data.token
            // 获取Token之后请求设备列表索引 根据索引返回结果进行判断
            this.$ajax.get('/api/EquipmentLevel/getEquipmentPId', {
            // this.$ajax.get(process.env.BASE_API + '/EquipmentLevel/getEquipmentPId', {
              params: {
                'token': this.userToken
              }
            }).then(response => {
              let data = response.data.data
              this.userCompanyId = data.companyId
              this.userPId = data.pid
              console.log(data)
              if (this.userCompanyId === 'NUll') {
                this.$message({
                  message: '输入账号尚未绑定所属公司', type: 'error', center: true
                })
              } else {
                this.$store.dispatch('userLogin', {
                  'userToken': this.userToken,
                  'userAccount': this.account,
                  'userCompanyId': this.userCompanyId,
                  'userPId': this.userPId
                })
                this.$router.push({
                  path: 'home'
                })
              }
            }).catch(err => {
              console.log(err)
            })
          }).catch(err => {
            console.log(err)
            console.log(process.env.BASE_API)
            this.$message({
              message: '输入账号或密码错误', type: 'error', center: true
            })
          })
        } else {
          this.$message({
            message: '账号或密码不能为空', center: true
          })
        }
      }
    }
  }
</script>

<style scoped>
  .mint-tabbar {
    display: none;
  }

  .action-a {
    box-shadow: 0 4px 12px 2px rgba(30, 190, 242, 0.2);
  }

  .action-b {
    box-shadow: 0 4px 12px 2px rgba(30, 190, 242, 0.1);
  }

  .input-box {
    margin: 24px auto;
    width: 80%;
    height: 40px;
    border-radius: 100px;
    box-shadow: 0 4px 12px 2px rgba(30, 190, 242, 0.2);
  }

  .input-box-password .user-icon .iconfont {
    font-size: 19px;
    padding-left: 15px;
  }

  .user-icon {
    padding-right: 14px;
    float: left;
    line-height: 38px;
  }

  .user-input-box {
    line-height: 38px;
    float: left;
  }

  .user-input-box .user-input {
    outline: 0;
    border: 0;
    width: 200px;
  }

  .submit-btn {
    margin-top: 76px;
    border: 0;
    width: 80%;
    background-color: #44bee6;
  }

  .mint-msgbox {
    border-radius: 1em;
  }
</style>
