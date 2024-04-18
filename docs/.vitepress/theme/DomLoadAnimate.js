const options = {
  root: null, // 根元素
  rootMargin: '0px 0px -16px 0px', // 根元素的边距
  threshold: 0 // 交集比例阈值
}

const callback = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.translate = '0'
      entry.target.style.opacity = '1'
    }
  })
}

const observer = new IntersectionObserver(callback, options)

export function domLoadAnimate(app) {
  app.directive('load-animate', {
    mounted(el, binding) {
      if (el.style.transition) {
        el.style.transition +=
          ', translate 0.39s cubic-bezier(0, 0.8, 0.55, 1), opacity 0.39s cubic-bezier(0, 0.8, 0.55, 1)'
      } else {
        el.style.transition =
          'translate 0.39s cubic-bezier(0, 0.8, 0.55, 1), opacity 0.39s cubic-bezier(0, 0.8, 0.55, 1)'
      }
      el.style.opacity = '0'
      el.style.translate = '0 32px'
      observer.observe(el)
    },
    unmounted(el) {
      observer.unobserve(el)
    }
  })
}
