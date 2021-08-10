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
    name: 'login',
    component: Login,
  },
  {
    path: '/todo-list',
    name: 'todo-list',
    component:TodoList,
  },
  {
    path: '/add-todo',
    name: 'add-todo',
    component: AddNewTodo,
  },
  {
    path: '/edit-todo/:to_do_id',
    name: 'edit-todo',
    component: EditTodo,
  },
]

const router = new VueRouter({
  routes,
  mode: 'history',
})

export default router;
