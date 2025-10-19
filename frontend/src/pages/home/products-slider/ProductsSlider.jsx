import AppContext from "@/contexts/AppContext";
import { useContext } from "react";
import ProductsSliderItem from "../products-slider-item/ProductsSliderItem";
import "./products-slider.scss";
import Carousel from "react-bootstrap/Carousel";

const ProductsSlider = () => {
    const { productsContext } = useContext(AppContext);
    const { products, isLoading } = productsContext;
    const slides = products.filter((item) => item.slider);

    if (!slides.length) return null;

    return (
        <>
            <div className="products-slider">
                <div className="products-slider__slides">
                    <Carousel data-bs-theme="dark">
                        {slides.map((product) => (
                            <Carousel.Item key={product.id}>
                                <ProductsSliderItem
                                    className="products-slider__item"
                                    product={product}
                                    isLoading={isLoading} />
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </div>
            </div>
            {/* <div className="products-slider">
                <div className="products-slider__slides">
                    {slides.map((product) => (
                        <ProductsSliderItem
                            className="products-slider__item"
                            key={product.id}
                            product={product}
                            isLoading={isLoading}/>
                    ))}
                </div>

            </div> */}
        </>
    );
};

export default ProductsSlider;