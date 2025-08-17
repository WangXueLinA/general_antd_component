import Antd from 'ant-design-vue'
import DefaultTheme from 'vitepress/theme'
import Components from '../../../packages/index'
import 'ant-design-vue/dist/reset.css'
import './style/index.css'

export default {
  ...DefaultTheme,
  // extends: Teek,
  enhanceApp: async ({ app, router, siteData }) => {
    app.use(Antd)
    app.use(Components) // 全局注册组件库的组件
  }
}