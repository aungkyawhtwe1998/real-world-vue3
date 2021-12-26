import { createApp } from "vue"; //8. delete reactive
import App from "./App.vue";
import router from "./router";
import GStore from "./store"; //7.
import "nprogress/nprogress.css";
// creating global (ractive) object to share across multiple components
//5. allow us to store global state, to get access the gstore from the router move this to the store>index.js

//8. delete .use(store)
createApp(App)
    .use(router)
    .provide("GStore", GStore) //Key and string value of Gstore, allow to store in one component and access data in anoter
    .mount("#app");
