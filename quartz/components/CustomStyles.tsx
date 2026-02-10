import { QuartzComponent, QuartzComponentConstructor } from "./types"

const CustomStyles: QuartzComponent = () => {
  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `
        /* 搜索框自定义样式 */
        .search-bar {
          background: var(--light) !important;
          border: 2px solid var(--lightgray) !important;
          border-radius: 12px !important;
          padding: 0.75rem 1.25rem !important;
          font-size: 0.95rem !important;
          transition: all 0.3s ease !important;
          width: 100% !important;
          box-sizing: border-box !important;
        }

        .search-bar:focus {
          outline: none !important;
          border-color: var(--secondary) !important;
          box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1) !important;
          background: var(--light) !important;
        }

        .search-bar::placeholder {
          color: var(--gray) !important;
          font-size: 0.9rem !important;
        }

        /* 搜索结果样式 */
        .search-layout {
          border-radius: 16px !important;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12) !important;
          border: 1px solid var(--lightgray) !important;
          overflow: hidden !important;
        }

        .search-result-item {
          padding: 1rem 1.25rem !important;
          border-radius: 0 !important;
          transition: all 0.2s ease !important;
          border-bottom: 1px solid var(--lightgray) !important;
        }

        .search-result-item:last-child {
          border-bottom: none !important;
        }

        .search-result-item:hover {
          background: var(--lightgray) !important;
          padding-left: 1.5rem !important;
        }

        /* 搜索按钮样式 */
        .search-button {
          padding: 0.75rem 1.25rem !important;
          border-radius: 12px !important;
          transition: all 0.3s ease !important;
          font-size: 0.95rem !important;
          font-weight: 500 !important;
        }

        .search-button:hover {
          transform: translateY(-2px) !important;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
        }

        /* 深色模式适配 - 搜索组件 */
        body[data-theme="dark"] .search-bar {
          background: var(--darkgray) !important;
          border-color: var(--light) !important;
          color: var(--light) !important;
        }

        body[data-theme="dark"] .search-bar:focus {
          border-color: var(--tertiary) !important;
          box-shadow: 0 0 0 4px rgba(100, 181, 246, 0.15) !important;
          background: var(--darkgray) !important;
        }

        body[data-theme="dark"] .search-bar::placeholder {
          color: var(--lightgray) !important;
        }

        body[data-theme="dark"] .search-result-item:hover {
          background: var(--light) !important;
        }

        body[data-theme="dark"] .search-layout {
          border-color: var(--light) !important;
        }

        /* 文章标题样式 */
        .article-title {
          font-size: 2.5rem !important;
          font-weight: 700 !important;
          margin-bottom: 1.5rem !important;
          color: var(--dark) !important;
          line-height: 1.2 !important;
          letter-spacing: -0.02em !important;
        }

        body[data-theme="dark"] .article-title {
          color: var(--light) !important;
        }

        /* 内容元数据样式 */
        .content-meta {
          font-size: 0.9rem !important;
          color: var(--gray) !important;
          margin-bottom: 1rem !important;
          display: flex !important;
          gap: 1rem !important;
          align-items: center !important;
          flex-wrap: wrap !important;
        }

        /* 标签样式 */
        .tags {
          display: flex !important;
          gap: 0.5rem !important;
          flex-wrap: wrap !important;
          margin-top: 1rem !important;
        }

        .tag-link {
          padding: 0.4rem 0.8rem !important;
          border-radius: 20px !important;
          font-size: 0.8rem !important;
          background: var(--lightgray) !important;
          color: var(--dark) !important;
          text-decoration: none !important;
          transition: all 0.2s ease !important;
          border: 1px solid transparent !important;
        }

        .tag-link:hover {
          background: var(--secondary) !important;
          color: var(--light) !important;
          transform: translateY(-1px) !important;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1) !important;
        }

        /* 深色模式适配 - 标签 */
        body[data-theme="dark"] .tag-link {
          background: var(--darkgray) !important;
          color: var(--light) !important;
        }

        body[data-theme="dark"] .tag-link:hover {
          background: var(--secondary) !important;
          color: var(--light) !important;
        }

        /* 响应式设计 - 中等屏幕 */
        @media (max-width: 800px) {
          .article-title {
            font-size: 2rem !important;
          }

          .search-bar {
            padding: 0.6rem 1rem !important;
            font-size: 0.9rem !important;
          }

          .search-result-item {
            padding: 0.875rem 1rem !important;
          }

          .content-meta {
            font-size: 0.85rem !important;
            gap: 0.75rem !important;
          }
        }

        /* 响应式设计 - 小屏幕 */
        @media (max-width: 640px) {
          .article-title {
            font-size: 1.85rem !important;
          }

          .search-bar {
            padding: 0.55rem 0.9rem !important;
            font-size: 0.875rem !important;
          }

          .search-result-item {
            padding: 0.8rem 0.9rem !important;
          }

          .content-meta {
            font-size: 0.825rem !important;
            gap: 0.6rem !important;
          }

          .tags {
            gap: 0.45rem !important;
          }

          .tag-link {
            padding: 0.375rem 0.75rem !important;
            font-size: 0.775rem !important;
          }
        }

        /* 响应式设计 - 超小屏幕 */
        @media (max-width: 480px) {
          .article-title {
            font-size: 1.75rem !important;
          }

          .search-bar {
            padding: 0.5rem 0.875rem !important;
            font-size: 0.85rem !important;
          }

          .search-result-item {
            padding: 0.75rem 0.875rem !important;
          }

          .content-meta {
            font-size: 0.8rem !important;
            gap: 0.5rem !important;
          }

          .tags {
            gap: 0.4rem !important;
          }

          .tag-link {
            padding: 0.35rem 0.7rem !important;
            font-size: 0.75rem !important;
          }
        }

        /* 动画效果 */
        * {
          scroll-behavior: smooth !important;
        }

        /* 代码块样式优化 */
        pre {
          border-radius: 12px !important;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1) !important;
          margin: 1.5rem 0 !important;
          padding: 1.5rem !important;
          overflow-x: auto !important;
        }

        code {
          border-radius: 6px !important;
          padding: 0.15rem 0.35rem !important;
          font-size: 0.9em !important;
        }

        /* 引用块样式优化 */
        blockquote {
          border-left: 4px solid var(--secondary) !important;
          padding: 1rem 1.5rem !important;
          margin: 1.5rem 0 !important;
          background: var(--lightgray) !important;
          border-radius: 0 12px 12px 0 !important;
          font-style: italic !important;
          color: var(--darkgray) !important;
        }

        body[data-theme="dark"] blockquote {
          background: var(--darkgray) !important;
          color: var(--lightgray) !important;
        }

        /* 链接样式优化 */
        a {
          transition: all 0.2s ease !important;
        }

        a:hover {
          opacity: 0.8 !important;
        }

        /* 排除 UserProfile 中的链接下划线 */
        .user-profile a:hover {
          text-decoration: none !important;
        }

        /* 按钮样式优化 */
        button {
          transition: all 0.2s ease !important;
        }

        button:hover {
          transform: translateY(-1px) !important;
        }

        /* 卡片样式优化 */
        .explorer,
        .graph,
        .toc {
          border-radius: 16px !important;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08) !important;
          padding: 1rem !important;
          margin-bottom: 1rem !important;
          background: var(--light) !important;
          border: 1px solid var(--lightgray) !important;
        }

        body[data-theme="dark"] .explorer,
        body[data-theme="dark"] .graph,
        body[data-theme="dark"] .toc {
          background: var(--darkgray) !important;
          border-color: var(--light) !important;
        }

        /* 图片样式优化 */
        img {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
          margin: 1rem auto;
          display: block;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }

        img:hover {
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
          transform: translateY(-2px);
        }

        /* 图片懒加载动画 */
        img:not(.loaded):not(.avatar) {
          filter: blur(2px);
        }

        img.loaded {
          filter: blur(0);
          transition: filter 0.3s ease;
        }

        /* 页脚样式优化 */
        footer {
          margin-top: 3rem !important;
          padding: 2rem 0 !important;
          border-top: 1px solid var(--lightgray) !important;
          text-align: center !important;
          color: var(--gray) !important;
          font-size: 0.9rem !important;
        }

        body[data-theme="dark"] footer {
          border-color: var(--light) !important;
        }

        /* 增强页面整体边距 */
        .page {
          max-width: 1600px; // 增加最大宽度
          margin: 0 auto;
        }

        .page > #quartz-body {
          /* 确保移动端有足够的边距 */
          @media (max-width: 479px) {
            padding: 0 1.5rem;
          }

          @media (min-width: 480px) and (max-width: 639px) {
            padding: 0 2rem;
          }

          @media (min-width: 640px) and (max-width: 799px) {
            padding: 0 2.5rem;
          }

          @media (min-width: 800px) and (max-width: 1199px) {
            padding: 0 3rem;
          }

          @media (min-width: 1200px) {
            padding: 0 3.5rem;
          }
        }

        /* 优化内容区块垂直间距 */
        .page-header {
          margin-bottom: 2rem;
        }

        .page-footer {
          margin-top: 3rem;
          padding-top: 2rem;
        }

        /* 优化段落和列表间距 */
        article p {
          margin-bottom: 1.25rem;
        }

        article ul,
        article ol {
          margin-bottom: 1.25rem;
          padding-left: 1.5rem;
        }

        /* 优化引用和代码块 */
        blockquote {
          margin: 1.5rem 0;
          padding: 1rem 1.5rem;
        }

        pre {
          margin: 1.5rem 0;
        }
      `,
      }}
    />
  )
}

export default (() => CustomStyles) satisfies QuartzComponentConstructor