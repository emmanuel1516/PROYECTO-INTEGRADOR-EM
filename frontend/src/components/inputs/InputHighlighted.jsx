import PropTypes from "prop-types";
import Input from "./Input";

const InputHighlighted = (props) => {
    const { formik, ...restProps } = props;

    const handleChange = (e) => {
        formik.setFieldValue("highlighted", e.target.checked);
    };

    return (
        <Input
            type="checkbox"
            id="highlighted"
            name="highlighted"
            label="Destacado"
            checked={formik.values.highlighted}
            onChange={handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.highlighted && Boolean(formik.errors.highlighted)}
            helperText={formik.touched.highlighted && formik.errors.highlighted}
            {...restProps} />
    );
};

InputHighlighted.propTypes = {
    formik: PropTypes.shape({
        values: PropTypes.shape({ highlighted: PropTypes.bool.isRequired }).isRequired,
        handleChange: PropTypes.func.isRequired,
        setFieldValue: PropTypes.func.isRequired,
        handleBlur: PropTypes.func.isRequired,
        touched: PropTypes.shape({ highlighted: PropTypes.bool }),
        errors: PropTypes.shape({ highlighted: PropTypes.oneOfType([ PropTypes.string, PropTypes.bool ]) }),
    }).isRequired,
};

export default InputHighlighted;