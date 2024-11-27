/* Documentmanagement-Component*/


import { useEffect, useState } from 'react';
import './Documentmanagement.css';
import Header from '../components/Header_Admin';
import Contractlist from '../components/Contractslist';
import Documentlist from '../components/Documentslist';


function Documentmanagement() {
    return (
        <div className="Documentmanagement">
            <Header />
            <body>
                <div className="contractslist">
                    <Contractlist />
                </div>
                <div className="seperator"></div>
                <div className="documentslist">
                    <Documentlist />
                </div>
            </body>
        </div>
  );
}
0
export default Documentmanagement;