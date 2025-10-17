import { API_URL } from "@/constants/api.constant.js";

const fetchInstitution = async () => {
    try {
        const response = await fetch(`${API_URL}/institutions/first`);
        const data = await response.json();

        if (response.status != 200) {
            throw new Error("Error al obtener la institución");
        }

        const institution = data.payload;
        return institution;
    } catch (error) {
        console.log(error.message);
        throw error;
    }
};

export default {
    fetchInstitution,
};