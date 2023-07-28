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
          path: 'dashboard',
          component: () => import('../pages/dashboard.vue'),
        },
        {
          path: 'account-settings',
          component: () => import('../pages/account-settings.vue'),
        },
        {
          path: 'typography',
          component: () => import('../pages/typography.vue'),
        },
        {
          path: 'drivers',
          component: () => import('../pages/Drivers/DriverList.vue'),
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
      ],
    },
    {
      path: '/',
      component: () => import('../layouts/blank.vue'),
      children: [
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
