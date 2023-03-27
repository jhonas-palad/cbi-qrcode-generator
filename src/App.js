import './assets/styles/cbi-style.css';
import URLQRGenerator from './pages/URLQRGenerator';
import VCardGenerator from './pages/VCardGenerator';
import {Routes, Route} from 'react-router-dom';
import Layout from './pages/Layout';

const App = () => {
    return (
        <Routes>
            <Route element={<Layout/>}>
                <Route path="urlgenerator" element={<URLQRGenerator />} />
                <Route path="vcardgenerator" element={<VCardGenerator/>} />
            </Route>
        </Routes>
    )
}

export default App;