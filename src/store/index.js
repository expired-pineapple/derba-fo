import { createStore } from 'vuex'
import auth from './auth.store'
import driverModule from './driver.store'
import FOModule from './fo.store'
import vehicleModule from './vehicles.store'

const store = createStore({
  modules: {
    driverModule,
    auth,
    vehicleModule,
    FOModule,
  },
})

export default store
