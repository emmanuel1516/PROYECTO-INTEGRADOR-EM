import { API_URL } from "@/constants/api.constant.js";

const mapProduct = (product) => {
    const { _id, ...rest } = product;
    return { id: _id, ...rest };
};

const fetchProducts = async (filters) => {
    try {
        const params = new URLSearchParams(filters).toString();
        const url = params ? `${API_URL}/products?${params}` : `${API_URL}/products`;

        const response = await fetch(url);
        const data = await response.json();

        return data.payload.map(mapProduct);
    } catch (error) {
        console.log(error.message);
        throw error;
    }
};

const fetchProductById = async (id) => {
    try {
        const response = await fetch(`${API_URL}/products/${id}`);
        const data = await response.json();

        return mapProduct(data.payload);
    } catch (error) {
        console.log(error.message);
        throw error;
    }
};

const createProduct = async (values) => {
    try {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("description", values.description);
        formData.append("price", values.price);
        formData.append("stock", values.stock);
        formData.append("highlighted", values.highlighted || false);

        if (values.image instanceof File) {
            formData.append("image", values.image);
        }

        const options = {
            method: "POST",
            body: formData,
        };

        const response = await fetch(`${API_URL}/products`, options);
        const data = await response.json();

        return mapProduct(data.payload);
    } catch (error) {
        console.log(error.message);
        throw error;
    }
};

const updateProduct = async (id, values) => {
    try {
        const formData = new FormData();
        if (values.name) formData.append("name", values.name);
        if (values.description !== undefined) formData.append("description", values.description);
        if (values.price) formData.append("price", values.price);
        if (values.stock !== undefined) formData.append("stock", values.stock);
        if (values.highlighted !== undefined) formData.append("highlighted", values.highlighted);

        if (values.image instanceof File) {
            formData.append("image", values.image);
        }

        const options = {
            method: "PUT",
            body: formData,
        };

        const response = await fetch(`${API_URL}/products/${id}`, options);
        const data = await response.json();

        return mapProduct(data.payload);
    } catch (error) {
        console.log(error.message);
        throw error;
    }
};

const removeProduct = async (id) => {
    try {
        const options = {
            method: "DELETE",
        };

        await fetch(`${API_URL}/products/${id}`, options);
    } catch (error) {
        console.log(error.message);
        throw error;
    }
};

export default {
    fetchProducts,
    fetchProductById,
    createProduct,
    updateProduct,
    removeProduct,
};