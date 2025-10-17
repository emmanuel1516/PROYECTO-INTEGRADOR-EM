
import { Checkbox, FormControl, FormControlLabel, FormHelperText } from "@mui/material";
import PropTypes from "prop-types";
import "./input.scss";

const InputHighlighted = (props) => {
    const {
        formik,
        name = "highlighted",
        id,
        label = "Destacado",
        className,
        ...restProps
    } = props;

    const inputId = id || name;
    const touched = formik.touched?.[name];
    const errorMsg = formik.errors?.[name];
    const error = Boolean(touched && errorMsg);

    const classes = `input ${error ? "input--invalid" : "input--valid"} ${className ?? ""}`;

    const handleChange = (e) => {
        formik.setFieldValue(name, e.target.checked);
    };

    return (
        <FormControl fullWidth className={classes}>
            <FormControlLabel
                control={
                    <Checkbox
                        id={inputId}
                        name={name}
                        checked={Boolean(formik.values?.[name])}
                        onChange={handleChange}
                        onBlur={formik.handleBlur}
                        {...restProps} />
                }
                label={label} />
            {touched && errorMsg && (
                <FormHelperText className="input__helper-text" error={error}>
                    {errorMsg}
                </FormHelperText>
            )}
        </FormControl>
    );
};

InputHighlighted.propTypes = {
    formik: PropTypes.shape({
        values: PropTypes.shape({
            highlighted: PropTypes.bool.isRequired,
        }).isRequired,
        setFieldValue: PropTypes.func.isRequired,
        handleBlur: PropTypes.func.isRequired,
        touched: PropTypes.shape({
            highlighted: PropTypes.bool,
        }),
        errors: PropTypes.shape({
            highlighted: PropTypes.oneOfType([ PropTypes.string, PropTypes.bool ]),
        }),
    }).isRequired,
    name: PropTypes.string,
    id: PropTypes.string,
    label: PropTypes.string,
    className: PropTypes.string,
};

export default InputHighlighted;