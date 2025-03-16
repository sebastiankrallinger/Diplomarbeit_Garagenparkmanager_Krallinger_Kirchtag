import './Contractslist.css';
import downloadIcon from '../../assets/downloadicon.png';
import { useEffect, useState } from 'react';

/* Contractslist-Component */
function Contractslist() {
    const url = "https://garagenparkmanager-webapp-dqgge2apcpethvfs.swedencentral-01.azurewebsites.net/";
    //const url = "https://localhost:7186/";
    const [storages, setStorages] = useState([]);

    //Objekte laden
    useEffect(() => {
        fetchStorages();
        document.getElementById('contract').innerHTML = "Objekt ausw&auml;hlen";
        document.getElementById('downloadIcon').style.visibility = 'hidden';
    }, []);

    //Objekte laden
    async function fetchStorages() {
        try {
            const response = await fetch(url + 'Storage/allobjects', {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('accesstoken'),
                },
            });
            const data = await response.json();
            setStorages(data);
        } catch (error) {
            console.error('Fehler beim Laden:', error);
        }
    }

    //aktiven Vertrag des Objekts anzeigen
    function showContract(storage) {
        if (storage && storage.activeContract && storage.activeContract.fileName) {
            document.getElementById("contract").textContent = storage.activeContract.fileName;
            document.getElementById('downloadIcon').style.visibility = 'visible';
            const downloadIcon = document.getElementById("downloadIcon");
            downloadIcon.parentElement.href = storage.activeContract.fileUrl; 
            downloadIcon.target = "_blank";  
        } else {
            document.getElementById('contract').innerHTML = "Kein Vertrag verf&uuml;gbar";
            document.getElementById('downloadIcon').style.visibility = 'hidden';
        }

    }

    return (
        <div className="Contractslist">
            <h2>Vertr&auml;ge</h2>
            <div className="objects">
                {storages.map((storage, index) => (
                    <ul key = {storage.id}>
                        <li onClick={() => {showContract(storage); }}>
                            <h2>{storage.name}</h2>
                        </li>
                    </ul>
                ))}
            </div>
            <div className="contracts">
                <ul id="downloadUl">
                    <li>
                        <div className="contract">
                            <p id="contract"></p>
                        </div>
                        <div className="contract-action">
                            <a id="downloadLink" href="#" target="_blank">
                                <img id="downloadIcon" src={downloadIcon} className="download-icon" alt="Download-Icon" />
                            </a>
                        </div>
                    </li>
                </ul>
            </div>
      </div>
  );
}

export default Contractslist;