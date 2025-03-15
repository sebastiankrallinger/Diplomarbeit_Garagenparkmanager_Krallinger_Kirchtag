/* Adminmanagement-Component */
import { useEffect, useState, useContext } from 'react';
import './Adminmanagement.css';
import Header from '../../components/admin_view/Header_Admin';
import AdminList from '../../components/admin_view/Adminlist';
import AdmindataForm from '../../components/admin_view/InputformAdmindata';

function Adminmanagement() {
    const url = "https://garagenparkmanager-webapp-dqgge2apcpethvfs.swedencentral-01.azurewebsites.net/";
    //const url = "https://localhost:7186/";
    const [admins, setAdmins] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [oldUserData, setoldUserData] = useState(null);
    const [showPopup, setShowPopup] = useState(false);

    //Admins laden
    useEffect(() => {
        fetchAdmins();
        document.getElementById('updateBtn').style.visibility = 'hidden';
    }, []);

    //PopUp öffnen
    const openPopup = () => {
        setShowPopup(true);
    };

    //PopUp schließen
    const closePopup = () => {
        setShowPopup(false);
    };

    //Admins laden
    async function fetchAdmins() {
        try {
            const response = await fetch(url + 'User/admins', {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('accesstoken'),
                },
            });
            const data = await response.json();
            setAdmins(data);
        } catch (error) {
            console.error('Fehler beim Abrufen der Admin-Liste:', error);
        }
    }

    //alte Admindaten laden
    async function editData(id) {
        document.getElementById('updateBtn').style.visibility = 'visible';
        document.getElementById('createBtn').style.visibility = 'hidden';
        try {
            const response = await fetch(url + `User/getAdmin/${id}`, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('accesstoken'),
                },
            });
            const data = await response.json();
            setoldUserData(data);
            setSelectedUser(data);
        } catch (error) {
            console.error('Fehler beim Abrufen der Admin-Liste:', error);
        }
    }

    //Admindaten aktualisieren
    async function updateAdmin(adminData) {
        try {
            const response = await fetch(url + `User/updateAdmin`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('accesstoken'),
                },
                body: JSON.stringify({
                    id: oldUserData.id,
                    role: oldUserData.role,
                    firstname: adminData.firstname,
                    lastname: adminData.lastname,
                    email: adminData.email,
                    password: adminData.password,
                    salt: oldUserData.salt
                }),
            });
            if (response.ok) {
                fetchAdmins();
                setSelectedUser(null);
                openPopup();
                document.getElementById('updateBtn').style.visibility = 'hidden';
                document.getElementById('createBtn').style.visibility = 'visible';
            } else {
                console.error('Fehler beim Aktualisieren des Admins');
            }
        } catch (error) {
            console.error('Fehler beim Senden der Update-Anfrage:', error);
        }
    }

    //Admindaten zwischenspeichern
    const handleFormChange = (updatedUserData) => {
        setSelectedUser(updatedUserData);
    };

  return (
      <div className="Adminmanagement_Admin">
          <Header />
          <main>
              <div className="adminlist">
                  <AdminList admins={admins} refreshAdmins={fetchAdmins} editAdmin={editData} />
              </div>
              <div className="seperator"></div>
              <div className="admindata">
                  <AdmindataForm refreshAdmins={fetchAdmins} admin={selectedUser} handleFormChange={handleFormChange} />
                  <button id="updateBtn" className="btn-update" onClick={() => updateAdmin(selectedUser)}>Aktualisieren</button>
              </div>
          </main>
          {
              showPopup && (
                  <div className="popup">
                      <div className="popup-content">
                          <p>Admin erfolgreich aktualisiert!</p>
                          <button onClick={closePopup}>OK</button>
                      </div>
                  </div>
              )
          }
      </div>
  );
}

export default Adminmanagement;