import axiosIns from "@/plugins/axios"

const FOModule = {
  namespaced: false,
  state: {
    foLoading: false,
    error: "",
    fo: {},
    fos: [],
    customers: [],
    customer: {},
    customerContacts: [],
    customerContact: {},
    routes: [],
    route: {},
    commodities: [],
    commodity: {},
  },
  mutations: {
    setLoading(state, foLoading){
      state.foLoading = foLoading
    },
    setError(state, error){
      state.error = error
    },
    setFos(state, fos){
      state.fos = fos
    },
    setFo(state, fo){
      state.fo = fo
    },
    setCustomers(state, customers){
      state.customers = customers
    },
    setCustomer(state, customer){
      state.customer = customer
    },
    setCustomerContacts(state, customerContacts){
      state.customerContacts = customerContacts
    },
    setCustomerContact(state, customerContact){
      state.customerContact = customerContact
    },
    setRoutes(state, routes){
      state.routes = routes
    },
    setRoute(state, route){
      state.route = route
    },
    setCommodities(state, commodities){
      state.commodities = commodities
    },
    setCommodity(state, commodity){
      state.commodity = commodity
    },
    clearFo(state){
      state.fo = {}
    },
    clearCustomer(state){
      state.customer = {}
    },
    clearCustomerContact(state){
      state.customerContact = {}
    },
    clearRoute(state){
      state.route = {}
    },
    clearCommodity(state){
      state.commodity = {}
    },
  },
  actions: {
    async fetchFos({ commit }, id){
      commit("setLoading", true)
      try {
        const url = id ? `/fo/${id}` : "/fo/"

        const response = await axiosIns.get(url)
        const fo = response.data

        const FOPromise = fo.map(async fo => {
          const CustomerPromise = axiosIns.get(`/customer/${fo.CustomerID}`)
          const TrpIdPromise = axiosIns.get(`/route/${fo.TrpId}`)
          const MtrIdPromise = axiosIns.get(`/commodity/${fo.MtrId}`)
          const TrkIdPromise = axiosIns.get(`/truck/${fo.TrkId}`)
          const [customer, route, commodity, truck] = await Promise.all([CustomerPromise, TrpIdPromise, MtrIdPromise, TrkIdPromise])

          fo.CustomerID = customer.data
          fo.TrpId = route.data
          fo.MtrId = commodity.data
          fo.TrkId = truck.data

          return fo
        })

        const fos = await Promise.all(FOPromise)
        if(id){
          commit("setFo", fos)
        }else{
          commit("setFos", fos)
        }
        commit("setFos", fos)
        commit("setLoading", false)
      } catch (error) {
        commit("setError", error.message)
        commit("setLoading", false)
      }
    },

    async createFo({ commit }, fo){
      commit("setLoading", true)
      try {
        const response = await axiosIns.post("/fo/", fo)
        const newFo = response.data
    
        // const CustomerPromise = axiosIns.get(`/customer/${newFo.CustomerID}`)
        // const TrpIdPromise = axiosIns.get(`/route/${newFo.TrpId}`)
        // const MtrIdPromise = axiosIns.get(`/commodity/${newFo.MtrId}`)
        // const TrkIdPromise = axiosIns.get(`/truck/${newFo.TrkId}`)
        // const [customer, route, commodity, truck] = await Promise.all([CustomerPromise, TrpIdPromise, MtrIdPromise, TrkIdPromise])
    
        // newFo.CustomerID = customer.data
        // newFo.TrpId = route.data
        // newFo.MtrId = commodity.data
        // newFo.TrkId = truck.data
    
        commit("setFo", newFo)
        commit("setLoading", false)
      } catch (error) {
        commit("setError", error.message)
        commit("setLoading", false)
      }
    },

    async updateFo({ commit }, { id, fo }){
      commit(setLoading, true)
      try {
        const response = await axiosIns.put(`/fo/${id}`, fo)
        const updatedFo = response.data
        
        commit("setFo", updatedFo)
        commit("setLoading", false)
      }
      catch (error) {
        commit("setError", error.message)
        commit("setLoading", false)
      }
    },
    
    async deleteFo({ commit }, id){
      commit("setLoading", true)
      try {
        await axiosIns.delete(`/fo/${id}`)
        commit("clearFo")
        commit("setLoading", false)
      } catch (error) {
        commit("setError", error.message)
        commit("setLoading", false)
      }
    },
    async fetchCustomers({ commit }, id){
      const response = await axiosIns.get( "/customer/")
      const customers = response.data

      if(id){
        commit("setCustomer", customers)
      }else{
        commit("setCustomers", customers)
      }
    },
    async createCustomer({ commit }, customer){
      commit("setLoading", true)
      try {
        const response = await axiosIns.post("/customer/", customer)
        const newCustomer = response.data
    
        commit("setCustomer", newCustomer)
        commit("setLoading", false)
      } catch (error) {
        console.log(error)
        commit("setError", error.message)
        commit("setLoading", false)
      }
    },

    async fetchCustomer({ commit }, id){
      commit("setLoading", true)
      commit("clearCustomer")
      try {
        const response = await axiosIns.get(`/customer/${id}`)
        const customer = response.data

        commit("setCustomer", customer)
        commit("setLoading", false)
      } catch (error) {
        commit("setError", error.message)
        commit("setLoading", false)
      }
    },

    updateCustomer: async ({ commit }, { id, customer }) => {
      commit('setLoading', true)

      try {
        const response = await axiosIns.put(`/customer/${id}/`, customer)
        const updatedCustomer = response.data

        commit('setCustomer', updatedCustomer)
        commit('setLoading', false)
      } catch (error) {
        const errorMessage = `Error updating customer: ${error.message}`

        commit('setError', errorMessage)
        commit('setLoading', false)
        throw error // Rethrow the error to propagate it to the caller
      }
    },
    
    
    async deleteCustomer({ commit }, id) {
      commit('setLoading', true)
      try {
        await axios.delete(`/customer/${id}`)
        commit('clearCustomer')
        commit('setLoading', false)
      } catch (error) {
        const errorMessage = `Error deleting customer: ${error.message}`

        commit('setError', errorMessage)
        commit('setLoading', false)
      }
    },
    async fetchCustomerContacts({ commit }, id){
      const url = id ? `/customercontact/${id}` : "/customercontact/"

      const response = await axiosIns.get(url)
      const customerContacts = response.data

      console.log(customerContacts)

      const customerContactsPromise = customerContacts.map(async customerContacts => {
        const customerPromise = axiosIns.get(`/customer/${customerContacts.customerID}`)
        const [customer] = await Promise.all([customerPromise])

        customerContacts.customerID = customer.data

        return customerContacts
      })



      if(id){
        commit("setCustomerContact", customerContacts)
      }else{
        commit("setCustomerContacts", customerContacts)
      }
    },
    async createCustomerContact({ commit }, customerContact){
      commit("setLoading", true)
      try {
        const response = await axiosIns.post("/customercontact/", customerContact)
        const newCustomerContact = response.data
    
        commit("setCustomerContact", newCustomerContact)
        commit("setLoading", false)
      } catch (error) {
        commit("setError", error.message)
        commit("setLoading", false)
      }
    },
    async updateCustomerContact({ commit }, { id, customerContact }){
      commit(setLoading, true)
      try {
        const response = await axiosIns.put(`/customercontact/${id}`, customerContact)
        const updatedCustomerContact = response.data
        
        commit("setCustomerContact", updatedCustomerContact)
        commit("setLoading", false)
      }
      catch (error) {
        commit('clearError')
        commit("setError", error.message)
        commit("setLoading", false)
      }
    },
    async deleteCustomerContact({ commit }, id){
      commit("setLoading", true)
      try {
        await axiosIns.delete(`/customercontact/${id}`)
        commit("clearCustomerContact")
        commit("setLoading", false)
      } catch (error) {
        commit("setError", error.message)
        commit("setLoading", false)
      }
    },
    async fetchRoutes({ commit }, id){
      const url = id ? `/trip/${id}` : "/trip/"

      const response = await axiosIns.get(url)
      const routes = response.data

      if(id){
        commit("setRoute", routes)
      }else{
        commit("setRoutes", routes)
      }
    },

    async createRoute({ commit }, route){
      commit("setLoading", true)
      try {
        const response = await axiosIns.post("/trip/", route)
        const newRoute = response.data
    
        commit("setRoute", newRoute)
        commit("setLoading", false)
      } catch (error) {
        commit("setError", error.message)
        commit("setLoading", false)
      }
    },

    async updateRoute({ commit }, { id, route }){
      commit(setLoading, true)
      try {
        const response = await axiosIns.put(`/trip/${id}`, route)
        const updatedRoute = response.data
        
        commit("setRoute", updatedRoute)
        commit("setLoading", false)
      }
      catch (error) {
        commit("setError", error.message)
        commit("setLoading", false)
      }
    },
    async deleteRoute({ commit }, id){
      commit("setLoading", true)
      try {
        await axiosIns.delete(`/trip/${id}`)
        commit("clearRoute")
        commit("setLoading", false)
      } catch (error) {
        commit("setError", error.message)
        commit("setLoading", false)
      }
    },
    async fetchCommodities({ commit }, id){
      const url = id ? `/bbmtrl/${id}` : "/bbmtrl/"

      const response = await axiosIns.get(url)
      const commodities = response.data

      if(id){
        commit("setCommodity", commodities)
      }else{
        commit("setCommodities", commodities)
      }
    },
    async createCommodity({ commit }, commodity){
      commit("setLoading", true)
      try {
        const response = await axiosIns.post("/bbmtrl/", commodity)
        const newCommodity = response.data
    
        commit("setCommodity", newCommodity)
        commit("setLoading", false)
      } catch (error) {
        commit("setError", error.message)
        commit("setLoading", false)
      }
    },
    async updateCommodity({ commit }, { id, commodity }){
      commit(setLoading, true)
      try {
        const response = await axiosIns.put(`/bbmtrl/${id}`, commodity)
        const updatedCommodity = response.data
        
        commit("setCommodity", updatedCommodity)
        commit("setLoading", false)
      }
      catch (error) {
        commit("setError", error.message)
        commit("setLoading", false)
      }
    },
    async deleteCommodity({ commit }, id){
      commit("setLoading", true)
      try {
        await axiosIns.delete(`/bbmtrl/${id}`)
        commit("clearCommodity")
        commit("setLoading", false)
      } catch (error) {
        commit("setError", error.message)
        commit("setLoading", false)
      }
    },
    
  },

  getters: {
    customers: state => state.customers,
    customer: state => state.customer,
    customerContacts: state => state.customerContacts,
    customerContact: state => state.customerContact,
    routes: state => state.routes,
    route: state => state.route,
    commodities: state => state.commodities,
    commodity: state => state.commodity,
    foloading: state => state.foLoading,
    error: state => state.error,
  },
}

export default FOModule
