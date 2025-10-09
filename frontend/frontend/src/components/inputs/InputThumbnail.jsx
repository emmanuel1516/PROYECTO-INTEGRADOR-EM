import PropTypes from "prop-types";
import Input from "./Input";

const InputThumbnail = (props) => {
    const {
        formik,
        maxLength = 25,
        ...restProps
    } = props;

    return (
        <Input
            type="text"
            id="thumbnail"
            name="thumbnail"
            label="Imagen"
            value={formik.values.thumbnail}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.thumbnail && Boolean(formik.errors.thumbnail)}
            helperText={formik.touched.thumbnail && formik.errors.thumbnail}
            inputProps={{ maxLength }}
            {...restProps}/>
    );
};

InputThumbnail.propTypes = {
    formik: PropTypes.shape({
        values: PropTypes.shape({ thumbnail: PropTypes.string.isRequired }).isRequired,
        handleChange: PropTypes.func.isRequired,
        handleBlur: PropTypes.func.isRequired,
        touched: PropTypes.shape({ thumbnail: PropTypes.bool }).isRequired,
        errors: PropTypes.shape({ thumbnail: PropTypes.string }).isRequired,
    }).isRequired,
    maxLength: PropTypes.number,
};

export default InputThumbnail;