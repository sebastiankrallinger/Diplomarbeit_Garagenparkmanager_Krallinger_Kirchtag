import './UserObjects.css';
import deleteIcon from '../../assets/deleteicon.png';

function UserObjects() {
    return (
      <div className="UserObjects">
            <h2>Mietobjekte</h2>
            <ul>
                <li>
                    <p>Mietobjekt</p>
                    <div className="object-action">
                        <img src={deleteIcon} className="delete-icon" alt="Delete-Icon"></img>
                    </div>
                </li>
            </ul>
            <h3>Mietobjekt hinzuf&uuml;gen</h3>
            <div className="dropdown">
                <select >
                    <option value="">Objekt ausw&auml;hlen</option>
                    <option value="">Mietobjekt 1</option>
                    <option value="">Mietobjekt 2</option>
                </select>
                <button className="btn-add">Hinzuf&uuml;gen</button>
            </div>
      </div>
  );
}

export default UserObjects;