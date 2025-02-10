import './AddNews.css';
import { useState, useEffect } from 'react';


/* AddNews-Component */
function AddNews({ refreshNews, news, handleFormChange }) {
    //const url = "https://garagenparkmanager-webapp-dqgge2apcpethvfs.swedencentral-01.azurewebsites.net/";
    const url = "https://localhost:7186/";

    const [formData, setFormData] = useState({
        title: '',
        content: '',
        timestamp: '',
        imgUrl: '',
    });
    const [error, setError] = useState(null);

    //Input erfassen
    useEffect(() => {
        if (news) {
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

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;

        if (name === "image" && files.length > 0) {
            const file = files[0];
            const reader = new FileReader();

            reader.onloadend = () => {
                setFormData(prevData => ({
                    ...prevData,
                    imageUrl: reader.result
                }));
            };

            reader.readAsDataURL(file);
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
              <button className="publish" onClick={addNews}>Ver&ouml;ffentlichen</button>
          </div>
      </div>
  );
}

export default AddNews;