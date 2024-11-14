import './Garagenparkplan.css'
import ParkPlan from '../assets/garagenparkplan.jpg'
function GaragenparkPlan() {
    return (
        <div className="GaragenparkPlan">
            <img src={ParkPlan} className="parkPlan" alt="Garagenpark-Plan"></img>
        </div>
  );
}

export default GaragenparkPlan;