/**
 * 支持的哈希算法类型
 */
type HashAlgorithm = 'SHA-1' | 'SHA-256' | 'SHA-384' | 'SHA-512'

/**
 * 获取当前环境下可用的加密API实现
 * @returns 返回可用的加密API对象
 * @throws 当没有可用的加密实现时抛出错误
 */
const getCrypto = async () => {
  // 浏览器和 Cloudflare Workers 环境
  if (typeof crypto !== 'undefined' && crypto.subtle) {
    return crypto
  }

  // Node.js 环境
  if (typeof process !== 'undefined' && process.versions && process.versions.node) {
    const { webcrypto } = await import('node:crypto')
    return webcrypto
  }

  throw new Error('No crypto implementation available')
}

/**
 * 计算给定数据的哈希值
 * @param data - 要计算哈希的数据,支持 ArrayBuffer、string、Blob
 * @param algorithm - 使用的哈希算法,支持 SHA-1、SHA-256、SHA-384、SHA-512,默认为 SHA-256
 * @returns 返回十六进制格式的哈希字符串
 * @example
 * // 计算字符串的 MD5
 * const hash = await calculateHash('hello') // 返回 "5d41402abc4b2a76b9719d911017c592"
 *
 * // 计算二进制数据的 SHA-256
 * const buffer = new ArrayBuffer(8)
 * const hash = await calculateHash(buffer, 'SHA-256')
 *
 * // 计算Blob的哈希
 * const blob = new Blob(['hello'])
 * const hash = await calculateHash(blob)
 */
export async function calculateHash(
  data: ArrayBuffer | string | Blob,
  algorithm: HashAlgorithm = 'SHA-256'
): Promise<string> {
  const cryptoImpl = await getCrypto()
  let buffer: ArrayBuffer
  if (typeof data === 'string') {
    buffer = new TextEncoder().encode(data).buffer
  } else if (data instanceof Blob) {
    buffer = await data.arrayBuffer()
  } else {
    buffer = data
  }
  const hashBuffer = await cryptoImpl.subtle.digest(algorithm, buffer)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
}

/**
 * 计算文件或数据的SHA-256哈希值的前32位
 * @param data - 要计算哈希的数据
 * @returns 返回32位长度的哈希字符串
 */
export async function calcFileHash(data: ArrayBuffer | string | Blob) {
  return (await calculateHash(data, 'SHA-256')).substring(0, 32)
}

/**
 * 使用AES-GCM算法加密数据
 * @param data - 要加密的字符串数据
 * @param keyString - 加密密钥字符串
 * @returns 返回加密后的ArrayBuffer数据
 * @example
 * const encrypted = await encrypt("hello", "secretkey")
 */
export async function encrypt(data: string, keyString: string) {
  const cryptoImpl = await getCrypto()
  const encoder = new TextEncoder()

  // 首先通过 SHA-256 生成固定长度的密钥材料
  const keyHash = await calculateHash(keyString, 'SHA-256')
  const keyBytes = new Uint8Array(32) // 使用 256 位密钥
  for (let i = 0; i < 32; i++) {
    keyBytes[i] = parseInt(keyHash.slice(i * 2, i * 2 + 2), 16)
  }

  const keyMaterial = await cryptoImpl.subtle.importKey('raw', keyBytes, 'AES-GCM', false, [
    'encrypt'
  ])

  const encodedData = encoder.encode(data)

  // 这里的 iv 可以自定义为随机数组，但解密时要保持一致
  const encryptedData = await cryptoImpl.subtle.encrypt(
    { name: 'AES-GCM', iv: new Uint8Array(12) },
    keyMaterial,
    encodedData
  )
  return encryptedData
}

/**
 * 使用AES-GCM算法解密数据
 * @param encryptedData - 加密后的ArrayBuffer数据
 * @param keyString - 解密密钥字符串
 * @returns 返回解密后的字符串
 * @example
 * const decrypted = await decrypt(encryptedData, "secretkey")
 */
export async function decrypt(encryptedData: ArrayBuffer, keyString: string) {
  const cryptoImpl = await getCrypto()
  const decoder = new TextDecoder()

  // 使用相同的方法生成密钥
  const keyHash = await calculateHash(keyString, 'SHA-256')
  const keyBytes = new Uint8Array(32)
  for (let i = 0; i < 32; i++) {
    keyBytes[i] = parseInt(keyHash.slice(i * 2, i * 2 + 2), 16)
  }

  const keyMaterial = await cryptoImpl.subtle.importKey('raw', keyBytes, 'AES-GCM', false, [
    'decrypt'
  ])

  // 这里的 iv 和加密用的 iv 保持一致
  const decryptedData = await cryptoImpl.subtle.decrypt(
    { name: 'AES-GCM', iv: new Uint8Array(12) },
    keyMaterial,
    encryptedData
  )
  return decoder.decode(decryptedData)
}

/**
 * 将ArrayBuffer转换为Base64字符串
 * @param buffer - 要转换的ArrayBuffer数据
 * @returns 返回Base64编码的字符串
 * @example
 * const base64 = arrayBufferToBase64(buffer)
 */
export function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer)
  // 使用 Array.from 优化字符串拼接
  const binary = Array.from(bytes, (byte) => String.fromCharCode(byte)).join('')
  return btoa(binary)
}

/**
 * 将Base64字符串转换为ArrayBuffer
 * @param base64 - 要转换的Base64字符串
 * @returns 返回ArrayBuffer数据
 * @example
 * const buffer = base64ToArrayBuffer(base64String)
 */
export function base64ToArrayBuffer(base64: string): ArrayBuffer {
  const binaryString = atob(base64)
  // 使用 Uint8Array.from 来简化代码并提高性能
  return Uint8Array.from(binaryString, (char) => char.charCodeAt(0)).buffer
}
