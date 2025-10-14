import { useFormik } from "formik";

const useSearchProduct = ({ onSearch }) => {
    const formik = useFormik({
        initialValues: { search: "" },
        onSubmit: (values) => {
            const term = (values.search || "").trim();
            onSearch?.(term);
        },
    });

    const handleChange = (e) => {
        formik.handleChange(e);
        const val = e.target.value;
        onSearch?.(val);
    };

    const handleClear = () => {
        formik.setFieldValue("search", "");
        onSearch?.("");
    };

    return {
        formik,
        handleChange,
        handleClear,
    };
};

export default useSearchProduct;