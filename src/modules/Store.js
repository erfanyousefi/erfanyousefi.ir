import { createStore } from "vuex";
import Storage from "@/controller/LocalStorage.js";
const store = createStore({
    state() {
        return {
            token: Storage.get("user-token"),
            user: Storage.get("user"),
            chapterUpdated: false
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
        },
        removeUser: (state) => {
            Storage.remove("user")
            state.user = null
        },
        setChapterUpdate(state, status) {
            state.chapterUpdated = status
        }
    },
    getters: {
        isLoggedIn: state => !!state.token,
        isChapterUpdated: state => state.chapterUpdated
    },
    actions: {}
})

export default store