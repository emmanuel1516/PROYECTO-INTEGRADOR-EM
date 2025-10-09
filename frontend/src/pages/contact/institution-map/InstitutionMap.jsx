import PropTypes from "prop-types";
import "./institution-map.scss";

const InstitutionMap = ({
    query = "Av. Siempre Viva 742, Springfield",
    height = 320,
    title = "Ubicación de la institución",
}) => {
    const src = `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
    return (
        <div className="institution-map" style={{ borderRadius: 12, overflow: "hidden", border: "1px solid #e5e5e5" }}>
            <iframe
                title={title}
                src={src}
                width="100%"
                height={height}
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"/>
        </div>
    );
};

InstitutionMap.propTypes = {
    query: PropTypes.string,
    height: PropTypes.number,
    title: PropTypes.string,
};

export default InstitutionMap;