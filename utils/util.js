/**
 * 日期转换
 * @param date 传入日期
 */
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

/**
   * 校验字符串是否为空
   * @param str 传入字符串
   */
const isEmpty = str => {
    if (str === undefined || str === 'undefined' || str === null || str === '' || str === [] || str === {} || str.isNaN) {
      return true
    }
    return false
}

/**
 * 获取字符串的长度
 * @param str 传入字符串
 */
const strLen = str => {
  let len = 0
  for (let i = 0; i < str.length; i++) {
    let c = str.charCodeAt(i)
    if ((c >= 0x0001 && c <= 0x007e) || (c >= 0xff60 && c <= 0xff9f)) {
      len++
    } else {
      len += 2
    }
  }
  return len
}

export default {
  formatTime: formatTime,
  isEmpty: isEmpty,
  strLen: strLen
}
