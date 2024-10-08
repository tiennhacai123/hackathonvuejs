import { createWebHistory, createRouter } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import ManagerProduct from '../views/ManagerProduct.vue'
import ManagerUser from '../views/ManagerUser.vue'
const routes = [
  { path: '/admin', Name: 'Dashboard', component: Dashboard},
  { path: '/admin/manager-user', Name: 'ManagerUser', component: ManagerUser},
  { path: '/admin/manager-product', Name: 'ManagerProduct', component: ManagerProduct}
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
}) 
