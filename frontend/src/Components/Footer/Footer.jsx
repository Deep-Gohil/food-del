import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
const Footer = () => {
    return (
        <div className='footer' id='footer'>
            <div className="footer-content">
                <div className="footer-content-left">
                    <img src={assets.logo} alt="" />
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut tenetur laboriosam deleniti soluta, sed molestiae doloremque obcaecati quae, voluptas quos eos architecto laudantium eius nostrum minima molestias magnam earum sequi.</p>
                    <div className="footer-social-icons">
                        <img src={assets.facebook_icon} alt="" />
                        <img src={assets.twitter_icon} alt="" />
                        <img src={assets.linkedin_icon} alt="" />
                    </div>
                </div>
                <div className="footer-content-center">
                    <h2>COMPANY</h2>
                    <ul>
                        <li>Home</li>
                        <li>About Us</li>
                        <li>Delivery</li>
                        <li>Private Policy</li>
                    </ul>
                </div>
                <div className="footer-content-right">
                    <h2>GET IN TOUCH</h2>
                    <ul>
                        <li>+91-9925814941</li>
                        <li>deep888gohil@gmail.com</li>
                    </ul>
                </div>
            </div>
            <hr />
            <div className="footer-copyright">
                <p>�� 2024 Deep Gohil. All rights reserved.</p>
            </div>
        </div>
    )
}

export default Footer