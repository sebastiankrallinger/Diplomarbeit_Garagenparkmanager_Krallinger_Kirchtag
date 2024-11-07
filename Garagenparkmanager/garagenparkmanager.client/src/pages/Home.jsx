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
                <p>Fill with Content</p>
            </main>
            <Footer /> 
        </div>
    );
}

export default Home;
