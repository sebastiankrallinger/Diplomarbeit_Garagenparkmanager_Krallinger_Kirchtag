/* Adminmanagement-Component */

import { useEffect, useState } from 'react';
import './Adminmanagement.css';
import Header from '../../components/admin_view/Header_Admin';
import AdminList from '../../components/admin_view/Adminlist';
import AdmindataForm from '../../components/admin_view/InputformAdmindata';

function Adminmanagement() {
  return (
      <div className="Adminmanagement_Admin">
          <Header />
          <main>
              <div className="adminlist">
                  <AdminList />
              </div>
              <div className="seperator"></div>
              <div className="admindata">
                  <AdmindataForm />
                  <button className="btn-update">Aktualisieren</button>
                  <button className="btn-addnew">Erstellen</button>
              </div>
          </main>
      </div>
  );
}

export default Adminmanagement;