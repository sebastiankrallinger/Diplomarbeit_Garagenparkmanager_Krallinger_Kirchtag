import React, { useState, useEffect } from "react";
import "./Documentslist.css";
import deleteIcon from "../../assets/deleteicon.png";

function Documentslist() {
    const [documents, setDocuments] = useState([]);
    const [file, setFile] = useState(null);
    const url = "https://garagenparkmanager-webapp-dqgge2apcpethvfs.swedencentral-01.azurewebsites.net/";
    //const url = "https://localhost:7186/";
    const [showPopup, setShowPopup] = useState(false);
    const [showPopupDelete, setShowPopupDelete] = useState(false);
    const [oneDoc, setOneDoc] = useState(null);

    //Dokumente laden
    useEffect(() => {
        fetchDocuments();
    }, []);

    //PopUp öffnen
    const openPopup = () => {
        setShowPopup(true);
    };

    //PopUp schließen
    const closePopup = () => {
        setShowPopup(false);
    };

    //PopUpDelete öffnen
    const openPopupDelete = (doc) => {
        setOneDoc(doc);
        setShowPopupDelete(true);
    };

    //PopUpDelete schließen
    const closePopupDelete = () => {
        setShowPopupDelete(false);
        setOneDoc(null);
    };

    //Dokumente laden
    async function fetchDocuments() {
        try {
            const response = await fetch(url + "Document/documents", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("accesstoken")}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setDocuments(data);
            } else {
                throw new Error(`${response.status} ${response.statusText}`);
            }
        } catch (error) {
            console.error("Fehler beim Laden:", error);
        }
    }

    //neues Dokument zum Blob Storage hochladen
    async function handleUpload() {
        if (!file) {
            console.error("Keine Datei ausgewählt");
            return;
        }

        const selectedFile = file;
        setFile(null); 
        document.getElementById("fileInput").value = "";

        const reader = new FileReader();
        reader.onloadend = async () => {
            const base64File = reader.result.split(',')[1];

            try {
                const response = await fetch(url + "Document/upload", {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("accesstoken")}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ file: base64File, fileName: selectedFile.name }),
                });

                if (!response.ok) {
                    throw new Error(`${response.status} ${response.statusText}`);
                }
                fetchDocuments();
                openPopup();
            } catch (error) {
                console.error("Fehler beim Hochladen:", error);
            }
        };

        reader.readAsDataURL(selectedFile);
    };

    //Dokument löschen
    async function handleDelete(id) {
        try {
            const response = await fetch(url + `Document/deleteDocument/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('accesstoken'),
                },
            });

            if (response.ok) {
                setDocuments(documents.filter(doc => doc.id !== id));
                closePopupDelete();
            } else {
                throw new Error(`${response.status} ${response.statusText}`);
            }

        }catch (error) {
            console.error("Fehler beim Löschen:", error);
        }
        fetchDocuments();
    };

    return (
        <div className="Documentlist">
            <h2>Allgemeine Dokumente</h2>
            <div className="documents">
                <ul>
                    {documents.map((doc, index) => (
                        <li key={index}>
                            <div className="document">
                                <p>{doc.fileName}</p>
                            </div>
                            <div className="document-action">
                                <img
                                    src={deleteIcon}
                                    className="delete-icon"
                                    alt="Delete-Icon"
                                    onClick={() => openPopupDelete(doc)}
                                />
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <input
                id="fileInput"
                type="file"
                accept="application/pdf"
                onChange={(e) => setFile(e.target.files[0])}
                className="document"
                placeholder="Dokument"
            />
            <button className="btn-add" onClick={handleUpload}>
                Dokument hochladen
            </button>
            {
                showPopup && (
                    <div className="popup">
                        <div className="popup-content">
                            <p>Dokument erfolgreich hochgeladen!</p>
                            <button onClick={closePopup}>OK</button>
                        </div>
                    </div>
                )
            }
            {
                showPopupDelete && (
                    <div className="popup">
                        <div className="popup-content">
                            <p>Wollen sie {oneDoc.fileName} wirklich l&ouml;schen?</p>
                            <button onClick={() => handleDelete(oneDoc.id)}>Best&auml;tigen</button>
                            <button onClick={closePopupDelete}>Abbrechen</button>
                        </div>
                    </div>
                )
            }
        </div>
    );
}

export default Documentslist;