import axiosIns from "@/plugins/axios"

const vehicleModule = {
  namespaced: false,
  state: {
    isLoading: false,
    driverAssignedTrucks: [],
    fleet: {},
    fleets: [],
    fleetBolo: {},
    fleetBoloes: [],
    fleetCOMESA: {},
    fleetCOMESAs: [],
    fleetInsurance: {},
    fleetInsurances: [],
    trucks: [],
    truck: {},
    vehicleError: null,
    trip: {},
    trips: [],
    trailers: [],
    trailer: {},
    trailerBolo: {},
    trailerBoloes: [],
    trailerCOMESA: {},
    trailerCOMESAs: [],
    trailerInsurances: [],
    trailerInsurance: {},
    condition: {},
    conditions: [],
    trailerThirdParty: {},
    trailerThirdParties: [],
    fleetThirdParty: {},
    fleetThirdParties: [],
    tireProvision: {},
    tireProvisions: [],
    tireReturn: {},
    tireReturns: [],
  },
  mutations: {
    // Mutation to set the loading state
    setLoading(state, isLoading) {
      state.isLoading = isLoading
    },

    // Mutation to set the error message
    setError(state, error) {
      state.vehicleError = error
    },

    // Mutation to set the fleet list
    setFleets(state, fleets) {
      state.fleets = fleets
    },

    // Mutation to set a single fleet
    setFleet(state, fleet) {
      state.fleet = fleet
    },

    // Mutation to set the fleet COMESA list
    setFleetCOMESAs(state, fleetCOMESAs) {
      state.fleetCOMESAs = fleetCOMESAs
    },

    // Mutation to set a single fleet COMESA
    setFleetCOMESA(state, fleetCOMESA) {
      state.fleetCOMESA = fleetCOMESA
    },

    // Mutation to set the truck list
    setTrucks(state, trucks) {
      state.trucks = trucks
    },

    // Mutation to set a single truck
    setTruck(state, truck) {
      state.truck = truck
    },

    // Mutation to set the trailer list
    setTrailers(state, trailers) {
      state.trailers = trailers
    },

    // Mutation to set a single trailer
    setTrailer(state, trailer) {
      state.trailer = trailer
    },

    // Mutation to set the trailer COMESA list
    setTrailerCOMESAs(state, trailerCOMESAs) {
      state.trailerCOMESAs = trailerCOMESAs
    },

    // Mutation to set a single trailer COMESA
    setTrailerCOMESA(state, trailerCOMESA) {
      state.trailerCOMESA = trailerCOMESA
    },

    // Mutation to set the trip list
    setTrips(state, trips) {
      state.trips = trips
    },

    // Mutation to set a single trip
    setTrip(state, trip) {
      state.trip = trip
    },

    // Mutation to set the assigned trucks
    setDriverAssignedTrucks(state, trucks) {
      state.driverAssignedTrucks = trucks
    },

    // Mutation to set the condition list
    setConditions(state, conditions) {
      state.conditions = conditions
    },

    // Mutation to set a single condition
    setCondition(state, condition) {
      state.condition = condition
    },

    // Mutation to set a single Fleet Bolo

    setFleetBolo(state, fleetBolo){
      state.fleetBolo = fleetBolo
    },

    // Mutation to set Fleet Bolo List

    setFleetBoloes(state, fleetBoloes){
      state.fleetBoloes = fleetBoloes
    },
    setTrailerBoloes(state, trailerBoloes){
      state.trailerBoloes = trailerBoloes
    },

    setTrailerBolo(state, trailerBolo){
      state.trailerBolo = trailerBolo
    },

    setTrailerInsurances(state, trailerInsurances){
      state.trailerInsurances = trailerInsurances
    },

    setTrailerInsurance(state, trailerInsurance){
      state.trailerInsurance = trailerInsurance
    },
    setFleetInsurance(state, fleetInsurance){
      state.fleetInsurance = fleetInsurance
    },

    // Mutation to set Fleet Bolo List

    setFleetInsurances(state, fleetInsurances){
      state.fleetInsurances = fleetInsurances
    },

    setTrailerThirdParty(state, thirdParty){
      state.trailerThirdParty = thirdParty
    },
    setTrailerThirdParties(state, trailerThirdParties){
      state.trailerThirdParties = trailerThirdParties
    },
    setFleetThirdParty(state, fleetThirdParty){
      state.fleetThirdParty = fleetThirdParty
    },
    setFleetThirdParties(state, fleetThirdParties){
      state.fleetThirdParties = fleetThirdParties
    },
    setTireProvision(state, tireProvision){
      state.tireProvision = tireProvision
    },
    setTireProvisions(state, tireProvisions){
      state.tireProvisions = tireProvisions
    },
    setTireReturn(state, tireReturn){
      state.tireReturn = tireReturn
    },
    setTireReturns(state, tireReturns){
      state.tireReturns = tireReturns
    },

    clearTireProvision(state){
      state.tireProvision = {}
    },

    clearTireReturn(state){
      state.tireReturn = {}
    },
    
    // Mutation to clear the error message
    clearError(state) {
      state.error = ""
    },
    clearTruck(state) {
      state.truck = {}
    },
    clearTrucks(state) {
      state.trucks = []
    },
    clearFleet(state) {
      state.fleet = {}
    },
    clearTrailer(state) {
      state.trailer = {}
    },
    clearTrailers(state) {
      state.trailers = []
    },
    clearTrip(state) {
      state.trip = {}
    },
    clearTrips(state) {
      state.trips = []
    },
    clearFleetInsurance(state){
      state.fleetInsurance = {}
    },
    clearFleetBolo(state){
      state.fleetBolo = {}
    },
    clearFleetCOMESA(state){
      state.fleetCOMESA = {}
    },
    clearTrailerInsurance(state){
      state.trailerInsurance = {}
    },
    clearTrailerBolo(state){
      state.trailerBolo = {}
    },
    clearTrailerCOMESA(state){
      state.trailerCOMESA = {}
    },
    clearFleetThirdParty(state){
      state.fleetThirdParty = {}
    },
    clearTrailerThirdParty(state){
      state.trailerThirdParty={}
    }, 
  },
  actions: {

    async fetchFleets({ commit }) {
      commit("setLoading", true)

      try {
        const response = await axiosIns.get("/fleet")

        console.log(response.data)

        commit("setFleets", response.data)
        commit("setLoading", false)
      }
      catch (error) {
        commit("setError", error.message)
        commit("setLoading", false)
      }
    },


    async fetchFleet({ commit }, fleetId) {
      commit("setLoading", true)
      commit("clearError")


      try {
        const response = await axiosIns.get(`/fleet/${fleetId}`)
        
        commit("clearFleet")
        commit("setFleet", response.data)
        commit("setLoading", false)
      }
      catch (error) {
        commit("setError", error.message)
        commit("setLoading", false)
      }
    },


    async fetchTrailers({ commit }) {
      commit("setLoading", true)

      try {
        const response = await axiosIns.get("/trailers")

        console.log(response.data)

        commit("setTrailers", response.data)
        commit("setLoading", false)
      }
      catch (error) {
        commit("setError", error.message)
        commit("setLoading", false)
      }
    },

    async fetchTrailer({ commit }, trailerId) {
      commit("setLoading", true)
      commit("clearError")
      commit("clearTrailer")

      try {
        const response = await axiosIns.get(`/trailers/${trailerId}`)

        commit("setTrailer", response.data)
        commit("setLoading", false)
      }catch (error) {
        commit("setError", error.message)
        commit("setLoading", false)
      }
    },

    async fetchTrips({ commit }) {
      commit("setLoading", true)

      try {
        const response = await axiosIns.get("/trips")

        commit("setTrips", response.data)
        commit("setLoading", false)
      }catch (error) {
        commit("setError", error.message)
        commit("setLoading", false)
      }
    },

    async fetchTrip({ commit }, tripId) {
      commit("setLoading", true)

      try {
        const response = await axiosIns.get(`/trips/${tripId}`)

        commit("setTrip", response.data)
        commit("setLoading", false)
      }catch (error) {
        commit("setError", error.message)
        commit("setLoading", false)
      }
    }, 
    async fetchTrucks({ commit }) {
      commit("setLoading", true)
      commit("clearError")
    
      try {
        const response = await axiosIns.get("/truck")
        const trucks = response.data
    
        console.log(trucks, "trucks")
    
        const truckPromises = trucks.map(async truck => {
          const fleetPromise = axiosIns.get(`/fleet/${truck.FltId}/`)
          const driverPromise = truck.DrvId ? axiosIns.get(`/drivers/${truck.DrvId}/`) : Promise.resolve(null)
          const trailerPromise = axiosIns.get(`/trailers/${truck.TrlId}/`)
    
          const [fleetResponse, driverResponse, trailerResponse] = await Promise.all([
            fleetPromise,
            driverPromise,
            trailerPromise,
          ])
    
          truck.FltId = fleetResponse.data
          truck.DrvId = driverResponse ? driverResponse.data : null
          truck.TrlId = trailerResponse.data
    
          const conditionPromise = axiosIns.get(`/condition/${trailerResponse.data.condition}/`)
          const [conditionResponse] = await Promise.all([conditionPromise])
    
          truck.TrlId.condition = conditionResponse.data
    
          console.log(truck, "trucktruck")
    
          return truck
        })
    
        const updatedTrucks = await Promise.all(truckPromises)
    
        commit("setTrucks", updatedTrucks)
        console.log(updatedTrucks, "updatedTrucks")

    
        commit("setLoading", false)
      } catch (error) {
        commit("setError", error.message)
        commit("setLoading", false)
      }
    },
    async fetchTruck({ commit }, id) {
      commit("setLoading", true)
      commit("clearError")
      commit("clearTruck")

      try {
        const response = await axiosIns.get(`/truck/${id}`)
        const truck = response.data
    
        console.log(truck, "truck")
    
        const fleetPromise = axiosIns.get(`/fleet/${truck.FltId}/`)
        const driverPromise = truck.DrvId ? axiosIns.get(`/drivers/${truck.DrvId}/`) : Promise.resolve(null)
        const trailerPromise = axiosIns.get(`/trailers/${truck.TrlId}/`)

        const [fleetResponse, driverResponse, trailerResponse] = await Promise.all([
          fleetPromise,
          driverPromise,
          trailerPromise,
        ])

        truck.FltId = fleetResponse.data
        truck.DrvId = driverResponse ? driverResponse.data : null
        truck.TrlId = trailerResponse.data

        const conditionPromise = axiosIns.get(`/condition/${trailerResponse.data.condition}/`)
        const [conditionResponse] = await Promise.all([conditionPromise])

        truck.TrlId.condition = conditionResponse.data

        
        console.log(truck, "updatedTruck")
       
        commit("setTruck", truck)    
        commit("setLoading", false)
      } catch (error) {
        console.log(error)
        commit("setError", error.message)
        commit("setLoading", false)
      }
    },

    async fetchTruckOnly({ commit }, id) {
      commit("setLoading", true)
      commit("clearError")
      commit("clearTruck")

      try {
        const response = await axiosIns.get(`/truck/${id}`)
        const truck = response.data

        console.log(truck, "truck")

        commit("setTruck", truck)
      } catch (error) {
        console.log(error)
        commit("setError", error.message)
      }finally{
        commit("setLoading", false)
      }
    },
    
    async fetchDriverAssignedTrucks({ commit }, driverId) {
      commit("setLoading", true)
      commit("clearError")

      try {
        const response = await axiosIns.get(`/truck/?DrvId=${driverId}`)
        
        const trucks = response.data
    
        console.log(trucks, "trucks")
    
        const truckPromises = trucks.map(async truck => {
          const fleetPromise = axiosIns.get(`/fleet/${truck.FltId}/`)
          const driverPromise = truck.DrvId ? axiosIns.get(`/drivers/${truck.DrvId}/`) : Promise.resolve(null)
          const trailerPromise = axiosIns.get(`/trailers/${truck.TrlId}/`)
    
          const [fleetResponse, driverResponse, trailerResponse] = await Promise.all([
            fleetPromise,
            driverPromise,
            trailerPromise,
          ])
    
          truck.FltId = fleetResponse.data
          truck.DrvId = driverResponse ? driverResponse.data : null
          truck.TrlId = trailerResponse.data
    
          const conditionPromise = axiosIns.get(`/condition/${trailerResponse.data.condition}/`)
          const [conditionResponse] = await Promise.all([conditionPromise])
    
          truck.TrlId.condition = conditionResponse.data
    
          console.log(truck, "trucktruck")
    
          return truck
        })
    
        const updatedTrucks = await Promise.all(truckPromises)
    

        commit("setDriverAssignedTrucks", updatedTrucks)
    
        commit("setLoading", false)
      } catch (error) {
        commit("setError", error.message)
        commit("setLoading", false)
      }
    },

    async fetchCondition({ commit }, id) {
      commit("setLoading", true)
      commit("clearError")
    
      try {
        const response = await axiosIns.get(`/condition/${id}/`)
    
        commit("setCondition", response.data)
        commit("setLoading", false)
      } catch (error) {
        commit("setError", error.message)
        commit("setLoading", false)
      }
    },
    async fetchConditions({ commit }) {
      commit("setLoading", true)
      commit("clearError")
    
      try {
        const response = await axiosIns.get(`/condition/`)
    
        commit("setConditions", response.data)
        commit("setLoading", false)
      } catch (error) {
        commit("setError", error.message)
        commit("setLoading", false)
      }
    },

    async createTruck({ commit }, truck) {
      commit("setLoading", true)
      commit("clearError")
    
      try {
        const response = await axiosIns.post("/truck/", truck)
    
        commit("setLoading", false)

        return response.data
      } catch (error) {
        commit("setError", error.message)
        commit("setLoading", false)
      }
    },

    async updateTruck({ commit }, truck) {
      commit("setLoading", true)
      commit("clearError")
    
      try {
        const response = await axiosIns.put(`/truck/${truck.id}/`, truck)
    
        commit("setLoading", false)

        return response.data
      } catch (error) {
        commit("setError", error.message)
        commit("setLoading", false)
      }
    },

    async deleteTruck({ commit }, id) {
      commit("setLoading", true)
      commit("clearError")
    
      try {
        const response = await axiosIns.delete(`/truck/${id}/`)
    
        commit("setLoading", false)

        return response.data
      } catch (error) {
        commit("setError", error.message)
        commit("setLoading", false)
      }
    },

    async createTrailer({ commit }, trailer) {
      commit("setLoading", true)
      commit("clearError")
    
      try {
        const response = await axiosIns.post("/trailers/", trailer)
    
        commit("setLoading", false)

        return response.data
      } catch (error) {
        console.log(error, "here")
        commit("setError", error)
        commit("setLoading", false)
      }
    },
    
    async updateTrailer({ commit }, trailer) {
      commit("setLoading", true)
      commit("clearError")
    
      try {
        const response = await axiosIns.put(`/trailer/${trailer.id}/`, trailer)
    
        commit("setLoading", false)

        return response.data
      } catch (error) {
        commit("setError", error.message)
        commit("setLoading", false)
      }
    },

    async deleteTrailer({ commit }, id) {
      commit("setLoading", true)
      commit("clearError")
    
      try {
        const response = await axiosIns.delete(`/trailer/${id}/`)
    
        commit("setLoading", false)

        return response.data
      } catch (error) {
        commit("setError", error.message)
        commit("setLoading", false)
      }
    },

    async createFleet({ commit }, fleet) {
      commit("setLoading", true)
      commit("clearError")
    
      try {
        const response = await axiosIns.post("/fleet/", fleet)
    
        commit("setLoading", false)

        return response.data
      } catch (error) {
        commit("setError", error.message)
        commit("setLoading", false)
      }
    },

    async updateFleet({ commit }, fleet) {
      commit("setLoading", true)
      commit("clearError")
    
      try {
        const response = await axiosIns.put(`/fleet/${fleet.id}/`, fleet)
    
        commit("setLoading", false)

        return response.data
      } catch (error) {
        commit("setError", error.message)
        commit("setLoading", false)
      }
    },

    async deleteFleet({ commit }, id) {
      commit("setLoading", true)
      commit("clearError")

      try {
        const response = await axiosIns.delete(`/fleet/${id}/`)

        commit("setLoading", false)

        return response.data
      }
      catch (error) {
        commit("setError", error.message)
        commit("setLoading", false)
      }
    },

    async createTrip({ commit }, trip) {
      commit("setLoading", true)
      commit("clearError")
    
      try {
        const response = await axiosIns.post("/trip/", trip)
    
        commit("setLoading", false)

        return response.data
      } catch (error) {
        commit("setError", error.message)
        commit("setLoading", false)
      }
    },

    async updateTrip({ commit }, trip) {
      commit("setLoading", true)
      commit("clearError")
    
      try {
        const response = await axiosIns.put(`/trip/${trip.id}/`, trip)
    
        commit("setLoading", false)

        return response.data
      } catch (error) {
        commit("setError", error.message)
        commit("setLoading", false)
      }
    },

    async deleteTrip({ commit }, id) {
      commit("setLoading", true)
      commit("clearError")
    
      try {
        const response = await axiosIns.delete(`/trip/${id}/`)
    
        commit("setLoading", false)

        return response.data
      } catch (error) {
        commit("setError", error.message)
        commit("setLoading", false)
      }
    },

    async createCondition({ commit }, condition) {
      commit("setLoading", true)
      commit("clearError")
    
      try {
        const response = await axiosIns.post("/condition/", condition)
    
        commit("setLoading", false)

        return response.data
      } catch (error) {
        commit("setError", error.message)
        commit("setLoading", false)
      }
    },

    async updateCondition({ commit }, condition) {
      commit("setLoading", true)
      commit("clearError")
    
      try {
        const response = await axiosIns.put(`/condition/${condition.id}/`, condition)
    
        commit("setLoading", false)

        return response.data
      } catch (error) {
        commit("setError", error.message)
        commit("setLoading", false)
      } 
    },

    async deleteCondition({ commit }, id) {
      commit("setLoading", true)
      commit("clearError")
    
      try {
        const response = await axiosIns.delete(`/condition/${id}/`)
    
        commit("setLoading", false)

        return response.data
      } catch (error) {
        commit("setError", error.message)
        commit("setLoading", false) 
      }
    },
    async createFleetBolo({ commit }, fleetBolo) {
      commit("setLoading", true)
      commit("clearError")
    
      try {
        const response = await axiosIns.post("/fltbolo/", fleetBolo)
    
        commit("setLoading", false)

        return response.data
      } catch (error) {
        commit("setError", error)
        commit("setLoading", false)
      }
    },
    async updateFleetBolo({ commit }, { id, fleetBolo }) {
      commit("setLoading", true)
      commit("clearError")
    
      try {
        const response = await axiosIns.put(`/fltbolo/${id}/`, fleetBolo)
    
        commit("setLoading", false)

        return response.data
      } catch (error) {
        commit("setError", error)
        commit("setLoading", false)
      }
    },

    async deleteFleetBolo({ commit }, id) {
      commit("setLoading", true)
      commit("clearError")
    
      try {
        const response = await axiosIns.delete(`/fltbolo/${id}/`)
    
        commit("setLoading", false)

        return response.data
      } catch (error) {
        commit("setError", error)
        commit("setLoading", false)
      }
    },
    async fetchFleetBoloes({ commit }) {
      commit("setLoading", true)

      try {
        const response = await axiosIns.get("/fltbolo/")

        const fleetBoloesPromises = response.data.map(async fleetBolo => {
          const fleetPromise = axiosIns.get(`/fleet/${fleetBolo.FltId}/`)
          
          const [fleetResponse] = await Promise.all([
            fleetPromise,
          ])

          fleetBolo.FltId = fleetResponse.data

          return fleetBolo
        })

        const updatedFleetBoloes = await Promise.all(fleetBoloesPromises)


        commit("setFleetBoloes", updatedFleetBoloes)
        commit("setLoading", false)
      }
      catch (error) {
        commit("setError", error)
        commit("setLoading", false)
      }
    },
    async fetchFleetBolo({ commit }, id) {
      commit("setLoading", true)

      try {
        const response = await axiosIns.get(`/fltbolo/${id}/`)

        commit("setFleetBolo", response.data)
        commit("setLoading", false)
      }
      catch (error) {
        commit("setError", error)
        commit("setLoading", false)
      }
    },
    async fetchFleetCOMESAs({ commit }) {
      commit("setLoading", true)

      try {
        const response = await axiosIns.get("/fltcomesa/")

        const FleetCOMESAPromises = response.data.map(async FleetCOMESA => {
          const FleetPromise = axiosIns.get(`/fleet/${FleetCOMESA.FltId}/`)
          
          const [FleetResponse] = await Promise.all([
            FleetPromise,
          ])

          FleetCOMESA.FltId = FleetResponse.data

          return FleetCOMESA
        })

        const updatedFleetCOMESAs = await Promise.all(FleetCOMESAPromises)

        console.log(updatedFleetCOMESAs)

        commit("setFleetCOMESAs", updatedFleetCOMESAs)
        commit("setLoading", false)
      }
      catch (error) {
        commit("setError", error)
        commit("setLoading", false)
      }

    },
    
    async fetchFleetCOMESA({ commit }, id) {
      commit("setLoading", true)

      try {
        const response = await axiosIns.get(`/fltcomesa/${id}/`)

        commit("setFleetCOMESA", response.data)
        commit("setLoading", false)
      }
      catch (error) {
        commit("setError", error)
        commit("setLoading", false)
      }

    },

    async createFleetCOMESA({ commit }, FleetCOMESAData) {
      commit("setLoading", true)
    
      try {
        const response = await axiosIns.post("/fltcomesa/", FleetCOMESAData)
    
        commit("setFleetCOMESA", response.data)
        commit("setLoading", false)
      }
      catch (error) {
        commit("setError", error)
        commit("setLoading", false)
      }
    },
    
    async updateFleetCOMESA({ commit }, { id, FleetCOMESAData }) {
      commit("setLoading", true)
      commit("clearFleetCOMESA")
    
      try {
        await axiosIns.put(`/fltcomesa/${id}/`, FleetCOMESAData)
    
        commit("setFleetCOMESA", { id, FleetCOMESAData })
        commit("setLoading", false)
      }
      catch (error) {
        commit("setError", error)
        commit("setLoading", false)
      }
    },
    
    async deleteFleetCOMESA({ commit }, id) {
      commit("setLoading", true)
    
      try {
        await axiosIns.delete(`/fltcomesa/${id}/`)
    

        commit("setLoading", false)
      }
      catch (error) {
        commit("setError", error)
        commit("setLoading", false)
      }
    },



    async fetchTrailerBoloes({ commit }) {
      commit("setLoading", true)

      try {
        const response = await axiosIns.get("/trlbolo/")

        const trailerBoloesPromises = response.data.map(async trailerBolo => {
          const trailerPromise = axiosIns.get(`/trailers/${trailerBolo.TrlId}/`)
          
          const [trailerResponse] = await Promise.all([
            trailerPromise,
          ])

          trailerBolo.TrlId = trailerResponse.data

          return trailerBolo
        })

        const updatedTrailerBoloes = await Promise.all(trailerBoloesPromises)

        commit("setTrailerBoloes", updatedTrailerBoloes)
        commit("setLoading", false)
      }
      catch (error) {
        commit("setError", error)
        commit("setLoading", false)
      }

    },
    async fetchTrailerBolo({ commit }, id) {
      commit("setLoading", true)

      try {
        const response = await axiosIns.get(`/trlbolo/${id}/`)

        commit("setTrailerBolo", response.data)
        commit("setLoading", false)
      }
      catch (error) {
        commit("setError", error)
        commit("setLoading", false)
      }
    },

    async createTrailerBolo({ commit }, trailerBolo) {
      commit("setLoading", true)
      commit("clearError")
    
      try {
        const response = await axiosIns.post("/trlbolo/", trailerBolo)
    
        commit("setLoading", false)
        commit("setTrailerBolo", response.data)

        return response.data
      } catch (error) {
        commit("setError", error)
        commit("setLoading", false)
      }
    },

    async updateTrailerBolo({ commit }, trailerBolo ) {
      commit("setLoading", true)
      commit("clearError")
      commit("clearTrailerBolo")
    
      try {
        console.log(trailerBolo)

        const response = await axiosIns.put(`/trlbolo/${trailerBolo.id}/`, trailerBolo)
    
        commit("setLoading", false)
        commit("setTrailerBolo", response.data)
        console.log(response.data)
        
        return response.data
      } catch (error) {
        console.log(error)
        commit("setError", error)
        commit("setLoading", false)
      }
    },

    async deleteTrailerBolo({ commit }, id) {
      commit("setLoading", true)
      commit("clearError")
    
      try {
        const response = await axiosIns.delete(`/trlbolo/${id}/`)
    
        commit("setLoading", false)

        return response.data
      } catch (error) {
        commit("setError", error)
        commit("setLoading", false)
      }
    },

    async fetchTrailerCOMESAs({ commit }) {
      commit("setLoading", true)

      try {
        const response = await axiosIns.get("/trlcomesa/")

        const trailerCOMESAPromises = response.data.map(async trailerCOMESA => {
          const trailerPromise = axiosIns.get(`/trailers/${trailerCOMESA.TrlId}/`)
          
          const [trailerResponse] = await Promise.all([
            trailerPromise,
          ])

          trailerCOMESA.TrlId = trailerResponse.data

          return trailerCOMESA
        })

        const updatedTrailerCOMESAs = await Promise.all(trailerCOMESAPromises)

        console.log(updatedTrailerCOMESAs, "updatedTrailerCOMESAs")

        commit("setTrailerCOMESAs", updatedTrailerCOMESAs)
        commit("setLoading", false)
      }
      catch (error) {
        commit("setError", error)
        commit("setLoading", false)
      }

    },
    
    async fetchTrailerCOMESA({ commit }, id) {
      commit("setLoading", true)

      try {
        const response = await axiosIns.get(`/trlcomesa/${id}/`)

        commit("setTrailerCOMESA", response.data)
        commit("setLoading", false)
      }
      catch (error) {
        commit("setError", error)
        commit("setLoading", false)
      }

    },

    async createTrailerCOMESA({ commit }, trailerCOMESAData) {
      commit("setLoading", true)
      commit("clearError")

      try {
        const response = await axiosIns.post("/trlcomesa/", trailerCOMESAData)
    
        commit("setTrailerCOMESA", response.data)
        commit("setLoading", false)
      }
      catch (error) {
        commit("setError", error)
        commit("setLoading", false)
      }
    },
    
    async updateTrailerCOMESA({ commit }, trailerCOMESAData ) {
      commit("setLoading", true)
      commit("clearError")
      commit("clearTrailerCOMESA")
    
      try {
        await axiosIns.put(`/trlcomesa/${trailerCOMESAData.id}/`, trailerCOMESAData)
    
        commit("updateTrailerCOMESA", trailerCOMESAData)
        commit("setLoading", false)
      }
      catch (error) {
        commit("setError", error)
        commit("setLoading", false)
      }
    },
    
    async deleteTrailerCOMESA({ commit }, id) {
      commit("setLoading", true)
    
      try {
        await axiosIns.delete(`/trlcomesa/${id}/`)
    
        commit("deleteTrailerCOMESA", id)
        commit("setLoading", false)
      }
      catch (error) {
        commit("setError", error)
        commit("setLoading", false)
      }
    },

    async fetchTrailerInsurances({ commit }){
      commit("setLoading", true)

      try {
        const response = await axiosIns.get("/trlinsurance/")

        const trailerInsurancePromises = response.data.map(async trailerInsurance => {
          const trailerPromise = axiosIns.get(`/trailers/${trailerInsurance.TrlId}/`)
          
          const [trailerResponse] = await Promise.all([
            trailerPromise,
          ])

          trailerInsurance.TrlId = trailerResponse.data

          return trailerInsurance
        })

        const updatedTrailerInsurances = await Promise.all(trailerInsurancePromises)

        console.log(updatedTrailerInsurances, "updatedTrailerInsurances")

        commit("setTrailerInsurances", updatedTrailerInsurances)
        commit("setLoading", false)
      }
      catch (error) {
        commit("setError", error)
        commit("setLoading", false)
      }
    },

    async fetchTrailerInsurance({ commit }, id){
      commit("setLoading", true)

      try {
        const response = await axiosIns.get(`/trlinsurance/${id}`)

        console.log(response.data, "here")


        commit("setTrailerInsurance", response.data)
        commit("setLoading", false)
      }
      catch (error) {
        commit("setError", error)
        commit("setLoading", false)
      }
    },
    
    async createTrailerInsurance({ commit }, trailerInsuranceData) {
      commit("setLoading", true)
      commit("clearError")

      try {
        const response = await axiosIns.post("/trlinsurance/", trailerInsuranceData)
    
        commit("setTrailerInsurance", response.data)
        commit("setLoading", false)
      }
      catch (error) {
        commit("setError", error)
        commit("setLoading", false)
      }
    },
    
    async updateTrailerInsurance({ commit }, trailerInsurance ) {
      commit("setLoading", true)
      commit("clearError")
      commit("clearTrailerInsurance")
    
      try {
        await axiosIns.put(`/trlinsurance/${trailerInsurance.id}/`, trailerInsurance)
    
        commit("setTrailerInsurance", trailerInsurance)
        commit("setLoading", false)
      }
      catch (error) {
        commit("setError", error)
        commit("setLoading", false)
      }
    },
    
    async fetchTrailerThirdParties({ commit }) {
      commit("setLoading", true)

      try {
        const response = await axiosIns.get("/trlthirdparty/")

        const trailerThirdPartyPromises = response.data.map(async trailerThirdParty => {
          const trailerPromise = axiosIns.get(`/trailers/${trailerThirdParty.TrlId}/`)
          
          const [trailerResponse] = await Promise.all([
            trailerPromise,
          ])

          trailerThirdParty.TrlId = trailerResponse.data

          return trailerThirdParty
        })

        const updatedTrailerThirdParty = await Promise.all(trailerThirdPartyPromises)

        commit("setTrailerThirdParties", updatedTrailerThirdParty)

        console.log(updatedTrailerThirdParty, "updatedTrailerThirdParties")

        commit("setLoading", false)
      }
      catch (error) {
        commit("setError", error)
        commit("setLoading", false)
      }

    },
    
    async fetchTrailerThirdParty({ commit }, id) {
      commit("setLoading", true)

      try {
        const response = await axiosIns.get(`/trlthirdparty/${id}/`)

        commit("setTrailerThirdParty", response.data)
        commit("setLoading", false)
      }
      catch (error) {
        commit("setError", error)
        commit("setLoading", false)
      }

    },

    async createTrailerThirdParty({ commit }, data) {
      commit("setLoading", true)
      commit("clearError")

      try {
        const response = await axiosIns.post("/trlthirdparty/", data)
    
        commit("setTrailerThirdParty", response.data)
        commit("setLoading", false)
      }
      catch (error) {
        commit("setError", error)
        commit("setLoading", false)
      }
    },
    
    async updateTrailerThirdParty({ commit }, data ) {
      commit("setLoading", true)
      commit("clearError")
      commit("clearTrailerThirdParty")
    
      try {
        await axiosIns.put(`/trlthirdparty/${data.id}/`, data)
    
        commit("setTrailerThirdParty", data)
        commit("setLoading", false)
      }
      catch (error) {
        commit("setError", error)
        commit("setLoading", false)
      }
    },
    
    async deleteTrailerThirdParty({ commit }, id) {
      commit("setLoading", true)
    
      try {
        await axiosIns.delete(`/trlthirdparty/${id}/`)
    
        commit("setLoading", false)
      }
      catch (error) {
        commit("setError", error)
        commit("setLoading", false)
      }
    },

    async fetchFleetThirdParties({ commit }) {
      commit("setLoading", true)

      try {
        const response = await axiosIns.get("/fltthirdparty/")

        const fleetThirdPartyPromises = response.data.map(async fleetThirdParty => {
          const fleetPromise = axiosIns.get(`/fleet/${fleetThirdParty.FltId}/`)
          
          const [fleetResponse] = await Promise.all([
            fleetPromise,
          ])

          fleetThirdParty.FltId = fleetResponse.data

          return fleetThirdParty
        })

        const updatedFleetThirdParty = await Promise.all(fleetThirdPartyPromises)

        console.log(updatedFleetThirdParty, "updatedFleetThirdParty")

        commit("setFleetThirdParties", updatedFleetThirdParty)
        commit("setLoading", false)
      }
      catch (error) {
        commit("setError", error)
        commit("setLoading", false)
      }

    },
    
    async fetchFleetThirdParty({ commit }, id) {
      commit("setLoading", true)

      try {
        const response = await axiosIns.get(`/fltthirdparty/${id}/`)

        commit("setFleetThirdParty", response.data)
        commit("setLoading", false)
      }
      catch (error) {
        commit("setError", error)
        commit("setLoading", false)
      }

    },

    async createFleetThirdParty({ commit }, data) {
      commit("setLoading", true)
      commit("clearError")

      try {
        const response = await axiosIns.post("/fltthirdparty/", data)
    
        commit("setFleetThirdParty", response.data)
        commit("setLoading", false)
      }
      catch (error) {
        commit("setError", error)
        commit("setLoading", false)
      }
    },
    
    async updateFleetThirdParty({ commit }, data ) {
      commit("setLoading", true)
      commit("clearError")
      commit("clearFleetThirdParty")
    
      try {
        await axiosIns.put(`/fltthirdparty/${data.id}/`, data)
    
        commit("setFleetThirdParty", data)
        commit("setLoading", false)
      }
      catch (error) {
        commit("setError", error)
        commit("setLoading", false)
      }
    },
    
    async deleteFleetThirdParty({ commit }, id) {
      commit("setLoading", true)
    
      try {
        await axiosIns.delete(`/fltthirdparty/${id}/`)
    
        commit("setLoading", false)
      }
      catch (error) {
        commit("setError", error)
        commit("setLoading", false)
      }
    },
    async deleteTrailerInsurance({ commit }, id) {
      commit("setLoading", true)
    
      try {
        await axiosIns.delete(`/trlinsurance/${id}/`)
    

        commit("setLoading", false)
      }
      catch (error) {
        commit("setError", error)
        commit("setLoading", false)
      }
    },
    async fetchFleetInsurances({ commit }){
      commit("setLoading", true)
      commit("clearError")

      try {
        const response = await axiosIns.get("/fltinsurance/")

        const fleetInsurancePromises = response.data.map(async fleetInsurance => {
          const fleetPromise = axiosIns.get(`/fleet/${fleetInsurance.FltId}/`)
          
          const [fleetResponse] = await Promise.all([
            fleetPromise,
          ])

          fleetInsurance.FltId = fleetResponse.data

          return fleetInsurance
        })

        const updatedFleetInsurances = await Promise.all(fleetInsurancePromises)

        console.log(updatedFleetInsurances, "FleetInsurances")


        commit("setFleetInsurances", updatedFleetInsurances)
        commit("setLoading", false)
      }
      catch (error) {
        commit("setError", error)
        commit("setLoading", false)
      }
    },

    async fetchFleetInsurance({ commit }, id){
      commit("setLoading", true)
      commit("clearFleetInsurance")

      try {
        const response = await axiosIns.get(`/fltinsurance/${id}`)


        commit("setFleetInsurance", response.data)
        commit("setLoading", false)
      }
      catch (error) {
        commit("setError", error)
        commit("setLoading", false)
      }
    },
    
    async createFleetInsurance({ commit }, fleetInsuranceData) {
      commit("setLoading", true)
      commit("clearError")

      try {
        const response = await axiosIns.post("/fltinsurance/", fleetInsuranceData)
    
        commit("setFleetInsurance", response.data)
        commit("setLoading", false)
      }
      catch (error) {
        commit("setError", error)
        commit("setLoading", false)
      }
    },
    
    async updateFleetInsurance({ commit }, fleetInsurance ) {
      commit("setLoading", true)
      commit("clearError")
      commit("clearFleetInsurance")
    
      try {
        await axiosIns.put(`/fltinsurance/${fleetInsurance.id}/`, fleetInsurance)
    
        commit("setFleetInsurance", fleetInsurance)
        commit("setLoading", false)
      }
      catch (error) {
        commit("setError", error)
        commit("setLoading", false)
      }
    },
    
    async deleteFleetInsurance({ commit }, id) {
      commit("setLoading", true)
    
      try {
        await axiosIns.delete(`/fltinsurance/${id}/`)
    

        commit("setLoading", false)
      }
      catch (error) {
        commit("setError", error)
        commit("setLoading", false)
      }
    },
    async fetchTireProvisions({ commit }){
      commit("setLoading", true)
      commit("clearError")

      try {
        const response = await axiosIns.get("/tireprovision/")

        const tireProvisionPromises = response.data.map(async tireProvision => {
          const truckPromise = axiosIns.get(`/truck/${tireProvision.TrkId}/`)
          
          const [truckResponse] = await Promise.all([
            truckPromise,
          ])

          tireProvision.FltId = truckResponse.data

          return tireProvision
        })

        const updatedTireProvisions = await Promise.all(tireProvisionPromises)

        console.log(updatedTireProvisions, "tireProvisions")

        commit("setTireProvisions", updatedTireProvisions)

      }catch (error) {
        commit("setError", error)
        console.log(error)
        commit("setLoading", false)
      }
    },

    async fetchTireProvision({ commit }, id){
      commit("setLoading", true)
      commit("clearTireProvision")

      try {
        const response = await axiosIns.get(`/tireprovision/${id}`)

        console.log(response.data, "here")

        commit("setTireProvision", response.data)
        commit("setLoading", false)
      }
      catch (error) {
        commit("setError", error)
        console.log(error)
        commit("setLoading", false)
      }
    },
    
    async createTireProvision({ commit }, tireProvision) {
      commit("setLoading", true)
      commit("clearError")

      try {
        const response = await axiosIns.post("/tireprovision/", tireProvision)
    
        commit("setTireProvision", response.data)
        commit("setLoading", false)
      }
      catch (error) {
        commit("setError", error)
        console.log(error)
        commit("setLoading", false)
      }
    },
    
    async updateTireProvision({ commit }, tireProvision) {
      commit("setLoading", true)
      commit("clearError")
      commit("clearTireProvision")

      try {
        await axiosIns.put(`/tireprovision/${tireProvision.id}/`, tireProvision)
    
        commit("setTireProvision", tireProvision)
        commit("setLoading", false)
      }
      catch (error) {
        commit("setError", error)
        console.log(error)
        commit("setLoading", false)
      }
    },
    
    async deleteTireProvision({ commit }, id) {
      commit("setLoading", true)

      try {
        await axiosIns.delete(`/tireprovision/${id}/`)
    
        commit("setLoading", false)
      }
      catch (error) {
        commit("setError", error)
        console.log(error)
        commit("setLoading", false)
      }
    },
    async fetchTireReturns({ commit }){
      commit("setLoading", true)
      commit("clearError")

      try {
        const response = await axiosIns.get("/tirereturn/")

        const tireReturnPromises = response.data.map(async tireReturn => {
          const truckPromise = axiosIns.get(`/truck/${tireReturn.TrkId}/`)
          
          const [truckResponse] = await Promise.all([
            truckPromise,
          ])

          tireReturn.FltId = truckResponse.data

          return tireReturn
        })

        const updatedTireReturns = await Promise.all(tireReturnPromises)

        console.log(updatedTireReturns, "tireReturns")

        commit("setTireReturns", updatedTireReturns)
      }catch (error) {
        commit("setError", error)
        console.log(error)
        commit("setLoading", false)
      }
    },

    async fetchTireReturn({ commit }, id){
      commit("setLoading", true)
      commit("clearTireReturn")

      try {
        const response = await axiosIns.get(`/tirereturn/${id}`)

        console.log(response.data, "here")

        commit("setTireReturn", response.data)
        commit("setLoading", false)
      }
      catch (error) {
        commit("setError", error)
        console.log(error)
        commit("setLoading", false)
      }
    },
    
    async createTireReturn({ commit }, tireReturn) {
      commit("setLoading", true)
      commit("clearError")

      try {
        const response = await axiosIns.post("/tirereturn/", tireReturn)
    
        commit("setTireReturn", response.data)
        commit("setLoading", false)
      }
      catch (error) {
        commit("setError", error)
        console.log(error)
        commit("setLoading", false)
      }
    },
    
    async updateTireReturn({ commit }, tireReturn) {
      commit("setLoading", true)
      commit("clearError")
      commit("clearTireReturn")

      try {
        await axiosIns.put(`/tirereturn/${tireReturn.id}/`, tireReturn)
    
        commit("setTireReturn", tireReturn)
        commit("setLoading", false)
      }
      catch (error) {
        commit("setError", error)
        console.log(error)
        commit("setLoading", false)
      }
    },
    
    async deleteTireReturn({ commit }, id) {
      commit("setLoading", true)

      try {
        await axiosIns.delete(`/tirereturn/${id}/`)
    
        commit("setLoading", false)
      }
      catch (error) {
        commit("setError", error)
        console.log(error)
        commit("setLoading", false)
      }
    },
  },
  getters: {
    vehicleLoading: state => state.isLoading,
    driverAssignedTrucks: state => state.driverAssignedTrucks, 
    fleet: state => state.fleet,
    fleets: state => state.fleets,
    trucks: state => state.trucks,
    detailTruck: state => state.truck,
    vehicleError: state => state.vehicleError,
    trip: state => state.trip,
    trips: state => state.trips,
    trailers: state => state.trailers,
    trailer: state => state.trailer,
    conditions: state => state.conditions,
    condition: state => state.condition,
    fleetBolo: state => state.fleetBolo,
    fleetBoloes: state => state.fleetBoloes,
    fleetInsurance: state=> state.fleetInsurance,
    fleetInsurances: state=> state.fleetInsurances,
    trailerBoloes: state => state.trailerBoloes,
    trailerBolo: state => state.trailerBolo,
    fleetCOMESA: state => state.fleetCOMESA,
    fleetCOMESAs: state => state.fleetCOMESAs,
    trailerCOMESA: state => state.trailerCOMESA,
    trailerCOMESAs: state => state.trailerCOMESAs,
    trailerInsurances: state => state.trailerInsurances,
    trailerInsurance: state => state.trailerInsurance,
    trailerThirdParty: state => state.trailerThirdParty,
    trailerThirdParties: state => state.trailerThirdParties,
    fleetThirdParty: state => state.fleetThirdParty,
    fleetThirdParties: state => state.fleetThirdParties,
    tireProvision: state => state.tireProvision,
    tireProvisions: state => state.tireProvisions,
    tireReturn: state => state.tireReturn,
    tireReturns: state => state.tireReturns,
  },
}

export default vehicleModule
