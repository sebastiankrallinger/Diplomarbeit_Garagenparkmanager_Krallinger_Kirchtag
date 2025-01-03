import './InputformAdmindata.css';

function InputformAdmindata() {
    return (
        <div className="InputformAdmindata">
            <h2>Admindaten</h2>
            <div className="inputForm">
                <input placeholder="Vorname"></input>
                <input placeholder="Nachname"></input>
                <input placeholder="Email"></input>
                <input placeholder="Passwort"></input>
                <input placeholder="Passwort Best&auml;tigen"></input>
            </div>
        </div>
  );
}

export default InputformAdmindata;