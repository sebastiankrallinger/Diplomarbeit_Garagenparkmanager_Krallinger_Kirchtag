/* Objectmanagement-Component */

import { useEffect, useState } from 'react';
import './Objectmanagement.css';
import Header from '../../components/admin_view/Header_Admin';
import GaragenparkPlan from '../../components/admin_view/GaragenparkPlan'
import ObjectActions from '../../components/admin_view/ObjectActions'

function Objectmanagement() {
  return (
      <div className="Objectmanagement">
          <Header />
          <main>
              <div className="objectPlan">
                  <GaragenparkPlan />
              </div>
              <div className="rentedObjects">
                  <ObjectActions />
              </div>
          </main>
      </div>
  );
}

export default Objectmanagement;