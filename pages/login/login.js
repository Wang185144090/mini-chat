//logins.js
import utils from '../../utils/util.js';
import userRequest from '../config/api/user.js'
Page({
  data: {
    loginButtonName: '登录'
  },
  inputAccount: function (e) {
    this.setData({
      account: e.detail.value
    });
  },
  inputPassword: function (e) {
    this.setData({
      password: e.detail.value
    });
  },
  login: function () {
    let account = this.data.account;
    let password = this.data.password;
    if(utils.isEmpty(account)){
      wx.showToast({
        title: '用户名或账号不能为空',
        icon: 'none',
        duration: 2000,
        mask: true
      })
      return;
    }
    if(utils.isEmpty(password)){
      wx.showToast({
        title: '密码不能为空',
        icon: 'none',
        duration: 2000,
        mask: true
      })
      return;
    }
    let loginData = {
      "loginName": account,
      "userPassword": password
    }
    userRequest.loginRequest(loginData).then((res) => {
      console.log(res)
      let data = res.data
        if (data.code === '200') {
          // TODO 处理成功跳转路由
          wx.showToast({
            title: data.message,
            icon: 'none',
            duration: 2000,
            mask: true
          })
        } else {
          wx.showToast({
            title: data.message,
            icon: 'none',
            duration: 2000,
            mask: true
          })
        }
    }).catch((errMsg) => {
      console.log(errMsg)
        //错误提示信息
        wx.showToast({
          title: errMsg,
          icon: "none"
        })
    });
  }
})
