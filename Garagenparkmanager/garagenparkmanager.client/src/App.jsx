/* App-Maincomponent */

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
//import Mainpage_User from './pages/Mainpage_User';
import Mainpage_Admin from './pages/Mainpage_Admin';
import Usermanagement from './pages/Usermanagement';
import Objectmanagement from './pages/Objectmanagement';
import Newsmanagement from './pages/Newsmanagement';
import Documentmanagement from './pages/Documentmanagement';
import User_Freeobjects from './pages/user_pages/user_freeobjects';
import User_Login from './pages/user_pages/user_login';
import User_Mainpage from './pages/user_pages/user_mainpage';
//import User_ObjectInfo from './pages/user_pages/user_objectinfo';
import User_Register from './pages/user_pages/user_register';
import './index.css';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/home" replace />} />
                <Route path="/home" element={<Home />} />
                <Route path="/admin" element={<Mainpage_Admin />} />
                {/*<Route path="/user" element={<Mainpage_User />} />*/}
                <Route path="/admin/usermanagement" element={<Usermanagement />} />
                <Route path="/admin/objectmanagement" element={<Objectmanagement />} />
                <Route path="/admin/newsmanagement" element={<Newsmanagement />} />
                <Route path="/admin/documentmanagement" element={<Documentmanagement />} />
                <Route path="/user/freeobjects" element={<User_Freeobjects />} />
                <Route path="/user/login" element={<User_Login />} />
                <Route path="/user" element={<User_Mainpage />} />
                {/*<Route path="/user/objectinfo" element={<User_ObjectInfo />} />*/}
                <Route path="/user/register" element={<User_Register />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
