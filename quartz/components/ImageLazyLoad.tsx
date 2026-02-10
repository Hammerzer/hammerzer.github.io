import { QuartzComponent, QuartzComponentConstructor } from "./types"

const ImageLazyLoad: QuartzComponent = () => {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
        document.addEventListener('DOMContentLoaded', () => {
          const images = document.querySelectorAll('img:not(.avatar)')

          // 为所有图片添加 loaded 类，因为 CrawlLinks 插件已经添加了 loading="lazy" 属性
          images.forEach(img => {
            img.classList.add('loaded')

            // 优化移动端图片加载
            if (window.innerWidth <= 480) {
              // 对于小屏幕设备，确保图片最大宽度为100%
              img.style.maxWidth = '100%'
              img.style.height = 'auto'
            }

            // 添加淡入效果
            img.style.opacity = '0'
            img.style.transition = 'opacity 0.3s ease-in'

            // 检查图片是否已经加载完成
            if (img.complete) {
              img.style.opacity = '1'
            } else {
              // 图片加载完成后淡入
              img.addEventListener('load', () => {
                img.style.opacity = '1'
              })

              // 处理图片加载失败的情况
              img.addEventListener('error', () => {
                img.style.opacity = '1'
                console.warn('Image failed to load:', img.src)
              })
            }
          })
        })
      `,
      }}
    />
  )
}

export default (() => ImageLazyLoad) satisfies QuartzComponentConstructor
