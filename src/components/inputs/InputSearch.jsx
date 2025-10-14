// @/components/inputs/InputSearch.jsx
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton, InputAdornment } from "@mui/material";
import PropTypes from "prop-types";
import Input from "./Input";

const InputSearch = (props) => {
    const {
        formik,
        id = "search",
        name = "search",
        label = "Buscar",
        placeholder = "Buscar por nombre, descripción o tag…",
        autoFocus = false,
        onClear,
        ...restProps
    } = props;

    const value = formik.values?.[name] ?? "";

    const handleChange = (e) => {
        formik.handleChange(e);
    };

    const handleBlur = (e) => {
        formik.handleBlur(e);
    };

    const handleClear = () => {
        formik.setFieldValue(name, "");
        onClear?.();
    };

    return (
        <Input
            type="search"
            id={id}
            name={name}
            label={label}
            placeholder={placeholder}
            autoComplete="off"
            autoFocus={autoFocus}
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
            error={formik.touched?.[name] && Boolean(formik.errors?.[name])}
            helperText={formik.touched?.[name] && formik.errors?.[name]}
            startAdornment={
                <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                </InputAdornment>
            }
            endAdornment={
                value ? (
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="Limpiar búsqueda"
                            size="small"
                            edge="end"
                            onClick={handleClear}
                            tabIndex={-1}>
                            <ClearIcon fontSize="small" />
                        </IconButton>
                    </InputAdornment>
                ) : null
            }
            {...restProps}/>
    );
};

InputSearch.propTypes = {
    formik: PropTypes.shape({
        values: PropTypes.shape({
            search: PropTypes.string.isRequired,
        }).isRequired,
        handleChange: PropTypes.func.isRequired,
        handleBlur: PropTypes.func.isRequired,
        setFieldValue: PropTypes.func.isRequired,
        touched: PropTypes.shape({
            search: PropTypes.bool,
        }).isRequired,
        errors: PropTypes.shape({
            search: PropTypes.string,
        }).isRequired,
    }).isRequired,
    id: PropTypes.string,
    name: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    autoFocus: PropTypes.bool,
    onClear: PropTypes.func,
};

export default InputSearch;