// import { useCallback } from "react";

export const useNotification = () => {
    return (text) => {
        if (window.M && text) {
            window.M.toast({ html: String(text) });
        }
    };
};
