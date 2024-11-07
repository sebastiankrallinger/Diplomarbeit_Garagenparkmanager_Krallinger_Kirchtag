import React from 'react';
import logo from '../assets/logo_Lagerage.png';
import './Footer.css';

function Footer() {
  return (
      <footer>
          <div class="footer-container">
              <div class="footer-logo">
                  <img src="src/assets/logo_Lagerage.png" />
                  <a class="instagram-icon" href="https://www.instagram.com" target="_blank">
                      <i class="fab fa-instagram"></i>
                  </a>
              </div>
              <nav class="footer-navbar">
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
          <div class="footer-text">
              <p class="text1">DE Support & Kontakt</p>
              <p class="text2">SweetPopcorn.Studio&copy;2024</p>
          </div>
      </footer>
  );
}

export default Footer;