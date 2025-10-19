import { API_URL } from "@/constants/api.constant.js";

const sendOrder = async (payload) => {
    try {
        const res = await fetch(`${API_URL}/orders/send-mail`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        if (res.status !== 204) {
            throw new Error("Error al enviar el correo de compra");
        }

        return true;
    } catch (err) {
        console.log(err.message);
        throw err;
    }
};

export default { sendOrder };