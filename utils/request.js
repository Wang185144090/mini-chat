/**
 * GET请求封装
 */
const get = (url, data = {}) => {
  return request(url, data, 'GET')
}

/**
 * POST请求封装
 */
const post = (url, data = {}) => {
  return request(url, data, 'POST')
}

/**
 * 微信的request
 */
function request(url, data = {}, method = "GET") {
  var contentType = 'application/json'
  return new Promise(function(resolve, reject) {
    wx.request({
      url: url,
      data: data,
      method: method,
      header: {
        'Content-Type': contentType,
        'Authorization': 'Bearer ' + getDataByKey('token')
      },
      success: function(res) {
        console.log('===============================================================================================')
        console.log('==    接口地址：' + url)
        console.log('==    接口参数：' + JSON.stringify(data))
        console.log('==    请求类型：' + method)
        console.log("==    接口状态：" + res.statusCode);
        console.log('===============================================================================================')
        if (res.statusCode == 200) {
          //请求正常200
          //AES解密返回的数据
          var daesData = null
          try {
            //此处结合了上篇文章的AES解密，如果不需要加解密，可以自行去掉，直接使用数据 res.data。
            daesData = aes.getDAes(res.data)
            console.log('解密后的数据：' + daesData)
            daesData = JSON.parse(daesData)
            if (daesData.status) {
              //正常
              resolve(daesData.data);
            } else {
              //错误
              reject(daesData.message)
            }
          } catch (error) {
            console.log('==    数据解码失败')
            reject("数据解码失败")
          }
        } else if (res.statusCode == 401) {
          //此处验证了token的登录失效，如果不需要，可以去掉。
          //未登录，跳转登录界面
          reject("登录已过期")
          wx.showModal({
            title: '提示',
            content: '登录已过期，请立即登录，否则无法正常使用',
            success(res) {
              if (res.confirm) {
                console.log('用户点击确定')
                wx.navigateTo({
                  url: '/pages/login/login?toPageUrl=401',
                })
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        } else {
          //请求失败
          reject("请求失败：" + res.statusCode)
        }
      },
      fail: function(err) {
        //服务器连接异常
        console.log('===============================================================================================')
        console.log('==    接口地址：' + url)
        console.log('==    接口参数：' + JSON.stringify(data))
        console.log('==    请求类型：' + method)
        console.log("==    服务器连接异常")
        console.log('===============================================================================================')
        reject("服务器连接异常，请检查网络再试")
      }
    })
  });
}

export default {
  get,
  post
}
