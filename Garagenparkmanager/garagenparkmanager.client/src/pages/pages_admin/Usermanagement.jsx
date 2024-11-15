/* Usermanagement-Component */

import { useEffect, useState } from 'react';
import './Usermanagement.css';
import Header from '../../components/Header_Admin';
import Userlist from '../../components/Userlist';
import UserdataForm from '../../components/InputformUserdata';
import Userobjects from '../../components/UserObjects';

function Usermanagement() {
  return (
      <div className="Usermanagement_Admin">
          <Header />
          <main>
              <div className="userlist">
                  <Userlist />
              </div>
              <div className="seperator"></div>
              <div className="userdata">
                  <UserdataForm />
              </div>
              <div className="object">
                  <Userobjects />  
                  <button className="btn-update">Aktualisieren</button>
              </div>
          </main>
      </div>
  );
}

export default Usermanagement;