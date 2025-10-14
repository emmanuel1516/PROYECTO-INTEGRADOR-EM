import { useContext } from "react";
import "./vision.scss";
import { Text } from "@/components/texts";
import AppContext from "@/contexts/AppContext";

const Vision = () => {
    const { institutionContext } = useContext(AppContext);
    const { institution } = institutionContext;

    return (
        <section className="vision">
            <img className="vision__image" src={institution.about.vision.image} alt="Imagen de la visión de la empresa"/>
            <div className="vision__content">
                <Text className="vision__title" variant="h3">Visión</Text>
                <Text className="vision__description" variant="p">{institution.about.vision.description}</Text>
            </div>
        </section>
    );
};

export default Vision;