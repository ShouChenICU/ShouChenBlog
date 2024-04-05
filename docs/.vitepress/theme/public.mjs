import { ref } from 'vue'

export const isOpenAside = ref(false)

export const navElm = ref(null)

/**
 * REM转换为PX
 * @param {*} remValue
 * @returns 返回结果
 */
export function remToPx(remValue) {
  if (typeof getComputedStyle !== 'undefined') {
    return remValue * parseFloat(getComputedStyle(document.documentElement).fontSize)
  } else {
    return remValue * 16
  }
}
