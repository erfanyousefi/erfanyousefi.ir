import state from "@/modules/auth/login/state.js";
import mutations from "@/modules/auth/login/mutations.js";
import getters from "@/modules/auth/login/getters.js";
import actions from "@/modules/auth/login/actions.js";
export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
}