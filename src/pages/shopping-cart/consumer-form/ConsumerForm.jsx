// @/components/consumer-form/ConsumerForm.jsx
import { AlertDanger } from "@/components/alerts";
import AlertSuccessForm from "@/components/alerts/AlertSuccessForm";
import { ButtonDanger, ButtonPrimary } from "@/components/buttons";
import { InputEmail, InputName, InputPhone, InputSurname } from "@/components/inputs";
import { useProduct } from "@/hooks/useProduct";
import PropTypes from "prop-types";
import { useState } from "react";
import "./consumer-form.scss";
import useConsumerForm from "./useConsumerForm";

const ORDERS_KEY = "order-cart";

const ConsumerForm = ( props ) => {
    const { className, onCancel, articles, ...restProps } = props;
    const [ alertError, setAlertError ] = useState({ open: false, message: "" });
    const [ alertSuccess, setAlertSuccess ] = useState({ open: false, message: "" });
    const classes = `consumer-form ${className ?? ""}`;
    const { fetchProductById, updateProduct } = useProduct();

    const handleCancel = () => {
        formik.resetForm();
        onCancel?.();
    };

    const handleBuy = async () => {
        const items = articles ?? [];

        if (items.length === 0) {
            setAlertError({
                open: true,
                message: "No hay productos en el carrito.",
            });
            return false;
        }

        const products = await Promise.all(items.map((i) => fetchProductById(i.id)));

        const insuficientes = [];
        for (let i = 0; i < items.length; i++) {
            const cartItem = items[i];
            const prod = products[i];
            const stockActual = prod?.stock ?? 0;

            if (!prod || cartItem.quantity > stockActual) {
                insuficientes.push({ id: cartItem.id, name: cartItem.name });
            }
        }

        if (insuficientes.length > 0) {
            setAlertError({
                open: true,
                message: "Hay productos con stock insuficiente",
            });
            return false;
        }

        await Promise.all(
            items.map((cartItem, idx) => {
                const prod = products[idx];
                const nuevoStock = (prod.stock ?? 0) - cartItem.quantity;
                return updateProduct(prod.id, { stock: nuevoStock });
            }),
        );

        const totalQuantity = items.reduce((acc, it) => acc + (it.quantity ?? 0), 0);
        const totalAmount = items.reduce(
            (acc, it) => acc + (it.amount ?? (it.price ?? 0) * (it.quantity ?? 0)),
            0,
        );

        const order = {
            id: Date.now(),
            items,
            totalQuantity,
            totalAmount,
            createdAt: new Date().toISOString(),
        };

        const prev = JSON.parse(localStorage.getItem(ORDERS_KEY) || "[]");
        localStorage.setItem(ORDERS_KEY, JSON.stringify([ order, ...prev ]));

        setAlertSuccess({
            open: true,
            message: "¡Compra realizada con éxito!",
        });

        onCancel();
        return true;

    };

    const { formik, isSubmitDisabled } = useConsumerForm({ onBuy: handleBuy });
    const disabledBuy = isSubmitDisabled() || formik.isSubmitting;

    return (
        <>
            <form className={classes} onSubmit={formik.handleSubmit} {...restProps}>
                <InputName formik={formik} />
                <InputSurname formik={formik} />
                <InputEmail formik={formik} />
                <InputPhone formik={formik} />

                <div className="consumer-form__actions">
                    <ButtonDanger type="button" onClick={handleCancel}>
                        Cancelar
                    </ButtonDanger>
                    <ButtonPrimary type="submit" disabled={disabledBuy}>
                        {formik.isSubmitting ? "Procesando..." : "Comprar"}
                    </ButtonPrimary>
                </div>
            </form>
            {alertError.open && (
                <AlertDanger
                    open={alertError.open}
                    message={alertError.message}
                    onClose={() => setAlertError({ open: false, message: "" })}/>
            )}
            {alertSuccess.open && (
                <AlertSuccessForm
                    open={alertSuccess.open}
                    message={alertSuccess.message}
                    onClose={() => setAlertSuccess({ open: false, message: "" })}/>
            )}
        </>
    );
};

ConsumerForm.propTypes = {
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
    onCancel: PropTypes.func.isRequired,
};

export default ConsumerForm;