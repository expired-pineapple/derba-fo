import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/dashboard' },
    {
      path: '/',
      component: () => import('../layouts/default.vue'),
      children: [
        {
          name: 'dashboard',
          path: 'dashboard',
          component: () => import('../pages/dashboard.vue'),
        },
        {
          name: 'account-settings',
          path: 'account-settings',
          component: () => import('../pages/account-settings.vue'),
        },
        {
          path: 'drivers',
          component: () => import('../pages/Drivers/DriverList.vue'),
        },
        { 
          name: "driver-edit",
          path: 'driver-edit/:id',
          component: () => import('../pages/Drivers/DriverEdit-2.vue'),
        },
        {
          name: "driver-leave-edit",
          path: 'driver-leave-edit/:id',
          component: () => import('../pages/Drivers/DriverLeaveEditView.vue'),
        },
        {
          name: "emergency-contact",
          path: 'emergency-contact',
          component: () => import('../pages/Drivers/DriverEmergencyContactsView.vue'),

        },
        {
          name: "licence",
          path: 'licence',
          component: () => import('../pages/Drivers/DriverLicenceView.vue'),
        },
        {
          name: "driver-djibouti-pass",
          path: 'driver-djibouti-pass',
          component: () => import('../pages/Drivers/DjibouiPassView.vue'),
        },
        {
          name: "driver-passport",
          path: 'driver-passport',
          component: () => import('../pages/Drivers/DriverPassView.vue'),
        },
        {
          path: 'register-drivers',
          component: () => import('../pages/Drivers/RegisterDrivers.vue'),
        },
        {
          name: "driver-leave-logs",
          path: 'driver-leave-logs',
          component: () => import('../pages/Drivers/DriverLeaveView.vue'),
        },
        {
          name: "driver-leave-form",
          path: 'driver-leave-form',
          component: () => import('../pages/Drivers/LeaveForm.vue'),
        },
        {
          name: "trucks",
          path: 'trucks',
          component: () => import('../pages/Trucks/TruckView.vue'),
        },
        {
          name: "truck-details",
          path: 'truck/:id',
          component: () => import('../pages/Trucks/TrucksDetails.vue'),
        },
        {
          name: 'register-trucks',
          path: 'register-trucks',
          component: () => import('../pages/Trucks/TruckFormView.vue'),
        },
        {
          name: "trailers",
          path: 'trailers',
          component: () => import('../pages/Trailers/TrailerView.vue'),
        },
        {
          name: "register-trailers",
          path: 'register-trailers',
          component: () => import('../pages/Trailers/TrailerFormView.vue'),
        },
        {
          name: "trailer-edit",
          path: 'trailer/:id',
          component: () => import('../pages/Trailers/TrailerEditView.vue'),
        },
        {
          name: "trailer-bolo",
          path: 'trailer-bolo',
          component: () => import('../pages/Trailers/Bolo/BoloView.vue'),
        },

        {
          name: 'edit-trailer-bolo',
          path: 'trailer-bolo/:id',
          component: () => import('../pages/Trailers/Bolo/BoloEdit.vue'),
        },
        {
          name: 'register-trailer-bolo',
          path: 'register-trailer-bolo',
          component: () => import('../pages/Trailers/Bolo/BoloForm.vue'),
        },
        {
          name: "trailer-comesa",
          path: "trailer-comesa",
          component: () => import('../pages/Trailers/COMESA/COMESAView.vue'),
        },
        {
          name: "edit-trailer-comesa",
          path: "trailer-comesa/:id",
          component: () => import('../pages/Trailers/COMESA/COMESAEdit.vue'),
        },
        {
          name: 'register-trailer-comesa',
          path: 'register-trailer-comesa',
          component: () => import('../pages/Trailers/COMESA/COMESAForm.vue'),
        },
        {
          name: "trailer-third-party",
          path: "trailer-third-party",
          component: () => import('../pages/Trailers/Third Party/ThirdParty.vue'),
        },
        {
          name: "edit-third-party",
          path: "trailer-third-party/:id",
          component: () => import('../pages/Trailers/Third Party/ThirdPartyEdit.vue'),
        },
        {
          name: "register-third-party",
          path: "register-trailer-third-party",
          component: () => import('../pages/Trailers/Third Party/ThirdPartyForm.vue'),
        },
        {
          name: 'trip-information',
          path: 'trip-information',
          component: () => import('../pages/Trips/TripInformationView.vue'),
        },
        {
          name: 'trip-form',
          path: 'trip-form',
          component: () => import('../pages/Trips/TripFormView.vue'),
        },
        {
          name: 'infractions',
          path: 'infractions',
          component: () => import('../pages/Infractions/InfractionView.vue'),
        },
        {
          name: 'register-infractions',
          path: 'register-infractions',
          component: () => import('../pages/Infractions/InfractionFormView.vue'),
        },
        {
          name: 'maintenance',
          path: 'maintenance',
          component: () => import('../pages/Trucks/MaintenanceView.vue'),
        },
        {
          name: 'customer',
          path: 'customer',
          component: () => import('../pages/Customer/CustomerView.vue'),
        },
        {
          name: 'register-customer',
          path: 'register-customer',
          component: () => import('../pages/Customer/CustomerForm.vue'),
        },
        {
          name: 'edit-customer',
          path: 'edit-customer/:id',
          component: () => import('../pages/Customer/CustomerEdit.vue'),
        },
        {
          name: 'register-customer-contact',
          path: 'register-customer-contact',
          component: () => import('../pages/Customer/CustomerContact/CustomerContactFormView.vue'),
        },
        {
          name: 'customer-contact',
          path: 'customer-contact',
          component: () => import('../pages/Customer/CustomerContact/CustomerContactView.vue'),

        },
        {
          name: 'register-advance',
          path: 'register-advance',
          component: () => import('../pages/Advance/AdvanceFormView.vue'),
        },
        {
          name: 'shipment',
          path: 'shipment',
          component: () => import('../pages/FO/FOView.vue'),
        },
        {
          name: "fleet",
          path: "fleet",
          component: () => import('../pages/Fleet/FleetView.vue'),
        },
        {
          name: 'register-fleet',
          path: 'register-fleet',
          component: () => import('../pages/Fleet/FleetFormView.vue'),
        },
        {
          name: 'edit-fleet',
          path: 'fleet/:id',
          component: () => import('../pages/Fleet/FleetEditView.vue'),
        },
        {
          name: "fleet-bolo",
          path: "fleet-bolo",
          component: () => import('../pages/Fleet/Bolo/BoloView.vue'),
        },
        {
          name: 'edit-fleet-bolo',
          path: 'fleet-bolo/:id',
          component: () => import('../pages/Fleet/Bolo/BoloEdit.vue'),
        },
        {
          name: 'register-fleet-bolo',
          path: 'register-fleet-bolo',
          component: () => import('../pages/Fleet/Bolo/BoloForm.vue'),
        },
        {
          name: "fleet-comesa",
          path: "fleet-comesa",
          component: () => import('../pages/Fleet/COMESA/COMESAView.vue'),
        },
        {
          name: "edit-fleet-comesa",
          path: "fleet-comesa/:id",
          component: () => import('../pages/Fleet/COMESA/COMESAEdit.vue'),
        },

        {
          name: 'register-fleet-comesa',
          path: 'register-fleet-comesa',
          component: () => import('../pages/Fleet/COMESA/COMESAForm.vue'),
        },
        {
          name: "fleet-insurance",
          path: "fleet-insurance",
          component: () => import('../pages/Fleet/Insurance/InsuranceView.vue'),
        },
        {
          name: "edit-fleet-insurance",
          path: "fleet-insurance/:id",
          component: () => import('../pages/Fleet/Insurance/InsuranceEdit.vue'),
        },
        {
          name: "register-fleet-insurance",
          path: "register-fleet-insurance",
          component: () => import('../pages/Fleet/Insurance/InsuranceForm.vue'),
        },
        {
          name: "register-fleet-third-party",
          path: "register-fleet-third-party",
          component: () => import('../pages/Fleet/Third Party/ThirdPartyForm.vue'),
        },
        {
          name: "fleet-third-party",
          path: "fleet-third-party",
          component: () => import('../pages/Fleet/Third Party/ThirdParty.vue'),
        },
        {
          name: "edit-fleet-third-party",
          path: "fleet-third-party/:id",  
          component: () => import('../pages/Fleet/Third Party/ThirdPartyEdit.vue'),

        },
        {
          name: 'comodities',
          path: 'comodities',
          component: () => import('../pages/Comodities/ComoditiesView.vue'),
        },
        {
          name: 'edit-comodity',
          path: 'comodities/:id',
          component: () => import('../pages/Comodities/ComoditiesEditView.vue'),
        },
        {
          name: 'register-comodity',
          path: 'register-comodity',
          component: () => import('../pages/Comodities/ComoditiesFormView.vue'),
        },
        {
          name: 'register-shipment',
          path: 'register-shipment',
        },
        {
          name: "trailer-insurance",
          path: "trailer-insurance",
          component: () =>import('../pages/Trailers/Insurance/InsuranceView.vue'),
        },
        {
          name: "edit-trailer-insurance",
          path: "trailer-insurance/:id",
          component: () =>import('../pages/Trailers/Insurance/InsuranceEdit.vue'),
        },
        {
          name: "register-trailer-insurance",
          path: "register-trailer-insurance",
          component: () =>import('../pages/Trailers/Insurance/InsuranceForm.vue'),
        },
        {
          name: "tire-provision",
          path: "/tire-provision",
          component: () => import('../pages/Tires/Provision/ListView.vue'),
        },
        {
          name: "edit-tire-provision",
          path: "/tire-provision/:id",
          component: () => import('../pages/Tires/Provision/EditView.vue'),
        },
        {
          name: "register-tire-provision",
          path: "/tire-provision/register",
          component: () => import('../pages/Tires/Provision/FormView.vue'),
        },

        {
          name: "tire-return",
          path: "/tire-return",
          component: () => import('../pages/Tires/Return/ListView.vue'),
        },
        {
          name: "edit-tire-return",
          path: "/tire-return/:id",
          component: () => import('../pages/Tires/Return/EditView.vue'),
        },
        {
          name: "register-tire-return",
          path: "/tire-return/register",
          component: () => import('../pages/Tires/Return/FormView.vue'),
        },
      ],
    },
    {
      path: '/',
      component: () => import('../layouts/blank.vue'),
      children: [
        {
          path: "register",
          component: () => import('../pages/register.vue'),
        },  
        {
          path: 'login',
          component: () => import('../pages/login.vue'),
        },
        {
          path: '/:pathMatch(.*)*',
          component: () => import('../pages/[...all].vue'),
        },
      ],
    },
  ],
})

export default router

