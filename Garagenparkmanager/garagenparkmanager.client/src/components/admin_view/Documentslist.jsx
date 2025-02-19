import React, { useState, useEffect } from "react";
import "./Documentslist.css";
import deleteIcon from "../../assets/deleteicon.png";

function Documentslist() {
    const [documents, setDocuments] = useState([]);
    const [file, setFile] = useState(null);
    const url = "https://localhost:7186/";

    // GET: Dokumente aus der Datenbank laden
    useEffect(() => {
        fetchDocuments();
    }, []);

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
                console.error("Fehler beim Abrufen der Dokumente.");
            }
        } catch (error) {
            console.error("Netzwerkfehler:", error);
        }
    }

    async function handleUpload() {
        if (!file) {
            console.error("Keine Datei ausgewählt!");
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
                    throw new Error("Fehler beim Hochladen");
                }
                console.log(file);
                fetchDocuments();
            } catch (error) {
                console.error("Fehler beim Hochladen:", error);
            }
        };

        reader.readAsDataURL(selectedFile);
    };

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
            } else {
                console.error("Fehler beim Löschen.");
            }

        }catch (error) {
            console.error("Netzwerkfehler:", error);
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
                                    onClick={() => handleDelete(doc.id)}
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
        </div>
    );
}

export default Documentslist;