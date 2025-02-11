import './Newslist.css';
import editIcon from '../../assets/editIcon.png';
import deleteIcon from '../../assets/deleteicon.png';
import newsImg from '../../assets/newsPlaceholder.jpg';

/* Newslist-Component*/
function Newslist({ news, refreshNews, setEdit, updateNews }) {
    //const url = "https://garagenparkmanager-webapp-dqgge2apcpethvfs.swedencentral-01.azurewebsites.net/";
    const url = "https://localhost:7186/";

    function editNews(oneNews) {
        updateNews(oneNews);
        setEdit(true);
    }

    /* News löschen */
    async function deleteNews(id) {
        try {
            const response = await fetch(url + `News/deleteNews/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('accesstoken'),
                },
            });
            refreshNews();
        } catch (error) {
            console.error('Fehler beim Löschen de Benutzers:', error);
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
                            <img src={deleteIcon} className="delete-icon" alt="Delete-Icon" onClick={() => deleteNews(oneNews.id)} />
                        </div>
                    </li>
                </ul>
            ))}
        </div></>
    );
}

export default Newslist;