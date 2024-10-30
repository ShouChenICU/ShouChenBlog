export interface Post {
  _path: string
  title: string
  description: string
  cover: string
  keywords: string[]
  category: 'tech' | 'tutorial' | 'daily' | 'resource' | 'other'
  updateAt: string
  draft?: boolean
}
