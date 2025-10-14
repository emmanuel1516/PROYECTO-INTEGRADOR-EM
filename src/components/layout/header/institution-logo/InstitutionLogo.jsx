
import { Text } from "@/components/texts";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./institution-logo.scss";
import { item } from "./institutional-logo.config.js";

const InstitutionLogo = (props) => {
    const { className, ...restProps } = props;
    const classes = `institution-logo ${className ?? ""}`;

    return (
        <div className={classes} {...restProps}>
            <Link to={item.path} className="institution-logo__link">
                <img className="institution-logo__logo" src={"/images/logo.png"} alt="Logo de la institución"/>
                <Text className="institution-logo__title" variant="h1">SneakerZone</Text>
            </Link>
        </div>
    );
};

InstitutionLogo.propTypes = {
    className: PropTypes.string,
};

export default InstitutionLogo;