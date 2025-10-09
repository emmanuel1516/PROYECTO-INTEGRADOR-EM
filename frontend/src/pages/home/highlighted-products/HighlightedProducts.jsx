import AppContext from "@/contexts/AppContext";
import { useContext } from "react";
import HighlightedProductCard from "../highlighted-product-card/HighlightedProductCard";
import "./highlighted-products.scss";

const HighlightedProducts = () => {
    const { productsContext } = useContext(AppContext);
    const { products, isLoading } = productsContext;

    const highlightedProducts = products.filter((p) => p.highlighted);

    return (
        <div className="highlighted-products">
            {highlightedProducts.map((product) => (
                <HighlightedProductCard
                    className="highlighted-products__card"
                    key={product.id}
                    product={product}
                    isLoading={isLoading}/>
            ))}
        </div>
    );
};

export default HighlightedProducts;