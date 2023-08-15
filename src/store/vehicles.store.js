import axiosIns from "@/plugins/axios"

const vehicleModule = {
  namespaced: false,
  state: {
    isLoading: false,
    driverAssignedTrucks: [],
    fleet: {},
    fleets: [],
    trucks: [],
    truck: {},
    vehicleError: null,
    trip: {},
    trips: [],
    trailers: [],
    trailer: {},
    condition: {},
    conditions: [],

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

  },
  actions: {

    async fetchFleets({ commit }) {
      commit("setLoading", true)

      try {
        const response = await axiosIns.get("/fleet")

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
  },
}

export default vehicleModule
