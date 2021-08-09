import Storage from "@/controller/LocalStorage.js"
export default () => {
    return {
        token: Storage.get("user-token"),
        isLoggedIn: !!Storage.get("user-token"),
    }
}