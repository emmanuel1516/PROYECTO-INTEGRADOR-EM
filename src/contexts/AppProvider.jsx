import PropTypes from "prop-types";
import AppContext from "./AppContext";
import { useProduct } from "@/hooks/useProduct";
import { useShoppingCart } from "@/hooks/useShoppingCart";
import { useInstitution } from "@/hooks/useInstitution";

const AppProvider = (props) => {
    const { children } = props;
    const institutionContext = useInstitution();
    const productsContext = useProduct();
    const shoppingCartContext = useShoppingCart();

    return (
        <AppContext.Provider
            value={{
                productsContext,
                shoppingCartContext,
                institutionContext,
            }}>
            {children}
        </AppContext.Provider>
    );
};

AppProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AppProvider;