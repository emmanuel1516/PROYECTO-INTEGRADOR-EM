import React, { useContext } from "react";
import "./mission.scss";
import { Text } from "@/components/texts";
import AppContext from "@/contexts/AppContext";

const Mission = () => {
    const { institutionContext } = useContext(AppContext);
    const { institution } = institutionContext;
    return (
        <section className="mission">
            <img className="mission__image" src={institution.about.mission.image} alt="Imagen de la misión de la empresa"/>
            <div className="mission__content">
                <Text className="mission__title" variant="h3">Misión</Text>
                <Text className="mission__description" variant="p">{institution.about.mission.description}</Text>
            </div>
        </section>
    );
};

export default Mission;