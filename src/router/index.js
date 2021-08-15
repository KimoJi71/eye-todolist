import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import TodoList from '../views/TodoList.vue'
import AddNewTodo from '../views/AddNewTodo.vue'
import EditTodo from '../views/EditTodo.vue'
import Error404 from '../views/404.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/todo-list',
    name: 'todo-list',
    component:TodoList
  },
  {
    path: '/add-todo',
    name: 'add-todo',
    component: AddNewTodo
  },
  {
    path: '/edit-todo/:to_do_id',
    name: 'edit-todo',
    component: EditTodo
  },
  {
    path: '/404',
    name: '404',
    component: Error404,
    hidden: true
  },
  {
    path: '*',
    redirect: { name: '404' },
    hidden: true
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
