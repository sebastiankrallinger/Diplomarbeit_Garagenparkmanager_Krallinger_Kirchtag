/* Newsmanagement-Component */

import { useEffect, useState } from 'react';
import './Newsmanagement.css';
import Header from '../../components/admin_view/Header_Admin';
import './Newsmanagement.css';
import Newslist from '../../components/admin_view/Newslist'
import AddNews from '../../components/admin_view/AddNews'

function Newsmanagement() {
    //const url = "https://garagenparkmanager-webapp-dqgge2apcpethvfs.swedencentral-01.azurewebsites.net/";
    const url = "https://localhost:7186/";

    const [news, setNews] = useState([]);
    const [selectedNews, setSelectedNews] = useState(null);
    const [oldNewsData, setoldNewsData] = useState(null);

    useEffect(() => {
        fetchNews();
    }, []);

    async function fetchNews() {
        try {
            const response = await fetch(url + 'News/allNews', {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('accesstoken'),
                },
            });
            const data = await response.json();
            setNews(data);
        } catch (error) {
            console.error('Fehler beim Abrufen der News-Liste:', error);
        }
    }

    const handleFormChange = (updatedNews) => {
        setSelectedNews(updatedNews);
    };

  return (
      <div className="Newsmanagement">
          <Header />
          <main>
              <div className="newslist">
                  <Newslist news={news} refreshNews={fetchNews} />
              </div>
              <div className="seperator"></div>
              <div className="addnews">
                  <AddNews refreshNews={fetchNews} news={selectedNews} handleFormChange={handleFormChange} />
              </div>
          </main>
      </div>  );
}

export default Newsmanagement;