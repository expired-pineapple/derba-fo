/* eslint-disable import/order */
import '@/@iconify/icons-bundle'
import App from '@/App.vue'
import vuetify from '@/plugins/vuetify'
import { loadFonts } from '@/plugins/webfontloader'
import router from '@/router'
import '@core/scss/template/index.scss'
import '@layouts/styles/index.scss'
import '@styles/styles.scss'
import { createApp } from 'vue'
import Vue3EasyDataTable from 'vue3-easy-data-table'
import 'vue3-easy-data-table/dist/style.css'
import store from './store'


loadFonts()



// Create vue app
const app = createApp(App)


// Use plugins
app.component('EasyDataTable', Vue3EasyDataTable)
app.use(router)
app.use(vuetify)
app.use(store)

// Mount vue app
app.mount('#app')
