const urls = {
  api: 'http://localhost:3000/api',
  auth: {
    login: '/auth/jwt/create/',
    signup: '/auth/users/',
    refresh: '/auth/jwt/refresh/',
    verify: '/auth/jwt/verify/',
  },
  user: {
    me: '/auth/users/me/',
    list: '/auth/users/',
    detail: '/auth/users/{id}/',
  },
  driver: {
    list: '/drivers/',
    detail: '/drivers/{id}/',
    leave: '/drvls/',
    leaveDetail: '/drvls/{id}/',
    emergency: '/drvery/',
    emergencyDetail: '/drvery/{id}/',
    licence: '/drvls/',
    passport: '/drvps/',
  },
  Vehicle: {
    fleetList: '/fleet/',
    fleetDetail: '/fleet/{id}/',
    truckList: '/truck/',
    truckDetail: '/truck/{id}/',
    trailerList: '/trailers/',
    trailerDetail: '/trailers/{id}/',
    trip: '/trip/',
    tripDetail: '/trip/{id}/',
  },
  Shipments: {
    FO: '/fo/',
    FODetail: '/fo/{id}/',
    advanceLock: "/fo/{id}/update_fo_advance_lock/",
    fuelLock: "/fo/{id}/update_fo_fuel_lock/",
    perdiumLock: "/fo/{id}/update_fo_perdium_lock/",
  },
  Settlements: {
    advance: '/advance/',
    advanceDetail: '/advance/{id}/',
    fuel: '/fuel/',
    fuelDetail: '/fuel/{id}/',
    perdiuem: '/perdiuem/',
    perdiuemDetail: '/perdiuem/{id}/',
  },
}

export default urls
