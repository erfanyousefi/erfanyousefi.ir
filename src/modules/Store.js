import { createStore } from "vuex";
import auth from "@/modules/auth/auth.js";
createStore({
    modules: {
        auth
    },
    state() { return {} },
    mutations: {},
    getters: {},
    actions: {}
})