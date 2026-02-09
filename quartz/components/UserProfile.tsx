import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { pathToRoot } from "../util/path"

const UserProfile: QuartzComponent = ({ cfg, fileData }: QuartzComponentProps) => {
  // 从配置中读取网站名
  const siteName = cfg?.pageTitle ?? "求知小新"

  // 从 pageTitleSuffix 提取标语（去掉 " | " 前缀）
  const siteTagline = cfg?.pageTitleSuffix?.replace(/^ \| /, "") ?? "鑫果的私人知识库"

  // 获取根路径
  const baseDir = pathToRoot(fileData.slug!)

  return (
    <div class={`user-profile`}>
      <div class="profile-header">
        <div class="avatar-container">
          <a href={baseDir}>
            <img src={`${baseDir}/static/avatar.png`} alt="头像" class="avatar" />
          </a>
        </div>
        <div class="site-info">
          <div class="site-name">
            <a href={baseDir} style={{ textDecoration: 'none', color: 'inherit' }}>{siteName}</a>
          </div>
          <div class="site-tagline">{siteTagline}</div>
        </div>
      </div>
      <div class="profile-bio">
        <div class="bio-main">🚀 全栈工程师 | AI 探索者 | 独立开发者</div>
        <div class="bio-item">💻 一个喜欢折腾的程序员</div>
        <div class="bio-item">📚 记录技术学习踩坑与解决方案</div>
        <div class="bio-item">🌟 梦想：用技术创造自由的数字生活</div>
      </div>
    </div>
  )
}

UserProfile.css = `
.user-profile {
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border-radius: 16px;
  background: var(--light);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border: 1px solid var(--lightgray);
}

.user-profile:hover {
  background: var(--lightgray);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  transform: translateY(-2px);
}

.profile-header {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.avatar-container {
  flex-shrink: 0;
}

.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid var(--secondary);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
}

.avatar:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  border-color: var(--tertiary);
}

.site-info {
  flex: 1;
  text-align: left;
}

.site-name {
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--dark);
  line-height: 1.3;
  transition: color 0.3s ease;
}

.site-name:hover {
  color: var(--secondary);
}

.site-tagline {
  font-size: 0.85rem;
  color: var(--gray);
  margin-top: 0.2rem;
  transition: color 0.3s ease;
}

.site-tagline:hover {
  color: var(--tertiary);
}

.profile-bio {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.bio-main {
  font-size: 0.85rem;
  font-weight: 600;
  line-height: 1.5;
  color: var(--dark);
}

.bio-item {
  font-size: 0.78rem;
  line-height: 1.5;
  color: var(--darkgray);
  padding-left: 1rem;
  position: relative;
}

.bio-item::before {
  content: "•";
  position: absolute;
  left: 0;
  color: var(--secondary);
  font-weight: 600;
}

/* 深色模式 */
body[data-theme="dark"] .user-profile {
  background: var(--darkgray);
  border-color: var(--light);
}

body[data-theme="dark"] .user-profile:hover {
  background: var(--light);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
}

body[data-theme="dark"] .site-name {
  color: var(--light);
}

body[data-theme="dark"] .site-name:hover {
  color: var(--secondary);
}

body[data-theme="dark"] .site-tagline {
  color: var(--lightgray);
}

body[data-theme="dark"] .site-tagline:hover {
  color: var(--tertiary);
}

body[data-theme="dark"] .bio-item {
  color: var(--gray);
}

body[data-theme="dark"] .bio-main {
  color: var(--light);
}

body[data-theme="dark"] .bio-item::before {
  color: var(--secondary);
}

/* 移动端适配 */
@media (max-width: 480px) {
  .user-profile {
    padding: 1.25rem;
    margin-bottom: 1rem;
  }

  .profile-header {
    flex-direction: column;
    text-align: center;
  }

  .site-info {
    text-align: center;
  }

  .avatar {
    width: 55px;
    height: 55px;
  }

  .site-name {
    font-size: 1.4rem;
  }

  .profile-bio {
    font-size: 0.75rem;
  }

  .bio-item {
    padding-left: 0.8rem;
  }
}

/* 平板端适配 */
@media (max-width: 768px) {
  .user-profile {
    padding: 1.25rem;
  }

  .avatar {
    width: 55px;
    height: 55px;
  }

  .site-name {
    font-size: 1.4rem;
  }

  .site-tagline {
    font-size: 0.8rem;
  }
}
`

export default (() => UserProfile) satisfies QuartzComponentConstructor