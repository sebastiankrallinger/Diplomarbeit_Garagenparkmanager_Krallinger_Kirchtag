import './Documentslist.css';
import deleteIcon from '../assets/deleteicon.png';

function Documentslist() {
    return (
      <div className="Documentlist">
            <h2>Allgemeine Dokumente</h2>
            <div className="contracts">
                <ul>
                    <li>
                        <div className="contract">
                            <p>Dokument 1</p>
                        </div>
                        <div className="contract-action">
                            <img src={deleteIcon} className="delete-icon" alt="Delete-Icon"></img>
                        </div>
                    </li>
                </ul>
            </div>
            <button className="btn-add">Dokument hochladen</button>
      </div>
  );
}

export default Documentslist;