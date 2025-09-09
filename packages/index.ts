import type { App } from 'vue'

import JsonForm from './components/JsonForm/index.vue'
import QueryTable from './components/QueryTable/index.vue'
import WangEditor from './components/WangEditor/index.vue'
import CopyButton from './components/CopyButton/index.vue'
import Echarts from './components/Echarts/index.vue'
import Operation from './components/Operation/index.vue'
import vHighlight from './directives/vHighlight'
import vTooltip from './directives/vTooltip.ts'

const components = {
  JsonForm,
  QueryTable,
  WangEditor,
  CopyButton,
  Echarts,
  Operation
}

const obj = {
  install(app: App) {
    Object.entries(components).forEach(([name, component]) => {
      app.component(name, component)
    })
    app.directive('highlight', vHighlight)
    app.directive('tooltip', vTooltip)
  }
}

export default obj