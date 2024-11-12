import './InputformUserdata.css';

function InputformUserdata() {
    return (
        <div className="InputformUserdata">
            <h2>Userdaten</h2>
            <div className="inputForm">
                <input placeholder="Vorname"></input>
                <input placeholder="Vorname"></input>
                <div className="location">
                    <input placeholder="PLZ"></input>
                    <input placeholder="Ort"></input>
                </div>
                <div className="street">
                    <input className="strasse" placeholder="Stra&szlig;e"></input>
                    <input placeholder="HNr."></input>
                    <input placeholder="c/o"></input>
                </div>
                <input placeholder="Email"></input>
                <div className="company">
                    <input placeholder="Firmenname"></input>
                    <input placeholder="ATU-Nummer"></input>
                </div>
                <input placeholder="Passwort"></input>
                <input placeholder="Passwort Best&auml;tigen"></input>
            </div>
        </div>
  );
}

export default InputformUserdata;