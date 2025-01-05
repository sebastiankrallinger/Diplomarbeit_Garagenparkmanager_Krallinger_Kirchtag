import './Contractslist.css';
import downloadIcon from '../../assets/downloadicon.png';

/* Contractslist-Component */
function Contractslist() {
    return (
        <div className="Contractslist">
            <h2>Vertr&auml;ge</h2>
            <div className="objects">
                <ul>
                    <li>
                        <div className="object">
                            <p>Mietobjekt 1</p>
                        </div>
                    </li>
                </ul>
            </div>
            <div className="contracts">
                <ul>
                    <li>
                        <div className="contract">
                            <p>Vertrag 1</p>
                        </div>
                        <div className="contract-action">
                            <img src={downloadIcon} className="download-icon" alt="Download-Icon"></img>
                        </div>
                    </li>
                </ul>
            </div>
            <button className="btn-add">Vertrag hochladen</button>
      </div>
  );
}

export default Contractslist;