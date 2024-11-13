/* Footer-Component*/

import React from 'react';
import './Footer.css';

function Footer() {
  return (
      <footer>
          <div className="footer-container">
              <div className="footer-logo">
                  <img src="src/assets/logo_Lagerage.png" />
                  <a className="instagram-icon" href="https://www.instagram.com" target="_blank">
                      <i className="fab fa-instagram"></i>
                  </a>
              </div>
              <nav className="footer-navbar">
                  <ul>
                      <li>
                          <h3>Lagerage</h3>
                          <a href="#">Link1</a>
                          <a href="#">Link2</a>
                      </li>
                      <li>
                          <h3>Allgemein</h3>
                          <a href="#">Link1</a>
                          <a href="#">Link2</a>
                          <a href="#">Link3</a>
                      </li>
                      <li>
                          <h3>Kontakt</h3>
                          <a href="#">Link1</a>
                          <a href="#">Link2</a>
                          <a href="#">Link3</a>
                      </li>
                      <li>
                          <h3>Documents</h3>
                          <a href="#">Link1</a>
                          <a href="#">Link2</a>
                          <a href="#">Link3</a>
                          <a href="#">Link4</a>
                      </li>
                  </ul>
              </nav>
          </div>
          <div className="footer-text">
              <p className="text1">DE Support & Kontakt</p>
              <p className="text2">SweetPopcorn.Studio&copy;2024</p>
          </div>
      </footer>
  );
}

export default Footer;