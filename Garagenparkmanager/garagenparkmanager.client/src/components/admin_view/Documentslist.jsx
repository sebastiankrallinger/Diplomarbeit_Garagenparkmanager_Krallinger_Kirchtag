import React, { useState, useEffect } from "react";
import "./Documentslist.css";
import deleteIcon from "../../assets/deleteicon.png";

function Documentslist() {
    const [documents, setDocuments] = useState([]);
    const [file, setFile] = useState(null);
    const url = "https://localhost:7186/";

    // GET: Dokumente aus der Datenbank laden
    useEffect(() => {
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

        fetchDocuments();
    }, []);

    const handleUpload = async () => {
        if (!file) {
            console.error("Keine Datei ausgewählt!");
            return;
        }

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
                    body: JSON.stringify({ file: base64File, fileName: file.name }),
                });

                if (!response.ok) {
                    throw new Error("Fehler beim Hochladen");
                }

                const data = await response.json();
            } catch (error) {
                console.error("Fehler beim Hochladen:", error);
            }
        };

        reader.readAsDataURL(file);
    };


    return (
        <div className="Documentlist">
            <h2>Allgemeine Dokumente</h2>
            <div className="documents">
                <ul>
                    {documents.map((doc, index) => (
                        <li key={index}>
                            <div className="document">
                                <p>{doc.name}</p>
                            </div>
                            <div className="document-action">
                                <img
                                    src={deleteIcon}
                                    className="delete-icon"
                                    alt="Delete-Icon"
                                    //onClick={() => handleDelete(index, doc.id)}
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
                onChange={(e) => setFile(e.target.files[0])} // Hier wird die erste ausgewählte Datei gesetzt
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