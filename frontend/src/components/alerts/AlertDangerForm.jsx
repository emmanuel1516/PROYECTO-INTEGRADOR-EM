import PropTypes from "prop-types";
import AlertDanger from "./AlertDanger";

const AlertDangerForm = (props) => {
    const { open, message, className, ...restProps } = props;
    const classes = `alert--danger-form ${className ?? ""}`;

    return (
        <AlertDanger
            className={classes}
            open={open}
            message={message}
            variant="danger"
            {...restProps}/>
    );
};

AlertDangerForm.propTypes = {
    open: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
    className: PropTypes.string,
};

export default AlertDangerForm;