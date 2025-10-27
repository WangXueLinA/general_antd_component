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
      { text: '组件', link: '/examples/JsonForm' },
      { text: 'js', link: '/js/object' },
      { text: 'react跟vue对比', link: 'https://wangxuelina.github.io/document/note/vue2#vue-%E5%92%8C-react-%E5%AF%B9%E6%AF%94' },
    ],
    sidebar: {
      '/examples/': [
        {
          text: '组件',
          items: [
            { text: 'JsonForm', link: '/examples/JsonForm' },
            { text: 'QueryTable', link: '/examples/QueryTable' },
            { text: 'CopyButton', link: '/examples/CopyButton' },
            { text: 'Operation', link: '/examples/Operation' }
          ]
        },
        {
          text: '指令',
          items: [
            { text: 'v-tooltip', link: '/examples/VTooltip' },
            { text: 'v-highlight', link: '/examples/VHighlight' }
          ]
        },
        {
          text: 'hook',
          items: [
            { text: 'useTemplate', link: '/examples/Template' },
          ]
        }
      ],
      '/js/': [
        {
          text: '对象',
          items: [
            { text: '动态获取属性', link: '/js/object' }
          ]
        },
      ],
      '/difference/': [
        {          
          text: '相同点',
          link: '/difference/equal',
        },
        {
          text: '不同点',
          link: '/difference/unEqual',
        }
      ]
    },
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
    // docFooter: {
    //   prev: '上一页',
    //   next: '下一页'
    // },
  },
  markdown: {
    lineNumbers: true,
  },
})
