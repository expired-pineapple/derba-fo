import axiosIns from "@/plugins/axios"

const FOModule = {
  namespaced: false,
  state: {
    foLoading: false,
    foError: "",
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
    mtrcats: [],
    mtrcat: {},
    fuel: {},
    fuels: [],
    fuelStations: [],
    fuelStation: {},
    advance: {},
    advances: [],
    settlement: {},
    settlements: [],
    perdiuem: {},
    perdiuems: [],
  },
  mutations: {
    setLoading(state, foLoading){
      state.foLoading = foLoading
    },
    setError(state, foError){
      state.foError = foError
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
    setMtrcats(state, mtrcats){
      state.mtrcats = mtrcats
    },
    setMtrcat(state, mtrcat){
      state.mtrcat = mtrcat
    },
    setFuel(state, fuel){
      state.fuel = fuel
    },
    setFuels(state, fuels){
      state.fuels = fuels
    },
    setFuelStation(state, fuelStation){
      state.fuelStation = fuelStation
    },
    setFuelStations(state, fuelStations){
      state.fuelStations = fuelStations
    },
    setPerdiuem(state, perdiuem){
      state.perdiuem = perdiuem
    },
    setPerdiuems(state, perdiuems){
      state.perdiuems = perdiuems
    },
    setAdvance(state, advance){
      state.advance = advance
    },
    setAdvances(state, advances){
      state.advances = advances
    },
    setSettlement(state, settlement){
      state.settlement = settlement
    },
    setSettlements(state, settlement){
      state.settlements = settlement
    },
    clearAdvance(state){
      state.advance = {}
    },
    clearSettlement(state){
      state.settlement = {}
    },
    clearPerdiuem(state){
      state.perdiuem = {}
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
    clearMtrcat(state){
      state.mtrcat = {}
    },
    clearError(state){
      state.foError = ""
    },
    clearFuel(state){
      state.fuel = {}
    },
    clearFuelStation(state){
      state.fuelStation = {}
    },
  },
  actions: {
    async fetchFuelStations({ commit }, id){
      commit("setLoading", true)

      const url = id ? `/fuelstn/${id}` : "/fuelstn/"
      try {

        const response = await axiosIns.get(url)
        const fuelStations = response.data

        if(id){
          commit("setFuelStation", fuelStations)
        }else{
          commit("setFuelStations", fuelStations)
        }
      }
      catch (error) {
        commit("setLoading", false)
        commit("setError", error.response)
      }
    },
    async createFuelStation({ commit }, fuelStation){
      commit("setLoading", true)
      try {

        const response = await axiosIns.post('/fuelstn/', fuelStation)
        const fuelStn = response.data

        commit("setFuelStation", fuelStn)
      }
      catch (error) {
        commit("setLoading", false)
        commit("setError", error.response)
      }
    },
    async updateFuelStation({ commit }, fuelStation){
      commit("setLoading", true)
      commit("clearError")
      commit("clearFuelStation")
      try {

        const response = await axiosIns.put(`/fuelstn/${fuelStation.id}/`, fuelStation)
        const fuelStn = response.data

        commit("setFuelStation", fuelStn)
      }
      catch (error) {
        commit("setLoading", false)
        commit("setError", error.response)
      }
    },
    async deleteFuelStation({ commit }, id){
      commit("setLoading", true)
      commit("clearFuelStation")
      commit("clearError")

      try {
        await axiosIns.delete(`/fuelstn/${id}`)
      }
      catch (error) {
        commit("setLoading", false)
        commit("setError", error.response)
      }
    },

    async fetchFuels({ commit }, id){
      commit("setLoading", true)
      commit("clearFuel")
      
      const url = id ? `/fuel?FoId=${id}` : "/fuel/"
      try {

        const response = await axiosIns.get(url)
        const fuels = response.data
        if(id){
          commit("setFuel", fuels)
        }else{
          const FuelPromise = fuels.map(async fuel => {
            const FOPromise = axiosIns.get(`/fo/${fuel.FoId}`)
            const StationPromise = axiosIns.get(`/fuelStn/${fuel.fuelStationID}`)
            const [fo, Station] = await Promise.all([FOPromise, StationPromise])

            fuel.FoId = fo.data
            fuel.fuelStationID = Station.data

            return fuel
          })

          const updatedFuel = await Promise.all(FuelPromise)

          commit("setFuels", updatedFuel)
        }
         
        
      }
      catch (error) {
        commit("setLoading", false)
        commit("setError", error.response)
      }
    },
    async createFuel({ commit }, fuel){
      commit("setLoading", true)
      commit("clearError")

      try {

        const response = await axiosIns.post('/fuel/', fuel)
        const fuelData = response.data

        commit("setFuel", fuelData)
      }
      catch (error) {
        commit("setLoading", false)
        commit("setError", error.response)
      }
    },
    async updateFuel({ commit }, fuel){
      commit("setLoading", true)
      commit("clearError")
      commit("clearFuel")

      try {

        const response = await axiosIns.put(`/fuel/${fuel.id}/`, fuel)
        const fuelData = response.data

        commit("setFuel", fuelData)
      }
      catch (error) {
        commit("setLoading", false)
        commit("setError", error.response)
      }
    },
    async deleteFuel({ commit }, id){
      commit("setLoading", true)
      try {

        await axiosIns.delete(`/fuel/${id}`)

        commit("setFuel", fuel)
      }
      catch (error) {
        commit("setLoading", false)
        commit("setError", error.response)
      }
    },

    async fetchPerdiuems({ commit }, id){
      commit("setLoading", true)
      
      const url = id ? `/perdiuem?FoId=${id}` : "/perdiuem/"
      try {

        const response = await axiosIns.get(url)
        const perdiuems = response.data
        if(id){
          commit("clearPerdiuem")
          commit("setPerdiuem", perdiuems)
        }else{
          commit("setPerdiuems", perdiuems)
        }
      }
      catch (error) {
        commit("setLoading", false)
        commit("setError", error.response)
      }
    },
    async createPerdiuem({ commit }, perdiuem){
      commit("setLoading", true)
      commit("clearError")

      try {

        const response = await axiosIns.post('/perdiuem/', perdiuem)
        const perdiuemData = response.data

        commit("setPerdiuem", perdiuemData)
      }
      catch (error) {
        commit("setLoading", false)
        commit("setError", error.response)
      }
    },
    async updatePerdiuem({ commit }, perdiuem){
      commit("setLoading", true)
      commit("clearError")
      commit("clearPerdiuem")

      try {

        const response = await axiosIns.put(`/perdiuem/${perdiuem.id}/`, perdiuem)
        const perdiuemData = response.data

        commit("setPerdiuem", perdiuemData)
      }
      catch (error) {
        commit("setLoading", false)
        commit("setError", error.response)
      }
    },
    async deletePerdiuem({ commit }, id){
      commit("setLoading", true)
      try {

        await axiosIns.delete(`/perdiuem/${id}`)
        commit("setLoading", false)
      }
      catch (error) {
        commit("setLoading", false)
        commit("setError", error.response)
      }
    },
    async fetchAdvances({ commit }, id){
      commit("setLoading", true)
      
      const url = id ? `/advance?FoId=${id}` : "/advance/"
      try {

        const response = await axiosIns.get(url)
        const advances = response.data
        if(id){
          commit("clearAdvance")
          commit("setAdvance", advances)
        }else{
          const AdvancePromise = advances.map(async advance => {
            const FOPromise = axiosIns.get(`/fo/${advance.FoId}`)
            const [fo] = await Promise.all([FOPromise])

            advance.FoId = fo.data

            return advance
          })

          const updatedAdvance = await Promise.all(AdvancePromise)

          commit("setAdvances", updatedAdvance)
        }
      }
      catch (error) {
        commit("setLoading", false)
        commit("setError", error.response)
      }
    },
    async createAdvance({ commit }, advance){
      commit("setLoading", true)
      try {

        const response = await axiosIns.post('/advance/', advance)
        const advanceData = response.data

        commit("setAdvance", advanceData)
      }
      catch (error) {
        commit("setLoading", false)
        commit("setError", error.response)  
      }
    },
    async updateAdvance({ commit }, advance){
      commit("setLoading", true)
      commit("clearError")
      commit("clearAdvance")

      try {

        const response = await axiosIns.put(`/advance/${advance.id}/`, advance)
        const advanceData = response.data

        commit("setAdvance", advanceData)
      }
      catch (error) {
        commit("setLoading", false)
        commit("setError", error.response)
      }
    },
    async deleteAdvance({ commit }, id){
      commit("setLoading", true)
      try {

        await axiosIns.delete(`/advance/${id}`)

        commit("setAdvance", advance)
      }
      catch (error) {
        commit("setLoading", false)
        commit("setError", error.response)
      }
    },
    async fetchSettlements({ commit }, id) {
      commit("setLoading", true)
    
      const url = id ? `/settlement?FoId=${id}` : "/settlement/"
      try {
        const response = await axiosIns.get(url)
        const settlements = response.data
        if (id) {
          commit("clearSettlement")
          commit("setSettlement", settlements)
        } else {
          const settlementsPromise = settlements.map(async settlement => {
            const FOPromise = axiosIns.get(`/fo/${settlement.FoId}`)
            const [fo] = await Promise.all([FOPromise])
    
            settlement.FOId = fo.data
    
            return settlement
          })
    
          const modifiedSettlements = await Promise.all(settlementsPromise)
    
          commit("setSettlements", modifiedSettlements)
        }
      } catch (error) {
        commit("setLoading", false)
        commit("setError", error.response)
      }
    },
    async createSettlement({ commit }, settlement){
      commit("setLoading", true)
      try {

        const response = await axiosIns.post('/settlement/', settlement)
        const settlementData = response.data

        commit("setSettlement", settlementData)
      }
      catch (error) {
        commit("setLoading", false)
        commit("setError", error.response)
      }
    },
    async updateSettlement({ commit }, settlement){
      commit("setLoading", true)
      commit("clearError")
      commit("clearSettlement")

      try {

        const response = await axiosIns.put(`/settlement/${settlement.id}/`, settlement)
        const settlementData = response.data

        commit("setSettlement", settlementData)
      }
      catch (error) {
        commit("setLoading", false)
        commit("setError", error.response)
      }
    },
    async deleteSettlement({ commit }, id){
      commit("setLoading", true)
      try {

        await axiosIns.delete(`/settlement/${id}`)

        commit("setSettlement", settlement)
      }
      catch (error) {
        commit("setLoading", false)
        commit("setError", error.response)
      }
    },

    async fetchFos({ commit }){
      commit("setLoading", true)
      try {

        const response = await axiosIns.get("/fo/")
        const fo = response.data

        const FOPromise = fo.map(async fo => {
          const CustomerPromise = axiosIns.get(`/customer/${fo.CustomerID}`)
          const TrpIdPromise = axiosIns.get(`/trip/${fo.TrpId}`)
          const MtrIdPromise = axiosIns.get(`/bbmtrl/${fo.MtrId}`)
          const TrkIdPromise = axiosIns.get(`/truck/${fo.TrkId}`)
          const [customer, route, commodity, truck] = await Promise.all([CustomerPromise, TrpIdPromise, MtrIdPromise, TrkIdPromise])

          fo.CustomerID = customer.data
          fo.TrpId = route.data
          fo.MtrId = commodity.data
          fo.TrkId = truck.data


          return fo
        })

        const fos = await Promise.all(FOPromise)

        commit("setFos", fos)
      }
      catch (error) {
        commit("setLoading", false)
        commit("setError", error.response)
      }
    },

    async fetchFo({ commit }, id){
      commit("setLoading", true)
      try {

        const response = await axiosIns.get(`/fo/${id}/`)
        const fo = response.data
        

        commit("setFo", fo)
        commit("setLoading", false)
      } catch (error) {
        commit("setError", error.response)
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
        commit("setError", error.response)
        commit("setLoading", false)
      }
    },

    async updateFo({ commit }, { id, fo }){
      commit(setLoading, true)
      commit("clearError")

      try {
        const response = await axiosIns.put(`/fo/${id}`, fo)
        const updatedFo = response.data
        
        commit("setFo", updatedFo)
        commit("setLoading", false)
      }
      catch (error) {
        commit("setError", error.response)
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
        commit("setError", error.response)
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
      commit("clearError")

      try {
        const response = await axiosIns.post("/customer/", customer)
        const newCustomer = response.data
    
        commit("setCustomer", newCustomer)
        commit("setLoading", false)
      } catch (error) {
        commit("setError", error?.response || error)
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
        commit("setError", error.response)
        commit("setLoading", false)
      }
    },

    updateCustomer: async ({ commit }, { id, customer }) => {
      commit('setLoading', true)
      commit('clearError')

      try {
        const response = await axiosIns.put(`/customer/${id}/`, customer)
        const updatedCustomer = response.data

        commit('setCustomer', updatedCustomer)
        commit('setLoading', false)
      } catch (error) {
        const errorMessage = `Error updating customer: ${error.response}`

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
        const errorMessage = `Error deleting customer: ${error.response}`

        commit('setError', errorMessage)
        commit('setLoading', false)
      }
    },
    async fetchCustomerContacts({ commit }, id){
      const url = id ? `/customercontact/${id}` : "/customercontact/"

      const response = await axiosIns.get(url)
      const customerContacts = response.data

      const customerContactsPromise = customerContacts.map(async customerContacts => {
        const customerPromise = axiosIns.get(`/customer/${customerContacts.customer}`)
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
      commit("clearError")
      commit("setLoading", true)
      try {
        const response = await axiosIns.post("/customercontact/", customerContact)
        const newCustomerContact = response.data
    
        commit("setCustomerContact", newCustomerContact)
        commit("setLoading", false)
      } catch (error) {
        commit("setError", error.response)
        commit("setLoading", false)
      }
    },
    async updateCustomerContact({ commit }, { id, customerContact }){
      commit(setLoading, true)
      commit("clearError")

      try {
        const response = await axiosIns.put(`/customercontact/${id}`, customerContact)
        const updatedCustomerContact = response.data
        
        commit("setCustomerContact", updatedCustomerContact)
        commit("setLoading", false)
      }
      catch (error) {
        commit('clearError')
        commit("setError", error.response)
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
        commit("setError", error.response)
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
      commit("clearError")

      try {
        const response = await axiosIns.post("/trip/", route)
        const newRoute = response.data

        commit("setRoute", newRoute)
        commit("setLoading", false)
      } catch (error) {
        commit("setError", error.response)
        commit("setLoading", false)

      }
    },

    async updateRoute({ commit }, { id, route }){
      commit("setLoading", true)
      commit("clearError")

      try {
        const response = await axiosIns.put(`/trip/${id}/`, route)
        const updatedRoute = response.data
        
        commit("setRoute", updatedRoute)
        commit("setLoading", false)
      }
      catch (error) {
        commit("setError", error.response)
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
        commit("setError", error.response)
        commit("setLoading", false)
      }
    },
    async fetchCommodities({ commit }){
      try{
        const response = await axiosIns.get("/bbmtrl/")

        const bbmtrlPromise = response.data.map(async bbmtrl => {

          const mtrcatPromise = axiosIns.get(`/mtrcat/${bbmtrl.mtrCat}`)
          const [mtrcat] = await Promise.all([mtrcatPromise])

          bbmtrl.mtrCat = mtrcat.data

          return bbmtrl
        })

        const commodities = await Promise.all(bbmtrlPromise)

        commit("setCommodities", commodities)

      }catch(error){
        commit("setError", error.response)
      }

    },
    async fetchCommodity({ commit }, id){
      try{
        const response = await axiosIns.get(`/bbmtrl/${id}`)
        const commodity = response.data


        commit("setCommodity", commodity)

      }catch(error){
        commit("setError", error.response)
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
        commit("setError", error.response)
        commit("setLoading", false)
      }
    },
    async updateCommodity({ commit }, { id, commodity }){
      commit("setLoading", true)
      commit("clearError")
      commit("clearCommodity")

      try {
        const response = await axiosIns.put(`/bbmtrl/${id}`, commodity)
        const updatedCommodity = response.data
        
        commit("setCommodity", updatedCommodity)
        commit("setLoading", false)
      }
      catch (error) {
        commit("setError", error.response)
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
        commit("setError", error.response)
        commit("setLoading", false)
      }
    },

    async fetchMtrcats({ commit } ){
      try{
        const response = await axiosIns.get("/mtrcat/")
        const mtrcat = response.data

        commit("setMtrcats", mtrcat)

      }catch(error){
        commit("setError", error.response)
      }
    },


    async fetchMtrcat({ commit }, id ){
      try{
        const response = await axiosIns.get(`/mtrcat/${id}`)

        const mtrcat = response.data

        commit("setMtrcat", mtrcat)

      }catch(error){
        commit("setError", error.response)
      }
    },
    async createMtrcat({ commit }, mtrcat){
      commit("setLoading", true)
      commit("clearError")
      try {
        const response = await axiosIns.post("/mtrcat/", mtrcat)
        const newMtrcat = response.data
    
        commit("setMtrcat", newMtrcat)
        commit("setLoading", false)
      } catch (error) {
        commit("setError", error.response)
        commit("setLoading", false)
      }
    },

    async updateMtrcat({ commit }, { id, mtrcat }){
      commit(setLoading, true)
      commit("clearError")
      commit("clearMtrcat")

      try {
        const response = await axiosIns.put(`/mtrcat/${id}`, mtrcat)
        const updatedMtrcat = response.data
        
        commit("setMtrcat", updatedMtrcat)
        commit("setLoading", false)
      }
      catch (error) {
        commit("setError", error.response)
        commit("setLoading", false)
      }
    },


    async deleteMtrcat({ commit }, id){
      commit("setLoading", true)
      commit("clearMtrcat")
      commit("clearError")

      try {
        await axiosIns.delete(`/mtrcat/${id}`)
        commit("clearMtrcat")
        commit("setLoading", false)
      }
      catch (error) {
        commit("setError", error.response)
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
    foError: state => state.foError,
    fos: state => state.fos,
    fo: state => state.fo,
    mtrcats: state => state.mtrcats,
    mtrcat: state => state.mtrcat,
    fuel: state => state.fuel,
    fuels: state => state.fuels,
    fuelStation: state => state.fuelStation,
    fuelStations: state => state.fuelStations,
    advance: state => state.advance,
    advances: state => state.advances,
    settlement: state => state.settlement,
    settlements: state => state.settlements,
    perdiuem: state => state.perdiuem,
    perdiuems: state => state.perdiuems,
  },
}

export default FOModule
