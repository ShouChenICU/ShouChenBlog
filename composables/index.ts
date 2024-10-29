export function useNavHeight(height?: number) {
  const navHeight = useState('navHeight', () => 80)
  if (height !== undefined) {
    navHeight.value = height
  }
  return navHeight
}

export function useFooterHeight(height?: number) {
  const footerHeight = useState('footerHeight', () => 32)
  if (height !== undefined) {
    footerHeight.value = height
  }
  return footerHeight
}

export function useBgBlur(blur?: boolean) {
  const isBgBlur = useState('isBgBlur', () => false)
  if (blur !== undefined) {
    isBgBlur.value = blur
  }
  return isBgBlur
}

export function useBgUrl(imgUrl?: string) {
  const bgImgUrl = useState('bgImgUrl', () => '/bg.webp')
  if (imgUrl !== undefined) {
    bgImgUrl.value = imgUrl
  }
  return bgImgUrl
}

export function useCategory(category?: string) {
  const currentCategory = useState('currentCategory', () => 'tutorial')
  if (category !== undefined) {
    currentCategory.value = category
  }
  return currentCategory
}
