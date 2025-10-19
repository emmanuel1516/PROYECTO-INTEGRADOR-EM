import { isValidId } from "../config/mongoose.config.js";
import ProductModel from "../models/product.model.js";
import ErrorService from "./error.service.js";
import cloudinary from "../config/cloudinary.config.js";
import { uploadToCloudinary } from "../utils/uploader.js";

const toBool = (val) => {
    if (typeof val === "boolean") return val;
    if (typeof val === "number") return val === 1;
    const s = String(val ?? "").toLowerCase();
    return s === "true" || s === "1" || s === "on";
};

export default class ProductService {
    #productModel = ProductModel;

    async #getById(id) {
        if (!isValidId(id)) {
            throw new ErrorService("ID inválido", ErrorService.errorCode.BAD_REQUEST);
        }
        const product = await this.#productModel.findById(id);
        if (!product) {
            throw new ErrorService("ID no encontrado", ErrorService.errorCode.NOT_FOUND);
        }
        return product;
    }

    async findAll(filters = {}) {
        const q = {};
        if (filters.name) q.name = { $regex: filters.name, $options: "i" };
        if (filters.highlighted !== undefined) q.highlighted = filters.highlighted;
        if (filters.slider !== undefined) q.slider = filters.slider;
        return this.#productModel.find(q);
    }

    async findById(id) {
        return this.#getById(id);
    }

    async create(values, file) {
        let thumbnail = "default.jpg";
        let public_id = null;

        if (file) {
            try {
                const result = await uploadToCloudinary(file); // <- named import
                console.log("CLOUDINARY OK:", result.secure_url, result.public_id);
                thumbnail = result.secure_url;
                public_id = result.public_id;
            } catch (e) {
                console.error("Cloudinary upload error:", e?.message, e?.http_code, e?.name);
                throw e; // deja que lo capture el controller y devuelva 500 con mensaje útil
            }
        }

        const product = new this.#productModel({
            name: values.name,
            description: values.description,
            price: Number(values.price),
            stock: Number(values.stock),
            thumbnail,
            public_id,
            highlighted: toBool(values.highlighted),
            slider: toBool(values.slider),
        });

        return product.save();
    }

    async update(id, values, file) {
        const product = await this.#getById(id);

        if (values.name) product.name = values.name;
        if (values.description !== undefined) product.description = values.description;
        if (values.price !== undefined) product.price = Number(values.price);
        if (values.stock !== undefined) product.stock = Number(values.stock);
        if ("highlighted" in values) product.highlighted = toBool(values.highlighted);
        if ("slider" in values) product.slider = toBool(values.slider);

        if (file) {
            if (product.public_id) {
                await cloudinary.uploader.destroy(product.public_id);
            }
            const result = await uploadToCloudinary(file);
            product.thumbnail = result.secure_url;
            product.public_id = result.public_id;
        }

        return product.save();
    }

    async delete(id) {
        const product = await this.#getById(id);

        if (product.public_id) {
            await cloudinary.uploader.destroy(product.public_id);
        }

        await this.#productModel.findByIdAndDelete(id);
    }
}