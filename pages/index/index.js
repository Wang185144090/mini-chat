//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    loginButtonName: "登录",
    registerButtonName: "注册"
  },
  goToLogin: function () {
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },
  goToRegister: function () {
    wx.navigateTo({
      url: '/pages/register/register',
    })
  },
  onLoad: function () {
    wx.showLoading({
      title: '加载中',
      mask: true,
      success: function () {
        wx.showToast({
          title: '加载成功'
        })
      },
      fail: function () {
        wx.showToast({
          title: '加载失败',
          image: '../../static/icon/fail_icon.png'
        })
      },
      complete: function () {
        console.log('加载结束')
      }
    }),
    setTimeout(function () {
      wx.hideLoading()
    }, 2000)
  }
})
