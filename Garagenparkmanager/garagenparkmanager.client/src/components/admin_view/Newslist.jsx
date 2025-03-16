import { useState } from 'react';
import './Newslist.css';
import editIcon from '../../assets/editIcon.png';
import deleteIcon from '../../assets/deleteicon.png';
import newsImg from '../../assets/newsPlaceholder.jpg';

/* Newslist-Component*/
function Newslist({ news, refreshNews, setEdit, updateNews }) {
    const url = "https://garagenparkmanager-webapp-dqgge2apcpethvfs.swedencentral-01.azurewebsites.net/";
    //const url = "https://localhost:7186/";
    const [showPopup, setShowPopup] = useState(false);
    const [oneNews, setOneNews] = useState(null);

    //News aktualisieren
    function editNews(oneNews) {
        updateNews(oneNews);
        setEdit(true);
    }

    //PopUp öffnen
    const openPopup = (news) => {
        setOneNews(news);
        setShowPopup(true);
    };

    //PopUp schließen
    const closePopup = () => {
        setShowPopup(false);
        setOneNews(null);
    };

    //News löschen
    async function deleteNews(id) {
        try {
            const response = await fetch(url + `News/deleteNews/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('accesstoken'),
                },
            });
            closePopup();
            refreshNews();
        } catch (error) {
            console.error('Fehler beim Löschen: ', error);
        }
    }

    return (
        <><h2>Aktuelle News</h2>
        <div className="Newslist">
            {news.map((oneNews, index) => (
                <ul key={oneNews.id}>
                    <li>
                        <div className="news">
                            <img src={oneNews.imageUrl} className="newsimage" alt="News-Image" />
                            <div className="news-content">
                                <h2>{oneNews.title}</h2>
                                <p>{new Date(oneNews.timestamp).toLocaleString('de-DE')}</p>
                                <p>{oneNews.content}</p>
                            </div>
                        </div>
                        <div className="edit-delete-icons">
                            <img src={editIcon} className="edit-icon" alt="Edit-Icon" onClick={() => editNews(oneNews)} />
                            <img src={deleteIcon} className="delete-icon" alt="Delete-Icon" onClick={() => openPopup(oneNews)} />
                        </div>
                    </li>
                </ul>
            ))}
            {
                showPopup && (
                    <div className="popup">
                            <div className="popup-content">
                                <p>Wollen sie {oneNews.title} wirklich l&ouml;schen?</p>
                                <button onClick={() => deleteNews(oneNews.id)}>Best&auml;tigen</button>
                            <button onClick={closePopup}>Abbrechen</button>
                        </div>
                    </div>
                )
            }
        </div></>
    );
}

export default Newslist;