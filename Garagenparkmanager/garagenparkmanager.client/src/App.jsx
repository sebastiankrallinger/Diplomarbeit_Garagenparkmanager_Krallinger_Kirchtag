/* App-Maincomponent */

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Mainpage_User from './pages/Mainpage_User';
import Mainpage_Admin from './pages/Mainpage_Admin';
import Usermanagement from './pages/Usermanagement';
import Objectmanagement from './pages/Objectmanagement';
import Newsmanagement from './pages/Newsmanagement';
import Documentmanagement from './pages/Documentmanagement';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/home" replace />} />
                <Route path="/home" element={<Home />} />
                <Route path="/user" element={<Mainpage_User />} />
                <Route path="/admin" element={<Mainpage_Admin />} />
                <Route path="/admin/usermanagement" element={<Usermanagement />} />
                <Route path="/admin/objectmanagement" element={<Objectmanagement />} />
                <Route path="/admin/newsmanagement" element={<Newsmanagement />} />
                <Route path="/admin/documentmanagement" element={<Documentmanagement />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
