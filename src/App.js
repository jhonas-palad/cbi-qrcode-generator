import './assets/styles/cbi-style.css';
import URLQRGenerator from './pages/URLQRGenerator';
import VCardGenerator from './pages/VCardGenerator';
import {Routes, Route} from 'react-router-dom';
import Layout from './pages/Layout';
import  Missing  from './pages/Missing';
const App = () => {
    return (
        <Routes>
            <Route element={<Layout/>}>
                <Route path="url" element={<URLQRGenerator />} />
                <Route path="vcard" element={<VCardGenerator/>} />
                <Route path="*" element={<Missing />} />
            </Route>
        </Routes>
    )
}

export default App;