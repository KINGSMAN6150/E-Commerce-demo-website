import React from "react";
import './Footer.css'
import footer_logo from '../Assests/footer_img.jpg'
import insta_icon from'../Assests/insta_icon.jpg'
import x_icon from'../Assests/x_icon.jpg'
import whatsapp_icon from'../Assests/whatsapp_icon.jpg'
const Footer=()=>{
    return(
        <div className="footer">
            <div className="footer-logo">
                <img src={footer_logo} alt="" />
                <p>AUCTION</p>
            </div>
            <ul className="footer-links">
                <li>Company</li>
                <li>Products</li>
                <li>Offices</li>
                <li>About</li>
                <li>Contact</li>
            </ul>
            <div className="footer-social-icon">
                <div className="footer-social-container-1">
                    <img src={insta_icon} alt="" />
                </div>
                <div className="footer-social-container-2">
                    <img src={x_icon} alt="" />
                </div>
                <div className="footer-social-container-3">
                    <img src={whatsapp_icon} alt="" />
                </div>
            </div>
            <div className="footer-copyright">
                <hr />
                <p>Copyright @2024 - All Rights Reserved</p>

            </div>
        </div>
    )
}
export default Footer;
