
import { useFormik } from "formik";
import { useState } from "react";
import { initialValues } from "./consumer-form.initial-value.js";
import { validationSchema } from "./consumer-form.validation-schema.js";

const useConsumerForm = ({ onBuy }) => {
    const [ submitError, setSubmitError ] = useState(null);

    const formik = useFormik({
        initialValues,
        validationSchema,
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: async (values, helpers) => {
            setSubmitError(null);
            helpers.setSubmitting(true);
            try {
                const ok = await onBuy?.(values);
                if (ok) helpers.resetForm();
            } catch (err) {
                setSubmitError(err?.message || "Error al procesar la compra");
            } finally {
                helpers.setSubmitting(false);
            }
        },
    });

    const isSubmitDisabled = () => !formik.isValid || formik.isSubmitting;

    return {
        formik,
        isSubmitDisabled,
        submitError,
    };
};

export default useConsumerForm;