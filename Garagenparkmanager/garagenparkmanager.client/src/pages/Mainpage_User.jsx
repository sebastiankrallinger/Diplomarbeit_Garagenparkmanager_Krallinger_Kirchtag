/* Mainpage_User-Component */

import React, { useState, useEffect } from 'react';
import './Mainpage_User.css';
import Header from '../components/Header_User';
import Footer from '../components/Footer';
import personplaceholder from '../../src/assets/personplaceholder.jpg'
import houseplaceholder from '../../src/assets/houseplaceholder.jpg'

function Mainpage_User() {
  return (
      <div className="Mainpage_User">
          <Header />
          <main>
              <section className="news">
                  <h1>News</h1>
                  <div className="newsContainer">
                      <button className="navBtn">&#10094;</button>
                      <div className="newsContent">
                          <p id="newsText">Lorem ipsum dolor sit amet...</p>
                      </div>
                      <button className="navBtn">&#10095;</button>
                  </div>
              </section>
              <section className="selfStorage">
                  <h1>SelfStorage/Immobilien</h1>
                  <div className="storageImages">
                      <div className="storageImage">
                          <img src={houseplaceholder} alt="Storage1" />
                      </div>
                      <div className="storageImage">
                          <img src={houseplaceholder} alt="Storage2" />
                      </div>
                      <div className="storageImage">
                          <img src={houseplaceholder} alt="Storage3" />
                      </div>
                  </div>
              </section>
              <section className="ueberUns">
                  <h1>Unser Team</h1>
                  <div className="personImages">
                      <div className="personImage">
                          <img src={personplaceholder} alt="Person1" />
                          <div className="text">
                              <p className="name">Person1</p>
                              <p className="role">Funktion</p>
                          </div>
                      </div>
                      <div className="personImage">
                          <img src={personplaceholder} alt="Person2" />
                          <div className="text">
                              <p className="name">Person2</p>
                              <p className="role">Funktion</p>
                          </div>
                      </div>
                      <div className="personImage">
                          <img src={personplaceholder} alt="Person3" />
                          <div className="text">
                              <p className="name">Person3</p>
                              <p className="role">Funktion</p>
                          </div>
                      </div>
                      <div className="personImage">
                          <img src={personplaceholder} alt="Person4" />
                          <div className="text">
                              <p className="name">Person4</p>
                              <p className="role">Funktion</p>
                          </div>
                      </div>
                  </div>
              </section>
          </main>
          <Footer />
      </div>
  );
}

export default Mainpage_User;