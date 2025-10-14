import { Text } from "@/components/texts";
import FooterSocialMediaItem from "../footer-social-media-item/FooterSocialMediaItem";
import { items } from "./footer-social-media.config.js";
import "./footer-social-media.scss";

const FooterSocialMedia = () => {
    return (
        <div className="footer-social-media">
            <Text className="footer-social-media__title" variant="p">Redes Sociales</Text>
            <ul className="footer-social-media__list">
                {items.map((item, index)=>(
                    <FooterSocialMediaItem item={item} key={index}/>
                ))}
            </ul>
        </div>
    );
};

export default FooterSocialMedia;