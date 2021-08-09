import Storage from "@/controller/LocalStorage.js";
import { HTTP } from "@/controller/http.js";
import Alert from "@/controller/alertSystem.js"
export default {
    register: (context, registerInfo) => {
        HTTP.post("auth/register", {
            name: registerInfo.name,
            email: registerInfo.email,
            password: registerInfo.password
        }).then(response => {
            if (response.data.status && response.data.token) {
                Storage.set('user-token', response.data.token);
            } else if (!response.data.status) {
                Alert.errorAlert({
                    text: "ثبت نام انجام نشد لطفا بعدا یا مجددا تلاش کنید"
                })
            }
        }).catch(error => {
            console.log(error);
            Alert.errorAlert({
                text: "ثبت نام انجام نشد لطفا بعدا یا مجددا تلاش کنید"
            })
        })
    },
    finalizeLogin: (context) => {
        context.commit("setToken", Storage.get("user-token"));
    }
}