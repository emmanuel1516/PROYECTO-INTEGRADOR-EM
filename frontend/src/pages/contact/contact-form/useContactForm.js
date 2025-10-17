import AppContext from "@/contexts/AppContext.js";
import { useFormik } from "formik";
import { useContext } from "react";
import { initialValues } from "./contact-form.initial-value.js";
import { validationSchema } from "./contact-form.validation-schema.js";

const useContactForm = () => {
    const { inquiryContext } = useContext(AppContext);
    const { sendInquiry, isLoading, success, error } = inquiryContext;

    const formik = useFormik({
        initialValues,
        validationSchema,
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: async (values) => {
            await sendInquiry(values);
            formik.resetForm();
        },
    });

    const isSubmitDisabled = () => {
        return isLoading
            || !formik.values.name
            || !formik.values.surname
            || !formik.values.email
            || formik.values.phone?.length < 8
            || formik.values.phone?.length > 15
            || !formik.values.inquiry
            || formik.values.inquiry?.length < 10
            || !formik.isValid;
    };

    return {
        formik,
        isSubmitDisabled,
        isLoading,
        success,
        error,
    };

};
export default useContactForm;