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
            console.log(reader.result);
            const base64File = reader.result.split(',')[1]; // Entferne den Data-URL-Teil

            try {
                const response = await fetch("http://localhost:5000/api/files/upload", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ file: base64File, fileName: file.name }),
                });

                if (!response.ok) {
                    throw new Error("Fehler beim Hochladen");
                }

                const data = await response.json();
                console.log("Datei URL:", data.FileUrl);
            } catch (error) {
                console.error("Fehler beim Hochladen:", error);
            }
        }
    }

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