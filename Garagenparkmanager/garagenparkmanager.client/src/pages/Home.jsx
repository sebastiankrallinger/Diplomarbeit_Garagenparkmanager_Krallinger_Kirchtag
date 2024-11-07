/* Home-Component*/

import React from 'react';
import './Home.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Home() {
    return (
        <div className="Home">
            <Header /> 
            <main>
                <h2>Suchst du einen Raum zur Miete?</h2>
                <h3>Garagen, Lager und B&uuml;ros</h3>
                <p>Unsere Portfolio beinhaltet Garagen und B&uuml;ros</p>
                <h3>in zentraler Lage</h3>
                <p>Perfekte Lage am Seespitz in Zell am See</p>
                <h3>mit Sicherheit und Vertrauen</h3>
                <p>Videoüberwachung und Kontrollfahrten am Hof</p>
                <h2>Mit Lichtgeschwindigkeit zu deiner Immobilie</h2>
                <p>1. Informiere dich auf der Homepage</p>
                <p>2. Kontaktiere uns bei Interesse oder Fragen</p>
                <p>3. Besichtige das Objekt</p>
                <p>4. Ziehe in deinen neuen Raum ein</p>
            </main>
            <Footer /> 
        </div>
    );
}

export default Home;
