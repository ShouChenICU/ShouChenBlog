interface Elm {
  children: Elm[]
  type: string
  value?: string
}

export function flatContent(elm: Elm): string {
  // 如果当前节点是 text 类型，返回其 value
  if (elm.type === 'text') {
    return elm.value || ''
  }

  // 如果有子节点，递归处理所有子节点
  if (elm.children && elm.children.length > 0) {
    return elm.children.map((child) => flatContent(child)).join('')
  }

  // 既不是 text 类型也没有子节点，返回空字符串
  return ''
}
