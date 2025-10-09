import PropTypes from "prop-types";
import Alert from "./Alert";

const AlertSuccess = (props) => {
    const { open, message, className, ...restProps } = props;

    return (
        <Alert
            open={open}
            message={message}
            variant="success"
            className={className}
            {...restProps}/>
    );
};

AlertSuccess.propTypes = {
    open: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
    className: PropTypes.string,
};

export default AlertSuccess;