import { useState } from "react";
import orderApi from "@/api/order.api.js";

export const useOrder = () => {
    const [ isLoading, setIsLoading ] = useState(false);
    const [ success, setSuccess ] = useState(false);
    const [ error, setError ] = useState(null);

    const sendOrder = async (payload) => {
        setIsLoading(true);
        setError(null);
        setSuccess(false);
        try {
            await orderApi.sendOrder(payload);
            setSuccess(true);
            return true;
        } catch (e) {
            setError(e?.message || "Error al enviar el correo de compra");
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    return { sendOrder, isLoading, success, error };
};