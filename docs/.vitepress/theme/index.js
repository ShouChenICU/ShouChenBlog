// https://vitepress.dev/guide/custom-theme
import './style.css'
import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import Theme from './Theme.vue'
import { domLoadAnimate } from './DomLoadAnimate'

// /** @type {import('vitepress').Theme} */
// export default {
//   extends: DefaultTheme,
//   Layout: () => {
//     return h(DefaultTheme.Layout, null, {
//       // https://vitepress.dev/guide/extending-default-theme#layout-slots
//     })
//   },
//   enhanceApp({ app, router, siteData }) {
//     // ...
//   }
// }

export default {
  Layout: Theme,
  enhanceApp({ app, router, siteData }) {
    domLoadAnimate(app)
    // ...
  }
}
