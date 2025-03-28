import './AddNews.css';
import { useState, useEffect } from 'react';
import imageCompression from 'browser-image-compression';


/* AddNews-Component */
function AddNews({ refreshNews, news, updatedNews, handleFormChange, edit, setEdit}) {
    const url = "https://garagenparkmanager-webapp-dqgge2apcpethvfs.swedencentral-01.azurewebsites.net/";
    //const url = "https://localhost:7186/";
    const [showPopup, setShowPopup] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        content: '',
        timestamp: '',
        imgUrl: '',
    });
    const [id, setId] = useState("");
    const [error, setError] = useState(null);

    //Newsdate zwischenspeichern
    useEffect(() => {
        if (news) {
            setId(news.id);
            setFormData({
                title: news.title,
                content: news.content,
                timestamp: news.timestamp,
                imageUrl: news.imageUrl,
            });
        } else if (!news) {
            setFormData({
                title: '',
                content: '',
                timestamp: '',
                imageUrl: '',
            });
        }
    }, [news]);

    //Input erfassen
    const handleInputChange = async (e) => {
        const { name, value, files } = e.target;

        if (name === "image" && files.length > 0) {
            const file = files[0];

            const options = {
                maxSizeMB: 1, 
                maxWidthOrHeight: 1024, 
                useWebWorker: true, 
                fileType: 'image/webp',
            };

            try {
                const compressedFile = await imageCompression(file, options);
                const reader = new FileReader();

                reader.onloadend = () => {
                    setFormData(prevData => ({
                        ...prevData,
                        imageUrl: reader.result 
                    }));
                };

                reader.readAsDataURL(compressedFile);
            } catch (error) {
                console.error('Fehler bei der Bildkomprimierung:', error);
            }
        } else {
            const updatedData = {
                ...formData,
                [name]: value,
            };
            setFormData(updatedData);
        }
    };

    //PopUp �ffnen
    const openPopup = () => {
        setShowPopup(true);
    };

    //PopUp schlie�en
    const closePopup = () => {
        setShowPopup(false);
    };

    //News erstellen
    async function addNews() {

        const data = {
            title: formData.title,
            content: formData.content,
            timestamp: new Date().toISOString(),
            imageUrl: formData.imageUrl
        };
        try {
            const response = await fetch(url + 'News/addnews', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accesstoken')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                //console.log("Erfolgreich hinzugef�gt!");
                setFormData({
                    title: '',
                    content: '',
                    timestamp: '',
                    imageUrl: ''
                });
                document.getElementById('image').value = "";
                refreshNews();
                openPopup();
            } else {
                throw new Error(`${response.status} ${response.statusText}`);
            }
        } catch (error) {
            console.error('Fehler beim Hinzuf�gen:', error);
        }
    };

    //News aktualisieren
    async function updateNews() {
        const data = {
            id: id,
            title: formData.title,
            content: formData.content,
            timestamp: new Date().toISOString(),
            imageUrl: formData.imageUrl
        };
        try {
            const response = await fetch(url + `News/updateNews`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('accesstoken'),
                },
                body: JSON.stringify(data),
            });
            if (response.ok) {
                edit
                updatedNews(null);
                setEdit(false);
                setId("");
                document.getElementById('image').value = "";
                refreshNews();
                openPopup();
            } else {
                throw new Error(`${response.status} ${response.statusText}`);
            }
        } catch (error) {
            console.error('Fehler beim Aktualisieren:', error);
        }
    }

    //News hinzuf�gen/aktualisieren
    async function handlePublish() {
        if (edit == false) {
            addNews();
        } else if (edit == true) {
            updateNews();
        }
    }

  return (
      <div className="AddNews">
          <h2>News hinzuf&uuml;gen</h2>
          <div className="inputForm">
              <input type="text" name="title" placeholder="Titel" value={formData.title} onChange={handleInputChange}></input>
              <textarea name="content" placeholder="News-Content" value={formData.content} onChange={handleInputChange} className="content"></textarea>
          </div>
          <div className="add-btns">
              <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={handleInputChange}
              />
              <button className="publish" onClick={handlePublish}>Ver&ouml;ffentlichen</button>
          </div>
          {
              showPopup && (
                  <div className="popup">
                      <div className="popup-content">
                          <p>News erfolgreich hinzugef&uuml;gt!</p>
                          <button onClick={closePopup}>OK</button>
                      </div>
                  </div>
              )
          }
      </div>
  );
}

export default AddNews;