export function useNavHeight(height?: number) {
  const navHeight = useState('navHeight', () => 32)
  if (height !== undefined) {
    navHeight.value = height
  }
  return navHeight
}
