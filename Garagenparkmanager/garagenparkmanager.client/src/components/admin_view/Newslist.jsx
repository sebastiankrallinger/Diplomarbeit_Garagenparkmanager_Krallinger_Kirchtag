import './Newslist.css';
import editIcon from '../../assets/editicon.png';
import deleteIcon from '../../assets/deleteicon.png';
import newsImg from '../../assets/newsPlaceholder.jpg';

/* Newslist-Component*/
function Newslist() {
  return (
      <div className="Newslist">
          <h2>Aktuelle News</h2>
          <ul>
              <li>
                  <div className="news">
                      <img src={newsImg} className="newsimage" alt="News-Image"></img>
                      <div className="news-content">
                          <h2>News 1</h2>
                          <p>News beschreibung</p>
                          <div>
                              <img src={editIcon} className="edit-icon" alt="Edit-Icon"></img>
                              <img src={deleteIcon} className="delete-icon" alt="Delete-Icon"></img>
                          </div>
                      </div>
                  </div>
              </li>
          </ul>
      </div>
  );
}

export default Newslist;