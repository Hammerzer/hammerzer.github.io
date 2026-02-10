import { QuartzComponent, QuartzComponentConstructor } from "./types"

const ImageLazyLoad: QuartzComponent = () => {
  return (
    <script dangerouslySetInnerHTML={{
      __html: `
        document.addEventListener('DOMContentLoaded', () => {
          const images = document.querySelectorAll('img:not(.avatar)')

          // 为所有图片添加 loaded 类，因为 CrawlLinks 插件已经添加了 loading="lazy" 属性
          images.forEach(img => {
            img.classList.add('loaded')
          })
        })
      `
    }} />
  )
}

export default (() => ImageLazyLoad) satisfies QuartzComponentConstructor