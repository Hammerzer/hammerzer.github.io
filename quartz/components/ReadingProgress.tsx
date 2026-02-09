import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

const ReadingProgress: QuartzComponent = () => {
  return (
    <div class="reading-progress">
      <div class="progress-bar"></div>
    </div>
  )
}

ReadingProgress.css = `
.reading-progress {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: var(--lightgray);
  z-index: 9999;
}

.progress-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 0;
  height: 3px;
  background: var(--secondary);
  transition: width 0.2s ease;
}
`

export default (() => ReadingProgress) satisfies QuartzComponentConstructor