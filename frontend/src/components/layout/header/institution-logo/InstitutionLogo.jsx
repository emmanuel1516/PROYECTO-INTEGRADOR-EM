
import { Text } from "@/components/texts";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./institution-logo.scss";
import { item } from "./institutional-logo.config.js";
import { API_URL_IMAGES } from "@/constants/api.constant";
import { useContext } from "react";
import AppContext from "@/contexts/AppContext";

const InstitutionLogo = (props) => {
    const { className, ...restProps } = props;
    const classes = `institution-logo ${className ?? ""}`;
    const { institutionContext } = useContext(AppContext);
    const { institution } = institutionContext;
    const logo = institution?.logo;

    return (
        <div className={classes} {...restProps}>
            <Link to={item.path} className="institution-logo__link">
                {logo ? (
                    <img className="institution-logo__logo" src={`${API_URL_IMAGES}/${logo}`} alt="Logo de la institución"/>
                ) : (
                    <div className="institution-logo__placeholder" aria-hidden="true" />
                )}
                <Text className="institution-logo__title" variant="h1">SneakerZone</Text>
            </Link>
        </div>
    );
};

InstitutionLogo.propTypes = {
    className: PropTypes.string,
};

export default InstitutionLogo;