import { createStore } from "vuex";
import Storage from "@/controller/LocalStorage.js";
const store = createStore({
    state() {
        return {
            token: Storage.get("user-token"),
            user: Storage.get("user"),
            chapterUpdated: false,
            blogID: null
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
        },
        setBlogId(state, id) {
            state.blogID = id;
        }
    },
    getters: {
        isLoggedIn: state => !!state.token,
        isChapterUpdated: state => state.chapterUpdated,
        getBlogID: state => state.blogID
    },
    actions: {}
})

export default store