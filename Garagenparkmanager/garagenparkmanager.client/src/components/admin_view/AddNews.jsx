import './AddNews.css';
import { useState, useEffect } from 'react';
import imageCompression from 'browser-image-compression';


/* AddNews-Component */
function AddNews({ refreshNews, news, updatedNews, handleFormChange, edit, setEdit}) {
    //const url = "https://garagenparkmanager-webapp-dqgge2apcpethvfs.swedencentral-01.azurewebsites.net/";
    const url = "https://localhost:7186/";

    const [formData, setFormData] = useState({
        title: '',
        content: '',
        timestamp: '',
        imgUrl: '',
    });
    const [id, setId] = useState("");
    const [error, setError] = useState(null);

    //Input erfassen
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
                console.log("Erfolgreich hinzugefügt!");
                setFormData({
                    title: '',
                    content: '',
                    timestamp: '',
                    imageUrl: ''
                });
                document.getElementById('image').value = "";
                refreshNews();
            } else {
                console.error("Fehler beim Hinzufügen der News.");
            }
        } catch (error) {
            console.error('Netzwerkfehler:', error);
        }
    };

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
            } else {
                console.error('Fehler beim Aktualisieren der News');
            }
        } catch (error) {
            console.error('Fehler beim Senden der Update-Anfrage:', error);
        }
    }

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
      </div>
  );
}

export default AddNews;