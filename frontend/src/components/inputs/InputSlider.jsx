import PropTypes from "prop-types";
import Input from "./Input";

const InputSlider = (props) => {
    const { formik, ...restProps } = props;

    const handleChange = (e) => {
        formik.setFieldValue("slider", e.target.checked);
    };

    return (
        <Input
            type="checkbox"
            id="slider"
            name="slider"
            label="Slider"
            checked={formik.values.slider}
            onChange={handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.slider && Boolean(formik.errors.slider)}
            helperText={formik.touched.slider && formik.errors.slider}
            {...restProps} />
    );
};

InputSlider.propTypes = {
    formik: PropTypes.shape({
        values: PropTypes.shape({ slider: PropTypes.bool.isRequired }).isRequired,
        handleChange: PropTypes.func.isRequired,
        setFieldValue: PropTypes.func.isRequired,
        handleBlur: PropTypes.func.isRequired,
        touched: PropTypes.shape({ slider: PropTypes.bool }),
        errors: PropTypes.shape({ slider: PropTypes.oneOfType([ PropTypes.string, PropTypes.bool ]) }),
    }).isRequired,
};

export default InputSlider;