import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import { Row, Col,Input,Button ,Table, TableColumn, Upload,} from 'element-ui'
import router from './routers/routers'
/*import axios from "axios"*/

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import store from "./store"

Vue.use(Row)
Vue.use(Col)
Vue.use(Input)
Vue.use(Button)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(MintUI)
Vue.use(Upload)
/*Vue.prototype.$http = axios*/


new Vue({
  el: '#app',
    router,
    store,
  render: h => h(App)
})
