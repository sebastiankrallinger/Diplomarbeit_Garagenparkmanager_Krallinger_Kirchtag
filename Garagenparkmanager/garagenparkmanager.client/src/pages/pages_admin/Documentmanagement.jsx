/* Documentmanagement-Component*/


import { useEffect, useState } from 'react';
import './Documentmanagement.css';
import Header from '../../components/admin_view/Header_Admin';
import Contractlist from '../../components/admin_view/Contractslist';
import Documentlist from '../../components/admin_view/Documentslist';


function Documentmanagement() {
    //const url = "https://garagenparkmanager-webapp-dqgge2apcpethvfs.swedencentral-01.azurewebsites.net/";
    const url = "https://localhost:7186/";
    const [setDocuments] = useState([]);

    useEffect(() => {
        fetchDocuments();
    }, []);

    async function fetchDocuments() {
        try {
            const response = await fetch(url + 'Document/documents', {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('accesstoken'),
                },
            });
            const data = await response.json();
            setDocuments(data);
        } catch (error) {
            console.error('Fehler beim Abrufen der Dokument-Liste:', error);
        }
    }
    return (
        <div className="Documentmanagement">
            <Header />
            <main>
                <div className="contractslist">
                    <Contractlist />
                </div>
                <div className="seperator"></div>
                <div className="documentslist">
                    <Documentlist refreshAdmins={fetchDocuments} />
                </div>
            </main>
        </div>
  );
}
export default Documentmanagement;