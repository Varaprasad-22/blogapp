import React from "react";
import "./footer.css";

function Footer() {
  return (
    <footer className="section bg-footer">
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-sm-3 col-md-3">
            <div className="">
              <h6 className="footer-heading text-uppercase text-black">
                Information
              </h6>
              <ul className="list-unstyled footer-link mt-4">
                <li>
                  <a href="">Pages</a>
                </li>
                <li>
                  <a href="">Our Team</a>
                </li>
                <li>
                  <a href="">Feuchers</a>
                </li>
                <li>
                  <a href="">Pricing</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-lg-3  col-md-3">
            <div className="">
              <h6 className="footer-heading text-uppercase text-black">
                Resources
              </h6>
              <ul className="list-unstyled footer-link mt-4">
                <li>
                  <a href="">Wikipedia </a>
                </li>
                <li>
                  <a href="">React blog</a>
                </li>
                <li>
                  <a href="">Term &amp; Service</a>
                </li>
                <li>
                  <a href="">Angular dev</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-lg-2 col-md-2">
            <div className="">
              <h6 className="footer-heading text-uppercase text-black">Help</h6>
              <ul className="list-unstyled footer-link mt-4">
                <li>
                  <a href="/signup">Sign Up </a>
                </li>
                <li>
                  <a href="/signin">Sign In</a>
                </li>
                <li>
                  <a href="">Terms of Services</a>
                </li>
                <li>
                  <a href="">Privacy Policy</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-lg-4 col-md-4">
            <div className="">
              <h6 className="footer-heading text-uppercase text-black">
                Contact Us
              </h6>
              <p className="contact-info mt-4">
                Contact us if need help withanything
              </p>
              <p className="contact-info">+91 9999999999</p>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mt-5">
        <p className="footer-alt mb-0 f-14">2019 © VNR, All Rights Reserved</p>
      </div>
    </footer>
  );
}

export default Footer;