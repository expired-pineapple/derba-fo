import axiosIns from "@/plugins/axios"

const vehicleModule = {
  namespaced: false,
  state: {
    isLoading: false,
    assignedTrucks: [],
    driverAssignedTrucks: [],
    fleet: {},
    fleets: [],
    trucks: [],
    truck: {},
    error: "",
    trip: {},
    trips: [],
    trailers: [],
    trailer: {},
  },
  mutations: {
    // Mutation to set the loading state
    setLoading(state, isLoading) {
      state.isLoading = isLoading
    },

    // Mutation to set the error message
    setError(state, error) {
      state.error = error
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
    setAssignedTrucks(state, trucks) {
      state.assignedTrucks = trucks
    },

    // Mutation to set the assigned trucks
    setDriverAssignedTrucks(state, trucks) {
      state.driverAssignedTrucks = trucks
    },

    // Mutation to clear the error message
    clearError(state) {
      state.error = ""
    },
  },
  actions: {
    // Action to fetch the fleet list
    fetchFleets({ commit }) {
      commit("setLoading", true)
      commit("clearError")
      axiosIns.get("/fleet")
        .then(response => {
          commit("setFleets", response.data)
          console.log(response.data, "fleets")
          commit("setLoading", false)
        })
        .catch(error => {
          commit("setError", error.message)
          commit("setLoading", false)
        })
    },

    // Action to fetch a single fleet
    fetchFleet({ commit }, id) {
      commit("setLoading", true)
      commit("clearError")
      axiosIns.get(`/fleet/${id}/`)
        .then(response => {
          commit("setFleet", response.data)
          commit("setLoading", false)
        })
        .catch(error => {
          commit("setError", error.message)
          commit("setLoading", false)
        })
    },

    // Action to fetch the truck list
    fetchTrucks({ commit }) {
      commit("setLoading", true)
      commit("clearError")
      axiosIns.get("/truckList")
        .then(response => {
          commit("setTrucks", response.data)
          commit("setLoading", false)
        })
        .catch(error => {
          commit("setError", error.message)
          commit("setLoading", false)
        })
    },

    // Action to fetch a single truck
    fetchTruck({ commit }, id) {
      commit("setLoading", true)
      commit("clearError")
      axiosIns.get(`/truckDetail/${id}/`)
        .then(response => {
          commit("setTruck", response.data)
          commit("setLoading", false)
        })
        .catch(error => {
          commit("setError", error.message)
          commit("setLoading", false)
        })
    },

    // Action to fetch the trailer list
    fetchTrailers({ commit }) {
      commit("setLoading", true)
      commit("clearError")
      axiosIns.get("/trailers")
        .then(response => {
          commit("setTrailers", response.data)
          console.log(response.data, "trailers")
          commit("setLoading", false)
        })
        .catch(error => {
          commit("setError", error.message)
          commit("setLoading", false)
        })
    },

    // Action to fetch a single trailer
    fetchTrailer({ commit }, id) {
      commit("setLoading", true)
      commit("clearError")
      axiosIns.get(`/trailers/${id}/`)
        .then(response => {
          commit("setTrailer", response.data)
          commit("setLoading", false)
        })
        .catch(error => {
          commit("setError", error.message)
          commit("setLoading", false)
        })
    },

    // Action to fetch the trip list
    fetchTrips({ commit }) {
      commit("setLoading", true)
      commit("clearError")
      axiosIns.get("/trip")
        .then(response => {
          commit("setTrips", response.data)
          commit("setLoading", false)
        })
        .catch(error => {
          commit("setError", error.message)
          commit("setLoading", false)
        })
    },

    // Action to fetch a single trip
    fetchTrip({ commit }, id) {
      commit("setLoading", true)
      commit("clearError")
      axiosIns.get(`/tripDetail/${id}/`)
        .then(response => {
          commit("setTrip", response.data)
          commit("setLoading", false)
        })
        .catch(error => {
          commit("setError", error.message)
          commit("setLoading", false)
        })
    },



    // Action to fetch all trucks with fleet, driver, and trailer data and set them as assigned trucks
    fetchDriverAssignedTrucks({ commit }, driverId = null) {
      commit("setLoading", true)
      commit("clearError")

      const url = driverId
        ? `/truck?DrvId=${driverId}`
        : "/truck"

      console.log(url, "url")
  
      axiosIns.get(url)
        .then(response => {
          const trucks = response.data

          console.log(trucks, "trucks")

          
          const truckPromises = trucks.map(async truck => {
            const fleetPromise = axiosIns.get(`/fleet/${truck.FltId}/`)
            const driverPromise = truck.DrvId ? axiosIns.get(`/drivers/${truck.DrvId}/`) : Promise.resolve(null)
            const trailerPromise = axiosIns.get(`/trailers/${truck.TrlId}/`)
  
            const [fleetResponse, driverResponse, trailerResponse] = await Promise.all([fleetPromise, driverPromise, trailerPromise])

            truck.FltId = fleetResponse.data
            truck.DrvId = driverResponse ? driverResponse.data : null
            truck.TrlId = trailerResponse.data

            const conditionPromise = axiosIns.get(`/condition/${trailerResponse.data.condition}/`)
            const [conditionResponse] = await Promise.all([conditionPromise])

            truck.TrlId.condition = conditionResponse.data

            console.log(truck, "trucktruck")
            
            return truck
          })
  
          Promise.all(truckPromises)
            .then(updatedTrucks => {
              commit("setDriverAssignedTrucks", updatedTrucks)
              commit("setLoading", false)
            })
            .catch(error => {
              commit("setError", error.message)
              commit("setLoading", false)
            })
        })
        .catch(error => {
          commit("setError", error.message)
          commit("setLoading", false)
        })
    },



    // Action to create a fleet
    createFleet({ commit }, fleetData) {
      commit("setLoading", true)
      commit("clearError")
      axiosIns.post("/fleetList", fleetData)
        .then(response => {
          commit("setLoading", false)

          // Handle the created fleet response if needed
        })
        .catch(error => {
          commit("setError", error.message)
          commit("setLoading", false)
        })
    },

    // Action to update a fleet
    updateFleet({ commit }, fleetData) {
      commit("setLoading", true)
      commit("clearError")
      axiosIns.put(`/fleetDetail/${fleetData.id}/`, fleetData)
        .then(response => {
          commit("setLoading", false)

          // Handle the updated fleet response if needed
        })
        .catch(error => {
          commit("setError", error.message)
          commit("setLoading", false)
        })
    },

    // Action to delete a fleet
    deleteFleet({ commit }, id) {
      commit("setLoading", true)
      commit("clearError")
      axiosIns.delete(`/fleetDetail/${id}/`)
        .then(response => {
          commit("setLoading", false)

          // Handle the deleted fleet response if needed
        })
        .catch(error => {
          commit("setError", error.message)
          commit("setLoading", false)
        })
    },
  },
  getters: {
    isLoading: state => state.isLoading,
    assignedTrucks: state => state.assignedTrucks,
    driverAssignedTrucks: state => state.driverAssignedTrucks, 
    fleet: state => state.fleet,
    fleets: state => state.fleets,
    trucks: state => state.trucks,
    truck: state => state.truck,
    error: state => state.error,
    trip: state => state.trip,
    trips: state => state.trips,
    trailers: state => state.trailers,
    trailer: state => state.trailer,
  },
}

export default vehicleModule
