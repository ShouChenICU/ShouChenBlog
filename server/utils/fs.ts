import fs from 'node:fs'
import path from 'node:path'

/**
 * 同步遍历指定目录下的所有文件，返回相对于传入目录的路径，以'/'开头。
 *
 * @param dirPath 要遍历的目录路径。
 * @param fileList 用于递归调用的内部文件列表 (可选)。
 * @returns 包含所有文件路径的数组，路径相对于dirPath，并以'/'开头。
 * @throws 如果发生错误，则抛出错误。
 */
function traverseFilesSync(dirPath: string, fileList: string[] = []): string[] {
  const fullDirPath = path.resolve(dirPath) // 获取传入目录的绝对路径

  try {
    const entries = fs.readdirSync(fullDirPath, { withFileTypes: true })
    for (const entry of entries) {
      const fullPath = path.join(fullDirPath, entry.name)
      const relativePath = path.relative(fullDirPath, fullPath) // 计算相对于传入目录的相对路径
      const normalizedPath = path.posix.normalize(`/${relativePath}`) // 规范化路径并添加前缀'/'

      if (entry.isDirectory()) {
        traverseFilesSync(fullPath, fileList) // 递归调用，使用fullPath作为新的基准目录
      } else if (entry.isFile()) {
        fileList.push(normalizedPath.replace('.md', ''))
      }
    }
    return fileList
  } catch (err: any) {
    console.error(`遍历文件时出错 (目录: ${fullDirPath}):`, err.message)
    throw new Error(`遍历文件时出错 (目录: ${fullDirPath}): ${err.message}`)
  }
}
