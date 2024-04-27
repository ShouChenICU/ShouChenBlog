// posts.data.js
import { createContentLoader } from 'vitepress'

export default createContentLoader('doc/**/*.md', {
  transform: (data) => {
    return data.filter((doc) => doc.frontmatter.layout != 'category')
  }
})
