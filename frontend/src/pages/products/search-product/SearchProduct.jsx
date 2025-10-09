import { ButtonPrimary } from "@/components/buttons";
import { InputSearch } from "@/components/inputs";
import PropTypes from "prop-types";
import "./search-product.scss";
import useSearchProduct from "./useSearchProduct";

const SearchProduct = ({ onChange }) => {
    const { formik, handleClear } = useSearchProduct({
        onSearch: onChange,
    });

    return (
        <div className="search-product">
            <form className="search-product__bar" onSubmit={formik.handleSubmit} role="search">
                <InputSearch
                    id="search-product"
                    name="search"
                    label="Buscar"
                    placeholder="Buscar productos…"
                    formik={formik}
                    onClear={handleClear}/>
                <ButtonPrimary
                    className="search-product__button"
                    type="submit"
                    aria-label="Buscar">
                     Buscar
                </ButtonPrimary>
            </form>
        </div>
    );
};

SearchProduct.propTypes = {
    onChange: PropTypes.func.isRequired,
};

export default SearchProduct;