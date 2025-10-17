import { Text } from "@/components/texts";
import { API_URL_IMAGES } from "@/constants/api.constant";
import AppContext from "@/contexts/AppContext";
import { useContext } from "react";
import "./values.scss";

const Values = () => {
    const { institutionContext } = useContext(AppContext);
    const { institution } = institutionContext;
    const values = institution?.values;

    return (
        <section className="values">
            {values?.description && values?.image && (
                <>
                    <img
                        className="values__image"
                        src={`${API_URL_IMAGES}/institutions/${values.image}`}
                        alt="Imagen de los valores de la empresa"/>
                    <div className="values__content">
                        <Text className="values__title" variant="h3">Valores</Text>
                        <div
                            className="values__description"
                            dangerouslySetInnerHTML={{ __html: values.description }}>
                        </div>
                    </div>
                </>
            )}
        </section>
    );
};

export default Values;