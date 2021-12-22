import { createApp, reactive } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// creating global (ractive) object to share across multiple components
const GStore = reactive({flashMessage:''})

createApp(App)
.use(store).
use(router)
.provide('GStore', GStore) //Key and string value of Gstore
.mount("#app");
