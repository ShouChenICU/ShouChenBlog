// 工具方法合集

/**
 * 判断当前页面是否在浏览器中
 * @returns 如果在浏览器中，返回true，否则返回flase
 */
export function isBrowser() {
  return window.matchMedia('(display-mode: browser)').matches
}

/**
 * 格式化日期
 * @param {Date} date 日期
 * @param {string} format 格式化字符串
 * @returns 格式化的日期
 */
export function formatDateTime(date, format) {
  const re = /(y+)/
  if (re.test(format)) {
    const t = re.exec(format)[1]
    format = format.replace(t, (date.getFullYear() + '').substring(4 - t.length))
  }

  const o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'H+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds() // 毫秒
  }
  for (let k in o) {
    const regx = new RegExp('(' + k + ')')
    if (regx.test(format)) {
      const t = regx.exec(format)[1]
      format = format.replace(t, t.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
    }
  }
  return format
}

export function currentTime(format) {
  if (format === undefined) {
    format = 'yyyy/MM/dd HH:mm:ss'
  }
  return formatDateTime(new Date(), format)
}

export function toISOStringWithTimezone(date) {
  function pad(number) {
    if (number < 10) {
      return '0' + number
    }
    return number
  }

  var offset = date.getTimezoneOffset()
  var offsetHours = Math.abs(offset / 60)
  var offsetMinutes = Math.abs(offset % 60)
  var timezoneOffset = (offset >= 0 ? '-' : '+') + pad(offsetHours) + ':' + pad(offsetMinutes)

  return (
    date.getFullYear() +
    '-' +
    pad(date.getMonth() + 1) +
    '-' +
    pad(date.getDate()) +
    'T' +
    pad(date.getHours()) +
    ':' +
    pad(date.getMinutes()) +
    ':' +
    pad(date.getSeconds()) +
    '.' +
    date.getMilliseconds() +
    timezoneOffset
  )
}

/**
 * 给定日期返回距今的时间偏移，超过7天返回正常日期格式化字符串
 * @param {Date} date 日期
 * @param {function} t i18n函数
 * @returns 格式化字符串
 */
export function timeAgo(
  date,
  t = (i18n, dat) =>
    dat.n + { secondsAgo: '秒前', minutesAgo: '分前', hoursAgo: '小时之前', daysAgo: '天前' }[i18n]
) {
  if (!date) {
    return ''
  }
  if (typeof date === 'string') {
    date = new Date(date)
  }
  const now = new Date()
  const diffMs = Math.abs(now - date)
  const diffSec = Math.floor(diffMs / 1000)
  const diffMin = Math.floor(diffSec / 60)
  const diffHour = Math.floor(diffMin / 60)
  const diffDay = Math.floor(diffHour / 24)

  if (diffDay <= 7) {
    if (diffDay === 0) {
      if (diffHour === 0) {
        if (diffMin === 0) {
          return t('secondsAgo', { n: diffSec })
        } else {
          return t('minutesAgo', { n: diffMin })
        }
      } else {
        return t('hoursAgo', { n: diffHour })
      }
    } else {
      return t('daysAgo', { n: diffDay })
    }
  } else {
    return formatDateTime(date, 'yyyy/MM/dd')
  }
}

/**
 * 深拷贝对象
 * @param {*} obj 对象
 * @returns 对象的拷贝
 */
export function copyObj(obj) {
  return JSON.parse(JSON.stringify(obj))
}

/**
 * 将字节格式化为人类可读的文本。
 *
 * @param bytes 字节数量。
 * @param decimals 显示的小数位数。
 *
 * @return 格式化后的字符串。
 */
export function humanFileSize(bytes, decimals = 2) {
  if (bytes == 0) return '0 字节'
  var k = 1024
  var dm = decimals || 2
  var sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  var i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

export function doDownloadFromHref(href, filename) {
  const a = document.createElement('a')
  a.style.display = 'none'
  a.href = href
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
}

/**
 * 从Blob下载
 *
 * @param {Blob} blob
 * @param {string} filename
 */
export function doDownloadFromBlob(blob, filename) {
  const objUrl = URL.createObjectURL(blob)
  doDownloadFromHref(objUrl, filename)
  URL.revokeObjectURL(objUrl)
}

/**
 * 导出数据到文件
 *
 * @param {object} data 数据
 * @param {string} filename 文件名
 */
export function exportData(data, filename) {
  doDownloadFromBlob(
    new Blob([JSON.stringify(data, null, 4)], { type: 'application/json' }),
    filename
  )
}

/**
 * 从文件导入数据
 *
 * @returns 数据对象
 */
export async function importData() {
  // if (window.showOpenFilePicker) {
  //   return JSON.parse(
  //     await (
  //       await (
  //         await window.showOpenFilePicker({ types: [{ accept: { 'application/json': [] } }] })
  //       )[0].getFile()
  //     ).text()
  //   )
  // } else {
  return JSON.parse(await (await selectFile('application/json')).text())
  // }
}

function selectFile(accept) {
  var input = document.createElement('input')
  input.type = 'file'
  input.multiple = false
  input.accept = accept
  input.style.display = 'none'

  var filePromise = new Promise(function (resolve, reject) {
    input.addEventListener('change', function () {
      var files = this.files
      if (files.length > 0) {
        resolve(files[0]) // 将选择的文件作为Promise的兑现值
      } else {
        reject('未选择任何文件')
      }
    })
  })

  document.body.appendChild(input) // 将input元素添加到页面中
  input.click() // 触发文件选择对话框
  input.remove()

  return filePromise // 返回Promise对象
}
