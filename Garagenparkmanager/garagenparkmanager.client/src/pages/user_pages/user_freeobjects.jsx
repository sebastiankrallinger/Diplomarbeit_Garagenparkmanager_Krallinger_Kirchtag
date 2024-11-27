import './user_freeobjects.css';
import Header from '../../components/Header_User';
import Footer from '../../components/Footer';

function user_freeobjects() {
    return (
        <div className="user_freeobjects">
            <Header />
            <main>
                <section className="freeObjects">
                    <h1>Freie Objekte</h1>
                    <div className="contentWrapper">
                        {/* Linker Bereich: Bild des Plans */}
                        <div className="planImage">
                            {/* Füge hier dein Bild ein */}
                            <img src="../../src/assets/plan.png" alt="Plan" />
                        </div>

                        {/* Orangene Linie als Trennung */}
                        <div className="divider"></div>

                        {/* Rechter Bereich: Scrollbare Liste */}
                        <div className="objectList">
                            <ul>
                                <li>
                                    <h2>Objekt 1</h2>
                                    <p>Beschreibung des Objekts 1</p>
                                </li>
                                <li>
                                    <h2>Objekt 2</h2>
                                    <p>Beschreibung des Objekts 2</p>
                                </li>
                                <li>
                                    <h2>Objekt 3</h2>
                                    <p>Beschreibung des Objekts 3</p>
                                </li>
                                <li>
                                    <h2>Objekt 4</h2>
                                    <p>Beschreibung des Objekts 4</p>
                                </li>
                                <li>
                                    <h2>Objekt 5</h2>
                                    <p>Beschreibung des Objekts 5</p>
                                </li>
                                {/* Weitere Objekte können hinzugefügt werden */}
                            </ul>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}

export default user_freeobjects;
