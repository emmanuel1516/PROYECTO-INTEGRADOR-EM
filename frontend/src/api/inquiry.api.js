import { API_URL } from "@/constants/api.constant.js";

const sendInquiry = async (values) => {
    try {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        };

        const response = await fetch(`${API_URL}/inquiry/send-mail`, options);

        if (response.status != 204) {
            throw new Error("Error al enviar el email");
        }

        return true;
    } catch (error) {
        console.log(error.message);
        throw error;
    }
};

export default {
    sendInquiry,
};