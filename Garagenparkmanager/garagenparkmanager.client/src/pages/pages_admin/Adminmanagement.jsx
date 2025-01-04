/* Adminmanagement-Component */
import { useEffect, useState, useContext } from 'react';
import './Adminmanagement.css';
import Header from '../../components/admin_view/Header_Admin';
import AdminList from '../../components/admin_view/Adminlist';
import AdmindataForm from '../../components/admin_view/InputformAdmindata';

function Adminmanagement() {
    const [admins, setAdmins] = useState([]);

    useEffect(() => {
        fetchAdmins();
    }, []);

    async function fetchAdmins() {
        try {
            const response = await fetch('https://localhost:7186/User/admins', {
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

  return (
      <div className="Adminmanagement_Admin">
          <Header />
          <main>
              <div className="adminlist">
                  <AdminList admins={admins} refreshAdmins={fetchAdmins} />
              </div>
              <div className="seperator"></div>
              <div className="admindata">
                  <AdmindataForm refreshAdmins={fetchAdmins} />
                  <button className="btn-update">Aktualisieren</button>
              </div>
          </main>
      </div>
  );
}

export default Adminmanagement;