import { defineNavbarConfig } from 'vuepress-theme-plume'

export const zhNavbar = defineNavbarConfig([
  { text: '首页', link: '/' },
  { text: '博客', link: '/blog/' },
  { text: '数据结构与算法', link: '/blog/tags/' },
  { text: '基础', link: '/blog/archives/' },
  {
    text: '基础2',
    icon: 'material-symbols:bookmarks-outline',
    items: [
      { text: '计算机网络', link: '/notes/network/', icon: '' },
      { text: '操作系统', link: '/notes/os/', icon: '' },
      { text: 'Mysql', link: '/notes/mysql/', icon: '' },
      { text: 'Redis', link: '/notes/redis/', icon: '' },
      { text: 'Linux', link: '/notes/linux/', icon: '' },
      { text: 'Go语言', link: '/notes/go/', icon: '' },
      { text: 'Kafka', link: '/notes/kafka/', icon: '' },
      { text: 'Nginx', link: '/notes/nginx/', icon: '' },
    ],
  },
  {
    text: '软技能',
    icon: 'icon-park-outline:more-three',
    items: [
      { text: '系统设计', link: '/notes/design/', icon: '' },
      { text: '分布式', link: '/notes/distributed/', icon: '' },
      { text: '面试技巧', link: '/notes/tricks/', icon: '' },
      { text: '项目', link: '/notes/projects/', icon: '' },
      { text: '设计模式', link: '/notes/pattern/', icon: '' },
    ],
  },
])

export const enNavbar = defineNavbarConfig([
  { text: 'Home', link: '/en/' },
  { text: 'Blog', link: '/en/blog/' },
  { text: 'Tags', link: '/en/blog/tags/' },
  { text: 'Archives', link: '/en/blog/archives/' },
  {
    text: 'Notes',
    items: [{ text: 'Demo', link: '/en/notes/demo/README.md' }]
  },
])

