import { createApp } from 'vue'
import App from './App.vue'
import router from "./routes/index";
import "sweetalert2/dist/sweetalert2.min.css";
import VueCookies from 'vue3-cookies'
let app = createApp(App);
app.use(VueCookies, {
    expireTimes: "6d",
    path: "/",
    domain: "",
    secure: true,
    sameSite: "None"
});
app.use(router);
app.mount('#app')