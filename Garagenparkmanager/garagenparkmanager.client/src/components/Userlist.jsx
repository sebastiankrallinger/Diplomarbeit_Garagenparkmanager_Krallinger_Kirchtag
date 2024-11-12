import './Userlist.css';
import userIcon from '../assets/userIconplaceholder.jpg';
import editIcon from '../assets/editicon.png';
import deleteIcon from '../assets/deleteicon.png';

function Userlist() {
    return (
        <div className="Userlist">
          <h2>Benutzer</h2>
          <ul>
                <li>
                    <div className="user-info">
                        <img src={userIcon} className="user-icon" alt="Benutzer-Icon"></img>
                        <p>Username</p>
                    </div>
                    <div className="user-action">
                        <img src={editIcon} className="edit-icon" alt="Edit-Icon"></img>
                        <img src={deleteIcon} className="delete-icon" alt="Delete-Icon"></img>
                    </div>
                </li>
          </ul>
      </div>
  );
}

export default Userlist;