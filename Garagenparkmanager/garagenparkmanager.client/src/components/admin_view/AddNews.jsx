import './AddNews.css';

function AddNews() {
  return (
      <div className="AddNews">
          <h2>News hinzuf&uuml;gen</h2>
          <input className="title" placeholder="News-Titel"></input>
          <textarea className="content" placeholder="News-Content"></textarea>
          <div className="add-btns">
              <button className="upload">Bild hochladen</button>
              <button className="publish">Ver&ouml;ffentlichen</button>
          </div>
      </div>
  );
}

export default AddNews;