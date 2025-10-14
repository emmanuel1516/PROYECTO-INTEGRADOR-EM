import React, { useContext } from "react";
import "./values.scss";
import { Text } from "@/components/texts";
import AppContext from "@/contexts/AppContext";

const Values = () => {
    const { institutionContext } = useContext(AppContext);
    const { institution } = institutionContext;
    return (
        <section className="values">
            <img className="values__image" src={institution.about.values.image} alt="Imagen de los valores de la empresa"/>
            <div className="values__content">
                <Text className="values__title" variant="h3">Valores</Text>
                <div
                    className="values__description"
                    dangerouslySetInnerHTML={{ __html: institution.about.values.description }}>
                </div>
            </div>
        </section>
    );
};

export default Values;