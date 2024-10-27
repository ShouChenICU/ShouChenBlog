/**
 * 从localStorage读取值，如果未找到并且提供了默认值，则更新localStorage并返回默认值
 * @param key 键
 * @param defVal 默认值
 * @returns 值
 */
export function getValFromLocalStorage<T>(key: string, defVal?: T): T | null {
  const val = localStorage.getItem(key)
  if (val) {
    try {
      return JSON.parse(val) as T
    } catch (e) {
      console.error(`Error parsing value for key "${key}":`, e)
    }
  }
  if (defVal !== undefined) {
    localStorage.setItem(key, JSON.stringify(defVal))
    return defVal
  }
  return null
}

/**
 * 生成随机字符串
 * @param length 长度
 * @returns 随机字符串
 */
export function genRandomString(length: number): string {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let randomString = ''
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length)
    randomString += charset.charAt(randomIndex)
  }
  return randomString
}

/**
 * 生成带有时区信息的ISO格式日期字符串
 * @param date 日期对象
 * @returns 带有时区信息的ISO格式日期字符串
 */

export function toISOStringWithTimezone(date: Date) {
  function pad(number: number) {
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
 * 格式化日期
 * @param date 日期对象
 * @param format 格式化字符串
 * @returns 格式化后的日期字符串
 */
export function formatDate(date: Date, format: string): string {
  const formatTokens: { [key: string]: () => string } = {
    YYYY: () => date.getFullYear().toString(),
    MM: () => (date.getMonth() + 1).toString().padStart(2, '0'),
    DD: () => date.getDate().toString().padStart(2, '0'),
    HH: () => date.getHours().toString().padStart(2, '0'),
    mm: () => date.getMinutes().toString().padStart(2, '0'),
    ss: () => date.getSeconds().toString().padStart(2, '0'),
    SSS: () => date.getMilliseconds().toString().padStart(3, '0')
  }
  return format.replace(/YYYY|MM|DD|HH|mm|ss|SSS/g, (match) => formatTokens[match]())
}

/**
 * 生成雪花ID
 * @returns 雪花ID
 */
export function generateSnowflakeId(): string {
  const timestamp = BigInt(Date.now())
  const workerId = BigInt(1) // 可以根据需要调整
  const datacenterId = BigInt(1) // 可以根据需要调整
  const sequence = BigInt(Math.floor(Math.random() * 4096)) // 随机序列号

  const timestampLeftShift = BigInt(22)
  const datacenterIdLeftShift = BigInt(17)
  const workerIdLeftShift = BigInt(12)

  const snowflakeId = (
    (timestamp << timestampLeftShift) |
    (datacenterId << datacenterIdLeftShift) |
    (workerId << workerIdLeftShift) |
    sequence
  ).toString()

  return snowflakeId
}

/**
 * 将图像文件转换为 WebP 格式
 * @param imgFile 要转换的图像文件，可以是 Blob 或 File 对象
 * @param quality 转换后图像的质量，范围从 0 到 1
 * @param maxSize 可选参数，图像的最大尺寸限制。如果图像宽度或高度超过此值，将按比例缩放
 * @returns 返回转换后的 WebP 格式的 Blob 对象，图像尺寸会根据 maxSize 参数等比缩放
 * @throws 如果无法创建画布上下文，则抛出错误
 */
export async function imgToWebp(
  imgFile: Blob | File,
  quality: number,
  maxSize?: number
): Promise<Blob> {
  const img = await createImageBitmap(imgFile) // 创建图像位图

  let width = img.width
  let height = img.height

  // 如果设置了最大尺寸限制，则按比例缩放
  if (maxSize && (width > maxSize || height > maxSize)) {
    if (width > height) {
      height = Math.round((height * maxSize) / width)
      width = maxSize
    } else {
      width = Math.round((width * maxSize) / height)
      height = maxSize
    }
  }

  const oc = new OffscreenCanvas(width, height) // 创建离屏画布
  const ctx = oc.getContext('2d') // 获取 2D 上下文
  if (!ctx) {
    throw new Error('Failed to create context') // 如果上下文创建失败，抛出错误
  }
  ctx.drawImage(img, 0, 0, width, height) // 将图像按新尺寸绘制到画布上
  return oc.convertToBlob({ type: 'image/webp', quality: quality }) // 将画布内容转换为 WebP 格式的 Blob
}
