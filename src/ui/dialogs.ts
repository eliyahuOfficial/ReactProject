

import Swal from "sweetalert2";
export const showSuccessDialog = (title: string, text: string) => {
    return Swal.fire({
        title,
        text,
        icon: "success",
        iconColor: "#ff7e66",
        confirmButtonColor: "#ff7e66",


    });
};
export const showErrorDialog = (title: string, text: string) => {
    return Swal.fire({
        title,
        text,
        icon: "error",
        iconColor: "#ff7e66",
        confirmButtonColor: "#ff7e66",

    });
};

export const showSuccessCreate = (title: string, text: string) => {
    return Swal.fire({
        position: "top-end",
        icon: "success",
        iconColor: "#ff7e66",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500

    });
}

const dialogs = { success: showSuccessDialog, error: showErrorDialog, create: showSuccessCreate };
export default dialogs;