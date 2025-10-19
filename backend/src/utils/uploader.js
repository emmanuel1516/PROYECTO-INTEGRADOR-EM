import multer from "multer";
import cloudinary from "../config/cloudinary.config.js";
import { generateNameForFile } from "./random.js";

// Usamos almacenamiento en memoria (no en disco)
const storage = multer.memoryStorage();
const uploader = multer({ storage });

export default uploader;

// Subida a Cloudinary
export const uploadToCloudinary = async (file, folder = "products") => {
    if (!file) throw new Error("No se recibió archivo para subir.");
    const filename = generateNameForFile(file.originalname);

    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                folder,
                id: filename.split(".")[0],
                resource: "image",
            },
            (error, result) => {
                if (error) reject(error);
                else resolve(result);
            },
        );

        stream.end(file.buffer); // sube desde memoria
    });
};