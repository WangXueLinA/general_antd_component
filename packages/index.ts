import type { App } from 'vue'

import JsonForm from './components/JsonForm/index.vue'
import QueryTable from './components/QueryTable/index.vue'
import WangEditor from './components/WangEditor/index.vue'
import CopyButton from './components/CopyButton/index.vue'
import Echarts from './components/Echarts/index.vue'

const components = {
  JsonForm,
  QueryTable,
  WangEditor,
  CopyButton,
  Echarts
}

const obj = {
  install(app: App) {
    Object.entries(components).forEach(([name, component]) => {
      app.component(name, component)
    })
  }
}

export default obj