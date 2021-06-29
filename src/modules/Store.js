import { createStore } from "vuex";
import Storage from "@/controller/LocalStorage.js";
const store = createStore({
    state() {
        return {
            token: Storage.get("user-token"),
            // isLoggedIn: !!Storage.get("user-token"),
        }
    },
    mutations: {
        setToken: (state, token) => {
            state.token = token
        },
        removeToken: (state) => {
            state.token = null
            Storage.remove("user-token")
        }
    },
    getters: {
        isLoggedIn: state => !!state.token
    },
    actions: {}
})

export default store