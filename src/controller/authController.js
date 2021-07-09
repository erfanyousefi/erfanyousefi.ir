import axios from "axios"
import storage from "@/controller/LocalStorage.js";
import Swal from "@/controller/alertSystem.js"
export default new class authController {
    async register(registerData) {
        axios.post("auth/register", {...registerData })
            .then((response) => {
                let text = "";
                if (!response.data.status) {
                    if (response.data.msg) {
                        Object.keys(response.data.msg).forEach((key) => {
                            text += response.data.msg[key] + "<br/>";
                        });
                        Swal.successAlert({ text })
                    } else {
                        text = response.data.message;
                    }
                    Swal.errorAlert({ text })
                }
                if (response.data.status) {
                    storage.set("user-token", response.data.token);
                    text = response.data.message;
                    Swal.fire({
                        text: text,
                        icon: "success",
                        confirmButtonText: "باشه",
                    }).then(response => {
                        console.log(response);
                    })
                }
            });

    }
}