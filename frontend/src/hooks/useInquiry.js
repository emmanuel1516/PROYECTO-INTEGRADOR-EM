import { useState } from "react";
import inquiryApi from "../api/inquiry.api.js";

export const useInquiry = () => {
    const [ isLoading, setIsLoading ] = useState(false);
    const [ success, setSuccess ] = useState(false);
    const [ error, setError ] = useState(null);

    const sendInquiry = async (values) => {
        setIsLoading(true);
        setError(null);

        try {
            await inquiryApi.sendInquiry(values);
            setSuccess(true);
        } catch (error) {
            setError(error.message || "Error al enviar el email.");
            setSuccess(false);
        }finally {
            setIsLoading(false);
        }

    };

    return {
        sendInquiry,
        isLoading,
        success,
        error,
    };
};