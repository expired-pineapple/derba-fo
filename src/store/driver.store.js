import axiosIns from '@axios'


const driverModule = {
  namespaced: false,
  state: {
    isLoading: false,
    drivers: [],
    driver: {},
    djiboutiPass: {},
    djiboutiPasses: [],
    emergencyContacts: [],
    emergencyContact: {},
    driverLicences: [],
    driverLicence: {},
    driverLeaveLogs: [],
    driverLeaveLog: {},
    driverPassport: {},
    driverPassports: [],
    infractions: [],
    infraction: {},
    infractionTypes: [],
    infractionType: {},
    createError: "",
  },
  mutations: {
    isLoading(state, status) {
      state.isLoading = status
    },
    SET_DRIVERS(state, drivers) {
      state.drivers = drivers
    },
    SET_DRIVER(state, driver) {
      state.driver = driver
    },
    SET_DRIVER_LEAVE_LOGS(state, driverLeaveLogs) {
      state.driverLeaveLogs = driverLeaveLogs
    },
    SET_DRIVER_LEAVE_LOG(state, driverLeaveLog) {
      state.driverLeaveLog = driverLeaveLog
    },
    SET_CREATE_ERROR(state, error) {
      state.createError = error
    },
    SET_EMERGENCY_CONTACT(state, emergencyContact) {
      state.emergencyContact = emergencyContact
    },
    SET_EMERGENCY_CONTACTS(state, emergencyContacts) {
      state.emergencyContacts = emergencyContacts
    },
    SET_DRIVER_LICENCES(state, driverLicences) {
      state.driverLicences = driverLicences
    },
    SET_DRIVER_LICENCE(state, driverLicence) {
      state.driverLicence = driverLicence
    },
    SET_DRIVER_PASSPORT(state, driverPassport){
      state.driverPassport = driverPassport
    },
    SET_DRIVER_PASSPORTS(state, driverPassports){
      state.driverPassports = driverPassports
    },
    SET_DJIBOUTI_PASS(state, djiboutiPass){
      state.djiboutiPass = djiboutiPass
    },
    SET_DJIBOUTI_PASSES(state, djiboutiPasses){
      state.djiboutiPasses = djiboutiPasses
    },
    SET_INFRACTIONS(state, infractions){
      state.infractions = infractions
    },
    SET_INFRACTION(state, infraction){
      state.infraction = infraction
    },
    SET_INFRACTION_TYPES(state, infractionTypes){
      state.infractionTypes = infractionTypes
    },
    SET_INFRACTION_TYPE(state, infractionType){
      state.infractionType = infractionType
    },
    clear_error (state) {
      state.createError = ""
    },
    clear_infraction(state){
      state.infraction = {}
    },
    clear_infraction_type(state){
      state.infractionType = {}
    },
    clear_driver(state){
      state.driver = {}
    },
    clear_driver_leave_log(state){
      state.driverLeaveLog = {}
    },
    clear_emergency_contact(state){
      state.emergencyContact = {}
    },
    clear_driver_licence(state){
      state.driverLicence = {}
    },
    clear_driver_passport(state){
      state.driverPassport = {}
    },
    clear_djibouti_pass(state){
      state.djiboutiPass = {}
    },


  },

  actions: {
    async fetchDrivers({ commit }) {
      try {
        commit('isLoading', true)
        commit('clear_error')

        const response = await axiosIns.get('/drivers')

        commit('SET_DRIVERS', response.data)
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching drivers:', error)
      } finally {
        commit('isLoading', false)
      }
    },
    async fetchDriver({ commit }, driverId) {
      try {
        commit('isLoading', true)
        commit('clear_driver')
        commit('clear_error')

        const response = await axiosIns.get(`/drivers/${driverId}`)

        console.log(response.data)

        commit('SET_DRIVER', response.data)
      } catch (error) {
        console.error('Error fetching driver:', error)
      } finally {
        commit('isLoading', false)
      }
    },

    async fetchEmergencyContact({ commit }, driverID){
      try {
        commit('isLoading', true)
        commit('clear_emergency_contact')
        commit('clear_error')

        const response = await axiosIns.get(`/drvery?driverID=${driverID}`)

        console.log(response.data, "eeeeee")

        commit('SET_EMERGENCY_CONTACT', response.data)
      } catch (error) {
        console.error('Error fetching:', error)
      } finally {
        commit('isLoading', false)
      }
    },

    async fetchEmergencyContacts({ commit }, driverID){
      try {
        commit('isLoading', true)
        commit('clear_emergency_contact')
        commit('clear_error')

        const response = await axiosIns.get('/drvery/')

        const emergencyPromises = response.data.map(async emergency => {
          const driverPromise = axiosIns.get(`/drivers/${emergency.driverID}/`)
          const [driverResponse] = await Promise.all([driverPromise])

          emergency.driverID = driverResponse.data

          return emergency
        })

        Promise.all(emergencyPromises)
          .then(updatedEmergency => {
            commit('SET_EMERGENCY_CONTACTS', updatedEmergency)
            commit('isLoading', false)
          })
          


        commit('SET_EMERGENCY_CONTACTS', response.data)
      } catch (error) {
        console.error('Error fetching:', error)
      } finally {
        commit('isLoading', false)
      }
    },

    async fetchDriverLicence({ commit }, driverID){
      try {
        commit('isLoading', true)
        commit('clear_driver_licence')
        commit('clear_error')

        const response = await axiosIns.get(`/drvls/?driverID=${driverID}`)

        console.log(response.data)

        commit('SET_DRIVER_LICENCE', response.data)
      } catch (error) {
        console.error('Error fetching:', error)
      } finally {
        commit('isLoading', false)
      }
    },
    async fetchDriverLicences({ commit }){
      try {
        commit('isLoading', true)
        commit('clear_error')
        
        const response = await axiosIns.get('/drvls/')

        const licencePromises = response.data.map(async licence => {
          const driverPromise = axiosIns.get(`/drivers/${licence.driverID}/`)
          const [driverResponse] = await Promise.all([driverPromise])

          licence.driverID = driverResponse.data

          return licence
        })

        Promise.all(licencePromises)
          .then(updatedLicence => {
            commit('SET_DRIVER_LICENCES', updatedLicence)
            commit('isLoading', false)
          })
          


        commit('SET_DRIVER_LICENCES', response.data)
      } catch (error) {
        console.error('Error fetching:', error)
      } finally {
        commit('isLoading', false)
      }
    },



    async fetchDriverPassport({ commit }, driverID){
      try {
        commit('isLoading', true)
        commit('clear_driver_passport')
        commit('clear_error')

        const response = await axiosIns.get(`/drvps/?DrvId=${driverID}`)

        console.log(response.data, "pass")

        commit('SET_DRIVER_PASSPORT', response.data)
      } catch (error) {
        console.error('Error fetching:', error)
      } finally {
        commit('isLoading', false)
      }
    },        

    async fetchDriverPassports({ commit }, driverID){

      try {
        commit('isLoading', true)
        commit('clear_error')
        
        const response = await axiosIns.get('/drvps/')

        const djiboutiPassPromises = response.data.map(async djiboutiPass => {
          const driverPromise = axiosIns.get(`/drivers/${djiboutiPass.DrvId}/`)
          const [driverResponse] = await Promise.all([driverPromise])

          djiboutiPass.driverID = driverResponse.data

          return djiboutiPass
        })

        Promise.all(djiboutiPassPromises)
          .then(updateddjiboutiPass => {
            commit('SET_DRIVER_PASSPORTS', updateddjiboutiPass)
            commit('isLoading', false)
          })
          


        commit('SET_DRIVER_PASSPORTS', response.data)
      } catch (error) {
        console.error('Error fetching:', error)
      } finally {
        commit('isLoading', false)
      }
    },

    async fetchDriverLeaveLog({ commit }, driverId) {
      try {
        commit('isLoading', true)
        commit('clear_driver_leave_log')
        commit('clear_error')

        const response = await axiosIns.get(`/drvlv?driverID=${driverId}`)

        commit('SET_DRIVER_LEAVE_LOG', response.data)
      } catch (error) {
        console.error('Error fetching:', error)
      } finally {
        commit('isLoading', false)
      }
    },

    async fetchDriverLeaveLogEd({ commit }, leaveId) {
      try {
        commit('isLoading', true)
        commit('clear_driver_leave_log')
        commit('clear_error')

        const response = await axiosIns.get(`/drvlv/${leaveId}/`)

        console.log(response.data, "leave")

        commit('SET_DRIVER_LEAVE_LOG', response.data)
      } catch (error) {
        console.error('Error fetching:', error)
      } finally {
        commit('isLoading', false)
      }
    },

    async fetchDriverLeaveLogs({ commit }) {

      try {
        commit('isLoading', true)
        commit('clear_error')
        
        const response = await axiosIns.get('/drvlv/')

        console.log(response.data, "leave")

        const driverLeaveLogsPromises = response.data.map(async driverLeaveLogs => {
          const driverPromise = axiosIns.get(`/drivers/${driverLeaveLogs.driverID}/`)
          const [driverResponse] = await Promise.all([driverPromise])

          driverLeaveLogs.driverID = driverResponse.data
          console.log(driverLeaveLogs, "driverLeaveLogs")
          
          return driverLeaveLogs
        })

        Promise.all(driverLeaveLogsPromises)
          .then(updateddriverLeaveLogs => {
            commit('SET_DRIVER_LEAVE_LOGS', updateddriverLeaveLogs)
            commit('isLoading', false)
          })
          


        commit('SET_DRIVER_LEAVE_LOGS', response.data)
      } catch (error) {
        console.error('Error fetching:', error)
      } finally {
        commit('isLoading', false)
      }
    },


    async fetchDjiboutiPass({ commit }, driverId) {
      try {
        commit('isLoading', true)
        commit('clear_djibouti_pass')
        commit('clear_error')

        const response = await axiosIns.get(`/djiboutipass?DrvId=${driverId}`)

        console.log(response.data, "djibouti pass")

        commit('SET_DJIBOUTI_PASS', response.data)
      } catch (error) {
        console.error('Error fetching:', error)
      } finally {
        commit('isLoading', false)
      }
    },

    async fetchDjiboutiPasses({ commit }) {

      try {
        commit('isLoading', true)
        commit('clear_error')

        const response = await axiosIns.get('/djiboutipass/')

        const djiboutiPassPromises = response.data.map(async djiboutiPass => {
          const driverPromise = axiosIns.get(`/drivers/${djiboutiPass.DrvId}/`)
          const [driverResponse] = await Promise.all([driverPromise])

          djiboutiPass.driverID = driverResponse.data

          return djiboutiPass
        })

        Promise.all(djiboutiPassPromises)
          .then(updateddjiboutiPass => {
            commit('SET_DJIBOUTI_PASSES', updateddjiboutiPass)
            commit('isLoading', false)
          })
          


        commit('SET_DJIBOUTI_PASSES', response.data)
      } catch (error) {
        console.error('Error fetching:', error)
      } finally {
        commit('isLoading', false)
      }
    },


    async createDriver({ commit }, data) {
      try {
        commit('isLoading', true)
        commit('clear_error')

        const response = await axiosIns.post('/drivers/', data.driverData)

        const emergencyContactResponse = await axiosIns.post('/drvery/', {
          ...data.emergency_contact,
          driverID: response.data.id,
        })

        const driverLicenseResponse = await axiosIns.post('/drvls/', {
          ...data.licence,
          driverID: response.data.id,
        })

        const driverPassportResponse = await axiosIns.post('/drvps/', {
          ...data.passport,
          DrvId: response.data.id,
        })

        commit('SET_DRIVER', response.data)
        commit('SET_EMERGENCY_CONTACT', emergencyContactResponse.data)
        commit('SET_DRIVER_LICENCE', driverLicenseResponse.data)
        commit('SET_DRIVER_PASSPORT', driverPassportResponse.data)
      } catch (error) {
        commit('SET_CREATE_ERROR', error.response.data)
        console.error('Error creating driver:', error)
      } finally {
        commit('isLoading', false)
      }
    },
    async updateDriver({ commit }, { driverId, driverData }) {
      try {
        commit('isLoading', true)
        commit('clear_error')

        const response = await axiosIns.put(`/drivers/${driverId}/`, driverData)

        commit('SET_DRIVER', response.data)
      } catch (error) {
        console.error('Error updating driver:', error)
      } finally {
        commit('isLoading', false)
      }
    },
    async deleteDriver({ commit }, driverId) {
      try {
        commit('clear_error')
        commit('isLoading', true)
        await axios.delete(`${BASE_URL}/drivers/${driverId}`)
        commit('SET_DRIVER', {})
      } catch (error) {
        console.error('Error deleting driver:', error)
      } finally {
        commit('isLoading', false)
      }
    },
    async updateDriverLeaveLog({ commit }, { leaveId, leaveData }) {
      try {
        commit('isLoading', true)
        commit('clear_error')
        commit('clear_driver_leave_log')

        const response = await axiosIns.put(`/drvlv/${leaveId}/`, leaveData)

        commit('SET_DRIVER_LEAVE_LOG', response.data)
        console.log(response.data, "leave")
      } catch (error) {
        commit('SET_CREATE_ERROR', error.message)
        console.error('Error updating driver leave log:', error)
      } finally {
        commit('isLoading', false)
      }
    },

    async updateEmergencyContact({ commit }, { emergencyId, emergencyData }) {
      try {
        commit('isLoading', true)
        commit('clear_error')
        commit('clear_emergency_contact')

        const response = await axiosIns.put(`/drvery/${emergencyId}/`, emergencyData)

        commit('SET_EMERGENCY_CONTACT', response.data)
        console.log(response.data, "emergency")
      } catch (error) {
        commit('SET_CREATE_ERROR', error.message)
        console.error('Error updating emergency contact:', error)
      } finally {
        commit('isLoading', false)
      }
    },

    async updateDriverLicence({ commit }, licenceData ) {
      try {
        commit('isLoading', true)
        commit('clear_error')
        commit('clear_driver_licence')

        const response = await axiosIns.put(`/drvls/${licenceData.id}/`, licenceData)

        commit('SET_DRIVER_LICENCE', response.data)
        console.log(response.data, "licence")
      } catch (error) {
        commit('SET_CREATE_ERROR', error.message)
        console.error('Error updating driver licence:', error)
      } finally {
        commit('isLoading', false)
      }
    },

    async updateDriverPassport({ commit }, { passportId, passportData }) {
      try {
        commit('isLoading', true)
        commit('clear_error')
        commit('clear_driver_passport')

        const response = await axiosIns.put(`/drvps/${passportId}/`, passportData)

        commit('SET_DRIVER_PASSPORT', response.data)
        console.log(response.data, "passport")
      } catch (error) {
        commit('SET_CREATE_ERROR', error.message)
        console.error('Error updating driver passport:', error)
      } finally {
        commit('isLoading', false)
      }
    },

    async createDjiboutiPass({ commit }, data) {
      commit('clear_djibouti_pass')
      commit('clear_error')
      try {
        commit('isLoading', true)

        const response = await axiosIns.post('/djiboutipass/', data)

        commit('SET_DJIBOUTI_PASS', response.data)
      } catch (error) {
        commit('SET_CREATE_ERROR', error.response.data)
        console.error('Error creating djibouti pass:', error)
      } finally {
        commit('isLoading', false)
      }
    },

    async updateDjiboutiPass({ commit }, djiboutiPassData) {
      try {
        commit('isLoading', true)
        commit('clear_error')
        commit('clear_djibouti_pass')

        const response = await axiosIns.put(`/djiboutipass/${djiboutiPassData.id}/`, djiboutiPassData)

        commit('SET_DJIBOUTI_PASS', response.data)
        console.log(response.data, "djibouti pass")
      } catch (error) {
        commit('SET_CREATE_ERROR', error.message)
        console.error('Error updating djibouti pass:', error)
      } finally {
        commit('isLoading', false)
      }
    },
    async createInfraction({ commit }, data) {
      commit('clear_infraction')
      commit('clear_error')
      try {
        commit('isLoading', true)

        const response = await axiosIns.post('/infraction/', data)

        commit('SET_INFRACTION', response.data)
      } catch (error) {
        commit('SET_CREATE_ERROR', error.response.data)
        console.error('Error creating infraction:', error)
      } finally {
        commit('isLoading', false)
      }
    },
    async updateInfraction({ commit }, infractionData) {
      try {
        commit('isLoading', true)
        commit('clear_error')
        commit('clear_infraction')

        const response = await axiosIns.put(`/infraction/${infractionData.id}/`, infractionData)

        commit('SET_INFRACTION', response.data)
        console.log(response.data, "infraction")
      } catch (error) {
        commit('SET_CREATE_ERROR', error.message)
        console.error('Error updating infraction:', error)
      } finally {
        commit('isLoading', false)
      }
    },
    async createInfractionType({ commit }, data) {
      commit('clear_infraction_type')
      commit('clear_error')
      try {
        commit('isLoading', true)

        const response = await axiosIns.post('/infractiontype/', data)

        commit('SET_INFRACTION_TYPE', response.data)
      } catch (error) {
        commit('SET_CREATE_ERROR', error.response.data)
        console.error('Error creating infraction type:', error)
      } finally {
        commit('isLoading', false)
      }
    },
    async updateInfractionType({ commit }, infractionTypeData) {
      try {
        commit('isLoading', true)
        commit('clear_error')
        commit('clear_infraction_type')

        const response = await axiosIns.put(`/infractiontype/${infractionTypeData.id}/`, infractionTypeData)

        commit('SET_INFRACTION_TYPE', response.data)
        console.log(response.data, "infraction type")
      } catch (error) {
        commit('SET_CREATE_ERROR', error.message)
        console.error('Error updating infraction type:', error)
      } finally {
        commit('isLoading', false)
      }
    },
    async deleteInfraction({ commit }, infractionId) {
      try {
        commit('clear_error')
        commit('isLoading', true)
        await axiosIns.delete(`/infraction/${infractionId}`)
        commit('SET_INFRACTION', {})
      } catch (error) {
        console.error('Error deleting infraction:', error)
      } finally {
        commit('isLoading', false)
      }
    },

    async deleteInfractionType({ commit }, infractionTypeId) {
      try {
        commit('clear_error')
        commit('isLoading', true)
        await axiosIns.delete(`/infractiontype/${infractionTypeId}`)
        commit('SET_INFRACTION_TYPE', {})
      } catch (error) {
        console.error('Error deleting infraction type:', error)
      } finally {
        commit('isLoading', false)
      }
    },
    async fetchInfractions({ commit }) {
      try {
        commit('isLoading', true)
        commit('clear_error')
    
        const response = await axiosIns.get('/infraction/')
    
        const infractionPromises = response.data.map(async infraction => {
          const driverResponse = await axiosIns.get(`/drivers/${infraction.driverID}/`)
          const infractionTypeResponse = await axiosIns.get(`/infractiontype/${infraction.infractionType}/`)
    
          infraction.driverID = driverResponse.data
          infraction.infractionType = infractionTypeResponse.data
    
          return infraction
        })
    
        const updatedInfractions = await Promise.all(infractionPromises)
    
        commit('SET_INFRACTIONS', updatedInfractions)
      } catch (error) {
        console.error('Error fetching infractions:', error)
        commit('setError', error.message) // Assuming you have an 'setError' mutation to store the error message
      } finally {
        commit('isLoading', false)
      }
    },

    async fetchInfraction({ commit }, infractionId) {
      try {
        commit('isLoading', true)
        commit('clear_infraction')
        commit('clear_error')

        const response = await axiosIns.get(`/infraction/${infractionId}/`)

        commit('SET_INFRACTION', response.data)
      } catch (error) {
        console.error('Error fetching infraction:', error)
      } finally {
        commit('isLoading', false)
      }
    },
    async fetchInfractionTypes({ commit }) {
      try {
        commit('isLoading', true)
        commit('clear_error')

        const response = await axiosIns.get('/infractiontype/')

        commit('SET_INFRACTION_TYPES', response.data)
      } catch (error) {
        console.error('Error fetching infraction types:', error)
      } finally {
        commit('isLoading', false)
      }
    },

    async fetchInfractionType({ commit }, infractionTypeId) {
      try {
        commit('isLoading', true)
        commit('clear_error')

        const response = await axiosIns.get('/infractiontype/infractionTypeId')

        commit('SET_INFRACTION_TYPE', response.data)
      } catch (error) {
        console.error('Error fetching infraction types:', error)
      } finally {
        commit('isLoading', false)
      }
    },
  },

  getters: {
    loading: state => state.isLoading,
    drivers: state => state.drivers,
    driver: state => state.driver,
    emergencyContacts: state => state.emergencyContacts,
    emergencyContact: state => state.emergencyContact,
    driverLicences: state => state.driverLicences,
    driverLicence: state => state.driverLicence,
    driverLeaveLogs: state => state.driverLeaveLogs,
    driverLeaveLog: state => state.driverLeaveLog,
    driverPassport: state => state.driverPassport,
    driverPassports: state => state.driverPassports,
    createError: state => state.createError,
    djiboutiPass: state => state.djiboutiPass,
    djiboutiPasses: state => state.djiboutiPasses,
    infraction: state => state.infraction,
    infractions: state => state.infractions,
    infractionType: state => state.infractionType,
    infractionTypes: state => state.infractionTypes,
  },
}

export default driverModule
