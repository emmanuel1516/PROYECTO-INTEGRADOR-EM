import { API_URL_IMAGES } from "@/constants/api.constant.js";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import "./input.scss";

const InputImage = (props) => {
    const { isProduct = false, formik, ...restProps } = props;

    const [ inputConfig, setInputConfig ] = useState({
        label: "Imagen",
        src: `${API_URL_IMAGES}/default.jpg`,
        alt: "Imagen por defecto",
    });

    const blobUrlRef = useRef(null);

    useEffect(() => {
        if (!isProduct) return;

        if (formik.values.image instanceof File) {
            if (blobUrlRef.current) {
                URL.revokeObjectURL(blobUrlRef.current);
                blobUrlRef.current = null;
            }
            const url = URL.createObjectURL(formik.values.image);
            blobUrlRef.current = url;

            setInputConfig((prev) => ({
                ...prev,
                src: url,
                alt: "Imagen del producto",
            }));
            return;
        }

        const thumbnail = formik.values.thumbnail || "default.jpg";
        const isDefault = thumbnail === "default.jpg";
        const src = isDefault
            ? `${API_URL_IMAGES}/default.jpg`
            : `${thumbnail}`;

        setInputConfig((prev) => ({
            ...prev,
            src,
            alt: isDefault ? "Imagen por defecto" : "Imagen del producto",
        }));
    }, [ isProduct, formik.values.thumbnail, formik.values.image ]);

    useEffect(() => {
        return () => {
            if (blobUrlRef.current) {
                URL.revokeObjectURL(blobUrlRef.current);
                blobUrlRef.current = null;
            }
        };
    }, []);

    const handleChange = (event) => {
        const file = event.currentTarget.files[0];

        if (file) {
            formik.setFieldValue("image", file);
            formik.setFieldValue("thumbnail", formik.values.thumbnail || file.name);
        }
    };

    return (
        <div className="input">
            <div className="input__image">
                <label
                    htmlFor="image">
                    {inputConfig.label}
                </label>
                <img
                    src={inputConfig.src}
                    alt={inputConfig.alt}></img>
            </div>

            <input
                className="input__image-field"
                type="file"
                accept="image/*"
                id="image"
                name="image"
                onChange={handleChange}
                onBlur={formik.handleBlur}
                {...restProps} />

            {formik.touched.thumbnail && formik.errors.thumbnail && (
                <span className="input__error">{formik.errors.thumbnail}</span>
            )}
        </div>
    );
};

InputImage.propTypes = {
    isProduct: PropTypes.bool,
    formik: PropTypes.shape({
        values: PropTypes.shape({
            image: PropTypes.oneOfType([ PropTypes.object, PropTypes.string ]),
            thumbnail: PropTypes.string,
        }).isRequired,
        setFieldValue: PropTypes.func.isRequired,
        handleBlur: PropTypes.func.isRequired,
        touched: PropTypes.shape({
            image: PropTypes.oneOfType([ PropTypes.bool, PropTypes.object ]),
            thumbnail: PropTypes.oneOfType([ PropTypes.bool, PropTypes.object ]),
        }).isRequired,
        errors: PropTypes.shape({
            image: PropTypes.string,
            thumbnail: PropTypes.string,
        }).isRequired,
    }).isRequired,
};

export default InputImage;