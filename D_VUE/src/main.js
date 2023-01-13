import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import HighchartsVue from 'highcharts-vue'

import './assets/main.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faHouse, faFolder, faBars } from '@fortawesome/free-solid-svg-icons'

library.add([faHouse, faFolder, faBars])

const app = createApp(App)

app.use(HighchartsVue)
app.use(router)

app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
