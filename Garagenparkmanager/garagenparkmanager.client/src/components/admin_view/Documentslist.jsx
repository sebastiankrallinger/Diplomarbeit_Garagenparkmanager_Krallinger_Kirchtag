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

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            console.error("Keine Datei ausgewählt!");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch(url + "Document/upload", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("accesstoken")}`,
                },
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                setDocuments([...documents, data]);
            } else {
                console.error("Fehler beim Speichern des Dokuments.");
            }
        } catch (error) {
            console.error("Upload-Fehler:", error);
        }
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
                onChange={handleFileChange}
                style={{ display: "none" }}
            />
            <button className="btn-add" onClick={handleUpload}>
                Dokument hochladen
            </button>
        </div>
    );
}

export default Documentslist;