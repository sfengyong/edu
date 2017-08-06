import Vue from 'vue'
import App from './App.vue'
import { Row, Col,Input,Button ,Table, TableColumn,} from 'element-ui'
import router from './routers/routers'

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

Vue.use(Row)
Vue.use(Col)
Vue.use(Input)
Vue.use(Button)
Vue.use(Table)
Vue.use(TableColumn)

Vue.use(MintUI)


new Vue({
  el: '#app',
    router:router,
  render: h => h(App)
})
