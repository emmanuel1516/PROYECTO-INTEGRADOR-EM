import { IconButtonBadge } from "@/components/icon-buttons";
import AppContext from "@/contexts/AppContext";
import { ShoppingCart as ShoppingCartIcon } from "@mui/icons-material";
import { useContext } from "react";

import { useNavigate } from "react-router-dom";
import "./header.scss";
import InstitutionLogo from "./institution-logo/InstitutionLogo";

const Header = () => {
    const { shoppingCartContext } = useContext(AppContext);
    const { shoppingCart } = shoppingCartContext;

    const navigate = useNavigate();

    const handleShoppingCart = () => {
        navigate("/shopping-cart");
    };

    return (
        <header className="header">
            <InstitutionLogo className="header__institution"/>
            <IconButtonBadge
                onClick={handleShoppingCart}
                className="header__shopping-cart"
                badgeContent={shoppingCart.totalQuantity ?? 0}>
                <ShoppingCartIcon/>
            </IconButtonBadge>

        </header>
    );
};

export default Header;