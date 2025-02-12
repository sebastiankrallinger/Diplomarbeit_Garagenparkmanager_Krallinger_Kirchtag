/* Home-Component*/

import React from 'react';
import './Home.css';
import Header from '../components/Header'
import Footer from '../components/Footer';
import aboutUs1 from '../../src/assets/aboutUs1.png'
import aboutUs2 from '../../src/assets/aboutUs2.png'
import aboutUs3 from '../../src/assets/aboutUs3.png'
import ParkPlan from '../../src/assets/garagenparkplan.jpg'
import img1 from '../../src/assets/img1.jpg'
import img2 from '../../src/assets/img2.jpg'
import movie from '../../src/assets/video.mp4'

function Home() {
    return (
        <div className="Home">
            <Header /> 
            <main>
                <section className="section1" id="content">
                    <video autoPlay loop muted>
                        <source src={movie} type="video/mp4"/>
                    </video>
                    <img src={img1} alt="Immobilie" />
                    <div className="text-content">
                        <h2>Suchst du einen Raum zur Miete?</h2>
                        <h3>Garagen, Lager und B&uuml;ros</h3>
                        <p>Unsere Portfolio beinhaltet Garagen und B&uuml;ros</p>
                        <h3>in zentraler Lage</h3>
                        <p>Perfekte Lage am Seespitz in Zell am See</p>
                        <h3>mit Sicherheit und Vertrauen</h3>
                        <p>Video&uuml;berwachung und Kontrollfahrten am Hof</p>
                    </div>
                </section>

                <section className="section2">
                    <div className="text-content">
                        <h2>Mit Lichtgeschwindigkeit zu deiner Immobilie</h2>
                        <p>1. Informiere dich auf der Homepage</p>
                        <p>2. Kontaktiere uns bei Interesse oder Fragen</p>
                        <p>3. Besichtige das Objekt</p>
                        <p>4. Ziehe in deinen neuen Raum ein</p>
                    </div>
                    <img src={img2} alt="Immobilie" />
                </section>

               
                <section className="garageparkPlan" id="plan">
                    <div className="plan">
                        <h1>Garagenpark - &Uuml;bersicht</h1>
                        <img src={ParkPlan} alt="Garagenpark" />
                    </div>
                </section>

                {/* Unser Team an dritter Stelle */}
                <section className="ueberUns" id="ueberUns">
                    <h1>Unser Team</h1>
                    <div className="personImages">
                        <div className="personImage">
                            <img src={aboutUs1} alt="Person1" />
                            <div className="text">
                                <p className="name">Julija</p>
                                <p className="role">Assistentin der Gesch&auml;ftsleitung/Marketing</p>
                            </div>
                        </div>
                        <div className="personImage">
                            <img src={aboutUs2} alt="Person2" />
                            <div className="text">
                                <p className="name">Alex</p>
                                <p className="role">Gesch&auml;ftsf&uuml;hrer</p>
                            </div>
                        </div>
                        <div className="personImage">
                            <img src={aboutUs3} alt="Person3" />
                            <div className="text">
                                <p className="name">Glemens</p>
                                <p className="role">Gr&uuml;nder</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer /> 
        </div>
    );
}

export default Home;
