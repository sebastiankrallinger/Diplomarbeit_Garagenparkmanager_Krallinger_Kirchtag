/* Documentmanagement-Component*/


import { useEffect, useState } from 'react';
import './Documentmanagement.css';
import Header from '../../components/admin_view/Header_Admin';
import Contractlist from '../../components/admin_view/Contractslist';
import Documentlist from '../../components/admin_view/Documentslist';


function Documentmanagement() {
    return (
        <div className="Documentmanagement">
            <Header />
            <main>
                <div className="contractslist">
                    <Contractlist />
                </div>
                <div className="seperator"></div>
                <div className="documentslist">
                    <Documentlist />
                </div>
            </main>
        </div>
  );
}

export default Documentmanagement;