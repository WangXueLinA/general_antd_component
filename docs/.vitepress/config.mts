import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/general_antd_component/',
  title: "general_component",
  description: "antd vue组件的form跟table进行二次封装，支持json配置",
  themeConfig: {
    logo: '/logo.webp',
    nav: [
      { text: '首页', link: '/' },
      { text: '组件', link: '/examples/JsonForm' }
    ],
    sidebar: [
      {
        text: '组件',
        items: [
          { text: 'JsonForm', link: '/examples/JsonForm' },
          { text: 'QueryTable', link: '/examples/QueryTable' },
          { text: 'CopyButton', link: '/examples/CopyButton' },
          { text: 'Operation', link: '/examples/Operation' }
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/WangXueLinA/general_antd_component' }
    ],
    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium'
      }
    },
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 学麟'
    },
    search: {
      provider: "local",
    },
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },
  },
  markdown: {
    lineNumbers: true,
  },
})
