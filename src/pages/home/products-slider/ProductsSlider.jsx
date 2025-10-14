import AppContext from "@/contexts/AppContext";
import { useContext, useState } from "react";
import ProductsSliderItem from "../products-slider-item/ProductsSliderItem";
import "./products-slider.scss";

const ProductsSlider = () => {
    const { productsContext } = useContext(AppContext);
    const { products, isLoading } = productsContext;
    const slides = products.filter((item) => item.slider);


    const [index, setIndex] = useState(0);

    const next = () => setIndex((i) => (i + 1) % slides.length);
    const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);

    if (!slides.length) return null;

    return (
        <div className="products-slider">
            <div className="products-slider__slides">
                {slides.map((product) => (
                    <ProductsSliderItem
                        className="products-slider__item"
                        key={product.id}
                         product={product}
                        isLoading={isLoading}
                    />
                ))}
            </div>
            
        </div>
    );
};

export default ProductsSlider;