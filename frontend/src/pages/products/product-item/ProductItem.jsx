import { ButtonPrimary } from "@/components/buttons";
import { Skeleton } from "@/components/skeleton";
import { Text } from "@/components/texts";
import AppContext from "@/contexts/AppContext";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { ViewCarousel } from "@mui/icons-material";
import StarIcon from "@mui/icons-material/Star";
import { CardActionArea, IconButton, Card as MuiCard } from "@mui/material";
import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./product-item.scss";
import { API_URL_IMAGES } from "@/constants/api.constant";

const ProductItem = (props) => {
    const {
        product,
        isLoading,
        className,
        removeProduct,
        ...restProps
    } = props;

    const navigate = useNavigate();
    const { shoppingCartContext } = useContext(AppContext);
    const { addArticle, subtractArticle, removeFromCart } = shoppingCartContext;
    const [ deleting, setDeleting ] = useState(false);

    const classes = `product-item ${className ?? ""}`;

    const handleEditProduct = () => {
        navigate(`/products/${product.id}`);
    };

    const handleAddArticle = () => {
        addArticle(product.id, 1);
    };

    const handleSubtractArticle = () => {
        subtractArticle(product.id, 1);
    };

    const handleRemoveProduct = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!removeProduct) return;
        try {
            setDeleting(true);
            removeFromCart(product.id);
            await removeProduct(product.id);
        } finally {
            setDeleting(false);
        }
    };
    const getSourceImage = () => {
        return product.thumbnail === "default.jpg"
            ? `${API_URL_IMAGES}/${product.thumbnail}`
            : `${product.thumbnail}`;
    };

    const formatPrice = (value) => {
        return new Intl.NumberFormat("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(Number(value));
    };

    const renderActions = () => {
        if (product.stock === 0) {
            return (<Text className="product-item__no-stock" variant="p">SIN STOCK</Text>);
        }

        return (
            <>
                <Skeleton className="product-item__actions--skeleton" isLoading={isLoading}>
                    <ButtonPrimary className="product-item__add" size="sm" onClick={handleAddArticle}><AddShoppingCartIcon/></ButtonPrimary>
                </Skeleton>
                <Skeleton className="product-item__actions--skeleton" isLoading={isLoading}>
                    <ButtonPrimary className="product-item__remove" size="sm" onClick={handleSubtractArticle}><RemoveCircleOutlineIcon/></ButtonPrimary>
                </Skeleton>
            </>
        );
    };

    return (
        <MuiCard className={classes} {...restProps}>
            <Skeleton className="product-item__image--skeleton" isLoading={isLoading}>
                <CardActionArea>
                    <div className="product-item__icons">
                        <div className="product-item__icons-left">
                            {product.highlighted && (
                                <StarIcon
                                    className="product-item__highlighted"
                                    color="warning"
                                    fontSize="small" />
                            )}
                            {product.slider && (
                                <ViewCarousel
                                    className="product-item__slider"
                                    color="action"
                                    fontSize="small" />
                            )}
                        </div>
                        <IconButton
                            component="div"
                            className="product-item__garbage"
                            size="small"
                            onClick={handleRemoveProduct}
                            disabled={isLoading || deleting}
                            aria-label="Eliminar producto">
                            <DeleteOutlineIcon className="product-item__garbage-icon" />
                        </IconButton>
                    </div>
                    <img
                        className="product-item__image"
                        src={getSourceImage()}
                        alt="Imagen del producto"
                        onClick={handleEditProduct}/>
                </CardActionArea>
            </Skeleton>

            <div className="product-item__content">
                <Skeleton className="product-item__name--skeleton" isLoading={isLoading}>
                    <Text className="product-item__name" variant="h3">{product.name}</Text>
                </Skeleton>
                <Skeleton className="product-item__description--skeleton" isLoading={isLoading}>
                    <Text className="product-item__description" variant="p">{product.description}</Text>
                </Skeleton>
                <Skeleton className="product-item__price--skeleton" isLoading={isLoading}>
                    <Text className="product-item__price" variant="span">${formatPrice(product.price.toFixed(2))}</Text>
                </Skeleton>
            </div>

            <div className="product-item__actions">
                {renderActions()}
            </div>
        </MuiCard>
    );
};

ProductItem.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        stock: PropTypes.number.isRequired,
        thumbnail: PropTypes.string.isRequired,
        highlighted: PropTypes.bool.isRequired,
        slider: PropTypes.bool.isRequired,
    }),
    isLoading: PropTypes.bool.isRequired,
    className: PropTypes.string,
    removeProduct: PropTypes.func.isRequired,
};

export default ProductItem;