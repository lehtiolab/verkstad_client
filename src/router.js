import Vue from 'vue';
import Router from 'vue-router';
import Home from './components/Home.vue';
import Logbook from './components/Logbook.vue';
import Users from './components/Users.vue';
import Signup from './components/Signup.vue';
import Login from './components/Login.vue';
import Machines from './components/Machines.vue';
import AddMachine from './components/AddMachine.vue';
import Tasks from './components/Tasks.vue';
import AddTask from './components/AddTask.vue';
import TaskDetails from './components/TaskDetails.vue';

Vue.use(Router);

export default new Router({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/logbook',
      name: 'logbook',
      component: Logbook,
    },
    {
      path: '/users',
      name: 'users',
      component: Users,
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/machines',
      name: 'machines',
      component: Machines,
    },
    {
      path: '/addmachine',
      name: 'addmachine',
      component: AddMachine,
    },
    {
      path: '/tasks',
      name: 'tasks',
      component: Tasks,
    },
    {
      path: '/addtask',
      name: 'addtask',
      component: AddTask,
    },
    {
      path: '/taskdetails/:taskId',
      name: 'taskdetails',
      component: TaskDetails,
      props: true,
    },
    {
      path: '*',
      redirect: 'home',
    },
  ],
});
