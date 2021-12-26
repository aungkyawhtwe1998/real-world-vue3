import { createRouter, createWebHistory } from "vue-router";
import EventList from "../views/EventList.vue";
import EventLayout from "../views/event/Layout.vue";
import EventDetails from "../views/event/Details.vue";
import EventRegister from "../views/event/Register.vue";
import EventEdit from "../views/event/Edit.vue";
import About from "../views/About";
import NotFound from "../views/NotFound.vue";
import NetworkError from "../views/NetworkError.vue";

import NProgress from "nprogress";
//1
import EventService from "../services/EventService";
//9.
import GStore from "../store";
const routes = [
  {
    path: "/",
    name: "EventList",
    component: EventList,

    props: (route) => {
      return { page: parseInt(route.query.page) || 1 };
    },
  },
  {
    path: "/events/:id",
    name: "EventLayout",
    props: true,
    component: EventLayout,
    //2.
    beforeEnter: (to) => {
      //3. add return, to.params instead for getting target route
      return EventService.getEvent(to.params.id) //id to get event info from API
        .then((response) => {
          console.log(response.data);
          // this.event = response.data;
          //10. then go to Layout.vue
          GStore.event = response.data;
        })
        .catch((error) => {
          console.log(error);

          if (error.response && error.response.status == 404) {
            //4. change to return, then go to main.js
            return {
              name: "404Resource",
              params: { resource: "event" },
            };
          } else {
            return { name: "NetworkError" };
          }
        });
    },
    children: [
      {
        path: "",
        name: "EventDetails",
        component: EventDetails,
      },
      {
        path: "register",
        name: "EventRegister",
        component: EventRegister,
      },
      {
        path: "edit",
        name: "EventEdit",
        component: EventEdit,
      },
    ],
  },
  //redirect route for /events/id
  {
    path: "/event/:afterEvent(.*)",
    redirect: (to) => {
      return { path: "/events/" + to.params.afterEvent };
      // return {name:'EventDetails', params:{id: to.params.id}}
    },
    // children:[
    //   {path:'register', redirect:()=>({name:'EventRegister'})},
    //   {path:'edit', redirect:()=>({name:'EventEdit'})}

    // ]
  },

  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/:catchAll(.*)",
    name: "NouFound",
    component: NotFound,
  },
  {
    path: "/404/:resource",
    name: "404Resource",
    component: NotFound,
    props: true,
  },
  {
    path: "/network-error",
    name: "NetworkError",
    component: NetworkError,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 };
    // if(savedPosition){
    //   return savedPosition
    // }else{
    //   return {top:0}
    // }
  },
});
//Vue router Global Navigation guards
//start progress bar before navigation
router.beforeEach(() => {
  NProgress.start();
});

//finish the progress bar after navigation
router.afterEach(() => {
  NProgress.done();
});
export default router;
