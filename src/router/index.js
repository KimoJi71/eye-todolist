import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/Login.vue';
import TodoList from '../components/TodoList.vue';
import AddNewTodo from '../components/AddNewTodo.vue';
import EditTodo from '../components/EditTodo.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Login,
  },
  {
    path: '/todo-list',
    component:TodoList,
  },
  {
    path: '/add-todo',
    component: AddNewTodo,
  },
  {
    path: '/edit-todo/:to_do_id',
    component: EditTodo,
  },
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes,
  mode: 'history',
})

export default router;
