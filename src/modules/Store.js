import { createStore } from "vuex";
import Storage from "@/controller/LocalStorage.js";
const store = createStore({
    state() {
        return {
            token: Storage.get("user-token"),
            user: Storage.get("user"),
            chapterUpdated: false,
            BlogChapterUpdated: false,
            courseListUpdate: false,
            blogListUpdate: false,
            userListUpdate: false,
            userUpdate: false,
            lessonSlug: null,
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
        setBlogChapterUpdate(state, status) {
            state.BlogChapterUpdated = status
        },
        setBlogId(state, id) {
            state.blogID = id;
        },
        setLessonSlug(state, slug) {
            state.lessonSlug = slug;
        },
        setCourseListUpdate(state, status) {
            state.courseListUpdate = status
        },
        setBlogListUpdate(state, status) {
            state.blogListUpdate = status;
        },
        setUserListUpdate(state, status) {
            state.userListUpdate = status;
        },
        setStateUserUpdate(state, status) {
            state.userUpdate = status;
        }
    },
    getters: {
        isLoggedIn: state => !!state.token,
        isChapterUpdated: state => state.chapterUpdated,
        getBlogID: state => state.blogID,
        getStateCourseList: state => state.courseListUpdate,
        getStateBlogList: state => state.blogListUpdate,
        getStateUserList: state => state.userListUpdate,
        getStateUser: state => state.userListUpdate,
    },
    actions: {}
})

export default store