
import { Text } from "@/components/texts";
import AppContext from "@/contexts/AppContext";
import { useContext } from "react";
import ConsumerForm from "./consumer-form/ConsumerForm";
import ProductsTable from "./products-table/ProductsTable";
import "./shopping-cart.scss";

const ShoppingCart = () => {
    const { shoppingCartContext } = useContext(AppContext);
    const { shoppingCart, addArticle, subtractArticle, clearCart } = shoppingCartContext;

    const handleClear = () => {
        clearCart();
    };

    return (
        <div className="shopping-cart">
            <Text variant="h2">Carrito</Text>
            <ProductsTable
                articles={shoppingCart.articles}
                addArticle={addArticle}
                subtractArticle={subtractArticle}
                totalAmount={shoppingCart.totalAmount}/>
            <ConsumerForm
                onCancel={handleClear}
                articles={shoppingCart.articles}/>

        </div>
    );
};

export default ShoppingCart;