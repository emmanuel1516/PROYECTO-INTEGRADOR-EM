import { Text } from "@/components/texts";
import AppContext from "@/contexts/AppContext";
import { useContext, useEffect, useState } from "react";
import ProductItem from "../product-item/ProductItem";
import ProductNewItem from "../product-new-item/ProductNewItem";
import SearchProduct from "../search-product/SearchProduct";
import "./product-gallery.scss";

const ProductGallery = () => {
    const { productsContext } = useContext(AppContext);
    const { products, isLoading } = productsContext;
    const [ searchQuery, setSearchQuery ] = useState("");
    const [ filteredProducts, setFilteredProducts ] = useState(products);
    const [ debouncedQuery, setDebouncedQuery ] = useState(searchQuery);

    useEffect(() => {
        const timeoutId = setTimeout(() => setDebouncedQuery(searchQuery), 250);
        return () => clearTimeout(timeoutId);
    }, [searchQuery]);

    useEffect(() => {
        const normalizedQuery = debouncedQuery.trim().toLowerCase();

        if (!normalizedQuery) {
            setFilteredProducts(products);
            return;
        }

        const matchingProducts = products.filter((product) => {
            const productName = (product.name ?? "").toLowerCase();
            const productDescription = (product.description ?? "").toLowerCase();
            const productTags = Array.isArray(product.tags)
                ? product.tags.join(" ").toLowerCase()
                : (product.tags ?? "").toLowerCase();
            const productCategory = (product.category ?? "").toLowerCase();

            return (
                productName.includes(normalizedQuery) ||
        productDescription.includes(normalizedQuery) ||
        productTags.includes(normalizedQuery) ||
        productCategory.includes(normalizedQuery)
            );
        });

        setFilteredProducts(matchingProducts);
    }, [ debouncedQuery, products ]);

    const hasActiveQuery = debouncedQuery.trim().length > 0;

    return (

        <div className="product-gallery">
            <SearchProduct onChange={setSearchQuery} />
            <div className="product-gallery__content">
                <ProductNewItem />
                {!isLoading && hasActiveQuery && filteredProducts.length === 0 && (
                    <div className="product-gallery__empty">
                        <Text variant="p">No se encontraron resultados.</Text>
                    </div>
                )}

                {filteredProducts.map((product) => (
                    <ProductItem
                        className="product-gallery__card"
                        key={product.id}
                        product={product}
                        isLoading={isLoading}/>
                ))}

            </div>
        </div>
    );
};

export default ProductGallery;