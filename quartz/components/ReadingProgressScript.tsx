import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

const ReadingProgressScript: QuartzComponent = () => {
  return (
    <script dangerouslySetInnerHTML={{
      __html: `
        window.addEventListener('scroll', () => {
          const scrollTop = document.documentElement.scrollTop
          const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
          const progress = (scrollTop / scrollHeight) * 100
          document.querySelector('.progress-bar')?.style.setProperty('width', progress + '%')
        })
      `
    }} />
  )
}

export default (() => ReadingProgressScript) satisfies QuartzComponentConstructor