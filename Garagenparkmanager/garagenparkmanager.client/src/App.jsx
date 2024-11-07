import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
    return(
        <div className="App">
            <Header /> 
            <main>
                <section class="news">
                    <h1>News</h1>
                    <div class="newsContainer">
                        <button class="navBtn">&#10094;</button>
                        <div class="newsContent">
                            <p id="newsText">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et</p>
                        </div>
                        <button class="navBtn">&#10095;</button>
                    </div>
                </section>
                <section class="selfStorage">
                    <h1>SelfStorage/Immobilien</h1>
                    <div class="storageImages">
                        <div class="storageImage">
                            <img src="src/assets/houseplaceholder.jpg" alt="Storage1" />
                        </div>
                        <div class="storageImage">
                            <img src="src/assets/houseplaceholder.jpg" alt="Storage2" />
                        </div>
                        <div class="storageImage">
                            <img src="src/assets/houseplaceholder.jpg" alt="Storage3" />
                        </div>
                    </div>
                </section>
                <section class="ueberUns">
                    <h1>Unser Team</h1>
                    <div class="personImages">
                        <div class="personImage">
                            <img src="src/assets/personplaceholder.jpg" alt="Person1" />
                            <div class="text">
                                <p class="name">Person1</p>
                                <p class="role">Funktion</p>
                            </div>
                        </div>
                        <div class="personImage">
                            <img src="src/assets/personplaceholder.jpg" alt="Person2" />
                            <div class="text">
                                <p class="name">Person2</p>
                                <p class="role">Funktion</p>
                            </div>
                        </div>
                        <div class="personImage">
                            <img src="src/assets/personplaceholder.jpg" alt="Person3" />
                            <div class="text">
                                <p class="name">Person3</p>
                                <p class="role">Funktion</p>
                            </div>
                        </div>
                        <div class="personImage">
                            <img src="src/assets/personplaceholder.jpg" alt="Person4" />
                            <div class="text">
                                <p class="name">Person4</p>
                                <p class="role">Funktion</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    )
}

export default App;