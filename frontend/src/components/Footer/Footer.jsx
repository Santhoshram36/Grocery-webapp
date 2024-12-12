import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
            <img src="logo.png" className="img-fluid rounded-top w-100" alt />
                <p>GroFresh is a dynamic, innovative company that focuses on providing fresh, locally sourced produce directly to consumers through an efficient delivery system. It connects small-scale farmers with urban customers, ensuring access to high-quality fruits, vegetables, and herbs while promoting sustainable farming practices. With a focus on convenience and health, GroFresh offers customizable produce boxes, subscription services, and same-day deliveries. Its mission is to support local agriculture, reduce food waste, and provide nutritious, farm-fresh options to busy individuals and families who prioritize healthy living.</p>
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
                    <li>About us</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>
            <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>+91 8220034061</li>
                    <li>grofresh@gmail.com</li>
                </ul>
            </div>
           
        </div>
        <hr />
        <p className="footer-copyright">
            Copyright 2024 &copy; Boris - All Right Reserved.
        </p>
    </div>
  )
}

export default Footer