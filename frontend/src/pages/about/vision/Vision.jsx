import { Text } from "@/components/texts";
import { API_URL_IMAGES } from "@/constants/api.constant";
import AppContext from "@/contexts/AppContext";
import { useContext } from "react";
import "./vision.scss";

const Vision = () => {
    const { institutionContext } = useContext(AppContext);
    const { institution } = institutionContext;
    const vision = institution?.vision;

    return (
        <section className="vision">
            {vision?.description && vision?.image && (
                <>
                    <img
                        className="vision__image"
                        src={`${API_URL_IMAGES}/institutions/${vision.image}`}
                        alt="Imagen de la visión de la empresa"/>
                    <div className="vision__content">
                        <Text className="vision__title" variant="h3">Visión</Text>
                        <Text className="vision__description" variant="p">{vision.description}</Text>
                    </div>
                </>
            )}
        </section>
    );
};

export default Vision;