import ErrorService from "../services/error.service.js";
import ProductService from "../services/product.service.js";
import { validateCreateProduct, validateProductFilters, validateUpdateProduct } from "../validators/product.validator.js";

export default class ProductController {
    #productService;

    constructor() {
        this.#productService = new ProductService();
    }

    async findAll(req, res) {
        try {
            const filters = validateProductFilters(req.query);
            const products = await this.#productService.findAll(filters);

            res.status(200).json({ status: "success", payload: products });
        } catch (error) {
            const handledError = ErrorService.handleError(error);
            res.status(handledError.code).json({ status: "error", message: handledError.message });
        }
    }

    async findById(req, res) {
        try {
            const { id } = req.params;
            const product = await this.#productService.findById(id);

            res.status(200).json({ status: "success", payload: product });
        } catch (error) {
            const handledError = ErrorService.handleError(error);
            res.status(handledError.code).json({ status: "error", message: handledError.message });
        }
    }
    async create(req, res) {
        try {
            console.log("BODY:", req.body);
            console.log("FILE:", !!req.file, req.file?.mimetype, req.file?.originalname, req.file?.size);
            const values = validateCreateProduct(req.body);
            const product = await this.#productService.create(values, req.file);
            res.status(201).json({ status: "success", payload: product });
        } catch (error) {
            console.error("CREATE /products error:", error?.message, error?.http_code, error?.name);
            const handled = ErrorService.handleError(error);
            res.status(handled.code).json({ status: "error", message: handled.message });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const values = validateUpdateProduct(req.body);
            const product = await this.#productService.update(id, values, req.file);
            res.status(200).json({ status: "success", payload: product });
        } catch (error) {
            const handled = ErrorService.handleError(error);
            res.status(handled.code).json({ status: "error", message: handled.message });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            await this.#productService.delete(id);
            res.status(200).json({ status: "success" });
        } catch (error) {
            const handled = ErrorService.handleError(error);
            res.status(handled.code).json({ status: "error", message: handled.message });
        }
    }
}