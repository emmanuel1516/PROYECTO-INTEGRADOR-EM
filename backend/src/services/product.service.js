import { isValidId } from "../config/mongoose.config.js";
import ProductModel from "../models/product.model.js";
import { deleteImageFile, existsImageFile } from "../utils/imageFileHandler.js";
import paths from "../utils/paths.js";
import ErrorService from "./error.service.js";

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
        console.log(product);

        if (!product) {
            throw new ErrorService("ID no encontrado", ErrorService.errorCode.NOT_FOUND);
        }

        return product;
    }

    async findAll(filters = {}) {
        const queryFilters = {};

        if (filters.name) queryFilters.name = { $regex: filters.name, $options: "i" };
        if (filters.highlighted) queryFilters.highlighted = filters.highlighted;
        if (filters.slider) queryFilters.slider = filters.slider;

        return await this.#productModel.find(queryFilters);
    }

    async findById(id) {
        return await this.#getById(id);
    }

    async create(values, file) {
        const product = new ProductModel({
            name: values.name,
            description: values.description,
            price: Number(values.price),
            stock: Number(values.stock),
            thumbnail: file ? file.filename : "default.jpg",
            highlighted: toBool(values.highlighted),
            slider: toBool(values.slider),
        });

        return await product.save();
    }

    async update(id, values, file) {
        const product = await this.#getById(id);

        if (values.name) product.name = values.name;
        if (values.description) product.description = values.description;
        if (values.price) product.price = values.price;
        if (values.stock) product.stock = values.stock;
        if ("highlighted" in values) {
            product.highlighted = toBool(values.highlighted);
        }
        if ("slider" in values) {
            const next = toBool(values.slider);
            product.slider = next;
        }

        console.log("Hola 1", file && (file.filename !== product.thumbnail));
        console.log(file);
        if (file && (file.filename !== product.thumbnail)) {
            console.log("Entró 1", product.thumbnail && product.thumbnail !== "default.jpg"
                && await existsImageFile(paths.imageProducts, product.thumbnail));
            if (product.thumbnail && product.thumbnail !== "default.jpg"
                && await existsImageFile(paths.imageProducts, product.thumbnail)) {
                console.log("Entró 2");
                await deleteImageFile(paths.imageProducts, product.thumbnail);
            }
            product.thumbnail = file.filename;
        }

        return await product.save();
    }

    async delete(id) {
        const product = await this.#getById(id);

        if (product.thumbnail && product.thumbnail !== "default.jpg"
            && await existsImageFile(paths.imageProducts, product.thumbnail)) {
            await deleteImageFile(paths.imageProducts, product.thumbnail);
        }

        await this.#productModel.findByIdAndDelete(id);
    }
}