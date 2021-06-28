import Storage from "@/controller/LocalStorage.js";
import { HTTP } from "@/controller/http.js";
import Alert from "@/controller/alertSystem.js"
export default {
    logout: (context) => {
        context.commit('setToken', null);
        Storage.remove('user-token');
    },
    login: (context, loginInfo) => {
        HTTP.post("auth/login", {
            email: loginInfo.email,
            password: loginInfo.password
        }).then(response => {
            if (response.data.status && response.data.token) {
                Storage.set('user-token', response.data.token);
            } else if (!response.data.status) {
                Alert.errorAlert({
                    title: "",
                    text: "نام کاربری یا رمز عبور صحیح نمیباشد لطفا در وارد کردن مشخصات دقت کنید"
                })
            }
        }).catch(error => {
            console.log(error);
            Alert.errorAlert({
                title: "پیغام خطا",
                text: "ورود به حساب کاربری انجام نشد لطفا بعدا یا مجددا تلاش بفرمائید"
            })
        })
    },
    finalizeLogin: (context) => {
        context.commit("setToken", Storage.get("user-token"));
    }
}