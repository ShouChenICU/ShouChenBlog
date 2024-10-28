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
