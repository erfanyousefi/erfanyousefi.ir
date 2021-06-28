import { createApp } from 'vue'
import App from './App.vue'
import router from "./routes/index";
import "sweetalert2/dist/sweetalert2.min.css";
import store from "@/modules/Store.js"
let app = createApp(App);
app.use(store)
app.use(router);
app.mount('#app')