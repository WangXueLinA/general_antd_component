import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/general_antd_component/',
  title: "general_component",
  description: "A VitePress Site",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
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
          { text: 'WangEditor', link: '/examples/WangEditor' },
          { text: 'CopyButton', link: '/examples/CopyButton' },
          { text: 'ECharts', link: '/examples/ECharts' },
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/WangXueLinA/general_antd_component' }
    ],
    lastUpdatedText: '上次更新',
  }
})
