/* Usermanagement-Component */
import { useEffect, useState } from 'react';
import './Usermanagement.css';
import Header from '../../components/admin_view/Header_Admin';
import Userlist from '../../components/admin_view/Userlist';
import UserdataForm from '../../components/admin_view/InputformUserdata';
import Userobjects from '../../components/admin_view/UserObjects';

function Usermanagement() {
    const url = "https://garagenparkmanager-webapp-dqgge2apcpethvfs.swedencentral-01.azurewebsites.net/";
    //const url = "https://localhost:7186/";
    const [customers, setCustomers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [oldUserData, setoldUserData] = useState(null);
    const [bookedStorages, setBookedtorages] = useState([]);
    const [contract, setcontract] = useState([]);
    const [showPopup, setShowPopup] = useState(false);

    //Kunden laden
    useEffect(() => {
        fetchCustomers();
    }, []);

    //PopUp �ffnen
    const openPopup = () => {
        setShowPopup(true);
    };

    //PopUp schlie�en
    const closePopup = () => {
        setShowPopup(false);
    };

    //Kunden laden
    async function fetchCustomers() {
        try {
            const response = await fetch(url + 'User/customers', {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('accesstoken'),
                },
            });
            const data = await response.json();
            setCustomers(data);
        } catch (error) {
            console.error('Fehler beim Laden:', error);
        }
    }

    //Objekte des Kunden laden
    async function fetchStorages(id) {
        try {
            const response = await fetch(url + `User/getStorages/${id}`, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('accesstoken'),
                },
            });
            const data = await response.json();
            setBookedtorages(data);
        } catch (error) {
            console.error('Fehler beim Laden:', error);
        }
    }

    //Userdaten laden
    async function editData(id) {
        try {
            const response = await fetch(url + `User/getCustomer/${id}`, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('accesstoken'),
                },
            });
            const data = await response.json();
            setoldUserData(data);
            setSelectedUser(data);
        } catch (error) {
            console.error('Fehler beim Laden', error);
        }
    }

    //Kunden aktualisieren
    async function updateCustomer(customerData) {
        try {
            let foundContract = false;
            const updatedContracts = oldUserData.contracts.map((existingContract) => {
                if (existingContract.id === contract.id) {
                    foundContract = true;
                    return {
                        ...existingContract,
                        ...contract,
                    };
                }
                return existingContract; 
            });

            if (!foundContract) {
                updatedContracts.push(contract);
            }

            const response = await fetch(url + `User/updateCustomer`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('accesstoken'),
                },
                body: JSON.stringify({
                    id: oldUserData.id,
                    role: oldUserData.role,
                    firstname: customerData.firstname,
                    lastname: customerData.lastname,
                    birthdate: customerData.birthdate,
                    plz: customerData.plz,
                    location: customerData.location,
                    street: customerData.street,
                    housenumber: customerData.housenumber,
                    housenumberAddition: customerData.housenumberAddition,
                    email: customerData.email,
                    companyName: customerData.companyName,
                    atuNumber: customerData.atuNumber,
                    password: customerData.password,  
                    salt: oldUserData.salt,
                    storages: bookedStorages,
                    contracts: customerData.contracts,
                }),
            });
            if (response.ok) {
                setcontract(null);
                fetchCustomers();
                setSelectedUser(null);
                setBookedtorages(null);
                setcontract(null);
                openPopup();
            } else {
                throw new Error(`${response.status} ${response.statusText}`);
            }
        } catch (error) {
            console.error('Fehler beim Aktualisieren:', error);
        }
    }

    //Userdaten zwischenspeichern
    const handleFormChange = (updatedUserData) => {
        setSelectedUser(updatedUserData);
    };

  return (
      <div className="Usermanagement_Admin">
          <Header />
          <main>
              <div className="userlist">
                  <Userlist customers={customers} refreshCustomers={fetchCustomers} refreshStorages={fetchStorages} editCustomer={editData} loadStorages={fetchStorages} />
              </div>
              <div className="seperator"></div>
              <div className="userdata">
                  <UserdataForm refreshCustomers={fetchCustomers} user={selectedUser} handleFormChange={handleFormChange} />
                  <button className="btn-update" onClick={() => updateCustomer(selectedUser)}>Aktualisieren</button>
              </div>
              <div className="object">
                  <Userobjects selectedUser={selectedUser} setSelectedUser={setSelectedUser} bookedStorages={bookedStorages} loadStorages={fetchStorages} contract={setcontract} />
              </div>
          </main>
          {
              showPopup && (
                  <div className="popup">
                      <div className="popup-content">
                          <p>Benutzer erfolgreich aktualisiert!</p>
                          <button onClick={closePopup}>OK</button>
                      </div>
                  </div>
              )
          }
      </div>
  );
}

export default Usermanagement;