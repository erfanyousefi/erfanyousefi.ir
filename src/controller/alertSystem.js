import Swal from "sweetalert2";
export default class Alert {
    static successAlert(obj) {
        Swal.fire({
            title: obj.title || '',
            text: obj.text,
            icon: "error",
            confirmButtonText: "باشه",
        })
    }
    static errorAlert(obj) {
        Swal.fire({
            title: obj.title || '',
            text: obj.text,
            icon: "error",
            confirmButtonText: "باشه",
        })
    }
    static infoAlert(obj) {
        Swal.fire({
            title: obj.title || '',
            text: obj.text,
            icon: "info",
            confirmButtonText: "باشه!",
        })
    }
    static warningAlert(obj) {
        Swal.fire({
            title: obj.title || '',
            text: obj.text,
            icon: "warning",
            confirmButtonText: "باشه",
        })
    }
    static questionAlert(obj) {
        Swal.fire({
            title: obj.title || '',
            text: obj.text,
            icon: "question",
            showCancelButton: true,
            cancelButtonText: "نه",
            confirmButtonText: "اره",
        }).then(result => {
            return result;
        })
    }

}