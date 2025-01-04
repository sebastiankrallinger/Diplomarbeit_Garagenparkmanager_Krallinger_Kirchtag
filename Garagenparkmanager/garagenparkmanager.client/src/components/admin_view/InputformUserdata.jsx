import { useEffect, useState } from 'react';
import './InputformUserdata.css';

function InputformUserdata({ user, handleFormChange }) {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        birthdate: '',
        plz: '',
        location: '',
        street: '',
        housenumber: '',
        housenumberAddition: '',
        companyName: '',
        atuNumber: '',
        email: '',
        password: '',
    });

    useEffect(() => {
        if (user) {
            setFormData({
                firstname: user.firstname,
                lastname: user.lastname,
                birthdate: user.birthdate,
                plz: user.plz,
                location: user.location,
                street: user.street,
                housenumber: user.housenumber,
                housenumberAddition: user.housenumberAddition,
                companyName: user.companyName,
                atuNumber: user.atuNumber,
                email: user.email,
                password: user.password,
            });
        } else if (!user) {
            setFormData({
                firstname: '',
                lastname: '',
                birthdate: '',
                plz: '',
                location: '',
                street: '',
                housenumber: '',
                housenumberAddition: '',
                companyName: '',
                atuNumber: '',
                email: '',
                password: '',
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedData = {
            ...formData,
            [name]: value,
        };
        setFormData(updatedData);

        handleFormChange(updatedData);
    };

    return (
        <div className="InputformUserdata">
            <h2>Userdaten</h2>
            <div className="inputForm">
                <input placeholder="Vorname" name="firstname" value={formData.firstname} onChange={handleChange}></input>
                <input placeholder="Nachname" name="lastname" value={formData.lastname} onChange={handleChange}></input>
                <input type="datetime-local" placeholder="Geburtstag" name="birthdate" value={formData.birthdate} onChange={handleChange}></input>
                <div className="location">
                    <input placeholder="PLZ" name="plz" value={formData.plz} onChange={handleChange}></input>
                    <input placeholder="Ort" name="location" value={formData.location} onChange={handleChange}></input>
                </div>
                <div className="street">
                    <input className="strasse" placeholder="Stra&szlig;e" name="street" value={formData.street} onChange={handleChange}></input>
                    <input placeholder="HNr." name="housenumber" value={formData.housenumber} onChange={handleChange}></input>
                    <input placeholder="c/o" name="housenumberAddition" value={formData.housenumberAddition} onChange={handleChange}></input>
                </div>
                <input placeholder="Email" name="email" value={formData.email} onChange={handleChange}></input>
                <div className="company">
                    <input placeholder="Firmenname" name="companyName" value={formData.companyName} onChange={handleChange}></input>
                    <input placeholder="ATU-Nummer" name="atuNumber" value={formData.atuNumber} onChange={handleChange}></input>
                </div>
                <input type="password" placeholder="Passwort" name="password" value={formData.password} onChange={handleChange}></input>
            </div>
        </div>
  );
}

export default InputformUserdata;