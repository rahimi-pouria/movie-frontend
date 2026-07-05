import Swal, { SweetAlertResult } from "sweetalert2";
import { PostRequest } from "./api";

type AlertType = "success" | "warning" | "error" | "info" | "question";

interface ShowAlertOptions {
    type: AlertType;
    message: string;
    confirmedAction?: () => Promise<void>;
    confirmBtnText?: string;
    showCancelBtn?: boolean;
    cancelBtnText?: string;
}

export async function showAlert({type, message, confirmedAction, confirmBtnText = "Ok", showCancelBtn = false,
                                    cancelBtnText = "No",}: ShowAlertOptions): Promise<void> {
    const result: SweetAlertResult = await Swal.fire({
        icon: type,
        text: message,
        confirmButtonText: confirmBtnText,
        showCancelButton: showCancelBtn,
        cancelButtonText: cancelBtnText,
        buttonsStyling: false,
        padding: "2rem",
        heightAuto: false,
        allowEnterKey: false,
        scrollbarPadding: false,
        allowEscapeKey: false,
        allowOutsideClick: false,
        customClass: { confirmButton: "btn btn-primary", cancelButton: "btn btn-active-light" },
    });

    if (confirmedAction && result.isConfirmed) {
        await confirmedAction();
    }
}

export const showSuccessAlert = async (
    confirmAction: () => Promise<void>,
    successMessage: string = "Operation completed successfully"): Promise<void> => {
    return showAlert({ type: "success", message: successMessage, confirmedAction: confirmAction });
};

export const showWarningAlert = async (
    warningMessage: string,
    confirmAction: () => Promise<void>,
    confirmBtnText: string = "Yes"): Promise<void> => {
    return showAlert({ type: "warning", message: warningMessage, confirmedAction: confirmAction, confirmBtnText, showCancelBtn: true });
};

export const showErrorAlert = async (
    errorMessage: string,
    confirmAction?: () => Promise<void>): Promise<void> => {
    return showAlert({ type: "error", message: errorMessage, confirmedAction: confirmAction });
};

export const showCancelAlert = async (
    confirmAction: () => Promise<void>): Promise<void> => {
    return showAlert({ type: "warning", message: "Are you sure you want to cancel?", confirmedAction: confirmAction, confirmBtnText: "YesCancel", showCancelBtn: true });
};

export const showConfirmDeleteAlert = async (
    deleteApi: string,
    bodyParams: object,
    getterFunction: () => Promise<void>): Promise<void> => {
    return showAlert({
        type: "warning",
        message: "Are you sure you want to delete?",
        confirmedAction: async (): Promise<void> => {
            const data = await PostRequest(deleteApi, bodyParams);
            if (!data || !data.message?.success) return;
            await getterFunction();
        },
        confirmBtnText: "YesDelete",
        showCancelBtn: true,
    });
};