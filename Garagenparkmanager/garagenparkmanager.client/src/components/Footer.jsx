/* Footer-Component*/

import React from 'react';
import './Footer.css';
import Logo from '../../src/assets/logo_Lagerage.png'


function Footer() {
  return (
      <footer>
          <div className="footer-container">
              <div className="footer-logo">
                  <img src={Logo} />
                  <a className="instagram-icon" href="https://www.instagram.com/lagerage.at/" target="_blank">
                      <i className="fab fa-instagram"></i>
                  </a>
              </div>
              <nav className="footer-navbar">
                  <ul>
                      <li>
                          <h3>Lagerage</h3>
                          <a href="https://lagerage.at/home">SelfStorage</a>
                          <a href="https://lagerage.at/home/immobilien">Immobilien</a>
                      </li>
                      <li>
                          <h3>Allgemein</h3>
                          <a href="https://lagerage.at/home/about-us">&Uuml;ber uns</a>
                          <a href="https://lagerage.at/home/impressum">Impressum</a>
                          <a href="https://lagerage.at/home/faqs">FAQs</a>
                      </li>
                      <li>
                          <h3>Kontakt</h3>
                          <a href="tel:+436542218722">+436542218722</a>
                          <a href="mailto:office@lagerage.at">office@lagerage.at</a>
                          <a href="https://goo.gl/maps/SoaoH8DiYMwBRde19">Seespitzstra&szlig;e 8, 5700 Zell am See</a>
                      </li>
                      <li>
                          <h3>Documents</h3>
                          <a href="https://garagenparkmanagerdocs.blob.core.windows.net/documents/AGBs.pdf" target="_blank">Allgemeine Gesch&auml;ftsbedingungen - AGB</a>
                          <a href="https://garagenparkmanagerdocs.blob.core.windows.net/documents/Datenschutzerklärung.pdf" target="_blank">Datenschutzerkl&auml;rung</a>
                          <a href="https://garagenparkmanagerdocs.blob.core.windows.net/documents/Standortbeschreibung_ZellamSee.pdf" target="_blank">Standortbeschreibung Lagerage Zell am See</a>
                          <a href="https://garagenparkmanagerdocs.blob.core.windows.net/documents/Wiederrufsformular.pdf" target="_blank">Widerrufsformular</a>
                      </li>
                  </ul>
              </nav>
          </div>
          <div className="footer-text">
              <p className="text1">DE Support & Kontakt</p>
              <p className="text2">&copy;2025</p>
          </div>
      </footer>
  );
}

export default Footer;