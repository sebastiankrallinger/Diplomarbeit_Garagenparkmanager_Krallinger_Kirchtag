/* Newsmanagement-Component */

import { useEffect, useState } from 'react';
import './Newsmanagement.css';
import Header from '../components/Header_Admin';
import './Newsmanagement.css';
import Newslist from '../components/Newslist'
import AddNews from '../components/AddNews'

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