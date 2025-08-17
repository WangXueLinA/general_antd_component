import type { App } from 'vue'

import JsonForm from './components/JsonForm/index.vue'
import QueryTable from './components/QueryTable/index.vue'

const components = {
  JsonForm,
  QueryTable
}

const obj = {
  install(app: App) {
    Object.entries(components).forEach(([name, component]) => {
      app.component(name, component)
    })
  }
}

export default obj