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
          component: () => import('../pages/Drivers/DriverEdit.vue'),
        },
        {
          name: "driver-view",
          path: 'driver-view/:id',
          component: () => import('../pages/Drivers/DriverEdit-2.vue'),
        },
        {
          path: 'register-drivers',
          component: () => import('../pages/Drivers/RegisterDrivers.vue'),
        },
        {
          path: 'driver-leave-logs',
          component: () => import('../pages/Drivers/DriverLeaveView.vue'),
        },
        {
          name: "driver-leave-form",
          path: 'driver-leave-form',
          component: () => import('../pages/Drivers/LeaveForm.vue'),
        },
        {
          path: 'trucks',
          component: () => import('../pages/Trucks/TruckView.vue'),
        },
        {
          name: 'register-trucks',
          path: 'register-trucks',
          component: () => import('../pages/Trucks/TruckFormView.vue'),
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
          name: 'register-advance',
          path: 'register-advance',
          component: () => import('../pages/Advance/AdvanceFormView.vue'),
        },
        {
          name: 'shipment',
          path: 'shipment',
          component: () => import('../pages/FO/FOView.vue'),
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

