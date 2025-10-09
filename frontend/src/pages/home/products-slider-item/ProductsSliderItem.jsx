import { Skeleton } from "@/components/skeleton";
import { Card as MuiCard } from "@mui/material";
import PropTypes from "prop-types";
import "./products-slider-item.scss";

const ProductsSliderItem = (props) => {
    const {
        product,
        isLoading,
        className,
        ...restProps
    } = props;

     const classes = `products-slider-item ${className ?? ""}`;


    return (

        <MuiCard className={classes} {...restProps}>
            <Skeleton className="products-slider-item__image--skeleton" isLoading={isLoading}>
                <img
                    className="products-slider-item__image"
                    src={`/images/products/${product.thumbnail}`}
                    alt="Imagen del producto"/>
            </Skeleton>
            <p className="products-slider-item__label">20% OFF en lanzamientos</p>
        </MuiCard>
    );
};

ProductsSliderItem.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        stock: PropTypes.number.isRequired,
        thumbnail: PropTypes.string.isRequired,
    }),
    isLoading: PropTypes.bool.isRequired,
    className: PropTypes.string,
};

export default ProductsSliderItem;