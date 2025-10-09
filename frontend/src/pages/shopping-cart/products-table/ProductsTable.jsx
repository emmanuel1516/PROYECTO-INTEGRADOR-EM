import { ButtonPrimary } from "@/components/buttons";
import { Text } from "@/components/texts";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import PropTypes from "prop-types";
import "./products-table.scss";

const ProductsTable = (props) => {
    const { className, articles, totalAmount, addArticle, subtractArticle, ...restProps } = props;
    const classes = `products-table ${className}`;

    const renderActions = (article) => {
        return (
            <>
                <ButtonPrimary
                    className="product-item__remove"
                    size="sm"
                    onClick={() => subtractArticle(article.id, 1)}>
                    <RemoveCircleOutlineIcon />
                </ButtonPrimary>

                <ButtonPrimary
                    className="product-item__add"
                    size="sm"
                    onClick={() => addArticle(article.id, 1)}>
                    <AddShoppingCartIcon />
                </ButtonPrimary>
            </>
        );
    };

    const formatPrice = (value) => {
        return new Intl.NumberFormat("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(Number(value));
    };

    return (
        <div className={classes} {...restProps}>
            <Table>
                <TableHead>
                    <TableRow className="products-table__head">
                        <TableCell align="left">Producto</TableCell>
                        <TableCell align="right">Cant.</TableCell>
                        <TableCell align="right">Precio</TableCell>
                        <TableCell align="right">Importe</TableCell>
                        <TableCell align="right"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {articles?.map((article) => (
                        <TableRow key={article.id} className="products-table__body">
                            <TableCell align="left">{article.name}</TableCell>
                            <TableCell align="right">{article.quantity}</TableCell>
                            <TableCell align="right">${formatPrice(article.price?.toFixed(2))}</TableCell>
                            <TableCell align="right">${formatPrice(article.amount?.toFixed(2))}</TableCell>
                            <TableCell className="products-table__body-actions" align="right">{renderActions(article)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <div className="products-table__footer">
                <Text className="products-table__total" variant="p">
                    Total: ${formatPrice(totalAmount?.toFixed(2))}
                </Text>
            </div>
        </div>
    );
};

ProductsTable.propTypes = {
    className: PropTypes.string,
    articles: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]).isRequired,
            name: PropTypes.string.isRequired,
            quantity: PropTypes.number.isRequired,
            price: PropTypes.number.isRequired,
            amount: PropTypes.number.isRequired,
        }),
    ).isRequired,
    totalAmount: PropTypes.number.isRequired,
    addArticle: PropTypes.func.isRequired,
    subtractArticle: PropTypes.func.isRequired,
};

export default ProductsTable;