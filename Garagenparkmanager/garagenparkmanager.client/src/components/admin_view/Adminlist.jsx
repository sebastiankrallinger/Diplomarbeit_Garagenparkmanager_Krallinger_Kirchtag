import './Adminlist.css';
import userIcon from '../../assets/userIconplaceholder.jpg';
import editIcon from '../../assets/editicon.png';
import deleteIcon from '../../assets/deleteicon.png';

function Adminlist() {
    return (
      <div className="Adminlist">
          <h2>Admins</h2>
          <ul>
                <li>
                    <div className="admin-info">
                        <img src={userIcon} className="user-icon" alt="Benutzer-Icon"></img>
                        <p>Admin</p>
                    </div>
                    <div className="admin-action">
                        <img src={editIcon} className="edit-icon" alt="Edit-Icon"></img>
                        <img src={deleteIcon} className="delete-icon" alt="Delete-Icon"></img>
                    </div>
                </li>
          </ul>
      </div>
  );
}

export default Adminlist;