/* Newsmanagement-Component */

import { useEffect, useState } from 'react';
import './Newsmanagement.css';
import Header from '../../components/admin_view/Header_Admin';
import './Newsmanagement.css';
import Newslist from '../../components/admin_view/Newslist'
import AddNews from '../../components/admin_view/AddNews'

function Newsmanagement() {
  return (
      <div className="Newsmanagement">
          <Header />
          <main>
              <div className="newslist">
                  <Newslist />
              </div>
              <div className="seperator"></div>
              <div className="addnews">
                  <AddNews />
              </div>
          </main>
      </div>  );
}

export default Newsmanagement;