import './Contractslist.css';
import downloadIcon from '../../assets/downloadicon.png';
import { useEffect, useState } from 'react';

/* Contractslist-Component */
function Contractslist() {
    const url = "https://garagenparkmanager-webapp-dqgge2apcpethvfs.swedencentral-01.azurewebsites.net/";
    //const url = "https://localhost:7186/";
    const [storages, setStorages] = useState([]);

    useEffect(() => {
        fetchStorages();
    }, []);
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
            console.error('Fehler beim Abrufen der Admin-Liste:', error);
        }
    }

    function showContract(storage) {
        console.log(storage);
        if (storage && storage.activeContract && storage.activeContract.fileName) {
            document.getElementById("contract").textContent = storage.activeContract.fileName;
            const downloadIcon = document.getElementById("downloadIcon");
            downloadIcon.parentElement.href = storage.activeContract.fileUrl;
            downloadIcon.parentElement.download = storage.activeContract.fileName;
        } else {
            document.getElementById("contract").textContent = "Kein Vertrag verfügbar";
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
                <ul>
                    <li>
                        <div className="contract">
                            <p id="contract"></p>
                        </div>
                        <div className="contract-action">
                            <a id="downloadLink" href="#" download>
                                <img id="downloadIcon" src={downloadIcon} className="download-icon" alt="Download-Icon" />
                            </a>
                        </div>
                    </li>
                </ul>
            </div>
            <button className="btn-add">Vertrag hochladen</button>
      </div>
  );
}

export default Contractslist;