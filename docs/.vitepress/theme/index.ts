import Antd from 'ant-design-vue'
import DefaultTheme from 'vitepress/theme'
import Components from '../../../packages/index'
import vHighlight from '../../../packages/directives/vHighlight'
// import vTooltip from '../../../packages/directives/vTooltip.ts'
import 'ant-design-vue/dist/reset.css'
import './style/index.css'
import './custom.css'
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';

dayjs.locale('zh-cn');

export default {
  ...DefaultTheme,
  // extends: Teek,
  enhanceApp: async ({ app, router, siteData }) => {
    app.use(Antd)
    app.use(Components) // 全局注册组件库的组件
    app.directive('highlight', vHighlight)
    // app.directive('tooltip', vTooltip)
  }
}