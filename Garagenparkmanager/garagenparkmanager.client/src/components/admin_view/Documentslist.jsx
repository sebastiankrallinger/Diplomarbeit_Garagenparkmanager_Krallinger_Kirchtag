import React, { useState, useEffect } from "react";
import "./Documentslist.css";
import deleteIcon from "../../assets/deleteicon.png";

function Documentslist() {
    const [documents, setDocuments] = useState([]);
    //const url = "https://garagenparkmanager-webapp-dqgge2apcpethvfs.swedencentral-01.azurewebsites.net/";
    const url = "https://localhost:7186/";
    // GET: Dokumente aus der Datenbank laden
    useEffect(() => {
        async function fetchDocuments() {
            try {
                const response = await fetch(url+"Document/documents", {
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

    const handleFileChange = async (event) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = async () => {
                if (typeof reader.result === "string") {
                    const base64String = reader.result.split(",")[1]; // Base64 ohne Präfix
                    const newDocument = { name: file.name, base64: base64String };

                    try {
                        const response = await fetch(url+"adddocument", {
                            method: "POST",
                            headers: {
                                "Authorization": `Bearer ${localStorage.getItem("accesstoken")}`,
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(newDocument),
                        });

                        if (response.ok) {
                            console.log("Dokument erfolgreich hinzugefügt!");
                            setDocuments([...documents, newDocument]);
                        } else {
                            console.error("Fehler beim Hinzufügen des Dokuments.");
                        }
                    } catch (error) {
                        console.error("Netzwerkfehler:", error);
                    }
                }
            };
        }
    };

    const handleButtonClick = () => {
        document.getElementById("fileInput")?.click();
    };

    const handleDelete = async (index, docId) => {
        try {
            const response = await fetch(url+`deleteDocument/${docId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("accesstoken")}`,
                },
            });

            if (response.ok) {
                const updatedDocs = documents.filter((_, i) => i !== index);
                setDocuments(updatedDocs);
            } else {
                console.error("Fehler beim Löschen des Dokuments.");
            }
        } catch (error) {
            console.error("Netzwerkfehler:", error);
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
                                    onClick={() => handleDelete(index, doc.id)}
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
            <button className="btn-add" onClick={handleButtonClick}>
                Dokument hochladen
            </button>
        </div>
    );
}

export default Documentslist;
