/* Objectmanagement-Component */

import { useEffect, useState } from 'react';
import './Objectmanagement.css';
import Header from '../components/Header_Admin';
import GaragenparkPlan from '../components/GaragenparkPlan'
import ObjectActions from '../components/ObjectActions'

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