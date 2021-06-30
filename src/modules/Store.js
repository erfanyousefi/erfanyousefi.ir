import { createStore } from "vuex";
import Storage from "@/controller/LocalStorage.js";
const store = createStore({
    state() {
        return {
            token: Storage.get("user-token"),
            user: Storage.get("user")
                // isLoggedIn: !!Storage.get("user-token"),
        }
    },
    mutations: {
        setToken: (state, token) => {
            state.token = token
            Storage.set("user-token", token)
        },
        removeToken: (state) => {
            state.token = null
            Storage.remove("user-token")
        },
        setUser: (state, user) => {
            Storage.set("user", user)
            state.user = user
        }
    },
    getters: {
        isLoggedIn: state => !!state.token,
    },
    actions: {}
})

export default store