import { Skeleton } from "@/components/skeleton";
import { Text } from "@/components/texts";
import { Card as MuiCard } from "@mui/material";
import PropTypes from "prop-types";
import "./highlighted-product-card.scss";

const HighlightedProductCard = (props) => {
    const {
        product,
        isLoading,
        className,
        ...restProps
    } = props;




    const classes = `highlighted-product-card ${className ?? ""}`;


    return (
        <MuiCard className={classes} {...restProps}>
            <Skeleton className="highlighted-product-card__image--skeleton" isLoading={isLoading}>
                <img
                    className="highlighted-product-card__image"
                    src={`/images/products/${product.thumbnail}`}
                    alt="Imagen del producto"/>
                
            </Skeleton>

            <div className="highlighted-product-card__content">
                <Skeleton className="highlighted-product-card__name--skeleton" isLoading={isLoading}>
                    <Text className="highlighted-product-card__name" variant="h3">{product.name}</Text>
                </Skeleton>
                <Skeleton className="highlighted-product-card__description--skeleton" isLoading={isLoading}>
                    <Text className="highlighted-product-card__description" variant="p">{product.description}</Text>
                </Skeleton>
                <Skeleton className="highlighted-product-card__price--skeleton" isLoading={isLoading}>
                    <Text className="highlighted-product-card__price" variant="span">${product.price.toFixed(2)}</Text>
                </Skeleton>
            </div>
        </MuiCard>
    );
};

HighlightedProductCard.propTypes = {
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

export default HighlightedProductCard;