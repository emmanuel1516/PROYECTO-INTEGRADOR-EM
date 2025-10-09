import { Text } from "@/components/texts";
import HighlightedProducts from "./highlighted-products/HighlightedProducts";
import "./home.scss";
import ProductsSlider from "./products-slider/ProductsSlider";

const Home = () => {
    return (
        <div className="home">
            <Text variant="h2">Inicio</Text>
            <div className="home__slider-content">
                <ProductsSlider/>
            </div>
            <div className="home__highlighted-content">
                <Text variant="h3">Productos Destacados</Text>
                <HighlightedProducts/>
            </div>
            
        </div>
    );
};

export default Home;